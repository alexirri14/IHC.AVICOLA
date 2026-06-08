// ====== DATA MANAGER (Gestión centralizada de datos) ======
const DataManager = {
    // Datos de producción
    produccion: [
        { id: 1, fecha: "2026-01-01", galpon: "Galpón 4", cantidad: 300 },
        { id: 2, fecha: "2026-01-01", galpon: "Galpón 5", cantidad: 250 },
        { id: 3, fecha: "2026-01-01", galpon: "Galpón 6", cantidad: 280 },
        { id: 4, fecha: "2026-01-01", galpon: "Galpón 8", cantidad: 320 },
        { id: 5, fecha: "2026-01-02", galpon: "Galpón Automático", cantidad: 310 },    ],
    
    // Datos de ventas
    ventas: [
        { id: 1, fecha: "2026-01-01", cliente: "Royce", cantidad: 500, precioUnitario: 0.40, total: 200.00 },
        { id: 2, fecha: "2026-01-01", cliente: "Angela Chicoma", cantidad: 300, precioUnitario: 0.40, total: 120.00 },
        { id: 3, fecha: "2026-01-02", cliente: "Jefferso", cantidad: 400, precioUnitario: 0.42, total: 168.00 },
        { id: 4, fecha: "2026-01-02", cliente: "Jose Francisco", cantidad: 600, precioUnitario: 0.40, total: 240.00 },
    ],
    
    // Datos de almacén huevos
    almacenHuevos: [
        { id: 1, fecha: "2026-01-01", galponOrigen: "Galpón 4", cantidad: 300, responsable: "Administrador" },
        { id: 2, fecha: "2026-01-01", galponOrigen: "Galpón 5", cantidad: 250, responsable: "Administrador" },
    ],
    
    // Stock huevos
    stockHuevos: 8500,
    
    // Stock de alimentos
    stockAlimento: {
        "MAIZ": 100, "HARINA DE SOYA": 50, "SOYA INTEGRAL": 30,
        "PALMISTE": 15, "CAL FINA": 20, "CAL GRUESA": 25,
        "ACEITE DE SOYA": 20, "SAL INDUSTRIAL": 10, "PHOSBIC": 30,
        "PRE POSTURA": 8, "METIONINA": 50, "LISINA": 25,
        "BIO+COLINA": 10, "BICARBONATO": 10, "MICOFIX 300": 5,
        "SECUESTRANTE": 8, "TOXONINA": 6, "LIPIOSA": 4, "ADITRACE": 2
    },
    
    // Fórmulas del molino
    formulasMolino: {
        "GALPON 4 (POSTURA 1) - 839/154": {
            "MAIZ": 839, "HARINA DE SOYA": 154, "PALMISTE": 98,
            "CAL FINA": 48, "CAL GRUESA": 103, "ACEITE DE SOYA": 45,
            "SAL INDUSTRIAL": 4.2, "PHOSBIC": 9.0, "PRE POSTURA": 1.5,
            "METIONINA": 3.6, "LISINA": 1.8, "BIO+COLINA": 0.45,
            "BICARBONATO": 4.0, "MICOFIX 300": 0.4, "SECUESTRANTE": 2.5,
            "TOXONINA": 0.6, "LIPIOSA": 1.0, "ADITRACE": 0.15
        },
        "GALPON (6-8GT) (POSTURA 2) - 907/182": {
            "MAIZ": 907, "HARINA DE SOYA": 182, "PALMISTE": 94,
            "CAL GRUESA": 30, "ACEITE DE SOYA": 126, "SAL INDUSTRIAL": 5,
            "PHOSBIC": 7.5, "PRE POSTURA": 1.5, "METIONINA": 3.8,
            "LISINA": 1.8, "BIO+COLINA": 0.15, "BICARBONATO": 4.5,
            "MICOFIX 300": 0.4, "SECUESTRANTE": 2.5, "TOXONINA": 0.5,
            "LIPIOSA": 0.15, "ADITRACE": 0.15
        },
        "GALPON (3-5-8) (POSTURA 3) - 949/217": {
            "MAIZ": 949, "HARINA DE SOYA": 217, "SOYA INTEGRAL": 370,
            "PHOSBIC": 91, "CAL GRUESA": 30, "ACEITE DE SOYA": 135,
            "SAL INDUSTRIAL": 5.2, "PRE POSTURA": 1.5, "METIONINA": 3.1,
            "LISINA": 2.1, "BIO+COLINA": 0.45, "BICARBONATO": 3.75,
            "MICOFIX 300": 0.4, "SECUESTRANTE": 2.5, "TOXONINA": 0.45,
            "LIPIOSA": 0.13, "ADITRACE": 0.15
        }
    },
    
    // Datos de molino
    molino: [
        { id: 1, lote: "Lote 001", fecha: "2026-05-08", galpon: "GALPON 4 (POSTURA 1) - 839/154", totalProducido: 1308.75, observaciones: "Producción normal" },
    ],
    
    // Event listeners para notificar cambios
    listeners: [],
    
    // Suscribirse a cambios
    subscribe(callback) {
        this.listeners.push(callback);
    },
    
    // Notificar a todos los suscriptores de un cambio
    notify() {
        this.listeners.forEach(cb => cb());
    },
    
    // ====== Métodos para producción ======
    agregarProduccion(galpon, cantidad, fecha) {
        const id = this.produccion.length + 1;
        this.produccion.push({ id, fecha, galpon, cantidad });
        this.stockHuevos += cantidad;
        this.almacenHuevos.push({
            id: this.almacenHuevos.length + 1,
            fecha: fecha,
            galponOrigen: galpon,
            cantidad: cantidad,
            responsable: "Usuario Actual"
        });
        this.notify();
    },
    
    // ====== Métodos para ventas ======
    agregarVenta(cliente, cantidad, precioUnitario) {
        const total = cantidad * precioUnitario;
        const id = this.ventas.length + 1;
        this.ventas.push({ id, fecha: new Date().toISOString().split('T')[0], cliente, cantidad, precioUnitario, total });
        this.stockHuevos -= cantidad;
        this.notify();
    },
    
    // Total de ventas
    getTotalVentas() {
        return this.ventas.reduce((sum, venta) => sum + venta.total, 0);
    },
    
    // ====== Métodos para almacén huevos ======
    agregarAlmacen(galpon, cantidad, responsable) {
        const id = this.almacenHuevos.length + 1;
        this.almacenHuevos.push({ id, fecha: new Date().toISOString().split('T')[0], galponOrigen: galpon, cantidad, responsable });
        this.stockHuevos += cantidad;
        this.notify();
    },
    
    // ====== Métodos para molino ======
    agregarMolino(lote, fecha, galpon, totalProducido, observaciones) {
        const id = this.molino.length + 1;
        this.molino.push({ id, lote, fecha, galpon, totalProducido, observaciones });
        this.notify();
    },
    
    // ====== Obtener reportes ======
    getProduccionPorGalpon() {
        const res = {
            "Galpón 4": { diaria: 0, semanal: 0, promedio: 0 },
            "Galpón 5": { diaria: 0, semanal: 0, promedio: 0 },
            "Galpón 6": { diaria: 0, semanal: 0, promedio: 0 },
            "Galpón 8": { diaria: 0, semanal: 0, promedio: 0 },
            "Galpón Automático": { diaria: 0, semanal: 0, promedio: 0 }
        };
        this.produccion.forEach(p => {
            if (res[p.galpon]) {
                res[p.galpon].semanal += p.cantidad;
            }
        });
        Object.keys(res).forEach(key => {
            res[key].diaria = Math.round(res[key].semanal / 2);
            res[key].promedio = Math.round(res[key].semanal / 7);
        });
        return res;
    },
    
    getVentasDiarias() {
        return {
            "Lun": 850, "Mar": 920, "Mié": 780, "Jue": 1120, "Vie": 1200, "Sáb": 950, "Dom": 580
        };
    },
    
    getStockAlimentoSacos() {
        let sum = 0;
        Object.values(this.stockAlimento).forEach(val => sum += val);
        return sum;
    }
};

