const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/proveedores', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM proveedores WHERE activo = 1 ORDER BY nombre').all());
});

router.post('/proveedores', (req, res) => {
  const { nombre, telefono, direccion, email, ruc } = req.body;
  const db = getDb();
  try {
    const result = db.prepare('INSERT INTO proveedores (nombre, telefono, direccion, email, ruc) VALUES (?,?,?,?,?)')
      .run(nombre, telefono||'', direccion||'', email||'', ruc||'');
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'Error al crear proveedor' });
  }
});

router.put('/proveedores/:id', (req, res) => {
  const { nombre, telefono, direccion, email, ruc } = req.body;
  const db = getDb();
  db.prepare('UPDATE proveedores SET nombre=?, telefono=?, direccion=?, email=?, ruc=? WHERE id=?')
    .run(nombre, telefono||'', direccion||'', email||'', ruc||'', req.params.id);
  res.json({ ok: true });
});

router.delete('/proveedores/:id', (req, res) => {
  const db = getDb();
  db.prepare('UPDATE proveedores SET activo = 0 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
