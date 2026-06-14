
const USUARIOS = [
    { usuario: "admin", clave: "123", rol: "Administrador" },
    { usuario: "produccion", clave: "123", rol: "Producción" },
    { usuario: "almacen", clave: "123", rol: "Almacén" },
    { usuario: "ventas", clave: "123", rol: "Ventas" }
];

const APP_VERSION = "avicola-ventas-promedio-eliminar-v11";

const SACOS_POR_TANDA = 30;
const KG_POR_SACO_BALANCEADO = 50;
const KG_PRODUCIDOS_POR_TANDA = SACOS_POR_TANDA * KG_POR_SACO_BALANCEADO;
const STOCK_MINIMO_ALIMENTO_SACOS = 5;
const STOCK_MINIMO_JABAS = 10;


let INSUMOS_INFO = {
    "MAIZ": { cantidadInicial: 100, unidadCompra: "toneladas", kgPorUnidad: 1000, etiqueta: "Granel" },
    "TORTA DE SOYA": { cantidadInicial: 50, unidadCompra: "toneladas", kgPorUnidad: 1000, etiqueta: "Granel" },
    "SOYA INTEGRAL": { cantidadInicial: 0, unidadCompra: "toneladas", kgPorUnidad: 1000, etiqueta: "Granel" },
    "PALMISTE": { cantidadInicial: 15, unidadCompra: "sacos de 50 kg", kgPorUnidad: 50, etiqueta: "Saco 50 kg" },
    "CAL FINA": { cantidadInicial: 25, unidadCompra: "sacos de 50 kg", kgPorUnidad: 50, etiqueta: "Saco 50 kg" },
    "CAL GRUESO": { cantidadInicial: 35, unidadCompra: "sacos de 50 kg", kgPorUnidad: 50, etiqueta: "Saco 50 kg" },
    "ACEITE DE SOYA": { cantidadInicial: 20, unidadCompra: "tanques de 1000 L", kgPorUnidad: 1000, etiqueta: "Litros" },
    "SAL INDUSTRIAL": { cantidadInicial: 10, unidadCompra: "sacos de 50 kg", kgPorUnidad: 50, etiqueta: "Saco 50 kg" },
    "PHOSBIC": { cantidadInicial: 8, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "PRE POSTURA": { cantidadInicial: 3, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "METIONINA": { cantidadInicial: 2, unidadCompra: "tanques de 1000 L", kgPorUnidad: 1000, etiqueta: "Litros" },
    "LISINA": { cantidadInicial: 2, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "BIO COLINA": { cantidadInicial: 1, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "BICARBONATO": { cantidadInicial: 5, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "NEOMICINA": { cantidadInicial: 1, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "SECUESTRANTE": { cantidadInicial: 2, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "TREONINA": { cantidadInicial: 1, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "LIPTOSA": { cantidadInicial: 1, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" },
    "ADIPACK": { cantidadInicial: 1, unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" }
};

function crearStockInicialInsumos() {
    const stock = {};
    Object.keys(INSUMOS_INFO).forEach(nombre => {
        stock[nombre] = INSUMOS_INFO[nombre].cantidadInicial * INSUMOS_INFO[nombre].kgPorUnidad;
    });
    return stock;
}

// Consumo de insumos para 1 tanda de alimento.
// 1 tanda produce 30 sacos de 50 kg.
let FORMULAS_MOLINO = {
    "GALPON 4": {
        destino: "Galpón 4",
        insumos: {
            "MAIZ": 879, "TORTA DE SOYA": 338, "PALMISTE": 98,
            "CAL FINA": 48, "CAL GRUESO": 103, "ACEITE DE SOYA": 4.5,
            "SAL INDUSTRIAL": 4.2, "PHOSBIC": 9.0, "PRE POSTURA": 1.5,
            "METIONINA": 3.6, "LISINA": 1.8, "BIO COLINA": 0.45,
            "BICARBONATO": 4.0, "NEOMICINA": 0.4, "SECUESTRANTE": 2.5,
            "TREONINA": 0.6, "LIPTOSA": 0.75, "ADIPACK": 0.75
        }
    },
    "GALPON 5": {
        destino: "Galpón 5",
        insumos: {
            "MAIZ": 942, "TORTA DE SOYA": 270, "PALMISTE": 91,
            "CAL FINA": 30, "CAL GRUESO": 135, "ACEITE DE SOYA": 3,
            "SAL INDUSTRIAL": 5.2, "PHOSBIC": 8.1, "PRE POSTURA": 1.5,
            "METIONINA": 3.1, "LISINA": 2.1, "BIO COLINA": 0.45,
            "BICARBONATO": 3.75, "NEOMICINA": 0.4, "SECUESTRANTE": 2.5,
            "TREONINA": 0.45, "LIPTOSA": 0.75, "ADIPACK": 0.75
        }
    },
    "GALPON 6": {
        destino: "Galpón 6",
        insumos: {
            "MAIZ": 907, "TORTA DE SOYA": 309, "PALMISTE": 94,
            "CAL GRUESO": 30, "ACEITE DE SOYA": 126, "SAL INDUSTRIAL": 4.5,
            "PHOSBIC": 7.5, "PRE POSTURA": 1.5, "METIONINA": 3.8,
            "LISINA": 1.8, "BIO COLINA": 0.45, "BICARBONATO": 4.5,
            "NEOMICINA": 0.4, "SECUESTRANTE": 2.5, "TREONINA": 0.5,
            "LIPTOSA": 0.75, "ADIPACK": 0.75
        }
    },
    "GALPON 8": {
        destino: "Galpón 8",
        insumos: {
            "MAIZ": 942, "TORTA DE SOYA": 270, "PALMISTE": 91,
            "CAL FINA": 30, "CAL GRUESO": 135, "ACEITE DE SOYA": 3,
            "SAL INDUSTRIAL": 5.2, "PHOSBIC": 8.1, "PRE POSTURA": 1.5,
            "METIONINA": 3.1, "LISINA": 2.1, "BIO COLINA": 0.45,
            "BICARBONATO": 3.75, "NEOMICINA": 0.4, "SECUESTRANTE": 2.5,
            "TREONINA": 0.45, "LIPTOSA": 0.75, "ADIPACK": 0.75
        }
    },
    "GALPON AUTOMATICO": {
        destino: "Galpón Automático",
        insumos: {
            "MAIZ": 907, "TORTA DE SOYA": 309, "PALMISTE": 94,
            "CAL GRUESO": 30, "ACEITE DE SOYA": 126, "SAL INDUSTRIAL": 4.5,
            "PHOSBIC": 7.5, "PRE POSTURA": 1.5, "METIONINA": 3.8,
            "LISINA": 1.8, "BIO COLINA": 0.45, "BICARBONATO": 4.5,
            "NEOMICINA": 0.4, "SECUESTRANTE": 2.5, "TREONINA": 0.5,
            "LIPTOSA": 0.75, "ADIPACK": 0.75
        }
    }
};

function clonar(objeto) {
    return JSON.parse(JSON.stringify(objeto));
}

const GALLINAS_INICIALES = {
    "Galpón 4": 12765,
    "Galpón 5": 11800,
    "Galpón 6": 12300,
    "Galpón 8": 10900,
    "Galpón Automático": 8500
};

// Datos iniciales sin registros falsos
let datos = {
    usuarioActual: null,
    stockJabas: 0,
    stockHuevos: { primera: 0, segunda: 0 },
    lotesHuevos: [],
    produccion: [],
    movimientosHuevos: [],
    ventas: [],
    movimientosAlimento: [],
    molino: [],
    diasCerrados: [],

    // Gallinas iniciales por galpón
    gallinas: clonar(GALLINAS_INICIALES),

    // Stock de insumos en kg. Se inicia con valores predeterminados.
    insumos: crearStockInicialInsumos(),

    // Alimento balanceado producido por el molino. Se guarda en kg, pero se muestra también en sacos de 50 kg.
    alimentoPorGalpon: {},

    // Estos datos quedan editables desde la interfaz.
    insumosInfo: clonar(INSUMOS_INFO),
    formulasMolino: clonar(FORMULAS_MOLINO),

    version: APP_VERSION
};

// -------------------- LOCAL STORAGE --------------------
function guardarDatos() {
    localStorage.setItem("sistemaAvicolaSimple", JSON.stringify(datos));
}

function cargarDatos() {
    const guardado = localStorage.getItem("sistemaAvicolaSimple");
    if (guardado) {
        const recuperado = JSON.parse(guardado);
        // Si cambia la versión, se usa la estructura nueva para evitar campos antiguos.
        if (recuperado.version === APP_VERSION) {
            datos = recuperado;
        }
    }
    normalizarDatos();
}

function normalizarDatos() {
    // Si el navegador tenía datos de una versión anterior, no borramos producción ni ventas.
    // Solo agregamos los nuevos campos editables de insumos y fórmulas.
    if (!datos.insumosInfo) datos.insumosInfo = clonar(INSUMOS_INFO);
    if (!datos.formulasMolino) datos.formulasMolino = clonar(FORMULAS_MOLINO);
    if (!datos.gallinas) datos.gallinas = clonar(GALLINAS_INICIALES);

    // Agrega las fórmulas base si faltan, pero respeta las que el usuario edite o cree.
    Object.keys(FORMULAS_MOLINO).forEach(nombreFormula => {
        if (!datos.formulasMolino[nombreFormula]) {
            datos.formulasMolino[nombreFormula] = clonar(FORMULAS_MOLINO[nombreFormula]);
        }
    });

    // Asegura que cada galpón tenga un número válido de gallinas.
    Object.keys(datos.gallinas).forEach(galpon => {
        datos.gallinas[galpon] = Math.max(0, Number(datos.gallinas[galpon]) || 0);
    });

    if (!datos.stockHuevos) {
        datos.stockHuevos = { primera: numero(datos.stockJabas), segunda: 0 };
    }
    datos.stockHuevos.primera = numero(datos.stockHuevos.primera);
    datos.stockHuevos.segunda = numero(datos.stockHuevos.segunda);
    datos.stockHuevos = {
        primera: datos.stockHuevos.primera,
        segunda: datos.stockHuevos.segunda
    };
    if (datos.produccion) {
        datos.produccion.forEach(p => {
            p.jabas = numero(p.primera) + numero(p.segunda);
            if (!p.id) p.id = generarId(datos.produccion);
        });
    }
    if (datos.ventas) {
        datos.ventas.forEach(v => {
            if (!v.id) v.id = generarId(datos.ventas);
            if (v.primera === undefined && v.segunda === undefined) {
                const clase = normalizarClaseHuevos(v.tipoHuevos || 'Primera');
                v.primera = clase === 'primera' ? numero(v.jabas) : 0;
                v.segunda = clase === 'segunda' ? numero(v.jabas) : 0;
            }
            v.totalJabas = numero(v.primera) + numero(v.segunda);
            if (v.promedioKgJaba === undefined) {
                v.promedioKgJaba = v.totalJabas > 0 ? numero(v.peso) / v.totalJabas : 0;
            }
            if (v.montoTotal === undefined) v.montoTotal = numero(v.total);
        });
    }
    if (!datos.lotesHuevos) datos.lotesHuevos = [];
    datos.lotesHuevos.forEach(lote => {
        lote.cantidadInicial = numero(lote.cantidadInicial);
        lote.cantidadDisponible = numero(lote.cantidadDisponible);
    });
    if (datos.lotesHuevos.length === 0 && numero(datos.stockHuevos.primera) > 0) {
        datos.lotesHuevos.push({
            id: 1,
            fecha: hoy(),
            galpon: "Stock inicial",
            clase: "Primera",
            cantidadInicial: numero(datos.stockHuevos.primera),
            cantidadDisponible: numero(datos.stockHuevos.primera)
        });
    }
    sincronizarStockJabas();


    INSUMOS_INFO = datos.insumosInfo;
    FORMULAS_MOLINO = datos.formulasMolino;

    if (datos.version !== APP_VERSION) {
        datos.version = APP_VERSION;
    }

    if (!datos.insumos) datos.insumos = crearStockInicialInsumos();
    Object.keys(INSUMOS_INFO).forEach(nombre => {
        if (datos.insumos[nombre] === undefined) {
            datos.insumos[nombre] = INSUMOS_INFO[nombre].cantidadInicial * INSUMOS_INFO[nombre].kgPorUnidad;
        }
    });

    // Limpia insumos que ya fueron eliminados desde la administración.
    Object.keys(datos.insumos).forEach(nombre => {
        if (!INSUMOS_INFO[nombre]) delete datos.insumos[nombre];
    });

    if (!datos.alimentoPorGalpon) datos.alimentoPorGalpon = {};

    // Cada galpón registrado debe tener su propio stock de alimento balanceado.
    Object.keys(datos.gallinas).forEach(galpon => {
        if (datos.alimentoPorGalpon[galpon] === undefined) datos.alimentoPorGalpon[galpon] = 0;
    });

    Object.keys(FORMULAS_MOLINO).forEach(nombreFormula => {
        const destino = FORMULAS_MOLINO[nombreFormula].destino;
        if (destino && datos.gallinas[destino] !== undefined && datos.alimentoPorGalpon[destino] === undefined) {
            datos.alimentoPorGalpon[destino] = 0;
        }
    });

    // Mantiene fórmulas y alimento solo para galpones activos.
    // Si el usuario agrega un galpón, puede crearle una fórmula desde Administrador.
    Object.keys(FORMULAS_MOLINO).forEach(nombreFormula => {
        const destino = FORMULAS_MOLINO[nombreFormula].destino;
        if (destino && datos.gallinas[destino] === undefined) {
            delete FORMULAS_MOLINO[nombreFormula];
        }
    });
    datos.formulasMolino = FORMULAS_MOLINO;

    Object.keys(datos.alimentoPorGalpon).forEach(galpon => {
        if (datos.gallinas[galpon] === undefined) delete datos.alimentoPorGalpon[galpon];
    });

    guardarDatos();
}
// -------------------- UTILIDADES --------------------
function hoy() {
    return new Date().toISOString().split("T")[0];
}

function generarId(lista) {
    return lista.length + 1;
}

function estaCerrado(fecha) {
    return datos.diasCerrados.includes(fecha);
}

function mostrarMensaje(texto, tipo = "ok") {
    const div = document.getElementById("mensaje");
    div.textContent = texto;
    div.className = "mensaje " + tipo;

    setTimeout(() => {
        div.className = "mensaje hidden";
    }, 3500);
}

function numero(valor) {
    return Number(valor || 0);
}

function sincronizarStockJabas() {
    if (!datos.stockHuevos) datos.stockHuevos = { primera: 0, segunda: 0 };
    datos.stockJabas = numero(datos.stockHuevos.primera) + numero(datos.stockHuevos.segunda);
}

function stockMinimoInsumoKg(insumo) {
    const info = INSUMOS_INFO[insumo];
    return info ? info.kgPorUnidad : 50;
}

function normalizarClaseHuevos(clase) {
    if (!clase) return "primera";
    const valor = clase.toString().toLowerCase();
    if (valor.includes("segunda")) return "segunda";
    return "primera";
}

function textoClaseHuevos(clase) {
    const key = normalizarClaseHuevos(clase);
    if (key === "segunda") return "Segunda";
    return "Primera";
}

function agregarLoteHuevos(fecha, galpon, clase, cantidad, produccionId = null) {
    const key = normalizarClaseHuevos(clase);
    const valor = numero(cantidad);
    if (!fecha || valor <= 0) return;

    datos.stockHuevos[key] += valor;
    datos.lotesHuevos.push({
        id: generarId(datos.lotesHuevos),
        produccionId,
        fecha,
        galpon,
        clase: textoClaseHuevos(key),
        cantidadInicial: valor,
        cantidadDisponible: valor
    });
}

function registrarMovimientoHuevos(fecha, tipo, detalle, primera, segunda, ventaId = null, produccionId = null) {
    const cantPrimera = numero(primera);
    const cantSegunda = numero(segunda);

    datos.movimientosHuevos.push({
        id: generarId(datos.movimientosHuevos),
        fecha,
        tipo,
        detalle,
        primera: cantPrimera,
        segunda: cantSegunda,
        total: cantPrimera + cantSegunda,
        ventaId,
        produccionId
    });
}

function descontarHuevosFIFO(clase, cantidad) {
    const key = normalizarClaseHuevos(clase);
    const valor = numero(cantidad);

    if (valor <= 0) {
        return { ok: false, mensaje: "Ingrese una cantidad válida de jabas.", detalle: [] };
    }

    if (valor > numero(datos.stockHuevos[key])) {
        return { ok: false, mensaje: "No hay stock suficiente de jabas de " + textoClaseHuevos(key) + ".", detalle: [] };
    }

    const lotesDisponibles = datos.lotesHuevos
        .filter(l => normalizarClaseHuevos(l.clase) === key && numero(l.cantidadDisponible) > 0)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha) || a.id - b.id);

    const totalLotes = lotesDisponibles.reduce((suma, lote) => suma + numero(lote.cantidadDisponible), 0);
    if (valor > totalLotes) {
        return { ok: false, mensaje: "No hay stock suficiente para completar la venta.", detalle: [] };
    }

    let pendiente = valor;
    const detalle = [];

    for (const lote of lotesDisponibles) {
        if (pendiente <= 0) break;
        const usado = Math.min(pendiente, numero(lote.cantidadDisponible));
        lote.cantidadDisponible -= usado;
        pendiente -= usado;
        detalle.push({ loteId: lote.id, clase: key, cantidad: usado });
    }

    datos.stockHuevos[key] -= valor;
    sincronizarStockJabas();

    return { ok: true, detalle };
}

function galponTieneFormula(galpon) {
    const numeroGalpon = (galpon.match(/\d+/) || [""])[0];
    return Object.values(FORMULAS_MOLINO).some(f => {
        const destino = (f.destino || "").toLowerCase();
        if (destino === galpon.toLowerCase()) return true;
        return numeroGalpon && destino.includes(numeroGalpon);
    });
}


function convertirIngresoAkg(insumo, cantidad) {
    const info = INSUMOS_INFO[insumo];
    return cantidad * (info ? info.kgPorUnidad : 1);
}

function formatoStockInsumo(insumo, kg) {
    const info = INSUMOS_INFO[insumo];
    if (!info) return kg.toFixed(2) + " kg";

    if (info.unidadCompra.includes("toneladas")) {
        return (kg / 1000).toFixed(2) + " toneladas";
    }

    if (info.unidadCompra.includes("1000 L")) {
        return kg.toFixed(2) + " L";
    }

    return (kg / info.kgPorUnidad).toFixed(2) + " " + info.unidadCompra;
}

function sacosBalanceado(kg) {
    return kg / KG_POR_SACO_BALANCEADO;
}

function obtenerGalpones() {
    return Object.keys(datos.gallinas || {});
}

function opcionesGalponesHTML(incluirTodos = false) {
    const opciones = obtenerGalpones().map(g => `<option value="${g}">${g}</option>`).join("");
    return incluirTodos ? `<option value="">Todos</option>` + opciones : opciones;
}

// -------------------- LOGIN Y ROLES --------------------
function iniciarSesion() {
    const usuario = document.getElementById("login-user").value.trim();
    const clave = document.getElementById("login-pass").value.trim();

    const encontrado = USUARIOS.find(u => u.usuario === usuario && u.clave === clave);

    if (!encontrado) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    datos.usuarioActual = encontrado;
    guardarDatos();
    mostrarAplicacion();
}

function cerrarSesion() {
    datos.usuarioActual = null;
    guardarDatos();
    location.reload();
}

function mostrarAplicacion() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    document.getElementById("user-role").textContent = datos.usuarioActual.rol;

    aplicarPermisos();
    actualizarTodo();
}

function aplicarPermisos() {
    const rol = datos.usuarioActual.rol;

    // Producción solo para Producción o Administrador
    if (rol !== "Administrador" && rol !== "Producción") {
        bloquearBoton("btn-guardar-produccion");
    }

    // Almacén de alimento y molino solo para Almacén o Administrador
    if (rol !== "Administrador" && rol !== "Almacén") {
        bloquearBoton("btn-ingresar-insumo");
        bloquearBoton("btn-agregar-insumo");
        bloquearBoton("btn-eliminar-insumo");
        bloquearBoton("btn-consumir-alimento");
        bloquearBoton("btn-producir-molino");
        bloquearBoton("btn-guardar-formula-destino");
        bloquearBoton("btn-agregar-formula-insumo");
        bloquearBoton("btn-quitar-formula-insumo");
        bloquearBoton("btn-crear-formula");
        bloquearBoton("btn-eliminar-formula");
    }

    // Ventas solo para Ventas o Administrador
    if (rol !== "Administrador" && rol !== "Ventas") {
        bloquearBoton("btn-guardar-venta");
    }

    // Administrador solo para datos maestros
    const btnAdmin = document.querySelector('.nav-btn[data-tab="admin"]');
    if (btnAdmin && rol !== "Administrador") {
        btnAdmin.style.display = "none";
        [
            "btn-admin-agregar-galpon", "btn-admin-cargar-galpon", "btn-admin-guardar-galpon",
            "btn-admin-eliminar-galpon", "btn-agregar-insumo", "btn-eliminar-insumo",
            "btn-guardar-formula-destino", "btn-agregar-formula-insumo", "btn-quitar-formula-insumo",
            "btn-crear-formula", "btn-eliminar-formula"
        ].forEach(bloquearBoton);
    }
}


function bloquearBoton(id) {
    const btn = document.getElementById(id);
    if (btn) {
        btn.disabled = true;
        btn.title = "No tiene permiso para esta acción";
    }
}

// -------------------- NAVEGACIÓN --------------------
function cambiarTab(tab) {
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(sec => sec.classList.remove("active"));

    document.querySelector(`.nav-btn[data-tab="${tab}"]`).classList.add("active");
    document.getElementById("tab-" + tab).classList.add("active");
}

// -------------------- PRODUCCIÓN --------------------
function guardarProduccion() {
    const fecha = document.getElementById("prod-fecha").value;
    const galpon = document.getElementById("prod-galpon").value;
    const primera = numero(document.getElementById("prod-jabas-primera").value);
    const segunda = numero(document.getElementById("prod-jabas-segunda").value);
    const muertas = numero(document.getElementById("prod-muertas").value);
    const jabas = primera + segunda;

    if (!fecha) {
        mostrarMensaje("No se pueden almacenar huevos sin registrar la fecha de ingreso.", "error");
        return;
    }

    if (estaCerrado(fecha)) {
        mostrarMensaje("No se puede registrar. El día ya fue cerrado.", "error");
        return;
    }

    if (!datos.gallinas.hasOwnProperty(galpon)) {
        mostrarMensaje("Seleccione un galpón válido. Puede crearlo en Administrador.", "error");
        return;
    }

    if (primera < 0 || segunda < 0 || muertas < 0) {
        mostrarMensaje("Las cantidades no pueden ser negativas.", "error");
        return;
    }

    if (jabas <= 0) {
        mostrarMensaje("Ingrese jabas de primera o segunda.", "error");
        return;
    }

    const yaRegistrado = datos.produccion.some(p => p.fecha === fecha && p.galpon === galpon);
    if (yaRegistrado) {
        mostrarMensaje("Ese galpón ya tiene producción registrada en esa fecha.", "error");
        return;
    }

    datos.gallinas[galpon] = Math.max(0, datos.gallinas[galpon] - muertas);

    const idProduccion = Date.now();

    datos.produccion.push({
        id: idProduccion,
        fecha,
        galpon,
        primera,
        segunda,
        jabas,
        muertas,
        gallinasRestantes: datos.gallinas[galpon]
    });

    // Las jabas se clasifican en primera y segunda. En el almacén aparecen juntas en una sola fila.
    agregarLoteHuevos(fecha, galpon, "Primera", primera, idProduccion);
    agregarLoteHuevos(fecha, galpon, "Segunda", segunda, idProduccion);
    registrarMovimientoHuevos(
        fecha,
        "Entrada",
        "Producción - " + galpon,
        primera,
        segunda,
        null,
        idProduccion
    );
    sincronizarStockJabas();

    guardarDatos();
    limpiarProduccion();
    actualizarTodo();
    mostrarMensaje("Producción registrada. Las jabas ingresaron automáticamente al almacén.");
}
function filtrarProduccion() {
    actualizarTablaProduccion();
}

function limpiarFiltroProduccion() {
    document.getElementById("filtro-prod-fecha").value = "";
    document.getElementById("filtro-prod-galpon").value = "";
    actualizarTablaProduccion();
}

function limpiarProduccion() {
    document.getElementById("prod-jabas-primera").value = "";
    document.getElementById("prod-jabas-segunda").value = "";
    document.getElementById("prod-muertas").value = "0";
}

// -------------------- ALMACÉN DE HUEVOS --------------------
// Este módulo ya no tiene registro manual.
// Solo muestra el stock actual y el historial generado automáticamente por Producción y Ventas.

// -------------------- ALMACÉN DE ALIMENTO --------------------
function ingresarInsumo() {
    const insumo = document.getElementById("insumo-nombre").value;
    const cantidad = numero(document.getElementById("insumo-kg").value);
    const fecha = hoy();

    if (estaCerrado(fecha)) {
        mostrarMensaje("No se puede registrar. El día ya fue cerrado.", "error");
        return;
    }

    if (cantidad <= 0) {
        mostrarMensaje("Ingrese una cantidad válida.", "error");
        return;
    }

    const kgAgregados = convertirIngresoAkg(insumo, cantidad);
    datos.insumos[insumo] = numero(datos.insumos[insumo]) + kgAgregados;

    const info = INSUMOS_INFO[insumo];
    datos.movimientosAlimento.push({
        fecha,
        tipo: "Ingreso de insumo",
        detalle: insumo,
        cantidad: cantidad + " " + info.unidadCompra + " = " + kgAgregados.toFixed(2) + " kg"
    });

    guardarDatos();
    document.getElementById("insumo-kg").value = "";
    actualizarTodo();
    mostrarMensaje("Ingreso de insumo registrado.");
}


function obtenerInfoPorPresentacion(tipo) {
    if (tipo === "toneladas") return { unidadCompra: "toneladas", kgPorUnidad: 1000, etiqueta: "Granel" };
    if (tipo === "sacos50") return { unidadCompra: "sacos de 50 kg", kgPorUnidad: 50, etiqueta: "Saco 50 kg" };
    if (tipo === "tanques1000") return { unidadCompra: "tanques de 1000 L", kgPorUnidad: 1000, etiqueta: "Litros" };
    if (tipo === "sacos25") return { unidadCompra: "sacos de 25 kg", kgPorUnidad: 25, etiqueta: "Saco 25 kg" };
    return { unidadCompra: "kg", kgPorUnidad: 1, etiqueta: "Kg" };
}

function agregarNuevoInsumo() {
    const nombre = document.getElementById("nuevo-insumo-nombre").value.trim().toUpperCase();
    const tipo = document.getElementById("nuevo-insumo-presentacion").value;
    const cantidad = numero(document.getElementById("nuevo-insumo-stock").value);
    const fecha = hoy();

    if (!nombre) {
        mostrarMensaje("Ingrese el nombre del nuevo insumo.", "error");
        return;
    }

    if (INSUMOS_INFO[nombre]) {
        mostrarMensaje("Ese insumo ya existe. Use el formulario de ingreso para aumentar su stock.", "error");
        return;
    }

    if (cantidad < 0) {
        mostrarMensaje("El stock inicial no puede ser negativo.", "error");
        return;
    }

    const info = obtenerInfoPorPresentacion(tipo);
    info.cantidadInicial = cantidad;

    INSUMOS_INFO[nombre] = info;
    datos.insumosInfo = INSUMOS_INFO;
    datos.insumos[nombre] = cantidad * info.kgPorUnidad;

    datos.movimientosAlimento.push({
        fecha,
        tipo: "Nuevo insumo",
        detalle: nombre,
        cantidad: cantidad + " " + info.unidadCompra
    });

    guardarDatos();
    document.getElementById("nuevo-insumo-nombre").value = "";
    document.getElementById("nuevo-insumo-stock").value = "0";
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    mostrarMensaje("Nuevo insumo agregado correctamente.");
}

function eliminarInsumo() {
    const insumo = document.getElementById("admin-insumo-eliminar").value;

    if (!insumo) {
        mostrarMensaje("Seleccione un insumo para eliminar.", "error");
        return;
    }

    if (!confirm("¿Desea eliminar el insumo " + insumo + "? También se quitará de las fórmulas.")) {
        return;
    }

    delete INSUMOS_INFO[insumo];
    delete datos.insumos[insumo];

    Object.keys(FORMULAS_MOLINO).forEach(formula => {
        delete FORMULAS_MOLINO[formula].insumos[insumo];
    });

    datos.insumosInfo = INSUMOS_INFO;
    datos.formulasMolino = FORMULAS_MOLINO;

    datos.movimientosAlimento.push({
        fecha: hoy(),
        tipo: "Insumo eliminado",
        detalle: insumo,
        cantidad: "Eliminado del almacén y de las fórmulas"
    });

    guardarDatos();
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    cargarEditorFormula();
    mostrarMensaje("Insumo eliminado correctamente.");
}

function consumirAlimento() {
    const galpon = document.getElementById("consumo-galpon").value;
    const sacos = numero(document.getElementById("consumo-kg").value);
    const kg = sacos * KG_POR_SACO_BALANCEADO;
    const fecha = hoy();

    if (estaCerrado(fecha)) {
        mostrarMensaje("No se puede registrar. El día ya fue cerrado.", "error");
        return;
    }

    if (sacos <= 0) {
        mostrarMensaje("El consumo de alimento es obligatorio. Ingrese la cantidad de sacos entregados.", "error");
        return;
    }

    if (kg > numero(datos.alimentoPorGalpon[galpon])) {
        mostrarMensaje("No se puede entregar alimento. Stock insuficiente para " + galpon + ".", "error");
        return;
    }

    datos.alimentoPorGalpon[galpon] -= kg;

    datos.movimientosAlimento.push({
        fecha,
        tipo: "Salida de alimento",
        detalle: "Consumo obligatorio - " + galpon,
        cantidad: sacos + " sacos de 50 kg (" + kg + " kg)"
    });

    guardarDatos();
    document.getElementById("consumo-kg").value = "";
    actualizarTodo();
    mostrarMensaje("Consumo de alimento registrado y descontado del stock.");
}

// -------------------- MOLINO --------------------

function cargarEditorFormula() {
    const formula = document.getElementById("edit-formula")?.value;
    const destinoInput = document.getElementById("edit-formula-destino");
    const contenedor = document.getElementById("editor-formula-preview");

    if (!formula || !FORMULAS_MOLINO[formula]) {
        if (destinoInput) destinoInput.value = "";
        if (contenedor) contenedor.innerHTML = "<p>No hay fórmula seleccionada.</p>";
        return;
    }

    destinoInput.value = FORMULAS_MOLINO[formula].destino;
    actualizarKgFormulaPorInsumo();

    const insumos = FORMULAS_MOLINO[formula].insumos;
    const filas = Object.keys(insumos).map(insumo => `
        <div class="formula-item">
            <strong>${insumo}</strong>
            <span>${numero(insumos[insumo]).toFixed(2)} kg por tanda</span>
        </div>
    `).join("");

    contenedor.innerHTML = filas || "<p>Esta fórmula aún no tiene insumos.</p>";
}

function actualizarKgFormulaPorInsumo() {
    const formula = document.getElementById("edit-formula")?.value;
    const insumo = document.getElementById("edit-formula-insumo")?.value;
    const inputKg = document.getElementById("edit-formula-kg");

    if (!formula || !insumo || !inputKg || !FORMULAS_MOLINO[formula]) return;

    const valorActual = FORMULAS_MOLINO[formula].insumos[insumo];
    inputKg.value = valorActual !== undefined ? valorActual : "";
}

function guardarDestinoFormula() {
    const formula = document.getElementById("edit-formula").value;
    const destino = document.getElementById("edit-formula-destino").value.trim();

    if (!formula || !FORMULAS_MOLINO[formula]) {
        mostrarMensaje("Seleccione una fórmula válida.", "error");
        return;
    }

    if (!destino) {
        mostrarMensaje("Ingrese el galpón o destino de la fórmula.", "error");
        return;
    }

    if (datos.gallinas[destino] === undefined) {
        mostrarMensaje("Ese galpón no existe. Primero agréguelo en Administrador.", "error");
        return;
    }

    FORMULAS_MOLINO[formula].destino = destino;
    if (datos.alimentoPorGalpon[destino] === undefined) datos.alimentoPorGalpon[destino] = 0;

    datos.formulasMolino = FORMULAS_MOLINO;
    guardarDatos();
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    cargarEditorFormula();
    mostrarMensaje("Destino de fórmula actualizado.");
}

function agregarOActualizarInsumoFormula() {
    const formula = document.getElementById("edit-formula").value;
    const insumo = document.getElementById("edit-formula-insumo").value;
    const kg = numero(document.getElementById("edit-formula-kg").value);

    if (!formula || !FORMULAS_MOLINO[formula]) {
        mostrarMensaje("Seleccione una fórmula válida.", "error");
        return;
    }

    if (!insumo || !INSUMOS_INFO[insumo]) {
        mostrarMensaje("Seleccione un insumo válido.", "error");
        return;
    }

    if (kg <= 0) {
        mostrarMensaje("Ingrese los kg que se usan por tanda.", "error");
        return;
    }

    FORMULAS_MOLINO[formula].insumos[insumo] = kg;
    datos.formulasMolino = FORMULAS_MOLINO;

    guardarDatos();
    cargarEditorFormula();
    mostrarMensaje("Insumo agregado o actualizado en la fórmula.");
}

function quitarInsumoDeFormula() {
    const formula = document.getElementById("edit-formula").value;
    const insumo = document.getElementById("edit-formula-insumo").value;

    if (!formula || !FORMULAS_MOLINO[formula]) {
        mostrarMensaje("Seleccione una fórmula válida.", "error");
        return;
    }

    if (!FORMULAS_MOLINO[formula].insumos[insumo]) {
        mostrarMensaje("Ese insumo no está en la fórmula.", "error");
        return;
    }

    delete FORMULAS_MOLINO[formula].insumos[insumo];
    datos.formulasMolino = FORMULAS_MOLINO;

    guardarDatos();
    cargarEditorFormula();
    mostrarMensaje("Insumo eliminado de la fórmula.");
}

function crearFormula() {
    const nombre = document.getElementById("nueva-formula-nombre").value.trim().toUpperCase();
    const destino = document.getElementById("nueva-formula-destino").value.trim();

    if (!nombre || !destino) {
        mostrarMensaje("Ingrese el nombre de la fórmula y el destino.", "error");
        return;
    }

    if (datos.gallinas[destino] === undefined) {
        mostrarMensaje("Ese galpón no existe. Primero agréguelo en Administrador.", "error");
        return;
    }

    if (FORMULAS_MOLINO[nombre]) {
        mostrarMensaje("Esa fórmula ya existe.", "error");
        return;
    }

    FORMULAS_MOLINO[nombre] = { destino, insumos: {} };
    datos.formulasMolino = FORMULAS_MOLINO;
    if (datos.alimentoPorGalpon[destino] === undefined) datos.alimentoPorGalpon[destino] = 0;

    guardarDatos();
    document.getElementById("nueva-formula-nombre").value = "";
    document.getElementById("nueva-formula-destino").value = "";
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    cargarEditorFormula();
    mostrarMensaje("Nueva fórmula creada. Ahora puede agregarle insumos.");
}

function eliminarFormula() {
    const formula = document.getElementById("edit-formula").value;

    if (!formula || !FORMULAS_MOLINO[formula]) {
        mostrarMensaje("Seleccione una fórmula para eliminar.", "error");
        return;
    }

    if (!confirm("¿Desea eliminar la fórmula " + formula + "?")) {
        return;
    }

    delete FORMULAS_MOLINO[formula];
    datos.formulasMolino = FORMULAS_MOLINO;

    guardarDatos();
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    cargarEditorFormula();
    mostrarMensaje("Fórmula eliminada correctamente.");
}

function normalizarTexto(valor) {
    return String(valor || "")
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function obtenerFormulaPorGalpon(galpon) {
    const buscado = normalizarTexto(galpon);
    const nombreFormula = Object.keys(FORMULAS_MOLINO).find(nombre => {
        return normalizarTexto(FORMULAS_MOLINO[nombre].destino) === buscado;
    });

    return nombreFormula || "";
}

function actualizarFormulaMolinoPorGalpon() {
    const selectGalpon = document.getElementById("molino-galpon");
    const inputFormula = document.getElementById("molino-formula-actual");
    const preview = document.getElementById("formula-preview");

    if (!selectGalpon || !inputFormula) return "";

    const galpon = selectGalpon.value;
    const formula = obtenerFormulaPorGalpon(galpon);

    inputFormula.value = formula || "Sin fórmula registrada";

    if (preview) {
        preview.innerHTML = formula
            ? `<p>Fórmula cargada automáticamente para <strong>${galpon}</strong>: <strong>${formula}</strong>.</p>`
            : `<p class="texto-error">No existe fórmula registrada para ${galpon}. Puede crearla o asignarla desde Administrador.</p>`;
    }

    return formula;
}

function calcularInsumosMolino(formula, tandas) {
    const resultado = {};
    const datosFormula = FORMULAS_MOLINO[formula];

    if (!datosFormula) return resultado;

    Object.keys(datosFormula.insumos).forEach(insumo => {
        resultado[insumo] = datosFormula.insumos[insumo] * tandas;
    });

    return resultado;
}

function verFormulaMolino() {
    const formula = actualizarFormulaMolinoPorGalpon();
    const tandas = numero(document.getElementById("molino-kg").value);
    const contenedor = document.getElementById("formula-preview");

    if (!formula) {
        contenedor.innerHTML = "<p class='texto-error'>No existe fórmula para el galpón seleccionado.</p>";
        return;
    }

    if (tandas <= 0) {
        contenedor.innerHTML = "<p>Ingrese el número de tandas para ver los insumos.</p>";
        return;
    }

    const insumos = calcularInsumosMolino(formula, tandas);
    const kgProducidos = tandas * KG_PRODUCIDOS_POR_TANDA;
    const sacosProducidos = tandas * SACOS_POR_TANDA;

    let html = `
        <div class="formula-resumen">
            <strong>${formula}</strong>
            <span>${tandas} tanda(s) = ${sacosProducidos} sacos de 50 kg = ${kgProducidos} kg producidos</span>
        </div>
    `;

    html += Object.keys(insumos).map(nombre => {
        const disponible = numero(datos.insumos[nombre]);
        const restante = disponible - numero(insumos[nombre]);
        const clase = restante < 0 ? "texto-error" : "";
        return `
            <div class="formula-item">
                <strong>${nombre}</strong>
                <span>${insumos[nombre].toFixed(2)} kg usados</span>
                <span class="${clase}">Stock luego: ${restante.toFixed(2)} kg</span>
            </div>
        `;
    }).join("");

    contenedor.innerHTML = html;
}

function producirMolino() {
    const fecha = document.getElementById("molino-fecha").value;
    const galponDestino = document.getElementById("molino-galpon").value;
    const formula = actualizarFormulaMolinoPorGalpon();
    const tandas = numero(document.getElementById("molino-kg").value);

    if (!fecha) {
        mostrarMensaje("Debe registrar la fecha de producción del molino.", "error");
        return;
    }

    if (estaCerrado(fecha)) {
        mostrarMensaje("No se puede registrar. El día ya fue cerrado.", "error");
        return;
    }

    if (tandas <= 0) {
        mostrarMensaje("Ingrese una cantidad válida de tandas.", "error");
        return;
    }

    const datosFormula = FORMULAS_MOLINO[formula];
    if (!datosFormula) {
        mostrarMensaje("El galpón seleccionado no tiene fórmula registrada.", "error");
        return;
    }

    const insumosUsados = calcularInsumosMolino(formula, tandas);
    if (Object.keys(insumosUsados).length === 0) {
        mostrarMensaje("La fórmula seleccionada no tiene insumos registrados.", "error");
        return;
    }

    // Validar stock antes de descontar
    for (let insumo in insumosUsados) {
        if (insumosUsados[insumo] > numero(datos.insumos[insumo])) {
            mostrarMensaje("Stock insuficiente de " + insumo + ". Necesita " + insumosUsados[insumo].toFixed(2) + " kg y solo hay " + numero(datos.insumos[insumo]).toFixed(2) + " kg.", "error");
            return;
        }
    }

    // Descontar insumos usados por el molino y registrar stock restante
    for (let insumo in insumosUsados) {
        datos.insumos[insumo] -= insumosUsados[insumo];
        datos.movimientosAlimento.push({
            fecha,
            tipo: "Consumo insumo molino",
            detalle: insumo,
            cantidad: insumosUsados[insumo].toFixed(2) + " kg usados | Stock restante: " + numero(datos.insumos[insumo]).toFixed(2) + " kg"
        });
    }

    // Aumentar alimento producido para el galpón/fórmula destino
    const kgProducidos = tandas * KG_PRODUCIDOS_POR_TANDA;
    const sacosProducidos = tandas * SACOS_POR_TANDA;
    const destino = galponDestino || datosFormula.destino;

    if (!datos.alimentoPorGalpon[destino]) datos.alimentoPorGalpon[destino] = 0;
    datos.alimentoPorGalpon[destino] += kgProducidos;

    const resumenInsumos = Object.keys(insumosUsados)
        .map(i => i + ": " + insumosUsados[i].toFixed(2) + " kg")
        .join(", ");

    datos.molino.push({
        fecha,
        formula,
        destino,
        tandas,
        sacos: sacosProducidos,
        kg: kgProducidos,
        insumos: resumenInsumos
    });

    datos.movimientosAlimento.push({
        fecha,
        tipo: "Producción molino",
        detalle: destino,
        cantidad: sacosProducidos + " sacos de 50 kg (" + kgProducidos + " kg)"
    });

    guardarDatos();
    document.getElementById("molino-kg").value = "";
    document.getElementById("formula-preview").innerHTML = "";
    actualizarTodo();
    mostrarMensaje("Molino registrado. Se descontaron insumos y se aumentó el alimento producido.");
}

// -------------------- VENTAS --------------------
function actualizarStockVentas() {
    const primera = numero(datos.stockHuevos.primera);
    const segunda = numero(datos.stockHuevos.segunda);
    const total = primera + segunda;

    const stockTotal = document.getElementById("ventas-stock-total");
    const stockPrimera = document.getElementById("ventas-stock-primera");
    const stockSegunda = document.getElementById("ventas-stock-segunda");

    if (stockTotal) stockTotal.textContent = total + " jabas";
    if (stockPrimera) stockPrimera.textContent = primera + " jabas";
    if (stockSegunda) stockSegunda.textContent = segunda + " jabas";
}

function calcularTotalVenta() {
    const primera = numero(document.getElementById("venta-primera")?.value);
    const segunda = numero(document.getElementById("venta-segunda")?.value);
    const promedioKgJaba = numero(document.getElementById("venta-promedio-kg-jaba")?.value);
    const precio = numero(document.getElementById("venta-precio")?.value);

    const totalJabas = primera + segunda;
    const peso = totalJabas * promedioKgJaba;
    const total = peso * precio;

    const totalJabasEl = document.getElementById("venta-total-jabas");
    const pesoEl = document.getElementById("venta-peso");
    const totalEl = document.getElementById("venta-total");

    if (totalJabasEl) totalJabasEl.value = totalJabas;
    if (pesoEl) pesoEl.value = peso.toFixed(2);
    if (totalEl) totalEl.textContent = "Total: S/ " + total.toFixed(2);
}

function guardarVenta() {
    const cliente = document.getElementById("venta-cliente").value.trim();
    const fecha = document.getElementById("venta-fecha").value;
    const primera = numero(document.getElementById("venta-primera").value);
    const segunda = numero(document.getElementById("venta-segunda").value);
    const promedioKgJaba = numero(document.getElementById("venta-promedio-kg-jaba").value);
    const precio = numero(document.getElementById("venta-precio").value);

    const totalJabas = primera + segunda;
    const peso = totalJabas * promedioKgJaba;
    const total = peso * precio;

    if (!fecha) {
        mostrarMensaje("Debe registrar la fecha de la transacción.", "error");
        return;
    }

    if (estaCerrado(fecha)) {
        mostrarMensaje("No se puede registrar. El día ya fue cerrado.", "error");
        return;
    }

    if (!cliente) {
        mostrarMensaje("Ingrese el nombre del cliente.", "error");
        return;
    }

    if (totalJabas <= 0) {
        mostrarMensaje("Ingrese jabas de primera o de segunda.", "error");
        return;
    }

    if (promedioKgJaba <= 0 || precio <= 0) {
        mostrarMensaje("Complete correctamente promedio de kilos por jaba y precio por kg.", "error");
        return;
    }

    if (primera > numero(datos.stockHuevos.primera)) {
        mostrarMensaje("No hay suficiente stock de jabas de primera.", "error");
        return;
    }

    if (segunda > numero(datos.stockHuevos.segunda)) {
        mostrarMensaje("No hay suficiente stock de jabas de segunda.", "error");
        return;
    }

    const idVenta = Date.now();
    let detalleFIFO = [];

    if (primera > 0) {
        const salidaPrimera = descontarHuevosFIFO("primera", primera);
        if (!salidaPrimera.ok) {
            mostrarMensaje(salidaPrimera.mensaje, "error");
            return;
        }
        detalleFIFO = detalleFIFO.concat(salidaPrimera.detalle);
    }

    if (segunda > 0) {
        const salidaSegunda = descontarHuevosFIFO("segunda", segunda);
        if (!salidaSegunda.ok) {
            mostrarMensaje(salidaSegunda.mensaje, "error");
            return;
        }
        detalleFIFO = detalleFIFO.concat(salidaSegunda.detalle);
    }

    datos.ventas.push({
        id: idVenta,
        fecha,
        cliente,
        primera,
        segunda,
        totalJabas,
        promedioKgJaba,
        peso,
        precio,
        total,
        detalleFIFO
    });

    registrarMovimientoHuevos(
        fecha,
        "Salida",
        "Venta a " + cliente,
        primera,
        segunda,
        idVenta,
        null
    );

    guardarDatos();
    limpiarVenta();
    actualizarTodo();
    mostrarMensaje("Venta registrada. El stock de almacén se descontó automáticamente.");
}

function limpiarVenta() {
    document.getElementById("venta-cliente").value = "";
    document.getElementById("venta-primera").value = 0;
    document.getElementById("venta-segunda").value = 0;
    document.getElementById("venta-promedio-kg-jaba").value = 18;
    document.getElementById("venta-precio").value = "6.00";
    calcularTotalVenta();
}

function eliminarVenta(idVenta) {
    const venta = datos.ventas.find(v => v.id === idVenta);

    if (!venta) {
        mostrarMensaje("No se encontró la venta.", "error");
        return;
    }

    const confirmar = confirm("¿Seguro que deseas eliminar esta venta? El stock volverá al almacén.");
    if (!confirmar) return;

    if (venta.detalleFIFO && venta.detalleFIFO.length > 0) {
        venta.detalleFIFO.forEach(detalle => {
            const lote = datos.lotesHuevos.find(l => l.id === detalle.loteId);
            if (lote) lote.cantidadDisponible += numero(detalle.cantidad);
        });
    } else {
        // Compatibilidad con ventas antiguas sin detalle FIFO.
        if (numero(venta.primera) > 0) agregarLoteHuevos(venta.fecha, "Devolución venta", "Primera", venta.primera, null);
        if (numero(venta.segunda) > 0) agregarLoteHuevos(venta.fecha, "Devolución venta", "Segunda", venta.segunda, null);
    }

    datos.stockHuevos.primera += numero(venta.primera);
    datos.stockHuevos.segunda += numero(venta.segunda);
    sincronizarStockJabas();

    datos.ventas = datos.ventas.filter(v => v.id !== idVenta);
    datos.movimientosHuevos = datos.movimientosHuevos.filter(m => m.ventaId !== idVenta);

    guardarDatos();
    actualizarTodo();
    mostrarMensaje("Venta eliminada correctamente. El stock fue restaurado.");
}

// -------------------- DASHBOARD Y TABLAS --------------------
function actualizarTodo() {
    actualizarDashboard();
    actualizarTablaProduccion();
    actualizarTablaAlmacenHuevos();
    actualizarAlimento();
    actualizarTablaMolino();
    actualizarTablaVentas();
    actualizarDiasCerrados();
    actualizarTablaGalpones();
}

function actualizarDashboard() {
    const fechaHoy = hoy();

    const produccionHoy = datos.produccion
        .filter(p => p.fecha === fechaHoy)
        .reduce((suma, p) => suma + p.jabas, 0);

    const ventasHoy = datos.ventas
        .filter(v => v.fecha === fechaHoy)
        .reduce((suma, v) => suma + numero(v.total ?? v.montoTotal), 0);

    const stockBalanceado = Object.values(datos.alimentoPorGalpon)
        .reduce((suma, v) => suma + v, 0);

    document.getElementById("dash-produccion-hoy").textContent = produccionHoy + " jabas";
    sincronizarStockJabas();
    document.getElementById("dash-stock-jabas").textContent = datos.stockJabas + " jabas";
    document.getElementById("dash-ventas-hoy").textContent = "S/ " + ventasHoy.toFixed(2);
    document.getElementById("dash-stock-alimento").textContent = sacosBalanceado(stockBalanceado).toFixed(0) + " sacos";
    document.getElementById("almacen-stock-jabas").textContent = datos.stockJabas + " jabas";
    const elPrimera = document.getElementById("almacen-stock-primera");
    const elSegunda = document.getElementById("almacen-stock-segunda");
    if (elPrimera) elPrimera.textContent = datos.stockHuevos.primera + " jabas";
    if (elSegunda) elSegunda.textContent = datos.stockHuevos.segunda + " jabas";

    const alertas = [];

    if (datos.stockJabas < STOCK_MINIMO_JABAS) {
        alertas.push("Stock bajo de jabas de huevo.");
    }

    Object.keys(datos.insumos).forEach(insumo => {
        const minimo = stockMinimoInsumoKg(insumo);
        if (datos.insumos[insumo] < minimo) {
            alertas.push("Stock mínimo de insumo: " + insumo);
        } else if (datos.insumos[insumo] < minimo * 2) {
            alertas.push("Producto próximo a agotarse: " + insumo);
        }
    });

    Object.keys(datos.alimentoPorGalpon).forEach(galpon => {
        const sacos = sacosBalanceado(numero(datos.alimentoPorGalpon[galpon]));
        if (sacos < STOCK_MINIMO_ALIMENTO_SACOS) {
            alertas.push("Alimento por debajo del mínimo en " + galpon + ": " + sacos.toFixed(2) + " sacos.");
        }
    });

    obtenerGalpones().forEach(galpon => {
        if (!galponTieneFormula(galpon)) {
            alertas.push("Falta registrar fórmula de alimentación para " + galpon + ".");
        }
    });

    const contenedor = document.getElementById("dashboard-alertas");
    if (alertas.length === 0) {
        contenedor.innerHTML = `<div class="alert ok">Sin alertas por el momento.</div>`;
    } else {
        contenedor.innerHTML = alertas.map(a => `<div class="alert danger">${a}</div>`).join("");
    }
}


function eliminarProduccion(idProduccion) {
    const produccion = datos.produccion.find(p => p.id === idProduccion);

    if (!produccion) {
        mostrarMensaje("No se encontró la producción.", "error");
        return;
    }

    const confirmar = confirm("¿Seguro que deseas eliminar esta producción? Se quitará del almacén y se corregirán las gallinas.");
    if (!confirmar) return;

    const lotesProduccion = datos.lotesHuevos.filter(l => l.produccionId === idProduccion);
    const yaVendido = lotesProduccion.some(l => numero(l.cantidadDisponible) < numero(l.cantidadInicial));

    if (yaVendido) {
        mostrarMensaje("No se puede eliminar esta producción porque parte de sus jabas ya fueron vendidas.", "error");
        return;
    }

    datos.stockHuevos.primera = Math.max(0, numero(datos.stockHuevos.primera) - numero(produccion.primera));
    datos.stockHuevos.segunda = Math.max(0, numero(datos.stockHuevos.segunda) - numero(produccion.segunda));
    sincronizarStockJabas();

    datos.lotesHuevos = datos.lotesHuevos.filter(l => l.produccionId !== idProduccion);
    datos.movimientosHuevos = datos.movimientosHuevos.filter(m => m.produccionId !== idProduccion);
    datos.produccion = datos.produccion.filter(p => p.id !== idProduccion);

    if (datos.gallinas[produccion.galpon] !== undefined) {
        datos.gallinas[produccion.galpon] += numero(produccion.muertas);
    }

    guardarDatos();
    actualizarTodo();
    mostrarMensaje("Producción eliminada correctamente. El almacén y las gallinas fueron corregidos.");
}

function actualizarTablaProduccion() {
    const fechaFiltro = document.getElementById("filtro-prod-fecha").value;
    const galponFiltro = document.getElementById("filtro-prod-galpon").value;

    let lista = datos.produccion;

    if (fechaFiltro) {
        lista = lista.filter(p => p.fecha === fechaFiltro);
    }

    if (galponFiltro) {
        lista = lista.filter(p => p.galpon === galponFiltro);
    }

    document.getElementById("tabla-produccion").innerHTML = lista.map(p => `
        <tr>
            <td>${p.fecha}</td>
            <td>${p.galpon}</td>
            <td>${numero(p.primera)}</td>
            <td>${numero(p.segunda)}</td>
            <td>${numero(p.jabas)}</td>
            <td>${p.muertas}</td>
            <td>${p.gallinasRestantes}</td>
            <td><button class="btn btn-danger" onclick="eliminarProduccion(${p.id})">Eliminar</button></td>
        </tr>
    `).join("");
}

function actualizarTablaAlmacenHuevos() {
    document.getElementById("tabla-almacen-huevos").innerHTML = datos.movimientosHuevos.map(m => {
        const primera = numero(m.primera ?? (normalizarClaseHuevos(m.clase) === "primera" ? m.cantidad : 0));
        const segunda = numero(m.segunda ?? (normalizarClaseHuevos(m.clase) === "segunda" ? m.cantidad : 0));
        const total = numero(m.total ?? (primera + segunda));

        return `
            <tr>
                <td>${m.fecha}</td>
                <td>${m.tipo}</td>
                <td>${m.detalle}</td>
                <td>${primera}</td>
                <td>${segunda}</td>
                <td>${total}</td>
            </tr>
        `;
    }).join("");
}

function actualizarAlimento() {
    let totalInsumos = 0;
    let totalBalanceado = 0;

    document.getElementById("tabla-insumos").innerHTML = Object.keys(datos.insumos).map(insumo => {
        const kg = numero(datos.insumos[insumo]);
        const info = INSUMOS_INFO[insumo];
        totalInsumos += kg;
        return `
            <tr>
                <td>${insumo}</td>
                <td>${info ? info.unidadCompra : "kg"}</td>
                <td>${formatoStockInsumo(insumo, kg)}</td>
                <td>${kg.toFixed(2)} kg</td>
                <td>${stockMinimoInsumoKg(insumo).toFixed(2)} kg</td>
            </tr>
        `;
    }).join("");

    document.getElementById("tabla-balanceado").innerHTML = obtenerGalpones().map(galpon => {
        const kg = numero(datos.alimentoPorGalpon[galpon]);
        totalBalanceado += kg;
        return `
            <tr>
                <td>${galpon}</td>
                <td>${sacosBalanceado(kg).toFixed(2)} sacos</td>
                <td>${kg.toFixed(2)} kg</td>
                <td>${sacosBalanceado(kg) < STOCK_MINIMO_ALIMENTO_SACOS ? "⚠ Bajo mínimo" : "Correcto"}</td>
            </tr>
        `;
    }).join("");

    document.getElementById("stock-insumos-total").textContent = totalInsumos.toFixed(0) + " kg";
    document.getElementById("stock-balanceado-total").textContent = sacosBalanceado(totalBalanceado).toFixed(0) + " sacos";

    document.getElementById("tabla-alimento-mov").innerHTML = datos.movimientosAlimento.map(m => `
        <tr>
            <td>${m.fecha}</td>
            <td>${m.tipo}</td>
            <td>${m.detalle}</td>
            <td>${m.cantidad}</td>
        </tr>
    `).join("");
}

function actualizarTablaMolino() {
    document.getElementById("tabla-molino").innerHTML = datos.molino.map(m => `
        <tr>
            <td>${m.fecha}</td>
            <td>${m.destino || m.galpon || m.formula}</td>
            <td>${m.tandas || 1}</td>
            <td>${m.sacos || sacosBalanceado(numero(m.kg)).toFixed(0)} sacos</td>
            <td>${numero(m.kg).toFixed(2)} kg</td>
            <td>${m.insumos}</td>
        </tr>
    `).join("");
}

function actualizarTablaVentas() {
    actualizarStockVentas();

    document.getElementById("tabla-ventas").innerHTML = datos.ventas.map(v => {
        const primera = numero(v.primera);
        const segunda = numero(v.segunda);
        const totalJabas = numero(v.totalJabas || v.jabas || (primera + segunda));
        const promedio = numero(v.promedioKgJaba);
        const peso = numero(v.peso);
        const precio = numero(v.precio);
        const total = numero(v.total ?? v.montoTotal);

        return `
            <tr>
                <td>${v.fecha}</td>
                <td>${v.cliente}</td>
                <td>${primera}</td>
                <td>${segunda}</td>
                <td>${totalJabas}</td>
                <td>${promedio.toFixed(2)} kg</td>
                <td>${peso.toFixed(2)} kg</td>
                <td>S/ ${precio.toFixed(2)}</td>
                <td>S/ ${total.toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="eliminarVenta(${v.id})">Eliminar</button></td>
            </tr>
        `;
    }).join("");
}

function cerrarDiaActual() {
    const fecha = hoy();

    if (!datos.diasCerrados.includes(fecha)) {
        datos.diasCerrados.push(fecha);
        guardarDatos();
        actualizarDiasCerrados();
        mostrarMensaje("Día cerrado correctamente. Ya no se permiten registros con esa fecha.");
    } else {
        mostrarMensaje("El día actual ya estaba cerrado.", "error");
    }
}

function actualizarDiasCerrados() {
    const texto = datos.diasCerrados.length === 0
        ? "No hay días cerrados."
        : "Días cerrados: " + datos.diasCerrados.join(", ");

    document.getElementById("dias-cerrados").textContent = texto;
}


// -------------------- ADMINISTRADOR: GALPONES --------------------
function agregarGalpon() {
    const nombre = document.getElementById("admin-galpon-nombre").value.trim();
    const gallinas = numero(document.getElementById("admin-galpon-gallinas").value);

    if (!nombre) {
        mostrarMensaje("Ingrese el nombre del galpón.", "error");
        return;
    }

    if (datos.gallinas[nombre] !== undefined) {
        mostrarMensaje("Ese galpón ya existe. Use la opción editar.", "error");
        return;
    }

    if (gallinas < 0) {
        mostrarMensaje("La cantidad de gallinas no puede ser negativa.", "error");
        return;
    }

    datos.gallinas[nombre] = gallinas;
    if (datos.alimentoPorGalpon[nombre] === undefined) datos.alimentoPorGalpon[nombre] = 0;

    guardarDatos();
    document.getElementById("admin-galpon-nombre").value = "";
    document.getElementById("admin-galpon-gallinas").value = "";
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    mostrarMensaje("Galpón agregado correctamente.");
}

function cargarGalponParaEditar() {
    const galpon = document.getElementById("admin-galpon-editar-select").value;
    document.getElementById("admin-galpon-editar-nombre").value = galpon || "";
    document.getElementById("admin-galpon-editar-gallinas").value = datos.gallinas[galpon] ?? 0;
}

function guardarCambiosGalpon() {
    const galponActual = document.getElementById("admin-galpon-editar-select").value;
    const nuevoNombre = document.getElementById("admin-galpon-editar-nombre").value.trim();
    const gallinas = numero(document.getElementById("admin-galpon-editar-gallinas").value);

    if (!galponActual || datos.gallinas[galponActual] === undefined) {
        mostrarMensaje("Seleccione un galpón para editar.", "error");
        return;
    }

    if (!nuevoNombre) {
        mostrarMensaje("Ingrese el nuevo nombre del galpón.", "error");
        return;
    }

    if (gallinas < 0) {
        mostrarMensaje("La cantidad de gallinas no puede ser negativa.", "error");
        return;
    }

    if (nuevoNombre !== galponActual && datos.gallinas[nuevoNombre] !== undefined) {
        mostrarMensaje("Ya existe otro galpón con ese nombre.", "error");
        return;
    }

    delete datos.gallinas[galponActual];
    datos.gallinas[nuevoNombre] = gallinas;

    // Actualiza registros relacionados para mantener consistencia visual.
    datos.produccion.forEach(p => {
        if (p.galpon === galponActual) p.galpon = nuevoNombre;
    });

    datos.lotesHuevos.forEach(lote => {
        if (lote.galpon === galponActual) lote.galpon = nuevoNombre;
    });

    datos.molino.forEach(m => {
        if (m.destino === galponActual) m.destino = nuevoNombre;
    });

    datos.movimientosHuevos.forEach(m => {
        if (m.detalle && m.detalle.includes(galponActual)) {
            m.detalle = m.detalle.replace(galponActual, nuevoNombre);
        }
    });

    if (datos.alimentoPorGalpon[galponActual] !== undefined) {
        datos.alimentoPorGalpon[nuevoNombre] = datos.alimentoPorGalpon[galponActual];
        delete datos.alimentoPorGalpon[galponActual];
    }

    Object.keys(FORMULAS_MOLINO).forEach(nombreFormula => {
        if (FORMULAS_MOLINO[nombreFormula].destino === galponActual) {
            FORMULAS_MOLINO[nombreFormula].destino = nuevoNombre;
        }
    });
    datos.formulasMolino = FORMULAS_MOLINO;

    guardarDatos();
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    cargarGalponParaEditar();
    mostrarMensaje("Galpón actualizado correctamente.");
}

function eliminarGalpon() {
    const galpon = document.getElementById("admin-galpon-eliminar").value;

    if (!galpon || datos.gallinas[galpon] === undefined) {
        mostrarMensaje("Seleccione un galpón para eliminar.", "error");
        return;
    }

    if (!confirm("¿Desea eliminar " + galpon + "? Los registros históricos no se borrarán.")) {
        return;
    }

    delete datos.gallinas[galpon];

    // Retira el stock de alimento y las fórmulas asociadas al galpón eliminado.
    delete datos.alimentoPorGalpon[galpon];
    Object.keys(FORMULAS_MOLINO).forEach(nombreFormula => {
        if (FORMULAS_MOLINO[nombreFormula].destino === galpon) {
            delete FORMULAS_MOLINO[nombreFormula];
        }
    });
    datos.formulasMolino = FORMULAS_MOLINO;

    guardarDatos();
    cargarOpcionesInsumosYFormulas();
    actualizarTodo();
    mostrarMensaje("Galpón eliminado del listado activo.");
}

function actualizarTablaGalpones() {
    const cuerpo = document.getElementById("tabla-galpones");
    if (!cuerpo) return;

    cuerpo.innerHTML = obtenerGalpones().map(galpon => `
        <tr>
            <td>${galpon}</td>
            <td>${datos.gallinas[galpon]}</td>
            <td>${galponTieneFormula(galpon) ? "Sí" : "No registrada"}</td>
        </tr>
    `).join("");
}

// -------------------- ACCESIBILIDAD --------------------
function cambiarTamanoTexto(valor) {
    const html = document.documentElement;
    const actual = parseFloat(html.style.fontSize || "16");
    const nuevo = Math.min(22, Math.max(14, actual + valor));
    html.style.fontSize = nuevo + "px";
    localStorage.setItem("tamanoTextoAvicola", nuevo);
}

function cargarTamanoTexto() {
    const guardado = localStorage.getItem("tamanoTextoAvicola");
    if (guardado) {
        document.documentElement.style.fontSize = guardado + "px";
    }
}

function resetTamanoTexto() {
    document.documentElement.style.fontSize = "16px";
    localStorage.setItem("tamanoTextoAvicola", "16");
}

function cargarOpcionesInsumosYFormulas() {
    const opcionesInsumos = Object.keys(INSUMOS_INFO).map(nombre => {
        const info = INSUMOS_INFO[nombre];
        return `<option value="${nombre}">${nombre} - ${info.unidadCompra}</option>`;
    }).join("");

    const selectInsumo = document.getElementById("insumo-nombre");
    if (selectInsumo) selectInsumo.innerHTML = opcionesInsumos;

    const selectEliminarInsumo = document.getElementById("admin-insumo-eliminar");
    if (selectEliminarInsumo) selectEliminarInsumo.innerHTML = opcionesInsumos;

    const selectEditorInsumo = document.getElementById("edit-formula-insumo");
    if (selectEditorInsumo) selectEditorInsumo.innerHTML = opcionesInsumos;

    const opcionesFormulas = Object.keys(FORMULAS_MOLINO).map(nombre => {
        return `<option value="${nombre}">${nombre} → ${FORMULAS_MOLINO[nombre].destino}</option>`;
    }).join("");

    const selectMolinoGalpon = document.getElementById("molino-galpon");
    if (selectMolinoGalpon) {
        selectMolinoGalpon.innerHTML = opcionesGalponesHTML(false);
        actualizarFormulaMolinoPorGalpon();
    }

    const selectEditFormula = document.getElementById("edit-formula");
    if (selectEditFormula) selectEditFormula.innerHTML = opcionesFormulas;

    // Galpones administrables: se cargan desde datos.gallinas.
    const prodGalpon = document.getElementById("prod-galpon");
    if (prodGalpon) prodGalpon.innerHTML = opcionesGalponesHTML(false);

    const filtroGalpon = document.getElementById("filtro-prod-galpon");
    if (filtroGalpon) filtroGalpon.innerHTML = opcionesGalponesHTML(true);

    const editGalpon = document.getElementById("admin-galpon-editar-select");
    if (editGalpon) editGalpon.innerHTML = opcionesGalponesHTML(false);

    const eliminarGalponSelect = document.getElementById("admin-galpon-eliminar");
    if (eliminarGalponSelect) eliminarGalponSelect.innerHTML = opcionesGalponesHTML(false);

    const selectConsumo = document.getElementById("consumo-galpon");
    if (selectConsumo) selectConsumo.innerHTML = opcionesGalponesHTML(false);

    cargarGalponParaEditar();
}

// -------------------- INICIO DEL SISTEMA --------------------
document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
    cargarTamanoTexto();

    // Fechas por defecto
    document.getElementById("prod-fecha").value = hoy();
    document.getElementById("molino-fecha").value = hoy();
    document.getElementById("venta-fecha").value = hoy();

    cargarOpcionesInsumosYFormulas();

    // Login
    document.getElementById("btn-login").addEventListener("click", iniciarSesion);
    document.getElementById("btn-logout").addEventListener("click", cerrarSesion);

    // Navegación
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => cambiarTab(btn.dataset.tab));
    });

    // Producción
    document.getElementById("btn-guardar-produccion").addEventListener("click", guardarProduccion);
    document.getElementById("btn-filtrar-produccion").addEventListener("click", filtrarProduccion);
    document.getElementById("btn-limpiar-filtro-produccion").addEventListener("click", limpiarFiltroProduccion);

    // Almacén huevos: no tiene botones manuales. Solo se actualiza desde Producción y Ventas.

    // Almacén alimento
    document.getElementById("btn-ingresar-insumo").addEventListener("click", ingresarInsumo);
    document.getElementById("btn-agregar-insumo").addEventListener("click", agregarNuevoInsumo);
    document.getElementById("btn-eliminar-insumo").addEventListener("click", eliminarInsumo);
    document.getElementById("btn-consumir-alimento").addEventListener("click", consumirAlimento);

    // Administrador: galpones
    document.getElementById("btn-admin-agregar-galpon").addEventListener("click", agregarGalpon);
    document.getElementById("btn-admin-cargar-galpon").addEventListener("click", cargarGalponParaEditar);
    document.getElementById("btn-admin-guardar-galpon").addEventListener("click", guardarCambiosGalpon);
    document.getElementById("btn-admin-eliminar-galpon").addEventListener("click", eliminarGalpon);
    document.getElementById("admin-galpon-editar-select").addEventListener("change", cargarGalponParaEditar);

    // Molino
    const selectMolinoGalpon = document.getElementById("molino-galpon");
    if (selectMolinoGalpon) {
        selectMolinoGalpon.addEventListener("change", actualizarFormulaMolinoPorGalpon);
        actualizarFormulaMolinoPorGalpon();
    }
    document.getElementById("btn-ver-formula").addEventListener("click", verFormulaMolino);
    document.getElementById("btn-producir-molino").addEventListener("click", producirMolino);
    document.getElementById("edit-formula").addEventListener("change", cargarEditorFormula);
    document.getElementById("edit-formula-insumo").addEventListener("change", actualizarKgFormulaPorInsumo);
    document.getElementById("btn-guardar-formula-destino").addEventListener("click", guardarDestinoFormula);
    document.getElementById("btn-agregar-formula-insumo").addEventListener("click", agregarOActualizarInsumoFormula);
    document.getElementById("btn-quitar-formula-insumo").addEventListener("click", quitarInsumoDeFormula);
    document.getElementById("btn-crear-formula").addEventListener("click", crearFormula);
    document.getElementById("btn-eliminar-formula").addEventListener("click", eliminarFormula);
    cargarEditorFormula();

    // Ventas
    document.getElementById("venta-primera").addEventListener("input", calcularTotalVenta);
    document.getElementById("venta-segunda").addEventListener("input", calcularTotalVenta);
    document.getElementById("venta-promedio-kg-jaba").addEventListener("input", calcularTotalVenta);
    document.getElementById("venta-precio").addEventListener("input", calcularTotalVenta);
    document.getElementById("btn-guardar-venta").addEventListener("click", guardarVenta);

    // Dashboard
    document.getElementById("btn-cerrar-dia").addEventListener("click", cerrarDiaActual);

    // Accesibilidad
    document.getElementById("btn-text-small").addEventListener("click", () => cambiarTamanoTexto(-1));
    document.getElementById("btn-text-big").addEventListener("click", () => cambiarTamanoTexto(1));
    document.getElementById("btn-text-reset").addEventListener("click", resetTamanoTexto);

    if (datos.usuarioActual) {
        mostrarAplicacion();
    }
});
