import os
import subprocess
import tempfile

CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
OUTPUT_DIR = os.path.abspath(r"public\screenshots")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Common styling template matching Faroo aesthetic (modern, minimalist, clean typography)
BASE_CSS = """
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #0F172A;
  color: #0F172A;
  width: 1280px;
  height: 820px;
  overflow: hidden;
  display: flex;
}
.sidebar {
  width: 250px;
  background: #FFFFFF;
  border-right: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  flex-shrink: 0;
}
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid #F1F5F9;
  margin-bottom: 20px;
}
.logo-box {
  width: 32px;
  height: 32px;
  background: #0F172A;
  color: #FFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
}
.logo-text {
  font-size: 16px;
  font-weight: 700;
  color: #0F172A;
  letter-spacing: -0.5px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: #64748B;
  margin-bottom: 4px;
}
.nav-item.active {
  background: #0F172A;
  color: #FFFFFF;
  font-weight: 600;
}
.nav-section {
  font-size: 11px;
  text-transform: uppercase;
  color: #94A3B8;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 16px 0 8px 12px;
}
.main-wrapper {
  flex: 1;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
}
.topbar {
  height: 64px;
  background: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
}
.page-title {
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
}
.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #334155;
  font-weight: 500;
}
.avatar {
  width: 34px;
  height: 34px;
  background: #E0E7FF;
  color: #4338CA;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}
.content-area {
  flex: 1;
  padding: 28px 32px;
  overflow: hidden;
}
.card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.btn-primary { background: #0F172A; color: #FFF; }
.btn-emerald { background: #059669; color: #FFF; }
.btn-outline { background: #FFF; border: 1px solid #CBD5E1; color: #334155; }
.btn-danger { background: #DC2626; color: #FFF; }
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 9999px;
  font-size: 11.5px;
  font-weight: 600;
}
.badge-emerald { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
.badge-amber { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
.badge-red { background: #FEF2F2; color: #B91C1C; border: 1px solid #FECACA; }
.badge-blue { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
.form-group { margin-bottom: 18px; }
.form-label { display: block; font-size: 12.5px; font-weight: 600; color: #475569; margin-bottom: 6px; }
.form-input {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  font-size: 13.5px;
  color: #0F172A;
  background: #FFF;
}
.form-row { display: flex; gap: 16px; }
.form-col { flex: 1; }
.table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.table th { padding: 12px 14px; background: #F8FAFC; color: #64748B; font-weight: 600; border-bottom: 1px solid #E2E8F0; }
.table td { padding: 13px 14px; border-bottom: 1px solid #F1F5F9; color: #1E293B; vertical-align: middle; }
"""

def wrap_page(active_nav, title, subtitle, content_html, is_portal=False):
    if is_portal:
        return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{BASE_CSS}
body {{ background: #F8FAFC; justify-content: center; align-items: center; padding: 20px; }}
.portal-card {{
  width: 680px;
  background: #FFF;
  border-radius: 16px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06);
  padding: 32px;
}}
</style>
</head>
<body>
  {content_html}
</body>
</html>"""

    navs = [
        ("dashboard", "Dashboard", "📊"),
        ("properties", "Inmuebles", "🏢"),
        ("tenants", "Inquilinos", "👥"),
        ("contracts", "Contratos", "📑"),
        ("charges", "Cobros y Pagos", "💳"),
        ("support", "Soporte", "🛠️"),
    ]
    nav_links = ""
    for nid, nlabel, nicon in navs:
        cls = "nav-item active" if nid == active_nav else "nav-item"
        nav_links += f'<div class="{cls}"><span style="font-size:16px;">{nicon}</span><span>{nlabel}</span></div>'

    return f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{BASE_CSS}
</style>
</head>
<body>
  <div class="sidebar">
    <div class="logo-area">
      <div class="logo-box">F</div>
      <div>
        <div class="logo-text">Faroo</div>
        <div style="font-size:11px; color:#64748B;">Arriendos y Cobranza</div>
      </div>
    </div>
    <div class="nav-section">Operación</div>
    {nav_links}
    <div style="margin-top:auto; padding-top:16px; border-top:1px solid #F1F5F9;">
      <div style="font-size:11px; color:#94A3B8;">Sede Central · Medellín</div>
      <div style="font-size:12px; font-weight:600; color:#334155;">Inmobiliaria Faroo S.A.S.</div>
    </div>
  </div>

  <div class="main-wrapper">
    <div class="topbar">
      <div>
        <div class="page-title">{title}</div>
        <div style="font-size:12px; color:#64748B; margin-top:1px;">{subtitle}</div>
      </div>
      <div class="user-chip">
        <div class="badge badge-emerald">● Sistema en Línea</div>
        <div style="text-align:right;">
          <div style="font-size:12.5px; font-weight:600;">David Machado & Nikoll</div>
          <div style="font-size:11px; color:#64748B;">Administradores Faroo</div>
        </div>
        <div class="avatar">DM</div>
      </div>
    </div>

    <div class="content-area">
      {content_html}
    </div>
  </div>
</body>
</html>"""

def capture(html_text, filename):
    out_path = os.path.join(OUTPUT_DIR, filename)
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html_text)
        tmp_name = f.name
    try:
        cmd = f'"{CHROME_PATH}" --headless --no-sandbox --window-size=1280,820 --screenshot="{out_path}" "file:///{tmp_name}"'
        subprocess.run(cmd, shell=True, check=True, capture_output=True)
        print(f"Captured {filename} ({os.path.getsize(out_path)} bytes)")
    finally:
        if os.path.exists(tmp_name):
            os.remove(tmp_name)

print("Starting generation of 16 Faroo screenshots...")

