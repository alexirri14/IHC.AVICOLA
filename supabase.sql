-- ============================================================
-- ERP Avícola - Esquema Completo para Supabase
-- Ejecutar en SQL Editor de Supabase Dashboard
-- ============================================================

-- 0. MIGRACIONES PARA TABLAS EXISTENTES
-- ============================================================
ALTER TABLE galpones ADD COLUMN IF NOT EXISTS alimento_sacos numeric(10,2) DEFAULT 0;
ALTER TABLE galpones ADD COLUMN IF NOT EXISTS consumo_diario numeric(10,2) DEFAULT 0;
ALTER TABLE galpones ADD COLUMN IF NOT EXISTS fecha_ingreso date;
ALTER TABLE galpones ADD COLUMN IF NOT EXISTS produccion_promedio numeric(10,2) DEFAULT 0;
ALTER TABLE produccion_molino ADD COLUMN IF NOT EXISTS galpon_id bigint REFERENCES galpones(id);
ALTER TABLE produccion_molino ADD COLUMN IF NOT EXISTS detalle text;
ALTER TABLE produccion_molino ADD COLUMN IF NOT EXISTS kg_producidos numeric(10,2) DEFAULT 0;
ALTER TABLE ventas ADD COLUMN IF NOT EXISTS precio_primera numeric(10,2) DEFAULT 0;
ALTER TABLE ventas ADD COLUMN IF NOT EXISTS precio_segunda numeric(10,2) DEFAULT 0;
ALTER TABLE ventas ADD COLUMN IF NOT EXISTS total_jabas numeric(10,2) DEFAULT 0;
ALTER TABLE ventas ADD COLUMN IF NOT EXISTS cliente_nombre text;
ALTER TABLE insumos ADD COLUMN IF NOT EXISTS cantidad_kg numeric(10,2) DEFAULT 0;
ALTER TABLE insumos ADD COLUMN IF NOT EXISTS stock_minimo_kg numeric(10,2) DEFAULT 0;
ALTER TABLE insumos ADD COLUMN IF NOT EXISTS etiqueta text DEFAULT 'Kg';
ALTER TABLE insumos ADD COLUMN IF NOT EXISTS ultima_compra date;
ALTER TABLE insumos ADD COLUMN IF NOT EXISTS ultima_salida date;

-- 1. TABLAS BASE
-- ============================================================

-- Galpones (gallineros)
CREATE TABLE IF NOT EXISTS galpones (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  gallinas integer DEFAULT 0,
  consumo_diario numeric(10,2) DEFAULT 0,
  fecha_ingreso date,
  estado text DEFAULT 'Activo',
  alimento_sacos numeric(10,2) DEFAULT 0,
  produccion_promedio numeric(10,2) DEFAULT 0
);

-- Producción diaria de huevos
CREATE TABLE IF NOT EXISTS produccion (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  galpon_id bigint REFERENCES galpones(id),
  primera numeric(10,2) DEFAULT 0,
  segunda numeric(10,2) DEFAULT 0,
  muertas integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Fórmulas de alimento
CREATE TABLE IF NOT EXISTS formulas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  descripcion text,
  created_at timestamptz DEFAULT now()
);

-- Producción del molino
CREATE TABLE IF NOT EXISTS produccion_molino (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  formula_id bigint REFERENCES formulas(id),
  galpon_id bigint REFERENCES galpones(id),
  tandas numeric(10,2) DEFAULT 0,
  kg_producidos numeric(10,2) DEFAULT 0,
  detalle text,
  created_at timestamptz DEFAULT now()
);

-- Insumos usados en cada producción de molino
CREATE TABLE IF NOT EXISTS produccion_molino_insumos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  produccion_id bigint REFERENCES produccion_molino(id) ON DELETE CASCADE,
  insumo_id bigint REFERENCES insumos(id),
  insumo_nombre text,
  cantidad numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Insumos (materias primas)
CREATE TABLE IF NOT EXISTS insumos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  cantidad_kg numeric(10,2) DEFAULT 0,
  stock_minimo_kg numeric(10,2) DEFAULT 0,
  unidad text DEFAULT 'kg',
  etiqueta text DEFAULT 'Kg',
  ultima_compra date,
  ultima_salida date,
  created_at timestamptz DEFAULT now()
);

