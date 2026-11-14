import { useState } from 'react';
import {
  EPICS,
  STORY_MAP_ACTIVITIES,
  STORY_MAP_STEPS,
  USER_STORIES,
  type RoleId,
} from '@/data/manualData';
import { RoleBadge } from '@/components/atoms/RoleBadge';

interface EvolutionTreeGraphicProps {
  selectedRole: RoleId | 'all';
}

const stageLabel = 'text-[12px] font-semibold uppercase tracking-[0.08em] text-muted';

export function EvolutionTreeGraphic({ selectedRole }: EvolutionTreeGraphicProps) {
  const [selectedActivityIndex, setSelectedActivityIndex] = useState<number>(5);

  const currentActivity =
    STORY_MAP_ACTIVITIES.find((a) => a.index === selectedActivityIndex) || STORY_MAP_ACTIVITIES[0];
  const currentEpic =
    EPICS.find((e) => e.originActivityIndex === currentActivity.index) || EPICS[0];
  const stepsForActivity = STORY_MAP_STEPS.filter(
    (s) => s.activityIndex === currentActivity.index
  );
  const storiesForEpic = USER_STORIES.filter((hu) => hu.epicId === currentEpic.id);

  return (
    <div className="space-y-6">
      <div className="border-b border-line pb-4">
        <span className={stageLabel}>Gráfico de crecimiento · Etapa 1 → Etapa 2</span>
        <h3 className="mt-1.5 text-[24px] font-semibold tracking-[-0.02em] text-ink">
          Cómo las ideas del story map se transforman en épicas, historias y tasks
        </h3>
        <p className="mt-1.5 max-w-[70ch] text-[15px] leading-[1.6] text-muted">
          Elige cualquiera de las 6 actividades de la Etapa 1 para ver cómo evolucionó sin perder
          ningún rol ni paso en el camino.
        </p>
      </div>

      {/* SELECTOR */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        {STORY_MAP_ACTIVITIES.map((act) => {
          const isSelected = act.index === selectedActivityIndex;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => setSelectedActivityIndex(act.index)}
              className={`rounded-lg border p-3 text-left transition-colors ${
                isSelected
                  ? 'border-ink bg-ink text-white shadow-sm'
                  : 'border-line bg-surface text-ink hover:border-ink/30'
              }`}
            >
              <span
                className={`block text-[11px] font-semibold uppercase tracking-[0.08em] ${
                  isSelected ? 'text-white/70' : 'text-muted'
                }`}
              >
                Act. 0{act.index} → EP-0{act.index}
              </span>
              <span className="mt-1 block text-[13px] font-semibold leading-snug">
                {act.name.replace(/^\d+\.\s*/, '')}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4 NIVELES */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-4 lg:gap-6">
        {/* 1. ETAPA 1 */}
        <div className="flex flex-col justify-between gap-3">
          <div className="space-y-3">
            <span className={stageLabel}>1. En Etapa 1 (ideación)</span>
            <h4 className="text-[17px] font-semibold leading-snug text-ink">
              {currentActivity.name}
            </h4>
            <p className="text-[14px] leading-[1.6] text-muted">
              {currentActivity.everydayExplanation}
            </p>
            <div className="space-y-2 border-t border-line pt-3">
              <span className={stageLabel}>Pasos cotidianos en Etapa 1</span>
              {stepsForActivity.map((st) => (
                <div key={st.stepId} className="text-[13px] leading-snug">
                  <span className="mr-1.5 font-mono text-[12px] text-muted">{st.stepId}:</span>
                  <span className="text-ink font-medium">{st.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line pt-2 text-[12px] font-medium text-muted">
            Evoluciona a épica →
          </div>
        </div>

        {/* 2. ÉPICA */}
        <div className="flex flex-col justify-between gap-3 border-l-2 border-ink pl-5">
          <div className="space-y-3">
            <span className={stageLabel}>2. Se convierte en épica ({currentEpic.id})</span>
            <h4 className="text-[17px] font-semibold leading-snug text-ink">{currentEpic.name}</h4>
            <p className="border-l-2 border-line pl-3 text-[14px] leading-[1.6] text-ink">
              «Como <span className="font-semibold">{currentEpic.asA}</span>, quiero{' '}
              {currentEpic.iWant} para {currentEpic.soThat}.»
            </p>
            <div className="space-y-2 border-t border-line pt-3">
              <span className={stageLabel}>Roles que participan</span>
              <div className="flex flex-wrap gap-1.5">
                <RoleBadge roleId={currentEpic.primaryRoleId} size="sm" variant="solid" />
                {currentEpic.supportingRoles.map((r) => (
                  <RoleBadge key={r} roleId={r} size="sm" variant="solid" />
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-line pt-2 text-[12px] font-medium text-muted">
            Se divide en {storiesForEpic.length} historias →
          </div>
        </div>

        {/* 3. HISTORIAS */}
        <div className="flex flex-col justify-between gap-3 border-l-2 border-line pl-5">
          <div className="space-y-3">
            <span className={stageLabel}>3. Crece a historias de usuario</span>
            <div className="space-y-2.5">
              {storiesForEpic.map((hu) => {
                const dimmed = selectedRole !== 'all' && hu.roleId !== selectedRole;
                return (
                  <div
                    key={hu.id}
                    style={{ opacity: dimmed ? 0.3 : 1 }}
                    className="space-y-1.5 border-t border-line pt-2.5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[13px] font-bold tabular-nums text-ink">
                        {hu.id}{' '}
                        <span className="text-[11px] font-normal text-muted">(de {hu.originStepId})</span>
                      </span>
                      <RoleBadge roleId={hu.roleId} size="xs" />
                    </div>
                    <div className="text-[14px] font-medium leading-snug text-ink">{hu.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t border-line pt-2 text-[12px] font-medium text-muted">
            Se desglosa en tasks →
          </div>
        </div>

        {/* 4. TASKS */}
        <div className="flex flex-col justify-between gap-3 border-l-2 border-line pl-5">
          <div className="space-y-3">
            <span className={stageLabel}>4. Aterriza en tasks concretas</span>
            <div className="space-y-2">
              {storiesForEpic
                .flatMap((hu) => hu.tasks.map((t) => ({ ...t, storyId: hu.id, roleId: hu.roleId })))
                .map((task) => {
                  const dimmed = selectedRole !== 'all' && task.roleId !== selectedRole;
                  return (
                    <div
                      key={task.taskId}
                      style={{ opacity: dimmed ? 0.3 : 1 }}
                      className="text-[13px] leading-snug border-b border-line/50 pb-1.5 last:border-b-0"
                    >
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="text-[11px] font-mono tabular-nums text-muted">
                          {task.taskId} ({task.storyId})
                        </span>
                        <span className="text-[11px] text-muted">{task.areaLabel}</span>
                      </div>
                      <p className="text-ink font-medium mt-0.5">{task.title}</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="border-t border-line pt-2 text-[12px] font-medium text-muted">
            Pasa al backlog en Etapa 3
          </div>
        </div>
      </div>
    </div>
  );
}