# Screen 1: CU-01 - Registro de Inmueble con Canon y Dirección
s1 = wrap_page("properties", "Nuevo Inmueble en Catálogo", "Módulo de Inmuebles · Faroo Core", """
<div style="display:flex; gap:24px;">
  <div class="card" style="flex:1.4;">
    <div style="font-size:15px; font-weight:700; margin-bottom:16px;">Datos Básicos del Inmueble</div>
    <div class="form-group">
      <label class="form-label">Dirección Física Exacta *</label>
      <input class="form-input" value="Carrera 43A # 18 Sur - 125, Apto 502" />
      <div style="font-size:11px; color:#64748B; margin-top:4px;">Debe incluir torre o interior si aplica. No puede repetirse en el sistema.</div>
    </div>
    <div class="form-row">
      <div class="form-group form-col">
        <label class="form-label">Tipo de Inmueble</label>
        <select class="form-input"><option>Apartamento Residencial</option><option>Casa</option><option>Local Comercial</option></select>
      </div>
      <div class="form-group form-col">
        <label class="form-label">Estrato Socioeconómico</label>
        <select class="form-input"><option>Estrato 4</option><option>Estrato 3</option><option>Estrato 5</option></select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group form-col">
        <label class="form-label">Canon Mensual Base ($ COP) *</label>
        <input class="form-input" value="$ 1.850.000" style="font-weight:700; color:#047857;" />
      </div>
      <div class="form-group form-col">
        <label class="form-label">Área Construida (m²)</label>
        <input class="form-input" value="78 m²" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group form-col">
        <label class="form-label">Habitaciones: 3</label>
      </div>
      <div class="form-group form-col">
        <label class="form-label">Baños: 2</label>
      </div>
      <div class="form-group form-col">
        <label class="form-label">Parqueadero: Sí (1 privado)</label>
      </div>
    </div>
    <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:12px;">
      <button class="btn btn-outline">Cancelar</button>
      <button class="btn btn-primary">Guardar en Catálogo</button>
    </div>
  </div>
  <div class="card" style="flex:1; background:#F8FAFC;">
    <div style="font-size:14px; font-weight:700; color:#334155; margin-bottom:12px;">Previsualización de Tarjeta</div>
    <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; overflow:hidden;">
      <div style="height:140px; background:#CBD5E1; display:flex; align-items:center; justify-content:center; color:#64748B; font-size:32px;">🏢</div>
      <div style="padding:16px;">
        <div class="badge badge-emerald">Disponible para arriendo</div>
        <div style="font-size:15px; font-weight:700; margin-top:8px;">Cra 43A # 18 Sur - 125, Apto 502</div>
        <div style="font-size:12px; color:#64748B;">El Poblado · Medellín</div>
        <div style="font-size:17px; font-weight:800; color:#0F172A; margin-top:12px;">$ 1.850.000 <span style="font-size:11px; font-weight:500; color:#64748B;">/ mes</span></div>
      </div>
    </div>
  </div>
</div>
""")
capture(s1, "cu-01.png")

# Screen 2: CU-02 - Catálogo y Filtro de Propiedades por Ocupación
s2 = wrap_page("properties", "Catálogo de Inmuebles", "Inventario activo y control de disponibilidad", """
<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
  <div style="display:flex; gap:8px;">
    <button class="btn btn-primary" style="padding:6px 14px; font-size:12.5px;">Todos (16)</button>
    <button class="btn btn-outline" style="padding:6px 14px; font-size:12.5px;">🟢 Disponibles (4)</button>
    <button class="btn btn-outline" style="padding:6px 14px; font-size:12.5px;">🔵 Arrendados (11)</button>
    <button class="btn btn-outline" style="padding:6px 14px; font-size:12.5px;">🟠 Mantenimiento (1)</button>
  </div>
  <div style="display:flex; gap:12px;">
    <input class="form-input" placeholder="🔍 Buscar por dirección o barrio..." style="width:280px; padding:6px 12px; font-size:12.5px;" />
    <button class="btn btn-primary" style="padding:6px 14px; font-size:12.5px;">+ Nuevo Inmueble</button>
  </div>
</div>

<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:18px;">
  <div class="card" style="padding:16px;">
    <div style="display:flex; justify-content:space-between;">
      <span class="badge badge-emerald">Disponible</span>
      <span style="font-size:11px; color:#94A3B8;">INM-001</span>
    </div>
    <div style="font-size:14px; font-weight:700; margin-top:10px;">Cra 43A # 18 Sur - 125, Apto 502</div>
    <div style="font-size:12px; color:#64748B;">El Poblado · 78 m² · 3 Hab</div>
    <div style="font-size:16px; font-weight:800; color:#0F172A; margin-top:12px;">$ 1.850.000 <span style="font-size:11px; font-weight:400; color:#64748B;">COP/mes</span></div>
  </div>

  <div class="card" style="padding:16px;">
    <div style="display:flex; justify-content:space-between;">
      <span class="badge badge-blue">Arrendado</span>
      <span style="font-size:11px; color:#94A3B8;">INM-002</span>
    </div>
    <div style="font-size:14px; font-weight:700; margin-top:10px;">Calle 10 # 40-20, Int 301</div>
    <div style="font-size:12px; color:#64748B;">Laureles · Inquilino: Carlos Gómez</div>
    <div style="font-size:16px; font-weight:800; color:#0F172A; margin-top:12px;">$ 1.450.000 <span style="font-size:11px; font-weight:400; color:#64748B;">COP/mes</span></div>
  </div>

  <div class="card" style="padding:16px;">
    <div style="display:flex; justify-content:space-between;">
      <span class="badge badge-blue">Arrendado</span>
      <span style="font-size:11px; color:#94A3B8;">INM-003</span>
    </div>
    <div style="font-size:14px; font-weight:700; margin-top:10px;">Transversal 39 # 72-15</div>
    <div style="font-size:12px; color:#64748B;">Belén Rosales · Inquilina: Mariana Ríos</div>
    <div style="font-size:16px; font-weight:800; color:#0F172A; margin-top:12px;">$ 1.200.000 <span style="font-size:11px; font-weight:400; color:#64748B;">COP/mes</span></div>
  </div>

  <div class="card" style="padding:16px;">
    <div style="display:flex; justify-content:space-between;">
      <span class="badge badge-amber">Mantenimiento</span>
      <span style="font-size:11px; color:#94A3B8;">INM-004</span>
    </div>
    <div style="font-size:14px; font-weight:700; margin-top:10px;">Av. Las Vegas # 10-50, Local 12</div>
    <div style="font-size:12px; color:#64748B;">Envigado · Pintura e impermeabilización</div>
    <div style="font-size:16px; font-weight:800; color:#0F172A; margin-top:12px;">$ 2.400.000 <span style="font-size:11px; font-weight:400; color:#64748B;">COP/mes</span></div>
  </div>

  <div class="card" style="padding:16px;">
    <div style="display:flex; justify-content:space-between;">
      <span class="badge badge-emerald">Disponible</span>
      <span style="font-size:11px; color:#94A3B8;">INM-005</span>
    </div>
    <div style="font-size:14px; font-weight:700; margin-top:10px;">Diagonal 75B # 32A-18, Apto 204</div>
    <div style="font-size:12px; color:#64748B;">La Mota · 62 m² · 2 Hab</div>
    <div style="font-size:16px; font-weight:800; color:#0F172A; margin-top:12px;">$ 1.350.000 <span style="font-size:11px; font-weight:400; color:#64748B;">COP/mes</span></div>
  </div>

  <div class="card" style="padding:16px;">
    <div style="display:flex; justify-content:space-between;">
      <span class="badge badge-blue">Arrendado</span>
      <span style="font-size:11px; color:#94A3B8;">INM-006</span>
    </div>
    <div style="font-size:14px; font-weight:700; margin-top:10px;">Circular 4 # 73-45, Casa 2</div>
    <div style="font-size:12px; color:#64748B;">Bolivariana · Inquilino: Felipe Mejía</div>
    <div style="font-size:16px; font-weight:800; color:#0F172A; margin-top:12px;">$ 2.100.000 <span style="font-size:11px; font-weight:400; color:#64748B;">COP/mes</span></div>
  </div>
</div>
""")
capture(s2, "cu-02.png")

