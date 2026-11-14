import React, { useState, useEffect } from 'react';
import { EPICS, USER_STORIES, type RoleId } from '@/data/manualData';
import { RoleBadge } from '@/components/atoms/RoleBadge';

interface Entregable2ContentProps {
  selectedRole: RoleId | 'all';
  onSelectRole: (role: RoleId | 'all') => void;
  onJumpToStage3?: () => void;
  onDownloadExcel?: () => void;
}

export function Entregable2Content({
  selectedRole,
  onSelectRole,
  onJumpToStage3,
  onDownloadExcel,
}: Entregable2ContentProps) {
  const [selectedEpicFilter, setSelectedEpicFilter] = useState<string>('all');
  const [expandedStoryId, setExpandedStoryId] = useState<string | null>(null);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('story-')) {
        const id = hash.replace('story-', '').toUpperCase();
        setExpandedStoryId(id);
      }
    };
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleEpicClick = (epicId: string) => {
    const isCurrent = selectedEpicFilter === epicId;
    const nextFilter = isCurrent ? 'all' : epicId;
    setSelectedEpicFilter(nextFilter);

    // Solo si activamos una épica que sí tenga historias para el rol activo, baja suavemente
    if (!isCurrent) {
      const hasStories = USER_STORIES.some((hu) => {
        const roleMatch = selectedRole === 'all' || hu.roleId === selectedRole;
        return hu.epicId === epicId && roleMatch;
      });

      if (hasStories) {
        const target = document.getElementById('desglose-historias');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const filteredStories = USER_STORIES.filter((hu) => {
    const roleMatch = selectedRole === 'all' || hu.roleId === selectedRole;
    const epicMatch = selectedEpicFilter === 'all' || hu.epicId === selectedEpicFilter;
    return roleMatch && epicMatch;
  });

  const totalTasks = USER_STORIES.reduce((acc, hu) => acc + hu.tasks.length, 0);

  return (
    <div className="w-full">
      {/* Encabezado */}
      <section id="e2-hero" className="scroll-mt-28 border-b border-neutral-200 pb-5 mb-8">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Entrega 2 · Ingeniería de Software I
        </p>

        <h1 className="mt-2.5 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
          Tablas de Épicas e Historias de Usuario
        </h1>

        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-600">
            Aquí organizamos los requerimientos en las tablas de la plantilla de Excel que nos dio la docente. Partimos de las 6 épicas generales y desglosamos cada una en sus historias de usuario con criterios de aceptación y tareas de desarrollo, conectando lo que priorizamos en la Etapa 1 con el código que ya tenemos adelantado en Faroo.
          </p>

          {onDownloadExcel && (
            <button
              type="button"
              onClick={onDownloadExcel}
              className="no-print inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-900 bg-neutral-900 px-3.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-85 shadow-xs"
            >
              <span>Descargar Matriz Excel (.xlsx)</span>
              <span>↓</span>
            </button>
          )}
        </div>
      </section>

      {/* Contenedor de tablas */}
      <div className="space-y-12 sm:space-y-16">
        {/* Punto 2.1: Tabla de épicas */}
        <section id="catalogo-epicas" className="scroll-mt-28 space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between border-b border-neutral-200 pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Punto 2.1
              </p>
              <h2 className="mt-0.5 text-2xl font-semibold tracking-tight text-neutral-900">
                Tabla de Épicas
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Los 6 grandes objetivos de Faroo según la plantilla de Excel. Al hacer clic en cualquier fila, la página filtra y baja automáticamente a sus historias.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-mono text-neutral-600">
                6 Épicas Registradas
              </span>
            </div>
          </div>

          {/* Tabla de épicas */}
          <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] shadow-xs">
            <div className="w-full">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA] text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                    <th className="py-3.5 pl-4 pr-2 w-24">ID épica</th>
                    <th className="py-3.5 px-3 w-[22%]">Nombre de la épica</th>
                    <th className="py-3.5 px-2 w-28">Como… (rol)</th>
                    <th className="py-3.5 px-3 w-[36%]">Quiero… (objetivo)</th>
                    <th className="py-3.5 pl-3 pr-4">Para… (beneficio)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {EPICS.map((ep) => {
                    const isFilteringThis = selectedEpicFilter === ep.id;

                    return (
                      <tr
                        key={ep.id}
                        id={`epic-${ep.id.toLowerCase().replace('-', '')}`}
                        onClick={() => handleEpicClick(ep.id)}
                        className={`cursor-pointer transition-colors scroll-mt-32 ${
                          isFilteringThis ? 'bg-[#FAFAFA]' : 'hover:bg-[#FAFAFA]/70'
                        }`}
                      >
                        <td className="py-4 pl-4 pr-2 align-top">
                          <span className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[11px] font-bold ${
                            isFilteringThis
                              ? 'border-[#111111] bg-[#111111] text-[#FFFFFF]'
                              : 'border-[#E5E5E5] bg-[#FAFAFA] text-[#111111]'
                          }`}>
                            {ep.id}
                          </span>
                        </td>
                        <td className="py-4 px-3 align-top font-semibold text-[#111111]">
                          {ep.name}
                        </td>
                        <td className="py-4 px-2 align-top capitalize text-[#737373]">
                          {ep.asA}
                        </td>
                        <td className="py-4 px-3 align-top leading-relaxed text-[#111111]">
                          {ep.iWant}
                        </td>
                        <td className="py-4 pl-3 pr-4 align-top leading-relaxed text-[#737373]">
                          {ep.soThat}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Punto 2.2: Tabla de historias de usuario */}
        <section id="desglose-historias" className="scroll-mt-28 space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between border-b border-neutral-200 pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Punto 2.2
              </p>
              <h2 className="mt-0.5 text-2xl font-semibold tracking-tight text-neutral-900">
                Tabla de Historias de Usuario
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Desglose detallado de cada épica con rol, objetivo, beneficio, criterios de validación y tareas técnicas.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-mono text-neutral-600">
                Mostrando {filteredStories.length} de {USER_STORIES.length} historias
              </span>
            </div>
          </div>

          {/* Filtros por épica y rol */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] p-3">
            {/* Filtro por Épica */}
            <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
              <span className="mr-1 font-semibold text-[#737373]">Épica:</span>
              <button
                type="button"
                onClick={() => setSelectedEpicFilter('all')}
                className={`rounded px-2.5 py-1 font-medium transition-colors ${
                  selectedEpicFilter === 'all'
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'bg-[#FAFAFA] text-[#737373] hover:text-[#111111]'
                }`}
              >
                Todas ({USER_STORIES.length})
              </button>
              {EPICS.map((ep) => (
                <button
                  key={ep.id}
                  type="button"
                  onClick={() => setSelectedEpicFilter(selectedEpicFilter === ep.id ? 'all' : ep.id)}
                  className={`rounded px-2 py-1 font-mono transition-colors ${
                    selectedEpicFilter === ep.id
                      ? 'bg-[#111111] text-[#FFFFFF]'
                      : 'bg-[#FAFAFA] text-[#737373] hover:text-[#111111]'
                  }`}
                >
                  {ep.id}
                </button>
              ))}
            </div>

            {/* Filtro por Rol */}
            <div className="flex flex-wrap items-center gap-1.5 text-[12px]">
              <span className="mr-1 font-semibold text-[#737373]">Rol:</span>
              {(['all', 'propietario', 'inquilino', 'administrador', 'soporte'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onSelectRole(r)}
                  className={`rounded px-2.5 py-1 font-medium capitalize transition-colors ${
                    selectedRole === r
                      ? 'border border-[#111111] bg-[#111111] text-[#FFFFFF]'
                      : 'border border-[#E5E5E5] bg-[#FFFFFF] text-[#737373] hover:text-[#111111]'
                  }`}
                >
                  {r === 'all' ? 'Todos' : r}
                </button>
              ))}
            </div>
          </div>

          {/* Tabla de historias de usuario */}
          <div className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#FFFFFF] shadow-xs">
            <div className="w-full">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA] text-[11px] font-semibold uppercase tracking-wider text-[#737373]">
                    <th className="py-3.5 pl-4 pr-2 w-20">ID / Épica</th>
                    <th className="py-3.5 px-2 w-28">Rol</th>
                    <th className="py-3.5 px-3 w-[24%]">Título de la historia</th>
                    <th className="py-3.5 px-3 w-[26%]">Quiero… (Objetivo)</th>
                    <th className="py-3.5 px-3 w-[24%]">Para… (Beneficio)</th>
                    <th className="py-3.5 pl-2 pr-4 text-right w-36">Prioridad & Tareas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {filteredStories.map((hu) => {
                    const isExpanded = expandedStoryId === hu.id;

                    return (
                      <React.Fragment key={hu.id}>
                        <tr
                          id={`story-${hu.id.toLowerCase()}`}
                          onClick={() => setExpandedStoryId(isExpanded ? null : hu.id)}
                          className={`cursor-pointer transition-colors scroll-mt-32 ${
                            isExpanded ? 'bg-[#FAFAFA]' : 'hover:bg-[#FAFAFA]/70'
                          }`}
                        >
                          <td className="py-4 pl-4 pr-2 align-top">
                            <span className="font-mono font-bold text-[#111111]">{hu.id}</span>
                            <span className="block font-mono text-[11px] text-[#737373]">{hu.epicId}</span>
                          </td>
                          <td className="py-4 px-2 align-top">
                            <RoleBadge roleId={hu.roleId} size="sm" variant="solid" />
                          </td>
                          <td className="py-4 px-3 align-top font-semibold text-[#111111]">
                            {hu.title}
                          </td>
                          <td className="py-4 px-3 align-top leading-relaxed text-[#111111]">
                            {hu.iWant}
                          </td>
                          <td className="py-4 px-3 align-top leading-relaxed text-[#737373]">
                            {hu.soThat}
                          </td>
                          <td className="py-4 pl-2 pr-4 align-top text-right">
                            <div className="space-y-1.5 flex flex-col items-end">
                              <span className="inline-block rounded bg-[#FAFAFA] border border-[#E5E5E5] px-2 py-0.5 text-[10px] font-semibold text-[#111111]">
                                {hu.sprint}
                              </span>
                              {hu.moscowRef && (
                                <span className="block font-mono text-[10px] text-[#737373]">
                                  {hu.moscowRef}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#111111] underline decoration-[#E5E5E5] underline-offset-2 hover:decoration-[#111111]">
                                {isExpanded ? 'Ocultar ↑' : `Tareas (${hu.tasks.length}) ↓`}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {/* Fila expandible con criterios y tareas */}
                        {isExpanded && (
                          <tr className="bg-[#FBFBFA]">
                            <td colSpan={6} className="p-6 border-b border-[#E5E5E5]">
                              {/* Metadatos de la historia */}
                              <div className="mb-5 flex flex-wrap items-center gap-3 rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-3 text-[12px]">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-[#737373]">Origen Story Map:</span>
                                  <span className="font-mono font-medium text-[#111111]">{hu.originStepId}</span>
                                </div>
                                <span className="text-[#E5E5E5]">|</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-[#737373]">Prioridad MoSCoW:</span>
                                  <span className="font-medium text-[#111111]">{hu.moscowRef || 'En alcance'}</span>
                                </div>
                                <span className="text-[#E5E5E5]">|</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-[#737373]">Código en Faroo:</span>
                                  <span className="rounded border border-[#E5E5E5] bg-[#FAFAFA] px-2 py-0.5 font-mono text-[11px] font-bold text-[#111111]">
                                    {hu.backendRef || 'Servicio de Datos'}
                                  </span>
                                </div>
                                <span className="text-[#E5E5E5]">|</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-semibold text-[#737373]">Estimación:</span>
                                  <span className="font-mono text-[#111111]">{hu.storyPoints} Story Points</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Criterios BDD */}
                                <div className="space-y-3">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                                    <span>Criterios de Aceptación (Validación)</span>
                                  </span>
                                  <div className="space-y-2">
                                    {hu.validations.map((v) => (
                                      <div
                                        key={v.id}
                                        className="rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-3 text-[12px] leading-relaxed text-[#737373]"
                                      >
                                        <div className="font-semibold text-[#111111] mb-1">
                                          {v.id} · {v.title}
                                        </div>
                                        <div>
                                          <strong className="text-[#111111]">Dado</strong> {v.given},{' '}
                                          <strong className="text-[#111111]">cuando</strong> {v.when},{' '}
                                          <strong className="text-[#111111]">entonces</strong> {v.then}.
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Tareas Técnicas (Tasks) */}
                                <div className="space-y-3">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                                    <span>Tareas Técnicas de Desarrollo ({hu.tasks.length} tasks)</span>
                                  </span>
                                  <div className="space-y-2">
                                    {hu.tasks.map((t) => (
                                      <div
                                        key={t.taskId}
                                        className="rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] p-3 text-[12px] flex items-baseline justify-between gap-3"
                                      >
                                        <div className="flex items-baseline gap-2">
                                          <span className="font-mono text-[11px] font-bold text-[#111111]">
                                            {t.taskId}
                                          </span>
                                          <span className="text-[#111111]">{t.title}</span>
                                        </div>
                                        <span className="shrink-0 text-[10px] font-medium text-[#737373] bg-[#FAFAFA] border border-[#E5E5E5] px-2 py-0.5 rounded">
                                          {t.areaLabel}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Punto 2.3: Resumen de tareas técnicas */}
        <section id="resumen-tasks" className="scroll-mt-28 space-y-5">
          <div className="border-b border-neutral-200 pb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Punto 2.3
            </p>
            <h2 className="mt-0.5 text-2xl font-semibold tracking-tight text-neutral-900">
              Resumen de Tareas Técnicas (Tasks)
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Consolidado de las 37 tareas técnicas de desarrollo divididas entre reglas de datos y pantallas de usuario.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                Total de Tareas
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-semibold text-neutral-900">{totalTasks}</div>
              <p className="mt-1 text-xs text-neutral-500">
                Desglosadas desde las 16 historias de usuario.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-xs">
              <span className="text-[11px] font-semibold uppercase text-[#737373]">
                Sprint 1
              </span>
              <div className="mt-2 text-[28px] font-bold text-[#111111]">
                {USER_STORIES.filter((h) => h.sprint === 'Sprint 1').reduce((a, h) => a + h.tasks.length, 0)}
              </div>
              <p className="mt-1 text-[12px] text-[#737373]">
                Tareas indispensables para operar el arriendo.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] p-5 shadow-xs">
              <span className="text-[11px] font-semibold uppercase text-[#737373]">
                Sprint 2
              </span>
              <div className="mt-2 text-[28px] font-bold text-[#111111]">
                {USER_STORIES.filter((h) => h.sprint === 'Sprint 2').reduce((a, h) => a + h.tasks.length, 0)}
              </div>
              <p className="mt-1 text-[12px] text-[#737373]">
                Tareas de semáforo de pagos, abonos y recibos.
              </p>
            </div>
          </div>
        </section>

        {/* Siguiente entrega */}
        {onJumpToStage3 && (
          <div className="no-print border-t border-[#E5E5E5] pt-10">
            <button
              type="button"
              onClick={onJumpToStage3}
              className="inline-flex items-center gap-2 rounded-lg bg-[#111111] px-5 py-2.5 text-[13px] font-medium text-[#FFFFFF] transition-opacity hover:opacity-85 shadow-sm"
            >
              Ir a la Etapa 3 · Backlog Jira →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
