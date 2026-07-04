const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const qs = (sel, el) => (el || document).querySelector(sel);
const qsa = (sel, el) => (el || document).querySelectorAll(sel);

// ========== SUPABASE CONFIGURATION ==========
const SUPABASE_URL = 'https://sjyqskmhywykhzjgqegt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tpjoNczX5hYCDjYpHPng1A_9QZflFbM';

// ========== SUPABASE CLIENT ==========
class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.headers = {
      'apikey': key,
      'Authorization': `Bearer ${key}`, 
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    };
  }

  async request(method, endpoint, body = null, params = {}) {
    const url = `${this.url}/rest/v1/${endpoint}`;
    const queryParams = new URLSearchParams(params);
    const fullUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url;
    
    const options = {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : null
    };

    try {
      const response = await fetch(fullUrl, options);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Supabase error: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      mostrarMensaje(`Error de base de datos: ${error.message}`, 'error');
      throw error;
    }
  }

  async select(table, columns = '*', filters = {}, options = {}) {
    const params = { ...options, select: columns };
    Object.assign(params, filters);
    return await this.request('GET', table, null, params);
  }

  async insert(table, body) {
    return await this.request('POST', table, body);
  }

  async update(table, body, filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, value);
    });
    const url = `${this.url}/rest/v1/${table}?${params.toString()}`;
    const options = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Supabase error: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      mostrarMensaje(`Error de base de datos: ${error.message}`, 'error');
      throw error;
    }
  }

  async delete(table, filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      params.append(key, value);
    });
    const url = `${this.url}/rest/v1/${table}?${params.toString()}`;
    const options = {
      method: 'DELETE',
      headers: this.headers
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Supabase error: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      mostrarMensaje(`Error de base de datos: ${error.message}`, 'error');
      throw error;
    }
  }

  rpc(functionName, body) {
    return this.request('POST', `rpc/${functionName}`, body);
  }
}

// Initialize Supabase client
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ========== AUTHENTICATED SUPABASE CLIENT ==========
class AuthenticatedSupabaseClient extends SupabaseClient {
  constructor(url, key, token) {
    super(url, key);
    this.token = token;
    this.headers.Authorization = `Bearer ${token}`;
  }
}

function crearEl(tag, props = {}, hijos = []) {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'className') el.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'innerHTML') el.innerHTML = v;
    else el.setAttribute(k, v);
  });
  hijos.forEach(h => { if (h != null) el.appendChild(typeof h === 'string' ? document.createTextNode(h) : h); });
  return el;
}
function vaciar(el) { while (el.firstChild) el.removeChild(el.firstChild); }

function num(v, d = 2) { const n = parseFloat(v) || 0; return isNaN(n) ? '0.00' : n.toFixed(d); }

function hoy() { return new Date().toISOString().split('T')[0]; }

function formatearFecha(f) {
  if (!f) return '-';
  const d = new Date(f + 'T12:00:00');
  return d.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function fechaISO(d) {
  return d.toISOString().split('T')[0];
}

function diasAtras(n) {
  const d = new Date(); d.setDate(d.getDate() - n);
  return fechaISO(d);
}

let sesion = null;
let currentSection = 'dashboard';
let toasts = [];
let toastId = 0;

// Auth state management
let supabaseAuth = null;
let authToken = null;
const savedSession = localStorage.getItem('supabase.auth.token');
if (savedSession) {
  try {
    const parsed = JSON.parse(savedSession);
    authToken = parsed.access_token || savedSession;
    sesion = {
      usuario: parsed.user?.email || parsed.user?.user_metadata?.nombre || 'Usuario',
      rol: parsed.user?.user_metadata?.rol || 'usuario',
      id: parsed.user?.id
    };
    supabaseAuth = new AuthenticatedSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, authToken);
    aplicarSesion();
  } catch { localStorage.removeItem('supabase.auth.token'); }
}

function getSupabaseAuth() {
  if (!supabaseAuth && authToken) {
    supabaseAuth = new AuthenticatedSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, authToken);
  }
  return supabaseAuth;
}

async function signInWithPassword(email, password) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY
    },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error de autenticación');
  }
  
  const session = await response.json();
  localStorage.setItem('supabase.auth.token', JSON.stringify(session));
  authToken = session.access_token;
  
  supabaseAuth = new AuthenticatedSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, authToken);
  
  sesion = {
    usuario: session.user.email || session.user.user_metadata?.nombre || 'Usuario',
    rol: session.user.user_metadata?.rol || 'usuario',
    id: session.user.id
  };
  
  aplicarSesion();
  mostrarMensaje(`Bienvenido, ${sesion.usuario}`, 'success');
  return session;
}

function signOut() {
  localStorage.removeItem('supabase.auth.token');
  authToken = null;
  supabaseAuth = null;
  sesion = null;
  cerrarSesion();
}

// Fix authentication function to use Supabase
async function iniciarSesion(usuario, clave) {
  try {
    await signInWithPassword(usuario, clave);
    return { success: true };
  } catch (error) {
    console.error('Error de login Supabase:', error);
    return { success: false, error: error.message || 'Credenciales inválidas' };
  }
}