# Screen 3: CU-03 - Ficha Técnica Detallada e Historial del Inmueble
s3 = wrap_page("properties", "Ficha Técnica · INM-002", "Expediente detallado de la propiedad y trazabilidad de contratos", """
<div style="display:flex; gap:24px;">
  <div style="flex:1.8; display:flex; flex-direction:column; gap:20px;">
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="badge badge-blue">Contrato Vigente Activo</span>
          <h2 style="font-size:18px; font-weight:800; margin-top:8px;">Calle 10 # 40-20, Int 301</h2>
          <div style="font-size:12.5px; color:#64748B;">Barrio Laureles · Medellín · Estrato 5</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px; color:#64748B;">Canon Pactado</div>
          <div style="font-size:20px; font-weight:800; color:#0F172A;">$ 1.450.000 <span style="font-size:11px; font-weight:400; color:#64748B;">COP</span></div>
        </div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-top:18px; padding-top:16px; border-top:1px solid #F1F5F9;">
        <div><div style="font-size:11px; color:#64748B;">Área</div><div style="font-weight:600; font-size:13px;">74 m²</div></div>
        <div><div style="font-size:11px; color:#64748B;">Habitaciones</div><div style="font-weight:600; font-size:13px;">3 alcobas</div></div>
        <div><div style="font-size:11px; color:#64748B;">Baños</div><div style="font-weight:600; font-size:13px;">2 baños</div></div>
        <div><div style="font-size:11px; color:#64748B;">Matrícula Inmob.</div><div style="font-weight:600; font-size:13px;">001-492817</div></div>
      </div>
    </div>

    <div class="card">
      <div style="font-size:14px; font-weight:700; margin-bottom:12px;">Historial de Contratos y Ocupación</div>
      <table class="table">
        <thead><tr><th>Período</th><th>Inquilino Titular</th><th>Canon</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td><b>01/01/2026 – 31/12/2026</b></td><td>Carlos Alberto Gómez</td><td>$ 1.450.000</td><td><span class="badge badge-emerald">Vigente (Al día)</span></td></tr>
          <tr><td>01/01/2025 – 31/12/2025</td><td>Andrea Restrepo M.</td><td>$ 1.320.000</td><td><span class="badge" style="background:#F1F5F9; color:#475569;">Finalizado con Paz y Salvo</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div style="flex:1.2; display:flex; flex-direction:column; gap:20px;">
    <div class="card" style="background:#FAF5FF; border-color:#E9D5FF;">
      <div style="font-size:13px; font-weight:700; color:#6D28D9;">Inquilino Titular Actual</div>
      <div style="margin-top:10px;">
        <div style="font-size:15px; font-weight:700; color:#1E1B4B;">Carlos Alberto Gómez</div>
        <div style="font-size:12px; color:#64748B;">C.C. 1.037.649.281</div>
        <div style="font-size:12px; color:#64748B; margin-top:6px;">📱 +57 314 829 4019</div>
        <div style="font-size:12px; color:#64748B;">✉️ c.gomez.arriendos@gmail.com</div>
        <div style="margin-top:12px; padding-top:10px; border-top:1px solid #E9D5FF; font-size:12px;">
          <b>Corte mensual:</b> Día 05 de cada mes
        </div>
      </div>
    </div>

    <div class="card">
      <div style="font-size:13px; font-weight:700; margin-bottom:10px;">Acciones Rápidas</div>
      <button class="btn btn-outline" style="width:100%; margin-bottom:8px; justify-content:flex-start;">📄 Ver Contrato Completo en PDF</button>
      <button class="btn btn-outline" style="width:100%; justify-content:flex-start;">💳 Historial de Pagos y Recibos</button>
    </div>
  </div>
</div>
""")
capture(s3, "cu-03.png")

