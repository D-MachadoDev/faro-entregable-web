import { useState, useEffect } from 'react';
import { USER_STORIES, type RoleId } from '@/data/manualData';
import { RoleBadge } from '@/components/atoms/RoleBadge';
import { RoleFilterBar } from '@/components/molecules/RoleFilterBar';
import type { Deliverable } from '@/hooks/useActiveDeliverable';

const JIRA_BACKLOG_URL =
  'https://pascualbravo-team-vs1bmmnm.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog';

const JIRA_BOARD_ACTIVE_URL =
  'https://pascualbravo-team-vs1bmmnm.atlassian.net/jira/software/projects/SCRUM/boards/1';

const JIRA_BROWSE_URL = 'https://pascualbravo-team-vs1bmmnm.atlassian.net/browse';

interface Entregable3ContentProps {
  selectedRole: RoleId | 'all';
  onSelectRole: (role: RoleId | 'all') => void;
  onDownloadExcel?: () => void;
  onNavigateDeliverable?: (d: Deliverable, section?: string | null) => void;
  activeSection?: string | null;
}

export function Entregable3Content({
  selectedRole,
  onSelectRole,
  onDownloadExcel,
  onNavigateDeliverable,
  activeSection,
}: Entregable3ContentProps) {
  const [sprintFilter, setSprintFilter] = useState<'all' | 'Sprint 1' | 'Sprint 2'>(() => {
    if (activeSection === 'sprint-1-section') return 'Sprint 1';
    if (activeSection === 'sprint-2-section') return 'Sprint 2';
    return 'all';
  });

  useEffect(() => {
    if (activeSection === 'sprint-1-section') {
      setSprintFilter('Sprint 1');
    } else if (activeSection === 'sprint-2-section') {
      setSprintFilter('Sprint 2');
    } else if (activeSection === 'jira-matrix-section') {
      setSprintFilter('all');
    }
  }, [activeSection]);
  const [searchQuery, setSearchQuery] = useState('');

  const sprint1Stories = USER_STORIES.filter((s) => s.sprint === 'Sprint 1');
  const sprint2Stories = USER_STORIES.filter((s) => s.sprint === 'Sprint 2');

  const totalSpSprint1 = sprint1Stories.reduce((acc, s) => acc + s.storyPoints, 0);
  const totalSpSprint2 = sprint2Stories.reduce((acc, s) => acc + s.storyPoints, 0);

  const filteredStories = USER_STORIES.filter((s) => {
    const roleOk = selectedRole === 'all' || s.roleId === selectedRole;
    const sprintOk = sprintFilter === 'all' || s.sprint === sprintFilter;
    const q = searchQuery.trim().toLowerCase();
    const searchOk =
      !q ||
      s.id.toLowerCase().includes(q) ||
      s.jiraKey.toLowerCase().includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.assignee.toLowerCase().includes(q);
    return roleOk && sprintOk && searchOk;
  });

  return (
    <div className="space-y-10">
      {/* Encabezado con acceso directo a Jira */}
      <section id="e3-hero" className="scroll-mt-28 border-b border-neutral-200 pb-5 mb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Entrega 3 · Ingeniería de Software I
        </p>

        <div className="mt-2.5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
              Tablero Scrum en Atlassian Jira Cloud
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-600">
              Proyecto <strong className="text-neutral-900 font-medium">SCRUM</strong> en Atlassian Cloud. Aquí organizamos las 16 historias de usuario en dos sprints de trabajo, asignadas entre Nikoll y David con sus subtareas técnicas reales.
            </p>
          </div>

          {/* Enlaces a Jira */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={JIRA_BACKLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-black"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.53 2c0 2.4 1.97 4.35 4.38 4.35h3.74v3.68c0 2.41 1.97 4.35 4.35 4.35V2H11.53zm-5.76 5.82c0 2.4 1.97 4.34 4.37 4.34h3.75v3.68c0 2.41 1.96 4.35 4.35 4.35V7.82H5.77zM0 13.65c0 2.4 1.97 4.34 4.38 4.34h3.74v3.66c0 2.41 1.97 4.35 4.35 4.35V13.65H0z"/>
              </svg>
              <span>Abrir Backlog Jira ↗</span>
            </a>

            <a
              href={JIRA_BOARD_ACTIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900"
            >
              Ver Tablero Activo ↗
            </a>
          </div>
        </div>
      </section>

      {/* Resumen de los dos sprints */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Sprint 1 */}
        <div
          id="sprint-1-section"
          onClick={() => {
            const next = sprintFilter === 'Sprint 1' ? 'all' : 'Sprint 1';
            setSprintFilter(next);
            const target = document.getElementById('jira-matrix-section');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`cursor-pointer scroll-mt-28 rounded-2xl border p-5 shadow-xs space-y-3 transition-all ${
            sprintFilter === 'Sprint 1'
              ? 'border-neutral-900 bg-neutral-50/90 ring-2 ring-neutral-900'
              : 'border-neutral-200 bg-white hover:border-neutral-400'
          }`}
          title="Haz clic para filtrar la tabla por Sprint 1"
        >
          <div className="flex items-center justify-between">
            <span className="rounded bg-neutral-100 border border-neutral-200 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-neutral-800">
              Sprint 1 · Flujo Core FARO
            </span>
            <div className="flex items-center gap-2">
              {sprintFilter === 'Sprint 1' && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-200/80 px-2 py-0.5 rounded">
                  Filtro activo
                </span>
              )}
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Activo / Validado
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              Base Operativa y Flujo Core
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Inmuebles con canon, catálogo de ocupación, arrendatarios con cédula, fiadores, actualización de datos de contacto, contratos con día de corte y cobro automático mensual.
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Capacidad: <strong className="text-neutral-900 font-medium">{totalSpSprint1} SP</strong> ({sprint1Stories.length} HUs)</span>
            <span className="font-medium text-neutral-900 text-xs">
              {sprintFilter === 'Sprint 1' ? 'Mostrando historias ↓' : 'Filtrar historias ↓'}
            </span>
          </div>
        </div>

        {/* Sprint 2 */}
        <div
          id="sprint-2-section"
          onClick={() => {
            const next = sprintFilter === 'Sprint 2' ? 'all' : 'Sprint 2';
            setSprintFilter(next);
            const target = document.getElementById('jira-matrix-section');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className={`cursor-pointer scroll-mt-28 rounded-2xl border p-5 shadow-xs space-y-3 transition-all ${
            sprintFilter === 'Sprint 2'
              ? 'border-neutral-900 bg-neutral-50/90 ring-2 ring-neutral-900'
              : 'border-neutral-200 bg-white hover:border-neutral-400'
          }`}
          title="Haz clic para filtrar la tabla por Sprint 2"
        >
          <div className="flex items-center justify-between">
            <span className="rounded bg-neutral-100 border border-neutral-200 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-neutral-800">
              Sprint 2 · Pagos y WhatsApp
            </span>
            <div className="flex items-center gap-2">
              {sprintFilter === 'Sprint 2' && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-200/80 px-2 py-0.5 rounded">
                  Filtro activo
                </span>
              )}
              <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                Planificado / En curso
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-900">
              Recaudo, Comprobantes y Control
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              Carga de comprobantes con foto, abonos parciales, recibos digitales de pago, avisos de vencimiento, devolución con motivo y semáforo de mora.
            </p>
          </div>

          <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Capacidad: <strong className="text-neutral-900 font-medium">{totalSpSprint2} SP</strong> ({sprint2Stories.length} HUs)</span>
            <span className="font-medium text-neutral-900 text-xs">
              {sprintFilter === 'Sprint 2' ? 'Mostrando historias ↓' : 'Filtrar historias ↓'}
            </span>
          </div>
        </div>
      </section>

      {/* Tabla del backlog */}
      <section id="jira-matrix-section" className="scroll-mt-24 space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-[#E5E5E5] pb-3">
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.015em] text-[#111111]">
              Matriz del Backlog en Jira
            </h2>
            <p className="text-[13px] text-[#737373]">
              Haz clic sobre cualquier ticket <span className="font-mono font-semibold text-[#111111]">SCRUM-X</span> para ir directo al detalle oficial en Atlassian.
            </p>
          </div>
          <span className="text-[13px] font-medium text-[#737373]">
            {filteredStories.length} de {USER_STORIES.length} historias
          </span>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-2.5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por ticket (SCRUM-X), historia o responsable..."
            className="h-9 w-full rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3 text-[13px] text-[#111111] placeholder:text-[#737373] focus:border-[#111111] focus:outline-none sm:w-80"
          />

          <div className="flex items-center gap-1 rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-0.5">
            {(['all', 'Sprint 1', 'Sprint 2'] as const).map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => setSprintFilter(sp)}
                className={`h-7 rounded-md px-2.5 text-[12px] font-medium transition-colors ${
                  sprintFilter === sp
                    ? 'bg-[#111111] text-white'
                    : 'text-[#737373] hover:text-[#111111]'
                }`}
              >
                {sp === 'all' ? 'Todos los Sprints' : sp}
              </button>
            ))}
          </div>

          {onDownloadExcel && (
            <button
              type="button"
              onClick={onDownloadExcel}
              className="ml-auto inline-flex h-9 items-center rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 text-[12px] font-medium text-[#737373] transition-colors hover:text-[#111111]"
            >
              Exportar Matriz Excel
            </button>
          )}
        </div>

        <RoleFilterBar
          selectedRole={selectedRole}
          onSelectRole={onSelectRole}
          stageLabel="Filtrar por rol"
        />

        {/* Tabla del backlog */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
          <div className="w-full">
            <table className="w-full border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  <th className="py-3.5 pl-4 pr-2 w-28">Ticket Jira</th>
                  <th className="py-3.5 px-2 w-20">ID / Épica</th>
                  <th className="py-3.5 px-2 w-28">Rol</th>
                  <th className="py-3.5 px-3">Historia de Usuario</th>
                  <th className="py-3.5 px-2 w-24 text-center">Sprint</th>
                  <th className="py-3.5 px-2 w-16 text-center">SP</th>
                  <th className="py-3.5 pr-4 pl-2 w-40 text-right">Responsable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredStories.map((hu) => (
                  <tr key={hu.id} className="transition-colors hover:bg-neutral-50">
                    {/* Enlace al ticket */}
                    <td className="py-3.5 pl-4 pr-2 whitespace-nowrap">
                      <a
                        href={`${JIRA_BROWSE_URL}/${hu.jiraKey}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono font-medium text-neutral-900 hover:underline"
                        title="Abrir ticket oficial en Jira Cloud"
                      >
                        <span className="rounded bg-neutral-50 border border-neutral-200 px-2 py-0.5 text-xs">
                          {hu.jiraKey}
                        </span>
                        <svg className="h-3 w-3 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    </td>

                    {/* Identificador y épica con enlace directo a Entrega 2 */}
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onNavigateDeliverable?.('e2', `story-${hu.id.toLowerCase()}`)}
                        className="group flex items-center gap-1 font-mono font-semibold text-neutral-900 hover:text-blue-600 transition-colors cursor-pointer"
                        title={`Ver ${hu.id} en Entrega 2`}
                      >
                        <span>{hu.id}</span>
                        <span className="text-[10px] text-neutral-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform">↗</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigateDeliverable?.('e2', `epic-${hu.epicId.toLowerCase().replace('-', '')}`)}
                        className="group block text-[11px] font-mono text-neutral-500 hover:text-blue-600 transition-colors cursor-pointer"
                        title={`Ver ${hu.epicId} en Entrega 2`}
                      >
                        <span>{hu.epicId}</span>
                        <span className="text-[9px] text-neutral-400 group-hover:text-blue-600 ml-0.5">↗</span>
                      </button>
                    </td>

                    {/* Rol asignado */}
                    <td className="py-3.5 px-2 whitespace-nowrap">
                      <RoleBadge roleId={hu.roleId} size="sm" variant="solid" />
                    </td>

                    {/* Título de la historia con enlace a Entrega 2 */}
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => onNavigateDeliverable?.('e2', `story-${hu.id.toLowerCase()}`)}
                        className="text-left font-normal text-neutral-900 hover:text-blue-600 leading-snug cursor-pointer transition-colors block"
                        title={`Abrir especificación de ${hu.id} en Entrega 2`}
                      >
                        {hu.title}
                      </button>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                        <span>{hu.tasks.length} subtareas:</span>
                        <span className="font-mono">{hu.tasks.map((t) => t.jiraSubtaskKey).join(', ')}</span>
                      </div>
                    </td>

                    {/* Sprint asignado */}
                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                      <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-medium ${
                        hu.sprint === 'Sprint 1'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                      }`}>
                        {hu.sprint}
                      </span>
                    </td>

                    {/* Puntos de historia */}
                    <td className="py-3.5 px-2 text-center whitespace-nowrap font-mono font-medium text-neutral-900">
                      {hu.storyPoints}
                    </td>

                    {/* Responsable */}
                    <td className="py-3.5 pr-4 pl-2 whitespace-nowrap text-right text-xs font-medium text-neutral-800">
                      {hu.assignee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStories.length === 0 && (
              <div className="py-10 text-center text-[13px] text-[#737373]">
                No hay historias que coincidan con los filtros seleccionados.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
