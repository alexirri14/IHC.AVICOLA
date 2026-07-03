const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

const SACOS_POR_TANDA = 30;
const KG_POR_SACO = 50;
const KG_POR_TANDA = SACOS_POR_TANDA * KG_POR_SACO;

router.get('/molino/formulas', (req, res) => {
  const db = getDb();
  const formulas = db.prepare(`
    SELECT f.*, g.nombre as galpon_nombre 
    FROM formulas_molino f 
    LEFT JOIN galpones g ON g.id = f.galpon_id
    ORDER BY f.nombre
  `).all();
  const result = formulas.map(f => {
    const insumos = db.prepare(`
      SELECT fi.*, i.nombre as insumo_nombre, i.cantidad_kg as stock_actual
      FROM formula_insumos fi 
      JOIN insumos i ON i.id = fi.insumo_id
      WHERE fi.formula_id = ?
    `).all(f.id);
    return { ...f, insumos };
  });
  res.json(result);
});

router.post('/molino/formulas', (req, res) => {
  const { nombre, galpon_id } = req.body;
  const db = getDb();
  const galpon = db.prepare('SELECT nombre FROM galpones WHERE id = ?').get(galpon_id);
  if (!galpon) return res.status(400).json({ error: 'Galpón no encontrado' });
  try {
    db.prepare('INSERT INTO formulas_molino (nombre, galpon_id, destino) VALUES (?, ?, ?)').run(nombre, galpon_id, galpon.nombre);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'La fórmula ya existe' });
  }
});

router.put('/molino/formulas/:id', (req, res) => {
  const { destino, galpon_id } = req.body;
  const db = getDb();
  if (destino) db.prepare('UPDATE formulas_molino SET destino = ? WHERE id = ?').run(destino, req.params.id);
  if (galpon_id) db.prepare('UPDATE formulas_molino SET galpon_id = ? WHERE id = ?').run(galpon_id, req.params.id);
  res.json({ ok: true });
});

router.delete('/molino/formulas/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM formulas_molino WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

router.post('/molino/formulas/:id/insumos', (req, res) => {
  const { insumo_id, kg_por_tanda } = req.body;
  const db = getDb();
  const existe = db.prepare('SELECT id FROM formula_insumos WHERE formula_id = ? AND insumo_id = ?').get(req.params.id, insumo_id);
  if (existe) {
    db.prepare('UPDATE formula_insumos SET kg_por_tanda = ? WHERE id = ?').run(kg_por_tanda, existe.id);
  } else {
    db.prepare('INSERT INTO formula_insumos (formula_id, insumo_id, kg_por_tanda) VALUES (?,?,?)').run(req.params.id, insumo_id, kg_por_tanda);
  }
  res.json({ ok: true });
});

router.delete('/molino/formulas/:formulaId/insumos/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM formula_insumos WHERE id = ? AND formula_id = ?').run(req.params.id, req.params.formulaId);
  res.json({ ok: true });
});

router.get('/molino/produccion', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM produccion_molino ORDER BY fecha DESC, id DESC').all());
});