# Screen 4: CU-04 - Registro y Validación de Identidad del Inquilino
s4 = wrap_page("tenants", "Registro de Inquilino", "Directorio oficial de arrendatarios · Faroo", """
<div style="max-width:760px; margin:0 auto;" class="card">
  <div style="font-size:16px; font-weight:700; margin-bottom:6px;">Datos del Inquilino Titular</div>
  <div style="font-size:12.5px; color:#64748B; margin-bottom:20px;">Habilita el acceso al portal y programa las notificaciones por WhatsApp.</div>
  
  <div class="form-row">
    <div class="form-group form-col">
      <label class="form-label">Nombres Completos *</label>
      <input class="form-input" value="Carlos Alberto" />
    </div>
    <div class="form-group form-col">
      <label class="form-label">Apellidos *</label>
      <input class="form-input" value="Gómez Saldarriaga" />
    </div>
  </div>

  <div class="form-row">
    <div class="form-group form-col">
      <label class="form-label">Cédula de Ciudadanía (C.C.) *</label>
      <input class="form-input" value="1.037.649.281" style="font-weight:600;" />
      <div style="font-size:11px; color:#059669; margin-top:4px;">✓ Documento único verificado (no se encuentra en mora previa).</div>
    </div>
    <div class="form-group form-col">
      <label class="form-label">Número Celular / WhatsApp *</label>
      <input class="form-input" value="+57 314 829 4019" />
    </div>
  </div>

  <div class="form-group">
    <label class="form-label">Correo Electrónico *</label>
    <input class="form-input" value="c.gomez.arriendos@gmail.com" />
    <div style="font-size:11px; color:#64748B; margin-top:4px;">Aquí llegarán los recibos oficiales y recordatorios de pago.</div>
  </div>

  <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px; padding-top:16px; border-top:1px solid #F1F5F9;">
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-primary">Registrar en Faroo</button>
  </div>
</div>
""")
capture(s4, "cu-04.png")

# Screen 5: CU-05 - Incorporación de Fiador / Codeudor Solidario
s5 = wrap_page("contracts", "Asignación de Fiador Solidario", "Garantías y respaldo conforme a la Ley 820 de 2003", """
<div style="max-width:760px; margin:0 auto;" class="card">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
    <div>
      <div style="font-size:16px; font-weight:700;">Codeudor / Fiador Solidario</div>
      <div style="font-size:12.5px; color:#64748B;">Vinculado al contrato #CTR-2026-089 (Laureles Int 301)</div>
    </div>
    <span class="badge badge-emerald">Garantía Activa</span>
  </div>

  <div class="form-row">
    <div class="form-group form-col">
      <label class="form-label">Nombre Completo del Fiador *</label>
      <input class="form-input" value="Marta Elena Saldarriaga Pérez" />
    </div>
    <div class="form-group form-col">
      <label class="form-label">Cédula del Fiador *</label>
      <input class="form-input" value="43.829.104" />
    </div>
  </div>

  <div class="form-row">
    <div class="form-group form-col">
      <label class="form-label">Teléfono de Contacto</label>
      <input class="form-input" value="+57 300 651 9823" />
    </div>
    <div class="form-group form-col">
      <label class="form-label">Parentesco / Relación</label>
      <input class="form-input" value="Familiar Directo (Madre)" />
    </div>
  </div>

  <div style="background:#F8FAFC; border:1px dashed #CBD5E1; border-radius:10px; padding:16px; margin-bottom:18px;">
    <div style="font-size:13px; font-weight:600; color:#334155;">Soporte de Ingresos Adjunto</div>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
      <div style="font-size:12.5px; color:#64748B;">📄 extractos_bancarios_ult_3_meses.pdf (2.4 MB)</div>
      <span class="badge badge-emerald">Verificado por Admin</span>
    </div>
  </div>

  <div style="display:flex; justify-content:flex-end; gap:12px;">
    <button class="btn btn-outline">Volver</button>
    <button class="btn btn-primary">Guardar Fiador en Contrato</button>
  </div>
</div>
""")
capture(s5, "cu-05.png")

# Screen 6: CU-06 - Radicación de Contrato con Día Fijo de Corte
s6 = wrap_page("contracts", "Radicación de Nuevo Contrato", "Formalización y fijación de fecha límite de corte mensual", """
<div style="max-width:820px; margin:0 auto;" class="card">
  <div style="font-size:16px; font-weight:700; margin-bottom:4px;">Asistente de Contrato de Arriendo</div>
  <div style="font-size:12.5px; color:#64748B; margin-bottom:18px;">Conecta la propiedad disponible con el inquilino y programa el cobro mensual.</div>

  <div class="form-row">
    <div class="form-group form-col">
      <label class="form-label">Inmueble a Arrendar *</label>
      <select class="form-input"><option>Calle 10 # 40-20, Int 301 (Laureles) — $1.450.000</option></select>
    </div>
    <div class="form-group form-col">
      <label class="form-label">Inquilino Titular *</label>
      <select class="form-input"><option>Carlos Alberto Gómez (C.C. 1.037.649.281)</option></select>
    </div>
  </div>

  <div class="form-row">
    <div class="form-group form-col">
      <label class="form-label">Fecha de Inicio *</label>
      <input class="form-input" type="text" value="01 / Feb / 2026" />
    </div>
    <div class="form-group form-col">
      <label class="form-label">Duración</label>
      <select class="form-input"><option>12 meses (renovable)</option><option>6 meses</option></select>
    </div>
    <div class="form-group form-col">
      <label class="form-label">Día Fijo de Corte Mensual (1 al 28) *</label>
      <input class="form-input" value="Día 05 de cada mes" style="font-weight:700; color:#0F172A; background:#EFF6FF; border-color:#BFDBFE;" />
      <div style="font-size:11px; color:#2563EB; margin-top:4px;">Rango 1..28 para evitar desfases en febrero.</div>
    </div>
  </div>

  <div class="form-group">
    <label class="form-label">Canon Mensual Pactado</label>
    <input class="form-input" value="$ 1.450.000 COP" style="font-weight:800; font-size:16px; color:#047857;" />
  </div>

  <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px; padding-top:16px; border-top:1px solid #F1F5F9;">
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-primary">Radicar y Activar Contrato</button>
  </div>
</div>
""")
capture(s6, "cu-06.png")

