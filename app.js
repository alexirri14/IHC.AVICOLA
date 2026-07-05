const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const qs = (sel, el) => (el || document).querySelector(sel);
const qsa = (sel, el) => (el || document).querySelectorAll(sel);

// ========== SUPABASE CONFIGURATION ==========
const SUPABASE_URL = 'https://sjyqskmhywykhzjgqegt.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tpjoNczX5hYCDjYpHPng1A_9QZflFbM';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqeXFza21oeXd5a2h6amdxZWd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzEzMjE1NSwiZXhwIjoyMDk4NzA4MTU1fQ.0MPReRVxgu8z2WcIxYX8pM1ucG8y4XK3mA_cE3J-Msw';

// ========== SUPABASE ADMIN API (service_role) ==========
async function adminCreateUser(email, password, metadata) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`, 'apikey': SUPABASE_SERVICE_KEY },
    body: JSON.stringify({ email, password, email_confirm: true, user_metadata: metadata })
  });
  if (!res.ok) { const e = await res.json(); throw new Error(e.msg || 'Error al crear usuario'); }
  return await res.json();
}

async function adminUpdateUser(userId, metadata) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`, 'apikey': SUPABASE_SERVICE_KEY },
    body: JSON.stringify({ user_metadata: metadata })
  });
  if (!res.ok) { const e = await res.json(); throw new Error(e.msg || 'Error al actualizar usuario'); }
  return await res.json();
}

async function adminListUsers() {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    headers: { 'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`, 'apikey': SUPABASE_SERVICE_KEY }
  });
  if (!res.ok) throw new Error('Error al listar usuarios');
  return await res.json();
}

// ========== TOKEN HELPERS ==========
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch { return true; }
}