function abrirModalAutenticacion() {
  if (!supabaseAuth) {
    const c = $('content'); if (!c) return;
    vaciar(c); c.innerHTML = '';
    const login = crearEl('div', {
      style: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '20px' }
    }, [
      crearEl('div', { className: 'card', style: { maxWidth: '400px', width: '100%', padding: '32px' } }, [
        crearEl('div', { style: { textAlign: 'center', marginBottom: '24px' } }, [
          crearEl('div', { style: { fontSize: '48px', marginBottom: '8px' } }, ['🔐']),
          crearEl('h2', { style: { fontSize: '20px' } }, ['Acceder a Base de Datos']),
          crearEl('p', { style: { color: 'var(--text2)', fontSize: '13px', marginTop: '4px' } }, ['Inicia sesión para continuar con Supabase']),
        ]),
        crearEl('div', { className: 'form-grid' }, [
          crearEl('div', { className: 'form-group' }, [
            crearEl('label', {}, ['Correo electrónico']),
            crearEl('input', { id: 'loginEmail', type: 'email', placeholder: 'usuario@ejemplo.com', autocomplete: 'username' }),
          ]),
          crearEl('div', { className: 'form-group' }, [
            crearEl('label', {}, ['Contraseña']),
            crearEl('input', { id: 'loginPass', type: 'password', placeholder: '••••', autocomplete: 'current-password' }),
          ]),
        ]),
        crearEl('button', { className: 'btn btn-primary', style: { width: '100%', marginTop: '16px', justifyContent: 'center' }, onClick: doLogin }, ['Ingresar a Supabase']),
        crearEl('div', { style: { textAlign: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--text3)' } }, []),
      ])
    ]);
    c.appendChild(login);
    setTimeout(() => $('loginEmail')?.focus(), 100);
    $('loginPass')?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
    $('loginEmail')?.addEventListener('keydown', e => { if (e.key === 'Enter') $('loginPass')?.focus(); });
  } else {
    mostrarMensaje('Ya estás conectado a Supabase', 'info');
  }
}

async function doLogin() {
  const u = $('loginEmail')?.value?.trim();
  const p = $('loginPass')?.value?.trim();
  if (!u || !p) return mostrarMensaje('Ingrese correo electrónico y contraseña', 'warning');
  try {
    await iniciarSesion(u, p);
  } catch { }
}

function filtroFecha(desde, hasta) {
  if (!desde || !hasta) return {};
  return { and: `(fecha.gte.${desde},fecha.lte.${hasta})` };
}

async function api(path, options = {}) {
  const c = getSupabaseAuth();
  if (!c) throw new Error('No autenticado en Supabase');
  const method = options.method || 'GET';
  const body = options.body;
  const urlParams = new URLSearchParams(path.split('?')[1] || '');
  const cleanPath = path.split('?')[0];

  try {
    if (method === 'GET') {
      const tabs = { '/galpones':['galpones','id.asc'],'/formulas':['formulas','id.asc'],'/produccion':['produccion','fecha.desc'],'/insumos':['insumos','nombre.asc'],'/proveedores':['proveedores','nombre.asc'],'/clientes':['clientes','nombre.asc'],'/compras':['compras','fecha.desc'],'/ventas':['ventas','fecha.desc'] };
      if (tabs[cleanPath]) { const [t,o]=tabs[cleanPath]; return await c.select(t, '*', {}, { order: o }); }
      const m = cleanPath.match(/^\/(\w+)\/(\d+)$/);
      if (m) { const r = await c.select(m[1], '*', { 'id': 'eq.'+m[2] }); return r[0] || null; }

      if (cleanPath === '/alertas') return await c.select('alertas', '*', { activo: 'eq.true' });
      if (cleanPath === '/molino') return await c.select('produccion_molino', '*', {}, { order: 'fecha.desc' });
      if (cleanPath === '/molino/stock-alimento') return await c.select('vista_stock_alimento');
      if (cleanPath === '/almacen/huevos') { const [s,l]=await Promise.all([c.select('stock_huevos'),c.select('lotes_huevos')]); const o={}; s.forEach(x=>o[x.clase]=x.cantidad); return {stock:o,lotes:l}; }
      if (cleanPath === '/almacen/movimientos') return await c.select('almacen_movimientos', '*', {}, { order: 'fecha.desc' });
      if (cleanPath === '/configuracion/usuarios') return await c.select('usuarios');
      if (cleanPath === '/configuracion/empresa') { const r = await c.select('empresa'); return r[0] || null; }
      if (cleanPath === '/configuracion/parametros') return await c.select('parametros');

      if (cleanPath === '/reportes/dashboard') {
        const [d,ps,vm,ca]=await Promise.all([c.select('vista_dashboard'),c.select('vista_produccion_semanal'),c.select('vista_ventas_mensual'),c.select('vista_consumo_alimento')]);
        return {...(d[0]||{}),produccion_semanal:ps,ventas_mensual:vm,consumo_alimento:ca};
      }
      const rp = cleanPath.match(/^\/reportes\/(\w+)/);
      if (rp) {
        const tab=rp[1];
        const desde = urlParams.get('desde') || $('repDesde')?.value || diasAtras(30);
        const hasta = urlParams.get('hasta') || $('repHasta')?.value || hoy();
        const ff = filtroFecha(desde, hasta);
        if (tab==='produccion') return await c.select('produccion','*',ff,{order:'fecha.desc'});
        if (tab==='ventas') return await c.select('ventas','*',ff,{order:'fecha.desc'});
        if (tab==='inventario') { const [hue,i]=await Promise.all([c.select('stock_huevos'),c.select('insumos')]); return {huevos:hue,insumos:i}; }
        if (tab==='molino') return await c.select('produccion_molino','*',ff,{order:'fecha.desc'});
        if (tab==='galpones') { const g=await c.select('galpones'); return await Promise.all(g.map(async g=>{ const p=await c.select('produccion','*',{galpon_id:'eq.'+g.id,...ff},{order:'fecha.desc'}); const mu=p.reduce((s,x)=>s+(x.muertas||0),0); return {...g,produccion:p,mortalidad:mu}; })); }
        if (tab==='mortalidad') return await c.select('produccion','*',{muertas:'gt.0',...ff},{order:'fecha.desc'});
      }
    }

    if (method === 'POST') {
      const pts = { '/galpones':'galpones','/configuracion/usuarios':'usuarios','/formulas':'formulas','/clientes':'clientes' };
      if (pts[cleanPath]) return await c.insert(pts[cleanPath], body);

      if (cleanPath === '/produccion') {
        const r=await c.insert('produccion',{fecha:body.fecha,galpon_id:body.galpon_id,primera:body.primera||0,segunda:body.segunda||0,muertas:body.muertas||0});
        if(body.muertas){ const g=await c.select('galpones','*',{'id':'eq.'+body.galpon_id}); if(g[0]) await c.update('galpones',{gallinas:Math.max(0,(g[0].gallinas||0)-body.muertas)},{'id':'eq.'+body.galpon_id}); }
        if(body.primera>0) await c.rpc('sumar_stock',{p_clase:'Primera',p_cantidad:body.primera});
        if(body.segunda>0) await c.rpc('sumar_stock',{p_clase:'Segunda',p_cantidad:body.segunda});
        await c.insert('almacen_movimientos',{fecha:body.fecha,tipo:'Ingreso',detalle:'Producción galpón '+body.galpon_id,primera:body.primera||0,segunda:body.segunda||0});
        return r;
      }
      if (cleanPath === '/molino/producir') {
        const kg = body.tandas * 1500;
        const r=await c.insert('produccion_molino',{fecha:body.fecha,formula_id:body.formula_id,tandas:body.tandas,kg_producidos:kg,costo:body.tandas * 1500 * 1.2});
        await c.rpc('distribuir_alimento',{p_kg:kg});
        await c.insert('almacen_movimientos',{fecha:body.fecha,tipo:'Ingreso',detalle:'Producción molino: '+body.tandas+' tandas ('+Math.floor(kg/50)+' sacos)',primera:0,segunda:0});
        return r;
      }
      if (cleanPath === '/compras') {
        const total=body.cantidad*body.precio_unitario;
        const r=await c.insert('compras',{...body,total});
        await c.rpc('sumar_insumo',{p_id:body.insumo_id,p_cantidad:body.cantidad,p_fecha:body.fecha});
        return r;
      }
      if (cleanPath === '/ventas') {
        const params=await c.select('parametros');
        const pesoJaba = parseFloat((params.find(p=>p.clave==='peso_jaba_kg')||{}).valor)||18;
        const pp=parseFloat(body.precio_primera)||0;
        const ps=parseFloat(body.precio_segunda)||0;
        const grupos=[['primera',pp],['pardo','jumbo','sucio','quinados',ps]];
        let tj=0,ti=0;
        grupos.forEach(([t1,t2,t3,t4,t5,precio])=>{
          [t1,t2,t3,t4,t5].filter(Boolean).forEach(k=>{
            const jab=parseFloat(body[k])||0;
            tj+=jab;
            ti+=jab*pesoJaba*precio;
          });
        });
        const r=await c.insert('ventas',{...body,total_jabas:tj,peso:tj*pesoJaba,total:ti});
        const mapaStock={primera:'Primera',pardo:'Segunda',jumbo:'Segunda',sucio:'Segunda',quinados:'Segunda'};
        for(const k of Object.keys(mapaStock)){ const v=parseFloat(body[k])||0; if(v>0) await c.rpc('restar_stock',{p_clase:mapaStock[k],p_cantidad:v}); }
        return r;
      }
    }

    if (method === 'PUT') {
      const m=cleanPath.match(/^\/(.+)\/(\d+)$/);
      if(m){
        const pathToTable = { 'galpones':'galpones', 'configuracion/usuarios':'usuarios', 'configuracion/parametros':'parametros', 'formulas':'formulas', 'clientes':'clientes' };
        const table = pathToTable[m[1]];
        if(table) return await c.update(table, body, {'id':'eq.'+m[2]});
      }
      if(cleanPath==='/almacen/clasificar'){ const{fecha,...cls}=body; for(const[k,v]of Object.entries(cls))if(v>0){ await c.insert('clasificacion_huevos',{fecha,clase:k,cantidad:v}); } return {success:true}; }
      if(cleanPath==='/configuracion/empresa') return await c.update('empresa',body,{'id':'eq.1'});
    }
    throw new Error('Ruta no implementada: '+method+' '+cleanPath);
  } catch(e){ mostrarMensaje('Error: '+e.message,'error'); throw e; }
}

function mostrarMensaje(msg, tipo = 'info') {
  const id = ++toastId;
  const colors = { info: 'var(--primary)', success: 'var(--green)', error: 'var(--red)', warning: 'var(--orange)' };
  const t = crearEl('div', {
    style: {
      position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999',
      background: colors[tipo] || colors.info, color: '#fff',
      padding: '12px 20px', borderRadius: '10px', fontSize: '13px',
      boxShadow: '0 4px 12px rgba(0,0,0,.2)', maxWidth: '360px',
      transition: 'opacity .3s, transform .3s',
    }, innerHTML: msg
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(20px)'; setTimeout(() => t.remove(), 300); }, tipo === 'error' ? 5000 : 3000);
}

function cerrarSesion() {
  localStorage.removeItem('supabase.auth.token');
  authToken = null;
  supabaseAuth = null;
  sesion = null;
  abrirModalAutenticacion();
}

function aplicarSesion() {
  if (supabaseAuth) {
    $('loginScreen')?.remove();
    $('userAvatar').textContent = (sesion.usuario[0] || 'U').toUpperCase();
    $('userName').textContent = sesion.usuario;
    $('userRol').textContent = sesion.rol;
    $('roleBadge').textContent = sesion.rol;
    const items = qsa('.nav-item[data-section]');
    if (sesion.rol === 'Producción') {
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','galpones','molino'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
      $('subInventario').querySelectorAll('.nav-item').forEach(i => i.style.display = 'none');
    } else if (sesion.rol === 'Almacén') {
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','inventario','compras','almacen-huevos','almacen-insumos'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
    } else if (sesion.rol === 'Ventas') {
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','ventas'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
    } else if (sesion.rol === 'Gerencia') {
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','reportes'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
    }
    navegar('dashboard');
  } else {
    abrirModalAutenticacion();
  }
}

function mostrarLogin() {
  abrirModalAutenticacion();
}

// --- NAV ---
function navegar(section) {
  currentSection = section;
  const mapLabels = {
    dashboard: 'Dashboard', galpones: 'Galpones', molino: 'Molino',
    'almacen-huevos': 'Almacén de Huevos', 'almacen-insumos': 'Almacén de Insumos',
    compras: 'Compras', ventas: 'Ventas', reportes: 'Reportes', configuracion: 'Configuración',
  };
  $('sectionTitle').textContent = mapLabels[section] || section;

  qsa('.nav-item[data-section]').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  const subItems = qsa('.nav-sub .nav-item');
  subItems.forEach(i => i.classList.toggle('active', i.dataset.section === section));

  const renderers = {
    dashboard: renderDashboard,
    galpones: renderGalpones,
    molino: renderMolino,
    'almacen-huevos': renderAlmacenHuevos,
    'almacen-insumos': renderAlmacenInsumos,
    compras: renderCompras,
    ventas: renderVentas,
    reportes: renderReportes,
    configuracion: renderConfiguracion,
  };
  const fn = renderers[section];
  if (fn) fn();
  else $('content').innerHTML = '<p>Sección no disponible</p>';

  if (window.innerWidth <= 768) $('sidebar').classList.remove('open');
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  if (!supabaseAuth) abrirModalAutenticacion();

  $('hamburger').addEventListener('click', () => $('sidebar').classList.toggle('open'));
  $('btnLogout').addEventListener('click', cerrarSesion);

  document.querySelectorAll('.nav-item[data-section]').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.nextElementSibling?.classList.contains('nav-sub')) {
        const arrow = el.querySelector('.arrow');
        if (arrow) arrow.classList.toggle('open');
        el.nextElementSibling.classList.toggle('open');
      }
      const section = el.dataset.section;
      if (section && !el.closest('.nav-sub') && el.nextElementSibling?.classList.contains('nav-sub')) return;
      if (section) navegar(section);
    });
  });

  document.querySelectorAll('.nav-sub .nav-item').forEach(el => {
    el.addEventListener('click', () => {
      if (el.dataset.section) navegar(el.dataset.section);
    });
  });
});

