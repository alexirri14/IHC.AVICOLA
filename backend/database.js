const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'erp_avicola.db');

let db = null;
let rawDb = null;
let initPromise = null;

function makeDb(database) {
  return {
    prepare(sql) {
      return {
        all(...params) {
          const stmt = database.prepare(sql);
          if (params.length) stmt.bind(params);
          const rows = [];
          while (stmt.step()) rows.push(stmt.getAsObject());
          stmt.free();
          return rows;
        },
        get(...params) {
          const stmt = database.prepare(sql);
          if (params.length) stmt.bind(params);
          let row = null;
          if (stmt.step()) row = stmt.getAsObject();
          stmt.free();
          return row;
        },
        run(...params) {
          database.run(sql, params);
          const r = database.exec("SELECT last_insert_rowid() as id, changes() as changes");
          const info = r[0] ? r[0].values[0] : [0, 0];
          return { lastInsertRowid: info[0], changes: info[1] };
        }
      };
    },
    exec(sql) { return database.exec(sql); },
    run(sql, params) { database.run(sql, params); }
  };
}

function saveDb() {
  if (!rawDb) return;
  try {
    const data = rawDb.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  } catch (e) {
    console.error('Error saving database:', e.message);
  }
}

async function initDb() {
  if (db) return db;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const SQL = await initSqlJs();
    let buffer = null;
    if (fs.existsSync(DB_PATH)) buffer = fs.readFileSync(DB_PATH);

    rawDb = new SQL.Database(buffer);
    rawDb.run("PRAGMA foreign_keys = ON");
    db = makeDb(rawDb);

    await ensureSchema();

    if (!buffer) {
      await seedData();
      saveDb();
    }

    return db;
  })();

  return initPromise;
}

function getDb() {
  if (!db) throw new Error('Database not initialized. Call initDb() first.');
  return db;
}

