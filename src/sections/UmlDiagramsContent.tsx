import { useState, useEffect } from 'react';
import { System3dConstellation } from '@/components/organisms/System3dConstellation';
import { USE_CASE_DOCS, type UmlDocItem } from '@/data/useCaseDocsData';

interface UmlDiagramsContentProps {
  selectedCaseId?: string;
  onSelectCaseId?: (id: string) => void;
}

export function UmlDiagramsContent({
  selectedCaseId: externalSelectedCaseId,
  onSelectCaseId,
}: UmlDiagramsContentProps = {}) {
  const [internalSelectedCaseId, setInternalSelectedCaseId] = useState<string>('cu-01');
  const selectedCaseId = externalSelectedCaseId ?? internalSelectedCaseId;
  const setSelectedCaseId = (id: string) => {
    setInternalSelectedCaseId(id);
    onSelectCaseId?.(id);
  };
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentIndex = USE_CASE_DOCS.findIndex((c) => c.id === selectedCaseId);
  const currentDoc: UmlDocItem = USE_CASE_DOCS[currentIndex >= 0 ? currentIndex : 0];
  const prevDoc = currentIndex > 0 ? USE_CASE_DOCS[currentIndex - 1] : null;
  const nextDoc = currentIndex >= 0 && currentIndex < USE_CASE_DOCS.length - 1 ? USE_CASE_DOCS[currentIndex + 1] : null;

  // Handle escape key for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  // Role color palette
  const roleColorMap = {
    propietario: { primary: '#2563EB', light: '#EFF6FF', dark: '#1D4ED8', text: '#1E40AF' },
    inquilino: { primary: '#059669', light: '#ECFDF5', dark: '#047857', text: '#065F46' },
    administrador: { primary: '#7C3AED', light: '#FAF5FF', dark: '#6D28D9', text: '#5B21B6' },
    soporte: { primary: '#D97706', light: '#FFFBEB', dark: '#B45309', text: '#92400E' },
  };
  const activeColor = roleColorMap[currentDoc.actorRole] || roleColorMap.administrador;

  return (
    <div className="space-y-12">
      {/* Portada de la sección */}
      <section id="uml-hero" className="scroll-mt-28 border-b border-neutral-200 pb-5 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Entrega 4 · Ingeniería de Software I · Pascual Bravo
        </p>

        <h1 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-neutral-900">
          Casos de Uso del Sistema Faroo
        </h1>

        <p className="mt-2.5 max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-600">
          Aquí modelamos las 16 funcionalidades del software Faroo tal como están construidas en el backend y frontend. Incluye el diagrama general con la interacción de los 4 actores y la ficha técnica formal (plantilla 6.3) para cada caso de uso: diagrama UML individual (palito y bolita con estándar UML 2.5), diagrama de flujo con bifurcaciones de decisión reales (camino de éxito vs excepciones), y la captura real del prototipo en funcionamiento.
        </p>
      </section>

      {/* Diagrama general del sistema */}
      <section id="diagrama-general-cu" className="scroll-mt-24 space-y-4">
        <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Diagrama General de Casos de Uso (UML)
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Vista consolidada: interacción entre los 4 actores del sistema y los 16 casos de uso agrupados en sus 5 paquetes de negocio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* Selector de Vista: 2D UML formal vs 3D Constellation */}
            <div className="flex items-center gap-1 rounded-xl border border-neutral-300 bg-neutral-100 p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('2d')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  viewMode === '2d'
                    ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>📐 Vista 2D UML</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-slate-900 text-white shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <span>🪐 Vista 3D (Three.js)</span>
              </button>
            </div>

            <span className="hidden lg:inline-block text-xs font-mono text-neutral-600 bg-neutral-100 px-2.5 py-1.5 rounded-lg border border-neutral-200">
              16 Casos de Uso · 4 Actores
            </span>
          </div>
        </div>

        {/* Renderizado condicional según vista 2D o 3D */}
        {viewMode === '3d' ? (
          <System3dConstellation
            selectedCaseId={selectedCaseId}
            onSelectCaseId={setSelectedCaseId}
          />
        ) : (
          /* Lienzo SVG General */
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-6 overflow-x-auto shadow-xs">
            <div className="min-w-[980px] flex justify-center py-2">
              <svg
                viewBox="0 0 1020 920"
                className="w-full max-w-[1020px] h-auto select-none"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                <defs>
                  <marker
                    id="uml-arrow-default"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#334155" />
                  </marker>
                  <marker
                    id="uml-arrow-emerald"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#059669" />
                  </marker>
                  <marker
                    id="uml-arrow-amber"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#D97706" />
                  </marker>
                </defs>

                {/* Límite del sistema */}
                <rect
                  x="200"
                  y="30"
                  width="620"
                  height="860"
                  rx="16"
                  fill="#FFFFFF"
                  stroke="#475569"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <text x="225" y="60" fontSize="13" fontWeight="bold" fill="#0F172A" letterSpacing="1">
                  SISTEMA FAROO (Límite del Software Backend & Frontend)
                </text>

                {/* Paquetes lógicos con tono distintivo */}
                {/* Paquete 1: Gestión de Inmuebles */}
                <rect x="220" y="80" width="580" height="150" rx="10" fill="#F0F7FF" stroke="#BFDBFE" strokeWidth="1.2" />
                <text x="235" y="102" fontSize="11" fontWeight="bold" fill="#1D4ED8">
                  PAQUETE 1: GESTIÓN DE INMUEBLES (ÉPICA 1)
                </text>

                {/* Paquete 2: Inquilinos y Fiadores */}
                <rect x="220" y="245" width="580" height="150" rx="10" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="1.2" />
                <text x="235" y="267" fontSize="11" fontWeight="bold" fill="#7C3AED">
                  PAQUETE 2: INQUILINOS Y FIADORES (ÉPICA 2)
                </text>

                {/* Paquete 3: Contratos y Facturación */}
                <rect x="220" y="410" width="580" height="170" rx="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
                <text x="235" y="432" fontSize="11" fontWeight="bold" fill="#334155">
                  PAQUETE 3: CONTRATOS Y FACTURACIÓN (ÉPICAS 3 & 4)
                </text>

                {/* Paquete 4: Pagos y Conciliación con Foto */}
                <rect x="220" y="595" width="580" height="160" rx="10" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.2" />
                <text x="235" y="617" fontSize="11" fontWeight="bold" fill="#047857">
                  PAQUETE 4: PAGOS Y CONCILIACIÓN CON FOTO (ÉPICA 5)
                </text>

                {/* Paquete 5: Semáforo y Alertas */}
                <rect x="220" y="770" width="580" height="105" rx="10" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1.2" />
                <text x="235" y="792" fontSize="11" fontWeight="bold" fill="#B45309">
                  PAQUETE 5: SEMÁFORO DE CARTERA Y ALERTAS (ÉPICA 6)
                </text>

                {/* ACTOR 1: PROPIETARIO (Azul #2563EB) */}
                <g transform="translate(95, 140)">
                  <circle cx="0" cy="-22" r="12" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2.5" />
                  <line x1="0" y1="-10" x2="0" y2="18" stroke="#2563EB" strokeWidth="2.5" />
                  <line x1="-18" y1="2" x2="18" y2="2" stroke="#2563EB" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="-14" y2="42" stroke="#2563EB" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="14" y2="42" stroke="#2563EB" strokeWidth="2.5" />
                  <text x="0" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1D4ED8">
                    Propietario
                  </text>
                  <text x="0" y="75" textAnchor="middle" fontSize="10" fill="#3B82F6">
                    (Arrendador)
                  </text>
                </g>

                {/* ACTOR 2: INQUILINO (Verde #059669) */}
                <g transform="translate(95, 650)">
                  <circle cx="0" cy="-22" r="12" fill="#ECFDF5" stroke="#059669" strokeWidth="2.5" />
                  <line x1="0" y1="-10" x2="0" y2="18" stroke="#059669" strokeWidth="2.5" />
                  <line x1="-18" y1="2" x2="18" y2="2" stroke="#059669" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="-14" y2="42" stroke="#059669" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="14" y2="42" stroke="#059669" strokeWidth="2.5" />
                  <text x="0" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#047857">
                    Inquilino
                  </text>
                  <text x="0" y="75" textAnchor="middle" fontSize="10" fill="#10B981">
                    (Arrendatario)
                  </text>
                </g>

                {/* ACTOR 3: ADMINISTRADOR (Púrpura #7C3AED) */}
                <g transform="translate(925, 230)">
                  <circle cx="0" cy="-22" r="12" fill="#FAF5FF" stroke="#7C3AED" strokeWidth="2.5" />
                  <line x1="0" y1="-10" x2="0" y2="18" stroke="#7C3AED" strokeWidth="2.5" />
                  <line x1="-18" y1="2" x2="18" y2="2" stroke="#7C3AED" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="-14" y2="42" stroke="#7C3AED" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="14" y2="42" stroke="#7C3AED" strokeWidth="2.5" />
                  <text x="0" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6D28D9">
                    Administrador
                  </text>
                  <text x="0" y="75" textAnchor="middle" fontSize="10" fill="#8B5CF6">
                    (Inmobiliaria)
                  </text>
                </g>

                {/* ACTOR 4: SOPORTE (Ámbar #D97706) */}
                <g transform="translate(925, 690)">
                  <circle cx="0" cy="-22" r="12" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.5" />
                  <line x1="0" y1="-10" x2="0" y2="18" stroke="#D97706" strokeWidth="2.5" />
                  <line x1="-18" y1="2" x2="18" y2="2" stroke="#D97706" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="-14" y2="42" stroke="#D97706" strokeWidth="2.5" />
                  <line x1="0" y1="18" x2="14" y2="42" stroke="#D97706" strokeWidth="2.5" />
                  <text x="0" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#B45309">
                    Soporte
                  </text>
                  <text x="0" y="75" textAnchor="middle" fontSize="10" fill="#F59E0B">
                    (Mesa de Ayuda)
                  </text>
                </g>

                {/* LÍNEAS DE ASOCIACIÓN - PROPIETARIO (Azul) */}
                <line x1="115" y1="135" x2="325" y2="135" stroke="#2563EB" strokeWidth="1.75" />
                <line x1="115" y1="150" x2="260" y2="185" stroke="#2563EB" strokeWidth="1.75" />
                <line x1="115" y1="165" x2="275" y2="520" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="115" y1="180" x2="275" y2="825" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3" />

                {/* LÍNEAS DE ASOCIACIÓN - INQUILINO (Verde) */}
                <line x1="115" y1="645" x2="275" y2="645" stroke="#059669" strokeWidth="2" />
                <line x1="115" y1="665" x2="275" y2="715" stroke="#059669" strokeWidth="1.75" />

                {/* LÍNEAS DE ASOCIACIÓN - ADMINISTRADOR (Púrpura) */}
                <line x1="905" y1="200" x2="515" y2="135" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="215" x2="670" y2="185" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="230" x2="475" y2="300" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="245" x2="475" y2="350" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="260" x2="465" y2="455" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="275" x2="695" y2="455" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="290" x2="465" y2="520" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="305" x2="695" y2="520" stroke="#7C3AED" strokeWidth="1.5" />
                <line x1="905" y1="320" x2="695" y2="645" stroke="#7C3AED" strokeWidth="1.75" />

                {/* LÍNEAS DE ASOCIACIÓN - SOPORTE (Ámbar) */}
                <line x1="905" y1="680" x2="705" y2="350" stroke="#D97706" strokeWidth="1.75" />
                <line x1="905" y1="715" x2="695" y2="715" stroke="#D97706" strokeWidth="1.75" />

                {/* ÓVALOS DE CASOS DE USO */}
                {[
                  { id: 'cu-01', x: 420, y: 135, rx: 95, label: 'CU-01: Registrar Inmueble', color: '#1E3A8A', border: '#2563EB', bg: '#EFF6FF' },
                  { id: 'cu-02', x: 350, y: 185, rx: 90, label: 'CU-02: Consultar Ocupación', color: '#1E3A8A', border: '#2563EB', bg: '#EFF6FF' },
                  { id: 'cu-03', x: 580, y: 185, rx: 90, label: 'CU-03: Ficha Detallada', color: '#1E3A8A', border: '#2563EB', bg: '#EFF6FF' },
                  { id: 'cu-04', x: 380, y: 300, rx: 95, label: 'CU-04: Registrar Inquilino', color: '#4C1D95', border: '#7C3AED', bg: '#FAF5FF' },
                  { id: 'cu-05', x: 380, y: 350, rx: 95, label: 'CU-05: Asignar Fiador', color: '#4C1D95', border: '#7C3AED', bg: '#FAF5FF' },
                  { id: 'cu-15', x: 610, y: 350, rx: 95, label: 'CU-15: Actualizar Contacto', color: '#92400E', border: '#D97706', bg: '#FFFBEB' },
                  { id: 'cu-06', x: 370, y: 455, rx: 95, label: 'CU-06: Radicar Contrato', color: '#0F172A', border: '#475569', bg: '#F1F5F9' },
                  { id: 'cu-07', x: 600, y: 455, rx: 95, label: 'CU-07: Evaluar Riesgo', color: '#0F172A', border: '#475569', bg: '#F1F5F9' },
                  { id: 'cu-08', x: 370, y: 520, rx: 95, label: 'CU-08: Generar Cobro Mensual', color: '#0F172A', border: '#475569', bg: '#F1F5F9' },
                  { id: 'cu-09', x: 600, y: 520, rx: 95, label: 'CU-09: Resumen Financiero', color: '#0F172A', border: '#475569', bg: '#F1F5F9' },
                  { id: 'cu-10', x: 370, y: 645, rx: 95, label: 'CU-10: Cargar Comprobante', color: '#065F46', border: '#059669', bg: '#ECFDF5' },
                  { id: 'cu-11', x: 600, y: 645, rx: 95, label: 'CU-11: Conciliar Pagos', color: '#5B21B6', border: '#7C3AED', bg: '#FAF5FF' },
                  { id: 'cu-12', x: 370, y: 715, rx: 95, label: 'CU-12: Descargar Recibo PDF', color: '#065F46', border: '#059669', bg: '#ECFDF5' },
                  { id: 'cu-16', x: 600, y: 715, rx: 95, label: 'CU-16: Devolver Ilegible', color: '#92400E', border: '#D97706', bg: '#FFFBEB' },
                  { id: 'cu-13', x: 370, y: 825, rx: 95, label: 'CU-13: Semáforo Morosidad', color: '#92400E', border: '#D97706', bg: '#FFFBEB' },
                  { id: 'cu-14', x: 600, y: 825, rx: 95, label: 'CU-14: Alerta WhatsApp', color: '#92400E', border: '#D97706', bg: '#FFFBEB' },
                ].map((item) => {
                  const isSelected = selectedCaseId === item.id;
                  return (
                    <g
                      key={item.id}
                      transform={`translate(${item.x}, ${item.y})`}
                      className="cursor-pointer select-none group"
                      onClick={() => {
                        setSelectedCaseId(item.id);
                        const el = document.getElementById('doc-casos-uso');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={item.rx}
                        ry="21"
                        fill={isSelected ? item.bg : '#FFFFFF'}
                        stroke={isSelected ? item.color : item.border}
                        strokeWidth={isSelected ? '2.8' : '1.6'}
                        className="transition-all duration-150 group-hover:stroke-[2.5px]"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight={isSelected ? 'bold' : '600'}
                        fill={item.color}
                      >
                        {item.label}
                      </text>
                    </g>
                  );
                })}

                {/* Relaciones Include & Extend generales */}
                <line
                  x1="520"
                  y1="660"
                  x2="440"
                  y2="700"
                  stroke="#059669"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#uml-arrow-emerald)"
                />
                <g transform="translate(480, 672)">
                  <rect x="-38" y="-10" width="76" height="20" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="1.2" />
                  <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857">
                    «include»
                  </text>
                </g>

                <line
                  x1="600"
                  y1="695"
                  x2="600"
                  y2="667"
                  stroke="#D97706"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#uml-arrow-amber)"
                />
                <g transform="translate(600, 680)">
                  <rect x="-38" y="-10" width="76" height="20" rx="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.2" />
                  <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#B45309">
                    «extend»
                  </text>
                </g>

                <line
                  x1="505"
                  y1="825"
                  x2="465"
                  y2="825"
                  stroke="#D97706"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  markerEnd="url(#uml-arrow-amber)"
                />
                <g transform="translate(485, 825)">
                  <rect x="-36" y="-10" width="72" height="20" rx="10" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.2" />
                  <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#B45309">
                    «extend»
                  </text>
                </g>
              </svg>
            </div>
          </div>
        )}
      </section>

      {/* Punto 6.3: Documentación Detallada del Caso de Uso (Ficha Técnica y Diagramas) */}
      <section id="doc-casos-uso" className="scroll-mt-28 space-y-6">
        <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Punto 6.3 · Plantilla Oficial
              </span>
              <span className="rounded-full bg-neutral-900 text-white px-2.5 py-0.5 text-[11px] font-mono font-bold">
                {currentDoc.id.toUpperCase()} de 16
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
              Documentación del Caso de Uso
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
              Ficha técnica descriptiva, diagrama de casos de uso (UML 2.5), diagrama de flujo con bifurcaciones de decisión reales (camino de éxito vs excepciones), y captura de pantalla real del prototipo en funcionamiento.
            </p>
          </div>

          {/* Selector rápido entre casos de uso */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="select-cu-quick" className="text-xs font-semibold text-neutral-500">
              Ir a:
            </label>
            <select
              id="select-cu-quick"
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-800 shadow-2xs focus:border-neutral-900 focus:outline-hidden"
            >
              {USE_CASE_DOCS.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.id.toUpperCase()} · {doc.name.split(':')[1]?.trim() || doc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FICHA TÉCNICA PRINCIPAL */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs space-y-8">
          {/* Cabecera del caso de uso */}
          <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Nombre Caso de uso:
              </span>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-neutral-900">
                {currentDoc.name}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-neutral-300 px-3 py-1 font-mono text-xs font-semibold text-neutral-800 bg-neutral-50">
                {currentDoc.huId}
              </span>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                {currentDoc.epicName}
              </span>
            </div>
          </div>

          {/* Actores y Descripción casual estudiantil */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 border-b border-neutral-200 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Actores involucrados:
              </span>
              <p className="mt-1.5 font-bold text-base text-neutral-900 flex items-center gap-2">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: activeColor.primary }}
                />
                <span>{currentDoc.actor}</span>
              </p>
              {currentDoc.uml.secondaryActor && (
                <p className="mt-1 text-xs text-neutral-500">
                  <span className="font-semibold text-neutral-700">Actor secundario / externo:</span> {currentDoc.uml.secondaryActor}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Descripción (en palabras sencillas):
              </span>
              <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-neutral-800 bg-neutral-50/80 rounded-xl p-3.5 border border-neutral-200/80">
                {currentDoc.casualToneDescription}
              </p>
            </div>
          </div>

          {/* Precondiciones y Postcondiciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-neutral-200 pb-6">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                📋 Precondiciones (Requisitos previos):
              </span>
              <ul className="space-y-2 text-sm text-neutral-700">
                {currentDoc.preconditions.map((pre, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-400 font-bold">•</span>
                    <span>{pre}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                🏁 Postcondiciones (Resultado final en el sistema):
              </span>
              <ul className="space-y-2 text-sm text-neutral-700">
                {currentDoc.postconditions.map((post, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{post}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 1. DIAGRAMA UML INDIVIDUAL (PALITO Y BOLITA - ESTÁNDAR UML 2.5) */}
          <div className="border-b border-neutral-200 pb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  1. Diagrama de Caso de Uso (Notación Formal UML 2.5 · Palito y Bolita):
                </span>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Estándar OMG UML 2.5: actor primario fuera del límite, sistema delimitado, óvalo del caso de uso, asociaciones no direccionales, relaciones «include» / «extend» y actor secundario externo.
                </p>
              </div>
              <span className="text-[11px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-md self-start sm:self-auto font-semibold">
                Norma OMG UML 2.5
              </span>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 overflow-x-auto shadow-xs">
              <div className="min-w-[760px] flex justify-center py-2">
                <svg
                  viewBox="0 0 780 270"
                  className="w-full max-w-[780px] h-auto select-none"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  <defs>
                    {/* Flecha abierta para relaciones include / extend según UML 2.5 */}
                    <marker
                      id={`uml-include-arrow-${currentDoc.id}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 7 5 L 0 8.5" fill="none" stroke="#059669" strokeWidth="1.8" />
                    </marker>
                    <marker
                      id={`uml-extend-arrow-${currentDoc.id}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 7 5 L 0 8.5" fill="none" stroke="#D97706" strokeWidth="1.8" />
                    </marker>
                  </defs>

                  {/* Límite del sistema Faroo (System Boundary) */}
                  <rect
                    x="180"
                    y="18"
                    width="440"
                    height="234"
                    rx="12"
                    fill="#F8FAFC"
                    stroke="#475569"
                    strokeWidth="1.75"
                    strokeDasharray="6 4"
                  />
                  <text x="196" y="40" fontSize="11" fontWeight="bold" fill="#475569" letterSpacing="0.8">
                    SISTEMA FAROO (Límite del Software: Core Web & Backend)
                  </text>

                  {/* Actor principal (Stickman / Muñeco de palo formal UML) */}
                  <g transform="translate(90, 135)">
                    {/* Cabeza */}
                    <circle cx="0" cy="-26" r="13" fill="#FFFFFF" stroke={activeColor.primary} strokeWidth="2.5" />
                    {/* Tronco */}
                    <line x1="0" y1="-13" x2="0" y2="18" stroke={activeColor.primary} strokeWidth="2.5" />
                    {/* Brazos */}
                    <line x1="-20" y1="-2" x2="20" y2="-2" stroke={activeColor.primary} strokeWidth="2.5" />
                    {/* Pierna izquierda */}
                    <line x1="0" y1="18" x2="-14" y2="44" stroke={activeColor.primary} strokeWidth="2.5" />
                    {/* Pierna derecha */}
                    <line x1="0" y1="18" x2="14" y2="44" stroke={activeColor.primary} strokeWidth="2.5" />
                    {/* Estereotipo y nombre */}
                    <text x="0" y="60" textAnchor="middle" fontSize="9.5" fill="#64748B" fontWeight="600">
                      «actor»
                    </text>
                    <text x="0" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill={activeColor.dark}>
                      {currentDoc.uml.primaryActor}
                    </text>
                  </g>

                  {/* Asociación UML sólida (SIN flechas entre actor y caso de uso, conforme al estándar UML) */}
                  <line x1="115" y1="135" x2="230" y2="135" stroke={activeColor.primary} strokeWidth="2" />

                  {/* Óvalo central de caso de uso (UML Use Case Ellipse) */}
                  <g transform="translate(325, 135)">
                    <ellipse cx="0" cy="0" rx="95" ry="27" fill={activeColor.light} stroke={activeColor.primary} strokeWidth="2.5" />
                    <text x="0" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill={activeColor.dark}>
                      {currentDoc.uml.mainOval}
                    </text>
                  </g>

                  {/* Relación Include (si existe): Caso Base apunta al Caso Incluido con flecha abierta discontinua */}
                  {currentDoc.uml.includes && currentDoc.uml.includes.length > 0 && (
                    <g>
                      <g transform="translate(520, 80)">
                        <ellipse cx="0" cy="0" rx="88" ry="22" fill="#FFFFFF" stroke="#059669" strokeWidth="1.8" strokeDasharray="5 3" />
                        <text x="0" y="4" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#065F46">
                          {currentDoc.uml.includes[0]}
                        </text>
                      </g>
                      <line
                        x1="398"
                        y1="112"
                        x2="438"
                        y2="92"
                        stroke="#059669"
                        strokeWidth="1.6"
                        strokeDasharray="5 3"
                        markerEnd={`url(#uml-include-arrow-${currentDoc.id})`}
                      />
                      <g transform="translate(418, 92)">
                        <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#FFFFFF" stroke="#059669" strokeWidth="1" />
                        <text x="0" y="3.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#047857">
                          «include»
                        </text>
                      </g>
                    </g>
                  )}

                  {/* Relación Extend (si existe): Caso que Extiende apunta al Caso Base con flecha abierta discontinua */}
                  {currentDoc.uml.extends && currentDoc.uml.extends.length > 0 && (
                    <g>
                      <g transform="translate(520, 190)">
                        <ellipse cx="0" cy="0" rx="88" ry="22" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" strokeDasharray="5 3" />
                        <text x="0" y="4" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#92400E">
                          {currentDoc.uml.extends[0].name}
                        </text>
                      </g>
                      <line
                        x1="438"
                        y1="174"
                        x2="398"
                        y2="154"
                        stroke="#D97706"
                        strokeWidth="1.6"
                        strokeDasharray="5 3"
                        markerEnd={`url(#uml-extend-arrow-${currentDoc.id})`}
                      />
                      <g transform="translate(418, 174)">
                        <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#FFFFFF" stroke="#D97706" strokeWidth="1" />
                        <text x="0" y="3.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B45309">
                          «extend»
                        </text>
                      </g>
                    </g>
                  )}

                  {/* Actor secundario / Sistema externo a la derecha del límite */}
                  {currentDoc.uml.secondaryActor && (
                    <g transform="translate(700, 135)">
                      {currentDoc.uml.secondaryType === 'db' ? (
                        <g>
                          <rect x="-30" y="-22" width="60" height="44" rx="6" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
                          <ellipse cx="0" cy="-14" rx="20" ry="6" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
                          <line x1="-20" y1="-6" x2="-20" y2="12" stroke="#334155" strokeWidth="1.5" />
                          <line x1="20" y1="-6" x2="20" y2="12" stroke="#334155" strokeWidth="1.5" />
                          <path d="M -20 12 A 20 6 0 0 0 20 12" fill="none" stroke="#334155" strokeWidth="1.5" />
                          <text x="0" y="34" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">
                            {currentDoc.uml.secondaryActor}
                          </text>
                          <text x="0" y="46" textAnchor="middle" fontSize="9" fill="#64748B">
                            «database»
                          </text>
                        </g>
                      ) : currentDoc.uml.secondaryType === 'user' ? (
                        <g>
                          <circle cx="0" cy="-20" r="11" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
                          <line x1="0" y1="-9" x2="0" y2="16" stroke="#059669" strokeWidth="2" />
                          <line x1="-15" y1="2" x2="15" y2="2" stroke="#059669" strokeWidth="2" />
                          <line x1="0" y1="16" x2="-11" y2="36" stroke="#059669" strokeWidth="2" />
                          <line x1="0" y1="16" x2="11" y2="36" stroke="#059669" strokeWidth="2" />
                          <text x="0" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857">
                            {currentDoc.uml.secondaryActor}
                          </text>
                          <text x="0" y="61" textAnchor="middle" fontSize="9" fill="#10B981">
                            «actor secundario»
                          </text>
                        </g>
                      ) : (
                        <g>
                          <rect x="-32" y="-18" width="64" height="36" rx="6" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />
                          <text x="0" y="4" textAnchor="middle" fontSize="14">⚙️</text>
                          <text x="0" y="32" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#92400E">
                            {currentDoc.uml.secondaryActor}
                          </text>
                          <text x="0" y="43" textAnchor="middle" fontSize="9" fill="#B45309">
                            «external service»
                          </text>
                        </g>
                      )}
                      <line x1="-80" y1="0" x2="-40" y2="0" stroke="#64748B" strokeWidth="1.6" strokeDasharray="4 3" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Nota de negocio formal UML (Dog-ear note) */}
              <div className="mt-3 pt-3 border-t border-neutral-200 flex items-start gap-2.5 text-xs text-neutral-700 bg-neutral-50/70 p-3 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 shrink-0 flex items-center gap-1">
                  <span>📄</span> Nota UML (Regla de Negocio):
                </span>
                <span className="leading-relaxed">{currentDoc.uml.businessNote}</span>
              </div>
            </div>
          </div>

          {/* 2. DIAGRAMA DE FLUJO ESTÁNDAR (ISO 5807 / ANSI X3.5 CON BIFURCACIÓN Y BUCLE) */}
          <div className="border-b border-neutral-200 pb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  2. Diagrama de Flujo del Proceso (Estándar ISO 5807 / ANSI X3.5):
                </span>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Diagrama de flujo formal con terminadores (óvalo), entrada de datos (paralelogramo), procesos (rectángulo), decisión (rombo) y bucle de retorno ante excepciones.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-md self-start sm:self-auto font-semibold">
                Norma ANSI / ISO 5807
              </span>
            </div>

            {/* LIENZO VECTORIAL DEL DIAGRAMA DE FLUJO ESTÁNDAR */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 overflow-x-auto shadow-xs">
              <div className="min-w-[840px] flex justify-center py-2">
                <svg
                  viewBox="0 0 880 730"
                  className="w-full max-w-[880px] h-auto select-none"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  <defs>
                    {/* Flecha estándar gris oscuro */}
                    <marker
                      id={`flow-arrow-main-${currentDoc.id}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1E293B" />
                    </marker>
                    {/* Flecha verde para camino Sí */}
                    <marker
                      id={`flow-arrow-green-${currentDoc.id}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
                    </marker>
                    {/* Flecha roja para camino No / bucle */}
                    <marker
                      id={`flow-arrow-red-${currentDoc.id}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#DC2626" />
                    </marker>
                  </defs>

                  {/* ======================================================== */}
                  {/* 1. TERMINADOR: INICIO (Óvalo / Píldora alargada)         */}
                  {/* ======================================================== */}
                  <g transform="translate(480, 40)">
                    <rect x="-80" y="-20" width="160" height="40" rx="20" fill="#0F172A" stroke="#0F172A" strokeWidth="2" />
                    <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFFFFF">
                      Inicio
                    </text>
                  </g>

                  {/* Flecha hacia abajo hacia la Entrada de Datos */}
                  <line
                    x1="480"
                    y1="60"
                    x2="480"
                    y2="98"
                    stroke="#1E293B"
                    strokeWidth="2"
                    markerEnd={`url(#flow-arrow-main-${currentDoc.id})`}
                  />

                  {/* ======================================================== */}
                  {/* 2. ENTRADA DE DATOS (Paralelogramo inclinado / Romboide) */}
                  {/* ======================================================== */}
                  <g id="flow-input-node">
                    {/* Paralelogramo: ancho 360, alto 52, sesgo 18 */}
                    <polygon
                      points="320,100 660,100 640,154 300,154"
                      fill="#F1F5F9"
                      stroke="#334155"
                      strokeWidth="2"
                    />
                    <text x="480" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569" letterSpacing="0.6">
                      ENTRADA DE DATOS (USUARIO)
                    </text>
                    <text x="480" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0F172A">
                      {currentDoc.flow.userAction.length > 55 ? `${currentDoc.flow.userAction.slice(0, 52)}...` : currentDoc.flow.userAction}
                    </text>
                  </g>

                  {/* Flecha hacia abajo hacia el Proceso Interno */}
                  <line
                    x1="480"
                    y1="154"
                    x2="480"
                    y2="194"
                    stroke="#1E293B"
                    strokeWidth="2"
                    markerEnd={`url(#flow-arrow-main-${currentDoc.id})`}
                  />

                  {/* ======================================================== */}
                  {/* 3. PROCESO INTERNO (Rectángulo estándar)                 */}
                  {/* ======================================================== */}
                  <g transform="translate(480, 222)">
                    <rect x="-175" y="-26" width="350" height="52" rx="4" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
                    <text x="0" y="-8" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563EB" letterSpacing="0.6">
                      PROCESO · PETICIÓN API AL BACKEND
                    </text>
                    <text x="0" y="12" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0F172A" fontFamily="monospace">
                      {currentDoc.flow.apiCall.method} {currentDoc.flow.apiCall.endpoint}
                    </text>
                  </g>

                  {/* Flecha hacia abajo hacia la Decisión */}
                  <line
                    x1="480"
                    y1="248"
                    x2="480"
                    y2="284"
                    stroke="#1E293B"
                    strokeWidth="2"
                    markerEnd={`url(#flow-arrow-main-${currentDoc.id})`}
                  />

                  {/* ======================================================== */}
                  {/* 4. DECISIÓN (Rombo / Diamante simétrico de 4 vértices)   */}
                  {/* ======================================================== */}
                  <g id="flow-decision-diamond">
                    {/* Rombo: centro en (480, 335), semi-ancho 155, semi-alto 48 */}
                    <polygon
                      points="480,287 635,335 480,383 325,335"
                      fill="#FEF3C7"
                      stroke="#D97706"
                      strokeWidth="2.5"
                    />
                    <text x="480" y="325" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309" letterSpacing="0.5">
                      DECISIÓN / VALIDACIÓN
                    </text>
                    <text x="480" y="345" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350F">
                      {currentDoc.flow.decision.question.length > 50
                        ? `${currentDoc.flow.decision.question.slice(0, 48)}...`
                        : currentDoc.flow.decision.question}
                    </text>
                  </g>

                  {/* ======================================================== */}
                  {/* RAMA SÍ (Camino verde hacia abajo: éxito y persistencia)  */}
                  {/* ======================================================== */}
                  {/* Rótulo SÍ */}
                  <text x="495" y="405" fontSize="11.5" fontWeight="bold" fill="#059669">
                    [ Sí ]
                  </text>
                  <line
                    x1="480"
                    y1="383"
                    x2="480"
                    y2="425"
                    stroke="#059669"
                    strokeWidth="2.5"
                    markerEnd={`url(#flow-arrow-green-${currentDoc.id})`}
                  />

                  {/* 5A. PROCESO DE PERSISTENCIA (Rectángulo verde) */}
                  <g transform="translate(480, 452)">
                    <rect x="-175" y="-26" width="350" height="52" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
                    <text x="0" y="-8" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857" letterSpacing="0.6">
                      PROCESO · PERSISTENCIA EN BASE DE DATOS
                    </text>
                    <text x="0" y="11" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#064E3B">
                      {currentDoc.flow.yesPath.action.length > 55
                        ? `${currentDoc.flow.yesPath.action.slice(0, 52)}...`
                        : currentDoc.flow.yesPath.action}
                    </text>
                  </g>

                  {/* Flecha hacia abajo hacia la Salida de Éxito */}
                  <line
                    x1="480"
                    y1="478"
                    x2="480"
                    y2="512"
                    stroke="#059669"
                    strokeWidth="2"
                    markerEnd={`url(#flow-arrow-green-${currentDoc.id})`}
                  />

                  {/* 5B. SALIDA DE ÉXITO (Paralelogramo de salida) */}
                  <g>
                    <polygon
                      points="320,514 650,514 632,564 302,564"
                      fill="#F0FDF4"
                      stroke="#16A34A"
                      strokeWidth="2"
                    />
                    <text x="480" y="534" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803D" letterSpacing="0.6">
                      SALIDA DE DATOS · RESPUESTA {currentDoc.flow.yesPath.responseCode}
                    </text>
                    <text x="480" y="552" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#14532D">
                      {currentDoc.flow.yesPath.finalState.length > 55
                        ? `${currentDoc.flow.yesPath.finalState.slice(0, 52)}...`
                        : currentDoc.flow.yesPath.finalState}
                    </text>
                  </g>

                  {/* Flecha hacia abajo hacia Fin */}
                  <line
                    x1="480"
                    y1="564"
                    x2="480"
                    y2="600"
                    stroke="#059669"
                    strokeWidth="2"
                    markerEnd={`url(#flow-arrow-green-${currentDoc.id})`}
                  />

                  {/* 5C. TERMINADOR: FIN (Óvalo verde de éxito) */}
                  <g transform="translate(480, 622)">
                    <rect x="-70" y="-19" width="140" height="38" rx="19" fill="#059669" stroke="#047857" strokeWidth="2" />
                    <text x="0" y="5" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#FFFFFF">
                      Fin (Éxito)
                    </text>
                  </g>

                  {/* ======================================================== */}
                  {/* RAMA NO (Camino rojo hacia la izquierda: error y bucle)   */}
                  {/* ======================================================== */}
                  {/* Rótulo NO */}
                  <text x="278" y="325" fontSize="11.5" fontWeight="bold" fill="#DC2626">
                    [ No ]
                  </text>
                  {/* Línea horizontal saliendo del vértice izquierdo del rombo (325, 335) */}
                  <line x1="325" y1="335" x2="215" y2="335" stroke="#DC2626" strokeWidth="2.5" />
                  {/* Línea vertical hacia abajo al Paralelogramo de Error */}
                  <line
                    x1="215"
                    y1="335"
                    x2="215"
                    y2="388"
                    stroke="#DC2626"
                    strokeWidth="2.5"
                    markerEnd={`url(#flow-arrow-red-${currentDoc.id})`}
                  />

                  {/* 6A. SALIDA DE ERROR (Paralelogramo de Excepción) */}
                  <g>
                    {/* Ancho 220, alto 60, sesgo 14 */}
                    <polygon
                      points="120,390 310,390 294,452 104,452"
                      fill="#FEF2F2"
                      stroke="#DC2626"
                      strokeWidth="2"
                    />
                    <text x="207" y="410" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#DC2626" letterSpacing="0.5">
                      SALIDA · ALERTA {currentDoc.flow.noPath.responseCode}
                    </text>
                    <text x="207" y="428" textAnchor="middle" fontSize="10" fontWeight="600" fill="#991B1B">
                      {currentDoc.flow.noPath.action.length > 34
                        ? `${currentDoc.flow.noPath.action.slice(0, 32)}...`
                        : currentDoc.flow.noPath.action}
                    </text>
                    <text x="207" y="443" textAnchor="middle" fontSize="9" fill="#B91C1C">
                      {currentDoc.flow.noPath.recoveryState.length > 35
                        ? `${currentDoc.flow.noPath.recoveryState.slice(0, 33)}...`
                        : currentDoc.flow.noPath.recoveryState}
                    </text>
                  </g>

                  {/* ======================================================== */}
                  {/* 6B. BUCLE DE RETORNO (LOOPBACK) AL PASO DE ENTRADA       */}
                  {/* Sube por la izquierda y conecta al paso de Entrada      */}
                  {/* ======================================================== */}
                  <path
                    d="M 104 422 L 40 422 L 40 127 L 298 127"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2.25"
                    strokeDasharray="6 4"
                    markerEnd={`url(#flow-arrow-red-${currentDoc.id})`}
                  />
                  {/* Etiqueta vertical en el bucle */}
                  <g transform="translate(32, 280) rotate(-90)">
                    <text x="0" y="0" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#DC2626" letterSpacing="0.8">
                      BUCLE DE CORRECCIÓN (REINTENTO DE ENTRADA)
                    </text>
                  </g>

                  {/* ======================================================== */}
                  {/* 7. LEYENDA TÉCNICA DE SÍMBOLOS ESTÁNDAR (ISO 5807)        */}
                  {/* ======================================================== */}
                  <g transform="translate(180, 680)">
                    <rect x="0" y="0" width="530" height="34" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                    <text x="14" y="21" fontSize="9.5" fill="#64748B" fontWeight="500">
                      <tspan fontWeight="bold" fill="#0F172A">Símbolos ISO 5807:</tspan> Óvalo = Terminador · Paralelogramo = Entrada/Salida · Rectángulo = Proceso · Rombo = Decisión
                    </text>
                  </g>
                </svg>
              </div>

              {/* Explicación de la ingeniería del flujo */}
              <div className="mt-3 pt-3 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-emerald-800">✓ Camino Feliz [SÍ]:</span>
                    <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {currentDoc.flow.yesPath.responseCode}
                    </span>
                  </div>
                  <p className="text-emerald-900 leading-relaxed">
                    {currentDoc.flow.yesPath.action}. Estado final: <b>{currentDoc.flow.yesPath.finalState}</b>.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-amber-800">⚠️ Excepción y Bucle [NO]:</span>
                    <span className="font-mono text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                      {currentDoc.flow.noPath.responseCode}
                    </span>
                  </div>
                  <p className="text-amber-900 leading-relaxed">
                    {currentDoc.flow.noPath.action}. <b>Bucle de retorno:</b> {currentDoc.flow.noPath.recoveryState}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CAPTURA DE PANTALLA REAL DEL PROTOTIPO */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                  3. Captura del Prototipo en Funcionamiento (Pantalla Real):
                </span>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Interfaz real de la aplicación web Faroo para {currentDoc.id.toUpperCase()}. Haz clic en la imagen para ampliar en pantalla completa.
                </p>
              </div>
              <span className="text-[11px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md self-start sm:self-auto font-semibold">
                Captura Verificada 1280x820
              </span>
            </div>

            {/* MARCO DE VENTANA TIPO NAVEGADOR CON LA CAPTURA REAL */}
            <div className="rounded-2xl border border-neutral-300 bg-white shadow-xs overflow-hidden">
              {/* Barra superior de ventana */}
              <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100/90 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-700 ml-2 hidden sm:inline">
                    Faroo Web Client
                  </span>
                </div>

                <div className="flex h-7 w-full max-w-md items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 font-mono text-xs text-neutral-600 truncate shadow-2xs">
                  <span className="text-emerald-600 mr-1.5">🔒</span>
                  <span className="truncate">{currentDoc.prototype.url}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 hover:border-neutral-900 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  <span>🔍</span>
                  <span className="hidden sm:inline">Ampliar</span>
                </button>
              </div>

              {/* IMAGEN DE LA CAPTURA REAL */}
              <div className="relative group bg-neutral-900 cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
                <img
                  src={currentDoc.prototype.image}
                  alt={currentDoc.prototype.title}
                  className="w-full h-auto block transition-opacity duration-200 group-hover:opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="rounded-xl bg-neutral-900/80 backdrop-blur-xs text-white px-4 py-2 text-xs font-semibold shadow-lg">
                    🔍 Clic para ampliar a tamaño completo
                  </span>
                </div>
              </div>

              {/* EXPLICACIÓN ESTUDIANTIL Y CONTROLES CLAVE */}
              <div className="p-5 sm:p-6 bg-neutral-50/70 border-t border-neutral-200 space-y-4">
                <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-neutral-200">
                  <span className="text-xl shrink-0 mt-0.5">💡</span>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Cómo funciona esta pantalla (Nota de David & Nikoll):
                    </h5>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-neutral-700">
                      {currentDoc.prototype.studentNotes}
                    </p>
                  </div>
                </div>

                {/* Píldoras de controles clave de la pantalla */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                    Elementos Clave de la Interfaz:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {currentDoc.prototype.keyElements.map((elem, idx) => (
                      <div key={idx} className="rounded-lg bg-white border border-neutral-200 p-2.5 shadow-2xs">
                        <div className="text-xs font-bold text-neutral-900">{elem.label}</div>
                        <div className="text-[11px] text-neutral-600 mt-0.5 leading-snug">{elem.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NAVEGACIÓN SECUENCIAL ENTRE CASOS DE USO */}
          <div className="border-t border-neutral-200 pt-6 flex items-center justify-between gap-3">
            {prevDoc ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedCaseId(prevDoc.id);
                  const el = document.getElementById('doc-casos-uso');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-50 cursor-pointer shadow-2xs"
              >
                <span>←</span>
                <span className="font-mono font-bold">{prevDoc.id.toUpperCase()}</span>
                <span className="hidden sm:inline text-neutral-500">· {prevDoc.name.split(':')[1]?.trim() || prevDoc.name}</span>
              </button>
            ) : <div />}

            <span className="text-xs font-mono font-semibold text-neutral-500">
              {currentIndex + 1} de {USE_CASE_DOCS.length}
            </span>

            {nextDoc ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedCaseId(nextDoc.id);
                  const el = document.getElementById('doc-casos-uso');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-medium text-neutral-800 transition-colors hover:border-neutral-900 hover:bg-neutral-50 cursor-pointer ml-auto shadow-2xs"
              >
                <span className="hidden sm:inline text-neutral-500">{nextDoc.name.split(':')[1]?.trim() || nextDoc.name} ·</span>
                <span className="font-mono font-bold">{nextDoc.id.toUpperCase()}</span>
                <span>→</span>
              </button>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL PARA VER CAPTURA EN GRANDE */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-neutral-900 text-white px-2 py-0.5 rounded">
                  {currentDoc.id.toUpperCase()}
                </span>
                <span className="text-sm font-bold text-neutral-900">{currentDoc.prototype.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="text-neutral-500 hover:text-neutral-900 text-lg font-bold px-2 py-0.5 rounded cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-60px)] p-2 bg-neutral-900 flex justify-center">
              <img
                src={currentDoc.prototype.image}
                alt={currentDoc.prototype.title}
                className="w-full h-auto object-contain max-h-[80vh] rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