// --- DASHBOARD ---
async function renderDashboard() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando dashboard...</div>';
  try {
    const data = await api('/reportes/dashboard');
    const alertas = await api('/alertas');
    vaciar(c);

    // Alertas
    if (alertas.length) {
      const alertsDiv = crearEl('div', { style: { marginBottom: '16px' } });
      alertas.forEach(a => {
        const tipo = a.tipo === 'critico' ? 'alert-critical' : a.tipo === 'advertencia' ? 'alert-warning' : 'alert-info';
        alertsDiv.appendChild(crearEl('div', { className: `alert-card ${tipo}` }, [
          crearEl('span', { className: 'alert-icon' }, [a.icono || '📌']),
          crearEl('span', {}, [a.mensaje]),
        ]));
      });
      c.appendChild(alertsDiv);
    }

    // Stats
    const stats = [
      { icon: '🐔', label: 'Gallinas Vivas', value: (data.gallinas_vivas || 0).toLocaleString(), bg: 'bg-blue' },
      { icon: '🥚', label: 'Producción Hoy', value: num(data.produccion_hoy) + ' jabas', bg: 'bg-green' },
      { icon: '📦', label: 'Stock Huevos', value: num(data.stock_huevos) + ' jabas', bg: 'bg-orange' },
      { icon: '🌾', label: 'Stock Alimento', value: num(data.stock_alimento) + ' kg', bg: 'bg-blue' },
      { icon: '💰', label: 'Ventas Hoy', value: num(data.ventas_hoy) + ' jabas', bg: 'bg-green' },
      { icon: '💀', label: 'Mortalidad Hoy', value: (data.mortalidad_hoy || 0) + ' aves', bg: 'bg-red' },
    ];
    const grid = crearEl('div', { className: 'stats-grid' });
    stats.forEach(s => {
      grid.appendChild(crearEl('div', { className: 'stat-card' }, [
        crearEl('div', { className: `stat-icon ${s.bg}` }, [s.icon]),
        crearEl('div', { className: 'stat-info' }, [
          crearEl('div', { className: 'stat-label' }, [s.label]),
          crearEl('div', { className: 'stat-value' }, [s.value]),
        ]),
      ]));
    });
    c.appendChild(grid);

    // Charts row
    const chartsDiv = crearEl('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' } });
    chartsDiv.appendChild(crearChartCard('Producción Semanal', data.produccion_semanal, 'jabas', '#1a73e8'));
    chartsDiv.appendChild(crearChartCard('Ventas Mensuales', data.ventas_mensual, 'jabas', '#34a853'));
    chartsDiv.appendChild(crearChartCard('Consumo Alimento', data.consumo_alimento, 'kg', '#fbbc04'));
    c.appendChild(chartsDiv);

  } catch { c.innerHTML = '<div class="card">Error al cargar dashboard</div>'; }
}

function crearChartCard(titulo, datos, label, color) {
  const max = Math.max(...(datos?.map(d => parseFloat(d.jabas || d.kg || 0)) || [1]), 1);
  const card = crearEl('div', { className: 'card' }, [
    crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, [titulo])]),
  ]);
  if (!datos?.length) { card.appendChild(crearEl('p', { style: { color: 'var(--text2)', fontSize: '12px' } }, ['Sin datos'])); return card; }
  const barsWrap = crearEl('div', { className: 'chart-bars' });
  datos.forEach(d => {
    const val = parseFloat(d.jabas || d.kg || 0);
    const pct = Math.max((val / max) * 100, 2);
    const wrap = crearEl('div', { className: 'chart-bar-wrap' }, [
      crearEl('div', { className: 'chart-bar', style: { height: pct + '%', backgroundColor: color } }, [
        val > 0 ? crearEl('div', { className: 'chart-val' }, [num(val)]) : null,
      ]),
      crearEl('div', { className: 'chart-label' }, [d.fecha ? formatearFecha(d.fecha)?.slice(0,5) : '']),
    ]);
    barsWrap.appendChild(wrap);
  });
  card.appendChild(barsWrap);
  card.appendChild(crearEl('div', { style: { textAlign: 'right', fontSize: '11px', color: 'var(--text3)' } }, [label]));
  return card;
}

