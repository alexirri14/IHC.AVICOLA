# IHC.AVICOLA (ERP para Producción Avícola)

## Resumen del Proyecto

IHC.AVICOLA es una aplicación web completa de tipo ERP (Planificación de Recursos Empresariales) diseñada para la gestión integral de operaciones de producción avícola. La aplicación facilita la administración de múltiples aspectos de la producción, desde la gestión de galpones de aves hasta el control de almacenes, ventas, compras y generación de informes.

## Estructura del Proyecto

El proyecto consta de dos componentes principales:

### Frontend (IHC.AVICOLA)
- **app.js**: Lógica del front-end (1,242 líneas)
- **index.html**: Estructura principal de la página
- **styles.css**: Estilos globales

El frontend es una aplicación web moderna desarrollada con JavaScript puro, que incluye:
- Autenticación de usuarios con roles
- Navegación entre secciones
- Paneles de control para cada aspecto del negocio
- Formularios de entrada de datos
- Tablas de visualización de datos
- Gráficos de producción
- Alertas y notificaciones

### Base de Datos (Supabase)
Supabase está configurado como la base de datos backend, proporcionando:
- Almacenamiento y recuperación de datos
- Autenticación de usuarios y gestión de roles
- Relaciones entre tablas
- Funcionalidad RPC para operaciones de reporte

## Características Principales

### 1. Autenticación de Usuarios con Roles
- Inicio de sesión con correo electrónico y contraseña
- Cuatro roles de usuario con diferentes niveles de acceso:
  - **Gerencia**: Acceso completo, puede ver reportes e información de la empresa
  - **Producción**: Gestión de galpones, molino y producción diaria
  - **Almacén**: Control de inventario, compras y clasificaciones de huevos
  - **Ventas**: Gestión de ventas y clientes
- Control de permisos basado en roles para todas las secciones

### 2. Módulo de Producción Avícola
- **Gestión de Galpones**: Creación, edición y monitoreo de la capacidad de gallinas
- **Registro de Producción**: Seguimiento diario de producción, incluyendo huevos, aves muertas y mortalidad
- **Módulo de Molino**: Gestión de fórmulas de alimentos, registro de producción y monitoreo de consumo de alimento
- **Clasificación de Huevos**: Separación de huevos por tipo (primera, segunda, pardo, jumbo, etc.)

### 3. Gestión de Inventario
- **Almacén de Huevos**: Seguimiento del stock actual y movimientos entrantes
- **Almacén de Insumos**: Control de materias primas, insumos y niveles de stock mínimo
- **Registro de Compras**: Trazabilidad de compras a proveedores con control de nivel de stock

### 4. Sistema de Ventas
- **Gestión de Clientes**: Registro y seguimiento de clientes
- **Facturación de Ventas**: Venta detallada de jabas de huevos con cálculo automático de precios
- **Verificación de Stock**: Confirmación automática de disponibilidad en inventario

### 5. Reportes y Análisis
- **Panel de Control**: KPIs y métricas clave para toda la operación
- **Reportes de Producción**: Seguimiento de días, horas y distribución de producción
- **Estadísticas de Ventas**: Análisis detallado de ventas por día, cliente y tipo de huevos
- **Reportes de Inventario**: Estado actual de inventarios y alertas
- **Reportes de Alimento**: Eficiencia de producción, consumo y costos por fórmula

### 6. Administración del Sistema
- **Configuración de la Empresa**: Datos básicos de la empresa (nombre, RUC, dirección)
- **Gestión de Usuarios**: Creación y edición de usuarios con roles asignados
- **Parámetros del Sistema**: Control de configuraciones generales

## Tecnologías Utilizadas

### Frontend
- **JavaScript (ES6+)**: Funcionalidad cliente completa
- **HTML5**: Estructura de la interfaz de usuario
- **CSS3**: Estilizado moderno con soporte completo para móviles

### Backend
- **Supabase**: Base de datos PostgreSQL-as-a-service con autenticación incluida
- **REST API**: Servicios para todas las operaciones CRUD
- **Almacenamiento en tiempo real**: A través de las suscripciones de Supabase

## Características Clave del Código

### Funciones Principales de Utilidad
- **crearEl()**: Función versátil para creación de elementos HTML con soporte completo de propiedades
- **vaciar()**: Limpieza eficiente de elementos de DOM
- **num()**: Formateo numérico consistente
- **formatearFecha()**: Formateo optimizado para mostrador
- **api()**: Cliente HTTP utilitario para llamadas REST API

### Funciones Específicas del Negocio
- **Renderizado de componentes**: Secciones separadas para cada función principal
- **Validación de formularios**: Control de formulario centralizado con notificaciones de errores
- **Control de sesión**: Estado de autenticación entre paginas
- **Manejo de toasts**: Sistema de notificaciones emergentes
- **Suscripciones a tiempo real**: Actualización automática de datos sin recarga de página

## Instalación y Configuración

### 1. Requisitos Previos
- Navegador web moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Conectividad a internet
- Servidor o proveedor de hosting (Ej: GitHub Pages, Netlify, Render, Vercel)

### 2. Configuración del Proyecto
1. **Supabase**
   - Crear nuevo proyecto en https://supabase.io
   - Ejecutar el script de seed inicial en la base de datos
   - Copiar la URL del proyecto y la clave pública anon (URL + sb_publishable_*)

2. **Configuración del Lado del Cliente**
   ```javascript
   // En app.js
   const SUPABASE_URL = 'your-supabase-url';
   const SUPABASE_ANON_KEY = 'your-anon-key';
   ```

3. **Configuración del Lado del Servidor** (si se usa)
   ```bash
   // Variables de entorno para hosting
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

### 3. Despliegue
El proyecto es completamente compatible para ser usado como aplicación web estática:

- **GitHub Pages**: `gh-pages` branch
- **Netlify**: Deploy from Git
- **Render**: Construir desde GitHub, desplegar como sitio estático
- **Vercel**: Deploy a Next.js con base de datos Edge (si se necesita)

## Cobertura de Usabilidad

### Navegación del Usuario
- ✅ Todas las operaciones se realizan completamente dentro del navegador
- ✅ El manejo normal de URL (SPA) funciona en todos los navegadores modernos
- ✅ Nombre de usuario recordado entre sesiones
- ✅ Última sección visitada restaurada en el reinicio

### Responsividad
- ✅ Diseño adaptado completamente a dispositivos móviles
- ✅ Uso de CSS Grid y Flexbox para rozamiento perfecto
- ✅ Elementos de interfaz de usuario accesibles e interpretables para todos los dispositivos
- ✅ Escalado suave en dispositivos de diferente tamaño

### Experiencia de Usuario
- ✅ Modal emergentes elegantes y centran toda la página
- ✅ Opciones de toast de notificación con colores semánticos
- ✅ Validación de formularios en tiempo real
- ✅ Interacción fluida optimizada para bajo retardo
- ✅ Zonas de click etéreas y responisvas

### Manejo de Errores
- ✅ Manejo global unificado de errores
- ✅ Reporte detallado y mensaje mostrado para cada error
- ✅ Retroceso seguro en caso de interrupción de datos
- ✅ Información sobre __fallback en caso de error de carga de datos

### Compatibilidad Con Navegadores
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ IE11 (con complementos, con limitaciones)

## Licencia
MIT

Este proyecto demuestra una ERP completa de una solo página para producción avícola, con soporte completo para Supabase como backend, haciendo hincapié en la entrega de una gestión fluida de datos del lado del cliente. Es un producto mínimo viable que cubre todas las necesidades comerciales básicas para una operación de producción avícola a pequeña escala.