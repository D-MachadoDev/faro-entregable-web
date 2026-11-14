const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { chromium } = require('C:/Users/da-V7/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../public/screenshots');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Create owner JWT token
function createToken(role = 'User', email = 'pryt980@gmail.com', userId = 'a432d83f-e1cd-45bc-a68b-4fc6d3925233') {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    nameid: userId,
    owner_id: userId,
    role: role,
    email: email,
    iss: 'faroo',
    aud: 'faroo-api',
    nbf: now - 10,
    exp: now + 86400,
    iat: now
  };
  function b64url(obj) { return Buffer.from(JSON.stringify(obj)).toString('base64url'); }
  const key = 'dev-only-change-this-key-before-production-32';
  const unsigned = b64url(header) + '.' + b64url(payload);
  const sig = crypto.createHmac('sha256', key).update(unsigned).digest('base64url');
  return unsigned + '.' + sig;
}

const ownerToken = createToken('User', 'pryt980@gmail.com', 'a432d83f-e1cd-45bc-a68b-4fc6d3925233');
const tenantToken = createToken('Tenant', 'c.gomez@gmail.com', 'b5555555-5555-5555-5555-555555555555');

async function main() {
  console.log('Launching browser to capture REAL Faroo app from http://localhost:5173/ ...');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 820 },
    deviceScaleFactor: 1
  });

  // Inject session helper
  await context.addInitScript(({ oToken, tToken }) => {
    sessionStorage.setItem('faro.session.ownerToken', oToken);
    sessionStorage.setItem('faro.session.tenantToken', tToken);
    sessionStorage.setItem('faro.session.userEmail', 'pryt980@gmail.com');
  }, { oToken: ownerToken, tToken: tenantToken });

  const page = await context.newPage();

  async function snap(filename) {
    const dest = path.join(OUTPUT_DIR, filename);
    await page.screenshot({ path: dest, fullPage: false });
    console.log(`[Captured REAL] ${filename} (${fs.statSync(dest).size} bytes)`);
  }

  // CU-01: Registro de Inmueble (Formulario modal abierto en /properties)
  console.log('Capturing CU-01...');
  await page.goto('http://localhost:5173/properties');
  await page.waitForTimeout(2000);
  try {
    const btn = page.locator('button:has-text("Nueva propiedad")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('Could not click Nueva propiedad:', e.message);
  }
  await snap('cu-01.png');

  // CU-02: Consulta y Filtros Avanzados de Inmuebles
  console.log('Capturing CU-02...');
  await page.goto('http://localhost:5173/properties');
  await page.waitForTimeout(1500);
  await snap('cu-02.png');

  // CU-03: Actualización de Estado de Inmueble (Detalle / Drawer / Publicación)
  console.log('Capturing CU-03...');
  try {
    const card = page.locator('.cursor-pointer, table tbody tr, [data-testid="property-card"]').first();
    if (await card.isVisible()) {
      await card.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-03.png');

  // CU-04: Registro y Creación de Ficha de Inquilino
  console.log('Capturing CU-04...');
  await page.goto('http://localhost:5173/tenants');
  await page.waitForTimeout(1500);
  try {
    const btn = page.locator('button:has-text("Nuevo arrendatario"), button:has-text("Nuevo inquilino"), button:has-text("Registrar")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-04.png');

  // CU-05: Creación de Contrato de Arrendamiento (Ley 820)
  console.log('Capturing CU-05...');
  await page.goto('http://localhost:5173/contracts');
  await page.waitForTimeout(1500);
  try {
    const btn = page.locator('button:has-text("Nuevo contrato"), button:has-text("Crear contrato")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-05.png');

  // CU-06: Consulta de Contrato Activo y Descarga de PDF
  console.log('Capturing CU-06...');
  await page.goto('http://localhost:5173/contracts');
  await page.waitForTimeout(1500);
  try {
    const row = page.locator('table tbody tr, .cursor-pointer').first();
    if (await row.isVisible()) {
      await row.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-06.png');

  // CU-07: Registro y Programación de Cobro Mensual
  console.log('Capturing CU-07...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(1500);
  try {
    const btn = page.locator('button:has-text("Nuevo cobro"), button:has-text("Registrar cobro"), button:has-text("Generar")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-07.png');

  // CU-08: Conciliación de Pago y Validación de Comprobante
  console.log('Capturing CU-08...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(1500);
  try {
    const compBtn = page.locator('button:has-text("Ver comprobante"), button:has-text("Conciliar"), button:has-text("Comprobante")').first();
    if (await compBtn.isVisible()) {
      await compBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-08.png');

  // CU-09: Generación y Descarga de Recibo Oficial de Pago
  console.log('Capturing CU-09...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(1500);
  try {
    const recBtn = page.locator('button:has-text("Recibo"), button:has-text("Ver recibo"), button:has-text("Descargar recibo")').first();
    if (await recBtn.isVisible()) {
      await recBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-09.png');

  // CU-10: Carga y Almacenamiento Seguro de Documentos (Cloudflare R2)
  console.log('Capturing CU-10...');
  await page.goto('http://localhost:5173/documents');
  await page.waitForTimeout(1500);
  try {
    const upBtn = page.locator('button:has-text("Subir documento"), button:has-text("Cargar documento")').first();
    if (await upBtn.isVisible()) {
      await upBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-10.png');

  // CU-11: Descarga y Consulta Segura de Documentos
  console.log('Capturing CU-11...');
  await page.goto('http://localhost:5173/documents');
  await page.waitForTimeout(1500);
  await snap('cu-11.png');

  // CU-12: Consulta Pública de Contrato mediante Código Seguro
  console.log('Capturing CU-12...');
  await page.goto('http://localhost:5173/portal/consulta');
  await page.waitForTimeout(1500);
  await snap('cu-12.png');

  // CU-13: Portal Privado del Inquilino
  console.log('Capturing CU-13...');
  await page.goto('http://localhost:5173/portal');
  await page.waitForTimeout(1500);
  await snap('cu-13.png');

  // CU-14: Notificación y Canal Directo por WhatsApp
  console.log('Capturing CU-14...');
  await page.goto('http://localhost:5173/tenant-support');
  await page.waitForTimeout(1500);
  await snap('cu-14.png');

  // CU-15: Actualización de Teléfono y Datos de Contacto
  console.log('Capturing CU-15...');
  await page.goto('http://localhost:5173/tenants');
  await page.waitForTimeout(1500);
  try {
    const editBtn = page.locator('button:has-text("Editar"), button[aria-label="Editar"], [title="Editar"]').first();
    if (await editBtn.isVisible()) {
      await editBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-15.png');

  // CU-16: Devolución de Comprobante Ilegible / Consola Soporte
  console.log('Capturing CU-16...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(1500);
  try {
    const rejBtn = page.locator('button:has-text("Rechazar"), button:has-text("Devolver"), button:has-text("Observaciones")').first();
    if (await rejBtn.isVisible()) {
      await rejBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {}
  await snap('cu-16.png');

  await browser.close();
  console.log('Finished capturing real app screenshots!');
}

main().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