// --- GALPONES ---
async function renderGalpones() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const galpones = await api('/galpones');
    vaciar(c);

    const header = crearEl('div', { className: 'card-header' }, [
      crearEl('h3', {}, ['Galpones']),
      crearEl('div', { className: 'actions' }, [
        crearEl('button', { className: 'btn btn-primary btn-sm', onClick: () => modalGalpon(null) }, ['+ Nuevo']),
      ]),
    ]);
    c.appendChild(crearEl('div', { className: 'card' }, [header]));

    const grid = crearEl('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' } });
    for (const g of galpones) {
      const sacos = Math.floor((g.alimento_kg || 0) / 50);
      const consSacos = g.consumo_diario || 0;
      const diasAlimento = consSacos > 0 ? Math.floor(sacos / consSacos) : 99;
      const card = crearEl('div', { className: 'card', style: { cursor: 'pointer' }, onClick: () => modalGalponDetalle(g) }, [
        crearEl('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } }, [
          crearEl('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
            crearEl('span', { style: { fontSize: '20px' } }, ['🐔']),
            crearEl('h4', { style: { fontSize: '15px', fontWeight: 600 } }, [g.nombre]),
          ]),
          crearEl('span', { className: g.estado === 'Activo' ? 'chip chip-green' : 'chip chip-orange' }, [g.estado || 'Activo']),
        ]),
        crearEl('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', color: 'var(--text2)' } }, [
          crearEl('div', {}, [`🟢 ${(g.gallinas || 0).toLocaleString()} gallinas`]),
          crearEl('div', {}, [`📅 ${g.edad_lote || 0} días`]),
          crearEl('div', {}, [`🥚 Prod: ${num(g.produccion_promedio)} jabas/día`]),
          crearEl('div', {}, [`🌾 Alim: ${sacos} sacos`]),
          crearEl('div', {}, [`⏱ ${diasAlimento >= 30 ? '✅+' : diasAlimento >= 7 ? '✅' : diasAlimento >= 3 ? '⚠️' : '🔴'} ${diasAlimento} días`]),
        ]),
      ]);
      grid.appendChild(card);
    }
    c.appendChild(grid);
  } catch { c.innerHTML = '<div class="card">Error al cargar galpones</div>'; }
}

function modalGalpon(g) {
  abrirModal('Galpón', [g ? 'Guardar' : 'Crear'], (data) => {
    if (g) return api('/galpones/' + g.id, { method: 'PUT', body: data });
    return api('/galpones', { method: 'POST', body: data });
  }, [
    { label: 'Nombre', name: 'nombre', type: 'text', value: g?.nombre || '', required: true },
    { label: 'Capacidad', name: 'capacidad', type: 'number', value: g?.capacidad || 0 },
    { label: 'Gallinas', name: 'gallinas', type: 'number', value: g?.gallinas || 0 },
    { label: 'Edad Lote (días)', name: 'edad_lote', type: 'number', value: g?.edad_lote || 0 },
    { label: 'Consumo Diario (sacos)', name: 'consumo_diario', type: 'number', value: g?.consumo_diario || 0, step: '0.1' },
    { label: 'Fecha Ingreso', name: 'fecha_ingreso', type: 'date', value: g?.fecha_ingreso || '' },
  ], renderGalpones);
}

async function modalGalponDetalle(g) {
  let data;
  try { data = await api('/galpones/' + g.id); } catch { data = g; }
  abrirModal(`📋 ${data.nombre}`, ['Cerrar', 'Editar'], (action) => {
    if (action === 'Editar') { modalGalpon(data); return Promise.resolve(); }
    return Promise.resolve();
  }, [
    { label: 'Estado', type: 'static', value: data.estado || 'Activo' },
    { label: 'Gallinas Vivas', type: 'static', value: (data.gallinas || 0).toLocaleString() },
    { label: 'Capacidad', type: 'static', value: (data.capacidad || 0).toLocaleString() },
    { label: 'Edad Lote', type: 'static', value: `${data.edad_lote || 0} días` },
    { label: 'Fecha Ingreso', type: 'static', value: formatearFecha(data.fecha_ingreso) },
    { label: 'Alimento', type: 'static', value: `${Math.floor((data.alimento_kg||0)/50)} sacos (${num(data.alimento_kg)} kg)` },
    { label: 'Consumo Diario', type: 'static', value: `${num(data.consumo_diario)} sacos (${num((data.consumo_diario||0)*50)} kg)` },
    { label: 'Prod. Promedio', type: 'static', value: `${num(data.produccion_promedio)} jabas/día` },
  ], null, '480px');
}

// --- MOLINO ---
async function renderMolino() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const [formulas, producciones, stockAlim] = await Promise.all([
      api('/formulas'), api('/molino'), api('/molino/stock-alimento'),
    ]);
    vaciar(c);

    // Fabricar form
    const formCard = crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Fabricar Alimento'])]),
      crearEl('div', { className: 'form-grid' }, [
        crearEl('div', { className: 'form-group' }, [
          crearEl('label', {}, ['Fecha']),
          crearEl('input', { id: 'molinoFecha', type: 'date', value: hoy() }),
        ]),
        crearEl('div', { className: 'form-group' }, [
          crearEl('label', {}, ['Fórmula']),
          crearEl('select', { id: 'molinoFormula' }, [
            crearEl('option', { value: '' }, ['Seleccione...']),
            ...formulas.map(f => crearEl('option', { value: f.id }, [f.nombre])),
          ]),
        ]),
        crearEl('div', { className: 'form-group' }, [
          crearEl('label', {}, ['Tandas']),
          crearEl('input', { id: 'molinoTandas', type: 'number', value: '1', min: '0.1', step: '0.1' }),
        ]),
      ]),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-green', onClick: fabricarAlimento }, ['🌾 Fabricar']),
      ]),
    ]);
    c.appendChild(formCard);

    // Stock Alimento
    if (stockAlim.length) {
      const stockCard = crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Stock Alimento en Galpones'])]),
        crearEl('div', { className: 'table-wrap' }, [
          crearEl('table', {}, [
            crearEl('thead', {}, [crearEl('tr', {}, ['Galpón','Stock (kg)','Consumo/día','Días restantes','Barra'].map(h => crearEl('th', {}, [h])))]),
            crearEl('tbody', {}, stockAlim.map(g => {
              const sacosStock = Math.floor((g.kg || 0) / 50);
              const consSacos = g.consumo_diario || 0;
              const dias = consSacos > 0 ? Math.floor(sacosStock / consSacos) : 99;
              const maxRef = Math.max(...stockAlim.map(s => s.kg || 0), 1);
              const pct = Math.min(((g.kg || 0) / maxRef) * 100, 100);
              return crearEl('tr', {}, [
                crearEl('td', {}, [g.nombre]),
                crearEl('td', {}, [`${sacosStock} sacos`]),
                crearEl('td', {}, [`${num(g.consumo_diario)} sacos`]),
                crearEl('td', {}, [crearEl('span', { className: dias >= 7 ? 'chip chip-green' : dias >= 3 ? 'chip chip-orange' : 'chip chip-red' }, [dias + ' días'])]),
                crearEl('td', {}, [
                  crearEl('div', { className: 'kg-bar-wrap' }, [
                    crearEl('div', { className: 'kg-bar-bg' }, [crearEl('div', { className: 'kg-bar-fill', style: { width: pct + '%', backgroundColor: dias >= 7 ? 'var(--green)' : dias >= 3 ? 'var(--orange)' : 'var(--red)' } })]),
                  ]),
                ]),
              ]);
            })),
          ]),
        ]),
      ]);
      c.appendChild(stockCard);
    }

    // Historial
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Historial de Producción'])]),
      crearEl('div', { className: 'table-wrap' }, [
        crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Fórmula','Tandas','Kg Producidos','Costo'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, producciones.length ? producciones.map(p => crearEl('tr', {}, [
            crearEl('td', {}, [formatearFecha(p.fecha)]),
            crearEl('td', {}, [p.formula_nombre || '-']),
            crearEl('td', {}, [num(p.tandas)]),
            crearEl('td', {}, [num(p.kg_producidos)]),
            crearEl('td', {}, ['S/ ' + num(p.costo)]),
          ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '5', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin registros'])])]),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar molino</div>'; }
}

async function fabricarAlimento() {
  const fecha = $('molinoFecha')?.value || hoy();
  const formula_id = parseInt($('molinoFormula')?.value);
  const tandas = parseFloat($('molinoTandas')?.value);
  if (!formula_id) return mostrarMensaje('Seleccione una fórmula', 'warning');
  if (!tandas || tandas <= 0) return mostrarMensaje('Ingrese cantidad de tandas', 'warning');
  try {
    await api('/molino/producir', { method: 'POST', body: { fecha, formula_id, tandas } });
    mostrarMensaje('Alimento fabricado exitosamente', 'success');
    renderMolino();
  } catch { }
}

