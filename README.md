# Supabase Configuration for IHC.AVICOLA ERP

## Configuración de Variables de Entorno

Esta aplicación ERP para producción avícola utiliza Supabase como backend y requiere las siguientes variables de entorno para funcionar correctamente:

### Variables Necesarias

#### SUPABASE_URL
URL del proyecto Supabase
```bash
SUPABASE_URL=https://gldoiaecfjsaolfmonsr.supabase.co
```

#### SUPABASE_ANON_KEY
Clave anónima/public de Supabase (URL + sb_publishable_*)
```bash
SUPABASE_ANON_KEY=sb_publishable_y-xonjHlXauKm9CTexr7xw_5jvxQ1cL
```

### Descripción de Cada Variable

#### SUPABASE_URL
- **Propósito**: URL base de la API de Supabase
- **Dónde obtenerla**: Panel de Settings → API en Supabase
- **Formato**: `https://tu-proyecto.supabase.co`
- **Ejemplo**: `https://gldoiaecfjsaolfmonsr.supabase.co`

#### SUPABASE_ANON_KEY
- **Propósito**: Clave de API anónima para el cliente (frontend)
- **Dónde obtenerla**: Panel de Settings → API en Supabase
- **Formato**: Comienza con `sb_publishable_` seguido de caracteres
- **Ejemplo**: `sb_publishable_y-xonjHlXauKm9CTexr7xw_5jvxQ1cL`

### Variables Complementarias (Opcionales)

#### SUPABASE_SERVICE_ROLE_KEY
- **Propósito**: Clave de rol de servicio para operaciones del servidor
- **Dónde obtenerla**: Panel de Settings → API en Supabase
- **Diferencia**: Más permisiivas que la clave anónima
- **Uso típico**: Operaciones del servidor donde no necesitas seguridad basada en RLS

### Agregar a Render

Para desplegar en Render:

1. Crea un proyecto en [Render.com](https://render.com)
2. Selecciona "Web Service"
3. Conéctate a tu repositorio de GitHub
4. En Variables de Entorno, agrega:

```
SUPABASE_URL=https://gldoiaecfjsaolfmonsr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_y-xonjHlXauKm9CTexr7xw_5jvxQ1cL
```

### Configuración de Base de Datos Supabase

#### Tablas del Proyecto

Esta aplicación utiliza las siguientes tablas en Supabase:

| Tabla | Descripción |
|-------|-------------|
| `usuarios` | Información de usuarios y roles |
| `empleados` | Datos de empleados |
| `galpones` | Información de galpones (aves) |
| `formulas` | Fórmulas de alimento para molinos |
| `molino` | Registro de producción de alimento |
| `almacen_huevos` | Lotes y clasificaciones de huevos |
| `lotes_huevos` | Lotes individuales de huevos |
| `movimientos_huevos` | Movimientos de entradas/salidas de huevos |
| `insumos` | Insumos y materias primas |
| `compras` | Compras a proveedores |
| `proveedores` | Listado de proveedores |
| `clientes` | Información de clientes |
| `ventas` | Registro de ventas |
| `movimientos_inventario` | Movimientos de insumos |
| `parametros` | Parámetros del sistema |
| `empresa` | Datos de la empresa |

#### Configuración de Autenticación

#### Políticas de Seguridad (RLS)

Cada tabla tiene configuradas Row-Level Security (RLS) policies basadas en roles:

- **Usuarios sin rol**: Sin acceso (excepto tabla usuarios para registro)
- **Usuario con rol 'usuario'**: Acceso básico limitado
- **Usuario con rol 'admin'**: Acceso completo a todas las operaciones

#### Políticas Específicas por Rol

| Rol | Permisos |
|-----|----------|
| `admin` | Todo acceso a todas las tablas |
| `gerencia` | Leer Reportes, leer Empresa, editar usuarios |
| `produccion` | Escribir Galpones, Escribir Molino, Leer Galpones, Leer Molino |
| `almacen` | Leer AlmacenHuevos, Escribir AlmacenInsumos, Leer Insumos, Escribir Compras |
| `ventas` | Leer Clientes, Escribir Ventas, Escribir AlmacenHuevos |

#### Autenticación con Email/Contraseña

La aplicación utiliza Auth de Supabase con:

```javascript
// Iniciar sesión
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@ejemplo.com',
  password: 'tu-contraseña'
})

// Cerrar sesión  
await supabase.auth.signOut()

// Obtener sesión actual
const { data: { session }, error } = await supabase.auth.getSession()
```

### Validación

#### Validación de Variables de Entorno

```javascript
// Validar variables de entorno en el servidor
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Faltan variables de entorno de Supabase');
}

// Validación adicional del formato
if (!SUPABASE_URL.startsWith('https://') || !SUPABASE_URL.includes('.supabase.co')) {
  throw new Error('URL de Supabase inválida');
}

if (!SUPABASE_ANON_KEY.startsWith('sb_publishable_')) {
  throw new Error('Clave anónima de Supabase inválida');
}
```

#### Manejo de Errores

```javascript
// Manejo de errores específicos de Supabase
async function supabaseRequest(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (response.status === 401) {
      // Token expirado o inválido
      await supabase.auth.signOut();
      throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
    }
    
    if (response.status === 403) {
      // Sin permisos suficientes
      throw new Error('No tienes permiso para realizar esta acción.');
    }
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error de Supabase: ${error}`);
    }
    
    return await response.json();
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Error de conexión. Verifica tu internet e intenta de nuevo.');
    }
    throw error;
  }
}
```

### Ejemplos de Configuración

#### Ejemplo Completo .env (para desarrollo local)

```bash
# .env.local
SUPABASE_URL=https://gldoiaecfjsaolfmonsr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_y-xonjHlXauKm9CTexr7xw_5jvxQ1cL
```

#### Ejemplo para Render

```
# Variables de Entorno en Render
SUPABASE_URL=https://gldoiaecfjsaolfmonsr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_y-xonjHlXauKm9CTexr7xw_5jvxQ1cL
```

### Manual de Solución de Problemas

#### Error Común: Variables Faltantes

**Síntoma**: "Faltan variables de entorno de Supabase"

**Solución**:
1. Verifica que SUPABASE_URL y SUPABASE_ANON_KEY estén configuradas
2. Verifica los valores exactos en el panel de Supabase (Settings → API)
3. Para Render, verifica que las variables estén correctamente configuradas

#### Error Común: Formato Inválido

**Síntoma**: "URL de Supabase inválida" o "Clave anónima de Supabase inválida"

**Solución**:
```
URL correcta: https://tu-proyecto.supabase.co
Clave correcta: sb_publishable_y-xonjHlXauKm9CTexr7xw_5jvxQ1cL
```

#### Error Común: No Se Pueden Realizar Operaciones

**Síntoma**: "Error de Supabase: 401" o "403"

**Posibles causas**:
- Token de sesión expirado
- Usuario no autenticado
- El rol del usuario no tiene los permisos necesarios

**Solución**:
1. Inicia sesión de nuevo
2. Verifica el rol del usuario en la base de datos de Supabase
3. Asegúrate de que la tabla tiene una política RLS adecuada

### Notas Finales

La configuración de Supabase es simple pero crítica. Asegúrate de:

1. **Siempre** usar variables de entorno en producción
2. **Nunca** hardcodear las credenciales en el código fuente
3. **Nunca** compartir las claves anónimas (son públicas)
4. **Usar** SUPABASE_URL + SUPABASE_ANON_KEY para el frontend
5. **Considerar** agregar SUPABASE_SERVICE_ROLE_KEY si necesitas operaciones del servidor

Para más información, visita:
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Autenticación](https://supabase.com/docs/guides/auth)
- [Documentación de Políticas RLS](https://supabase.com/docs/guides/database/row-level-security)