// ====== APP LOGIC ======
document.addEventListener("DOMContentLoaded", () => {
    inicializarNavegacion();
    inicializarMenusMoviles();
    inicializarTablas();
    inicializarFormularios();
    actualizarDashboard();
    inicializarReportes();
    
    // Suscribirse a cambios en el DataManager
    DataManager.subscribe(() => {
        actualizarDashboard();
        inicializarTablas();
        inicializarReportes();
    });
});

// ====== NAVEGACIÓN ======
function inicializarNavegacion() {
    // Navegación desktop
    const botonesNav = document.querySelectorAll('.nav-btn, .mobile-nav-link');
    botonesNav.forEach(boton => {
        boton.addEventListener('click', () => {
            const tab = boton.getAttribute('data-tab');
            cambiarTab(tab);
        });
    });
}

function cambiarTab(nombreTab) {
    // Actualizar botones activos
    document.querySelectorAll('.nav-btn, .mobile-nav-link').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === nombreTab) {
            btn.classList.add('active');
        }
    });
    
    // Mostrar la sección correcta
    document.querySelectorAll('.tab-content').forEach(seccion => {
        seccion.classList.remove('active');
    });
    document.getElementById(`tab-${nombreTab}`).classList.add('active');
    
    // Cerrar menú móvil
    cerrarMenuMovil();
}

