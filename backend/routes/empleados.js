const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/empleados', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM empleados WHERE activo = 1 ORDER BY nombre').all());
});

router.post('/empleados', (req, res) => {
  const { nombre, telefono, direccion, cargo, salario, fecha_ingreso } = req.body;
  const db = getDb();
  try {
    const result = db.prepare('INSERT INTO empleados (nombre, telefono, direccion, cargo, salario, fecha_ingreso) VALUES (?,?,?,?,?,?)')
      .run(nombre, telefono||'', direccion||'', cargo||'', salario||0, fecha_ingreso||'');
    res.json({ ok: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: 'Error al crear empleado' });
  }
});

router.put('/empleados/:id', (req, res) => {
  const { nombre, telefono, direccion, cargo, salario, fecha_ingreso } = req.body;
  const db = getDb();
  db.prepare('UPDATE empleados SET nombre=?, telefono=?, direccion=?, cargo=?, salario=?, fecha_ingreso=? WHERE id=?')
    .run(nombre, telefono||'', direccion||'', cargo||'', salario||0, fecha_ingreso||'', req.params.id);
  res.json({ ok: true });
});

router.delete('/empleados/:id', (req, res) => {
  const db = getDb();
  db.prepare('UPDATE empleados SET activo = 0 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