# Screen 7: CU-07 - Consulta y Evaluación de Riesgo Contractual
s7 = wrap_page("contracts", "Evaluación de Riesgo Contractual", "Scoring preventivo de solvencia e historial de impago", """
<div style="display:flex; gap:24px;">
  <div class="card" style="flex:1.4;">
    <div style="font-size:15px; font-weight:700; margin-bottom:12px;">Dictamen de Riesgo Crediticio</div>
    <div style="display:flex; align-items:center; gap:24px; padding:20px; background:#F0FDF4; border:1px solid #BBF7D0; border-radius:12px;">
      <div style="font-size:42px; font-weight:900; color:#15803D;">84<span style="font-size:18px; font-weight:600; color:#16A34A;">/100</span></div>
      <div>
        <div class="badge badge-emerald">Riesgo Bajo · Aprobación Recomendada</div>
        <div style="font-size:13px; color:#166534; margin-top:6px; line-height:1.4;">
          El inquilino y fiador demuestran ingresos combinados equivalentes a <b>3.4 veces el canon</b>. Sin reportes negativos en centrales.
        </div>
      </div>
    </div>

    <div style="margin-top:20px;">
      <div style="font-size:13px; font-weight:700; margin-bottom:10px;">Factores Evaluados</div>
      <div style="display:flex; flex-direction:column; gap:10px; font-size:12.5px;">
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #F1F5F9;">
          <span>Capacidad de Pago (Ingresos vs Canon)</span><span style="font-weight:700; color:#047857;">Excelente (3.4x)</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #F1F5F9;">
          <span>Respaldo de Codeudor Solidario</span><span style="font-weight:700; color:#047857;">Verificado (Extractos validados)</span>
        </div>
        <div style="display:flex; justify-content:space-between; padding:8px 0;">
          <span>Historial de Pagos en Faroo</span><span style="font-weight:700; color:#047857;">100% puntual (12 meses al día)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="card" style="flex:1;">
    <div style="font-size:14px; font-weight:700; margin-bottom:12px;">Garantías Aportadas</div>
    <div style="font-size:12.5px; color:#64748B; margin-bottom:12px;">Contrato #CTR-2026-089 · Canon: $1.450.000</div>
    <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px; margin-bottom:8px;">
      <div style="font-weight:600; font-size:12.5px;">Fiador Marta Elena Saldarriaga</div>
      <div style="font-size:11px; color:#64748B;">Ingresos comprobados: $ 3.500.000 COP</div>
    </div>
    <button class="btn btn-outline" style="width:100%; margin-top:12px; font-size:12.5px;">Exportar Dictamen en PDF</button>
  </div>
</div>
""")
capture(s7, "cu-07.png")

# Screen 8: CU-08 - Emisión Puntual de Cobro Mensual Recurrente
s8 = wrap_page("charges", "Emisión Mensual de Facturación", "Ciclo de cobros recurrentes de cánones de arriendo", """
<div class="card">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
    <div>
      <div style="font-size:16px; font-weight:700;">Período Fiscal: Octubre 2026</div>
      <div style="font-size:12.5px; color:#64748B;">Generación automática según fecha de corte pactada en contrato</div>
    </div>
    <button class="btn btn-primary">⚡ Emitir Facturación del Período</button>
  </div>

  <table class="table">
    <thead><tr><th>Contrato</th><th>Inmueble</th><th>Inquilino</th><th>Día Corte</th><th>Valor Canon</th><th>Estado Cobro</th></tr></thead>
    <tbody>
      <tr><td>CTR-2026-089</td><td>Calle 10 # 40-20, Int 301</td><td>Carlos Alberto Gómez</td><td>Día 05</td><td>$ 1.450.000</td><td><span class="badge badge-amber">Emitido (Pendiente)</span></td></tr>
      <tr><td>CTR-2026-092</td><td>Transversal 39 # 72-15</td><td>Mariana Ríos</td><td>Día 05</td><td>$ 1.200.000</td><td><span class="badge badge-amber">Emitido (Pendiente)</span></td></tr>
      <tr><td>CTR-2026-095</td><td>Circular 4 # 73-45</td><td>Felipe Mejía</td><td>Día 08</td><td>$ 2.100.000</td><td><span class="badge badge-blue">Programado 08/Oct</span></td></tr>
      <tr><td>CTR-2026-098</td><td>Av. Las Vegas Local 12</td><td>Inversiones Antioquia</td><td>Día 10</td><td>$ 2.400.000</td><td><span class="badge badge-blue">Programado 10/Oct</span></td></tr>
    </tbody>
  </table>
</div>
""")
capture(s8, "cu-08.png")