async function refreshAuthToken() {
  const saved = JSON.parse(localStorage.getItem('supabase.auth.token'));
  if (!saved?.refresh_token) return false;
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
      body: JSON.stringify({ refresh_token: saved.refresh_token })
    });
    if (!response.ok) return false;
    const newSession = await response.json();
    localStorage.setItem('supabase.auth.token', JSON.stringify(newSession));
    authToken = newSession.access_token;
    supabaseAuth = new AuthenticatedSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, authToken);
    return true;
  } catch { return false; }
}

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
        if (response.status === 401 && authToken) {
          const refreshed = await refreshAuthToken();
          if (refreshed) {
            options.headers.Authorization = `Bearer ${authToken}`;
            const retryResponse = await fetch(fullUrl, options);
            if (retryResponse.ok) return await retryResponse.json();
          }
          mostrarMensaje('Sesión expirada. Por favor, inicie sesión nuevamente.', 'error');
          cerrarSesion();
          throw new Error('Sesión expirada');
        }
        const error = await response.text();
        throw new Error(`Supabase error: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      if (error.message !== 'Sesión expirada') {
        mostrarMensaje(`Error de base de datos: ${error.message}`, 'error');
      }
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
        if (response.status === 401 && authToken) {
          const refreshed = await refreshAuthToken();
          if (refreshed) {
            options.headers.Authorization = `Bearer ${authToken}`;
            const retryResponse = await fetch(url, options);
            if (retryResponse.ok) return await retryResponse.json();
          }
          mostrarMensaje('Sesión expirada. Por favor, inicie sesión nuevamente.', 'error');
          cerrarSesion();
          throw new Error('Sesión expirada');
        }
        const error = await response.text();
        throw new Error(`Supabase error: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      if (error.message !== 'Sesión expirada') {
        mostrarMensaje(`Error de base de datos: ${error.message}`, 'error');
      }
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
        if (response.status === 401 && authToken) {
          const refreshed = await refreshAuthToken();
          if (refreshed) {
            options.headers.Authorization = `Bearer ${authToken}`;
            const retryResponse = await fetch(url, options);
            if (retryResponse.ok) return await retryResponse.json();
          }
          mostrarMensaje('Sesión expirada. Por favor, inicie sesión nuevamente.', 'error');
          cerrarSesion();
          throw new Error('Sesión expirada');
        }
        const error = await response.text();
        throw new Error(`Supabase error: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      if (error.message !== 'Sesión expirada') {
        mostrarMensaje(`Error de base de datos: ${error.message}`, 'error');
      }
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
let refreshTimer = null;

// Auth state management
let supabaseAuth = null;
let authToken = null;

function scheduleTokenRefresh() {
  if (refreshTimer) clearTimeout(refreshTimer);
  const saved = JSON.parse(localStorage.getItem('supabase.auth.token'));
  if (!saved?.expires_in) return;
  const refreshMs = Math.max((saved.expires_in - 120) * 1000, 60000);
  refreshTimer = setTimeout(async () => {
    const refreshed = await refreshAuthToken();
    if (refreshed) scheduleTokenRefresh();
  }, refreshMs);
}

(async function initAuth() {
  const savedSession = localStorage.getItem('supabase.auth.token');
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession);
      authToken = parsed.access_token || savedSession;
      if (isTokenExpired(authToken)) {
        const refreshed = await refreshAuthToken();
        if (!refreshed) { localStorage.removeItem('supabase.auth.token'); authToken = null; return; }
      }
      sesion = {
        usuario: parsed.user?.email || parsed.user?.user_metadata?.nombre || 'Usuario',
        rol: parsed.user?.user_metadata?.rol || 'usuario',
        id: parsed.user?.id
      };
      supabaseAuth = new AuthenticatedSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, authToken);
      scheduleTokenRefresh();
      aplicarSesion();
    } catch { localStorage.removeItem('supabase.auth.token'); }
  }
})();

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
  
  scheduleTokenRefresh();
  aplicarSesion();
  mostrarMensaje(`Bienvenido, ${sesion.usuario}`, 'success');
  return session;
}

function signOut() {
  if (refreshTimer) clearTimeout(refreshTimer);
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
      const tabs = { '/galpones':['galpones','id.asc'],'/formulas':['formulas','id.asc'],'/produccion':['vista_produccion_galpon','fecha.desc'],'/insumos':['insumos','nombre.asc'],'/proveedores':['proveedores','nombre.asc'],'/clientes':['clientes','nombre.asc'],'/ventas':['ventas','fecha.desc'] };
      if (tabs[cleanPath]) { const [t,o]=tabs[cleanPath]; return await c.select(t, '*', {}, { order: o }); }
      const m = cleanPath.match(/^\/(\w+)\/(\d+)$/);
      if (m) { const r = await c.select(m[1], '*', { 'id': 'eq.'+m[2] }); return r[0] || null; }

      if (cleanPath === '/alertas') return await c.select('alertas', '*', { activo: 'eq.true' });
      if (cleanPath === '/consumo') return await c.select('consumo_alimento', '*', {}, { order: 'fecha.desc' });
      if (cleanPath === '/molino') return await c.select('vista_produccion_molino_formula', '*', {}, { order: 'fecha.desc' });
      if (cleanPath === '/molino/stock-alimento') return await c.select('vista_stock_alimento');
      if (cleanPath === '/almacen/huevos') { const s=await c.select('stock_huevos'); const o={}; s.forEach(x=>o[x.clase]=x.cantidad); return {stock:o}; }
      if (cleanPath === '/almacen/movimientos') return await c.select('almacen_movimientos', '*', {}, { order: 'fecha.desc' });
      if (cleanPath === '/configuracion/usuarios') return await c.select('usuarios');
      if (cleanPath === '/configuracion/empresa') { const r = await c.select('empresa'); return r[0] || null; }
      if (cleanPath === '/configuracion/parametros') return await c.select('parametros');
      if (cleanPath === '/ingresos') return await c.select('vista_ingreso_insumos');

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
        if (tab==='produccion') return await c.select('vista_produccion_galpon','*',ff,{order:'fecha.desc'});
        if (tab==='ventas') return await c.select('ventas','*',ff,{order:'fecha.desc'});
        if (tab==='inventario') { const [hue,i]=await Promise.all([c.select('stock_huevos'),c.select('insumos')]); return {huevos:hue.map(h=>({...h,stock:h.cantidad})),insumos:i}; }
        if (tab==='molino') return await c.select('vista_produccion_molino_formula','*',ff,{order:'fecha.desc'});
        if (tab==='galpones') { const g=await c.select('galpones'); return await Promise.all(g.map(async g=>{ const p=await c.select('vista_produccion_galpon','*',{galpon_id:'eq.'+g.id,...ff},{order:'fecha.desc'}); const mu=p.reduce((s,x)=>s+(x.muertas||0),0); return {...g,produccion:p,mortalidad:mu}; })); }
        if (tab==='mortalidad') return await c.select('vista_produccion_galpon','*',{muertas:'gt.0',...ff},{order:'fecha.desc'});
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
        const sacos = body.tandas * 30;
        const kg = body.tandas * 1500;
        const r=await c.insert('produccion_molino',{fecha:body.fecha,formula_id:body.formula_id,galpon_id:body.galpon_id||null,tandas:body.tandas,kg_producidos:kg,detalle:body.detalle||null});
        const prodId = r[0]?.id;
        if (prodId && body.insumos?.length) {
          for (const ins of body.insumos) {
            await c.insert('produccion_molino_insumos',{produccion_id:prodId,insumo_id:ins.insumo_id,insumo_nombre:ins.insumo_nombre,cantidad:ins.cantidad});
          }
        }
        await c.rpc('distribuir_alimento',{p_sacos:sacos});
        await c.insert('almacen_movimientos',{fecha:body.fecha,tipo:'Ingreso',detalle:'Producción molino: '+body.tandas+' tandas ('+sacos+' sacos) '+(body.detalle||''),primera:0,segunda:0});
        return r;
      }
      if (cleanPath === '/ingresos') {
        const r=await c.insert('ingreso_insumos',{fecha:body.fecha,proveedor_nombre:body.proveedor_nombre,detalle:body.detalle||null});
        const ingId = r[0]?.id;
        if (ingId && body.items?.length) {
          for (const item of body.items) {
            await c.insert('ingreso_insumos_detalle',{ingreso_id:ingId,insumo_id:item.insumo_id,insumo_nombre:item.insumo_nombre,cantidad:item.cantidad});
            await c.rpc('sumar_insumo',{p_id:item.insumo_id,p_cantidad:item.cantidad,p_fecha:body.fecha});
          }
        }
        return r;
      }
      if (cleanPath === '/ventas') {
        const params=await c.select('parametros');
        const pesoJaba = parseFloat((params.find(p=>p.clave==='peso_jaba_kg')||{}).valor)||18;
        const pp=parseFloat(body.precio_primera)||0;
        const ps=parseFloat(body.precio_segunda)||0;
        const grupos=[{cats:['primera'],precio:pp},{cats:['pardo','jumbo','sucio','quinados'],precio:ps}];
        let tj=0,ti=0;
        grupos.forEach(({cats,precio})=>{
          cats.forEach(k=>{
            const jab=parseFloat(body[k])||0;
            tj+=jab;
            ti+=jab*pesoJaba*precio;
          });
        });
        const r=await c.insert('ventas',{...body,total_jabas:tj,peso:tj*pesoJaba,total:ti});
        for(const k of ['primera','pardo','jumbo','sucio','quinados']){ const v=parseFloat(body[k])||0; if(v>0) await c.rpc('restar_stock',{p_clase:k.charAt(0).toUpperCase()+k.slice(1),p_cantidad:v}); }
        const detMov = Object.entries({primera:body.primera,pardo:body.pardo,jumbo:body.jumbo,sucio:body.sucio,quinados:body.quinados}).filter(([,v])=>parseFloat(v)>0).map(([k,v])=>`${k}: ${v}`).join(', ');
        await c.insert('almacen_movimientos',{fecha:body.fecha,tipo:'Venta',detalle:'Cliente: '+(body.cliente_nombre||'')+' | '+detMov,primera:parseFloat(body.primera||0),segunda:0});
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
      if(cleanPath==='/consumo') return await c.rpc('registrar_consumo',{p_fecha:body.fecha,p_galpon_id:body.galpon_id,p_sacos:body.sacos});
      if(cleanPath==='/almacen/clasificar'){ const{fecha,...cls}=body; for(const[k,v]of Object.entries(cls))if(v>0){ const destino = k==='limpieza'?'Primera':k.charAt(0).toUpperCase()+k.slice(1); await c.insert('clasificacion_huevos',{fecha,clase:k,cantidad:v}); await c.rpc('restar_stock',{p_clase:'Segunda',p_cantidad:v}); await c.rpc('sumar_stock',{p_clase:destino,p_cantidad:v}); await c.insert('almacen_movimientos',{fecha,tipo:'Clasificación',detalle:k+' → '+destino+' ('+v+' jab)',primera:k==='limpieza'?v:0,segunda:k!=='limpieza'?v:0}); } return {success:true}; }
      if(cleanPath==='/configuracion/empresa') return await c.update('empresa',body,{'id':'eq.1'});
    }

    if (method === 'DELETE') {
      const ds = cleanPath.match(/^\/(ventas|produccion|molino|ingresos)\/(\d+)$/);
      if (ds) {
        const tableMap = { ventas:'ventas', produccion:'produccion', molino:'produccion_molino', ingresos:'ingreso_insumos' };
        return await c.delete(tableMap[ds[1]], { 'id': 'eq.'+ds[2] });
      }
      throw new Error('Ruta no implementada: '+method+' '+cleanPath);
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
  if (refreshTimer) clearTimeout(refreshTimer);
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
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','galpones','molino','produccion'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
      $('subInventario').querySelectorAll('.nav-item').forEach(i => i.style.display = 'none');
    } else if (sesion.rol === 'Almacén') {
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','inventario','compras','almacen-huevos','almacen-insumos'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
    } else if (sesion.rol === 'Ventas') {
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','ventas','clientes'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
    } else if (sesion.rol === 'Gerencia') {
      items.forEach(i => { const s = i.dataset.section; if (!['dashboard','reportes'].includes(s) && !i.closest('.nav-sub')) i.style.display = 'none'; });
      $('subInventario').querySelectorAll('.nav-item').forEach(i => i.style.display = 'none');
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
    produccion: 'Producción',
    'almacen-huevos': 'Almacén de Huevos', 'almacen-insumos': 'Almacén de Insumos',
    compras: 'Ingreso de Insumos', ventas: 'Ventas', reportes: 'Reportes', configuracion: 'Configuración',
  };
  $('sectionTitle').textContent = mapLabels[section] || section;

  qsa('.nav-item[data-section]').forEach(i => i.classList.toggle('active', i.dataset.section === section));
  const subItems = qsa('.nav-sub .nav-item');
  subItems.forEach(i => i.classList.toggle('active', i.dataset.section === section));

  const renderers = {
    dashboard: renderDashboard,
    galpones: renderGalpones,
    molino: renderMolino,
    produccion: renderProduccion,
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
      { icon: '🌾', label: 'Stock Alimento', value: num(data.stock_alimento) + ' sacos', bg: 'bg-blue' },
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
    const [galpones, consumos] = await Promise.all([
      api('/galpones'), api('/consumo'),
    ]);
    vaciar(c);

    const header = crearEl('div', { className: 'card-header' }, [
      crearEl('h3', {}, ['Galpones']),
      crearEl('div', { className: 'actions' }, [
        crearEl('button', { className: 'btn btn-primary btn-sm', onClick: () => modalGalpon(null) }, ['+ Nuevo']),
      ]),
    ]);
    c.appendChild(crearEl('div', { className: 'card' }, [header]));

    // Resumen de alimento
    const totalSacos = galpones.reduce((s, g) => s + (g.alimento_sacos || 0), 0);
    const totalGallinas = galpones.reduce((s, g) => s + (g.gallinas || 0), 0);
    c.appendChild(crearEl('div', { style: { display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap', fontSize: '13px' } }, [
      crearEl('span', { className: 'chip chip-blue' }, [`🐔 ${totalGallinas.toLocaleString()} gallinas`]),
      crearEl('span', { className: 'chip chip-green' }, [`🌾 ${totalSacos} sacos totales`]),
    ]));
    if (totalSacos < 30) {
      c.appendChild(crearEl('div', { className: 'card', style: { background: '#fff3cd', border: '1px solid #ffc107', padding: '12px', fontSize: '13px', fontWeight: 600 } }, [
        `⚠️ Alerta: Stock total de alimento bajo (${totalSacos} sacos). Programar producción en Molino.`,
      ]));
    }

    const grid = crearEl('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' } });
    for (const g of galpones) {
      const edadCalc = g.fecha_ingreso ? Math.floor((Date.now() - new Date(g.fecha_ingreso + 'T12:00:00').getTime()) / (86400000)) : 0;
      const sacos = g.alimento_sacos || 0;
      const consSacos = g.consumo_diario || 0;
      const diasAlimento = consSacos > 0 ? Math.floor(sacos / consSacos) : 99;
      const alerta = diasAlimento < 3 ? '🔴' : diasAlimento < 7 ? '⚠️' : '✅';
      const hoy = consumos.find(c => c.galpon_id === g.id && c.fecha === new Date().toISOString().slice(0,10));
      const card = crearEl('div', { className: 'card' }, [
        crearEl('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }, onClick: () => modalGalponDetalle(g), onDblclick: undefined }, [
          crearEl('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' } }, [
            crearEl('span', { style: { fontSize: '20px' } }, ['🐔']),
            crearEl('h4', { style: { fontSize: '15px', fontWeight: 600 } }, [g.nombre]),
          ]),
          crearEl('span', { className: g.estado === 'Activo' ? 'chip chip-green' : 'chip chip-orange' }, [g.estado || 'Activo']),
        ]),
        crearEl('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px', color: 'var(--text2)' } }, [
          crearEl('div', {}, [`🟉 ${(g.gallinas || 0).toLocaleString()} gallinas`]),
          crearEl('div', {}, [`📅 ${edadCalc} días`]),
          crearEl('div', {}, [`🥚 ${num(g.produccion_promedio)} jab/día`]),
          crearEl('div', {}, [`🌾 ${sacos} sacos (${alerta} ${diasAlimento}d)`]),
        ]),
        crearEl('div', { style: { marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' } }, [
          crearEl('input', { id: 'consumo_'+g.id, type: 'number', value: hoy?.sacos_50kg || '', min: '0', step: '1', style: { width: '70px', padding: '4px 6px', fontSize: '13px' }, placeholder: 'Sac.' }),
          crearEl('button', { className: 'btn btn-sm ' + (hoy ? 'btn-outline' : 'btn-primary'), style: { fontSize: '12px', padding: '4px 10px' }, onClick: () => registrarConsumo(g) }, [hoy ? 'Actualizar' : '🌾 Registrar']),
          crearEl('span', { style: { fontSize: '11px', color: 'var(--text3)' } }, ['= ' + num((g.consumo_diario || 0)) + ' sac/día estimado']),
        ]),
      ]);
      grid.appendChild(card);
    }
    c.appendChild(grid);

    // Historial de consumo
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Historial de Consumo de Alimento'])]),
      crearEl('div', { className: 'table-wrap' }, [
        crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Galpón','Sacos (50kg)','Kg','Acción'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, consumos.length ? consumos.slice(0,30).map(con => {
            const galp = galpones.find(g => g.id === con.galpon_id);
            return crearEl('tr', {}, [
              crearEl('td', {}, [formatearFecha(con.fecha)]),
              crearEl('td', {}, [galp ? galp.nombre : `Galpón #${con.galpon_id}`]),
              crearEl('td', {}, [num(con.sacos_50kg)]),
              crearEl('td', {}, [num(con.kg_consumidos)]),
              crearEl('td', {}, [
                con.fecha === hoy() ? crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px', padding: '2px 6px' }, onClick: () => eliminarConsumo(con) }, ['Eliminar']) : null,
              ]),
            ]);
          }) : [crearEl('tr', {}, [crearEl('td', { colspan: '5', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin registros'])])]),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar galpones</div>'; }
}

async function registrarConsumo(g) {
  const input = $('consumo_'+g.id);
  const sacos = parseFloat(input?.value);
  if (!sacos || sacos <= 0) return mostrarMensaje('Ingrese cantidad de sacos', 'warning');
  try {
    await api('/consumo', { method: 'PUT', body: { fecha: hoy(), galpon_id: g.id, sacos } });
    mostrarMensaje(`Consumo registrado: ${sacos} sacos en ${g.nombre}`, 'success');
    renderGalpones();
  } catch {}
}

async function eliminarConsumo(con) {
  if (!confirm('¿Eliminar este registro de consumo? Se restaurará el alimento.')) return;
  try {
    const c = getSupabaseAuth();
    const gal = await c.select('galpones', '*', { 'id': 'eq.'+con.galpon_id });
    if (gal[0]) await c.update('galpones', { 'alimento_sacos': (gal[0].alimento_sacos || 0) + (con.sacos_50kg || 0) }, { 'id': 'eq.'+con.galpon_id });
    await c.delete('consumo_alimento', { 'id': 'eq.'+con.id });
    mostrarMensaje('Registro eliminado y alimento restaurado', 'success');
    renderGalpones();
  } catch {}
}

function modalGalpon(g) {
  abrirModal('Galpón', [g ? 'Guardar' : 'Crear'], (action, data) => {
    if (g) return api('/galpones/' + g.id, { method: 'PUT', body: data });
    return api('/galpones', { method: 'POST', body: data });
  }, [
    { label: 'Nombre', name: 'nombre', type: 'text', value: g?.nombre || '', required: true },
    { label: 'Gallinas', name: 'gallinas', type: 'number', value: g?.gallinas || 0 },
    { label: 'Consumo Diario (sacos/día)', name: 'consumo_diario', type: 'number', value: g?.consumo_diario || 0, step: '0.1' },
    { label: 'Stock Alimento (sacos)', name: 'alimento_sacos', type: 'number', value: g?.alimento_sacos || 0, step: '1' },
    { label: 'Fecha Ingreso', name: 'fecha_ingreso', type: 'date', value: g?.fecha_ingreso || '' },
    { label: 'Prod. Promedio (jabas/día)', name: 'produccion_promedio', type: 'number', value: g?.produccion_promedio || 0, step: '0.5' },
  ], renderGalpones);
}

async function modalGalponDetalle(g) {
  let data;
  try { data = await api('/galpones/' + g.id); } catch { data = g; }
  const edadCalc = data.fecha_ingreso ? Math.floor((Date.now() - new Date(data.fecha_ingreso + 'T12:00:00').getTime()) / (86400000)) : 0;
  const consumos = await api('/consumo');
  const hist = consumos.filter(c => c.galpon_id === g.id).slice(0,10);
  const fields = [
    { label: 'Estado', type: 'static', value: data.estado || 'Activo' },
    { label: 'Gallinas Vivas', type: 'static', value: (data.gallinas || 0).toLocaleString() },
    { label: 'Fecha Ingreso', type: 'static', value: formatearFecha(data.fecha_ingreso) },
    { label: 'Edad', type: 'static', value: `${edadCalc} días` },
    { label: 'Alimento', type: 'static', value: `${num(data.alimento_sacos)} sacos` },
    { label: 'Consumo Diario', type: 'static', value: `${num(data.consumo_diario)} sacos` },
    { label: 'Prod. Promedio', type: 'static', value: `${num(data.produccion_promedio)} jabas/día` },
  ];
  if (hist.length) {
    fields.push({ label: 'Últimos consumos', type: 'custom', render: () => crearEl('table', { style: { width: '100%', fontSize: '12px' } }, [
      crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Sacos','Kg'].map(h => crearEl('th', {}, [h])))]),
      crearEl('tbody', {}, hist.map(c => crearEl('tr', {}, [
        crearEl('td', {}, [formatearFecha(c.fecha)]),
        crearEl('td', {}, [num(c.sacos_50kg)]),
        crearEl('td', {}, [num(c.kg_consumidos)]),
      ]))),
    ]) });
  }
  abrirModal(`📋 ${data.nombre}`, ['Cerrar', 'Editar'], (action, formData) => {
    if (action === 'Editar') { modalGalpon(data); return Promise.resolve(); }
    return Promise.resolve();
  }, fields, null, '480px');
}

// --- MOLINO ---
let molinoInsumos = [];

async function renderMolino() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const [formulas, producciones, stockAlim, galpones, insumos] = await Promise.all([
      api('/formulas'), api('/molino'), api('/molino/stock-alimento'),
      api('/galpones'), api('/insumos'),
    ]);
    vaciar(c);

    // Fabricar form
    molinoInsumos = [];
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
          crearEl('label', {}, ['Galpón']),
          crearEl('select', { id: 'molinoGalpon' }, [
            crearEl('option', { value: '' }, ['Todos (distribuir)']),
            ...galpones.map(g => crearEl('option', { value: g.id }, [g.nombre])),
          ]),
        ]),
        crearEl('div', { className: 'form-group' }, [
          crearEl('label', {}, ['Tandas']),
          crearEl('input', { id: 'molinoTandas', type: 'number', value: '1', min: '0.1', step: '0.1' }),
        ]),
        crearEl('div', { className: 'form-group', style: { gridColumn: '1 / -1' } }, [
          crearEl('label', {}, ['Detalle']),
          crearEl('input', { id: 'molinoDetalle', type: 'text', placeholder: 'Nota opcional' }),
        ]),
      ]),
      crearEl('div', { className: 'card-header', style: { marginTop: '8px' } }, [crearEl('h4', { style: { fontSize: '14px' } }, ['Insumos Utilizados'])]),
      crearEl('div', { id: 'molinoInsumosContainer', style: { marginBottom: '8px' } }),
      crearEl('button', { className: 'btn btn-outline btn-sm', onClick: () => {
        // Preserve current selections
        molinoInsumos.forEach((_, idx) => {
          const sel = $('molinoIns_' + idx);
          const cant = $('molinoInsCant_' + idx);
          if (sel) molinoInsumos[idx].insumo_id = parseInt(sel.value) || '';
          if (cant) molinoInsumos[idx].cantidad = cant.value;
        });
        molinoInsumos.push({ insumo_id: '', insumo_nombre: '', cantidad: '0' });
        renderMolinoInsumos(insumos);
      } }, ['+ Agregar Insumo']),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-green', onClick: fabricarAlimento }, ['🌾 Fabricar']),
      ]),
    ]);
    c.appendChild(formCard);
    renderMolinoInsumos(insumos);

    // Stock Alimento
    if (stockAlim.length) {
      const stockCard = crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Stock Alimento en Galpones'])]),
        crearEl('div', { className: 'table-wrap' }, [
          crearEl('table', {}, [
            crearEl('thead', {}, [crearEl('tr', {}, ['Galpón','Stock (sacos)','Consumo/día','Días restantes','Barra'].map(h => crearEl('th', {}, [h])))]),
            crearEl('tbody', {}, stockAlim.map(g => {
              const sacosStock = g.sacos || 0;
              const consSacos = g.consumo_diario || 0;
              const dias = consSacos > 0 ? Math.floor(sacosStock / consSacos) : 99;
              const maxRef = Math.max(...stockAlim.map(s => s.sacos || 0), 1);
              const pct = Math.min(((g.sacos || 0) / maxRef) * 100, 100);
              return crearEl('tr', {}, [
                crearEl('td', {}, [g.nombre]),
                crearEl('td', {}, [`${num(sacosStock)} sacos`]),
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
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Fórmula','Galpón','Tandas','Kg','Detalle','Acción'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, producciones.length ? producciones.map(p => crearEl('tr', { style: { cursor: 'pointer' }, onClick: () => verDetalleMolino(p) }, [
            crearEl('td', {}, [formatearFecha(p.fecha)]),
            crearEl('td', {}, [p.formula_nombre || '-']),
            crearEl('td', {}, [p.galpon_nombre || 'Todos']),
            crearEl('td', {}, [num(p.tandas)]),
            crearEl('td', {}, [num(p.kg_producidos)]),
            crearEl('td', { style: { fontSize: '12px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, [p.detalle || '-']),
            crearEl('td', {}, [crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px' }, onClick: (e) => { e.stopPropagation(); eliminarProduccionMolino(p); } }, ['🗑'])]),
          ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '7', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin registros'])])]),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar molino</div>'; }
}

function renderMolinoInsumos(insumos) {
  const container = $('molinoInsumosContainer'); vaciar(container);
  molinoInsumos.forEach((item, idx) => {
    const row = crearEl('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' } }, [
      crearEl('select', { id: 'molinoIns_' + idx, style: { flex: 1 } }, [
        crearEl('option', { value: '' }, ['Seleccione insumo...']),
        ...insumos.map(i => crearEl('option', { value: i.id, label: i.nombre, selected: item.insumo_id === i.id }, [i.nombre])),
      ]),
      crearEl('input', { id: 'molinoInsCant_' + idx, type: 'number', value: item.cantidad || '0', min: '0', step: '0.01', style: { width: '100px' }, placeholder: 'Cant. (kg)' }),
      crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px', padding: '4px 8px' }, onClick: () => { molinoInsumos.splice(idx, 1); renderMolinoInsumos(insumos); } }, ['✕']),
    ]);
    container.appendChild(row);
  });
}

async function fabricarAlimento() {
  const fecha = $('molinoFecha')?.value || hoy();
  const formula_id = parseInt($('molinoFormula')?.value);
  const galpon_id = parseInt($('molinoGalpon')?.value) || null;
  const tandas = parseFloat($('molinoTandas')?.value);
  const detalle = $('molinoDetalle')?.value?.trim() || '';
  if (!formula_id) return mostrarMensaje('Seleccione una fórmula', 'warning');
  if (!tandas || tandas <= 0) return mostrarMensaje('Ingrese cantidad de tandas', 'warning');
  const insumos = [];
  molinoInsumos.forEach((_, idx) => {
    const sel = $('molinoIns_' + idx);
    const cant = parseFloat($('molinoInsCant_' + idx)?.value);
    if (sel && sel.value && cant > 0) {
      insumos.push({ insumo_id: parseInt(sel.value), insumo_nombre: sel.options[sel.selectedIndex].text, cantidad: cant });
    }
  });
  try {
    await api('/molino/producir', { method: 'POST', body: { fecha, formula_id, galpon_id, tandas, detalle, insumos } });
    mostrarMensaje('Alimento fabricado exitosamente', 'success');
    renderMolino();
  } catch { }
}

async function verDetalleMolino(p) {
  let items = [];
  try {
    const c = getSupabaseAuth();
    items = await c.select('produccion_molino_insumos', '*', { 'produccion_id': 'eq.'+p.id });
  } catch {}
  abrirModal('Producción: ' + formatearFecha(p.fecha), ['Cerrar'], async () => {}, [
    { label: 'Fecha', type: 'static', value: formatearFecha(p.fecha) },
    { label: 'Fórmula', type: 'static', value: p.formula_nombre || '-' },
    { label: 'Galpón', type: 'static', value: p.galpon_nombre || 'Todos (distribuido)' },
    { label: 'Tandas', type: 'static', value: num(p.tandas) },
    { label: 'Kg Producidos', type: 'static', value: num(p.kg_producidos) },
    { label: 'Detalle', type: 'static', value: p.detalle || '-' },
    { label: 'Insumos usados', type: 'custom', render: () => crearEl('table', { style: { width: '100%', fontSize: '12px' } }, [
      crearEl('thead', {}, [crearEl('tr', {}, ['Insumo','Cantidad (kg)'].map(h => crearEl('th', {}, [h])))]),
      crearEl('tbody', {}, items.length ? items.map(i => crearEl('tr', {}, [
        crearEl('td', {}, [i.insumo_nombre || '-']),
        crearEl('td', {}, [num(i.cantidad)]),
      ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '2', style: { textAlign: 'center' } }, ['Sin registros'])])]),
    ]) },
  ]);
}

async function eliminarProduccionMolino(p) {
  if (!confirm('¿Eliminar esta producción de alimento?')) return;
  try {
    await api('/molino/' + p.id, { method: 'DELETE' });
    mostrarMensaje('Producción eliminada', 'success');
    renderMolino();
  } catch {}
}

function verDetalleVenta(v) {
  const cats = ['primera','pardo','jumbo','sucio','quinados'];
  const detalles = cats.filter(k => parseFloat(v[k]) > 0).map(k => `${k}: ${num(v[k])} jab`).join(', ');
  abrirModal('Venta: ' + formatearFecha(v.fecha), ['Cerrar'], async () => {}, [
    { label: 'Fecha', type: 'static', value: formatearFecha(v.fecha) },
    { label: 'Cliente', type: 'static', value: v.cliente_nombre || '-' },
    { label: 'Detalle', type: 'static', value: detalles || 'Sin detalle' },
    { label: 'Total Jabas', type: 'static', value: num(v.total_jabas) },
    { label: 'Peso (kg)', type: 'static', value: num(v.peso) },
    { label: 'Total', type: 'static', value: 'S/ ' + num(v.total) },
    { label: 'Precio Primera', type: 'static', value: 'S/ ' + num(v.precio_primera) + ' x kg' },
    { label: 'Precio Segunda', type: 'static', value: 'S/ ' + num(v.precio_segunda) + ' x kg' },
  ]);
}

async function eliminarVenta(v) {
  if (!confirm('¿Eliminar esta venta?')) return;
  try {
    await api('/ventas/' + v.id, { method: 'DELETE' });
    mostrarMensaje('Venta eliminada', 'success');
    renderReporteData();
  } catch {}
}

async function eliminarProduccion(p) {
  if (!confirm('¿Eliminar esta producción?')) return;
  try {
    await api('/produccion/' + p.id, { method: 'DELETE' });
    mostrarMensaje('Producción eliminada', 'success');
    renderReporteData();
  } catch {}
}

// --- PRODUCCIÓN ---
async function renderProduccion() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const prod = await api('/produccion');
    const galpones = await api('/galpones');
    vaciar(c);

    // Formulario
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Registrar Producción'])]),
      crearEl('div', { className: 'form-grid' }, [
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Fecha']), crearEl('input', { id: 'prodFecha', type: 'date', value: hoy() })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Galpón']), crearEl('select', { id: 'prodGalpon' }, [crearEl('option', { value: '' }, ['Seleccione...']), ...galpones.map(g => crearEl('option', { value: g.id }, [g.nombre]))])]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Jabas Primera']), crearEl('input', { id: 'prodPrimera', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Jabas Segunda']), crearEl('input', { id: 'prodSegunda', type: 'number', value: '0', min: '0', step: '0.5' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Gallinas Muertas']), crearEl('input', { id: 'prodMuertas', type: 'number', value: '0', min: '0' })]),
      ]),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-green', onClick: registrarProduccion }, ['🥚 Registrar']),
      ]),
    ]));

    // Historial
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Historial de Producción'])]),
      crearEl('div', { className: 'table-wrap' }, [
        crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Galpón','Primera','Segunda','Muertas'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, prod.length ? prod.slice(0,50).map(p => crearEl('tr', {}, [
            crearEl('td', {}, [formatearFecha(p.fecha)]),
            crearEl('td', {}, [p.galpon_id ? `Galpón #${p.galpon_id}` : '-']),
            crearEl('td', {}, [num(p.primera)]),
            crearEl('td', {}, [num(p.segunda)]),
            crearEl('td', {}, [p.muertas || 0]),
          ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '5', style: { textAlign: 'center', color: '#999' } }, ['Sin registros'])])]),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar producción</div>'; }
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
    renderProduccion();
  } catch {}
}

