export function DeploymentDiagram() {
  return (
    <div className="space-y-6">
      {/* Encabezado minimalista */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 border-b border-neutral-200 pb-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            Punto 6.1 · Arquitectura Física
          </span>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold text-neutral-900">
            Diagrama de Despliegue en la Nube
          </h2>
          <p className="mt-1 text-sm text-neutral-600 max-w-3xl">
            Arquitectura física minimalista de Faroo: clientes web y móviles, perímetro en Vercel Edge, API en ASP.NET Core 10, persistencia en Neon Postgres y bóveda de archivos en Cloudflare R2.
          </p>
        </div>
        <div className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200 self-start sm:self-auto shrink-0">
          UML 2.5 · Cloud View
        </div>
      </div>

      {/* Lienzo SVG Minimalista con Logos Oficiales */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 overflow-x-auto shadow-xs">
        <div className="min-w-[960px] flex justify-center py-2">
          <svg
            viewBox="0 0 980 460"
            className="w-full max-w-[980px] h-auto select-none"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            <defs>
              <marker
                id="min-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
              </marker>
              <marker
                id="min-arrow-blue"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563EB" />
              </marker>
              <marker
                id="min-arrow-green"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
              </marker>
              <marker
                id="min-arrow-orange"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#EA580C" />
              </marker>
              <filter id="soft-shadow" x="-4%" y="-4%" width="108%" height="108%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.04" />
              </filter>
            </defs>

            {/* Contenedor perimetral de Nube */}
            <rect
              x="220"
              y="20"
              width="740"
              height="420"
              rx="16"
              fill="#FAFAFA"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeDasharray="5 5"
            />
            <text x="240" y="42" fontSize="10.5" fontWeight="bold" fill="#64748B" letterSpacing="1">
              INFRAESTRUCTURA MULTI-CLOUD · FAROO
            </text>

            {/* ======================================================== */}
            {/* NODO 1: CLIENTES (DISPOSITIVOS)                          */}
            {/* ======================================================== */}
            <g transform="translate(20, 70)" filter="url(#soft-shadow)">
              <rect x="0" y="0" width="165" height="320" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              
              {/* Encabezado */}
              <text x="16" y="26" fontSize="11" fontWeight="bold" fill="#0F172A">
                Clientes
              </text>
              <text x="16" y="40" fontSize="9" fill="#64748B">
                Puntos de interacción
              </text>
              <line x1="16" y1="50" x2="149" y2="50" stroke="#F1F5F9" strokeWidth="1" />

              {/* Sub-tarjeta Desktop */}
              <g transform="translate(14, 62)">
                <rect x="0" y="0" width="137" height="105" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                {/* Logo Laptop */}
                <g transform="translate(10, 10)">
                  <rect x="2" y="2" width="22" height="14" rx="1.5" fill="#FFFFFF" stroke="#334155" strokeWidth="1.2" />
                  <rect x="4" y="4" width="18" height="10" fill="#E2E8F0" />
                  <path d="M0 18 L26 18 L24 20 L2 20 Z" fill="#64748B" />
                </g>
                {/* Logo React */}
                <g transform="translate(102, 8)" fill="none" stroke="#0284C7" strokeWidth="1.4">
                  <ellipse cx="12" cy="12" rx="11" ry="4.5" />
                  <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="11" ry="4.5" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="2" fill="#0284C7" stroke="none" />
                </g>

                <text x="10" y="44" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Propietario
                </text>
                <text x="10" y="58" fontSize="9" fill="#64748B">
                  SPA Web Desktop
                </text>
                <text x="10" y="72" fontSize="8.5" fill="#0284C7" fontWeight="600">
                  React 18 + Vite
                </text>
                <rect x="10" y="80" width="70" height="16" rx="4" fill="#EFF6FF" />
                <text x="14" y="91" fontSize="8" fontWeight="bold" fill="#1D4ED8">
                  Acceso Total
                </text>
              </g>

              {/* Sub-tarjeta Mobile */}
              <g transform="translate(14, 180)">
                <rect x="0" y="0" width="137" height="105" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                {/* Logo Móvil */}
                <g transform="translate(10, 10)">
                  <rect x="4" y="0" width="14" height="22" rx="3" fill="#FFFFFF" stroke="#334155" strokeWidth="1.2" />
                  <rect x="6" y="3" width="10" height="14" rx="1" fill="#E2E8F0" />
                  <circle cx="11" cy="19" r="0.8" fill="#64748B" />
                </g>
                <text x="10" y="44" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Inquilino
                </text>
                <text x="10" y="58" fontSize="9" fill="#64748B">
                  Portal Web PWA
                </text>
                <text x="10" y="72" fontSize="8.5" fill="#059669" fontWeight="600">
                  Mobile Responsive
                </text>
                <rect x="10" y="80" width="84" height="16" rx="4" fill="#ECFDF5" />
                <text x="14" y="91" fontSize="8" fontWeight="bold" fill="#047857">
                  Comprobantes
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* NODO 2: VERCEL GLOBAL EDGE (FRONTEND HOSTING & CDN)      */}
            {/* ======================================================== */}
            <g transform="translate(245, 120)" filter="url(#soft-shadow)">
              <rect x="0" y="0" width="180" height="220" rx="12" fill="#FFFFFF" stroke="#000000" strokeWidth="1.4" />
              
              {/* Logo Vercel */}
              <g transform="translate(18, 18)">
                <polygon points="12,1 24,21 0,21" fill="#000000" />
              </g>
              <rect x="125" y="16" width="40" height="18" rx="4" fill="#F1F5F9" />
              <text x="131" y="28" fontSize="8.5" fontWeight="bold" fill="#334155">
                EDGE
              </text>

              <text x="18" y="60" fontSize="13" fontWeight="bold" fill="#000000">
                Vercel
              </text>
              <text x="18" y="74" fontSize="9.5" fill="#64748B">
                Global Edge Network
              </text>

              <line x1="18" y1="86" x2="162" y2="86" stroke="#F1F5F9" strokeWidth="1" />

              {/* Badges minimalistas */}
              <g transform="translate(18, 98)">
                <rect x="0" y="0" width="144" height="22" rx="5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <circle cx="10" cy="11" r="2.5" fill="#10B981" />
                <text x="18" y="14" fontSize="8.5" fontWeight="600" fill="#334155">
                  Anycast DNS & SSL TLS 1.3
                </text>

                <rect x="0" y="28" width="144" height="22" rx="5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <circle cx="10" cy="39" r="2.5" fill="#3B82F6" />
                <text x="18" y="42" fontSize="8.5" fontWeight="600" fill="#334155">
                  Static CDN (Brotli Cache)
                </text>

                <rect x="0" y="56" width="144" height="22" rx="5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <circle cx="10" cy="67" r="2.5" fill="#8B5CF6" />
                <text x="18" y="70" fontSize="8.5" fontWeight="600" fill="#334155">
                  WAF & DDoS Mitigation
                </text>

                <rect x="0" y="84" width="144" height="22" rx="5" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.8" />
                <text x="8" y="98" fontSize="8" fontWeight="bold" fill="#92400E">
                  faro-entregable-web.vercel.app
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* NODO 3: BACKEND API (ASP.NET CORE 10 EN LINUX)           */}
            {/* ======================================================== */}
            <g transform="translate(485, 100)" filter="url(#soft-shadow)">
              <rect x="0" y="0" width="195" height="260" rx="12" fill="#FFFFFF" stroke="#512BD4" strokeWidth="1.5" />

              {/* Logo .NET */}
              <g transform="translate(18, 16)">
                <rect width="26" height="26" rx="6" fill="#512BD4" />
                <text x="13" y="17" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle">
                  .NET
                </text>
              </g>
              <rect x="135" y="16" width="44" height="18" rx="4" fill="#F5F3FF" />
              <text x="140" y="28" fontSize="8" fontWeight="bold" fill="#6D28D9">
                LINUX
              </text>

              <text x="18" y="60" fontSize="13" fontWeight="bold" fill="#1E1B4B">
                ASP.NET Core 10
              </text>
              <text x="18" y="74" fontSize="9.5" fill="#64748B">
                Web API · C# Clean Architecture
              </text>

              <line x1="18" y1="86" x2="177" y2="86" stroke="#F1F5F9" strokeWidth="1" />

              {/* Badges minimalistas */}
              <g transform="translate(18, 96)">
                <rect x="0" y="0" width="159" height="22" rx="5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <text x="8" y="14" fontSize="8.5" fontWeight="600" fill="#334155">
                  🔐 JWT Bearer (HMAC-SHA256)
                </text>

                <rect x="0" y="28" width="159" height="22" rx="5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <text x="8" y="42" fontSize="8.5" fontWeight="600" fill="#334155">
                  🛡️ Rate Limiter (Token Bucket)
                </text>

                <rect x="0" y="56" width="159" height="22" rx="5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <text x="8" y="70" fontSize="8.5" fontWeight="600" fill="#334155">
                  📜 Reglas Ley 820 & Reajustes
                </text>

                <rect x="0" y="84" width="159" height="22" rx="5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <text x="8" y="98" fontSize="8.5" fontWeight="600" fill="#334155">
                  💰 Conciliación & Recibos
                </text>

                <rect x="0" y="112" width="159" height="26" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
                <text x="8" y="125" fontSize="8" fontWeight="bold" fill="#1D4ED8">
                  ⚡ QuestPDF Engine
                </text>
                <text x="8" y="134" fontSize="7.5" fill="#3B82F6">
                  Render PDF vectorial &lt; 85ms
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* NODO 4: NEON POSTGRESQL (BASE DE DATOS)                  */}
            {/* ======================================================== */}
            <g transform="translate(740, 70)" filter="url(#soft-shadow)">
              <rect x="0" y="0" width="195" height="145" rx="12" fill="#FFFFFF" stroke="#00E699" strokeWidth="1.5" />

              {/* Logo Neon / Postgres */}
              <g transform="translate(16, 16)">
                <rect width="26" height="26" rx="6" fill="#00E699" />
                {/* Silueta de elefante Postgres */}
                <path d="M7 8 C10 6 16 6 19 8 C21 10 22 13 21 16 C20 18 19 19 17 20 L17 23 L14 23 L14 19 C12 18 11 17 10 15 Z" fill="#0A0A0A" />
              </g>
              <rect x="135" y="16" width="44" height="18" rx="4" fill="#ECFDF5" />
              <text x="140" y="28" fontSize="8" fontWeight="bold" fill="#047857">
                DaaS
              </text>

              <text x="16" y="58" fontSize="13" fontWeight="bold" fill="#0F172A">
                Neon Postgres
              </text>
              <text x="16" y="72" fontSize="9" fill="#64748B">
                Serverless PostgreSQL 16
              </text>

              <line x1="16" y1="82" x2="179" y2="82" stroke="#F1F5F9" strokeWidth="1" />

              {/* Badges */}
              <g transform="translate(16, 92)">
                <rect x="0" y="0" width="163" height="18" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <text x="8" y="12" fontSize="8" fontWeight="600" fill="#334155">
                  AWS us-east-2 · PgBouncer Pool
                </text>

                <rect x="0" y="22" width="163" height="18" rx="4" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="0.8" />
                <text x="8" y="34" fontSize="8" fontWeight="bold" fill="#065F46">
                  13 tablas relacionales (ACID)
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* NODO 5: CLOUDFLARE R2 (BÓVEDA DE DOCUMENTOS)             */}
            {/* ======================================================== */}
            <g transform="translate(740, 245)" filter="url(#soft-shadow)">
              <rect x="0" y="0" width="195" height="145" rx="12" fill="#FFFFFF" stroke="#F38020" strokeWidth="1.5" />

              {/* Logo Cloudflare */}
              <g transform="translate(16, 16)">
                <rect width="26" height="26" rx="6" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="0.8" />
                {/* Nube Cloudflare naranja */}
                <path d="M19 12 C18.5 9.5 16.5 8 14 8.2 C12 8.3 10.3 9.5 9.7 11.2 C8.5 11.4 7.6 12.3 7.6 13.5 C7.6 14.8 8.7 15.8 10 15.8 L18.8 15.8 C20 15.8 21 14.8 21 13.5 C21 12.3 20.2 12.1 19 12 Z" fill="#F38020" />
              </g>
              <rect x="142" y="16" width="37" height="18" rx="4" fill="#FFF7ED" />
              <text x="146" y="28" fontSize="8" fontWeight="bold" fill="#C2410C">
                S3
              </text>

              <text x="16" y="58" fontSize="13" fontWeight="bold" fill="#0F172A">
                Cloudflare R2
              </text>
              <text x="16" y="72" fontSize="9" fill="#64748B">
                Object Storage Zero-Egress
              </text>

              <line x1="16" y1="82" x2="179" y2="82" stroke="#F1F5F9" strokeWidth="1" />

              {/* Badges */}
              <g transform="translate(16, 92)">
                <rect x="0" y="0" width="163" height="18" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
                <text x="8" y="12" fontSize="8" fontWeight="600" fill="#334155">
                  Bucket: faro-files (AES-256)
                </text>

                <rect x="0" y="22" width="163" height="18" rx="4" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="0.8" />
                <text x="8" y="34" fontSize="8" fontWeight="bold" fill="#92400E">
                  Contratos PDF & Comprobantes
                </text>
              </g>
            </g>

            {/* ======================================================== */}
            {/* SERVICIOS EXTERNOS (WHATSAPP CLOUD API)                   */}
            {/* ======================================================== */}
            <g transform="translate(485, 385)">
              <rect x="0" y="0" width="195" height="42" rx="8" fill="#FFFFFF" stroke="#25D366" strokeWidth="1.2" />
              {/* Logo WhatsApp */}
              <g transform="translate(10, 8)">
                <circle cx="13" cy="13" r="13" fill="#25D366" />
                <path d="M13 5 C8.5 5 5 8.5 5 13 C5 14.5 5.4 16 6.2 17.2 L5.2 21 L9.1 20 C10.3 20.7 11.6 21 13 21 C17.5 21 21 17.5 21 13 C21 8.5 17.5 5 13 5 Z" fill="#FFFFFF" />
                <path d="M11 9 C10.7 8.5 10.3 8.5 10 8.5 C9.7 8.5 9.4 8.5 9.1 8.7 C8.8 9.1 8.1 9.7 8.1 11 C8.1 12.3 9 13.6 9.2 13.8 C9.4 14 11 16.5 13.5 17.5 C15.7 18.4 16.1 18.2 16.6 18.1 C17.1 18 18 17.5 18.2 16.8 C18.4 16.1 18.4 15.6 18.3 15.4 C18.2 15.3 17.9 15.2 17.5 15 C17.1 14.8 15.3 13.9 15 13.7 C14.7 13.6 14.5 13.5 14.2 13.9 C13.9 14.3 13.3 15 13 15.3 C12.8 15.5 12.6 15.5 12.2 15.3 C11.8 15.1 10.5 14.7 9 13.4 C7.9 12.4 7.1 11.2 6.9 10.7 C6.7 10.4 6.9 10.1 7.1 9.9 C7.3 9.7 7.5 9.5 7.7 9.2 Z" fill="#25D366" />
              </g>
              <text x="44" y="18" fontSize="10" fontWeight="bold" fill="#0F172A">
                Meta WhatsApp API
              </text>
              <text x="44" y="32" fontSize="8" fill="#64748B">
                Notificaciones y Enlaces
              </text>
            </g>

            {/* ======================================================== */}
            {/* LÍNEAS DE CONEXIÓN Y PROTOCOLOS (MINIMALISTAS)           */}
            {/* ======================================================== */}

            {/* Clientes -> Vercel Edge */}
            <path d="M 185 230 L 245 230" stroke="#64748B" strokeWidth="1.8" fill="none" markerEnd="url(#min-arrow)" />
            <rect x="193" y="218" width="44" height="15" rx="3" fill="#F1F5F9" />
            <text x="197" y="229" fontSize="7.5" fontWeight="bold" fill="#334155">
              HTTPS
            </text>

            {/* Vercel Edge -> ASP.NET Core API */}
            <path d="M 425 230 L 485 230" stroke="#2563EB" strokeWidth="2" fill="none" markerEnd="url(#min-arrow-blue)" />
            <rect x="432" y="217" width="46" height="16" rx="3" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
            <text x="436" y="228" fontSize="7.5" fontWeight="bold" fill="#1D4ED8">
              REST · JWT
            </text>

            {/* ASP.NET Core API -> Neon Postgres */}
            <path d="M 680 145 L 740 145" stroke="#059669" strokeWidth="2" fill="none" markerEnd="url(#min-arrow-green)" />
            <rect x="688" y="133" width="45" height="16" rx="3" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="0.8" />
            <text x="692" y="144" fontSize="7.5" fontWeight="bold" fill="#047857">
              TCP 5432
            </text>

            {/* ASP.NET Core API -> Cloudflare R2 */}
            <path d="M 680 315 L 740 315" stroke="#EA580C" strokeWidth="2" fill="none" markerEnd="url(#min-arrow-orange)" />
            <rect x="691" y="303" width="38" height="16" rx="3" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="0.8" />
            <text x="696" y="314" fontSize="7.5" fontWeight="bold" fill="#C2410C">
              S3 API
            </text>

            {/* ASP.NET Core API -> WhatsApp API */}
            <path d="M 582 360 L 582 385" stroke="#16A34A" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

          </svg>
        </div>
      </div>

      {/* Resumen minimalista en 4 pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="rounded-xl border border-neutral-200 bg-white p-3 text-center shadow-2xs">
          <span className="block text-xs font-bold text-neutral-900">Vercel Edge</span>
          <span className="text-[11px] text-neutral-500">Frontend SPA & CDN</span>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-3 text-center shadow-2xs">
          <span className="block text-xs font-bold text-neutral-900">.NET 10 API</span>
          <span className="text-[11px] text-neutral-500">C# Core & QuestPDF</span>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-3 text-center shadow-2xs">
          <span className="block text-xs font-bold text-neutral-900">Neon Postgres</span>
          <span className="text-[11px] text-neutral-500">Serverless DaaS</span>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-3 text-center shadow-2xs">
          <span className="block text-xs font-bold text-neutral-900">Cloudflare R2</span>
          <span className="text-[11px] text-neutral-500">S3 Zero-Egress Vault</span>
        </div>
      </div>
    </div>
  );
}
