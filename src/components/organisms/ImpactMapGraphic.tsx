import { useState } from 'react';
import {
  IMPACT_MAP_NODES,
  PROJECT_META,
  ROLE_LIST,
  type RoleId,
} from '@/data/manualData';

interface ImpactMapGraphicProps {
  selectedRole?: RoleId | 'all';
  onSelectRole?: (role: RoleId | 'all') => void;
}

export function ImpactMapGraphic({ selectedRole: _selectedRole, onSelectRole: _onSelectRole }: ImpactMapGraphicProps = {}) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div
        style={{
          backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        className="rounded-2xl border border-[#E5E5E5] bg-[#FBFBFA] p-5 sm:p-7 shadow-none"
      >
        
        {/* =========================================================================
            NIVEL 1: META CENTRAL (OBJETIVO DE NEGOCIO)
            ========================================================================= */}
        <div className="relative mx-auto max-w-3xl rounded-xl border-2 border-[#111111] bg-[#FAFAFA] p-5 text-center shadow-none">
          <div className="flex items-center justify-center gap-2">
            <span className="rounded bg-[#111111] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#FFFFFF]">
              NIVEL 1 · META CENTRAL
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
              Por Qué Desarrollamos Faroo
            </span>
          </div>

          <p className="mt-3 text-[14px] font-medium leading-relaxed text-[#111111] sm:text-[15px]">
            «{PROJECT_META.generalObjective}»
          </p>
        </div>

        {/* LÍNEA DE FLUJO CENTRAL CON FLECHAS REALES HACIA LOS 4 ACTORES */}
        <div className="my-6 flex flex-col items-center">
          <div className="h-6 w-0.5 bg-[#111111]" />
          <div className="flex items-center gap-2 rounded-full border-2 border-[#111111] bg-[#FFFFFF] px-4 py-1 text-[11px] font-semibold text-[#111111] shadow-xs">
            <span>Flujo de impacto hacia los 4 actores</span>
            <svg className="h-3.5 w-3.5 text-[#111111]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
          <div className="h-6 w-0.5 bg-[#111111]" />
        </div>

        {/* ENCABEZADOS DE LAS 3 COLUMNAS DEL MAPA */}
        <div className="hidden grid-cols-12 gap-4 border-b border-[#E5E5E5] pb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#737373] lg:grid">
          <div className="col-span-3 flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#111111] text-[9px] text-[#FFFFFF]">2</span>
            <span>Actor (Quién)</span>
          </div>
          <div className="col-span-5 flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#111111] text-[9px] text-[#FFFFFF]">3</span>
            <span>Impacto (Cambio cotidiano deseado)</span>
          </div>
          <div className="col-span-4 flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#111111] text-[9px] text-[#FFFFFF]">4</span>
            <span>Entregable de Software (Qué construimos)</span>
          </div>
        </div>

        {/* =========================================================================
            RAMAS DEL MAPA: ACTORES (NIVEL 2) -> IMPACTOS (NIVEL 3) -> ENTREGABLES (NIVEL 4)
            ========================================================================= */}
        <div className="mt-5 space-y-5">
          {ROLE_LIST.map((role) => {
            const roleNodes = IMPACT_MAP_NODES.filter((n) => n.roleId === role.id);
            if (roleNodes.length === 0) return null;

            return (
              <div
                key={role.id}
                className="relative rounded-xl border border-[#E5E5E5] bg-[#FAFAFA]/40 p-4 transition-all hover:border-[#111111] hover:bg-[#FAFAFA]"
              >
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                  
                  {/* NODO ACTOR (NIVEL 2) CON CONECTOR DE FLECHA REAL */}
                  <div className="lg:col-span-3">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-1 items-center gap-2.5 rounded-lg border-2 border-[#111111] bg-[#FFFFFF] px-4 py-3 shadow-none">
                        <span className="h-2 w-2 rounded-full bg-[#111111]" />
                        <span className="text-[14px] font-bold text-[#111111]">
                          {role.name}
                        </span>
                      </div>

                      {/* FLECHA SVG DE SALIDA DEL ACTOR */}
                      <div className="hidden lg:flex items-center">
                        <div className="h-0.5 w-4 bg-[#111111]" />
                        <svg className="h-4 w-4 -ml-1 text-[#111111]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* LISTA DE IMPACTOS Y ENTREGABLES VINCULADOS CON FLECHAS VISUALES */}
                  <div className="space-y-3 lg:col-span-9">
                    {roleNodes.map((node) => {
                      const isHovered = hoveredNodeId === node.id;
                      const isSprint1 = node.sprintTarget === 'Sprint 1';

                      return (
                        <div
                          key={node.id}
                          onMouseEnter={() => setHoveredNodeId(node.id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                          className={`flex flex-col gap-3 rounded-lg border p-3.5 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                            isHovered
                              ? 'border-[#111111] bg-[#FFFFFF] shadow-xs'
                              : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#111111]'
                          }`}
                        >
                          {/* IMPACTO CASUAL Y ENTENDIBLE (NIVEL 3) */}
                          <div className="flex-1 pr-2">
                            <p className="text-[13px] font-semibold leading-snug text-[#111111]">
                              {node.impactTitle}
                            </p>
                          </div>

                          {/* FLECHA CONECTORA SVG DE ALTA CALIDAD */}
                          <div className="hidden items-center sm:flex shrink-0 px-2 text-[#111111]">
                            <div className="h-0.5 w-6 bg-[#111111]" />
                            <svg className="h-4 w-4 -ml-1 text-[#111111]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </div>

                          {/* ENTREGABLE COMPLETO SIN TRUNCAR (NIVEL 4) */}
                          <div className="flex flex-col gap-1.5 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-2.5 sm:w-[48%] shrink-0">
                            <div className="flex items-center justify-between gap-2 border-b border-[#E5E5E5] pb-1">
                              <span className="font-mono text-[10px] font-semibold uppercase text-[#737373]">
                                Entregable
                              </span>
                              <span
                                className={`shrink-0 rounded px-2 py-0.5 font-mono text-[10px] font-semibold ${
                                  isSprint1
                                    ? 'bg-[#111111] text-[#FFFFFF]'
                                    : 'border border-[#111111] bg-[#FFFFFF] text-[#111111]'
                                }`}
                              >
                                {node.sprintTarget}
                              </span>
                            </div>
                            <span className="text-[12px] font-medium leading-snug text-[#111111]">
                              {node.whatWeBuildTitle}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* LEYENDA DEL PLANO */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E5E5] pt-3 text-[11px] text-[#737373]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#111111]" />
              Sprint 1 (MVP indispensable)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border border-[#111111] bg-[#FFFFFF]" />
              Sprint 2 (Mejoras y semáforo)
            </span>
          </div>
          <span>Flujo trazable: Meta Central ──► Actor ──► Impacto ──► Entregable</span>
        </div>
      </div>
    </div>
  );
}