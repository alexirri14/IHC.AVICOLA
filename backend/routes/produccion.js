const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

function calcularPaquetes(jabas) {
  return Math.round(Number(jabas || 0) * 2);
}

router.get('/produccion', (req, res) => {
  const db = getDb();
  const { fecha, galpon_id } = req.query;
  let sql = `SELECT p.*, g.nombre as galpon_nombre FROM produccion p JOIN galpones g ON g.id = p.galpon_id`;
  const params = [];
  const conditions = [];
  if (fecha) { conditions.push('p.fecha = ?'); params.push(fecha); }
  if (galpon_id) { conditions.push('p.galpon_id = ?'); params.push(Number(galpon_id)); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY p.fecha DESC, p.id DESC';
  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

router.post('/produccion', (req, res) => {
  const { fecha, galpon_id, primera, segunda, muertas } = req.body;
  const db = getDb();

  const existe = db.prepare('SELECT id FROM produccion WHERE fecha = ? AND galpon_id = ?').get(fecha, galpon_id);
  if (existe) return res.status(400).json({ error: 'Ese galpón ya tiene producción registrada en esa fecha' });

  const galpon = db.prepare('SELECT id, nombre, gallinas FROM galpones WHERE id = ?').get(galpon_id);
  if (!galpon) return res.status(400).json({ error: 'Galpón no encontrado' });

  const jabas = Number(primera || 0) + Number(segunda || 0);
  const paquetes = calcularPaquetes(jabas);
  const gallinasRestantes = Math.max(0, galpon.gallinas - Number(muertas || 0));

  db.prepare('UPDATE galpones SET gallinas = ? WHERE id = ?').run(gallinasRestantes, galpon_id);

  const result = db.prepare(`INSERT INTO produccion (fecha, galpon_id, primera, segunda, jabas, paquetes, muertas, gallinas_restantes) VALUES (?,?,?,?,?,?,?,?)`)
    .run(fecha, galpon_id, primera||0, segunda||0, jabas, paquetes, muertas||0, gallinasRestantes);

  const prodId = result.lastInsertRowid;

  // Crear lotes de huevos
  if (Number(primera) > 0) {
    db.prepare('INSERT INTO lotes_huevos (fecha, galpon_id, galpon_nombre, clase, cantidad_inicial, cantidad_disponible, produccion_id) VALUES (?,?,?,?,?,?,?)')
      .run(fecha, galpon_id, galpon.nombre, 'Primera', primera||0, primera||0, prodId);
  }
  if (Number(segunda) > 0) {
    db.prepare('INSERT INTO lotes_huevos (fecha, galpon_id, galpon_nombre, clase, cantidad_inicial, cantidad_disponible, produccion_id) VALUES (?,?,?,?,?,?,?)')
      .run(fecha, galpon_id, galpon.nombre, 'Segunda', segunda||0, segunda||0, prodId);
  }

  // Movimiento de huevos
  db.prepare('INSERT INTO movimientos_huevos (fecha, tipo, detalle, primera, segunda, total, produccion_id) VALUES (?,?,?,?,?,?,?)')
    .run(fecha, 'Entrada', 'Producción - ' + galpon.nombre, primera||0, segunda||0, jabas, prodId);

  res.json({ ok: true, id: prodId });
});

router.delete('/produccion/:id', (req, res) => {
  const db = getDb();
  const prod = db.prepare('SELECT * FROM produccion WHERE id = ?').get(req.params.id);
  if (!prod) return res.status(404).json({ error: 'No encontrado' });

  // Verificar si parte ya fue vendida
  const lotes = db.prepare('SELECT cantidad_inicial, cantidad_disponible FROM lotes_huevos WHERE produccion_id = ?').all(req.params.id);
  const vendido = lotes.some(l => Number(l.cantidad_disponible) < Number(l.cantidad_inicial));
  if (vendido) return res.status(400).json({ error: 'No se puede eliminar, parte ya fue vendida' });

  // Restaurar gallinas
  db.prepare('UPDATE galpones SET gallinas = gallinas + ? WHERE id = ?').run(prod.muertas, prod.galpon_id);

  db.prepare('DELETE FROM movimientos_huevos WHERE produccion_id = ?').run(req.params.id);
  db.prepare('DELETE FROM lotes_huevos WHERE produccion_id = ?').run(req.params.id);
  db.prepare('DELETE FROM produccion WHERE id = ?').run(req.params.id);

  res.json({ ok: true });
});

module.exports = router;
