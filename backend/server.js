const express = require('express');
const cors = require('cors');
const path = require('path');

async function start() {
  const { initDb, saveDb } = require('./database');
  await initDb();

  const routes = require('./routes');

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  // Auto-save after mutations
  app.use('/api', (req, res, next) => {
    const orig = res.json.bind(res);
    res.json = function (body) {
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        try { saveDb(); } catch (e) { console.error('DB save error:', e.message); }
      }
      return orig(body);
    };
    next();
  });

  app.use('/api', routes);
  app.use(express.static(path.join(__dirname, '..')));

  app.listen(PORT, () => {
    console.log(`ERP Avícola corriendo en http://localhost:${PORT}`);
    console.log('Usuarios: admin/123, produccion/123, almacen/123, ventas/123');
  });
}

start().catch(err => {
  console.error('Error al iniciar:', err);
  process.exit(1);
});
