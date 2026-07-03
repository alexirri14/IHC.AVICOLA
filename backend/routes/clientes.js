const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/clientes', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM clientes WHERE activo = 1 ORDER BY nombre').all());
});

router.post('/clientes', (req, res) => {
  const { nombre, telefono, direccion, email, ruc } = req.body;
  const db = getDb();
  try {
    const result = db.prepare('INSERT INTO clientes (nombre, telefono, direccion, email, ruc) VALUES (?,?,?,?,?)')
      .run(nombre, telefono||'', direccion||'', email||'', ruc||'');
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'Error al crear cliente' });
  }
});

router.put('/clientes/:id', (req, res) => {
  const { nombre, telefono, direccion, email, ruc } = req.body;
  const db = getDb();
  db.prepare('UPDATE clientes SET nombre=?, telefono=?, direccion=?, email=?, ruc=? WHERE id=?')
    .run(nombre, telefono||'', direccion||'', email||'', ruc||'', req.params.id);
  res.json({ ok: true });
});

router.delete('/clientes/:id', (req, res) => {
  const db = getDb();
  db.prepare('UPDATE clientes SET activo = 0 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