# Screen 9: CU-09 - Consulta de Resumen Financiero y Cartera Consolidada
s9 = wrap_page("charges", "Resumen Financiero y Cartera", "Consolidado gerencial de recaudos vs saldos pendientes", """
<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:18px; margin-bottom:24px;">
  <div class="card">
    <div style="font-size:12px; font-weight:600; color:#64748B;">Total Recaudado (Mes)</div>
    <div style="font-size:24px; font-weight:800; color:#047857; margin-top:6px;">$ 11.600.000 <span style="font-size:12px; font-weight:400; color:#64748B;">COP</span></div>
    <div style="font-size:12px; color:#059669; margin-top:4px;">↑ 80% de la meta mensual</div>
  </div>
  <div class="card">
    <div style="font-size:12px; font-weight:600; color:#64748B;">Cartera Pendiente de Cobro</div>
    <div style="font-size:24px; font-weight:800; color:#B45309; margin-top:6px;">$ 2.900.000 <span style="font-size:12px; font-weight:400; color:#64748B;">COP</span></div>
    <div style="font-size:12px; color:#D97706; margin-top:4px;">2 contratos por vencer</div>
  </div>
  <div class="card">
    <div style="font-size:12px; font-weight:600; color:#64748B;">Tasa de Cumplimiento</div>
    <div style="font-size:24px; font-weight:800; color:#0F172A; margin-top:6px;">88.5 %</div>
    <div style="font-size:12px; color:#64748B; margin-top:4px;">14 de 16 contratos al día</div>
  </div>
</div>

<div class="card">
  <div style="font-size:15px; font-weight:700; margin-bottom:12px;">Comportamiento Mensual (Recaudado vs Proyectado)</div>
  <div style="height:120px; background:#F8FAFC; border-radius:8px; display:flex; align-items:flex-end; gap:24px; padding:16px 24px;">
    <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
      <div style="width:100%; height:75px; background:#CBD5E1; border-radius:4px;"></div>
      <span style="font-size:11px; color:#64748B;">Jul</span>
    </div>
    <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
      <div style="width:100%; height:82px; background:#CBD5E1; border-radius:4px;"></div>
      <span style="font-size:11px; color:#64748B;">Ago</span>
    </div>
    <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
      <div style="width:100%; height:90px; background:#CBD5E1; border-radius:4px;"></div>
      <span style="font-size:11px; color:#64748B;">Sep</span>
    </div>
    <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
      <div style="width:100%; height:100px; background:#0F172A; border-radius:4px;"></div>
      <span style="font-size:11px; font-weight:700; color:#0F172A;">Oct (Actual)</span>
    </div>
  </div>
</div>
""")
capture(s9, "cu-09.png")

# Screen 10: CU-10 - Carga de Comprobante de Pago Bancario con Foto
s10 = wrap_page("", "", "", """
<div class="portal-card">
  <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #E2E8F0; pb:16px; margin-bottom:20px;">
    <div>
      <div style="font-size:18px; font-weight:800; color:#0F172A;">Portal del Inquilino · Faroo</div>
      <div style="font-size:12.5px; color:#64748B;">Inquilino: Carlos Alberto Gómez · Apto 301 Laureles</div>
    </div>
    <div class="badge badge-blue">Octubre 2026</div>
  </div>

  <div style="background:#EFF6FF; border:1px solid #BFDBFE; border-radius:12px; padding:16px; margin-bottom:20px;">
    <div style="font-size:12px; color:#1D4ED8; font-weight:600;">Canon Pendiente por Pagar:</div>
    <div style="font-size:24px; font-weight:800; color:#1E3A8A; margin-top:2px;">$ 1.450.000 <span style="font-size:13px; font-weight:500;">COP</span></div>
    <div style="font-size:11.5px; color:#2563EB; margin-top:4px;">Fecha límite de pago: 05 de Octubre de 2026</div>
  </div>

  <div style="font-size:13.5px; font-weight:700; margin-bottom:8px;">Subir Comprobante de Transferencia</div>
  <div style="border:2px dashed #94A3B8; border-radius:12px; padding:24px; text-align:center; background:#F8FAFC;">
    <div style="font-size:32px; margin-bottom:8px;">📸</div>
    <div style="font-size:13px; font-weight:600; color:#334155;">Foto de la transferencia bancaria seleccionada:</div>
    <div style="font-size:12px; color:#047857; font-weight:600; margin-top:4px;">comprobante_nequi_octubre_1450000.jpg (1.8 MB)</div>
    <div style="font-size:11px; font-family:monospace; color:#64748B; margin-top:6px;">Hash SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</div>
  </div>

  <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px;">
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-emerald" style="font-size:14px; padding:10px 22px;">Confirmar y Enviar Comprobante</button>
  </div>
</div>
""", is_portal=True)
capture(s10, "cu-10.png")

# Screen 11: CU-11 - Conciliación de Pagos y Aprobación de Abonos Parciales
s11 = wrap_page("charges", "Bandeja de Conciliación de Pagos", "Cotejo visual de comprobante vs cuenta bancaria", """
<div style="display:flex; gap:24px;">
  <div class="card" style="flex:1.2; background:#F8FAFC; text-align:center;">
    <div style="font-size:13px; font-weight:700; margin-bottom:10px; color:#475569;">Soporte Subido por el Inquilino</div>
    <div style="background:#FFF; border:1px solid #CBD5E1; border-radius:8px; padding:16px; display:inline-block; text-align:left; width:100%; max-width:320px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="color:#2D0C5E; font-weight:800; font-size:18px;">Nequi Colombia</div>
      <div style="font-size:11px; color:#64748B; margin-top:2px;">¡Envío Exitoso!</div>
      <div style="font-size:20px; font-weight:900; color:#0F172A; margin:12px 0;">$ 1.450.000,00</div>
      <div style="font-size:11px; color:#64748B;">Para: Inmobiliaria Faroo S.A.S.</div>
      <div style="font-size:11px; color:#64748B;">Fecha: 04/Oct/2026 - 15:42</div>
      <div style="font-size:10px; font-family:monospace; color:#94A3B8; margin-top:8px;">Referencia: M94829104</div>
    </div>
  </div>

  <div class="card" style="flex:1.8;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <div style="font-size:15px; font-weight:700;">Validación Administrativa</div>
      <span class="badge badge-amber">En Revisión</span>
    </div>
    <div class="form-row">
      <div class="form-group form-col">
        <label class="form-label">Valor Esperado</label>
        <input class="form-input" value="$ 1.450.000" disabled style="background:#F1F5F9; font-weight:600;" />
      </div>
      <div class="form-group form-col">
        <label class="form-label">Valor Conciliado en Banco *</label>
        <input class="form-input" value="$ 1.450.000" style="font-weight:700; color:#047857;" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Fecha de Ingreso a Cuenta</label>
      <input class="form-input" value="04 de Octubre de 2026" />
    </div>
    <div style="background:#ECFDF5; border:1px solid #A7F3D0; border-radius:8px; padding:12px; margin-bottom:16px; font-size:12.5px; color:#065F46;">
      ✓ El valor coincide exactamente con el canon del mes. El saldo quedará en <b>$ 0 COP</b> y se generará Paz y Salvo.
    </div>
    <div style="display:flex; justify-content:space-between; margin-top:16px;">
      <button class="btn btn-danger" style="background:#DC2626;">Devolver Foto (Ilegible)</button>
      <button class="btn btn-emerald">Aprobar y Emitir Recibo Oficial</button>
    </div>
  </div>
</div>
""")
capture(s11, "cu-11.png")

