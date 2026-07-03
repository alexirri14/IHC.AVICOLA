const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/compras', (req, res) => {
  const db = getDb();
  const { estado } = req.query;
  let sql = 'SELECT * FROM compras';
  const params = [];
  if (estado) { sql += ' WHERE estado = ?'; params.push(estado); }
  sql += ' ORDER BY fecha DESC, id DESC';
  res.json(db.prepare(sql).all(...params));
});

router.post('/compras', (req, res) => {
  const { fecha, proveedor_id, proveedor_nombre, insumo_id, insumo_nombre, cantidad, unidad, precio_unitario } = req.body;
  const db = getDb();
  const total = Number(cantidad || 0) * Number(precio_unitario || 0);

  const result = db.prepare(`INSERT INTO compras (fecha, proveedor_id, proveedor_nombre, insumo_id, insumo_nombre, cantidad, unidad, precio_unitario, total) VALUES (?,?,?,?,?,?,?,?,?)`)
    .run(fecha, proveedor_id||null, proveedor_nombre||'', insumo_id||null, insumo_nombre||'', cantidad||0, unidad||'', precio_unitario||0, total);

  // Si está completada, actualizar stock
  if (req.body.estado === 'Completada') {
    db.prepare('UPDATE insumos SET cantidad_kg = cantidad_kg + ? WHERE id = ?').run(Number(cantidad), insumo_id);
    db.prepare('INSERT INTO movimientos_alimento (fecha, tipo, detalle, cantidad) VALUES (?,?,?,?)')
      .run(fecha, 'Compra de insumo', 'Compra a ' + (proveedor_nombre||''), cantidad + ' ' + (unidad||''));
  }

  res.json({ ok: true, id: result.lastInsertRowid });
});

router.put('/compras/:id', (req, res) => {
  const { estado } = req.body;
  const db = getDb();
  if (estado === 'Completada') {
    const compra = db.prepare('SELECT * FROM compras WHERE id = ?').get(req.params.id);
    if (compra && compra.estado !== 'Completada') {
      db.prepare('UPDATE insumos SET cantidad_kg = cantidad_kg + ? WHERE id = ?').run(Number(compra.cantidad), compra.insumo_id);
    }
  }
  db.prepare('UPDATE compras SET estado = ? WHERE id = ?').run(estado, req.params.id);
  res.json({ ok: true });
});

router.delete('/compras/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM compras WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