// --- ALMACEN HUEVOS ---
async function renderAlmacenHuevos() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const data = await api('/almacen/huevos');
    vaciar(c);

    // Stock actual
    const stock = data.stock || {};
    let totalJabas = 0;
    const statsGrid = crearEl('div', { className: 'stats-grid' });
    Object.entries(stock).forEach(([clase, cant]) => {
      const c = parseFloat(cant) || 0;
      totalJabas += c;
      statsGrid.appendChild(crearEl('div', { className: 'stat-card' }, [
        crearEl('div', { className: 'stat-icon bg-blue' }, ['🥚']),
        crearEl('div', { className: 'stat-info' }, [
          crearEl('div', { className: 'stat-label' }, [clase]),
          crearEl('div', { className: 'stat-value' }, [num(c)]),
        ]),
      ]));
    });
    statsGrid.appendChild(crearEl('div', { className: 'stat-card', style: { background: 'var(--primary-light)', border: '2px solid var(--primary)' } }, [
      crearEl('div', { className: 'stat-icon bg-blue' }, ['📦']),
      crearEl('div', { className: 'stat-info' }, [
        crearEl('div', { className: 'stat-label', style: { fontWeight: 700 } }, ['TOTAL JABAS']),
        crearEl('div', { className: 'stat-value', style: { fontSize: '24px', fontWeight: 700 } }, [num(totalJabas)]),
      ]),
    ]));
    c.appendChild(statsGrid);

    // Clasificación
    const stockSegunda = parseFloat(stock['Segunda'] || 0);
    const clasifCard = crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Clasificar Segunda'])]),
      crearEl('div', { style: { marginBottom: '12px' } }, [
        crearEl('span', { className: 'chip chip-orange' }, [`Disponible: ${num(stockSegunda)} jabas`]),
      ]),
      crearEl('div', { className: 'form-grid' }, [
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Fecha']), crearEl('input', { id: 'clasifFecha', type: 'date', value: hoy() })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Pardo']), crearEl('input', { id: 'clasifPardo', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Jumbo']), crearEl('input', { id: 'clasifJumbo', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Sucio']), crearEl('input', { id: 'clasifSucio', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Limpieza']), crearEl('input', { id: 'clasifLimpieza', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Quiñados']), crearEl('input', { id: 'clasifQuinados', type: 'number', value: '0', min: '0', step: '0.5' })]),
      ]),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-primary', onClick: clasificarSegunda }, ['Clasificar']),
      ]),
    ]);
    if (stockSegunda > 0) c.appendChild(clasifCard);

    // Producción
    const prod = await api('/produccion');
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Registrar Producción'])]),
      crearEl('div', { className: 'form-grid' }, [
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Fecha']), crearEl('input', { id: 'prodFecha', type: 'date', value: hoy() })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Galpón']), crearEl('select', { id: 'prodGalpon' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Jabas Primera']), crearEl('input', { id: 'prodPrimera', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Jabas Segunda']), crearEl('input', { id: 'prodSegunda', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Gallinas Muertas']), crearEl('input', { id: 'prodMuertas', type: 'number', value: '0', min: '0' })]),
      ]),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-green', onClick: registrarProduccion }, ['🥚 Registrar']),
      ]),
    ]));

    // Cargar galpones
    try {
      const galpones = await api('/galpones');
      const sel = $('prodGalpon');
      if (sel) {
        sel.innerHTML = '<option value="">Seleccione...</option>' + galpones.map(g => `<option value="${g.id}">${g.nombre}</option>`).join('');
      }
    } catch {}

    // Movimientos recientes
    const movs = await api('/almacen/movimientos');
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Movimientos Recientes'])]),
      crearEl('div', { className: 'table-wrap' }, [
        crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Tipo','Detalle','Primera','Segunda'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, movs.slice(0,30).map(m => crearEl('tr', {}, [
            crearEl('td', {}, [formatearFecha(m.fecha)]),
            crearEl('td', {}, [crearEl('span', { className: m.tipo === 'Ingreso' ? 'chip chip-green' : m.tipo === 'Venta' ? 'chip chip-red' : 'chip chip-orange' }, [m.tipo])]),
            crearEl('td', {}, [m.detalle || '-']),
            crearEl('td', {}, [num(m.primera)]),
            crearEl('td', {}, [num(m.segunda)]),
          ]))),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar almacén</div>'; }
}

async function registrarProduccion() {
  const fecha = $('prodFecha')?.value || hoy();
  const galpon_id = parseInt($('prodGalpon')?.value);
  const primera = parseFloat($('prodPrimera')?.value) || 0;
  const segunda = parseFloat($('prodSegunda')?.value) || 0;
  const muertas = parseInt($('prodMuertas')?.value) || 0;
  if (!galpon_id) return mostrarMensaje('Seleccione un galpón', 'warning');
  if (primera <= 0 && segunda <= 0) return mostrarMensaje('Ingrese al menos 1 jaba', 'warning');
  try {
    await api('/produccion', { method: 'POST', body: { fecha, galpon_id, primera, segunda, muertas } });
    mostrarMensaje('Producción registrada', 'success');
    renderAlmacenHuevos();
  } catch {}
}

async function clasificarSegunda() {
  const fecha = $('clasifFecha')?.value || hoy();
  const pardo = parseFloat($('clasifPardo')?.value) || 0;
  const jumbo = parseFloat($('clasifJumbo')?.value) || 0;
  const sucio = parseFloat($('clasifSucio')?.value) || 0;
  const limpieza = parseFloat($('clasifLimpieza')?.value) || 0;
  const quinados = parseFloat($('clasifQuinados')?.value) || 0;
  const total = pardo + jumbo + sucio + limpieza + quinados;
  if (total <= 0) return mostrarMensaje('Ingrese al menos 1 jaba clasificada', 'warning');
  try {
    await api('/almacen/clasificar', { method: 'PUT', body: { fecha, pardo, jumbo, sucio, limpieza, quinados } });
    mostrarMensaje('Clasificación guardada', 'success');
    renderAlmacenHuevos();
  } catch {}
}

// --- ALMACEN INSUMOS ---
async function renderAlmacenInsumos() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const insumos = await api('/insumos');
    vaciar(c);
    c.appendChild(crearEl('div', { className: 'card-header' }, [
      crearEl('h3', {}, ['Inventario de Insumos']),
    ]));
    const maxRef = Math.max(...insumos.map(i => i.cantidad_kg || 0), 1);
    c.appendChild(crearEl('div', { className: 'table-wrap' }, [
      crearEl('table', {}, [
        crearEl('thead', {}, [crearEl('tr', {}, ['Producto','Stock','Unidad','Stock Mínimo','Barra','Última Compra','Última Salida'].map(h => crearEl('th', {}, [h])))]),
        crearEl('tbody', {}, insumos.map(i => {
          const pct = Math.min(((i.cantidad_kg || 0) / maxRef) * 100, 100);
          const critico = (i.cantidad_kg || 0) < (i.stock_minimo_kg || 0);
          return crearEl('tr', {}, [
            crearEl('td', { style: { fontWeight: 500 } }, [i.nombre]),
            crearEl('td', {}, [crearEl('span', { className: critico ? 'chip chip-red' : '' }, [num(i.cantidad_kg)])]),
            crearEl('td', {}, [i.etiqueta || 'Kg']),
            crearEl('td', {}, [num(i.stock_minimo_kg)]),
            crearEl('td', {}, [
              crearEl('div', { className: 'kg-bar-wrap' }, [
                crearEl('div', { className: 'kg-bar-bg' }, [crearEl('div', { className: 'kg-bar-fill', style: { width: pct + '%', backgroundColor: critico ? 'var(--red)' : pct < 30 ? 'var(--orange)' : 'var(--green)' } })]),
              ]),
            ]),
            crearEl('td', {}, [formatearFecha(i.ultima_compra)]),
            crearEl('td', {}, [formatearFecha(i.ultima_salida)]),
          ]);
        })),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar insumos</div>'; }
}

// --- COMPRAS ---
async function renderCompras() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const [compras, proveedores, insumos] = await Promise.all([
      api('/compras'), api('/proveedores'), api('/insumos'),
    ]);
    vaciar(c);

    // Nueva compra
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Nueva Compra'])]),
      crearEl('div', { className: 'form-grid' }, [
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Fecha']), crearEl('input', { id: 'compraFecha', type: 'date', value: hoy() })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Proveedor']), crearEl('select', { id: 'compraProveedor' }, [
          crearEl('option', { value: '' }, ['Seleccione...']),
          ...proveedores.map(p => crearEl('option', { value: p.id, label: p.nombre }, [p.nombre])),
        ])]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Insumo']), crearEl('select', { id: 'compraInsumo' }, [
          crearEl('option', { value: '' }, ['Seleccione...']),
          ...insumos.map(i => crearEl('option', { value: i.id, label: i.nombre }, [i.nombre])),
        ])]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Cantidad']), crearEl('input', { id: 'compraCantidad', type: 'number', value: '1', min: '0.01', step: '0.01' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Precio Unit.']), crearEl('input', { id: 'compraPrecio', type: 'number', value: '0', min: '0', step: '0.01' })]),
      ]),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-green', onClick: registrarCompra }, ['🛒 Registrar Compra']),
      ]),
    ]));

    // Historial
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Historial de Compras'])]),
      crearEl('div', { className: 'table-wrap' }, [
        crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Proveedor','Insumo','Cantidad','P.Unit.','Total'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, compras.length ? compras.map(cp => crearEl('tr', {}, [
            crearEl('td', {}, [formatearFecha(cp.fecha)]),
            crearEl('td', {}, [cp.proveedor_nombre || '-']),
            crearEl('td', {}, [cp.insumo_nombre || '-']),
            crearEl('td', {}, [num(cp.cantidad)]),
            crearEl('td', {}, ['S/ ' + num(cp.precio_unitario)]),
            crearEl('td', {}, ['S/ ' + num(cp.total)]),
          ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '6', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin registros'])])]),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar compras</div>'; }
}

