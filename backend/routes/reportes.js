const express = require('express');
const { getDb } = require('../database');
const router = express.Router();

router.get('/reportes/produccion-diaria', (req, res) => {
  const db = getDb();
  const { desde, hasta } = req.query;
  let sql = "SELECT p.fecha, g.nombre as galpon, p.primera, p.segunda, p.jabas, p.muertas FROM produccion p JOIN galpones g ON g.id = p.galpon_id";
  const params = [];
  const conditions = [];
  if (desde) { conditions.push('p.fecha >= ?'); params.push(desde); }
  if (hasta) { conditions.push('p.fecha <= ?'); params.push(hasta); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY p.fecha DESC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/reportes/produccion-resumen', (req, res) => {
  const db = getDb();
  const { desde, hasta } = req.query;
  let sql = "SELECT p.fecha, SUM(p.jabas) as total_jabas, SUM(p.muertas) as total_muertas, COUNT(DISTINCT p.galpon_id) as galpones_activos FROM produccion p";
  const params = [];
  const conditions = [];
  if (desde) { conditions.push('p.fecha >= ?'); params.push(desde); }
  if (hasta) { conditions.push('p.fecha <= ?'); params.push(hasta); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' GROUP BY p.fecha ORDER BY p.fecha DESC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/reportes/ventas-resumen', (req, res) => {
  const db = getDb();
  const { desde, hasta } = req.query;
  let sql = "SELECT v.fecha, SUM(v.total_jabas) as jabas_vendidas, SUM(v.peso) as peso_total, SUM(v.total) as monto_total, COUNT(*) as num_ventas FROM ventas v";
  const params = [];
  const conditions = [];
  if (desde) { conditions.push('v.fecha >= ?'); params.push(desde); }
  if (hasta) { conditions.push('v.fecha <= ?'); params.push(hasta); }
  if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' GROUP BY v.fecha ORDER BY v.fecha DESC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/reportes/insumos-resumen', (req, res) => {
  const db = getDb();
  res.json({
    total_kg: db.prepare('SELECT COALESCE(SUM(cantidad_kg),0) as total FROM insumos WHERE activo = 1').get().total,
    en_alerta: db.prepare('SELECT COUNT(*) as total FROM insumos WHERE activo = 1 AND cantidad_kg <= stock_minimo_kg').get().total
  });
});

router.get('/reportes/alimento-resumen', (req, res) => {
  const db = getDb();
  res.json(db.prepare('SELECT g.nombre, a.kg, (a.kg / 50) as sacos FROM alimento_galpon a JOIN galpones g ON g.id = a.galpon_id WHERE g.activo = 1').all());
});

router.get('/reportes/rendimiento', (req, res) => {
  const db = getDb();
  const { galpon_id } = req.query;
  let sql = "SELECT p.fecha, g.nombre as galpon, p.jabas, g.gallinas, CASE WHEN g.gallinas > 0 THEN (p.jabas * 360.0 / g.gallinas) ELSE 0 END as rendimiento FROM produccion p JOIN galpones g ON g.id = p.galpon_id";
  const params = [];
  if (galpon_id) { sql += ' WHERE p.galpon_id = ?'; params.push(Number(galpon_id)); }
  sql += ' ORDER BY p.fecha DESC';
  res.json(db.prepare(sql).all(...params));
});

router.get('/reportes/resumen-general', (req, res) => {
  const db = getDb();

  const produccionHoy = db.prepare("SELECT COALESCE(SUM(jabas),0) as total FROM produccion WHERE fecha = date('now','localtime')").get();
  const ventasHoy = db.prepare("SELECT COALESCE(SUM(total),0) as total FROM ventas WHERE fecha = date('now','localtime')").get();
  const stockHuevos1 = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Primera'").get();
  const stockHuevos2 = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Segunda'").get();
  const alimentoTotal = db.prepare('SELECT COALESCE(SUM(kg),0) as total FROM alimento_galpon').get();
  const insumosAlerta = db.prepare("SELECT COUNT(*) as total FROM insumos WHERE activo = 1 AND cantidad_kg <= stock_minimo_kg").get();
  const totalGallinas = db.prepare('SELECT COALESCE(SUM(gallinas),0) as total FROM galpones WHERE activo = 1').get();
  const totalGalpones = db.prepare('SELECT COUNT(*) as total FROM galpones WHERE activo = 1').get();

  res.json({
    produccion_hoy: produccionHoy.total,
    ventas_hoy: ventasHoy.total,
    stock_huevos: { primera: stockHuevos1.total, segunda: stockHuevos2.total, total: Number(stockHuevos1.total) + Number(stockHuevos2.total) },
    alimento_total_sacos: Number(alimentoTotal.total) / 50,
    insumos_en_alerta: insumosAlerta.total,
    total_gallinas: totalGallinas.total,
    total_galpones: totalGalpones.total
  });
});

router.get('/reportes/dashboard', (req, res) => {
  const db = getDb();
  const fechaHoy = new Date().toISOString().split('T')[0];

  const prodHoy = db.prepare("SELECT COALESCE(SUM(jabas),0) as total FROM produccion WHERE fecha = ?").get(fechaHoy);
  const ventasHoy = db.prepare("SELECT COALESCE(SUM(total),0) as total FROM ventas WHERE fecha = ?").get(fechaHoy);
  const stock1 = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Primera'").get();
  const stock2 = db.prepare("SELECT COALESCE(SUM(cantidad_disponible),0) as total FROM lotes_huevos WHERE clase = 'Segunda'").get();
  const alim = db.prepare("SELECT COALESCE(SUM(kg),0) as total FROM alimento_galpon").get();
  const gallinas = db.prepare("SELECT COALESCE(SUM(gallinas),0) as total FROM galpones WHERE activo = 1").get();

  res.json({
    produccion_hoy: prodHoy.total,
    stock_huevos: Number(stock1.total) + Number(stock2.total),
    ventas_hoy: ventasHoy.total,
    stock_alimento_sacos: Number(alim.total) / 50,
    total_gallinas: gallinas.total
  });
});

module.exports = router;