// ====== MENÚ MÓVIL ======
function inicializarMenusMoviles() {
    const btnMenu = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('mobileMenuOverlay');
    const menu = document.getElementById('mobileMenu');
    const btnCerrar = document.getElementById('mobileMenuClose');
    
    btnMenu.addEventListener('click', () => {
        menu.classList.add('active');
        overlay.classList.add('active');
    });
    
    btnCerrar.addEventListener('click', cerrarMenuMovil);
    overlay.addEventListener('click', cerrarMenuMovil);
}

function cerrarMenuMovil() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const menu = document.getElementById('mobileMenu');
    menu.classList.remove('active');
    overlay.classList.remove('active');
}

// ====== TABLAS ======
function inicializarTablas() {
    // Llenar tabla de producción
    const tbodyProduccion = document.querySelector('#tabla-produccion tbody');
    tbodyProduccion.innerHTML = DataManager.produccion.map(p => `
        <tr>
            <td>${p.galpon}</td>
            <td>${p.fecha}</td>
            <td>${p.cantidad}</td>
        </tr>
    `).join('');
    
    // Llenar tabla de ventas
    const tbodyVentas = document.querySelector('#tabla-ventas tbody');
    tbodyVentas.innerHTML = DataManager.ventas.map(v => `
        <tr>
            <td>${v.fecha}</td>
            <td>${v.cliente}</td>
            <td>${v.cantidad}</td>
            <td>S/ ${v.precioUnitario.toFixed(2)}</td>
            <td>S/ ${v.total.toFixed(2)}</td>
        </tr>
    `).join('');
    
    // Llenar tabla de almacén huevos
    const tbodyAlmacen = document.querySelector('#tabla-almacen tbody');
    tbodyAlmacen.innerHTML = DataManager.almacenHuevos.map(a => `
        <tr>
            <td>${a.fecha}</td>
            <td>${a.galponOrigen}</td>
            <td>${a.cantidad}</td>
            <td>${a.responsable}</td>
        </tr>
    `).join('');
    
    // Llenar tabla de molino
    const tbodyMolino = document.querySelector('#tabla-molino tbody');
    tbodyMolino.innerHTML = DataManager.molino.map(m => `
        <tr>
            <td>${m.lote}</td>
            <td>${m.fecha}</td>
            <td>${m.galpon}</td>
            <td>${m.totalProducido} kg</td>
            <td>${m.observaciones}</td>
        </tr>
    `).join('');
    
    // Actualizar stock en alimento
    document.querySelectorAll('.insumo-stock').forEach(el => {
        const insumo = el.getAttribute('data-insumo');
        if (DataManager.stockAlimento[insumo]) {
            el.textContent = DataManager.stockAlimento[insumo];
        }
    });
}

