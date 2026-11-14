const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { chromium } = require('C:/Users/da-V7/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '../public/screenshots');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function createToken(role = 'User', email = 'pryt980@gmail.com', userId = 'a432d83f-e1cd-45bc-a68b-4fc6d3925233', extraClaims = {}) {
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
    iat: now,
    ...extraClaims
  };
  function b64url(obj) { return Buffer.from(JSON.stringify(obj)).toString('base64url'); }
  const key = 'dev-only-change-this-key-before-production-32';
  const unsigned = b64url(header) + '.' + b64url(payload);
  const sig = crypto.createHmac('sha256', key).update(unsigned).digest('base64url');
  return unsigned + '.' + sig;
}

const ownerToken = createToken('User', 'pryt980@gmail.com', 'a432d83f-e1cd-45bc-a68b-4fc6d3925233');
const tenantToken = createToken('Tenant', 'carlos.gomez@gmail.com', '99e6484e-a4f3-488e-a769-dee902f3f613', {
  tenantId: '99e6484e-a4f3-488e-a769-dee902f3f613',
  contractId: 'c8db638a-72bd-4b9b-893e-84f97b493bd7'
});

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
    localStorage.setItem('faro.session.ownerToken', oToken);
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

  // -------------------------------------------------------------
  // CU-01: Registro de Inmueble (Formulario modal abierto en /properties)
  // -------------------------------------------------------------
  console.log('Capturing CU-01: Registro de nuevo inmueble...');
  await page.goto('http://localhost:5173/properties');
  await page.waitForTimeout(2000);
  try {
    const btn = page.locator('button:has-text("Nueva propiedad"), button:has-text("Nuevo inmueble")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('CU-01 error:', e.message);
  }
  await snap('cu-01.png');

  // -------------------------------------------------------------
  // CU-02: Consulta y Filtros de Inmuebles (Lista poblada con tarjetas)
  // -------------------------------------------------------------
  console.log('Capturing CU-02: Consulta de inmuebles poblada...');
  await page.goto('http://localhost:5173/properties');
  await page.waitForTimeout(2000);
  await snap('cu-02.png');

  // -------------------------------------------------------------
  // CU-03: Ficha Detallada de Inmueble (Drawer / Detalle abierto)
  // -------------------------------------------------------------
  console.log('Capturing CU-03: Detalle de inmueble...');
  try {
    const card = page.locator('text=Apartamento 402 - El Poblado').first();
    if (await card.isVisible()) {
      await card.click();
      await page.waitForTimeout(1000);
    } else {
      const firstCard = page.locator('.cursor-pointer, [data-testid="property-card"]').first();
      if (await firstCard.isVisible()) {
        await firstCard.click();
        await page.waitForTimeout(1000);
      }
    }
  } catch (e) {
    console.warn('CU-03 error:', e.message);
  }
  await snap('cu-03.png');

  // -------------------------------------------------------------
  // CU-04: Registro de Arrendatario (Modal de nuevo inquilino)
  // -------------------------------------------------------------
  console.log('Capturing CU-04: Registro de arrendatario...');
  await page.goto('http://localhost:5173/tenants');
  await page.waitForTimeout(2000);
  try {
    const btn = page.locator('button:has-text("Nuevo arrendatario"), button:has-text("Nuevo inquilino"), button:has-text("Registrar")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('CU-04 error:', e.message);
  }
  await snap('cu-04.png');

  // -------------------------------------------------------------
  // CU-05: Creación de Contrato de Arrendamiento (Modal nuevo contrato)
  // -------------------------------------------------------------
  console.log('Capturing CU-05: Creación de contrato Ley 820...');
  await page.goto('http://localhost:5173/contracts');
  await page.waitForTimeout(2000);
  try {
    const btn = page.locator('button:has-text("Nuevo contrato"), button:has-text("Crear contrato")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('CU-05 error:', e.message);
  }
  await snap('cu-05.png');

  // -------------------------------------------------------------
  // CU-06: Consulta de Contrato Activo y Suite Jurídica Ley 820
  // (CORRECCIÓN CRÍTICA PEDIDA POR EL USUARIO: MOSTRAR EL CONTRATO POBLADO Y EL MODAL/DRAWER)
  // -------------------------------------------------------------
  console.log('Capturing CU-06: Consulta de contrato y Suite Jurídica Ley 820...');
  await page.goto('http://localhost:5173/contracts');
  await page.waitForTimeout(2000);
  try {
    // Buscamos el botón de Suite Ley 820 o Ver detalle del contrato
    const suiteBtn = page.locator('button:has-text("Suite Ley 820"), button:has-text("Ver detalle"), button:has-text("Detalle")').first();
    if (await suiteBtn.isVisible()) {
      await suiteBtn.click();
      await page.waitForTimeout(1200);
    }
  } catch (e) {
    console.warn('CU-06 error:', e.message);
  }
  await snap('cu-06.png');

  // -------------------------------------------------------------
  // CU-07: Registro y Programación de Cobro Mensual (Modal nuevo cobro)
  // -------------------------------------------------------------
  console.log('Capturing CU-07: Programación de cobro mensual...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(2000);
  try {
    const btn = page.locator('button:has-text("Nuevo cobro"), button:has-text("Registrar cobro"), button:has-text("Generar cobros")').first();
    if (await btn.isVisible()) {
      await btn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('CU-07 error:', e.message);
  }
  await snap('cu-07.png');

  // -------------------------------------------------------------
  // CU-08: Conciliación de Pago y Validación de Comprobante
  // (MOSTRAR LA BANDEJA DE COBROS POBLADA O MODAL DE COMPROBANTE)
  // -------------------------------------------------------------
  console.log('Capturing CU-08: Conciliación de comprobante...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(2000);
  try {
    // Hacemos click en una fila de cobro o en el botón de ver comprobante / detalle
    const row = page.locator('table tbody tr, .cursor-pointer').first();
    if (await row.isVisible()) {
      await row.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('CU-08 error:', e.message);
  }
  await snap('cu-08.png');

  // -------------------------------------------------------------
  // CU-09: Generación y Emisión de Recibo Oficial de Pago (ReciboDialog)
  // -------------------------------------------------------------
  console.log('Capturing CU-09: Recibo oficial de pago...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(2000);
  try {
    const recBtn = page.locator('button:has-text("Recibo"), button:has-text("Ver recibo"), button:has-text("Descargar recibo")').first();
    if (await recBtn.isVisible()) {
      await recBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('CU-09 error:', e.message);
  }
  await snap('cu-09.png');

  // -------------------------------------------------------------
  // CU-10: Carga de Documentos a la Bóveda Segura (Modal / Dropzone)
  // -------------------------------------------------------------
  console.log('Capturing CU-10: Carga de documento a la bóveda...');
  await page.goto('http://localhost:5173/documents');
  await page.waitForTimeout(2000);
  try {
    const upBtn = page.locator('button:has-text("Subir documento"), button:has-text("Cargar documento"), button:has-text("Subir archivo")').first();
    if (await upBtn.isVisible()) {
      await upBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.warn('CU-10 error:', e.message);
  }
  await snap('cu-10.png');

  // -------------------------------------------------------------
  // CU-11: Bóveda Documental Segura (Lista poblada de documentos)
  // -------------------------------------------------------------
  console.log('Capturing CU-11: Consulta de documentos en bóveda...');
  await page.goto('http://localhost:5173/documents');
  await page.waitForTimeout(2000);
  await snap('cu-11.png');

  // -------------------------------------------------------------
  // CU-12: Consulta Pública de Contrato mediante Código Seguro
  // -------------------------------------------------------------
  console.log('Capturing CU-12: Consulta pública de contrato...');
  await page.goto('http://localhost:5173/portal/consulta');
  await page.waitForTimeout(2000);
  try {
    const input = page.locator('input[type="text"]').first();
    if (await input.isVisible()) {
      await input.fill('FARO-7X9K2');
      await page.waitForTimeout(500);
    }
  } catch (e) {}
  await snap('cu-12.png');

  // -------------------------------------------------------------
  // CU-13: Portal Privado del Inquilino
  // -------------------------------------------------------------
  console.log('Capturing CU-13: Portal privado del inquilino...');
  // Swapear sesión a Tenant
  await page.evaluate(({ tToken }) => {
    sessionStorage.removeItem('faro.session.ownerToken');
    localStorage.removeItem('faro.session.ownerToken');
    sessionStorage.setItem('faro.session.tenantToken', tToken);
    localStorage.setItem('faro.session.tenantToken', tToken);
    sessionStorage.setItem('faro.session.userEmail', 'carlos.gomez@gmail.com');
  }, { tToken: tenantToken });
  await page.goto('http://localhost:5173/portal');
  await page.waitForTimeout(2500);
  await snap('cu-13.png');

  // -------------------------------------------------------------
  // CU-14: Soporte y Canal Directo WhatsApp
  // -------------------------------------------------------------
  console.log('Capturing CU-14: Canal de soporte y WhatsApp...');
  await page.goto('http://localhost:5173/tenant-support');
  await page.waitForTimeout(2000);
  await snap('cu-14.png');

  // -------------------------------------------------------------
  // Restaurar sesión de Propietario para CU-15 y CU-16
  // -------------------------------------------------------------
  await page.evaluate(({ oToken }) => {
    sessionStorage.removeItem('faro.session.tenantToken');
    localStorage.removeItem('faro.session.tenantToken');
    sessionStorage.setItem('faro.session.ownerToken', oToken);
    localStorage.setItem('faro.session.ownerToken', oToken);
    sessionStorage.setItem('faro.session.userEmail', 'pryt980@gmail.com');
  }, { oToken: ownerToken });

  // -------------------------------------------------------------
  // CU-15: Actualización de Datos de Contacto del Arrendatario
  // -------------------------------------------------------------
  console.log('Capturing CU-15: Actualización de ficha de arrendatario...');
  await page.goto('http://localhost:5173/tenants');
  await page.waitForTimeout(2000);
  try {
    const tenantRow = page.locator('text=Carlos Andrés Gómez Restrepo').first();
    if (await tenantRow.isVisible()) {
      await tenantRow.click();
      await page.waitForTimeout(1000);
    } else {
      const editBtn = page.locator('button:has-text("Editar"), button[aria-label="Editar"], [title="Editar"]').first();
      if (await editBtn.isVisible()) {
        await editBtn.click();
        await page.waitForTimeout(1000);
      }
    }
  } catch (e) {
    console.warn('CU-15 error:', e.message);
  }
  await snap('cu-15.png');

  // -------------------------------------------------------------
  // CU-16: Devolución de Comprobante Ilegible / Consola Soporte
  // -------------------------------------------------------------
  console.log('Capturing CU-16: Devolución de comprobante ilegible...');
  await page.goto('http://localhost:5173/charges');
  await page.waitForTimeout(2000);
  try {
    const rejBtn = page.locator('button:has-text("Rechazar"), button:has-text("Devolver"), button:has-text("Observaciones"), button:has-text("Disputar")').first();
    if (await rejBtn.isVisible()) {
      await rejBtn.click();
      await page.waitForTimeout(1000);
    } else {
      const detailBtn = page.locator('button:has-text("Detalle"), table tbody tr').first();
      if (await detailBtn.isVisible()) {
        await detailBtn.click();
        await page.waitForTimeout(800);
        const subRej = page.locator('button:has-text("Rechazar"), button:has-text("Devolver")').first();
        if (await subRej.isVisible()) {
          await subRej.click();
          await page.waitForTimeout(800);
        }
      }
    }
  } catch (e) {
    console.warn('CU-16 error:', e.message);
  }
  await snap('cu-16.png');

  await browser.close();
  console.log('All screenshots captured successfully from REAL app!');
}

main().catch(err => {
  console.error('Capture script error:', err);
  process.exit(1);
});
