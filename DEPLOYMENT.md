# Despliegue a Render

## Resumen del Despliegue

Esta guía explica cómo desplegar el proyecto ERP Avícola en Render, una plataforma de despliegue en la nube. Render soporta perfectamente los sitios web HTML/CSS/JS estáticos y las aplicaciones con base de datos como las que usamos con Supabase.

## Requisitos

- Repositorio de GitHub con el código
- Cuenta en Render
- Supabase URL y clave anon

## Pasos de Despliegue

### 1. Preparar el Repositorio en GitHub

Tu aplicación actual está en `C:\Users\Usuario\source\repos\IHC.AVICOLA`. Asegúrate de:

1. Tener los commits finales en una rama (ej: `main`)
2. Usar la URL correcta del repositorio en GitHub
3. Verificar que todo el código funciona localmente

### 2. Crear el Proyecto en Render

1. Iniciar sesión en [Render.com](https://render.com)
2. Hacer clic en "New +" → "Static Site"
3. Configurar el nombre del servicio: `ihc-avicola`
4. Conectar al repositorio de GitHub
5. Elegir la rama (ej: `main`)
6. RUTAS DE REPO: Se detectarán automáticamente
   - `app.js` - Lógica del cliente
   - `index.html` - Página principal
   - `styles.css` - Estilos

### 3. Variables de Entorno

En Render → Configuración → Variables de Entorno, agregar:

```bash
SUPABASE_URL=https://gldoiaecfjsaolfmonsr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_y-xonjHlXauKm9CTexr7xw_5jvxQ1cL
```

### 4. Scripts de Construcción (Opcional)

Si necesitas tal vez poner el VS Code online (no es necesario para este proyecto estático, solo para demostración):

```json
{
  "scripts": {
    "dev": "http-server -p 3000",
    "build": "echo 'Static site' && cp -r ._output public/ 2>/dev/null || echo 'No build needed'"
  }
}
```

### 5. Despliegue y Lanzamiento

1. En Render, hacer clic en "Crear Servicio"
2. Esperar la compilación (normalmente 1-2 minutos)
3. Una vez implementado, el servicio estará disponible en:
   ```
   https://ihc-avicola.onrender.com
   ```

## Frecuentes Preguntas

### ¿Necesitamos un backend separado?

No. Nuestro proyecto es completamente estático - todo el acceso a la base de datos se hace a través de las APIs de Supabase, que son accesibles desde el navegador.

### ¿Supabase se ejecuta en Render también?

Puedes crear un proyecto Supabase adicional en el mismo Render, o usar un proyecto Supabase separado en supabase.co. Para simplicidad, usaría un proyecto Supabase separado:

```bash
# Variables de entorno de Supabase en Render:
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-clave-publica
```

### ¿Necesitamos SSL?

Sí, Render provee automáticamente HTTPS con SSL para todos los sitios estáticos.

### ¿Cómo podemos actualizar el código?

1. Hacer commit y push a la rama principal en GitHub
2. En Render, reiniciar el servicio
3. Render reconstruye automáticamente desde el nuevo código

## Despliegue Exitoso

✅ **Supabase conectado** - URL y clave en variables de entorno  
✅ **Frontend estático** - HTML, CSS, JS ejecutados perfectamente  
✅ **Backend API** - Supabase provee todas las operaciones CRUD  
✅ **Despliegue automático** - Build and deploy desde GitHub  

Tu ERP Avícola estará completamente funcional y accesible en todo el mundo después de ~2 minutos.