export function DeploymentDiagram() {
  return (
    <div className="space-y-6">
      {/* Encabezado del diagrama */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 border-b border-neutral-200 pb-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Punto 6.1 · Arquitectura Física
          </span>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold text-neutral-900">
            Diagrama de Despliegue de la Solución en la Nube
          </h2>
          <p className="mt-1 text-sm text-neutral-600 max-w-3xl">
            Muestra la distribución física del software en infraestructura cloud real: clientes web y móviles, perímetro seguro en Vercel Edge, API en ASP.NET Core 10, base de datos serverless en Neon Postgres y bóveda de archivos en Cloudflare R2.
          </p>
        </div>
        <div className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200 self-start sm:self-auto shrink-0">
          UML 2.5 · Deployment View
        </div>
      </div>

      {/* Lienzo SVG del Diagrama de Despliegue */}
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6 overflow-x-auto shadow-xs">
        <div className="min-w-[1020px] flex justify-center py-2">
          <svg
            viewBox="0 0 1060 620"
            className="w-full max-w-[1060px] h-auto select-none"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <defs>
              <marker
                id="deploy-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#334155" />
              </marker>
              <marker
                id="deploy-arrow-blue"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#2563EB" />
              </marker>
              <marker
                id="deploy-arrow-green"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
              </marker>
              <marker
                id="deploy-arrow-orange"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#D97706" />
              </marker>
              <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.06" />
              </filter>
            </defs>

            {/* CONTENEDOR ENTORNO NUBE (CLOUD BOUNDARY) */}
            <rect
              x="260"
              y="20"
              width="780"
              height="580"
              rx="16"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.8"
              strokeDasharray="6 4"
            />
            <rect x="260" y="20" width="780" height="34" rx="16" fill="#F8FAFC" />
            <text x="280" y="42" fontSize="12" fontWeight="bold" fill="#0F172A" letterSpacing="0.8">
              INFRAESTRUCTURA CLOUD DE PRODUCCIÓN · FAROO
            </text>
            <text x="890" y="42" fontSize="10" fontWeight="bold" fill="#64748B" fontFamily="monospace">
              MULTI-CLOUD TIERS
            </text>

            {/* ---------------------------------------------------- */}
            {/* TIER 1: CLIENTES / DISPOSITIVOS (FUERA DE LA NUBE)   */}
            {/* ---------------------------------------------------- */}
            <g transform="translate(20, 70)">
              {/* Contenedor Clientes */}
              <rect x="0" y="0" width="200" height="480" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
              <text x="16" y="28" fontSize="12" fontWeight="bold" fill="#1E293B">
                DISPOSITIVOS / CLIENTES
              </text>
              <text x="16" y="44" fontSize="10" fill="#64748B">
                Puntos de interacción
              </text>

              {/* Nodo Propietario (Desktop) */}
              <g transform="translate(14, 60)" filter="url(#card-shadow)">
                <rect x="0" y="0" width="172" height="150" rx="10" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="1.5" />
                <rect x="0" y="0" width="172" height="26" rx="10" fill="#EFF6FF" />
                <text x="10" y="17" fontSize="10" fontWeight="bold" fill="#1D4ED8">
                  «device» Desktop / Laptop
                </text>
                <text x="10" y="46" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Navegador Propietario
                </text>
                <text x="10" y="62" fontSize="9.5" fill="#475569">
                  SPA React 18 + TypeScript
                </text>
                <text x="10" y="76" fontSize="9.5" fill="#475569">
                  Tailwind CSS + Vite Bundle
                </text>
                <line x1="10" y1="88" x2="162" y2="88" stroke="#E2E8F0" strokeWidth="1" />
                <text x="10" y="104" fontSize="9" fontWeight="600" fill="#2563EB">
                  Funciones:
                </text>
                <text x="10" y="118" fontSize="8.5" fill="#64748B">
                  • Gestión de inmuebles y contratos
                </text>
                <text x="10" y="132" fontSize="8.5" fill="#64748B">
                  • Conciliación y recibos oficiales
                </text>
              </g>

              {/* Nodo Inquilino (Mobile) */}
              <g transform="translate(14, 240)" filter="url(#card-shadow)">
                <rect x="0" y="0" width="172" height="150" rx="10" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
                <rect x="0" y="0" width="172" height="26" rx="10" fill="#ECFDF5" />
                <text x="10" y="17" fontSize="10" fontWeight="bold" fill="#047857">
                  «device» Smartphone / Móvil
                </text>
                <text x="10" y="46" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Portal del Inquilino
                </text>
                <text x="10" y="62" fontSize="9.5" fill="#475569">
                  PWA Responsive Web
                </text>
                <text x="10" y="76" fontSize="9.5" fill="#475569">
                  Autenticación vía JWT / Token
                </text>
                <line x1="10" y1="88" x2="162" y2="88" stroke="#E2E8F0" strokeWidth="1" />
                <text x="10" y="104" fontSize="9" fontWeight="600" fill="#059669">
                  Funciones:
                </text>
                <text x="10" y="118" fontSize="8.5" fill="#64748B">
                  • Carga de comprobante bancario
                </text>
                <text x="10" y="132" fontSize="8.5" fill="#64748B">
                  • Descarga de contrato y recibos
                </text>
              </g>

              <text x="16" y="424" fontSize="9" fill="#94A3B8" fontStyle="italic">
                Conexión segura vía TLS 1.3
              </text>
              <text x="16" y="438" fontSize="9" fill="#94A3B8" fontStyle="italic">
                Puerto HTTPS 443 estándar
              </text>
            </g>

            {/* ---------------------------------------------------- */}
            {/* TIER 2: PERÍMETRO Y HOSTING FRONTEND (VERCEL EDGE)   */}
            {/* ---------------------------------------------------- */}
            <g transform="translate(280, 70)" filter="url(#card-shadow)">
              <rect x="0" y="0" width="220" height="480" rx="12" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1.5" />
              <rect x="0" y="0" width="220" height="30" rx="12" fill="#EEF2FF" />
              <text x="12" y="20" fontSize="11" fontWeight="bold" fill="#4338CA">
                «node» Vercel Global Edge
              </text>

              {/* Submódulos Vercel */}
              <g transform="translate(12, 44)">
                <rect x="0" y="0" width="196" height="75" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#1E293B">
                  Perímetro de Red & DNS
                </text>
                <text x="10" y="34" fontSize="9" fill="#64748B">
                  • DNS Anycast con baja latencia
                </text>
                <text x="10" y="48" fontSize="9" fill="#64748B">
                  • Terminación SSL/TLS 1.3
                </text>
                <text x="10" y="62" fontSize="9" fill="#64748B">
                  • Mitigación DDoS y WAF Edge
                </text>
              </g>

              <g transform="translate(12, 130)">
                <rect x="0" y="0" width="196" height="95" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#1E293B">
                  Edge CDN & Static Hosting
                </text>
                <text x="10" y="34" fontSize="9" fill="#64748B">
                  • Assets compilados (HTML/JS/CSS)
                </text>
                <text x="10" y="48" fontSize="9" fill="#64748B">
                  • Compresión Brotli y Gzip
                </text>
                <text x="10" y="62" fontSize="9" fill="#64748B">
                  • Caché distribuido globalmente
                </text>
                <text x="10" y="80" fontSize="8.5" fontWeight="600" fill="#4F46E5">
                  URL: faro-entregable-web.vercel.app
                </text>
              </g>

              <g transform="translate(12, 238)">
                <rect x="0" y="0" width="196" height="120" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#1E293B">
                  Políticas de Seguridad Cliente
                </text>
                <text x="10" y="34" fontSize="9" fill="#64748B">
                  • Strict-Transport-Security (HSTS)
                </text>
                <text x="10" y="48" fontSize="9" fill="#64748B">
                  • Content-Security-Policy (CSP)
                </text>
                <text x="10" y="62" fontSize="9" fill="#64748B">
                  • X-Content-Type-Options nosniff
                </text>
                <text x="10" y="78" fontSize="9" fill="#64748B">
                  • Referrer-Policy strict-origin
                </text>
                <text x="10" y="100" fontSize="8.5" fontWeight="600" fill="#047857">
                  Tokens en SessionStorage seguro
                </text>
              </g>

              <g transform="translate(12, 372)">
                <rect x="0" y="0" width="196" height="92" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#B45309">
                  Reverse Proxy / API Gateway
                </text>
                <text x="10" y="34" fontSize="9" fill="#78350F">
                  • Enrutamiento de peticiones /api/*
                </text>
                <text x="10" y="48" fontSize="9" fill="#78350F">
                  • Reenvío seguro HTTPS con CORS
                </text>
                <text x="10" y="64" fontSize="9" fill="#78350F">
                  • Timeout 30s con reintento seguro
                </text>
                <text x="10" y="80" fontSize="8.5" fontWeight="bold" fill="#92400E">
                  API Target: Host ASP.NET Core
                </text>
              </g>
            </g>

            {/* ---------------------------------------------------- */}
            {/* TIER 3: COMPUTO BACKEND API (ASP.NET CORE 10)        */}
            {/* ---------------------------------------------------- */}
            <g transform="translate(535, 70)" filter="url(#card-shadow)">
              <rect x="0" y="0" width="240" height="480" rx="12" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="1.5" />
              <rect x="0" y="0" width="240" height="30" rx="12" fill="#F5F3FF" />
              <text x="12" y="20" fontSize="11" fontWeight="bold" fill="#6D28D9">
                «executionEnvironment» Linux Container
              </text>

              <g transform="translate(12, 40)">
                <rect x="0" y="0" width="216" height="30" rx="6" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1" />
                <text x="10" y="20" fontSize="11" fontWeight="bold" fill="#581C87">
                  ASP.NET Core 10 Web API (C#)
                </text>
              </g>

              {/* Middleware Pipeline */}
              <g transform="translate(12, 80)">
                <rect x="0" y="0" width="216" height="110" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#1E293B">
                  Pipeline de Middlewares (.NET)
                </text>
                <text x="10" y="34" fontSize="9" fill="#475569">
                  • UseAuthentication (JWT HMAC-256)
                </text>
                <text x="10" y="48" fontSize="9" fill="#475569">
                  • UseAuthorization (Role-based policies)
                </text>
                <text x="10" y="62" fontSize="9" fill="#475569">
                  • RateLimiter (Token Bucket anti-brute)
                </text>
                <text x="10" y="76" fontSize="9" fill="#475569">
                  • ProblemDetails (RFC 7807 Exceptions)
                </text>
                <text x="10" y="90" fontSize="9" fill="#475569">
                  • Serilog Structured JSON Logging
                </text>
              </g>

              {/* Modulos del Core */}
              <g transform="translate(12, 200)">
                <rect x="0" y="0" width="216" height="150" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#1E293B">
                  Módulos de Negocio (Domain)
                </text>
                <text x="10" y="34" fontSize="9" fill="#475569">
                  • PropertiesService (Catálogo & Ocupación)
                </text>
                <text x="10" y="48" fontSize="9" fill="#475569">
                  • TenantsService (Fichas & Validación)
                </text>
                <text x="10" y="62" fontSize="9" fill="#475569">
                  • ContractsService (Ley 820 & Códigos)
                </text>
                <text x="10" y="76" fontSize="9" fill="#475569">
                  • ChargesEngine (Cálculo & Estados)
                </text>
                <text x="10" y="90" fontSize="9" fill="#475569">
                  • ReconciliationTray (Cruce de recibos)
                </text>
                <text x="10" y="104" fontSize="9" fill="#475569">
                  • DocumentsVault (Integración Cloudflare R2)
                </text>
                <line x1="10" y1="114" x2="206" y2="114" stroke="#E2E8F0" strokeWidth="1" />
                <text x="10" y="128" fontSize="8.5" fontWeight="bold" fill="#6D28D9">
                  Arquitectura Limpia · EF Core 10
                </text>
                <text x="10" y="140" fontSize="8" fill="#64748B">
                  Inyección de dependencias nativa C#
                </text>
              </g>

              {/* Motor de PDF */}
              <g transform="translate(12, 360)">
                <rect x="0" y="0" width="216" height="104" rx="8" fill="#FEF2F2" stroke="#F87171" strokeWidth="1" />
                <text x="10" y="18" fontSize="10" fontWeight="bold" fill="#991B1B">
                  Motor de Renderizado QuestPDF
                </text>
                <text x="10" y="34" fontSize="9" fill="#7F1D1D">
                  • Generación vectorial C# en memoria
                </text>
                <text x="10" y="48" fontSize="9" fill="#7F1D1D">
                  • Plantillas oficiales de Contrato Ley 820
                </text>
                <text x="10" y="62" fontSize="9" fill="#7F1D1D">
                  • Recibos oficiales con código QR y sello
                </text>
                <text x="10" y="76" fontSize="9" fill="#7F1D1D">
                  • Cero dependencias de headless browser
                </text>
                <text x="10" y="92" fontSize="8.5" fontWeight="bold" fill="#B91C1C">
                  Tiempo de generación: &lt; 85 ms
                </text>
              </g>
            </g>

            {/* ---------------------------------------------------- */}
            {/* TIER 4: PERSISTENCIA Y BÓVEDA (NEON DB + CLOUDFLARE R2) */}
            {/* ---------------------------------------------------- */}
            <g transform="translate(805, 70)">
              {/* Neon Postgres Serverless */}
              <g filter="url(#card-shadow)">
                <rect x="0" y="0" width="215" height="230" rx="12" fill="#FFFFFF" stroke="#059669" strokeWidth="1.5" />
                <rect x="0" y="0" width="215" height="30" rx="12" fill="#ECFDF5" />
                <text x="12" y="20" fontSize="11" fontWeight="bold" fill="#047857">
                  «database» Neon Postgres
                </text>
                <g transform="translate(12, 40)">
                  <text x="0" y="14" fontSize="10" fontWeight="bold" fill="#0F172A">
                    PostgreSQL 16 Serverless
                  </text>
                  <text x="0" y="28" fontSize="9" fill="#475569">
                    • Región: AWS us-east-2 (Ohio)
                  </text>
                  <text x="0" y="42" fontSize="9" fill="#475569">
                    • PgBouncer Connection Pooler
                  </text>
                  <text x="0" y="56" fontSize="9" fill="#475569">
                    • Escalado 0.25 → 2 vCPU dinámico
                  </text>
                  <text x="0" y="70" fontSize="9" fill="#475569">
                    • Auto-suspensión para ahorro de coste
                  </text>
                  <text x="0" y="84" fontSize="9" fill="#475569">
                    • Conexión forzada sslmode=require
                  </text>
                  <line x1="0" y1="96" x2="190" y2="96" stroke="#E2E8F0" strokeWidth="1" />
                  <text x="0" y="112" fontSize="9" fontWeight="600" fill="#059669">
                    Esquema Relacional (13 Tablas):
                  </text>
                  <text x="0" y="126" fontSize="8.5" fill="#64748B">
                    users, properties, tenants, contracts,
                  </text>
                  <text x="0" y="140" fontSize="8.5" fill="#64748B">
                    charges, payments, documents_metadata,
                  </text>
                  <text x="0" y="154" fontSize="8.5" fill="#64748B">
                    notifications, outbox_messages...
                  </text>
                  <text x="0" y="172" fontSize="8.5" fontWeight="bold" fill="#065F46">
                    Puerto: TCP 5432 (TLS 1.3)
                  </text>
                </g>
              </g>

              {/* Cloudflare R2 Object Storage */}
              <g transform="translate(0, 250)" filter="url(#card-shadow)">
                <rect x="0" y="0" width="215" height="230" rx="12" fill="#FFFFFF" stroke="#EA580C" strokeWidth="1.5" />
                <rect x="0" y="0" width="215" height="30" rx="12" fill="#FFF7ED" />
                <text x="12" y="20" fontSize="11" fontWeight="bold" fill="#C2410C">
                  «storage» Cloudflare R2
                </text>
                <g transform="translate(12, 40)">
                  <text x="0" y="14" fontSize="10" fontWeight="bold" fill="#0F172A">
                    Bóveda Documental S3-API
                  </text>
                  <text x="0" y="28" fontSize="9" fill="#475569">
                    • Bucket privado: faro-files
                  </text>
                  <text x="0" y="42" fontSize="9" fill="#475569">
                    • Zero-Egress Fee (descargas sin coste)
                  </text>
                  <text x="0" y="56" fontSize="9" fill="#475569">
                    • Cifrado en reposo AES-256
                  </text>
                  <text x="0" y="70" fontSize="9" fill="#475569">
                    • URLs prefirmadas (TTL 15 minutos)
                  </text>
                  <line x1="0" y1="84" x2="190" y2="84" stroke="#E2E8F0" strokeWidth="1" />
                  <text x="0" y="100" fontSize="9" fontWeight="600" fill="#EA580C">
                    Archivos Gestionados:
                  </text>
                  <text x="0" y="114" fontSize="8.5" fill="#64748B">
                    • Contratos firmados en PDF (Ley 820)
                  </text>
                  <text x="0" y="128" fontSize="8.5" fill="#64748B">
                    • Comprobantes de pago (PNG, JPG, PDF)
                  </text>
                  <text x="0" y="142" fontSize="8.5" fill="#64748B">
                    • Cédulas y documentos de soporte
                  </text>
                  <text x="0" y="160" fontSize="8.5" fontWeight="bold" fill="#9A3412">
                    Protocolo: HTTPS S3 SDK Presigned
                  </text>
                </g>
              </g>
            </g>

            {/* ---------------------------------------------------- */}
            {/* FLECHAS Y CONEXIONES ENTRE NODOS CON ETIQUETAS       */}
            {/* ---------------------------------------------------- */}

            {/* Flecha 1: Clientes -> Vercel Edge */}
            <path
              d="M 220 180 L 280 180"
              stroke="#334155"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#deploy-arrow)"
            />
            <path
              d="M 220 380 L 250 380 L 250 220 L 280 220"
              stroke="#334155"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#deploy-arrow)"
            />
            <rect x="224" y="160" width="52" height="18" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />
            <text x="227" y="172" fontSize="8" fontWeight="bold" fill="#0F172A">
              HTTPS 443
            </text>

            {/* Flecha 2: Vercel Edge -> ASP.NET Core API */}
            <path
              d="M 500 280 L 535 280"
              stroke="#2563EB"
              strokeWidth="2.2"
              fill="none"
              markerEnd="url(#deploy-arrow-blue)"
            />
            <rect x="498" y="260" width="50" height="18" rx="4" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="0.8" />
            <text x="502" y="272" fontSize="7.5" fontWeight="bold" fill="#1D4ED8">
              REST JSON
            </text>

            {/* Flecha 3: ASP.NET Core API -> Neon Postgres */}
            <path
              d="M 775 180 L 805 180"
              stroke="#059669"
              strokeWidth="2.2"
              fill="none"
              markerEnd="url(#deploy-arrow-green)"
            />
            <rect x="765" y="158" width="52" height="18" rx="4" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="0.8" />
            <text x="769" y="170" fontSize="7.5" fontWeight="bold" fill="#047857">
              TCP 5432
            </text>

            {/* Flecha 4: ASP.NET Core API -> Cloudflare R2 */}
            <path
              d="M 775 390 L 805 390"
              stroke="#D97706"
              strokeWidth="2.2"
              fill="none"
              markerEnd="url(#deploy-arrow-orange)"
            />
            <rect x="765" y="370" width="52" height="18" rx="4" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="0.8" />
            <text x="769" y="382" fontSize="7.5" fontWeight="bold" fill="#B45309">
              S3 HTTPS
            </text>

            {/* Servicios Externos (Footer del diagrama) */}
            <g transform="translate(280, 560)">
              <rect x="0" y="0" width="740" height="30" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
              <text x="14" y="19" fontSize="10" fontWeight="bold" fill="#334155">
                INTEGRACIONES Y SERVICIOS EXTERNOS:
              </text>
              <text x="240" y="19" fontSize="9.5" fill="#475569">
                • Meta WhatsApp Cloud API (Graph API v20.0 para notificaciones)
              </text>
              <text x="550" y="19" fontSize="9.5" fill="#475569">
                • Bancolombia / QR Nequi (Comprobantes)
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Tarjetas explicativas de decisiones de arquitectura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Frontend en Vercel Edge
            </h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Elegimos montar la SPA de React 18 en Vercel porque sus servidores perimetrales responden en menos de 30 ms en Colombia. Toda la navegación entre inmuebles, contratos y cobros se hace del lado del cliente sin recargar la página.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Backend ASP.NET Core 10
            </h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            La lógica de liquidación bajo Ley 820, los reajustes de canon y la generación de recibos oficiales la procesamos en C# con .NET 10. Su tipado estricto y el motor QuestPDF permiten generar documentos legales en menos de 85 milisegundos sin consumir memoria excesiva.
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Neon Postgres & Cloudflare R2
            </h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Usamos Neon porque escala a cero cuando no hay tráfico (costo cero en reposo) y mantiene la integridad relacional de 13 tablas con pooler PgBouncer. Los archivos pesados (fotos de consignaciones y PDFs) van a Cloudflare R2 con URLs prefirmadas de 15 minutos sin costos por descarga.
          </p>
        </div>
      </div>
    </div>
  );
}
