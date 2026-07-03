const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/alertas/config', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM alertas_config').all());
});

router.put('/alertas/config/:id', (req, res) => {
  const { activo, umbral } = req.body;
  const db = getDb();
  if (activo !== undefined) db.prepare('UPDATE alertas_config SET activo = ? WHERE id = ?').run(activo ? 1 : 0, req.params.id);
  if (umbral !== undefined) db.prepare('UPDATE alertas_config SET umbral = ? WHERE id = ?').run(umbral, req.params.id);
  res.json({ ok: true });
});

router.get('/alertas/generar', (req, res) => {
  const db = getDb();
  const configs = db.prepare('SELECT * FROM alertas_config WHERE activo = 1').all();
  const alertas = [];

  for (const cfg of configs) {
    if (cfg.tipo === 'stock_insumo_bajo') {
      const rows = db.prepare('SELECT nombre, cantidad_kg, stock_minimo_kg FROM insumos WHERE activo = 1').all();
      for (const r of rows) {
        if (Number(r.cantidad_kg) <= Number(r.stock_minimo_kg)) {
          alertas.push({ tipo: 'stock_insumo_bajo', mensaje: 'Stock crítico: ' + r.nombre + ' (' + r.cantidad_kg + ' kg)' });
          db.prepare('INSERT INTO notificaciones (tipo, mensaje) VALUES (?,?)').run('stock_insumo_bajo', 'Stock crítico: ' + r.nombre);
        }
      }
    }
    if (cfg.tipo === 'alimento_bajo') {
      const rows = db.prepare('SELECT g.nombre, a.kg FROM alimento_galpon a JOIN galpones g ON g.id = a.galpon_id WHERE g.activo = 1').all();
      for (const r of rows) {
        const sacos = Number(r.kg) / 50;
        if (sacos < Number(cfg.umbral || 5)) {
          alertas.push({ tipo: 'alimento_bajo', mensaje: 'Alimento bajo en ' + r.nombre + ': ' + sacos.toFixed(1) + ' sacos' });
          db.prepare('INSERT INTO notificaciones (tipo, mensaje) VALUES (?,?)').run('alimento_bajo', 'Alimento bajo en ' + r.nombre);
        }
      }
    }
    if (cfg.tipo === 'sin_formula') {
      const rows = db.prepare('SELECT g.id, g.nombre FROM galpones g WHERE g.activo = 1').all();
      for (const r of rows) {
        const formula = db.prepare('SELECT id FROM formulas_molino WHERE galpon_id = ?').get(r.id);
        if (!formula) {
          alertas.push({ tipo: 'sin_formula', mensaje: 'Falta fórmula para ' + r.nombre });
          db.prepare('INSERT INTO notificaciones (tipo, mensaje) VALUES (?,?)').run('sin_formula', 'Falta fórmula para ' + r.nombre);
        }
      }
    }
    if (cfg.tipo === 'stock_huevos_bajo') {
      const stock = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos").get();
      if (Number(stock.total) < Number(cfg.umbral || 10)) {
        alertas.push({ tipo: 'stock_huevos_bajo', mensaje: 'Stock bajo de huevos: ' + stock.total + ' jabas' });
        db.prepare('INSERT INTO notificaciones (tipo, mensaje) VALUES (?,?)').run('stock_huevos_bajo', 'Stock bajo de huevos');
      }
    }
    if (cfg.tipo === 'produccion_baja') {
      const hoy = new Date().toISOString().split('T')[0];
      const rows = db.prepare('SELECT p.*, g.gallinas FROM produccion p JOIN galpones g ON g.id = p.galpon_id WHERE p.fecha = ?').all(hoy);
      for (const r of rows) {
        if (Number(g.gallinas) > 0) {
          const rendimiento = (Number(r.jabas) * 360) / Number(g.gallinas);
          if (rendimiento < Number(cfg.umbral || 0.7) * 100) {
            alertas.push({ tipo: 'produccion_baja', mensaje: 'Rendimiento bajo en ' + r.galpon_nombre + ': ' + rendimiento.toFixed(1) });
          }
        }
      }
    }
  }

  res.json(alertas);
});

router.get('/alertas/notificaciones', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT * FROM notificaciones ORDER BY fecha DESC LIMIT 50').all());
});

router.put('/alertas/notificaciones/:id/leer', (req, res) => {
  const db = getDb();
  db.prepare('UPDATE notificaciones SET leida = 1 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
