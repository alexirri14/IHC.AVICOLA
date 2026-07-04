-- ============================================================
-- ERP Avícola - Esquema Completo para Supabase
-- Ejecutar en SQL Editor de Supabase Dashboard
-- ============================================================

-- 1. TABLAS BASE
-- ============================================================

-- Galpones (gallineros)
CREATE TABLE IF NOT EXISTS galpones (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  capacidad integer DEFAULT 0,
  gallinas integer DEFAULT 0,
  edad_lote integer DEFAULT 0,
  consumo_diario numeric(10,2) DEFAULT 0,
  fecha_ingreso date,
  estado text DEFAULT 'Activo',
  alimento_kg numeric(10,2) DEFAULT 0,
  produccion_promedio numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
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
  tandas numeric(10,2) DEFAULT 0,
  kg_producidos numeric(10,2) DEFAULT 0,
  costo numeric(10,2) DEFAULT 0,
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

-- Compras
CREATE TABLE IF NOT EXISTS compras (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fecha date NOT NULL,
  proveedor_id bigint REFERENCES proveedores(id),
  proveedor_nombre text,
  insumo_id bigint REFERENCES insumos(id),
  insumo_nombre text,
  cantidad numeric(10,2) DEFAULT 0,
  precio_unitario numeric(10,2) DEFAULT 0,
  total numeric(10,2) DEFAULT 0,
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

-- Lotes de huevos (para almacenamiento)
CREATE TABLE IF NOT EXISTS lotes_huevos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  clase text NOT NULL,
  cantidad_disponible numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 2. VISTAS PARA REPORTES
-- ============================================================

-- Vista: Stock de alimento por galpón
CREATE OR REPLACE VIEW vista_stock_alimento AS
SELECT 
  g.id,
  g.nombre,
  g.alimento_kg AS kg,
  g.consumo_diario,
  CASE WHEN g.consumo_diario > 0 
    THEN floor(g.alimento_kg / g.consumo_diario) 
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
  COALESCE((SELECT SUM(alimento_kg) FROM galpones), 0) AS stock_alimento,
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
CREATE OR REPLACE FUNCTION distribuir_alimento(p_kg numeric)
RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  total_activos integer;
  por_galpon numeric;
BEGIN
  SELECT COUNT(*) INTO total_activos FROM galpones WHERE estado = 'Activo';
  IF total_activos > 0 THEN
    por_galpon := p_kg / total_activos;
    UPDATE galpones SET alimento_kg = alimento_kg + por_galpon WHERE estado = 'Activo';
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
ALTER TABLE compras ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;
ALTER TABLE almacen_movimientos ENABLE ROW LEVEL SECURITY;
ALTER TABLE clasificacion_huevos ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_huevos ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE parametros ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE lotes_huevos ENABLE ROW LEVEL SECURITY;

-- Políticas: permitir todo a usuarios autenticados
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'galpones','produccion','formulas','produccion_molino','insumos',
    'proveedores','compras','clientes','ventas','almacen_movimientos',
    'clasificacion_huevos','stock_huevos','alertas','empresa',
    'parametros','usuarios','lotes_huevos'
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
INSERT INTO stock_huevos (clase, cantidad) VALUES
  ('Primera', 0), ('Segunda', 0), ('Pardo', 0), ('Jumbo', 0),
  ('Sucio', 0), ('Quiñados', 0)
ON CONFLICT (clase) DO NOTHING;

INSERT INTO empresa (nombre, ruc, direccion, telefono) VALUES
  ('El Rancho del Buen Pastor', '', '', '')
ON CONFLICT DO NOTHING;

INSERT INTO parametros (clave, valor, descripcion) VALUES
  ('peso_jaba_kg', '18', 'Peso promedio por jaba en kilogramos')
ON CONFLICT (clave) DO NOTHING;

INSERT INTO alertas (tipo, icono, mensaje) VALUES
  ('info', 'ℹ️', 'Bienvenido al sistema ERP Avícola. Configure los datos iniciales en Configuración.')
ON CONFLICT DO NOTHING;

-- Nota: Las vistas no necesitan RLS explícito porque leen de tablas que ya tienen RLS.
-- Los usuarios autenticados pueden leer las vistas directamente.