router.post('/molino/producir', (req, res) => {
  const { fecha, formula_id, tandas } = req.body;
  const db = getDb();

  const formula = db.prepare('SELECT * FROM formulas_molino WHERE id = ?').get(formula_id);
  if (!formula) return res.status(400).json({ error: 'Fórmula no encontrada' });

  const insumosFormula = db.prepare(`
    SELECT fi.*, i.nombre as insumo_nombre, i.cantidad_kg as stock_actual
    FROM formula_insumos fi JOIN insumos i ON i.id = fi.insumo_id
    WHERE fi.formula_id = ?
  `).all(formula_id);

  if (insumosFormula.length === 0) return res.status(400).json({ error: 'La fórmula no tiene insumos' });

  const t = Number(tandas);
  const kgProducidos = t * KG_POR_TANDA;
  const sacos = t * SACOS_POR_TANDA;

  // Validar y descontar stock
  const detalle = [];
  for (const ins of insumosFormula) {
    const necesario = Number(ins.kg_por_tanda) * t;
    if (necesario > Number(ins.stock_actual)) {
      return res.status(400).json({ error: 'Stock insuficiente de ' + ins.insumo_nombre });
    }
  }

  const updateInsumo = db.prepare('UPDATE insumos SET cantidad_kg = cantidad_kg - ? WHERE id = ?');
  for (const ins of insumosFormula) {
    const necesario = Number(ins.kg_por_tanda) * t;
    updateInsumo.run(necesario, ins.insumo_id);
    const nuevoStock = db.prepare('SELECT cantidad_kg FROM insumos WHERE id = ?').get(ins.insumo_id);
    detalle.push({ insumo_nombre: ins.insumo_nombre, kg_usado: necesario, stock_restante: nuevoStock.cantidad_kg });
  }

  // Aumentar alimento del galpón destino
  const galponDestino = db.prepare('SELECT id FROM galpones WHERE nombre = ?').get(formula.destino);
  if (galponDestino) {
    const exist = db.prepare('SELECT id FROM alimento_galpon WHERE galpon_id = ?').get(galponDestino.id);
    if (exist) {
      db.prepare('UPDATE alimento_galpon SET kg = kg + ? WHERE galpon_id = ?').run(kgProducidos, galponDestino.id);
    } else {
      db.prepare('INSERT INTO alimento_galpon (galpon_id, kg) VALUES (?,?)').run(galponDestino.id, kgProducidos);
    }
  }

  const resumen = detalle.map(d => d.insumo_nombre + ': ' + d.kg_usado.toFixed(2) + ' kg').join(', ');

  const result = db.prepare('INSERT INTO produccion_molino (fecha, formula_id, formula_nombre, destino, tandas, sacos, kg, insumos_resumen) VALUES (?,?,?,?,?,?,?,?)')
    .run(fecha, formula_id, formula.nombre, formula.destino, t, sacos, kgProducidos, resumen);

  const prodMolinoId = result.lastInsertRowid;
  const insertDetalle = db.prepare('INSERT INTO produccion_molino_detalle (produccion_molino_id, insumo_nombre, kg_usado, stock_restante) VALUES (?,?,?,?)');
  for (const d of detalle) {
    insertDetalle.run(prodMolinoId, d.insumo_nombre, d.kg_usado, d.stock_restante);
  }

  // Movimiento de alimento
  db.prepare('INSERT INTO movimientos_alimento (fecha, tipo, detalle, cantidad, formula, destino, tandas) VALUES (?,?,?,?,?,?,?)')
    .run(fecha, 'Producción de alimento', 'Producción para ' + formula.destino, sacos + ' sacos (' + kgProducidos + ' kg)', formula.nombre, formula.destino, t);

  res.json({ ok: true, id: prodMolinoId, detalle });
});

router.get('/molino/produccion/:id/detalle', (req, res) => {
  const db = getDb();
  const detalle = db.prepare('SELECT * FROM produccion_molino_detalle WHERE produccion_molino_id = ?').all(req.params.id);
  const prod = db.prepare('SELECT * FROM produccion_molino WHERE id = ?').get(req.params.id);
  res.json({ produccion: prod, detalle });
});

// Alimento por galpón
router.get('/molino/alimento', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT a.*, g.nombre as galpon_nombre FROM alimento_galpon a JOIN galpones g ON g.id = a.galpon_id WHERE g.activo = 1').all());
});

router.post('/molino/alimento/consumir', (req, res) => {
  const { galpon_id, sacos } = req.body;
  const db = getDb();
  const kg = Number(sacos) * KG_POR_SACO;
  const actual = db.prepare('SELECT kg FROM alimento_galpon WHERE galpon_id = ?').get(galpon_id);
  if (!actual || Number(actual.kg) < kg) return res.status(400).json({ error: 'Stock insuficiente' });
  db.prepare('UPDATE alimento_galpon SET kg = kg - ? WHERE galpon_id = ?').run(kg, galpon_id);
  const galpon = db.prepare('SELECT nombre FROM galpones WHERE id = ?').get(galpon_id);
  db.prepare('INSERT INTO movimientos_alimento (fecha, tipo, detalle, cantidad) VALUES (?,?,?,?)')
    .run(req.body.fecha || new Date().toISOString().split('T')[0], 'Salida de alimento', 'Consumo - ' + galpon.nombre, sacos + ' sacos (' + kg + ' kg)');
  res.json({ ok: true });
});

router.get('/molino/movimientos', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM movimientos_alimento ORDER BY fecha DESC, id DESC').all());
});

module.exports = router;
