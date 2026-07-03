const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.post('/auth/login', (req, res) => {
  const { usuario, clave } = req.body;
  const db = getDb();
  const user = db.prepare('SELECT id, usuario, rol FROM usuarios WHERE usuario = ? AND clave = ? AND activo = 1').get(usuario, clave);
  if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  res.json({ usuario: user });
});

router.get('/auth/usuarios', (req, res) => {
  const db = getDb();
  const usuarios = db.prepare('SELECT id, usuario, rol, activo FROM usuarios').all();
  res.json(usuarios);
});

router.post('/auth/usuarios', (req, res) => {
  const { usuario, clave, rol } = req.body;
  const db = getDb();
  try {
    db.prepare('INSERT INTO usuarios (usuario, clave, rol) VALUES (?, ?, ?)').run(usuario, clave, rol);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: 'El usuario ya existe' });
  }
});

module.exports = router;