// --- ALMACEN HUEVOS ---
async function renderAlmacenHuevos() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const data = await api('/almacen/huevos');
    vaciar(c);

    // Stock actual
    const stock = data.stock || {};
    const gruposStock = [
      { label: 'Primera', clase: 'Primera', bg: 'bg-blue' },
      { label: 'Segunda (sin clasificar)', clase: 'Segunda', bg: 'bg-orange' },
    ];
    const subTipos = [
      { label: 'Pardo', clase: 'Pardo', bg: 'bg-purple' },
      { label: 'Jumbo', clase: 'Jumbo', bg: 'bg-purple' },
      { label: 'Sucio', clase: 'Sucio', bg: 'bg-purple' },
      { label: 'Quinados', clase: 'Quinados', bg: 'bg-purple' },
    ];
    let totalJabas = 0;
    const statsGrid = crearEl('div', { className: 'stats-grid' });
    gruposStock.forEach(({label, clase, bg}) => {
      const c = parseFloat(stock[clase] || 0);
      totalJabas += c;
      statsGrid.appendChild(crearEl('div', { className: 'stat-card' }, [
        crearEl('div', { className: `stat-icon ${bg}` }, ['🥚']),
        crearEl('div', { className: 'stat-info' }, [
          crearEl('div', { className: 'stat-label' }, [label]),
          crearEl('div', { className: 'stat-value' }, [num(c)]),
        ]),
      ]));
    });
    subTipos.forEach(({label, clase, bg}) => {
      const c = parseFloat(stock[clase] || 0);
      totalJabas += c;
      statsGrid.appendChild(crearEl('div', { className: 'stat-card', style: { opacity: 0.85 } }, [
        crearEl('div', { className: `stat-icon ${bg}` }, ['🔹']),
        crearEl('div', { className: 'stat-info' }, [
          crearEl('div', { className: 'stat-label' }, [label]),
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
      crearEl('span', { id: 'clasifStockSegunda', 'data-stock': stockSegunda, style: { display: 'none' } }),
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
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Quinados']), crearEl('input', { id: 'clasifQuinados', type: 'number', value: '0', min: '0', step: '0.5' })]),
      ]),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-primary', onClick: clasificarSegunda }, ['Clasificar']),
      ]),
    ]);
    if (stockSegunda > 0) c.appendChild(clasifCard);

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

async function clasificarSegunda() {
  const fecha = $('clasifFecha')?.value || hoy();
  const pardo = parseFloat($('clasifPardo')?.value) || 0;
  const jumbo = parseFloat($('clasifJumbo')?.value) || 0;
  const sucio = parseFloat($('clasifSucio')?.value) || 0;
  const limpieza = parseFloat($('clasifLimpieza')?.value) || 0;
  const quinados = parseFloat($('clasifQuinados')?.value) || 0;
  const total = pardo + jumbo + sucio + limpieza + quinados;
  if (total <= 0) return mostrarMensaje('Ingrese al menos 1 jaba clasificada', 'warning');
  const stockSegunda = parseFloat($('clasifStockSegunda')?.getAttribute('data-stock') || 0);
  if (total > stockSegunda) return mostrarMensaje(`Solo hay ${num(stockSegunda)} jabas de Segunda disponibles`, 'warning');
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

// --- INGRESO DE INSUMOS ---
let ingresoItems = [];
let insumosList = [];

async function renderCompras() {
  const c = $('content'); vaciar(c); c.innerHTML = '<div class="card">Cargando...</div>';
  try {
    const [ingresos, insumos] = await Promise.all([
      api('/ingresos'), api('/insumos'),
    ]);
    insumosList = insumos;
    vaciar(c);

    // Nuevo ingreso
    const formCard = crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Nuevo Ingreso de Insumos'])]),
      crearEl('div', { className: 'form-grid' }, [
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Fecha']), crearEl('input', { id: 'ingresoFecha', type: 'date', value: hoy() })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Proveedor']), crearEl('input', { id: 'ingresoProveedor', type: 'text', placeholder: 'Nombre del proveedor' })]),
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Detalle']), crearEl('input', { id: 'ingresoDetalle', type: 'text', placeholder: 'Opcional' })]),
      ]),
      crearEl('div', { className: 'card-header', style: { marginTop: '12px' } }, [crearEl('h4', { style: { fontSize: '14px' } }, ['Insumos'])]),
      crearEl('div', { id: 'ingresoItemsContainer', style: { marginBottom: '8px' } }),
      crearEl('button', { className: 'btn btn-outline btn-sm', onClick: agregarItemIngreso }, ['+ Agregar Insumo']),
      crearEl('div', { style: { marginTop: '12px' } }, [
        crearEl('button', { className: 'btn btn-green', onClick: registrarIngreso }, ['📦 Registrar Ingreso']),
      ]),
    ]);
    c.appendChild(formCard);

    ingresoItems = [];
    renderIngresoItems(insumos);

    // Historial
    c.appendChild(crearEl('div', { className: 'card' }, [
      crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Historial de Ingresos de Insumos'])]),
      crearEl('div', { className: 'table-wrap' }, [
        crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Proveedor','Detalle','Insumos','Acción'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, ingresos.length ? ingresos.map(ing => {
            const items = typeof ing.items === 'string' ? JSON.parse(ing.items) : (ing.items || []);
            const resumen = items.map(i => `${i.insumo_nombre}: ${num(i.cantidad)}`).join(', ');
            return crearEl('tr', { style: { cursor: 'pointer' }, onClick: () => verDetalleIngreso(ing) }, [
              crearEl('td', {}, [formatearFecha(ing.fecha)]),
              crearEl('td', {}, [ing.proveedor_nombre || '-']),
              crearEl('td', {}, [ing.detalle || '-']),
              crearEl('td', { style: { fontSize: '12px' } }, [resumen || '-']),
              crearEl('td', {}, [crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px' }, onClick: (e) => { e.stopPropagation(); eliminarIngreso(ing); } }, ['🗑'])]),
            ]);
          }) : [crearEl('tr', {}, [crearEl('td', { colspan: '5', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin registros'])])]),
        ]),
      ]),
    ]));
  } catch { c.innerHTML = '<div class="card">Error al cargar ingresos</div>'; }
}

function renderIngresoItems(insumos) {
  const container = $('ingresoItemsContainer'); vaciar(container);
  ingresoItems.forEach((item, idx) => {
    const row = crearEl('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' } }, [
      crearEl('select', { id: 'ingresoInsumo_' + idx, style: { flex: 1 } }, [
        crearEl('option', { value: '' }, ['Seleccione insumo...']),
        ...insumos.map(i => crearEl('option', { value: i.id, label: i.nombre, selected: i.id === item.insumo_id }, [i.nombre])),
      ]),
      crearEl('input', { id: 'ingresoCant_' + idx, type: 'number', value: item.cantidad || '1', min: '0.01', step: '0.01', style: { width: '100px' }, placeholder: 'Cantidad' }),
      crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px', padding: '4px 8px' }, onClick: () => { ingresoItems.splice(idx, 1); renderIngresoItems(insumos); } }, ['✕']),
    ]);
    container.appendChild(row);
  });
}