# Screen 12: CU-12 - Descarga de Recibo Oficial en PDF y Paz y Salvo
s12 = wrap_page("charges", "Recibo Oficial de Arrendamiento", "Documento tributario formal y Paz y Salvo digital", """
<div style="max-width:720px; margin:0 auto;" class="card">
  <div style="display:flex; justify-content:space-between; border-bottom:2px solid #0F172A; padding-bottom:16px; margin-bottom:18px;">
    <div>
      <div style="font-size:20px; font-weight:900; color:#0F172A;">FAROO INMOBILIARIA S.A.S.</div>
      <div style="font-size:11px; color:#64748B;">NIT: 901.482.910-4 · Matrícula Inmobiliaria 001-492817</div>
      <div style="font-size:11px; color:#64748B;">Medellín, Colombia · info@faroo.co</div>
    </div>
    <div style="text-align:right;">
      <div class="badge badge-emerald" style="font-size:13px; padding:4px 14px;">PAZ Y SALVO</div>
      <div style="font-size:14px; font-weight:800; margin-top:6px;">RECIBO # REC-2026-0891</div>
      <div style="font-size:11px; color:#64748B;">Fecha: 04/Oct/2026</div>
    </div>
  </div>

  <div style="font-size:13px; line-height:1.6; margin-bottom:16px;">
    <b>Recibimos de:</b> Carlos Alberto Gómez (C.C. 1.037.649.281)<br>
    <b>La suma de:</b> UN MILLÓN CUATROCIENTOS CINCUENTA MIL PESOS M/CTE ($ 1.450.000 COP)<br>
    <b>Por concepto de:</b> Canon de arrendamiento mes de Octubre 2026 · Inmueble Laureles Int 301.
  </div>

  <table class="table" style="margin-bottom:20px;">
    <thead><tr><th>Concepto</th><th>Período</th><th>Valor</th><th>Saldo Restante</th></tr></thead>
    <tbody>
      <tr><td>Canon de Arrendamiento Residencial</td><td>01/Oct/2026 – 31/Oct/2026</td><td>$ 1.450.000</td><td><b style="color:#047857;">$ 0 COP</b></td></tr>
    </tbody>
  </table>

  <div style="display:flex; justify-content:flex-end; gap:12px;">
    <button class="btn btn-outline">Imprimir</button>
    <button class="btn btn-primary">⬇ Descargar PDF Firmado</button>
  </div>
</div>
""")
capture(s12, "cu-12.png")

# Screen 13: CU-13 - Semáforo Visual de Morosidad y Alertas Tempranas
s13 = wrap_page("charges", "Semáforo de Cartera y Morosidad", "Control visual de pagos al día, próximos a vencer y mora", """
<div style="display:flex; gap:12px; margin-bottom:18px;">
  <div class="badge badge-emerald" style="font-size:12px; padding:6px 14px;">🟢 Verde: 13 Contratos al Día</div>
  <div class="badge badge-amber" style="font-size:12px; padding:6px 14px;">🟡 Amarillo: 2 Próximos a Vencer (en 48h)</div>
  <div class="badge badge-red" style="font-size:12px; padding:6px 14px;">🔴 Rojo: 1 En Mora Activa</div>
</div>

<div class="card">
  <table class="table">
    <thead><tr><th>Estado</th><th>Inquilino</th><th>Inmueble</th><th>Fecha Límite</th><th>Valor</th><th>Días Mora</th><th>Acción Rápida</th></tr></thead>
    <tbody>
      <tr>
        <td><span class="badge badge-emerald">Al Día</span></td>
        <td>Carlos Alberto Gómez</td>
        <td>Laureles Int 301</td>
        <td>05/Oct/2026</td>
        <td>$ 1.450.000</td>
        <td>0 días</td>
        <td><button class="btn btn-outline" style="padding:4px 10px; font-size:11px;">Ver Recibo</button></td>
      </tr>
      <tr>
        <td><span class="badge badge-amber">Vence en 2 días</span></td>
        <td>Mariana Ríos</td>
        <td>Belén Rosales</td>
        <td>07/Oct/2026</td>
        <td>$ 1.200.000</td>
        <td>-</td>
        <td><button class="btn btn-primary" style="padding:4px 10px; font-size:11px; background:#D97706;">WhatsApp Preventivo</button></td>
      </tr>
      <tr>
        <td><span class="badge badge-red">Mora Activa</span></td>
        <td>Jorge Iván Morales</td>
        <td>Poblado Suite 802</td>
        <td>01/Oct/2026</td>
        <td>$ 2.300.000</td>
        <td><b style="color:#DC2626;">+6 días</b></td>
        <td><button class="btn btn-danger" style="padding:4px 10px; font-size:11px;">Cobro Prioritario</button></td>
      </tr>
    </tbody>
  </table>
</div>
""")
capture(s13, "cu-13.png")

