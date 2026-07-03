const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/ventas', (req, res) => {
  const db = getDb();
  const { fecha, cliente_id } = req.query;
  let sql = 'SELECT * FROM ventas';
  const params = [];
  const conditions = [];
  if (fecha) { conditions.push('fecha = ?'); params.push(fecha); }
  if (cliente_id) { conditions.push('cliente_id = ?'); params.push(Number(cliente_id)); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY fecha DESC, id DESC';
  res.json(db.prepare(sql).all(...params));
});

router.post('/ventas', (req, res) => {
  const { fecha, cliente_id, cliente_nombre, primera, segunda, promedio_kg_jaba, precio_primera, precio_segunda } = req.body;
  const db = getDb();

  const p1 = Number(primera || 0);
  const p2 = Number(segunda || 0);
  const prom = Number(promedio_kg_jaba || 18);
  const pp1 = Number(precio_primera || 6);
  const pp2 = Number(precio_segunda || 5);
  const totalJabas = p1 + p2;
  const pesoP1 = p1 * prom;
  const pesoP2 = p2 * prom;
  const totalP1 = pesoP1 * pp1;
  const totalP2 = pesoP2 * pp2;
  const total = totalP1 + totalP2;

  // Validar stock
  const stock1 = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Primera'").get();
  const stock2 = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Segunda'").get();
  if (p1 > Number(stock1.total)) return res.status(400).json({ error: 'Stock insuficiente de primera' });
  if (p2 > Number(stock2.total)) return res.status(400).json({ error: 'Stock insuficiente de segunda' });

  // Descontar FIFO
  if (p1 > 0) {
    let pendiente = p1;
    const lotes1 = db.prepare("SELECT id, cantidad_disponible FROM lotes_huevos WHERE clase = 'Primera' AND cantidad_disponible > 0 ORDER BY fecha ASC, id ASC").all();
    for (const l of lotes1) {
      if (pendiente <= 0) break;
      const usado = Math.min(pendiente, Number(l.cantidad_disponible));
      db.prepare('UPDATE lotes_huevos SET cantidad_disponible = ? WHERE id = ?').run(Number(l.cantidad_disponible) - usado, l.id);
      pendiente -= usado;
    }
  }
  if (p2 > 0) {
    let pendiente = p2;
    const lotes2 = db.prepare("SELECT id, cantidad_disponible FROM lotes_huevos WHERE clase = 'Segunda' AND cantidad_disponible > 0 ORDER BY fecha ASC, id ASC").all();
    for (const l of lotes2) {
      if (pendiente <= 0) break;
      const usado = Math.min(pendiente, Number(l.cantidad_disponible));
      db.prepare('UPDATE lotes_huevos SET cantidad_disponible = ? WHERE id = ?').run(Number(l.cantidad_disponible) - usado, l.id);
      pendiente -= usado;
    }
  }

  const result = db.prepare(`INSERT INTO ventas (fecha, cliente_id, cliente_nombre, primera, segunda, total_jabas, promedio_kg_jaba, peso, precio_primera, precio_segunda, total_primera, total_segunda, total, monto_total) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .run(fecha, cliente_id||null, cliente_nombre||'', p1, p2, totalJabas, prom, pesoP1+pesoP2, pp1, pp2, totalP1, totalP2, total, total);

  // Movimiento
  db.prepare('INSERT INTO movimientos_huevos (fecha, tipo, detalle, primera, segunda, total, venta_id) VALUES (?,?,?,?,?,?,?)')
    .run(fecha, 'Salida', 'Venta a ' + (cliente_nombre||'N/D'), p1, p2, totalJabas, result.lastInsertRowid);

  res.json({ ok: true, id: result.lastInsertRowid });
});

router.delete('/ventas/:id', (req, res) => {
  const db = getDb();
  const venta = db.prepare('SELECT * FROM ventas WHERE id = ?').get(req.params.id);
  if (!venta) return res.status(404).json({ error: 'No encontrada' });

  db.prepare("UPDATE lotes_huevos SET cantidad_disponible = cantidad_inicial WHERE produccion_id IN (SELECT produccion_id FROM movimientos_huevos WHERE venta_id = ?)").run(req.params.id);

  db.prepare('DELETE FROM movimientos_huevos WHERE venta_id = ?').run(req.params.id);
  db.prepare('DELETE FROM ventas WHERE id = ?').run(req.params.id);

  res.json({ ok: true });
});

module.exports = router;
