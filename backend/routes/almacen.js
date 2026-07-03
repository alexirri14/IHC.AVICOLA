const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/almacen/stock', (req, res) => {
  const db = getDb();
  const primera = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Primera'").get();
  const segunda = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Segunda'").get();
  res.json({ primera: primera.total, segunda: segunda.total, total: primera.total + segunda.total });
});

router.get('/almacen/lotes', (req, res) => {
  const db = getDb();
  const { clase } = req.query;
  let sql = 'SELECT * FROM lotes_huevos';
  const params = [];
  if (clase) { sql += ' WHERE clase = ?'; params.push(clase); }
  sql += ' ORDER BY fecha ASC, id ASC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/almacen/movimientos', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM movimientos_huevos ORDER BY fecha DESC, id DESC').all());
});

// Clasificación de segunda
router.get('/almacen/clases-segunda', (req, res) => {
  const db = getDb();
  const lotes = db.prepare("SELECT id, cantidad_disponible FROM lotes_huevos WHERE clase = 'Segunda' AND cantidad_disponible > 0").all();
  const total = lotes.reduce((s, l) => s + Number(l.cantidad_disponible), 0);
  res.json({ total, lotes: lotes.length });
});

// FIFO: descontar huevos
router.post('/almacen/descontar', (req, res) => {
  const { clase, cantidad } = req.body;
  const db = getDb();
  const key = clase === 'segunda' ? 'Segunda' : 'Primera';

  const totalStock = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = ?").get(key);
  if (Number(cantidad) > Number(totalStock.total)) {
    return res.status(400).json({ error: 'Stock insuficiente' });
  }

  let pendiente = Number(cantidad);
  const lotes = db.prepare("SELECT id, cantidad_disponible FROM lotes_huevos WHERE clase = ? AND cantidad_disponible > 0 ORDER BY fecha ASC, id ASC").all(key);

  const update = db.prepare('UPDATE lotes_huevos SET cantidad_disponible = ? WHERE id = ?');
  for (const lote of lotes) {
    if (pendiente <= 0) break;
    const usado = Math.min(pendiente, Number(lote.cantidad_disponible));
    update.run(Number(lote.cantidad_disponible) - usado, lote.id);
    pendiente -= usado;
  }

  res.json({ ok: true });
});

module.exports = router;