# Screen 14: CU-14 - Disparo de Recordatorio Preventivo por WhatsApp
s14 = wrap_page("charges", "Recordatorio de Cobro por WhatsApp", "Disparo cordial con valor exacto y enlace directo al portal", """
<div style="max-width:680px; margin:0 auto;" class="card">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
    <div style="font-size:16px; font-weight:700;">Envío de Recordatorio Cordial</div>
    <span class="badge badge-emerald">📱 Conexión WhatsApp Directa</span>
  </div>

  <div style="font-size:12.5px; color:#64748B; margin-bottom:16px;">
    Destinatario: <b>Carlos Alberto Gómez</b> (+57 314 829 4019)
  </div>

  <div style="background:#EFEAE2; border-radius:12px; padding:18px; margin-bottom:18px;">
    <div style="background:#DCF8C6; border-radius:8px; padding:12px; font-size:13px; color:#111; line-height:1.5; max-width:85%; box-shadow:0 1px 2px rgba(0,0,0,0.1);">
      Hola <b>Carlos</b>, te saludamos de Faroo Inmobiliaria 👋<br><br>
      Te recordamos cordialmente que el canon de arrendamiento de tu inmueble (Laureles Int 301) por valor de <b>$ 1.450.000 COP</b> vence el día de mañana, 05 de Octubre.<br><br>
      Puedes subir la foto de tu comprobante en un solo clic aquí:<br>
      👉 <a href="#" style="color:#075E54; font-weight:600;">https://app.faroo.co/portal/pago-octubre</a>
      <div style="text-align:right; font-size:10px; color:#64748B; margin-top:6px;">10:24 a.m. ✓✓</div>
    </div>
  </div>

  <div style="display:flex; justify-content:flex-end; gap:12px;">
    <button class="btn btn-outline">Cerrar</button>
    <button class="btn btn-emerald" style="background:#25D366; color:#FFF; font-weight:700;">📲 Abrir en WhatsApp</button>
  </div>
</div>
""")
capture(s14, "cu-14.png")

# Screen 15: CU-15 - Actualización de Teléfono y Datos de Contacto
s15 = wrap_page("tenants", "Actualizar Datos de Contacto", "Trazabilidad segura ante cambios de celular o pérdida de línea", """
<div style="max-width:720px; margin:0 auto;" class="card">
  <div style="font-size:16px; font-weight:700; margin-bottom:4px;">Inquilino: Carlos Alberto Gómez</div>
  <div style="font-size:12.5px; color:#64748B; margin-bottom:18px;">C.C. 1.037.649.281 · Bitácora de trazabilidad de cambios activa</div>

  <div class="form-row">
    <div class="form-group form-col">
      <label class="form-label">Nuevo Número Celular / WhatsApp *</label>
      <input class="form-input" value="+57 318 402 9182" style="font-weight:700; color:#0F172A;" />
      <div style="font-size:11px; color:#64748B; margin-top:4px;">Anterior: +57 314 829 4019</div>
    </div>
    <div class="form-group form-col">
      <label class="form-label">Correo Electrónico de Notificaciones</label>
      <input class="form-input" value="c.gomez.arriendos@gmail.com" />
    </div>
  </div>

  <div class="form-group">
    <label class="form-label">Motivo del Cambio de Datos *</label>
    <input class="form-input" value="Cambio de operador celular y pérdida de línea anterior." />
  </div>

  <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:12px; margin-bottom:18px; font-size:12px; color:#475569;">
    🛡️ Quedará registrado en bitácora: <b>Usuario David Machado</b> actualizó teléfono el 14/Nov/2026 a las 11:40 AM.
  </div>

  <div style="display:flex; justify-content:flex-end; gap:12px;">
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-primary">Guardar Cambios</button>
  </div>
</div>
""")
capture(s15, "cu-15.png")

# Screen 16: CU-16 - Devolución de Comprobante Ilegible con Causal Registrada
s16 = wrap_page("support", "Devolución de Comprobante Ilegible", "Módulo de Soporte y Aclaración de Pagos · Faroo", """
<div style="max-width:760px; margin:0 auto;" class="card">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
    <div>
      <div style="font-size:16px; font-weight:700; color:#DC2626;">Devolución de Soporte al Inquilino</div>
      <div style="font-size:12.5px; color:#64748B;">Comprobante de pago #PAG-9482 · Inquilino Carlos Gómez</div>
    </div>
    <span class="badge badge-red">Acción Requerida</span>
  </div>

  <div class="form-group">
    <label class="form-label">Causal de Devolución *</label>
    <select class="form-input"><option>Foto borrosa / cortada (datos ilegibles)</option><option>Valor consignado no coincide</option><option>Comprobante de fecha vencida o duplicado</option></select>
  </div>

  <div class="form-group">
    <label class="form-label">Explicación Clara para el Inquilino (Mínimo 10 caracteres) *</label>
    <textarea class="form-input" style="height:90px; resize:none;">La foto subida está cortada en la parte superior y no se alcanza a leer el número de aprobación de Nequi ni la fecha exacta. Por favor vuelve a tomar la captura completa de pantalla.</textarea>
    <div style="display:flex; justify-content:space-between; font-size:11px; color:#059669; margin-top:4px;">
      <span>✓ Causal clara (el inquilino sabrá exactamente qué corregir)</span>
      <span>158 / 10 caracteres</span>
    </div>
  </div>

  <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px; padding-top:16px; border-top:1px solid #F1F5F9;">
    <button class="btn btn-outline">Cancelar</button>
    <button class="btn btn-danger">Confirmar Devolución y Notificar Inquilino</button>
  </div>
</div>
""")
capture(s16, "cu-16.png")

print("All 16 screenshots successfully created in public/screenshots/!")