async function registrarCompra() {
  const fecha = $('compraFecha')?.value || hoy();
  const proveedor_id = parseInt($('compraProveedor')?.value);
  const insumo_id = parseInt($('compraInsumo')?.value);
  const cantidad = parseFloat($('compraCantidad')?.value);
  const precio_unitario = parseFloat($('compraPrecio')?.value) || 0;
  if (!proveedor_id || !insumo_id) return mostrarMensaje('Complete todos los campos', 'warning');
  if (!cantidad || cantidad <= 0) return mostrarMensaje('Ingrese cantidad válida', 'warning');
  const proveedor = $('compraProveedor')?.selectedOptions[0]?.text || '';
  const insumo = $('compraInsumo')?.selectedOptions[0]?.text || '';
  try {
    await api('/compras', { method: 'POST', body: { fecha, proveedor_id, proveedor_nombre: proveedor, insumo_id, insumo_nombre: insumo, cantidad, precio_unitario } });
    mostrarMensaje('Compra registrada', 'success');
    renderCompras();
  } catch {}
}

// --- VENTAS ---
async function renderVentas() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const [ventas, clientes, params] = await Promise.all([
      api('/ventas'), api('/clientes'), api('/configuracion/parametros'),
    ]);
    vaciar(c);

    const pesoJaba = parseFloat((params.find(p => p.clave === 'peso_jaba_kg') || {}).valor) || 18;
    ventaPesoJaba = pesoJaba;

    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Nueva Venta'])]),
      crearEl('div', { className: 'form-grid' }, [
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Fecha']), crearEl('input', { id: 'ventaFecha', type: 'date', value: hoy() })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Cliente']), crearEl('select', { id: 'ventaCliente' }, [
          crearEl('option', { value: '' }, ['Seleccione...']),
          ...clientes.map(c => crearEl('option', { value: c.id, label: c.nombre }, [c.nombre])),
        ])]),
      ]),
      crearEl('div', { className: 'form-grid', style: { gap: '8px', marginTop: '8px' } }, [
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Precio x kg PRIMERA']), crearEl('input', { id: 'precioPrimera', type: 'number', value: '4.50', min: '0', step: '0.01', onInput: calcVenta })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Precio x kg SEGUNDA (Pardo, Jumbo, Sucio, Quiñados)']), crearEl('input', { id: 'precioSegunda', type: 'number', value: '3.50', min: '0', step: '0.01', onInput: calcVenta })]),
      ]),
      crearEl('div', { className: 'table-wrap', style: { marginTop: '8px' } }, [crearEl('table', {}, [
        crearEl('thead', {}, [crearEl('tr', {}, ['Categoría','Tipo','Jabas','Subtotal'].map(h => crearEl('th', {}, [h])))]),
        crearEl('tbody', {}, [
          crearEl('tr', {}, [
            crearEl('td', { style: { fontWeight: 600, background: 'var(--primary-light)' } }, ['PRIMERA']),
            crearEl('td', { style: { fontWeight: 500 } }, ['Primera']),
            crearEl('td', {}, [crearEl('input', { id: 'venta_primera', type: 'number', value: '0', min: '0', step: '0.5', style: { width: '80px' }, onInput: calcVenta })]),
            crearEl('td', { id: 'ventaSub_primera', style: { fontWeight: 600 } }, ['S/ 0.00']),
          ]),
          ...['pardo','jumbo','sucio','quinados'].map((k,i) => crearEl('tr', {}, [
            i === 0 ? crearEl('td', { rowspan: '4', style: { fontWeight: 600, background: 'var(--orange-light)' } }, ['SEGUNDA']) : null,
            crearEl('td', { style: { fontWeight: 500 } }, [{pardo:'Pardo',jumbo:'Jumbo',sucio:'Sucio',quinados:'Quiñados'}[k]]),
            crearEl('td', {}, [crearEl('input', { id: 'venta_'+k, type: 'number', value: '0', min: '0', step: '0.5', style: { width: '80px' }, onInput: calcVenta })]),
            crearEl('td', { id: 'ventaSub_'+k, style: { fontWeight: 600 } }, ['S/ 0.00']),
          ])),
        ]),
      ])]),
      crearEl('div', { id: 'ventaResumen', style: { marginTop: '12px', padding: '12px', background: 'var(--primary-light)', borderRadius: '8px', display: 'flex', gap: '24px', fontSize: '14px' } }, [
        crearEl('span', {}, ['Total Jabas: <strong id="ventaTotalJabas">0.00</strong>']),
        crearEl('span', {}, ['Peso: <strong id="ventaPeso">0.00</strong> kg']),
        crearEl('span', {}, ['Importe: S/ <strong id="ventaImporte">0.00</strong>']),
      ]),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-green', onClick: registrarVenta }, ['💰 Registrar Venta']),
      ]),
    ]));

    // Historial
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Historial de Ventas'])]),
      crearEl('div', { className: 'table-wrap' }, [
        crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Cliente','Jabas','Peso (kg)','Total'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, ventas.length ? ventas.map(v => crearEl('tr', {}, [
            crearEl('td', {}, [formatearFecha(v.fecha)]),
            crearEl('td', {}, [v.cliente_nombre || '-']),
            crearEl('td', {}, [num(v.total_jabas)]),
            crearEl('td', {}, [num(v.peso)]),
            crearEl('td', {}, ['S/ ' + num(v.total)]),
          ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '5', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin registros'])])]),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar ventas</div>'; }
}

let ventaPesoJaba = 18;

function calcVenta() {
  const pp = parseFloat($('precioPrimera')?.value) || 0;
  const ps = parseFloat($('precioSegunda')?.value) || 0;
  const grupos = [['primera',pp],['pardo','jumbo','sucio','quinados',ps]];
  let totalJabas = 0, totalImporte = 0;
  grupos.forEach(([t1,t2,t3,t4,t5,precio]) => {
    [t1,t2,t3,t4,t5].filter(Boolean).forEach(k => {
      const jab = parseFloat($('venta_'+k)?.value) || 0;
      totalJabas += jab;
      const kg = jab * ventaPesoJaba;
      const sub = kg * precio;
      totalImporte += sub;
      const el = $('ventaSub_'+k);
      if (el) el.innerHTML = 'S/ ' + num(sub);
    });
  });
  const peso = totalJabas * ventaPesoJaba;
  $('ventaTotalJabas').innerHTML = num(totalJabas);
  $('ventaPeso').innerHTML = num(peso);
  $('ventaImporte').innerHTML = num(totalImporte);
}