async function ensureSchema() {
  rawDb.run(`CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT UNIQUE NOT NULL, clave TEXT NOT NULL, rol TEXT NOT NULL DEFAULT 'Producción', activo INTEGER DEFAULT 1, creado_en TEXT DEFAULT (datetime('now','localtime')))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS galpones (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT UNIQUE NOT NULL, gallinas INTEGER DEFAULT 0, activo INTEGER DEFAULT 1, creado_en TEXT DEFAULT (datetime('now','localtime')))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS produccion (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, galpon_id INTEGER NOT NULL, primera REAL DEFAULT 0, segunda REAL DEFAULT 0, jabas REAL DEFAULT 0, paquetes INTEGER DEFAULT 0, muertas INTEGER DEFAULT 0, gallinas_restantes INTEGER DEFAULT 0, FOREIGN KEY (galpon_id) REFERENCES galpones(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT, direccion TEXT, email TEXT, ruc TEXT, activo INTEGER DEFAULT 1, creado_en TEXT DEFAULT (datetime('now','localtime')))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS proveedores (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT, direccion TEXT, email TEXT, ruc TEXT, activo INTEGER DEFAULT 1, creado_en TEXT DEFAULT (datetime('now','localtime')))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS ventas (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, cliente_id INTEGER, cliente_nombre TEXT, primera REAL DEFAULT 0, segunda REAL DEFAULT 0, total_jabas REAL DEFAULT 0, promedio_kg_jaba REAL DEFAULT 18, peso REAL DEFAULT 0, precio_primera REAL DEFAULT 6.00, precio_segunda REAL DEFAULT 5.00, total_primera REAL DEFAULT 0, total_segunda REAL DEFAULT 0, total REAL DEFAULT 0, monto_total REAL DEFAULT 0, FOREIGN KEY (cliente_id) REFERENCES clientes(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS lotes_huevos (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, galpon_id INTEGER, galpon_nombre TEXT, clase TEXT NOT NULL, cantidad_inicial REAL DEFAULT 0, cantidad_disponible REAL DEFAULT 0, produccion_id INTEGER, FOREIGN KEY (produccion_id) REFERENCES produccion(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS movimientos_huevos (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, tipo TEXT NOT NULL, detalle TEXT, primera REAL DEFAULT 0, segunda REAL DEFAULT 0, total REAL DEFAULT 0, venta_id INTEGER, produccion_id INTEGER)`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS insumos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT UNIQUE NOT NULL, cantidad_kg REAL DEFAULT 0, unidad_compra TEXT DEFAULT 'sacos de 50 kg', kg_por_unidad REAL DEFAULT 50, etiqueta TEXT DEFAULT 'Saco 50 kg', stock_minimo_kg REAL DEFAULT 50, activo INTEGER DEFAULT 1)`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS formulas_molino (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT UNIQUE NOT NULL, galpon_id INTEGER, destino TEXT, creado_en TEXT DEFAULT (datetime('now','localtime')), FOREIGN KEY (galpon_id) REFERENCES galpones(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS formula_insumos (id INTEGER PRIMARY KEY AUTOINCREMENT, formula_id INTEGER NOT NULL, insumo_id INTEGER NOT NULL, kg_por_tanda REAL DEFAULT 0, FOREIGN KEY (formula_id) REFERENCES formulas_molino(id) ON DELETE CASCADE, FOREIGN KEY (insumo_id) REFERENCES insumos(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS produccion_molino (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, formula_id INTEGER, formula_nombre TEXT, destino TEXT, tandas INTEGER DEFAULT 1, sacos INTEGER DEFAULT 30, kg REAL DEFAULT 1500, insumos_resumen TEXT, FOREIGN KEY (formula_id) REFERENCES formulas_molino(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS produccion_molino_detalle (id INTEGER PRIMARY KEY AUTOINCREMENT, produccion_molino_id INTEGER NOT NULL, insumo_nombre TEXT, kg_usado REAL DEFAULT 0, stock_restante REAL DEFAULT 0, FOREIGN KEY (produccion_molino_id) REFERENCES produccion_molino(id) ON DELETE CASCADE)`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS alimento_galpon (id INTEGER PRIMARY KEY AUTOINCREMENT, galpon_id INTEGER NOT NULL, kg REAL DEFAULT 0, FOREIGN KEY (galpon_id) REFERENCES galpones(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS movimientos_alimento (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, tipo TEXT NOT NULL, detalle TEXT, cantidad TEXT, formula TEXT, destino TEXT, tandas INTEGER)`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS empleados (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, telefono TEXT, direccion TEXT, cargo TEXT, salario REAL DEFAULT 0, fecha_ingreso TEXT, activo INTEGER DEFAULT 1, creado_en TEXT DEFAULT (datetime('now','localtime')))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS compras (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT NOT NULL, proveedor_id INTEGER, proveedor_nombre TEXT, insumo_id INTEGER, insumo_nombre TEXT, cantidad REAL DEFAULT 0, unidad TEXT, precio_unitario REAL DEFAULT 0, total REAL DEFAULT 0, estado TEXT DEFAULT 'Pendiente', creado_en TEXT DEFAULT (datetime('now','localtime')), FOREIGN KEY (proveedor_id) REFERENCES proveedores(id), FOREIGN KEY (insumo_id) REFERENCES insumos(id))`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS dias_cerrados (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT UNIQUE NOT NULL)`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS alertas_config (id INTEGER PRIMARY KEY AUTOINCREMENT, tipo TEXT NOT NULL, activo INTEGER DEFAULT 1, umbral REAL, mensaje TEXT)`);
  rawDb.run(`CREATE TABLE IF NOT EXISTS notificaciones (id INTEGER PRIMARY KEY AUTOINCREMENT, fecha TEXT DEFAULT (datetime('now','localtime')), tipo TEXT, mensaje TEXT, leida INTEGER DEFAULT 0)`);
}

async function seedData() {
  rawDb.run("INSERT INTO usuarios (usuario, clave, rol) VALUES ('admin', '123', 'Administrador')");
  rawDb.run("INSERT INTO usuarios (usuario, clave, rol) VALUES ('produccion', '123', 'Producción')");
  rawDb.run("INSERT INTO usuarios (usuario, clave, rol) VALUES ('almacen', '123', 'Almacén')");
  rawDb.run("INSERT INTO usuarios (usuario, clave, rol) VALUES ('ventas', '123', 'Ventas')");

  for (const [n, g] of [['Galpón 4', 12765], ['Galpón 5', 11800], ['Galpón 6', 12300], ['Galpón 8', 10900], ['Galpón Automático', 8500]]) {
    rawDb.run("INSERT INTO galpones (nombre, gallinas) VALUES (?, ?)", [n, g]);
    const r = rawDb.exec("SELECT last_insert_rowid() as id");
    rawDb.run("INSERT INTO alimento_galpon (galpon_id, kg) VALUES (?, 0)", [r[0].values[0][0]]);
  }

  const insumosList = [
    ['MAIZ', 100000, 'toneladas', 1000, 'Granel', 2000],
    ['TORTA DE SOYA', 50000, 'toneladas', 1000, 'Granel', 2000],
    ['PALMISTE', 750, 'sacos de 50 kg', 50, 'Saco 50 kg', 250],
    ['CAL FINA', 1250, 'sacos de 50 kg', 50, 'Saco 50 kg', 250],
    ['CAL GRUESO', 1750, 'sacos de 50 kg', 50, 'Saco 50 kg', 250],
    ['ACEITE DE SOYA', 20000, 'tanques de 1000 L', 1000, 'Litros', 2000],
    ['SAL INDUSTRIAL', 500, 'sacos de 50 kg', 50, 'Saco 50 kg', 250],
    ['PHOSBIC', 200, 'sacos de 25 kg', 25, 'Saco 25 kg', 100],
    ['PRE POSTURA', 75, 'sacos de 25 kg', 25, 'Saco 25 kg', 75],
    ['METIONINA', 2000, 'tanques de 1000 L', 1000, 'Litros', 1000],
    ['LISINA', 50, 'sacos de 25 kg', 25, 'Saco 25 kg', 50],
    ['BIO COLINA', 25, 'sacos de 25 kg', 25, 'Saco 25 kg', 25],
    ['BICARBONATO', 125, 'sacos de 25 kg', 25, 'Saco 25 kg', 100],
    ['NEOMICINA', 25, 'sacos de 25 kg', 25, 'Saco 25 kg', 25],
    ['SECUESTRANTE', 50, 'sacos de 25 kg', 25, 'Saco 25 kg', 50],
    ['TREONINA', 25, 'sacos de 25 kg', 25, 'Saco 25 kg', 25],
    ['LIPTOSA', 25, 'sacos de 25 kg', 25, 'Saco 25 kg', 25],
    ['ADIPACK', 25, 'sacos de 25 kg', 25, 'Saco 25 kg', 25]
  ];
  for (const i of insumosList) rawDb.run("INSERT INTO insumos (nombre, cantidad_kg, unidad_compra, kg_por_unidad, etiqueta, stock_minimo_kg) VALUES (?,?,?,?,?,?)", i);

  const formulas = [
    { nombre: 'GALPON 4', galpon: 'Galpón 4' },
    { nombre: 'GALPON 5', galpon: 'Galpón 5' },
    { nombre: 'GALPON 6', galpon: 'Galpón 6' },
    { nombre: 'GALPON 8', galpon: 'Galpón 8' },
    { nombre: 'GALPON AUTOMATICO', galpon: 'Galpón Automático' }
  ];

  const gRows = rawDb.exec("SELECT id, nombre FROM galpones")[0].values;
  const galponMap = {};
  for (const r of gRows) galponMap[r[1]] = r[0];

  for (const f of formulas) {
    const gid = galponMap[f.galpon];
    if (gid) rawDb.run("INSERT INTO formulas_molino (nombre, galpon_id, destino) VALUES (?,?,?)", [f.nombre, gid, f.galpon]);
  }

  rawDb.run("INSERT INTO alertas_config (tipo, activo, umbral) VALUES ('stock_insumo_bajo', 1, 1)");
  rawDb.run("INSERT INTO alertas_config (tipo, activo, umbral) VALUES ('alimento_bajo', 1, 5)");
  rawDb.run("INSERT INTO alertas_config (tipo, activo, umbral) VALUES ('sin_formula', 1, NULL)");
  rawDb.run("INSERT INTO alertas_config (tipo, activo, umbral) VALUES ('produccion_baja', 1, 0.7)");
  rawDb.run("INSERT INTO alertas_config (tipo, activo, umbral) VALUES ('stock_huevos_bajo', 1, 10)");

  rawDb.run("INSERT INTO clientes (nombre, telefono, direccion) VALUES ('Cliente Genérico', '999999999', 'Sin dirección')");
  rawDb.run("INSERT INTO clientes (nombre, telefono, direccion) VALUES ('Avícola El Buen Pastor', '987654321', 'Carretera Central Km 42')");
  rawDb.run("INSERT INTO clientes (nombre, telefono, direccion) VALUES ('Distribuidora San Miguel', '976543210', 'Av. Los Olivos 123')");

  rawDb.run("INSERT INTO proveedores (nombre, telefono, direccion, ruc) VALUES ('Proveedor Genérico', '999999999', 'Sin dirección', '20123456789')");
  rawDb.run("INSERT INTO proveedores (nombre, telefono, direccion, ruc) VALUES ('Agroinsumos del Norte', '948372615', 'Av. Industrial 456', '20987654321')");
  rawDb.run("INSERT INTO proveedores (nombre, telefono, direccion, ruc) VALUES ('Nutrientes S.A.C.', '927364819', 'Calle Los Pinos 789', '20555555555')");

  rawDb.run("INSERT INTO empleados (nombre, telefono, cargo, salario, fecha_ingreso) VALUES ('Juan Pérez', '987654321', 'Encargado de Producción', 2500, '2024-01-15')");
  rawDb.run("INSERT INTO empleados (nombre, telefono, cargo, salario, fecha_ingreso) VALUES ('María López', '976543210', 'Encargada de Almacén', 2200, '2024-02-01')");
  rawDb.run("INSERT INTO empleados (nombre, telefono, cargo, salario, fecha_ingreso) VALUES ('Carlos Sánchez', '965432109', 'Vendedor', 1800, '2024-03-10')");
  rawDb.run("INSERT INTO empleados (nombre, telefono, cargo, salario, fecha_ingreso) VALUES ('Ana Torres', '954321098', 'Operario de Molino', 2000, '2024-01-20')");
}

module.exports = { initDb, getDb, saveDb };