-- Proveedores
CREATE TABLE IF NOT EXISTS proveedores (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Ingreso de insumos (reemplaza compras)
CREATE TABLE IF NOT EXISTS ingreso_insumos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  proveedor_nombre text,
  detalle text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingreso_insumos_detalle (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ingreso_id bigint REFERENCES ingreso_insumos(id) ON DELETE CASCADE,
  insumo_id bigint REFERENCES insumos(id),
  insumo_nombre text,
  cantidad numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Ventas
CREATE TABLE IF NOT EXISTS ventas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  cliente_id bigint REFERENCES clientes(id),
  cliente_nombre text,
  precio_primera numeric(10,2) DEFAULT 0,
  precio_segunda numeric(10,2) DEFAULT 0,
  primera numeric(10,2) DEFAULT 0,
  segunda numeric(10,2) DEFAULT 0,
  pardo numeric(10,2) DEFAULT 0,
  jumbo numeric(10,2) DEFAULT 0,
  sucio numeric(10,2) DEFAULT 0,
  limpieza numeric(10,2) DEFAULT 0,
  quinados numeric(10,2) DEFAULT 0,
  total_jabas numeric(10,2) DEFAULT 0,
  peso numeric(10,2) DEFAULT 0,
  total numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Movimientos de almacén de huevos
CREATE TABLE IF NOT EXISTS almacen_movimientos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  tipo text NOT NULL,
  detalle text,
  primera numeric(10,2) DEFAULT 0,
  segunda numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Clasificación de huevos segunda
CREATE TABLE IF NOT EXISTS clasificacion_huevos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  clase text NOT NULL,
  cantidad numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Stock de huevos por clase
CREATE TABLE IF NOT EXISTS stock_huevos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  clase text NOT NULL UNIQUE,
  cantidad numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Alertas del sistema
CREATE TABLE IF NOT EXISTS alertas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tipo text NOT NULL DEFAULT 'info',
  icono text DEFAULT '📌',
  mensaje text NOT NULL,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Configuración de empresa
CREATE TABLE IF NOT EXISTS empresa (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text DEFAULT 'Mi Empresa',
  ruc text DEFAULT '',
  direccion text DEFAULT '',
  telefono text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Parámetros del sistema
CREATE TABLE IF NOT EXISTS parametros (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  clave text NOT NULL UNIQUE,
  valor text NOT NULL,
  descripcion text,
  created_at timestamptz DEFAULT now()
);

-- Usuarios del sistema ERP
CREATE TABLE IF NOT EXISTS usuarios (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario text NOT NULL UNIQUE,
  password text NOT NULL,
  rol text DEFAULT 'Producción',
  empleado_nombre text,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Consumo diario de alimento por galpón
CREATE TABLE IF NOT EXISTS consumo_alimento (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  galpon_id bigint REFERENCES galpones(id),
  kg_consumidos numeric(10,2) DEFAULT 0,
  sacos_50kg numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE (fecha, galpon_id)
);

-- RPC: Registrar consumo diario y descontar del stock del galpón
CREATE OR REPLACE FUNCTION registrar_consumo(p_fecha date, p_galpon_id bigint, p_sacos numeric)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  v_sacos_diff numeric;
  v_anterior numeric;
BEGIN
  SELECT sacos_50kg INTO v_anterior FROM consumo_alimento WHERE fecha = p_fecha AND galpon_id = p_galpon_id;
  INSERT INTO consumo_alimento (fecha, galpon_id, kg_consumidos, sacos_50kg)
    VALUES (p_fecha, p_galpon_id, p_sacos * 50, p_sacos)
    ON CONFLICT (fecha, galpon_id) DO UPDATE SET kg_consumidos = p_sacos * 50, sacos_50kg = p_sacos;
  v_sacos_diff := p_sacos - COALESCE(v_anterior, 0);
  UPDATE galpones SET alimento_sacos = GREATEST(0, alimento_sacos - v_sacos_diff) WHERE id = p_galpon_id;
END $$;

-- 2. VISTAS PARA REPORTES
-- ============================================================
DROP VIEW IF EXISTS vista_stock_alimento CASCADE;
DROP VIEW IF EXISTS vista_dashboard CASCADE;
DROP VIEW IF EXISTS vista_produccion_semanal CASCADE;
DROP VIEW IF EXISTS vista_ventas_mensual CASCADE;
DROP VIEW IF EXISTS vista_consumo_alimento CASCADE;
DROP VIEW IF EXISTS vista_produccion_galpon CASCADE;
DROP VIEW IF EXISTS vista_produccion_molino_formula CASCADE;
DROP VIEW IF EXISTS vista_ingreso_insumos CASCADE;

-- Vista: Stock de alimento por galpón
CREATE OR REPLACE VIEW vista_stock_alimento AS
SELECT 
  g.id,
  g.nombre,
  g.alimento_sacos AS sacos,
  g.consumo_diario,
  CASE WHEN g.consumo_diario > 0 
    THEN floor(g.alimento_sacos / g.consumo_diario) 
    ELSE 99 
  END AS dias_restantes
FROM galpones g
WHERE g.estado = 'Activo';

-- Vista: Dashboard resumen
CREATE OR REPLACE VIEW vista_dashboard AS
SELECT
  COALESCE((SELECT SUM(gallinas) FROM galpones), 0) AS gallinas_vivas,
  COALESCE((SELECT SUM(primera + segunda) FROM produccion WHERE fecha = CURRENT_DATE), 0) AS produccion_hoy,
  COALESCE((SELECT SUM(cantidad) FROM stock_huevos), 0) AS stock_huevos,
  COALESCE((SELECT SUM(alimento_sacos) FROM galpones), 0) AS stock_alimento,
  COALESCE((SELECT SUM(total_jabas) FROM ventas WHERE fecha = CURRENT_DATE), 0) AS ventas_hoy,
  COALESCE((SELECT SUM(muertas) FROM produccion WHERE fecha = CURRENT_DATE), 0) AS mortalidad_hoy;

-- Vista: Producción semanal
CREATE OR REPLACE VIEW vista_produccion_semanal AS
SELECT fecha, SUM(primera + segunda) AS jabas
FROM produccion
WHERE fecha >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY fecha
ORDER BY fecha;

-- Vista: Ventas mensuales
CREATE OR REPLACE VIEW vista_ventas_mensual AS
SELECT fecha, SUM(total_jabas) AS jabas
FROM ventas
WHERE fecha >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY fecha
ORDER BY fecha;

-- Vista: Consumo de alimento
CREATE OR REPLACE VIEW vista_consumo_alimento AS
SELECT fecha, SUM(kg_producidos) AS kg
FROM produccion_molino
WHERE fecha >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY fecha
ORDER BY fecha;

-- Vista: Producción con nombre de galpón
CREATE OR REPLACE VIEW vista_produccion_galpon AS
SELECT p.*, g.nombre AS galpon_nombre
FROM produccion p
LEFT JOIN galpones g ON g.id = p.galpon_id;

-- Vista: Producción molino con nombre de fórmula y galpón
CREATE OR REPLACE VIEW vista_produccion_molino_formula AS
SELECT pm.*, f.nombre AS formula_nombre, g.nombre AS galpon_nombre
FROM produccion_molino pm
LEFT JOIN formulas f ON f.id = pm.formula_id
LEFT JOIN galpones g ON g.id = pm.galpon_id;

-- Vista: Ingreso de insumos con sus detalles
CREATE OR REPLACE VIEW vista_ingreso_insumos AS
SELECT ii.*, COALESCE(d.items, '[]'::json) AS items
FROM ingreso_insumos ii
LEFT JOIN LATERAL (
  SELECT json_agg(json_build_object(
    'id', iid.id,
    'insumo_id', iid.insumo_id,
    'insumo_nombre', iid.insumo_nombre,
    'cantidad', iid.cantidad
  ) ORDER BY iid.id) AS items
  FROM ingreso_insumos_detalle iid
  WHERE iid.ingreso_id = ii.id
) d ON true
ORDER BY ii.fecha DESC;

-- 3. RPC (STORED PROCEDURES)
-- ============================================================

-- Sumar al stock de huevos
CREATE OR REPLACE FUNCTION sumar_stock(p_clase text, p_cantidad numeric)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  IF p_cantidad > 0 THEN
    INSERT INTO stock_huevos (clase, cantidad) VALUES (p_clase, p_cantidad)
    ON CONFLICT (clase) DO UPDATE SET cantidad = stock_huevos.cantidad + p_cantidad;
  END IF;
END $$;

-- Restar del stock de huevos
CREATE OR REPLACE FUNCTION restar_stock(p_clase text, p_cantidad numeric)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  IF p_cantidad > 0 THEN
    UPDATE stock_huevos SET cantidad = GREATEST(0, cantidad - p_cantidad) WHERE clase = p_clase;
  END IF;
END $$;

-- Sumar cantidad a un insumo
CREATE OR REPLACE FUNCTION sumar_insumo(p_id bigint, p_cantidad numeric, p_fecha date)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE insumos SET cantidad_kg = cantidad_kg + p_cantidad, ultima_compra = p_fecha WHERE id = p_id;
END $$;

-- Distribuir alimento producido a los galpones activos
CREATE OR REPLACE FUNCTION distribuir_alimento(p_sacos numeric)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  total_activos integer;
  por_galpon numeric;
BEGIN
  SELECT COUNT(*) INTO total_activos FROM galpones WHERE estado = 'Activo';
  IF total_activos > 0 THEN
    por_galpon := p_sacos / total_activos;
    UPDATE galpones SET alimento_sacos = alimento_sacos + por_galpon WHERE estado = 'Activo';
  END IF;
END $$;

-- 5. RLS (ROW LEVEL SECURITY)
-- ============================================================
ALTER TABLE galpones ENABLE ROW LEVEL SECURITY;
ALTER TABLE produccion ENABLE ROW LEVEL SECURITY;
ALTER TABLE formulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE produccion_molino ENABLE ROW LEVEL SECURITY;
ALTER TABLE insumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE proveedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingreso_insumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingreso_insumos_detalle ENABLE ROW LEVEL SECURITY;
ALTER TABLE produccion_molino_insumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE almacen_movimientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clasificacion_huevos ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumo_alimento ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_huevos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE parametros ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Políticas: permitir todo a usuarios autenticados
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'galpones','produccion','formulas','produccion_molino','insumos',
    'proveedores','ingreso_insumos','ingreso_insumos_detalle','produccion_molino_insumos','clientes','ventas','almacen_movimientos',
    'clasificacion_huevos','consumo_alimento','stock_huevos','alertas','empresa',
    'parametros','usuarios'
  ])
  LOOP
    EXECUTE format(
      'DROP POLICY IF EXISTS %I_all ON %I; CREATE POLICY %I_all ON %I USING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');',
      tbl, tbl, tbl, tbl
    );
  END LOOP;
END $$;

-- 4. DATOS INICIALES
-- ============================================================
INSERT INTO galpones (nombre, gallinas, alimento_sacos) VALUES
  ('Galpón 4', 12771, 0),
  ('Galpón 5', 15741, 0),
  ('Galpón 6', 13891, 0),
  ('Galpón 8', 13663, 0),
  ('Galpón Automático', 21801, 0)
ON CONFLICT DO NOTHING;

INSERT INTO stock_huevos (clase, cantidad) VALUES
  ('Primera', 0), ('Segunda', 0),
  ('Pardo', 0), ('Jumbo', 0), ('Sucio', 0), ('Quinados', 0)
ON CONFLICT (clase) DO NOTHING;

INSERT INTO empresa (nombre, ruc, direccion, telefono) VALUES
  ('El Rancho del Buen Pastor', '', '', '')
ON CONFLICT DO NOTHING;

INSERT INTO parametros (clave, valor, descripcion) VALUES
  ('peso_jaba_kg', '18', 'Peso promedio por jaba de primera en kilogramos'),
  ('peso_jaba_kg_segunda', '18', 'Peso promedio por jaba de segunda en kilogramos')
ON CONFLICT (clave) DO NOTHING;

INSERT INTO alertas (tipo, icono, mensaje) VALUES
  ('info', 'ℹ️', 'Bienvenido al sistema ERP Avícola. Configure los datos iniciales en Configuración.')
ON CONFLICT DO NOTHING;

-- Nota: Las vistas no necesitan RLS explícito porque leen de tablas que ya tienen RLS.
-- Los usuarios autenticados pueden leer las vistas directamente.