function agregarItemIngreso() {
  // Preserve current selections before re-render
  ingresoItems.forEach((_, idx) => {
    const sel = $('ingresoInsumo_' + idx);
    const cant = $('ingresoCant_' + idx);
    if (sel) ingresoItems[idx].insumo_id = parseInt(sel.value) || '';
    if (cant) ingresoItems[idx].cantidad = cant.value;
  });
  ingresoItems.push({ insumo_id: '', cantidad: '1' });
  renderIngresoItems(insumosList);
}

async function registrarIngreso() {
  const fecha = $('ingresoFecha')?.value || hoy();
  const proveedor = $('ingresoProveedor')?.value?.trim();
  const detalle = $('ingresoDetalle')?.value?.trim();
  if (!proveedor) return mostrarMensaje('Ingrese el nombre del proveedor', 'warning');
  const items = [];
  ingresoItems.forEach((_, idx) => {
    const sel = $('ingresoInsumo_' + idx);
    const cant = parseFloat($('ingresoCant_' + idx)?.value);
    if (sel && sel.value && cant > 0) {
      items.push({ insumo_id: parseInt(sel.value), insumo_nombre: sel.options[sel.selectedIndex].text, cantidad: cant });
    }
  });
  if (!items.length) return mostrarMensaje('Agregue al menos un insumo con cantidad', 'warning');
  try {
    await api('/ingresos', { method: 'POST', body: { fecha, proveedor_nombre: proveedor, detalle, items } });
    mostrarMensaje('Ingreso registrado', 'success');
    renderCompras();
  } catch {}
}

