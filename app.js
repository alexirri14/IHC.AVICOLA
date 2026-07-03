// API Helper
async function api(method, url, body) {
  const opts = { method, headers: {} };
  if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  try {
    const res = await fetch(url, opts);
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = (data && data.error) || `Error ${res.status}`;
      mostrarMensaje(msg, 'error');
      throw new Error(msg);
    }
    return data;
  } catch (err) {
    if (!(err instanceof Error) || !err.message.startsWith('Error'))
      mostrarMensaje('Error de conexión con el servidor', 'error');
    throw err;
  }
}

// State
let session = null;
let galponesCache = [];

// Utility
function $(id) { return document.getElementById(id); }
function numero(v) { return Number(v || 0); }
function hoy() { return new Date().toISOString().split('T')[0]; }
function escapeHTML(v) { return String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
function formatoJabas(v) { const n = numero(v); return Number.isInteger(n) ? String(n) : n.toFixed(1); }
function calcularPaquetesDesdeJabas(j) { return Math.round(numero(j) * 2); }
function esCantidadJabasValida(v) { const n = numero(v); return n >= 0 && Math.abs(n * 2 - Math.round(n * 2)) < 1e-6; }

function mostrarMensaje(texto, tipo) {
  const el = $('mensaje');
  if (!el) return;
  el.textContent = texto;
  el.className = 'mensaje ' + (tipo === 'error' ? 'error' : 'ok');
  setTimeout(() => { el.className = 'mensaje hidden'; }, 3500);
}

// Galpon helpers
async function cargarGalpones() {
  try { galponesCache = await api('GET', '/api/galpones') || []; } catch { galponesCache = []; }
  return galponesCache;
}

function opcionesGalponesHTML(galpones, incluirTodos) {
  const opts = (galpones || galponesCache).map(g =>
    `<option value="${g.id}">${escapeHTML(g.nombre)}</option>`
  ).join('');
  return incluirTodos ? '<option value="">Todos</option>' + opts : opts;
}

function nombreGalponPorId(id) {
  const g = (galponesCache || []).find(x => x.id === id);
  return g ? g.nombre : '';
}

// ==================== LOGIN ====================
async function iniciarSesion() {
  const usuario = ($('login-user')?.value || '').trim();
  const clave = ($('login-pass')?.value || '').trim();
  if (!usuario || !clave) { mostrarMensaje('Ingrese usuario y contraseña', 'error'); return; }
  try {
    const res = await api('POST', '/api/auth/login', { usuario, clave });
    if (res && res.usuario) {
      session = res.usuario;
      await cargarGalpones();
      mostrarAplicacion();
    } else {
      mostrarMensaje('Credenciales inválidas', 'error');
    }
  } catch { /* message shown by api helper */ }
}

function cerrarSesion() {
  session = null;
  galponesCache = [];
  const login = $('login-screen');
  const app = $('app');
  if (login) login.classList.remove('hidden');
  if (app) app.classList.add('hidden');
}

function mostrarAplicacion() {
  const login = $('login-screen');
  const app = $('app');
  if (login) login.classList.add('hidden');
  if (app) app.classList.remove('hidden');
  if (session && $('user-role')) $('user-role').textContent = session.rol || '';
  aplicarPermisos();
  poblarSelectores();
  actualizarTodo();
}

function aplicarPermisos() {
  const rol = session ? session.rol : '';
  const botones = [
    { id: 'btn-guardar-produccion', roles: ['Administrador', 'Producción'] },
    { id: 'btn-ingresar-insumo', roles: ['Administrador', 'Almacén'] },
    { id: 'btn-agregar-insumo', roles: ['Administrador'] },
    { id: 'btn-eliminar-insumo', roles: ['Administrador'] },
    { id: 'btn-consumir-alimento', roles: ['Administrador', 'Almacén'] },
    { id: 'btn-guardar-clases-segunda', roles: ['Administrador', 'Almacén'] },
    { id: 'btn-producir-molino', roles: ['Administrador', 'Almacén'] },
    { id: 'btn-guardar-formula-destino', roles: ['Administrador'] },
    { id: 'btn-agregar-formula-insumo', roles: ['Administrador'] },
    { id: 'btn-quitar-formula-insumo', roles: ['Administrador'] },
    { id: 'btn-crear-formula', roles: ['Administrador'] },
    { id: 'btn-eliminar-formula', roles: ['Administrador'] },
    { id: 'btn-guardar-venta', roles: ['Administrador', 'Ventas'] },
    { id: 'btn-admin-agregar-galpon', roles: ['Administrador'] },
    { id: 'btn-admin-cargar-galpon', roles: ['Administrador'] },
    { id: 'btn-admin-guardar-galpon', roles: ['Administrador'] },
    { id: 'btn-admin-eliminar-galpon', roles: ['Administrador'] },
    { id: 'btn-guardar-cliente', roles: ['Administrador'] },
    { id: 'btn-guardar-proveedor', roles: ['Administrador'] },
    { id: 'btn-guardar-empleado', roles: ['Administrador'] },
    { id: 'btn-guardar-compra', roles: ['Administrador', 'Almacén'] },
  ];
  botones.forEach(b => {
    const el = $(b.id);
    if (el) {
      const allowed = b.roles.includes(rol);
      el.disabled = !allowed;
      el.title = allowed ? '' : 'No tiene permiso';
    }
  });
  const adminBtn = document.querySelector('.nav-btn[data-tab="admin"]');
  if (adminBtn) adminBtn.style.display = rol === 'Administrador' ? '' : 'none';
}

// ==================== NAVEGACIÓN ====================
function cambiarTab(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
  const btn = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
  const sec = $(`tab-${tab}`);
  if (btn) btn.classList.add('active');
  if (sec) sec.classList.add('active');
}

// ==================== SELECTORES ====================
async function poblarSelectores() {
  await cargarGalpones();
  const galpones = galponesCache;

  const selectsGalpon = ['prod-galpon', 'filtro-prod-galpon', 'molino-galpon', 'consumo-galpon',
    'admin-galpon-editar-select', 'admin-galpon-eliminar', 'rendimiento-galpon'];
  selectsGalpon.forEach(id => {
    const el = $(id);
    if (el) {
      const incluirTodos = id === 'filtro-prod-galpon';
      el.innerHTML = opcionesGalponesHTML(galpones, incluirTodos);
    }
  });

  // Clientes
  try {
    const clientes = await api('GET', '/api/clientes');
    const selCliente = $('venta-cliente-select');
    if (selCliente) {
      selCliente.innerHTML = '<option value="">-- Seleccione --</option>' +
        (clientes || []).map(c => `<option value="${c.id}" data-nombre="${escapeHTML(c.nombre)}">${escapeHTML(c.nombre)}</option>`).join('');
    }
  } catch {}

  // Proveedores
  try {
    const proveedores = await api('GET', '/api/proveedores');
    const selProv = $('compra-proveedor');
    if (selProv) {
      selProv.innerHTML = '<option value="">-- Seleccione --</option>' +
        (proveedores || []).map(p => `<option value="${p.id}" data-nombre="${escapeHTML(p.nombre)}">${escapeHTML(p.nombre)}</option>`).join('');
    }
  } catch {}

  // Insumos
  try {
    const insumos = await api('GET', '/api/insumos');
    const selectsInsumo = ['insumo-nombre', 'edit-formula-insumo', 'admin-insumo-eliminar', 'compra-insumo'];
    selectsInsumo.forEach(id => {
      const el = $(id);
      if (el) {
        el.innerHTML = (insumos || []).map(i =>
          `<option value="${i.id}" data-nombre="${escapeHTML(i.nombre)}" data-etiqueta="${escapeHTML(i.etiqueta || '')}">${escapeHTML(i.nombre)} (${escapeHTML(i.etiqueta || i.unidad_compra || '')})</option>`
        ).join('');
      }
    });
  } catch {}

  // Fórmulas
  try {
    const formulas = await api('GET', '/api/molino/formulas');
    const selFormula = $('edit-formula');
    if (selFormula) {
      selFormula.innerHTML = (formulas || []).map(f =>
        `<option value="${f.id}" data-nombre="${escapeHTML(f.nombre)}">${escapeHTML(f.nombre)}</option>`
      ).join('');
    }
  } catch {}
}

// ==================== DASHBOARD ====================
async function actualizarDashboard() {
  try {
    const d = await api('GET', '/api/reportes/dashboard');
    if (!d) return;
    if ($('dash-produccion-hoy')) $('dash-produccion-hoy').textContent = (d.produccion_hoy || 0) + ' jabas';
    if ($('dash-stock-jabas')) $('dash-stock-jabas').textContent = (d.stock_huevos || 0) + ' jabas';
    if ($('dash-ventas-hoy')) $('dash-ventas-hoy').textContent = 'S/ ' + (d.ventas_hoy || 0).toFixed(2);
    if ($('dash-stock-alimento')) $('dash-stock-alimento').textContent = (d.stock_alimento_sacos || 0) + ' sacos';
  } catch {}

  // Alertas
  try {
    const alertas = await api('GET', '/api/alertas/generar');
    const cont = $('dashboard-alertas');
    if (cont) {
      if (!alertas || alertas.length === 0) {
        cont.innerHTML = '<div class="alert ok">Sin alertas por el momento.</div>';
      } else {
        cont.innerHTML = alertas.map(a =>
          `<div class="alert danger">${escapeHTML(a.mensaje || a.titulo || '')}</div>`
        ).join('');
      }
    }
  } catch {}
}

// ==================== PRODUCCIÓN ====================
async function guardarProduccion() {
  const fecha = $('prod-fecha')?.value;
  const galponId = Number($('prod-galpon')?.value);
  const primera = numero($('prod-jabas-primera')?.value);
  const segunda = numero($('prod-jabas-segunda')?.value);
  const muertas = numero($('prod-muertas')?.value);

  if (!fecha) { mostrarMensaje('Seleccione la fecha', 'error'); return; }
  if (!galponId) { mostrarMensaje('Seleccione un galpón', 'error'); return; }
  if (primera < 0 || segunda < 0 || muertas < 0) { mostrarMensaje('Las cantidades no pueden ser negativas', 'error'); return; }
  if (!esCantidadJabasValida(primera) || !esCantidadJabasValida(segunda)) { mostrarMensaje('Solo se aceptan jabas enteras o medias jabas', 'error'); return; }
  if (primera + segunda <= 0) { mostrarMensaje('Ingrese jabas de primera o segunda', 'error'); return; }

  try {
    await api('POST', '/api/produccion', { fecha, galpon_id: galponId, primera, segunda, muertas });
    mostrarMensaje('Producción registrada correctamente');
    $('prod-jabas-primera').value = '0';
    $('prod-jabas-segunda').value = '0';
    $('prod-muertas').value = '0';
    actualizarPaquetesProduccion();
    actualizarTablaProduccion();
    actualizarDashboard();
  } catch {}
}

async function eliminarProduccion(id) {
  if (!confirm('¿Eliminar esta producción?')) return;
  try {
    await api('DELETE', '/api/produccion/' + id);
    mostrarMensaje('Producción eliminada');
    actualizarTablaProduccion();
    actualizarDashboard();
  } catch {}
}

async function actualizarTablaProduccion() {
  const fecha = $('filtro-prod-fecha')?.value;
  const galponId = $('filtro-prod-galpon')?.value;
  const params = new URLSearchParams();
  if (fecha) params.set('fecha', fecha);
  if (galponId) params.set('galpon_id', galponId);
  try {
    const lista = await api('GET', '/api/produccion?' + params.toString()) || [];
    const tbody = $('tabla-produccion');
    if (!tbody) return;
    if (lista.length === 0) {
      tbody.innerHTML = '<tr><td colspan="9">Sin registros</td></tr>';
      return;
    }
    tbody.innerHTML = lista.map(p => {
      const jabas = numero(p.primera) + numero(p.segunda);
      const paq = calcularPaquetesDesdeJabas(jabas);
      return `<tr>
        <td>${p.fecha}</td>
        <td>${escapeHTML(p.galpon_nombre || nombreGalponPorId(p.galpon_id))}</td>
        <td>${formatoJabas(p.primera)}</td>
        <td>${formatoJabas(p.segunda)}</td>
        <td>${formatoJabas(jabas)}</td>
        <td>${paq}</td>
        <td>${numero(p.muertas)}</td>
        <td>${p.gallinas_restantes ?? '-'}</td>
        <td><button class="btn btn-danger" onclick="eliminarProduccion(${p.id})">Eliminar</button></td>
      </tr>`;
    }).join('');
  } catch {}
}

function filtrarProduccion() { actualizarTablaProduccion(); }
function limpiarFiltroProduccion() {
  if ($('filtro-prod-fecha')) $('filtro-prod-fecha').value = '';
  if ($('filtro-prod-galpon')) $('filtro-prod-galpon').value = '';
  actualizarTablaProduccion();
}

function actualizarPaquetesProduccion() {
  const p = numero($('prod-jabas-primera')?.value) + numero($('prod-jabas-segunda')?.value);
  const el = $('prod-total-paquetes');
  if (el) el.value = calcularPaquetesDesdeJabas(p);
}

// ==================== ALMACÉN HUEVOS ====================
async function actualizarAlmacenHuevos() {
  try {
    const stock = await api('GET', '/api/almacen/stock');
    if (stock) {
      const total = numero(stock.total);
      if ($('almacen-stock-jabas')) $('almacen-stock-jabas').textContent = formatoJabas(total) + ' jabas';
      if ($('almacen-stock-primera')) $('almacen-stock-primera').textContent = formatoJabas(stock.primera || 0) + ' jabas';
      if ($('almacen-stock-segunda')) $('almacen-stock-segunda').textContent = formatoJabas(stock.segunda || 0) + ' jabas';
      // También actualiza los del módulo de ventas
      if ($('ventas-stock-total')) $('ventas-stock-total').textContent = formatoJabas(total) + ' jabas';
      if ($('ventas-stock-primera')) $('ventas-stock-primera').textContent = formatoJabas(stock.primera || 0) + ' jabas';
      if ($('ventas-stock-segunda')) $('ventas-stock-segunda').textContent = formatoJabas(stock.segunda || 0) + ' jabas';
    }
  } catch {}
}

async function actualizarMovimientosHuevos() {
  try {
    const movs = await api('GET', '/api/almacen/movimientos') || [];
    const tbody = $('tabla-almacen-huevos');
    if (!tbody) return;
    tbody.innerHTML = movs.map(m => `<tr>
      <td>${m.fecha}</td>
      <td>${escapeHTML(m.tipo)}</td>
      <td>${escapeHTML(m.detalle)}</td>
      <td>${formatoJabas(m.primera)}</td>
      <td>${formatoJabas(m.segunda)}</td>
      <td>${formatoJabas(m.total)}</td>
    </tr>`).join('') || '<tr><td colspan="6">Sin movimientos</td></tr>';
  } catch {}
}

// Clasificación segunda (client-side, no API)
const CLASES_SEGUNDA = [
  { key: 'pardo', nombre: 'Pardo' },
  { key: 'jumbo', nombre: 'Jumbo' },
  { key: 'suciote', nombre: 'Suciote' },
  { key: 'limpieza', nombre: 'Para limpieza' },
  { key: 'quinados', nombre: 'Quiñados' }
];
let clasesSegundaCache = {};
CLASES_SEGUNDA.forEach(c => clasesSegundaCache[c.key] = 0);

function guardarClasificacionSegunda() {
  CLASES_SEGUNDA.forEach(c => {
    const input = $('segunda-' + c.key);
    if (input) clasesSegundaCache[c.key] = Math.max(0, numero(input.value));
  });
  mostrarMensaje('Clasificación guardada localmente');
  actualizarClasesSegunda();
}

function actualizarClasesSegunda() {
  const cards = $('cards-clases-segunda');
  if (cards) {
    const total = CLASES_SEGUNDA.reduce((s, c) => s + numero(clasesSegundaCache[c.key]), 0);
    cards.innerHTML = CLASES_SEGUNDA.map(c =>
      `<div class="card mini-card">
        <span>${c.nombre}</span>
        <strong>${formatoJabas(clasesSegundaCache[c.key])}</strong>
      </div>`
    ).join('') +
      `<div class="card mini-card card-total">
        <span>Total clasificado</span>
        <strong>${formatoJabas(total)}</strong>
      </div>`;
  }
  CLASES_SEGUNDA.forEach(c => {
    const input = $('segunda-' + c.key);
    if (input) input.value = numero(clasesSegundaCache[c.key]);
  });
}

// ==================== ALMACÉN INSUMOS ====================
async function actualizarInsumos() {
  try {
    const insumos = await api('GET', '/api/insumos') || [];
    const tbody = $('tabla-insumos');
    if (tbody) {
      tbody.innerHTML = insumos.map(i => {
        const kg = numero(i.cantidad_kg);
        const minimo = numero(i.stock_minimo_kg) || (numero(i.kg_por_unidad) || 50);
        const estado = kg <= minimo ? 'Crítico' : (kg <= minimo * 2 ? 'Próximo a agotarse' : 'Correcto');
        const claseEstado = kg <= minimo ? 'estado-critico' : (kg <= minimo * 2 ? 'estado-advertencia' : 'estado-correcto');
        const pct = Math.max(0, Math.min(100, (kg / (minimo * 4)) * 100));
        const lectura = kg <= minimo ? 'Reponer de inmediato' : (kg <= minimo * 2 ? 'Planificar compra' : 'Stock suficiente');
        const etiqueta = i.etiqueta || i.unidad_compra || '';
        return `<tr>
          <td><span class="estado-stock ${claseEstado}">${estado}</span></td>
          <td><strong>${escapeHTML(i.nombre)}</strong></td>
          <td>${escapeHTML(etiqueta)}</td>
          <td>${kg.toFixed(2)}</td>
          <td>${kg.toFixed(2)} kg</td>
          <td>${minimo.toFixed(2)} kg</td>
          <td>
            <div class="stock-lectura">
              <span>${lectura}</span>
              <div class="barra-stock"><div style="width:${pct.toFixed(0)}%"></div></div>
            </div>
          </td>
        </tr>`;
      }).join('') || '<tr><td colspan="7">Sin insumos</td></tr>';
    }
    const totalKg = insumos.reduce((s, i) => s + numero(i.cantidad_kg), 0);
    if ($('stock-insumos-total')) $('stock-insumos-total').textContent = totalKg.toFixed(0) + ' kg';
  } catch {}
}

async function ingresarInsumo() {
  const sel = $('insumo-nombre');
  if (!sel) return;
  const insumoId = Number(sel.value);
  const cantidad = numero($('insumo-kg')?.value);
  if (!insumoId) { mostrarMensaje('Seleccione un insumo', 'error'); return; }
  if (cantidad <= 0) { mostrarMensaje('Ingrese una cantidad válida', 'error'); return; }
  try {
    await api('PUT', '/api/insumos/' + insumoId + '/ingreso', { cantidad_kg: cantidad });
    mostrarMensaje('Ingreso registrado');
    $('insumo-kg').value = '';
    actualizarInsumos();
    actualizarAlimentoBalanceado();
    actualizarMovimientosAlimento();
  } catch {}
}

// ==================== ALIMENTO BALANCEADO ====================
async function actualizarAlimentoBalanceado() {
  try {
    const data = await api('GET', '/api/molino/alimento') || [];
    const tbody = $('tabla-balanceado');
    if (tbody) {
      tbody.innerHTML = data.map(a => {
        const kg = numero(a.kg);
        const sacosVal = kg / 50;
        const estado = sacosVal < 5 ? '<span class="estado-stock estado-critico">Bajo mínimo</span>' : '<span class="estado-stock estado-correcto">Correcto</span>';
        return `<tr>
          <td>${escapeHTML(a.galpon_nombre || '')}</td>
          <td>${sacosVal.toFixed(2)} sacos</td>
          <td>${kg.toFixed(2)} kg</td>
          <td>${estado}</td>
        </tr>`;
      }).join('') || '<tr><td colspan="4">Sin datos</td></tr>';
    }
    const totalKg = data.reduce((s, a) => s + numero(a.kg), 0);
    if ($('stock-balanceado-total')) $('stock-balanceado-total').textContent = (totalKg / 50).toFixed(0) + ' sacos';
  } catch {}
}

async function actualizarMovimientosAlimento() {
  try {
    const movs = await api('GET', '/api/molino/movimientos') || [];
    const tbody = $('tabla-alimento-mov');
    if (!tbody) return;
    tbody.innerHTML = movs.map(m => `<tr>
      <td>${m.fecha}</td>
      <td>${escapeHTML(m.tipo)}</td>
      <td>${escapeHTML(m.detalle)}</td>
      <td>${escapeHTML(m.cantidad || '')}</td>
    </tr>`).join('') || '<tr><td colspan="4">Sin movimientos</td></tr>';
  } catch {}
}

async function consumirAlimento() {
  const sel = $('consumo-galpon');
  if (!sel) return;
  const galponId = Number(sel.value);
  const sacos = numero($('consumo-kg')?.value);
  if (!galponId) { mostrarMensaje('Seleccione un galpón', 'error'); return; }
  if (sacos <= 0) { mostrarMensaje('Ingrese la cantidad de sacos', 'error'); return; }
  try {
    await api('POST', '/api/molino/alimento/consumir', { galpon_id: galponId, sacos, fecha: hoy() });
    mostrarMensaje('Consumo registrado');
    $('consumo-kg').value = '';
    actualizarAlimentoBalanceado();
    actualizarMovimientosAlimento();
    actualizarDashboard();
  } catch {}
}

// ==================== MOLINO ====================
let formulaPreviewData = null;

async function cargarFormulasMolino() {
  try {
    return await api('GET', '/api/molino/formulas') || [];
  } catch { return []; }
}

async function actualizarFormulaMolinoPorGalpon() {
  const selGalpon = $('molino-galpon');
  const inputFormula = $('molino-formula-actual');
  const preview = $('formula-preview');
  if (!selGalpon || !inputFormula) return '';
  const galponId = Number(selGalpon.value);
  if (!galponId) {
    inputFormula.value = 'Seleccione un galpón';
    if (preview) preview.innerHTML = '';
    return '';
  }
  const formulas = await cargarFormulasMolino();
  const formula = (formulas || []).find(f => Number(f.galpon_id) === galponId);
  if (formula) {
    inputFormula.value = formula.nombre || '';
    if (preview) preview.innerHTML = `<p>Fórmula: <strong>${escapeHTML(formula.nombre)}</strong> (${escapeHTML(formula.galpon_nombre || '')})</p>`;
    formulaPreviewData = formula;
    return formula;
  } else {
    inputFormula.value = 'Sin fórmula registrada';
    if (preview) preview.innerHTML = `<p class="texto-error">No hay fórmula para este galpón. Créela en Administrador.</p>`;
    formulaPreviewData = null;
    return null;
  }
}

function verFormulaMolino() {
  const preview = $('formula-preview');
  const tandas = numero($('molino-kg')?.value);
  if (!formulaPreviewData) {
    if (preview) preview.innerHTML = '<p class="texto-error">No hay fórmula seleccionada</p>';
    return;
  }
  if (tandas <= 0) {
    if (preview) preview.innerHTML = '<p>Ingrese el número de tandas</p>';
    return;
  }
  const insumos = formulaPreviewData.insumos || [];
  const totalKg = insumos.reduce((s, i) => s + numero(i.kg_por_tanda), 0) * tandas;
  const sacosProducidos = tandas * 30;
  let html = `<div class="formula-resumen">
    <strong>${escapeHTML(formulaPreviewData.nombre)}</strong>
    <span>${tandas} tanda(s) = ${sacosProducidos} sacos de 50 kg = ${totalKg.toFixed(2)} kg producidos</span>
  </div>`;
  html += insumos.map(i => {
    const usado = numero(i.kg_por_tanda) * tandas;
    return `<div class="formula-item">
      <strong>${escapeHTML(i.insumo_nombre || '')}</strong>
      <span>${usado.toFixed(2)} kg usados</span>
    </div>`;
  }).join('');
  if (preview) preview.innerHTML = html;
}

async function producirMolino() {
  const fecha = $('molino-fecha')?.value;
  const selGalpon = $('molino-galpon');
  const tandas = numero($('molino-kg')?.value);
  if (!fecha) { mostrarMensaje('Seleccione la fecha', 'error'); return; }
  if (!selGalpon || !selGalpon.value) { mostrarMensaje('Seleccione un galpón', 'error'); return; }
  if (tandas <= 0) { mostrarMensaje('Ingrese tandas válidas', 'error'); return; }
  if (!formulaPreviewData || !formulaPreviewData.id) { mostrarMensaje('El galpón no tiene fórmula', 'error'); return; }
  try {
    await api('POST', '/api/molino/producir', { fecha, formula_id: formulaPreviewData.id, tandas });
    mostrarMensaje('Producción de alimento registrada');
    $('molino-kg').value = '';
    $('formula-preview').innerHTML = '';
    actualizarTablaMolino();
    actualizarAlimentoBalanceado();
    actualizarMovimientosAlimento();
    actualizarDashboard();
  } catch {}
}

async function actualizarTablaMolino() {
  try {
    const lista = await api('GET', '/api/molino/produccion') || [];
    const tbody = $('tabla-molino');
    if (!tbody) return;
    tbody.innerHTML = lista.map(m => `<tr>
      <td>${m.fecha}</td>
      <td>${escapeHTML(m.galpon_nombre || m.destino || '')}</td>
      <td>${m.tandas || 1}</td>
      <td>${m.sacos || (numero(m.kg) / 50).toFixed(0)} sacos</td>
      <td>${numero(m.kg).toFixed(2)} kg</td>
      <td><button class="btn btn-secondary" onclick="verDetalleMolino(${m.id})">Detalle</button></td>
    </tr>`).join('') || '<tr><td colspan="6">Sin producción</td></tr>';
  } catch {}
}

async function verDetalleMolino(id) {
  try {
    const data = await api('GET', '/api/molino/produccion/' + id + '/detalle');
    const cont = $('voucher-molino');
    if (!cont || !data) return;
    const p = data.produccion || {};
    const detalle = data.detalle || [];
    const filas = detalle.map(d => `<tr>
      <td>${escapeHTML(d.insumo_nombre || '')}</td>
      <td>${numero(d.kg_usado).toFixed(2)} kg</td>
      <td>${numero(d.stock_restante).toFixed(2)} kg</td>
    </tr>`).join('');
    cont.classList.remove('hidden');
    cont.innerHTML = `<div class="voucher-header">
      <div>
        <h3>Voucher de producción del molino</h3>
        <p><strong>Fecha:</strong> ${escapeHTML(p.fecha)} | <strong>Destino:</strong> ${escapeHTML(p.galpon_nombre || p.destino || '')}</p>
        <p><strong>Fórmula:</strong> ${escapeHTML(p.formula_nombre || '')} | <strong>Tandas:</strong> ${p.tandas || ''}</p>
        <p><strong>Producción:</strong> ${p.sacos || ''} sacos (${numero(p.kg).toFixed(2)} kg)</p>
      </div>
      <button class="btn btn-light" onclick="cerrarDetalleMolino()">Cerrar</button>
    </div>
    <div class="table-box voucher-tabla">
      <table><thead><tr><th>Insumo</th><th>Usado</th><th>Stock restante</th></tr></thead>
      <tbody>${filas || '<tr><td colspan="3">Sin detalle</td></tr>'}</tbody></table>
    </div>`;
    cont.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch {}
}

function cerrarDetalleMolino() {
  const cont = $('voucher-molino');
  if (cont) { cont.classList.add('hidden'); cont.innerHTML = ''; }
}

// ==================== VENTAS ====================
function calcularTotalVenta() {
  const primera = numero($('venta-primera')?.value);
  const segunda = numero($('venta-segunda')?.value);
  const prom = numero($('venta-promedio-kg-jaba')?.value);
  const pp = numero($('venta-precio-primera')?.value);
  const ps = numero($('venta-precio-segunda')?.value);
  const totalJabas = primera + segunda;
  const pesoPrimera = primera * prom;
  const pesoSegunda = segunda * prom;
  const peso = pesoPrimera + pesoSegunda;
  const totalPrimera = pesoPrimera * pp;
  const totalSegunda = pesoSegunda * ps;
  const total = totalPrimera + totalSegunda;
  if ($('venta-total-jabas')) $('venta-total-jabas').value = formatoJabas(totalJabas);
  if ($('venta-peso')) $('venta-peso').value = peso.toFixed(2);
  const el = $('venta-total');
  if (el) {
    el.innerHTML = `Total: S/ ${total.toFixed(2)} <small class="total-detalle">Primera: S/ ${totalPrimera.toFixed(2)} | Segunda: S/ ${totalSegunda.toFixed(2)}</small>`;
  }
}

async function guardarVenta() {
  const clienteSelect = $('venta-cliente-select');
  const clienteNombreInput = $('venta-cliente');
  let clienteId = null;
  let clienteNombre = '';
  if (clienteSelect && clienteSelect.value) {
    clienteId = Number(clienteSelect.value);
    const opt = clienteSelect.options[clienteSelect.selectedIndex];
    if (opt) clienteNombre = opt.dataset.nombre || opt.text;
  } else if (clienteNombreInput) {
    clienteNombre = clienteNombreInput.value.trim();
  }
  const fecha = $('venta-fecha')?.value;
  const primera = numero($('venta-primera')?.value);
  const segunda = numero($('venta-segunda')?.value);
  const prom = numero($('venta-promedio-kg-jaba')?.value);
  const pp = numero($('venta-precio-primera')?.value);
  const ps = numero($('venta-precio-segunda')?.value);

  if (!fecha) { mostrarMensaje('Seleccione la fecha', 'error'); return; }
  if (!clienteNombre) { mostrarMensaje('Ingrese o seleccione el cliente', 'error'); return; }
  if (primera + segunda <= 0) { mostrarMensaje('Ingrese jabas de primera o segunda', 'error'); return; }
  if (!esCantidadJabasValida(primera) || !esCantidadJabasValida(segunda)) { mostrarMensaje('Solo jabas enteras o medias jabas', 'error'); return; }
  if (prom <= 0 || pp <= 0 || ps <= 0) { mostrarMensaje('Complete precio y promedio', 'error'); return; }

  try {
    await api('POST', '/api/ventas', { fecha, cliente_id: clienteId, cliente_nombre: clienteNombre, primera, segunda, promedio_kg_jaba: prom, precio_primera: pp, precio_segunda: ps });
    mostrarMensaje('Venta registrada');
    if ($('venta-cliente')) $('venta-cliente').value = '';
    if ($('venta-cliente-select')) $('venta-cliente-select').value = '';
    $('venta-primera').value = 0;
    $('venta-segunda').value = 0;
    $('venta-promedio-kg-jaba').value = 18;
    $('venta-precio-primera').value = '6.00';
    $('venta-precio-segunda').value = '5.00';
    calcularTotalVenta();
    actualizarTablaVentas();
    actualizarAlmacenHuevos();
    actualizarDashboard();
  } catch {}
}

async function eliminarVenta(id) {
  if (!confirm('¿Eliminar esta venta?')) return;
  try {
    await api('DELETE', '/api/ventas/' + id);
    mostrarMensaje('Venta eliminada');
    actualizarTablaVentas();
    actualizarAlmacenHuevos();
    actualizarDashboard();
  } catch {}
}

async function actualizarTablaVentas() {
  await actualizarAlmacenHuevos();
  try {
    const lista = await api('GET', '/api/ventas') || [];
    const tbody = $('tabla-ventas');
    if (!tbody) return;
    tbody.innerHTML = lista.map(v => `<tr>
      <td>${v.fecha}</td>
      <td>${escapeHTML(v.cliente_nombre || '')}</td>
      <td>${formatoJabas(v.primera)}</td>
      <td>${formatoJabas(v.segunda)}</td>
      <td>${formatoJabas(numero(v.primera) + numero(v.segunda))}</td>
      <td>${numero(v.promedio_kg_jaba).toFixed(2)} kg</td>
      <td>${(numero(v.primera) * numero(v.promedio_kg_jaba) + numero(v.segunda) * numero(v.promedio_kg_jaba)).toFixed(2)} kg</td>
      <td>S/ ${numero(v.precio_primera).toFixed(2)}</td>
      <td>S/ ${numero(v.precio_segunda).toFixed(2)}</td>
      <td>S/ ${(numero(v.primera) * numero(v.promedio_kg_jaba) * numero(v.precio_primera)).toFixed(2)}</td>
      <td>S/ ${(numero(v.segunda) * numero(v.promedio_kg_jaba) * numero(v.precio_segunda)).toFixed(2)}</td>
      <td>S/ ${(numero(v.primera) * numero(v.promedio_kg_jaba) * numero(v.precio_primera) + numero(v.segunda) * numero(v.promedio_kg_jaba) * numero(v.precio_segunda)).toFixed(2)}</td>
      <td><button class="btn btn-danger" onclick="eliminarVenta(${v.id})">Eliminar</button></td>
    </tr>`).join('') || '<tr><td colspan="13">Sin ventas</td></tr>';
  } catch {}
}

// ==================== CLIENTES (CRUD dinámico) ====================
async function cargarClientes() {
  try { return await api('GET', '/api/clientes') || []; } catch { return []; }
}

async function guardarCliente() {
  const id = $('cliente-id')?.value;
  const data = {
    nombre: ($('cliente-nombre')?.value || '').trim(),
    telefono: ($('cliente-telefono')?.value || '').trim(),
    direccion: ($('cliente-direccion')?.value || '').trim(),
    email: ($('cliente-email')?.value || '').trim(),
    ruc: ($('cliente-ruc')?.value || '').trim()
  };
  if (!data.nombre) { mostrarMensaje('Ingrese el nombre', 'error'); return; }
  try {
    if (id) {
      await api('PUT', '/api/clientes/' + id, data);
      mostrarMensaje('Cliente actualizado');
    } else {
      await api('POST', '/api/clientes', data);
      mostrarMensaje('Cliente creado');
    }
    limpiarFormCliente();
    actualizarTablaClientes();
    poblarSelectores();
  } catch {}
}

async function eliminarCliente(id) {
  if (!confirm('¿Eliminar este cliente?')) return;
  try {
    await api('DELETE', '/api/clientes/' + id);
    mostrarMensaje('Cliente eliminado');
    actualizarTablaClientes();
    poblarSelectores();
  } catch {}
}

function editarCliente(c) {
  if ($('cliente-id')) $('cliente-id').value = c.id;
  if ($('cliente-nombre')) $('cliente-nombre').value = c.nombre || '';
  if ($('cliente-telefono')) $('cliente-telefono').value = c.telefono || '';
  if ($('cliente-direccion')) $('cliente-direccion').value = c.direccion || '';
  if ($('cliente-email')) $('cliente-email').value = c.email || '';
  if ($('cliente-ruc')) $('cliente-ruc').value = c.ruc || '';
}

function limpiarFormCliente() {
  ['cliente-id','cliente-nombre','cliente-telefono','cliente-direccion','cliente-email','cliente-ruc'].forEach(id => {
    if ($(id)) $(id).value = '';
  });
}

async function actualizarTablaClientes() {
  const lista = await cargarClientes();
  const tbody = $('tabla-clientes');
  if (!tbody) return;
  tbody.innerHTML = lista.map(c => `<tr>
    <td>${escapeHTML(c.nombre)}</td>
    <td>${escapeHTML(c.telefono || '')}</td>
    <td>${escapeHTML(c.direccion || '')}</td>
    <td>${escapeHTML(c.email || '')}</td>
    <td>${escapeHTML(c.ruc || '')}</td>
    <td class="table-actions">
      <button class="btn btn-secondary" onclick='editarCliente(${JSON.stringify(c).replace(/'/g, "&#39;")});editarCliente(${JSON.stringify(c).replace(/'/g, "&#39;")})'>Editar</button>
      <button class="btn btn-danger" onclick="eliminarCliente(${c.id})">Eliminar</button>
    </td>
  </tr>`).join('') || '<tr><td colspan="6">Sin clientes</td></tr>';
}

// ==================== PROVEEDORES (CRUD dinámico) ====================
async function cargarProveedores() {
  try { return await api('GET', '/api/proveedores') || []; } catch { return []; }
}

async function guardarProveedor() {
  const id = $('proveedor-id')?.value;
  const data = {
    nombre: ($('proveedor-nombre')?.value || '').trim(),
    telefono: ($('proveedor-telefono')?.value || '').trim(),
    direccion: ($('proveedor-direccion')?.value || '').trim(),
    email: ($('proveedor-email')?.value || '').trim(),
    ruc: ($('proveedor-ruc')?.value || '').trim()
  };
  if (!data.nombre) { mostrarMensaje('Ingrese el nombre', 'error'); return; }
  try {
    if (id) {
      await api('PUT', '/api/proveedores/' + id, data);
      mostrarMensaje('Proveedor actualizado');
    } else {
      await api('POST', '/api/proveedores', data);
      mostrarMensaje('Proveedor creado');
    }
    limpiarFormProveedor();
    actualizarTablaProveedores();
    poblarSelectores();
  } catch {}
}

async function eliminarProveedor(id) {
  if (!confirm('¿Eliminar este proveedor?')) return;
  try {
    await api('DELETE', '/api/proveedores/' + id);
    mostrarMensaje('Proveedor eliminado');
    actualizarTablaProveedores();
    poblarSelectores();
  } catch {}
}

function editarProveedor(p) {
  if ($('proveedor-id')) $('proveedor-id').value = p.id;
  if ($('proveedor-nombre')) $('proveedor-nombre').value = p.nombre || '';
  if ($('proveedor-telefono')) $('proveedor-telefono').value = p.telefono || '';
  if ($('proveedor-direccion')) $('proveedor-direccion').value = p.direccion || '';
  if ($('proveedor-email')) $('proveedor-email').value = p.email || '';
  if ($('proveedor-ruc')) $('proveedor-ruc').value = p.ruc || '';
}

function limpiarFormProveedor() {
  ['proveedor-id','proveedor-nombre','proveedor-telefono','proveedor-direccion','proveedor-email','proveedor-ruc'].forEach(id => {
    if ($(id)) $(id).value = '';
  });
}

async function actualizarTablaProveedores() {
  const lista = await cargarProveedores();
  const tbody = $('tabla-proveedores');
  if (!tbody) return;
  tbody.innerHTML = lista.map(p => `<tr>
    <td>${escapeHTML(p.nombre)}</td>
    <td>${escapeHTML(p.telefono || '')}</td>
    <td>${escapeHTML(p.direccion || '')}</td>
    <td>${escapeHTML(p.email || '')}</td>
    <td>${escapeHTML(p.ruc || '')}</td>
    <td class="table-actions">
      <button class="btn btn-secondary" onclick='editarProveedor(${JSON.stringify(p).replace(/'/g, "&#39;")})'>Editar</button>
      <button class="btn btn-danger" onclick="eliminarProveedor(${p.id})">Eliminar</button>
    </td>
  </tr>`).join('') || '<tr><td colspan="6">Sin proveedores</td></tr>';
}

// ==================== COMPRAS ====================
async function guardarCompra() {
  const fecha = $('compra-fecha')?.value;
  const provSel = $('compra-proveedor');
  const insumoSel = $('compra-insumo');
  const cantidad = numero($('compra-cantidad')?.value);
  const precio = numero($('compra-precio')?.value);
  const estado = $('compra-estado')?.value || 'pendiente';
  if (!fecha) { mostrarMensaje('Seleccione la fecha', 'error'); return; }
  if (!provSel || !provSel.value) { mostrarMensaje('Seleccione un proveedor', 'error'); return; }
  if (!insumoSel || !insumoSel.value) { mostrarMensaje('Seleccione un insumo', 'error'); return; }
  if (cantidad <= 0 || precio <= 0) { mostrarMensaje('Ingrese cantidad y precio válidos', 'error'); return; }
  const provId = Number(provSel.value);
  const provNombre = provSel.options[provSel.selectedIndex]?.dataset?.nombre || provSel.options[provSel.selectedIndex]?.text || '';
  const insumoId = Number(insumoSel.value);
  const insumoNombre = insumoSel.options[insumoSel.selectedIndex]?.dataset?.nombre || insumoSel.options[insumoSel.selectedIndex]?.text || '';
  try {
    await api('POST', '/api/compras', { fecha, proveedor_id: provId, proveedor_nombre: provNombre, insumo_id: insumoId, insumo_nombre: insumoNombre, cantidad, unidad: 'kg', precio_unitario: precio, estado });
    mostrarMensaje('Compra registrada');
    $('compra-cantidad').value = '';
    $('compra-precio').value = '';
    if ($('compra-estado')) $('compra-estado').value = 'pendiente';
    actualizarTablaCompras();
  } catch {}
}

async function actualizarEstadoCompra(id, estado) {
  try {
    await api('PUT', '/api/compras/' + id, { estado });
    mostrarMensaje('Estado actualizado');
    actualizarTablaCompras();
  } catch {}
}

async function eliminarCompra(id) {
  if (!confirm('¿Eliminar esta compra?')) return;
  try {
    await api('DELETE', '/api/compras/' + id);
    mostrarMensaje('Compra eliminada');
    actualizarTablaCompras();
  } catch {}
}

async function actualizarTablaCompras() {
  try {
    const lista = await api('GET', '/api/compras?estado=') || [];
    const tbody = $('tabla-compras');
    if (!tbody) return;
    tbody.innerHTML = lista.map(c => `<tr>
      <td>${c.fecha}</td>
      <td>${escapeHTML(c.proveedor_nombre || '')}</td>
      <td>${escapeHTML(c.insumo_nombre || '')}</td>
      <td>${numero(c.cantidad).toFixed(2)} ${escapeHTML(c.unidad || 'kg')}</td>
      <td>S/ ${numero(c.precio_unitario).toFixed(2)}</td>
      <td>S/ ${(numero(c.cantidad) * numero(c.precio_unitario)).toFixed(2)}</td>
      <td><span class="estado-stock ${c.estado === 'recibido' ? 'estado-correcto' : 'estado-advertencia'}">${escapeHTML(c.estado || 'pendiente')}</span></td>
      <td class="table-actions">
        ${c.estado !== 'recibido' ? `<button class="btn btn-primary" onclick="actualizarEstadoCompra(${c.id},'recibido')">Recibir</button>` : ''}
        <button class="btn btn-danger" onclick="eliminarCompra(${c.id})">Eliminar</button>
      </td>
    </tr>`).join('') || '<tr><td colspan="8">Sin compras</td></tr>';
  } catch {}
}

// ==================== EMPLEADOS (CRUD dinámico) ====================
async function cargarEmpleados() {
  try { return await api('GET', '/api/empleados') || []; } catch { return []; }
}

async function guardarEmpleado() {
  const id = $('empleado-id')?.value;
  const data = {
    nombre: ($('empleado-nombre')?.value || '').trim(),
    telefono: ($('empleado-telefono')?.value || '').trim(),
    direccion: ($('empleado-direccion')?.value || '').trim(),
    cargo: ($('empleado-cargo')?.value || '').trim(),
    salario: numero($('empleado-salario')?.value),
    fecha_ingreso: $('empleado-fecha')?.value || ''
  };
  if (!data.nombre) { mostrarMensaje('Ingrese el nombre', 'error'); return; }
  try {
    if (id) {
      await api('PUT', '/api/empleados/' + id, data);
      mostrarMensaje('Empleado actualizado');
    } else {
      await api('POST', '/api/empleados', data);
      mostrarMensaje('Empleado creado');
    }
    limpiarFormEmpleado();
    actualizarTablaEmpleados();
  } catch {}
}

async function eliminarEmpleado(id) {
  if (!confirm('¿Eliminar este empleado?')) return;
  try {
    await api('DELETE', '/api/empleados/' + id);
    mostrarMensaje('Empleado eliminado');
    actualizarTablaEmpleados();
  } catch {}
}

function editarEmpleado(e) {
  if ($('empleado-id')) $('empleado-id').value = e.id;
  if ($('empleado-nombre')) $('empleado-nombre').value = e.nombre || '';
  if ($('empleado-telefono')) $('empleado-telefono').value = e.telefono || '';
  if ($('empleado-direccion')) $('empleado-direccion').value = e.direccion || '';
  if ($('empleado-cargo')) $('empleado-cargo').value = e.cargo || '';
  if ($('empleado-salario')) $('empleado-salario').value = e.salario || '';
  if ($('empleado-fecha')) $('empleado-fecha').value = e.fecha_ingreso || '';
}

function limpiarFormEmpleado() {
  ['empleado-id','empleado-nombre','empleado-telefono','empleado-direccion','empleado-cargo','empleado-salario','empleado-fecha'].forEach(id => {
    if ($(id)) $(id).value = '';
  });
}

async function actualizarTablaEmpleados() {
  const lista = await cargarEmpleados();
  const tbody = $('tabla-empleados');
  if (!tbody) return;
  tbody.innerHTML = lista.map(e => `<tr>
    <td>${escapeHTML(e.nombre)}</td>
    <td>${escapeHTML(e.telefono || '')}</td>
    <td>${escapeHTML(e.direccion || '')}</td>
    <td>${escapeHTML(e.cargo || '')}</td>
    <td>S/ ${numero(e.salario).toFixed(2)}</td>
    <td>${e.fecha_ingreso || ''}</td>
    <td class="table-actions">
      <button class="btn btn-secondary" onclick='editarEmpleado(${JSON.stringify(e).replace(/'/g, "&#39;")})'>Editar</button>
      <button class="btn btn-danger" onclick="eliminarEmpleado(${e.id})">Eliminar</button>
    </td>
  </tr>`).join('') || '<tr><td colspan="7">Sin empleados</td></tr>';
}

// ==================== REPORTES ====================
async function actualizarReportes() {
  try {
    const gral = await api('GET', '/api/reportes/resumen-general');
    if (gral) {
      if ($('rep-total-gallinas')) $('rep-total-gallinas').textContent = (gral.total_gallinas || 0).toLocaleString();
      if ($('rep-produccion-total')) $('rep-produccion-total').textContent = formatoJabas(gral.produccion_total || 0) + ' jabas';
      if ($('rep-ventas-total')) $('rep-ventas-total').textContent = 'S/ ' + (gral.ventas_total || 0).toFixed(2);
      if ($('rep-stock-huevos')) $('rep-stock-huevos').textContent = formatoJabas(gral.stock_huevos || 0) + ' jabas';
      if ($('rep-stock-alimento')) $('rep-stock-alimento').textContent = (gral.stock_alimento_sacos || 0).toFixed(0) + ' sacos';
    }
  } catch {}

  // Producción resumen (chart)
  try {
    const desde = $('rep-prod-desde')?.value || '';
    const hasta = $('rep-prod-hasta')?.value || '';
    const params = new URLSearchParams();
    if (desde) params.set('desde', desde);
    if (hasta) params.set('hasta', hasta);
    const prodData = await api('GET', '/api/reportes/produccion-resumen?' + params.toString()) || [];
    const tbody = $('tabla-reporte-produccion');
    const chartDiv = $('chart-produccion');
    if (tbody) {
      tbody.innerHTML = prodData.map(p => `<tr>
        <td>${p.fecha}</td>
        <td>${formatoJabas(p.total_jabas)}</td>
        <td>${formatoJabas(p.primera)}</td>
        <td>${formatoJabas(p.segunda)}</td>
        <td>${p.muertas || 0}</td>
      </tr>`).join('') || '<tr><td colspan="5">Sin datos</td></tr>';
    }
    if (chartDiv) {
      const maxJabas = Math.max(...prodData.map(p => numero(p.total_jabas)), 1);
      chartDiv.innerHTML = prodData.map(p => {
        const h = (numero(p.total_jabas) / maxJabas) * 100;
        return `<div style="display:flex;align-items:center;margin-bottom:4px;">
          <span style="width:80px;font-size:0.8rem;">${escapeHTML(p.fecha || '')}</span>
          <div style="flex:1;background:#e9ecef;border-radius:4px;height:20px;overflow:hidden;">
            <div style="height:100%;width:${h.toFixed(0)}%;background:#008080;border-radius:4px;display:flex;align-items:center;justify-content:flex-end;padding-right:4px;color:white;font-size:0.75rem;font-weight:700;min-width:${h > 5 ? '0' : '100%'};">
              ${h > 5 ? formatoJabas(p.total_jabas) : ''}
            </div>
          </div>
        </div>`;
      }).join('') || '<p>Sin datos para el gráfico</p>';
    }
  } catch {}

  // Ventas resumen
  try {
    const desde = $('rep-ventas-desde')?.value || '';
    const hasta = $('rep-ventas-hasta')?.value || '';
    const params = new URLSearchParams();
    if (desde) params.set('desde', desde);
    if (hasta) params.set('hasta', hasta);
    const ventasData = await api('GET', '/api/reportes/ventas-resumen?' + params.toString()) || [];
    const tbody = $('tabla-reporte-ventas');
    const chartDiv = $('chart-ventas');
    if (tbody) {
      tbody.innerHTML = ventasData.map(v => `<tr>
        <td>${v.fecha}</td>
        <td>${formatoJabas(v.total_jabas)}</td>
        <td>${v.total_ventas !== undefined ? 'S/ ' + Number(v.total_ventas).toFixed(2) : '-'}</td>
      </tr>`).join('') || '<tr><td colspan="3">Sin datos</td></tr>';
    }
    if (chartDiv) {
      const maxVentas = Math.max(...ventasData.map(v => numero(v.total_ventas)), 1);
      chartDiv.innerHTML = ventasData.map(v => {
        const h = (numero(v.total_ventas) / maxVentas) * 100;
        return `<div style="display:flex;align-items:center;margin-bottom:4px;">
          <span style="width:80px;font-size:0.8rem;">${escapeHTML(v.fecha || '')}</span>
          <div style="flex:1;background:#e9ecef;border-radius:4px;height:20px;overflow:hidden;">
            <div style="height:100%;width:${h.toFixed(0)}%;background:#ff8c00;border-radius:4px;display:flex;align-items:center;justify-content:flex-end;padding-right:4px;color:white;font-size:0.75rem;font-weight:700;">
              ${h > 5 ? 'S/ ' + Number(v.total_ventas).toFixed(0) : ''}
            </div>
          </div>
        </div>`;
      }).join('') || '<p>Sin datos</p>';
    }
  } catch {}

  // Rendimiento
  const rendGalpon = $('rendimiento-galpon')?.value;
  try {
    const params = new URLSearchParams();
    if (rendGalpon) params.set('galpon_id', rendGalpon);
    const rendData = await api('GET', '/api/reportes/rendimiento?' + params.toString()) || [];
    const tbody = $('tabla-rendimiento-galpon');
    if (tbody) {
      tbody.innerHTML = rendData.map(r => `<tr>
        <td>${r.fecha}</td>
        <td>${escapeHTML(r.galpon_nombre || nombreGalponPorId(r.galpon_id))}</td>
        <td>${formatoJabas(r.jabas || 0)} jabas</td>
        <td>${r.gallinas || 0}</td>
        <td>${r.rendimiento !== undefined ? Number(r.rendimiento).toFixed(2) : ((r.gallinas > 0 ? (numero(r.jabas) * 360) / r.gallinas : 0).toFixed(2))}</td>
      </tr>`).join('') || '<tr><td colspan="5">Sin datos</td></tr>';
    }
  } catch {}
}

// ==================== ALERTAS ====================
async function generarAlertas() {
  try {
    const alertas = await api('GET', '/api/alertas/generar');
    const cont = $('alertas-generadas');
    if (!cont) return;
    if (!alertas || alertas.length === 0) {
      cont.innerHTML = '<div class="alert ok">Sin alertas generadas</div>';
    } else {
      cont.innerHTML = alertas.map(a =>
        `<div class="alert danger">${escapeHTML(a.mensaje || a.titulo || '')}</div>`
      ).join('');
    }
  } catch {}
}

async function actualizarNotificaciones() {
  try {
    const notis = await api('GET', '/api/alertas/notificaciones') || [];
    const cont = $('tabla-notificaciones');
    if (!cont) return;
    cont.innerHTML = notis.map(n => `<tr class="${n.leida ? '' : 'no-leida'}">
      <td>${n.fecha || ''}</td>
      <td>${escapeHTML(n.mensaje || n.titulo || '')}</td>
      <td>${n.leida ? 'Leída' : '<button class="btn btn-secondary" onclick="marcarLeida(' + n.id + ')">Marcar leída</button>'}</td>
    </tr>`).join('') || '<tr><td colspan="3">Sin notificaciones</td></tr>';
  } catch {}
}

async function marcarLeida(id) {
  try {
    await api('PUT', '/api/alertas/notificaciones/' + id + '/leer');
    mostrarMensaje('Notificación marcada como leída');
    actualizarNotificaciones();
  } catch {}
}

// ==================== ADMIN: GALPONES ====================
async function agregarGalpon() {
  const nombre = ($('admin-galpon-nombre')?.value || '').trim();
  const gallinas = numero($('admin-galpon-gallinas')?.value);
  if (!nombre) { mostrarMensaje('Ingrese el nombre', 'error'); return; }
  try {
    await api('POST', '/api/galpones', { nombre, gallinas });
    mostrarMensaje('Galpón agregado');
    $('admin-galpon-nombre').value = '';
    $('admin-galpon-gallinas').value = '';
    await cargarGalpones();
    poblarSelectores();
    actualizarTablaGalpones();
  } catch {}
}

async function cargarGalponParaEditar() {
  const sel = $('admin-galpon-editar-select');
  if (!sel) return;
  const id = Number(sel.value);
  const g = galponesCache.find(x => x.id === id);
  if ($('admin-galpon-editar-nombre')) $('admin-galpon-editar-nombre').value = g ? g.nombre : '';
  if ($('admin-galpon-editar-gallinas')) $('admin-galpon-editar-gallinas').value = g ? g.gallinas : '';
}

async function guardarCambiosGalpon() {
  const sel = $('admin-galpon-editar-select');
  if (!sel) return;
  const id = Number(sel.value);
  const nombre = ($('admin-galpon-editar-nombre')?.value || '').trim();
  const gallinas = numero($('admin-galpon-editar-gallinas')?.value);
  if (!id) { mostrarMensaje('Seleccione un galpón', 'error'); return; }
  if (!nombre) { mostrarMensaje('Ingrese el nombre', 'error'); return; }
  try {
    await api('PUT', '/api/galpones/' + id, { nombre, gallinas });
    mostrarMensaje('Galpón actualizado');
    await cargarGalpones();
    poblarSelectores();
    actualizarTablaGalpones();
  } catch {}
}

async function eliminarGalponAdmin() {
  const sel = $('admin-galpon-eliminar');
  if (!sel) return;
  const id = Number(sel.value);
  if (!id) { mostrarMensaje('Seleccione un galpón', 'error'); return; }
  if (!confirm('¿Eliminar este galpón?')) return;
  try {
    await api('DELETE', '/api/galpones/' + id);
    mostrarMensaje('Galpón eliminado');
    await cargarGalpones();
    poblarSelectores();
    actualizarTablaGalpones();
  } catch {}
}

function actualizarTablaGalpones() {
  const tbody = $('tabla-galpones');
  if (!tbody) return;
  tbody.innerHTML = galponesCache.map(g => `<tr>
    <td>${escapeHTML(g.nombre)}</td>
    <td>${g.gallinas || 0}</td>
    <td>${g.alimento_kg ? (g.alimento_kg / 50).toFixed(0) + ' sacos' : '0 sacos'}</td>
  </tr>`).join('') || '<tr><td colspan="3">Sin galpones</td></tr>';
}

// ==================== ADMIN: INSUMOS ====================
function obtenerInfoPorPresentacion(tipo) {
  const map = {
    toneladas: { unidad_compra: 'toneladas', kg_por_unidad: 1000, etiqueta: 'Granel' },
    sacos50: { unidad_compra: 'sacos de 50 kg', kg_por_unidad: 50, etiqueta: 'Saco 50 kg' },
    tanques1000: { unidad_compra: 'tanques de 1000 L', kg_por_unidad: 1000, etiqueta: 'Litros' },
    sacos25: { unidad_compra: 'sacos de 25 kg', kg_por_unidad: 25, etiqueta: 'Saco 25 kg' },
    kg: { unidad_compra: 'kg', kg_por_unidad: 1, etiqueta: 'Kg' }
  };
  return map[tipo] || map.kg;
}

async function agregarNuevoInsumo() {
  const nombre = ($('nuevo-insumo-nombre')?.value || '').trim().toUpperCase();
  const presentacion = $('nuevo-insumo-presentacion')?.value || 'kg';
  const cantidad = numero($('nuevo-insumo-stock')?.value);
  if (!nombre) { mostrarMensaje('Ingrese el nombre', 'error'); return; }
  const info = obtenerInfoPorPresentacion(presentacion);
  try {
    await api('POST', '/api/insumos', {
      nombre,
      cantidad_kg: cantidad * info.kg_por_unidad,
      unidad_compra: info.unidad_compra,
      kg_por_unidad: info.kg_por_unidad,
      etiqueta: info.etiqueta,
      stock_minimo_kg: info.kg_por_unidad
    });
    mostrarMensaje('Insumo creado');
    $('nuevo-insumo-nombre').value = '';
    $('nuevo-insumo-stock').value = '0';
    poblarSelectores();
    actualizarInsumos();
  } catch {}
}

async function eliminarInsumoAdmin() {
  const sel = $('admin-insumo-eliminar');
  if (!sel) return;
  const id = Number(sel.value);
  if (!id) { mostrarMensaje('Seleccione un insumo', 'error'); return; }
  if (!confirm('¿Eliminar este insumo?')) return;
  try {
    await api('DELETE', '/api/insumos/' + id);
    mostrarMensaje('Insumo eliminado');
    poblarSelectores();
    actualizarInsumos();
  } catch {}
}

// ==================== ADMIN: FÓRMULAS ====================
async function cargarEditorFormula() {
  const sel = $('edit-formula');
  const preview = $('editor-formula-preview');
  if (!sel) return;
  const id = Number(sel.value);
  if (!id) {
    if (preview) preview.innerHTML = '<p>Seleccione una fórmula</p>';
    return;
  }
  try {
    const formulas = await cargarFormulasMolino();
    const f = formulas.find(x => x.id === id);
    if (!f) {
      if (preview) preview.innerHTML = '<p>Fórmula no encontrada</p>';
      return;
    }
    const insumos = f.insumos || [];
    if (preview) {
      preview.innerHTML = insumos.length
        ? insumos.map(i => `<div class="formula-item">
            <strong>${escapeHTML(i.insumo_nombre || '')}</strong>
            <span>${numero(i.kg_por_tanda).toFixed(2)} kg por tanda</span>
          </div>`).join('')
        : '<p>Esta fórmula no tiene insumos</p>';
    }
  } catch {}
}

async function crearFormula() {
  const nombre = ($('nueva-formula-nombre')?.value || '').trim();
  const galponId = Number($('molino-galpon')?.value);
  if (!nombre) { mostrarMensaje('Ingrese el nombre', 'error'); return; }
  if (!galponId) { mostrarMensaje('Seleccione un galpón destino', 'error'); return; }
  try {
    await api('POST', '/api/molino/formulas', { nombre, galpon_id: galponId });
    mostrarMensaje('Fórmula creada');
    $('nueva-formula-nombre').value = '';
    poblarSelectores();
  } catch {}
}

async function eliminarFormulaAdmin() {
  const sel = $('edit-formula');
  if (!sel) return;
  const id = Number(sel.value);
  if (!id) { mostrarMensaje('Seleccione una fórmula', 'error'); return; }
  if (!confirm('¿Eliminar esta fórmula?')) return;
  try {
    await api('DELETE', '/api/molino/formulas/' + id);
    mostrarMensaje('Fórmula eliminada');
    poblarSelectores();
    if ($('editor-formula-preview')) $('editor-formula-preview').innerHTML = '';
  } catch {}
}

async function agregarInsumoFormula() {
  const formulaId = Number($('edit-formula')?.value);
  const insumoId = Number($('edit-formula-insumo')?.value);
  const kg = numero($('edit-formula-kg')?.value);
  if (!formulaId) { mostrarMensaje('Seleccione una fórmula', 'error'); return; }
  if (!insumoId) { mostrarMensaje('Seleccione un insumo', 'error'); return; }
  if (kg <= 0) { mostrarMensaje('Ingrese kg por tanda', 'error'); return; }
  try {
    await api('POST', '/api/molino/formulas/' + formulaId + '/insumos', { insumo_id: insumoId, kg_por_tanda: kg });
    mostrarMensaje('Insumo agregado a la fórmula');
    $('edit-formula-kg').value = '';
    cargarEditorFormula();
  } catch {}
}

async function quitarInsumoFormula() {
  const formulaId = Number($('edit-formula')?.value);
  const insumoId = Number($('edit-formula-insumo')?.value);
  if (!formulaId) { mostrarMensaje('Seleccione una fórmula', 'error'); return; }
  if (!insumoId) { mostrarMensaje('Seleccione un insumo', 'error'); return; }
  // We need to find the formula-insumo id. For now, let's just use insumo_id
  try {
    await api('DELETE', '/api/molino/formulas/' + formulaId + '/insumos/' + insumoId);
    mostrarMensaje('Insumo quitado de la fórmula');
    cargarEditorFormula();
  } catch {}
}

// ==================== ACTUALIZAR TODO ====================
async function actualizarTodo() {
  await cargarGalpones();
  actualizarDashboard();
  actualizarTablaProduccion();
  actualizarAlmacenHuevos();
  actualizarMovimientosHuevos();
  actualizarClasesSegunda();
  actualizarInsumos();
  actualizarAlimentoBalanceado();
  actualizarMovimientosAlimento();
  actualizarTablaMolino();
  actualizarTablaVentas();
  actualizarTablaGalpones();
  // Reportes / rendimiento
  actualizarReportes();
  // Alertas
  generarAlertas();
  actualizarNotificaciones();
  // CRUD tables
  actualizarTablaClientes();
  actualizarTablaProveedores();
  actualizarTablaCompras();
  actualizarTablaEmpleados();
}

// ==================== INYECTAR SECCIONES FALTANTES EN EL HTML ====================
function inyectarSeccionesFaltantes() {
  const main = document.querySelector('.content');
  const menu = document.querySelector('.menu');
  if (!main || !menu) return;

  // Secciones que no existen en el HTML original
  const nuevasSecciones = [
    {
      tab: 'clientes',
      titulo: 'Clientes',
      html: `
        <h2>Clientes</h2>
        <div class="box">
          <h3 id="titulo-form-cliente">Nuevo cliente</h3>
          <input type="hidden" id="cliente-id">
          <div class="form-grid">
            <div><label>Nombre</label><input type="text" id="cliente-nombre" placeholder="Nombre del cliente"></div>
            <div><label>Teléfono</label><input type="text" id="cliente-telefono" placeholder="Teléfono"></div>
            <div><label>Dirección</label><input type="text" id="cliente-direccion" placeholder="Dirección"></div>
            <div><label>Email</label><input type="text" id="cliente-email" placeholder="Email"></div>
            <div><label>RUC</label><input type="text" id="cliente-ruc" placeholder="RUC"></div>
          </div>
          <button class="btn btn-primary" id="btn-guardar-cliente" onclick="guardarCliente()">Guardar cliente</button>
          <button class="btn btn-light" onclick="limpiarFormCliente();$('titulo-form-cliente').textContent='Nuevo cliente'">Cancelar</button>
        </div>
        <div class="table-box">
          <h3>Lista de clientes</h3>
          <table><thead><tr><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Email</th><th>RUC</th><th>Acción</th></tr></thead>
          <tbody id="tabla-clientes"></tbody></table>
        </div>
      `
    },
    {
      tab: 'proveedores',
      titulo: 'Proveedores',
      html: `
        <h2>Proveedores</h2>
        <div class="box">
          <h3 id="titulo-form-proveedor">Nuevo proveedor</h3>
          <input type="hidden" id="proveedor-id">
          <div class="form-grid">
            <div><label>Nombre</label><input type="text" id="proveedor-nombre" placeholder="Nombre del proveedor"></div>
            <div><label>Teléfono</label><input type="text" id="proveedor-telefono" placeholder="Teléfono"></div>
            <div><label>Dirección</label><input type="text" id="proveedor-direccion" placeholder="Dirección"></div>
            <div><label>Email</label><input type="text" id="proveedor-email" placeholder="Email"></div>
            <div><label>RUC</label><input type="text" id="proveedor-ruc" placeholder="RUC"></div>
          </div>
          <button class="btn btn-primary" id="btn-guardar-proveedor" onclick="guardarProveedor()">Guardar proveedor</button>
          <button class="btn btn-light" onclick="limpiarFormProveedor();$('titulo-form-proveedor').textContent='Nuevo proveedor'">Cancelar</button>
        </div>
        <div class="table-box">
          <h3>Lista de proveedores</h3>
          <table><thead><tr><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Email</th><th>RUC</th><th>Acción</th></tr></thead>
          <tbody id="tabla-proveedores"></tbody></table>
        </div>
      `
    },
    {
      tab: 'compras',
      titulo: 'Compras',
      html: `
        <h2>Compras</h2>
        <div class="box">
          <h3>Registrar compra</h3>
          <div class="form-grid">
            <div><label>Fecha</label><input type="date" id="compra-fecha"></div>
            <div><label>Proveedor</label><select id="compra-proveedor"><option value="">-- Seleccione --</option></select></div>
            <div><label>Insumo</label><select id="compra-insumo"><option value="">-- Seleccione --</option></select></div>
            <div><label>Cantidad</label><input type="number" id="compra-cantidad" min="0" step="0.01" placeholder="kg"></div>
            <div><label>Precio unitario</label><input type="number" id="compra-precio" min="0" step="0.01" placeholder="S/"></div>
            <div><label>Estado</label><select id="compra-estado"><option value="pendiente">Pendiente</option><option value="recibido">Recibido</option></select></div>
          </div>
          <button class="btn btn-primary" id="btn-guardar-compra" onclick="guardarCompra()">Registrar compra</button>
        </div>
        <div class="table-box">
          <h3>Historial de compras</h3>
          <table><thead><tr><th>Fecha</th><th>Proveedor</th><th>Insumo</th><th>Cantidad</th><th>Precio unit.</th><th>Total</th><th>Estado</th><th>Acción</th></tr></thead>
          <tbody id="tabla-compras"></tbody></table>
        </div>
      `
    },
    {
      tab: 'empleados',
      titulo: 'Empleados',
      html: `
        <h2>Empleados</h2>
        <div class="box">
          <h3 id="titulo-form-empleado">Nuevo empleado</h3>
          <input type="hidden" id="empleado-id">
          <div class="form-grid">
            <div><label>Nombre</label><input type="text" id="empleado-nombre" placeholder="Nombre"></div>
            <div><label>Teléfono</label><input type="text" id="empleado-telefono" placeholder="Teléfono"></div>
            <div><label>Dirección</label><input type="text" id="empleado-direccion" placeholder="Dirección"></div>
            <div><label>Cargo</label><input type="text" id="empleado-cargo" placeholder="Cargo"></div>
            <div><label>Salario</label><input type="number" id="empleado-salario" min="0" step="0.01" placeholder="S/"></div>
            <div><label>Fecha ingreso</label><input type="date" id="empleado-fecha"></div>
          </div>
          <button class="btn btn-primary" id="btn-guardar-empleado" onclick="guardarEmpleado()">Guardar empleado</button>
          <button class="btn btn-light" onclick="limpiarFormEmpleado();$('titulo-form-empleado').textContent='Nuevo empleado'">Cancelar</button>
        </div>
        <div class="table-box">
          <h3>Lista de empleados</h3>
          <table><thead><tr><th>Nombre</th><th>Teléfono</th><th>Dirección</th><th>Cargo</th><th>Salario</th><th>Fecha ingreso</th><th>Acción</th></tr></thead>
          <tbody id="tabla-empleados"></tbody></table>
        </div>
      `
    },
    {
      tab: 'reportes',
      titulo: 'Reportes',
      html: `
        <h2>Reportes</h2>
        <div class="cards-grid">
          <div class="card"><span>Total gallinas</span><strong id="rep-total-gallinas">0</strong></div>
          <div class="card"><span>Producción total</span><strong id="rep-produccion-total">0 jabas</strong></div>
          <div class="card"><span>Ventas totales</span><strong id="rep-ventas-total">S/ 0.00</strong></div>
          <div class="card"><span>Stock huevos</span><strong id="rep-stock-huevos">0 jabas</strong></div>
          <div class="card"><span>Stock alimento</span><strong id="rep-stock-alimento">0 sacos</strong></div>
        </div>

        <div class="box">
          <h3>Producción por fecha</h3>
          <div class="form-grid">
            <div><label>Desde</label><input type="date" id="rep-prod-desde"></div>
            <div><label>Hasta</label><input type="date" id="rep-prod-hasta"></div>
          </div>
          <button class="btn btn-secondary" onclick="actualizarReportes()">Filtrar</button>
          <h4 style="margin-top:16px;">Gráfico de producción</h4>
          <div id="chart-produccion"></div>
          <div class="table-box" style="margin-top:12px;">
            <table><thead><tr><th>Fecha</th><th>Total jabas</th><th>Primera</th><th>Segunda</th><th>Muertas</th></tr></thead>
            <tbody id="tabla-reporte-produccion"></tbody></table>
          </div>
        </div>

        <div class="box">
          <h3>Ventas por fecha</h3>
          <div class="form-grid">
            <div><label>Desde</label><input type="date" id="rep-ventas-desde"></div>
            <div><label>Hasta</label><input type="date" id="rep-ventas-hasta"></div>
          </div>
          <button class="btn btn-secondary" onclick="actualizarReportes()">Filtrar</button>
          <h4 style="margin-top:16px;">Gráfico de ventas</h4>
          <div id="chart-ventas"></div>
          <div class="table-box" style="margin-top:12px;">
            <table><thead><tr><th>Fecha</th><th>Total jabas</th><th>Total ventas</th></tr></thead>
            <tbody id="tabla-reporte-ventas"></tbody></table>
          </div>
        </div>
      `
    },
    {
      tab: 'alertas',
      titulo: 'Alertas',
      html: `
        <h2>Alertas</h2>
        <div class="box">
          <h3>Alertas generadas</h3>
          <button class="btn btn-secondary" onclick="generarAlertas()">Generar alertas</button>
          <div id="alertas-generadas" style="margin-top:12px;"></div>
        </div>
        <div class="table-box">
          <h3>Historial de notificaciones</h3>
          <button class="btn btn-secondary" onclick="actualizarNotificaciones()">Actualizar</button>
          <table><thead><tr><th>Fecha</th><th>Mensaje</th><th>Estado</th></tr></thead>
          <tbody id="tabla-notificaciones"></tbody></table>
        </div>
      `
    }
  ];

  // Verificar qué secciones ya existen
  nuevasSecciones.forEach(sec => {
    if (!document.getElementById('tab-' + sec.tab)) {
      // Add nav button
      const btn = document.createElement('button');
      btn.className = 'nav-btn';
      btn.dataset.tab = sec.tab;
      btn.textContent = sec.titulo;
      menu.appendChild(btn);

      // Add section
      const section = document.createElement('section');
      section.id = 'tab-' + sec.tab;
      section.className = 'tab-content';
      section.innerHTML = sec.html;
      main.appendChild(section);
    }
  });

  // Set default dates
  if ($('compra-fecha')) $('compra-fecha').value = hoy();
  if ($('empleado-fecha')) $('empleado-fecha').value = hoy();
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', async () => {
  // Inyectar secciones faltantes
  inyectarSeccionesFaltantes();

  // Fechas por defecto
  if ($('prod-fecha')) $('prod-fecha').value = hoy();
  if ($('molino-fecha')) $('molino-fecha').value = hoy();
  if ($('venta-fecha')) $('venta-fecha').value = hoy();
  if ($('rep-prod-desde')) $('rep-prod-desde').value = hoy();
  if ($('rep-prod-hasta')) $('rep-prod-hasta').value = hoy();
  if ($('rep-ventas-desde')) $('rep-ventas-desde').value = hoy();
  if ($('rep-ventas-hasta')) $('rep-ventas-hasta').value = hoy();

  // Login
  if ($('btn-login')) $('btn-login').addEventListener('click', iniciarSesion);
  if ($('login-pass')) $('login-pass').addEventListener('keydown', e => { if (e.key === 'Enter') iniciarSesion(); });
  if ($('btn-logout')) $('btn-logout').addEventListener('click', cerrarSesion);

  // Navegación
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => cambiarTab(btn.dataset.tab));
  });

  // Producción
  if ($('btn-guardar-produccion')) $('btn-guardar-produccion').addEventListener('click', guardarProduccion);
  if ($('btn-filtrar-produccion')) $('btn-filtrar-produccion').addEventListener('click', filtrarProduccion);
  if ($('btn-limpiar-filtro-produccion')) $('btn-limpiar-filtro-produccion').addEventListener('click', limpiarFiltroProduccion);
  if ($('prod-jabas-primera')) $('prod-jabas-primera').addEventListener('input', actualizarPaquetesProduccion);
  if ($('prod-jabas-segunda')) $('prod-jabas-segunda').addEventListener('input', actualizarPaquetesProduccion);
  actualizarPaquetesProduccion();

  // Almacén huevos
  if ($('btn-guardar-clases-segunda')) $('btn-guardar-clases-segunda').addEventListener('click', guardarClasificacionSegunda);

  // Almacén insumos / alimento
  if ($('btn-ingresar-insumo')) $('btn-ingresar-insumo').addEventListener('click', ingresarInsumo);
  if ($('btn-agregar-insumo')) $('btn-agregar-insumo').addEventListener('click', agregarNuevoInsumo);
  if ($('btn-eliminar-insumo')) $('btn-eliminar-insumo').addEventListener('click', eliminarInsumoAdmin);
  if ($('btn-consumir-alimento')) $('btn-consumir-alimento').addEventListener('click', consumirAlimento);

  // Ventas
  ['venta-primera','venta-segunda','venta-promedio-kg-jaba','venta-precio-primera','venta-precio-segunda'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', calcularTotalVenta);
  });
  if ($('btn-guardar-venta')) $('btn-guardar-venta').addEventListener('click', guardarVenta);
  calcularTotalVenta();

  // Molino
  if ($('molino-galpon')) $('molino-galpon').addEventListener('change', actualizarFormulaMolinoPorGalpon);
  if ($('btn-ver-formula')) $('btn-ver-formula').addEventListener('click', verFormulaMolino);
  if ($('btn-producir-molino')) $('btn-producir-molino').addEventListener('click', producirMolino);
  if ($('btn-cerrar-dia')) $('btn-cerrar-dia').addEventListener('click', () => mostrarMensaje('Función de cierre diario no implementada en el servidor', 'error'));

  // Admin: galpones
  if ($('btn-admin-agregar-galpon')) $('btn-admin-agregar-galpon').addEventListener('click', agregarGalpon);
  if ($('btn-admin-cargar-galpon')) $('btn-admin-cargar-galpon').addEventListener('click', cargarGalponParaEditar);
  if ($('btn-admin-guardar-galpon')) $('btn-admin-guardar-galpon').addEventListener('click', guardarCambiosGalpon);
  if ($('btn-admin-eliminar-galpon')) $('btn-admin-eliminar-galpon').addEventListener('click', eliminarGalponAdmin);
  if ($('admin-galpon-editar-select')) $('admin-galpon-editar-select').addEventListener('change', cargarGalponParaEditar);

  // Admin: insumos
  if ($('btn-agregar-insumo')) $('btn-agregar-insumo').addEventListener('click', agregarNuevoInsumo);
  if ($('btn-eliminar-insumo')) $('btn-eliminar-insumo').addEventListener('click', eliminarInsumoAdmin);

  // Admin: fórmulas
  if ($('edit-formula')) $('edit-formula').addEventListener('change', cargarEditorFormula);
  if ($('btn-guardar-formula-destino')) $('btn-guardar-formula-destino').addEventListener('click', () => mostrarMensaje('Edite el galpón de la fórmula desde la sección de galpones', 'error'));
  if ($('btn-agregar-formula-insumo')) $('btn-agregar-formula-insumo').addEventListener('click', agregarInsumoFormula);
  if ($('btn-quitar-formula-insumo')) $('btn-quitar-formula-insumo').addEventListener('click', quitarInsumoFormula);
  if ($('btn-crear-formula')) $('btn-crear-formula').addEventListener('click', crearFormula);
  if ($('btn-eliminar-formula')) $('btn-eliminar-formula').addEventListener('click', eliminarFormulaAdmin);

  // Rendimiento / Reportes
  if ($('rendimiento-galpon')) $('rendimiento-galpon').addEventListener('change', () => actualizarReportes());
  if ($('btn-ver-rendimiento')) $('btn-ver-rendimiento').addEventListener('click', () => actualizarReportes());
  if ($('btn-exportar-rendimiento')) $('btn-exportar-rendimiento').addEventListener('click', () => mostrarMensaje('Exportación a Excel deshabilitada en versión API', 'error'));

  // Accesibilidad
  if ($('btn-text-small')) $('btn-text-small').addEventListener('click', () => cambiarTamanoTexto(-1));
  if ($('btn-text-big')) $('btn-text-big').addEventListener('click', () => cambiarTamanoTexto(1));
  if ($('btn-text-reset')) $('btn-text-reset').addEventListener('click', resetTamanoTexto);
  cargarTamanoTexto();

  // Cliente select auto-fill name in ventas
  if ($('venta-cliente-select')) {
    $('venta-cliente-select').addEventListener('change', function() {
      const opt = this.options[this.selectedIndex];
      if ($('venta-cliente')) {
        $('venta-cliente').value = opt && opt.value ? (opt.dataset.nombre || opt.text) : '';
      }
    });
  }

  // Check session from server or redirect
  // Simple: no stored session - show login
  if (sessionStorage.getItem('avicola_session')) {
    try {
      session = JSON.parse(sessionStorage.getItem('avicola_session'));
      await cargarGalpones();
      poblarSelectores();
      mostrarAplicacion();
    } catch {
      sessionStorage.removeItem('avicola_session');
    }
  }
});

