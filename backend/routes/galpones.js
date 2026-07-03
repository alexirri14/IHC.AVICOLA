const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/galpones', (req, res) => {
  const db = getDb();
  const galpones = db.prepare('SELECT g.*, COALESCE(a.kg,0) as alimento_kg FROM galpones g LEFT JOIN alimento_galpon a ON a.galpon_id = g.id WHERE g.activo = 1').all();
  res.json(galpones);
});

router.post('/galpones', (req, res) => {
  const { nombre, gallinas } = req.body;
  const db = getDb();
  try {
    const result = db.prepare('INSERT INTO galpones (nombre, gallinas) VALUES (?, ?)').run(nombre, gallinas || 0);
    db.prepare('INSERT INTO alimento_galpon (galpon_id, kg) VALUES (?, 0)').run(result.lastInsertRowid);
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'El galpón ya existe' });
  }
});

router.put('/galpones/:id', (req, res) => {
  const { nombre, gallinas } = req.body;
  const db = getDb();
  db.prepare('UPDATE galpones SET nombre = ?, gallinas = ? WHERE id = ?').run(nombre, gallinas, req.params.id);
  res.json({ ok: true });
});

router.delete('/galpones/:id', (req, res) => {
  const db = getDb();
  db.prepare('UPDATE galpones SET activo = 0 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