// ====== FORMULARIOS ======
function inicializarFormularios() {
    // Establecer fecha por defecto en formularios
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('produccion-fecha').value = hoy;
    const almacenFechaInput = document.getElementById('almacen-fecha');
    if (almacenFechaInput) {
        almacenFechaInput.value = hoy;
    }
    document.getElementById('molino-fecha').value = hoy;
    
    // ----- FORMULARIO PRODUCCIÓN -----
    document.getElementById('btn-guardar-produccion').addEventListener('click', () => {
        const galpon = document.getElementById('produccion-galpon').value;
        const fecha = document.getElementById('produccion-fecha').value;
        const cantidad = parseInt(document.getElementById('produccion-cantidad').value);
        
        if (!cantidad || cantidad <=0) {
            alert('Por favor ingrese una cantidad válida');
            return;
        }
        
        DataManager.agregarProduccion(galpon, cantidad, fecha);
        limpiarFormulario('produccion');
        alert('Producción registrada correctamente!');
    });
    
    document.getElementById('btn-cancelar-produccion').addEventListener('click', () => {
        limpiarFormulario('produccion');
    });
    
    // ----- FORMULARIO ALMACÉN HUEVOS -----
    document.getElementById('btn-guardar-almacen').addEventListener('click', () => {
        const galpon = document.getElementById('almacen-galpon').value;
        const cantidad = parseInt(document.getElementById('almacen-cantidad').value);
        const responsable = document.getElementById('almacen-responsable').value || 'Usuario Actual';
        
        if (!cantidad || cantidad <=0) {
            alert('Por favor ingrese una cantidad válida');
            return;
        }
        
        DataManager.agregarAlmacen(galpon, cantidad, responsable);
        limpiarFormulario('almacen');
        alert('Ingreso registrado correctamente!');
    });
    
    document.getElementById('btn-cancelar-almacen').addEventListener('click', () => {
        limpiarFormulario('almacen');
    });
    
    // ----- FORMULARIO VENTAS -----
    document.getElementById('ventas-cantidad').addEventListener('input', calcularTotalVentas);
    document.getElementById('ventas-precio').addEventListener('input', calcularTotalVentas);
    
    document.getElementById('btn-guardar-venta').addEventListener('click', () => {
        const cliente = document.getElementById('ventas-cliente').value;
        const cantidad = parseInt(document.getElementById('ventas-cantidad').value);
        const precio = parseFloat(document.getElementById('ventas-precio').value);
        
        if (!cliente) { alert('Por favor ingrese el nombre del cliente'); return; }
        if (!cantidad || cantidad <=0) { alert('Por favor ingrese una cantidad válida'); return; }
        if (!precio || precio <=0) { alert('Por favor ingrese un precio válido'); return; }
        
        DataManager.agregarVenta(cliente, cantidad, precio);
        limpiarFormulario('ventas');
        alert('Venta registrada correctamente!');
    });
    
    document.getElementById('btn-cancelar-venta').addEventListener('click', () => {
        limpiarFormulario('ventas');
    });
    
    // ----- FORMULARIO MOLINO -----
    document.getElementById('btn-cargar-formula').addEventListener('click', () => {
        const formula = document.getElementById('molino-formula').value;
        const datosFormula = DataManager.formulasMolino[formula];
        const container = document.getElementById('formula-details');
        
        let html = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 12px; margin-bottom: 24px;">
        `;
        Object.entries(datosFormula).forEach(([insumo, valor]) => {
            html += `
                <div style="background: #f8f9fa; padding: 12px; border-radius: 8px;">
                    <div style="font-weight: bold;">${insumo}</div>
                    <div><input type="number" value="${valor}" style="width:100%; padding:8px; border:1px solid #dee2e6; border-radius:8px;"></div>
                    <div style="font-size: 0.9rem; color:#6c757d">kg</div>
                </div>
            `;
        });
        
        // Calcular total
        let totalFormula = 0;
        Object.values(datosFormula).forEach(v => totalFormula += v);
        
        html += `</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px,1fr)); gap: 16px;">
                <div style="background-color: #e6fff3; padding: 16px; border-radius: 8px;">
                    <span style="color: #28a745; font-weight: 600; font-size: 0.9rem; display: block; margin-bottom: 4px;">Total a Producir</span>
                    <div style="font-size:1.5rem; font-weight:700;">${totalFormula.toFixed(2)} kg</div>
                </div>
                <div style="background-color: #e6f0ff; padding: 16px; border-radius: 8px;">
                    <span style="color: #0066cc; font-weight: 600; font-size: 0.9rem; display: block; margin-bottom: 4px;">Sobrante del día anterior (kg)</span>
                    <input type="number" value="0" style="width:100%; padding:8px; border:1px solid #0066cc; border-radius:8px;">
                </div>
                <div style="background-color: #f3e6ff; padding:16px; border-radius:8px;">
                    <span style="color: #6610f2; font-weight: 600; font-size: 0.9rem; display: block; margin-bottom: 4px;">Total Final</span>
                    <div style="font-size:1.5rem; font-weight:700;">${totalFormula.toFixed(2)} kg</div>
                </div>
            </div>
            <div style="margin-top:16px;">
                <label>Observaciones</label>
                <textarea id="molino-observaciones" style="width:100%; padding:12px; border:1px solid #dee2e6; border-radius:8px; min-height: 80px;" placeholder="Ej: Se usó sobrante de ayer, se ajustó aceite por falta de stock, etc."></textarea>
            </div>
        `;
        container.innerHTML = html;
    });
    
    document.getElementById('btn-registrar-molino').addEventListener('click', () => {
        const formula = document.getElementById('molino-formula').value;
        const fecha = document.getElementById('molino-fecha').value;
        const observaciones = document.getElementById('molino-observaciones')?.value || 'Producción normal';
        
        const datosFormula = DataManager.formulasMolino[formula];
        let totalProducido = 0;
        Object.values(datosFormula).forEach(v => totalProducido += v);
        
        const lote = `Lote ${String(DataManager.molino.length + 1).padStart(3, '0')}`;
        
        DataManager.agregarMolino(lote, fecha, formula, totalProducido.toFixed(2), observaciones);
        alert('Producción registrada correctamente!');
    });
}

function limpiarFormulario(tipo) {
    const fields = {
        produccion: ['produccion-cantidad'],
        almacen: ['almacen-cantidad', 'almacen-responsable'],
        ventas: ['ventas-cliente', 'ventas-cantidad']
    };
    
    if (fields[tipo]) {
        fields[tipo].forEach(id => document.getElementById(id).value = '');
    }
    
    if (tipo === 'ventas') {
        document.getElementById('ventas-precio').value = '0.40';
        calcularTotalVentas();
    }
}

function calcularTotalVentas() {
    const cantidad = parseInt(document.getElementById('ventas-cantidad').value) || 0;
    const precio = parseFloat(document.getElementById('ventas-precio').value) || 0;
    const total = cantidad * precio;
    
    document.getElementById('ventas-total-display').textContent = `Total: S/ ${total.toFixed(2)}`;
    document.getElementById('ventas-total').textContent = `S/ ${DataManager.getTotalVentas().toFixed(2)}`;
}

// ====== DASHBOARD ======
function actualizarDashboard() {
    const huevosHoy = DataManager.produccion.filter(p => {
        const fecha = new Date(p.fecha);
        const hoy = new Date();
        return (
            fecha.getFullYear() === hoy.getFullYear() &&
            fecha.getMonth() === hoy.getMonth() &&
            fecha.getDate() === hoy.getDate()
        );
    }).reduce((sum, p) => sum + p.cantidad, 0);
    
    const promedio = DataManager.getProduccionPorGalpon();
    let totalProd = 0, count = 0;
    Object.values(promedio).forEach(v => {
        totalProd += v.promedio;
        count++;
    });
    const promedioGalpon = count > 0 ? Math.round(totalProd / count) : 0;
    
    document.getElementById('dashboard-huevos-hoy').textContent = huevosHoy.toLocaleString();
    document.getElementById('dashboard-stock').textContent = DataManager.stockHuevos.toLocaleString();
    document.getElementById('dashboard-ventas').textContent = `S/ ${DataManager.getTotalVentas().toFixed(2)}`;
    document.getElementById('dashboard-alimento').textContent = `${DataManager.getStockAlimentoSacos()} sacos`;
    document.getElementById('dashboard-tasa').textContent = '100%';
    document.getElementById('dashboard-promedio').textContent = `${promedioGalpon} huevos`;
    
    // Alertas de stock
    const alertContainer = document.getElementById('dashboard-alertas');
    alertContainer.innerHTML = '';
    if (DataManager.stockHuevos === 0) {
        alertContainer.innerHTML = `
            <div class="alert alert-danger">No hay stock de huevos</div>
        `;
    } else if (DataManager.stockHuevos < 100) {
        alertContainer.innerHTML = `
            <div class="alert alert-warning">Bajo stock de huevos</div>
        `;
    }
    
    // Actualizar stock en almacén
    document.getElementById('almacen-stock').textContent = `${DataManager.stockHuevos.toLocaleString()} huevos`;
}

// ====== REPORTES ======
function inicializarReportes() {
    // Botones de reportes
    const botonesReportes = document.querySelectorAll('.report-tab-btn');
    botonesReportes.forEach(btn => {
        btn.addEventListener('click', () => {
            const nombreReporte = btn.getAttribute('data-report');
            // Actualizar botones activos
            botonesReportes.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Mostrar contenido
            document.querySelectorAll('.report-tab-content').forEach(c => {
                c.classList.remove('active');
            });
            document.getElementById(`report-${nombreReporte}`).classList.add('active');
        });
    });
    
    // ====== GRÁFICOS (Usamos Canvas nativo, no bibliotecas) ======
    dibujarGraficoProduccion();
    dibujarGraficoVentas();
    dibujarGraficoStock();
    
    // Llenar tabla de reporte de producción
    const tbodyReportesProduccion = document.querySelector('#tabla-reportes-produccion tbody');
    const datosProduccion = DataManager.getProduccionPorGalpon();
    tbodyReportesProduccion.innerHTML = Object.entries(datosProduccion).map(([galpon, datos]) => `
        <tr>
            <td>${galpon}</td>
            <td>${datos.diaria} huevos</td>
            <td>${datos.semanal} huevos</td>
            <td>${datos.promedio} huevos/día</td>
        </tr>
    `).join('');
    
    // Llenar resumen reporte ventas
    const total = DataManager.getTotalVentas();
    const ventasDiarias = DataManager.getVentasDiarias();
    const promedio = total / 7;
    const mejorDia = Math.max(...Object.values(ventasDiarias));
    
    document.getElementById('reportes-ventas-total').textContent = `S/ ${total.toFixed(2)}`;
    document.getElementById('reportes-ventas-promedio').textContent = `S/ ${promedio.toFixed(2)}`;
    document.getElementById('reportes-ventas-mejor').textContent = `S/ ${mejorDia.toFixed(2)}`;
    
    document.getElementById('reportes-stock-huevos').textContent = DataManager.stockHuevos.toLocaleString();
    document.getElementById('reportes-stock-alimento').textContent = `${DataManager.getStockAlimentoSacos()} sacos`;
}

// ====== FUNCIONES DE GRÁFICOS NATIVOS ======
function dibujarGraficoProduccion() {
    const canvas = document.getElementById('chart-produccion');
    const ctx = canvas.getContext('2d');
    const datos = DataManager.getProduccionPorGalpon();
    const galpones = Object.keys(datos); // 5 Galpones
    canvas.width = 800;
    canvas.height = 420;
    
    const colores = ['#008080', '#ff8c00']; // Diaria y semanal
    const anchoBarra = 60;
    const espacioEntreBarras = 100;
    const inicioX = 50;
    const maxValor = 1400;
    
    ctx.beginPath();
    ctx.strokeStyle = '#e9ecef';
    for (let i = 0; i < 5; i++) {
        const y = 350 - i*70;
        ctx.moveTo(inicioX, y);
        ctx.lineTo(650, y);
    }
    ctx.stroke();
    
    // Dibujar barras
    galpones.forEach((galpon, indexG) => {
        const valores = [datos[galpon].diaria, datos[galpon].semanal];
        valores.forEach((valor, indexV) => {
            const x = inicioX + indexG * espacioEntreBarras + (indexV * (anchoBarra + 10));
            const altura = (valor / maxValor) * 300;
            const y = 350 - altura;
            
            ctx.fillStyle = colores[indexV];
            ctx.fillRect(x, y, anchoBarra, altura);
            ctx.fillStyle = '#212529';
            ctx.font = '12px Segoe UI';
            ctx.textAlign = 'center';
            ctx.fillText(valor, x + 30, y - 10);
        });
        ctx.fillStyle = '#212529';
        ctx.font = '14px Segoe UI';
        const xTexto = inicioX + indexG * espacioEntreBarras + anchoBarra;
        ctx.fillText(galpon, xTexto, 370);
    });
    
    // Leyenda
    ctx.fillStyle = '#008080';
    ctx.fillRect(50, 385, 20, 20);
    ctx.fillStyle = '#212529';
    ctx.textAlign = 'left';
    ctx.font = '13px Segoe UI';
    ctx.fillText('Huevos del día', 80, 400);
    
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(250, 385, 20, 20);
    ctx.fillStyle = '#212529';
    ctx.fillText('Huevos semanal', 280, 400);
}

function dibujarGraficoVentas() {
    const canvas = document.getElementById('chart-ventas');
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 400;
    const ventasDiarias = DataManager.getVentasDiarias();
    const dias = Object.keys(ventasDiarias);
    const valores = Object.values(ventasDiarias);
    const maxValor = 1400;
    
    ctx.beginPath();
    ctx.strokeStyle = '#e9ecef';
    for (let i = 0; i < 5; i++) {
        const y = 350 - i*70;
        ctx.moveTo(50, y);
        ctx.lineTo(650, y);
    }
    ctx.stroke();
    
    // Dibujar la línea
    ctx.beginPath();
    ctx.strokeStyle = '#008080';
    ctx.lineWidth = 3;
    
    dias.forEach((dia, i) => {
        const x = 50 + i*90;
        const y = 350 - (valores[i]/maxValor)*300;
        if(i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        // Punto
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2*Math.PI);
        ctx.fillStyle = '#008080';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x, y);
    });
    ctx.stroke();
    
    // Etiquetas del eje X
    dias.forEach((dia, i) => {
        const x = 50 + i*90;
        ctx.fillStyle = '#212529';
        ctx.textAlign = 'center';
        ctx.font = '14px Segoe UI';
        ctx.fillText(dia, x, 370);
    });
}

function dibujarGraficoStock() {
    const canvas = document.getElementById('chart-stock');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;
    
    const huevos = DataManager.stockHuevos;
    const alimento = DataManager.getStockAlimentoSacos() * 300; // Escalado para que se vea
    const total = huevos + alimento;
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const radio = 150;
    
    let anguloInicio = -0.5 * Math.PI;
    
    // Porción de huevos
    let porcionHuevos = (huevos / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centroX, centroY, radio, anguloInicio, anguloInicio + porcionHuevos);
    ctx.fillStyle = '#008080';
    ctx.fill();
    
    // Porción de alimento
    let anguloInicioAlimento = anguloInicio + porcionHuevos;
    ctx.beginPath();
    ctx.arc(centroX, centroY, radio, anguloInicioAlimento, anguloInicioAlimento + (alimento/total)*2*Math.PI);
    ctx.fillStyle = '#ff8c00';
    ctx.fill();
    
    // Leyenda
    ctx.fillStyle = '#008080';
    ctx.fillRect(50, 350, 20, 20);
    ctx.fillStyle = '#212529';
    ctx.textAlign = 'left';
    ctx.font = '13px Segoe UI';
    ctx.fillText('Huevos', 80, 365);
    
    ctx.fillStyle = '#ff8c00';
    ctx.fillRect(200, 350, 20, 20);
    ctx.fillStyle = '#212529';
    ctx.fillText('Alimento', 230, 365);
}