function verDetalleIngreso(ing) {
  const items = typeof ing.items === 'string' ? JSON.parse(ing.items) : (ing.items || []);
  abrirModal('Ingreso: ' + formatearFecha(ing.fecha), ['Cerrar'], async () => {}, [
    { label: 'Fecha', type: 'static', value: formatearFecha(ing.fecha) },
    { label: 'Proveedor', type: 'static', value: ing.proveedor_nombre || '-' },
    { label: 'Detalle', type: 'static', value: ing.detalle || '-' },
    { label: 'Insumos', type: 'custom', render: () => crearEl('table', { style: { width: '100%', fontSize: '12px' } }, [
      crearEl('thead', {}, [crearEl('tr', {}, ['Insumo','Cantidad'].map(h => crearEl('th', {}, [h])))]),
      crearEl('tbody', {}, items.length ? items.map(i => crearEl('tr', {}, [
        crearEl('td', {}, [i.insumo_nombre]),
        crearEl('td', {}, [num(i.cantidad)]),
      ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '2', style: { textAlign: 'center' } }, ['Sin datos'])])]),
    ]) },
  ]);
}

async function eliminarIngreso(ing) {
  if (!confirm('¿Eliminar este ingreso de insumos?')) return;
  try {
    await api('/ingresos/' + ing.id, { method: 'DELETE' });
    mostrarMensaje('Ingreso eliminado', 'success');
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
        crearEl('div', { className: 'form-group' }, [crearEl('label', {}, ['Precio x kg SEGUNDA (Pardo, Jumbo, Sucio, Quinados)']), crearEl('input', { id: 'precioSegunda', type: 'number', value: '3.50', min: '0', step: '0.01', onInput: calcVenta })]),
      ]),
      crearEl('div', { style: { marginTop: '8px', display: 'flex', gap: '12px', alignItems: 'center' } }, [
        crearEl('label', { style: { fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' } }, [
          crearEl('input', { id: 'ventaMostrarSucio', type: 'checkbox', onchange: toggleVentaSucio }),
          ' Incluir Sucio / Quinados',
        ]),
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
          crearEl('tr', { id: 'ventaRowPardo' }, [
            crearEl('td', { id: 'ventaSegundaLabel', rowspan: '2', style: { fontWeight: 600, background: 'var(--orange-light)' } }, ['SEGUNDA']),
            crearEl('td', { style: { fontWeight: 500 } }, ['Pardo']),
            crearEl('td', {}, [crearEl('input', { id: 'venta_pardo', type: 'number', value: '0', min: '0', step: '0.5', style: { width: '80px' }, onInput: calcVenta })]),
            crearEl('td', { id: 'ventaSub_pardo', style: { fontWeight: 600 } }, ['S/ 0.00']),
          ]),
          crearEl('tr', { id: 'ventaRowJumbo' }, [
            crearEl('td', { style: { fontWeight: 500 } }, ['Jumbo']),
            crearEl('td', {}, [crearEl('input', { id: 'venta_jumbo', type: 'number', value: '0', min: '0', step: '0.5', style: { width: '80px' }, onInput: calcVenta })]),
            crearEl('td', { id: 'ventaSub_jumbo', style: { fontWeight: 600 } }, ['S/ 0.00']),
          ]),
          crearEl('tr', { id: 'ventaRowSucio', style: { display: 'none' } }, [
            crearEl('td', { style: { fontWeight: 500 } }, ['Sucio']),
            crearEl('td', {}, [crearEl('input', { id: 'venta_sucio', type: 'number', value: '0', min: '0', step: '0.5', style: { width: '80px' }, onInput: calcVenta })]),
            crearEl('td', { id: 'ventaSub_sucio', style: { fontWeight: 600 } }, ['S/ 0.00']),
          ]),
          crearEl('tr', { id: 'ventaRowQuinados', style: { display: 'none' } }, [
            crearEl('td', { style: { fontWeight: 500 } }, ['Quinados']),
            crearEl('td', {}, [crearEl('input', { id: 'venta_quinados', type: 'number', value: '0', min: '0', step: '0.5', style: { width: '80px' }, onInput: calcVenta })]),
            crearEl('td', { id: 'ventaSub_quinados', style: { fontWeight: 600 } }, ['S/ 0.00']),
          ]),
        ]),
      ])]),
      crearEl('div', { id: 'ventaResumen', style: { marginTop: '12px', padding: '12px', background: 'var(--primary-light)', borderRadius: '8px', display: 'flex', gap: '24px', fontSize: '14px' } }, [
        crearEl('span', {}, ['Total Jabas: ', crearEl('strong', { id: 'ventaTotalJabas' }, ['0.00'])]),
        crearEl('span', {}, ['Peso: ', crearEl('strong', { id: 'ventaPeso' }, ['0.00']), ' kg']),
        crearEl('span', {}, ['Importe: S/ ', crearEl('strong', { id: 'ventaImporte' }, ['0.00'])]),
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

function toggleVentaSucio() {
  const mostrar = $('ventaMostrarSucio')?.checked;
  const sucio = $('ventaRowSucio');
  const quinados = $('ventaRowQuinados');
  const label = $('ventaSegundaLabel');
  if (sucio) sucio.style.display = mostrar ? '' : 'none';
  if (quinados) quinados.style.display = mostrar ? '' : 'none';
  if (label) label.rowSpan = mostrar ? 4 : 2;
  calcVenta();
}

let ventaPesoJaba = 18;

function calcVenta() {
  const pp = parseFloat($('precioPrimera')?.value) || 0;
  const ps = parseFloat($('precioSegunda')?.value) || 0;
  const grupos = [{cats:['primera'],precio:pp},{cats:['pardo','jumbo','sucio','quinados'],precio:ps}];
  let totalJabas = 0, totalImporte = 0;
  grupos.forEach(({cats,precio}) => {
    cats.forEach(k => {
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
  const grupos = [{cats:['primera'],precio:pp},{cats:['pardo','jumbo','sucio','quinados'],precio:ps}];
  grupos.forEach(({cats,precio}) => {
    cats.forEach(k => {
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
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearEl('table', {}, [
        crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Galpón','Primera','Segunda','Total','Muertas','Acción'].map(h => crearEl('th', {}, [h])))]),
        crearEl('tbody', {}, data.length ? data.map(p => crearEl('tr', {}, [
          crearEl('td', {}, [formatearFecha(p.fecha)]),
          crearEl('td', {}, [p.galpon_nombre||'-']),
          crearEl('td', {}, [num(p.primera)]),
          crearEl('td', {}, [num(p.segunda)]),
          crearEl('td', {}, [num((p.primera||0)+(p.segunda||0))]),
          crearEl('td', {}, [p.muertas||0]),
          crearEl('td', {}, [crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px' }, onClick: () => eliminarProduccion(p) }, ['🗑'])]),
        ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '7', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin datos'])])]),
      ])]));
    } else if (reportesTab === 'ventas') {
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearEl('table', {}, [
        crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Cliente','Jabas','Peso','Total','Acción'].map(h => crearEl('th', {}, [h])))]),
        crearEl('tbody', {}, data.length ? data.map(v => crearEl('tr', { style: { cursor: 'pointer' }, onClick: () => verDetalleVenta(v) }, [
          crearEl('td', {}, [formatearFecha(v.fecha)]),
          crearEl('td', {}, [v.cliente_nombre||'-']),
          crearEl('td', {}, [num(v.total_jabas)]),
          crearEl('td', {}, [num(v.peso)]),
          crearEl('td', {}, ['S/ '+num(v.total)]),
          crearEl('td', {}, [crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px' }, onClick: (e) => { e.stopPropagation(); eliminarVenta(v); } }, ['🗑'])]),
        ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '6', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin datos'])])]),
      ])]));
    } else if (reportesTab === 'inventario') {
      const huevos = data.huevos || [];
      div.appendChild(crearEl('h4', { style: { fontSize: '13px', marginBottom: '8px' } }, ['Stock Huevos']));
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearTabla(['Clase','Jabas'], huevos.map(h => [h.clase, num(h.stock)]))]));
      div.appendChild(crearEl('h4', { style: { fontSize: '13px', margin: '16px 0 8px' } }, ['Stock Insumos']));
      div.appendChild(crearEl('div', { className: 'table-wrap', style: { marginTop: '8px' } }, [crearTabla(['Producto','Stock (kg)','Stock Mínimo'], data.insumos?.map(i => [i.nombre, num(i.cantidad_kg), num(i.stock_minimo_kg)]) || [])]));
    } else if (reportesTab === 'molino') {
      div.appendChild(crearEl('div', { className: 'table-wrap' }, [crearEl('table', {}, [
        crearEl('thead', {}, [crearEl('tr', {}, ['Fecha','Fórmula','Galpón','Tandas','Kg','Detalle','Acción'].map(h => crearEl('th', {}, [h])))]),
        crearEl('tbody', {}, data.length ? data.map(m => crearEl('tr', { style: { cursor: 'pointer' }, onClick: () => verDetalleMolino(m) }, [
          crearEl('td', {}, [formatearFecha(m.fecha)]),
          crearEl('td', {}, [m.formula_nombre||'-']),
          crearEl('td', {}, [m.galpon_nombre||'Todos']),
          crearEl('td', {}, [num(m.tandas)]),
          crearEl('td', {}, [num(m.kg_producidos)]),
          crearEl('td', { style: { fontSize: '12px' } }, [m.detalle||'-']),
          crearEl('td', {}, [crearEl('button', { className: 'btn btn-sm btn-outline', style: { fontSize: '11px' }, onClick: (e) => { e.stopPropagation(); eliminarProduccionMolino(m); } }, ['🗑'])]),
        ])) : [crearEl('tr', {}, [crearEl('td', { colspan: '7', style: { textAlign: 'center', color: 'var(--text2)' } }, ['Sin datos'])])]),
      ])]));
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
      const [usuarios, authUsers] = await Promise.all([
        api('/configuracion/usuarios'),
        adminListUsers().catch(() => ({ users: [] }))
      ]);
      const localByEmail = {};
      usuarios.forEach(u => { localByEmail[u.usuario] = u; });
      const merged = [];
      (authUsers.users || []).forEach(au => {
        const local = localByEmail[au.email];
        merged.push({ email: au.email, rol: au.raw_user_meta_data?.rol || local?.rol || 'usuario', authId: au.id, au, local });
      });
      usuarios.forEach(u => {
        if (!merged.some(m => m.email === u.usuario)) {
          merged.push({ email: u.usuario, rol: u.rol, authId: null, au: null, local: u });
        }
      });
      c.appendChild(crearEl('div', { className: 'card' }, [
        crearEl('div', { className: 'card-header' }, [crearEl('h3', {}, ['Usuarios']), crearEl('div', { className: 'actions' }, [crearEl('button', { className: 'btn btn-primary btn-sm', onClick: () => modalUsuario(null) }, ['+ Nuevo'])])]),
        crearEl('div', { className: 'table-wrap' }, [crearEl('table', {}, [
          crearEl('thead', {}, [crearEl('tr', {}, ['Email','Rol','Auth ID','Acción'].map(h => crearEl('th', {}, [h])))]),
          crearEl('tbody', {}, merged.map(m => {
            return crearEl('tr', {}, [
              crearEl('td', { style: { fontWeight: 500 } }, [m.email]),
              crearEl('td', {}, [crearEl('span', { className: 'chip chip-blue' }, [m.rol])]),
              crearEl('td', { style: { fontSize: '11px', color: 'var(--text3)' } }, [m.authId ? m.authId.slice(0,8)+'...' : '-']),
              crearEl('td', {}, [
                m.au ? crearEl('button', { className: 'btn btn-outline btn-sm', style: { fontSize: '11px', marginRight: '4px' }, onClick: () => editarRolAuth(m.au) }, ['✏ Rol']) : null,
                m.local ? crearEl('button', { className: 'btn btn-outline btn-sm', style: { fontSize: '11px' }, onClick: () => modalUsuario(m.local) }, ['Editar']) : null,
              ]),
            ]);
          })),
        ])]),
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
  abrirModal('Editar: ' + p.clave, ['Guardar'], async (action, data) => {
    await api('/configuracion/parametros/' + p.id, { method: 'PUT', body: { valor: data.valor } });
    renderConfiguracion();
  }, [
    { label: 'Clave', type: 'static', value: p.clave },
    { label: 'Valor', type: 'text', value: p.valor, required: true },
    { label: 'Descripción', type: 'static', value: p.descripcion || '' },
  ], renderConfiguracion);
}

function modalFormula(f) {
  abrirModal('Fórmula', [f ? 'Guardar' : 'Crear'], async (action, data) => {
    if (f) return api('/formulas/' + f.id, { method: 'PUT', body: data });
    return api('/formulas', { method: 'POST', body: data });
  }, [
    { label: 'Nombre', name: 'nombre', type: 'text', value: f?.nombre || '', required: true },
    { label: 'Descripción', name: 'descripcion', type: 'text', value: f?.descripcion || '' },
  ], renderConfiguracion);
}

function modalCliente(cl) {
  abrirModal('Cliente', [cl ? 'Guardar' : 'Crear'], async (action, data) => {
    if (cl) return api('/clientes/' + cl.id, { method: 'PUT', body: data });
    return api('/clientes', { method: 'POST', body: data });
  }, [
    { label: 'Nombre', name: 'nombre', type: 'text', value: cl?.nombre || '', required: true },
  ], renderConfiguracion);
}

function editarRolAuth(au) {
  abrirModal('Rol de ' + au.email, ['Guardar'], async (action, data) => {
    await adminUpdateUser(au.id, { ...(au.raw_user_meta_data || {}), rol: data.rol });
    mostrarMensaje('Rol actualizado. El usuario debe volver a iniciar sesión.', 'success');
    renderConfiguracion();
  }, [
    { label: 'Email', type: 'static', value: au.email },
    { label: 'Rol', name: 'rol', type: 'select', value: au.raw_user_meta_data?.rol || 'Producción', options: ['Administrador','Producción','Almacén','Ventas','Gerencia'] },
  ], renderConfiguracion);
}

function modalUsuario(u) {
  abrirModal('Usuario', [u ? 'Guardar' : 'Crear'], async (action, data) => {
    if (u) {
      await api('/configuracion/usuarios/' + u.id, { method: 'PUT', body: data });
    } else {
      await adminCreateUser(data.usuario, data.password, { rol: data.rol });
      await api('/configuracion/usuarios', { method: 'POST', body: { usuario: data.usuario, password: data.password, rol: data.rol } });
    }
  }, [
    { label: 'Email', name: 'usuario', type: 'text', value: u?.usuario || '', required: true },
    { label: 'Contraseña', name: 'password', type: 'password', value: '', required: !u },
    { label: 'Rol', name: 'rol', type: 'select', value: u?.rol || 'Producción', options: ['Administrador','Producción','Almacén','Ventas','Gerencia'] },
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
    } else if (c.type === 'custom' && typeof c.render === 'function') {
      grp.appendChild(c.render());
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
          const result = await onSubmit(a, data);
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