// Sobreescribir iniciarSesion para guardar en sessionStorage
const _originalLogin = iniciarSesion;
iniciarSesion = async function() {
  const usuario = ($('login-user')?.value || '').trim();
  const clave = ($('login-pass')?.value || '').trim();
  if (!usuario || !clave) { mostrarMensaje('Ingrese usuario y contraseña', 'error'); return; }
  try {
    const res = await api('POST', '/api/auth/login', { usuario, clave });
    if (res && res.usuario) {
      session = res.usuario;
      sessionStorage.setItem('avicola_session', JSON.stringify(session));
      await cargarGalpones();
      poblarSelectores();
      mostrarAplicacion();
    } else {
      mostrarMensaje('Credenciales inválidas', 'error');
    }
  } catch {}
};

// Sobreescribir cerrarSesion
const _originalLogout = cerrarSesion;
cerrarSesion = function() {
  session = null;
  galponesCache = [];
  sessionStorage.removeItem('avicola_session');
  const login = $('login-screen');
  const app = $('app');
  if (login) login.classList.remove('hidden');
  if (app) app.classList.add('hidden');
};

// ==================== ACCESIBILIDAD ====================
function cambiarTamanoTexto(valor) {
  const html = document.documentElement;
  const actual = parseFloat(window.getComputedStyle(html).fontSize || '16');
  const nuevo = Math.min(22, Math.max(14, actual + valor));
  html.style.fontSize = nuevo + 'px';
  try { localStorage.setItem('tamanoTextoAvicola', nuevo); } catch {}
}

function cargarTamanoTexto() {
  try {
    const guardado = localStorage.getItem('tamanoTextoAvicola');
    if (guardado) document.documentElement.style.fontSize = guardado + 'px';
  } catch {}
}

function resetTamanoTexto() {
  document.documentElement.style.fontSize = '16px';
  try { localStorage.setItem('tamanoTextoAvicola', '16'); } catch {}
}
