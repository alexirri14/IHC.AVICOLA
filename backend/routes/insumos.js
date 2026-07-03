const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/insumos', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM insumos WHERE activo = 1 ORDER BY nombre').all());
});

router.post('/insumos', (req, res) => {
  const { nombre, cantidad_kg, unidad_compra, kg_por_unidad, etiqueta, stock_minimo_kg } = req.body;
  const db = getDb();
  try {
    db.prepare('INSERT INTO insumos (nombre, cantidad_kg, unidad_compra, kg_por_unidad, etiqueta, stock_minimo_kg) VALUES (?,?,?,?,?,?)')
      .run(nombre.toUpperCase(), cantidad_kg||0, unidad_compra||'kg', kg_por_unidad||1, etiqueta||'Kg', stock_minimo_kg||50);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'El insumo ya existe' });
  }
});

router.put('/insumos/:id/ingreso', (req, res) => {
  const { cantidad_kg } = req.body;
  const db = getDb();
  db.prepare('UPDATE insumos SET cantidad_kg = cantidad_kg + ? WHERE id = ?').run(cantidad_kg, req.params.id);
  res.json({ ok: true });
});

router.put('/insumos/:id', (req, res) => {
  const { cantidad_kg, stock_minimo_kg } = req.body;
  const db = getDb();
  if (cantidad_kg !== undefined) db.prepare('UPDATE insumos SET cantidad_kg = ? WHERE id = ?').run(cantidad_kg, req.params.id);
  if (stock_minimo_kg !== undefined) db.prepare('UPDATE insumos SET stock_minimo_kg = ? WHERE id = ?').run(stock_minimo_kg, req.params.id);
  res.json({ ok: true });
});

router.delete('/insumos/:id', (req, res) => {
  const db = getDb();
  db.prepare('UPDATE insumos SET activo = 0 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