async function registrarVenta() {
  const fecha = $('ventaFecha')?.value || hoy();
  const cliente_id = parseInt($('ventaCliente')?.value);
  if (!cliente_id) return mostrarMensaje('Seleccione un cliente', 'warning');
  const pp = parseFloat($('precioPrimera')?.value) || 0;
  const ps = parseFloat($('precioSegunda')?.value) || 0;
  const body = { fecha, cliente_id, cliente_nombre: $('ventaCliente')?.selectedOptions[0]?.text || '', precio_primera: pp, precio_segunda: ps };
  let totalJabas = 0, totalImporte = 0;
  const grupos = [['primera',pp],['pardo','jumbo','sucio','quinados',ps]];
  grupos.forEach(([t1,t2,t3,t4,t5,precio]) => {
    [t1,t2,t3,t4,t5].filter(Boolean).forEach(k => {
      const jab = parseFloat($('venta_'+k)?.value) || 0;
      body[k] = jab;
      totalJabas += jab;
      totalImporte += jab * ventaPesoJaba * precio;
    });
  });
  if (totalJabas <= 0) return mostrarMensaje('Debe vender al menos 1 jaba', 'warning');
  try {
    await api('/ventas', { method: 'POST', body });
    mostrarMensaje('Venta registrada', 'success');
    renderVentas();
  } catch {}
}

// --- REPORTES ---
let reportesTab = 'produccion';

async function renderReportes() {
  const c = $('content'); vaciar(c);
  c.appendChild(crearEl('div', { className: 'tabs', id: 'reportesTabs' }, [
    'produccion','ventas','inventario','molino','galpones','mortalidad'
  ].map(t => crearEl('div', { className: `tab ${t === reportesTab ? 'active' : ''}`, dataset: { reporte: t }, onClick: () => { reportesTab = t; renderReportes(); } }, [t.charAt(0).toUpperCase() + t.slice(1)]))));

  const filterDiv = crearEl('div', { className: 'filter-row' }, [
    crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Desde']), crearEl('input', { id: 'repDesde', type: 'date', value: diasAtras(30) })]),
    crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Hasta']), crearEl('input', { id: 'repHasta', type: 'date', value: hoy() })]),
    crearEl('button', { className: 'btn btn-outline btn-sm', onClick: renderReporteData }, ['Filtrar']),
  ]);
  c.appendChild(filterDiv);

  const dataDiv = crearEl('div', { id: 'reporteData' });
  c.appendChild(dataDiv);
  renderReporteData();
}

async function renderReporteData() {
  const div = $('reporteData'); if (!div) return;
  div.innerHTML = '<div class="card">Cargando...</div>';
  const desde = $('repDesde')?.value || diasAtras(30);
  const hasta = $('repHasta')?.value || hoy();
  try {
    const data = await api(`/reportes/${reportesTab}?desde=${desde}&hasta=${hasta}`);
    vaciar(div);

    if (reportesTab === 'produccion') {
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearTabla(['Fecha','Galpón','Primera','Segunda','Total','Muertas'], data.map(p => [formatearFecha(p.fecha), p.galpon_nombre||'-', num(p.primera), num(p.segunda), num((p.primera||0)+(p.segunda||0)), p.muertas||0]))]));
    } else if (reportesTab === 'ventas') {
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearTabla(['Fecha','Cliente','Jabas','Peso','Total'], data.map(v => [formatearFecha(v.fecha), v.cliente_nombre||'-', num(v.total_jabas), num(v.peso), 'S/ '+num(v.total)]))]));
    } else if (reportesTab === 'inventario') {
      const huevos = data.huevos || [];
      div.appendChild(crearEl('h4', { style: { fontSize: '13px', marginBottom: '8px' } }, ['Stock Huevos']));
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearTabla(['Clase','Jabas'], huevos.map(h => [h.clase, num(h.stock)]))]));
      div.appendChild(crearEl('h4', { style: { fontSize: '13px', margin: '16px 0 8px' } }, ['Stock Insumos']));
      div.appendChild(crearEl('div', { className: 'table-wrap', style: { marginTop: '8px' } }, [crearTabla(['Producto','Stock (kg)','Stock Mínimo'], data.insumos?.map(i => [i.nombre, num(i.cantidad_kg), num(i.stock_minimo_kg)]) || [])]));
    } else if (reportesTab === 'molino') {
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearTabla(['Fecha','Fórmula','Tandas','Kg','Costo'], data.map(m => [formatearFecha(m.fecha), m.formula_nombre||'-', num(m.tandas), num(m.kg_producidos), 'S/ '+num(m.costo)]))]));
    } else if (reportesTab === 'galpones') {
      for (const g of data) {
        const card = crearEl('div', { className: 'card' }, [
          crearEl('h4', { style: { fontSize: '14px', marginBottom: '8px' } }, [`${g.nombre} — ${(g.gallinas||0).toLocaleString()} gallinas, Mortalidad: ${g.mortalidad||0}`]),
          crearEl('div', { className: 'table-wrap' }, [crearTabla(['Fecha','Primera','Segunda','Muertas'], (g.produccion||[]).map(p => [formatearFecha(p.fecha), num(p.primera), num(p.segunda), p.muertas||0]))]),
        ]);
        div.appendChild(card);
      }
    } else if (reportesTab === 'mortalidad') {
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearTabla(['Fecha','Galpón','Muertas'], data.map(m => [formatearFecha(m.fecha), m.galpon_nombre||'-', m.muertas||0]))]));
    }
  } catch { div.innerHTML = '<div class="card">Error al cargar reporte</div>'; }
}

