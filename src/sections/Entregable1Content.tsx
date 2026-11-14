import { useState } from 'react';
import {
  BRAINSTORM_IDEAS,
  PROJECT_SELECTION,
  ROLE_LIST,
  type RoleId,
} from '@/data/manualData';
import { ImpactMapGraphic } from '@/components/organisms/ImpactMapGraphic';
import { MoscowMatrixGraphic } from '@/components/organisms/MoscowMatrixGraphic';
import { StoryMapBoard } from '@/components/organisms/StoryMapBoard';
import {
  SilhouetteFarooBuilding,
  SilhouetteHealthClinic,
  SilhouetteCornerShop,
  SilhouetteOwner,
  SilhouetteTenant,
  SilhouetteAdmin,
  SilhouetteSupport,
} from '@/components/atoms/Silhouettes';

interface Entregable1ContentProps {
  selectedRole: RoleId | 'all';
  onSelectRole: (role: RoleId | 'all') => void;
  onJumpToStage2?: () => void;
}

export function Entregable1Content({
  selectedRole,
  onSelectRole,
  onJumpToStage2,
}: Entregable1ContentProps) {
  const [showStoryMap, setShowStoryMap] = useState<boolean>(true);
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(null);

  // Siluetas en blanco y negro para las 3 ideas
  const ideaSilhouettes: Record<string, React.ReactNode> = {
    faroo: <SilhouetteFarooBuilding size={36} className="text-[#111111]" />,
    mediturnos: <SilhouetteHealthClinic size={36} className="text-[#737373]" />,
    barriostock: <SilhouetteCornerShop size={36} className="text-[#737373]" />,
  };

  // Siluetas en blanco y negro para los 4 roles
  const roleSilhouettes: Record<RoleId, React.ReactNode> = {
    propietario: <SilhouetteOwner size={22} className="text-[#111111]" />,
    inquilino: <SilhouetteTenant size={22} className="text-[#111111]" />,
    administrador: <SilhouetteAdmin size={22} className="text-[#111111]" />,
    soporte: <SilhouetteSupport size={22} className="text-[#111111]" />,
  };

  return (
    <div className="w-full">
      {/* Introducción */}
      <section id="e1-hero" className="scroll-mt-28 border-b border-neutral-200 pb-5 mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Entrega 1 · Ingeniería de Software I
        </p>

        <h1 className="mt-2.5 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
          Ideación, Selección del Tema y Planificación
        </h1>

        <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-600">
          Evaluamos tres propuestas de software y elegimos Faroo porque ya teníamos código adelantado. En esta primera entrega dejamos listo el plan de trabajo con el mapa de impacto, la lista de prioridades y el recorrido de arriendo paso a paso en Miro.
        </p>
      </section>

      <div className="space-y-12 sm:space-y-16">
        {/* Punto 1: Lluvia de ideas */}
        <section id="seccion-1" className="scroll-mt-28 space-y-6">
          <div className="border-b border-neutral-200 pb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Punto 1
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
              Lluvia de Ideas
            </h2>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-neutral-600">
              Evaluamos tres propuestas para problemas de la vida cotidiana. David propuso Faroo y me mostró el código que ya venía adelantando, mientras que Nikoll propuso las otras dos alternativas. Al final nos decidimos por Faroo porque era la idea más sólida y con mejor futuro.
            </p>
          </div>

          {/* Tarjetas de ideas */}
          <div className="space-y-4">
            {BRAINSTORM_IDEAS.map((idea) => {
              const isSelected = idea.selected;
              const isExpanded = expandedIdeaId === idea.id;

              return (
                <article
                  key={idea.id}
                  className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                    isSelected
                      ? 'border-neutral-900 bg-white shadow-xs'
                      : 'border-neutral-200 bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2.5 py-0.5 text-xs font-medium ${
                          isSelected
                            ? 'bg-neutral-900 text-white'
                            : 'border border-neutral-200 bg-white text-neutral-600'
                        }`}
                      >
                        {idea.statusLabel}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">{idea.number}</span>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {idea.selected ? 'Proyecto elegido' : 'Opción descartada'}
                    </span>
                  </div>

                  <div className="mt-3 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                        {idea.name}
                      </h3>
                      <p className="mt-0.5 text-sm text-neutral-500">{idea.subtitle}</p>
                    </div>

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border p-1.5 transition-all ${
                        isSelected
                          ? 'border-neutral-900 bg-neutral-50 shadow-xs'
                          : 'border-neutral-200 bg-white'
                      }`}
                    >
                      {ideaSilhouettes[idea.id]}
                    </div>
                  </div>

                  <div className="mt-3.5 border-t border-neutral-200 pt-3.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                      Problema Real
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-800">
                      {idea.realProblem}
                    </p>
                  </div>

                  <div className="mt-3.5 flex items-center justify-between border-t border-neutral-200/60 pt-3">
                    <button
                      type="button"
                      onClick={() => setExpandedIdeaId(isExpanded ? null : idea.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      <span>{isExpanded ? 'Ocultar propuesta y diferencial' : 'Ver propuesta de solución y diferencial'}</span>
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3.5 grid grid-cols-1 gap-4 border-t border-neutral-200 pt-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-neutral-200 bg-white p-3.5">
                        <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                          Propuesta de Solución
                        </span>
                        <p className="mt-1.5 text-sm leading-relaxed text-neutral-800">
                          {idea.proposedSolution}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] p-3.5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#737373]">
                          Diferencial
                        </span>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#111111]">
                          {idea.differentialValue}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Punto 2: Selección del tema y roles */}
        <section id="seccion-2" className="scroll-mt-28 space-y-6">
          <div className="border-b border-neutral-200 pb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Punto 2
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
              Selección del Tema, Justificación y Roles
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Por qué elegimos Faroo, qué queremos lograr y quiénes son las 4 personas clave que van a usar la aplicación.
            </p>
          </div>

          {/* Justificación del proyecto */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-neutral-900 px-2.5 py-0.5 text-xs font-medium text-white">
                  Idea Seleccionada
                </span>
                <h3 className="text-[18px] font-semibold text-[#111111]">
                  {PROJECT_SELECTION.selectedIdeaName}
                </h3>
              </div>
              <span className="text-[12px] text-[#737373]">Proyecto Seleccionado</span>
            </div>

            <div className="mt-6 space-y-6">
              {/* Problema que resuelve */}
              <div className="space-y-1.5">
                <h4 className="text-sm sm:text-base font-semibold text-neutral-900">
                  01. ¿Qué problema resuelve el software?
                </h4>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {PROJECT_SELECTION.justification.problemSolved}
                </p>
              </div>

              {/* Justificación de desarrollo */}
              <div className="space-y-1.5 border-t border-neutral-200 pt-5">
                <h4 className="text-sm sm:text-base font-semibold text-neutral-900">
                  02. ¿Por qué vale la pena desarrollarlo?
                </h4>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {PROJECT_SELECTION.justification.whyWorthDeveloping}
                </p>
              </div>
            </div>
          </div>

          {/* Roles y beneficiarios */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                  Actores Involucrados
                </span>
                <h3 className="mt-1 text-lg font-semibold text-neutral-900">
                  Los 4 Roles y Beneficiarios de Faroo
                </h3>
              </div>
              <span className="text-xs text-neutral-500">Los mismos 4 roles en todo el proyecto</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ROLE_LIST.map((r) => {
                const isSel = selectedRole === r.id;
                const beneficiary = PROJECT_SELECTION.justification.targetBeneficiaries.find((b) =>
                  b.actor.toLowerCase().includes(r.id)
                );

                return (
                  <div
                    key={r.id}
                    onClick={() => onSelectRole(isSel ? 'all' : r.id)}
                    className={`cursor-pointer rounded-xl border p-5 transition-all ${
                      isSel
                        ? 'border-[#111111] bg-[#FAFAFA] shadow-sm'
                        : 'border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#111111]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] text-[#111111]">
                          {roleSilhouettes[r.id]}
                        </div>
                        <span className="text-[15px] font-semibold text-[#111111]">{r.name}</span>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-[#111111]" />
                    </div>

                    <p className="mt-3 text-[13px] leading-relaxed text-[#737373]">{r.whoIs}</p>
                    
                    <div className="mt-4 border-t border-[#E5E5E5] pt-3 text-[12px] text-[#737373]">
                      <span className="font-semibold text-[#111111]">Dolor resuelto: </span>
                      {r.dailyPain}
                    </div>

                    {beneficiary && (
                      <div className="mt-2 text-[12px] text-[#737373]">
                        <span className="font-semibold text-[#111111]">Beneficio: </span>
                        {beneficiary.benefit}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Punto 3: Mapa de impacto */}
        <section id="seccion-3" className="scroll-mt-28 space-y-6">
          <div className="border-b border-neutral-200 pb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Punto 3
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
              Mapa de Impacto
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Esquema jerárquico de 4 niveles: Objetivo Central de Faroo → Los 4 Actores → Cambios de Comportamiento Reales → Entregables de Software.
            </p>
          </div>

          <ImpactMapGraphic selectedRole={selectedRole} onSelectRole={onSelectRole} />
        </section>

        {/* Punto 4: Priorización MoSCoW */}
        <section id="seccion-moscow" className="scroll-mt-28 space-y-6">
          <div className="border-b border-neutral-200 pb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Punto 4
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
              Priorización MoSCoW
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Clasificamos las funcionalidades con sensatez: lo obligatorio para arrancar el primer mes (Must Have), lo muy importante para el día a día (Should Have), comodidades si da tiempo (Could Have) y cosas complejas que dejamos por fuera por ahora (Won&apos;t Have).
            </p>
          </div>

          <MoscowMatrixGraphic selectedRole={selectedRole} />
        </section>

        {/* Punto 5: User Story Mapping */}
        <section id="seccion-4" className="scroll-mt-28 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-neutral-200 pb-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Punto 5
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
                User Story Mapping
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowStoryMap(!showStoryMap)}
              className="self-start rounded-lg border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900 sm:self-center"
            >
              {showStoryMap ? 'Minimizar sección' : 'Expandir sección'}
            </button>
          </div>

        {showStoryMap ? (
          <StoryMapBoard selectedRole={selectedRole} />
        ) : (
          <div className="rounded-xl border border-dashed border-[#E5E5E5] bg-[#FAFAFA] p-6 text-center text-[13px] text-[#737373]">
            Sección minimizada para una lectura más despejada.{' '}
            <button
              type="button"
              onClick={() => setShowStoryMap(true)}
              className="font-semibold text-[#111111] underline underline-offset-4"
            >
              Hacer clic para ver el recorrido de 6 hitos
            </button>
          </div>
        )}

        {/* Siguiente entrega */}
        {onJumpToStage2 && (
          <div className="no-print border-t border-[#E5E5E5] pt-10">
            <button
              type="button"
              onClick={onJumpToStage2}
              className="inline-flex items-center gap-2 rounded-lg bg-[#111111] px-5 py-2.5 text-[13px] font-medium text-[#FFFFFF] transition-opacity hover:opacity-85 shadow-sm"
            >
              Ir a la Etapa 2 · Épicas e Historias →
            </button>
          </div>
        )}
      </section>
      </div>
    </div>
  );
}