function crearTabla(headers, rows) {
  return crearEl('table', {}, [
    crearEl('thead', {}, [crearEl('tr', {}, headers.map(h => crearEl('th', {}, [h])))]),
    crearEl('tbody', {}, rows.length ? rows.map(r => crearEl('tr', {}, r.map(c => crearEl('td', {}, [c != null ? String(c) : '-'])))) : [crearEl('tr', {}, [crearEl('td', { colspan: String(headers.length), style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin datos'])])]),
  ]);
}

// --- CONFIGURACION ---
let configTab = 'usuarios';

async function renderConfiguracion() {
  const c = $('content'); vaciar(c);
  c.appendChild(crearEl('div', { className: 'tabs', id: 'configTabs' }, [
    ['usuarios','Usuarios'],['empresa','Empresa'],['parametros','Parámetros'],['formulas','Fórmulas'],['clientes','Clientes']
  ].map(([k, v]) => crearEl('div', { className: `tab ${k === configTab ? 'active' : ''}`, onClick: () => { configTab = k; renderConfiguracion(); } }, [v]))));
  if (configTab === 'usuarios') {
    try {
      const usuarios = await api('/configuracion/usuarios');
      c.appendChild(crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Usuarios']), crearEl('div', { className: 'actions' }, [crearEl('button', { className: 'btn btn-primary btn-sm', onClick: () => modalUsuario(null) }, ['+ Nuevo'])])]),
        crearEl('div', { className: 'table-wrap' }, [crearTabla(['Usuario','Rol','Empleado','Activo'], usuarios.map(u => [u.usuario, u.rol, u.empleado_nombre||'-', u.activo ? '✅' : '❌']))]),
      ]));
    } catch {}
  } else if (configTab === 'empresa') {
    try {
      const emp = await api('/configuracion/empresa');
      c.appendChild(crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Datos de la Empresa'])]),
        crearEl('div', { className: 'form-grid' }, [
          crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Nombre']), crearEl('input', { id: 'empNombre', value: emp?.nombre || '' })]),
          crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['RUC']), crearEl('input', { id: 'empRuc', value: emp?.ruc || '' })]),
          crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Dirección']), crearEl('input', { id: 'empDireccion', value: emp?.direccion || '' })]),
          crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Teléfono']), crearEl('input', { id: 'empTelefono', value: emp?.telefono || '' })]),
        ]),
        crearEl('button', { className: 'btn btn-primary', style: { marginTop: '12px' }, onClick: guardarEmpresa }, ['Guardar']),
      ]));
    } catch {}
  } else if (configTab === 'parametros') {
    try {
      const params = await api('/configuracion/parametros');
      c.appendChild(crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Parámetros del Sistema'])]),
        crearEl('div', { className: 'table-wrap' }, [crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Clave','Valor','Descripción','Acción'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, params.map(p => crearEl('tr', {}, [
            crearEl('td', { style: { fontWeight: 500 } }, [p.clave]),
            crearEl('td', {}, [p.valor]),
            crearEl('td', { style: { color: 'var(--text2)', fontSize: '12px' } }, [p.descripcion||'']),
            crearEl('td', {}, [crearEl('button', { className: 'btn btn-outline btn-sm', onClick: () => editarParametro(p) }, ['✏ Editar'])]),
          ]))),
        ])]),
      ]));
    } catch {}
  } else if (configTab === 'formulas') {
    try {
      const formulas = await api('/formulas');
      c.appendChild(crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Fórmulas de Alimento']), crearEl('div', { className: 'actions' }, [crearEl('button', { className: 'btn btn-primary btn-sm', onClick: () => modalFormula(null) }, ['+ Nueva'])])]),
        crearEl('div', { className: 'table-wrap' }, [crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Nombre','Descripción','Acción'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, formulas.map(f => crearEl('tr', {}, [
            crearEl('td', { style: { fontWeight: 500 } }, [f.nombre]),
            crearEl('td', {}, [f.descripcion||'-']),
            crearEl('td', {}, [crearEl('button', { className: 'btn btn-outline btn-sm', onClick: () => modalFormula(f) }, ['✏ Editar'])]),
          ]))),
        ])]),
      ]));
    } catch {}
  } else if (configTab === 'clientes') {
    try {
      const clientes = await api('/clientes');
      c.appendChild(crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Clientes']), crearEl('div', { className: 'actions' }, [crearEl('button', { className: 'btn btn-primary btn-sm', onClick: () => modalCliente(null) }, ['+ Nuevo'])])]),
        crearEl('div', { className: 'table-wrap' }, [crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Nombre','Acción'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, clientes.map(cl => crearEl('tr', {}, [
            crearEl('td', { style: { fontWeight: 500 } }, [cl.nombre]),
            crearEl('td', {}, [crearEl('button', { className: 'btn btn-outline btn-sm', onClick: () => modalCliente(cl) }, ['✏ Editar'])]),
          ]))),
        ])]),
      ]));
    } catch {}
  }
}

async function guardarEmpresa() {
  const body = {
    nombre: $('empNombre')?.value || '',
    ruc: $('empRuc')?.value || '',
    direccion: $('empDireccion')?.value || '',
    telefono: $('empTelefono')?.value || '',
  };
  try {
    await api('/configuracion/empresa', { method: 'PUT', body });
    mostrarMensaje('Datos guardados', 'success');
  } catch {}
}

async function editarParametro(p) {
  abrirModal('Editar: ' + p.clave, ['Guardar'], async (data) => {
    await api('/configuracion/parametros/' + p.id, { method: 'PUT', body: { valor: data.valor } });
    renderConfiguracion();
  }, [
    { label: 'Clave', type: 'static', value: p.clave },
    { label: 'Valor', type: 'text', value: p.valor, required: true },
    { label: 'Descripción', type: 'static', value: p.descripcion || '' },
  ], renderConfiguracion);
}

function modalFormula(f) {
  abrirModal('Fórmula', [f ? 'Guardar' : 'Crear'], async (data) => {
    if (f) return api('/formulas/' + f.id, { method: 'PUT', body: data });
    return api('/formulas', { method: 'POST', body: data });
  }, [
    { label: 'Nombre', name: 'nombre', type: 'text', value: f?.nombre || '', required: true },
    { label: 'Descripción', name: 'descripcion', type: 'text', value: f?.descripcion || '' },
  ], renderConfiguracion);
}

function modalCliente(cl) {
  abrirModal('Cliente', [cl ? 'Guardar' : 'Crear'], async (data) => {
    if (cl) return api('/clientes/' + cl.id, { method: 'PUT', body: data });
    return api('/clientes', { method: 'POST', body: data });
  }, [
    { label: 'Nombre', name: 'nombre', type: 'text', value: cl?.nombre || '', required: true },
  ], renderConfiguracion);
}

function modalUsuario(u) {
  abrirModal('Usuario', [u ? 'Guardar' : 'Crear'], async (data) => {
    if (u) return api('/configuracion/usuarios/' + u.id, { method: 'PUT', body: data });
    return api('/configuracion/usuarios', { method: 'POST', body: data });
  }, [
    { label: 'Usuario', type: 'text', value: u?.usuario || '', required: true },
    { label: 'Contraseña', type: 'password', value: '', required: !u },
    { label: 'Rol', type: 'select', value: u?.rol || 'Producción', options: ['Administrador','Producción','Almacén','Ventas','Gerencia'] },
  ], renderConfiguracion);
}

// --- MODAL UTILITY ---
function abrirModal(titulo, acciones, onSubmit, campos, onClose, width) {
  const overlay = crearEl('div', { className: 'modal-overlay', id: 'modalOverlay', onClick: (e) => { if (e.target === overlay) cerrarModal(); } });
  const modal = crearEl('div', { className: 'modal', style: width ? { maxWidth: width } : {} });
  const inputs = {};

    modal.appendChild(crearEl('h3', {}, [titulo]));

  const fieldId = c => 'modal_' + (c.name || c.label).replace(/[^a-zA-Z0-9_]/g, '_');
  const fieldKey = c => c.name || c.label.toLowerCase().replace(/[^a-z0-9_]/g, '');

  const formGrid = crearEl('div', { className: 'form-grid' });
  for (const c of campos) {
    const grp = crearEl('div', { className: 'form-group' });
    grp.appendChild(crearEl('label', {}, [c.label]));
    if (c.type === 'static') {
      grp.appendChild(crearEl('div', { style: { padding: '8px 0', fontWeight: 500, color: 'var(--text)' } }, [c.value || '-']));
    } else if (c.type === 'select') {
      const sel = crearEl('select', { id: fieldId(c) });
      (c.options || []).forEach(o => sel.appendChild(crearEl('option', { value: o, selected: o === c.value }, [o])));
      grp.appendChild(sel);
    } else {
      const inp = crearEl('input', { type: c.type || 'text', value: c.value ?? '', placeholder: c.label, required: c.required ? '' : undefined, step: c.step, id: fieldId(c) });
      grp.appendChild(inp);
    }
    formGrid.appendChild(grp);
  }
  modal.appendChild(formGrid);

  const actionsDiv = crearEl('div', { className: 'modal-actions' });
  if (acciones.includes('Cerrar') || acciones.some(a => a === 'Cerrar')) {
    actionsDiv.appendChild(crearEl('button', { className: 'btn btn-outline', onClick: cerrarModal }, ['Cerrar']));
  } else {
    actionsDiv.appendChild(crearEl('button', { className: 'btn btn-outline', onClick: cerrarModal }, ['Cancelar']));
  }
  acciones.forEach(a => {
    if (a === 'Cerrar' || a === 'Cancelar') return;
    actionsDiv.appendChild(crearEl('button', { className: 'btn btn-primary', onClick: async () => {
      const data = {};
      for (const c of campos) {
        if (c.type === 'static') { data[fieldKey(c)] = c.value; continue; }
        const el = $(fieldId(c));
        if (el) data[fieldKey(c)] = el.value;
      }
      try {
        if (typeof onSubmit === 'function') {
          const result = await onSubmit(data);
          if (result && result.success === false) return;
        }
        cerrarModal();
        if (typeof onClose === 'function') onClose();
      } catch { }
    } }, [a]));
  });
  modal.appendChild(actionsDiv);

  overlay.appendChild(modal);
  $('modalContainer').appendChild(overlay);
}

function cerrarModal() {
  $('modalOverlay')?.remove();
}
