import type { Deliverable } from '@/hooks/useActiveDeliverable';
import { scrollToSection } from '@/hooks/useActiveDeliverable';
import { downloadEpicasXLSX } from '@/data/actions';

type Props = {
  active: Deliverable;
  section?: string | null;
  onSwitch: (d: Deliverable, section?: string | null) => void;
  onNavigate?: () => void;
};

const nav =
  (d: Deliverable, id: string, onSwitch: Props['onSwitch'], onNavigate?: () => void) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    onSwitch(d, id);
    onNavigate?.();
    window.setTimeout(() => scrollToSection(id), 40);
  };

export function Sidebar({
  active,
  section,
  onSwitch,
  onNavigate,
}: Props) {
  const item = (label: string, d: Deliverable, id: string) => {
    const isCurrent = section === id;
    const inStage = active === d;
    return (
      <a
        key={id}
        href={`#${id}`}
        onClick={nav(d, id, onSwitch, onNavigate)}
        aria-current={isCurrent ? 'location' : undefined}
        className={`relative -ml-px block border-l-2 py-1.5 pl-4 text-[13px] transition-colors ${
          isCurrent
            ? 'border-[#111111] font-medium text-[#111111]'
            : inStage
            ? 'border-transparent text-[#737373] hover:border-[#E5E5E5] hover:text-[#111111]'
            : 'border-transparent text-[#737373]/80 hover:text-[#111111]'
        }`}
      >
        {label}
      </a>
    );
  };

  const stage = (d: Deliverable, title: string, children: React.ReactNode) => {
    const isActive = active === d;
    return (
      <div className="border-t border-[#E5E5E5] pt-4 first:border-t-0 first:pt-0">
        <button
          type="button"
          onClick={() => {
            onSwitch(d);
            onNavigate?.();
          }}
          className={`block w-full py-1 text-left text-[14px] transition-colors ${
            isActive ? 'font-semibold text-[#111111]' : 'font-medium text-[#737373] hover:text-[#111111]'
          }`}
          aria-current={isActive ? 'true' : undefined}
        >
          {title}
        </button>
        <div className="mt-1 space-y-0.5 pl-1">{children}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col text-[14px]">
      {/* Identidad del proyecto */}
      <div className="mb-5 flex flex-col gap-1 border-b border-[#E5E5E5] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#111111] text-[12px] font-bold text-[#FFFFFF]">
            F
          </div>
          <div className="leading-tight">
            <span className="block text-[14px] font-semibold tracking-tight text-[#111111]">
              Manual Técnico
            </span>
            <span className="block text-[11px] text-[#737373]">Faroo · Arriendos y Cobros</span>
          </div>
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={downloadEpicasXLSX}
            className="w-full rounded border border-[#E5E5E5] bg-[#FFFFFF] py-1 text-center text-[12px] font-medium text-[#111111] transition-colors hover:border-[#111111] hover:bg-[#FAFAFA]"
          >
            Descargar Matriz Excel (XLSX)
          </button>
        </div>
      </div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#737373]">
        Índice de Navegación
      </p>

      <nav aria-label="Contenido del manual" className="mt-3 space-y-4">
        {stage(
          'e1',
          '1. Ideación y planificación',
          <>
            {item('Lluvia de ideas', 'e1', 'seccion-1')}
            {item('Selección y roles', 'e1', 'seccion-2')}
            {item('Mapa de impacto', 'e1', 'seccion-3')}
            {item('Priorización MoSCoW', 'e1', 'seccion-moscow')}
            {item('User story map', 'e1', 'seccion-4')}
          </>,
        )}

        {stage(
          'e2',
          '2. Épicas e historias',
          <>
            {item('Tabla de épicas', 'e2', 'catalogo-epicas')}
            {item('Historias de usuario', 'e2', 'desglose-historias')}
          </>,
        )}

        {stage(
          'e3',
          '3. Backlog y Sprints Jira',
          <>
            {item('Sprint 1', 'e3', 'sprint-1-section')}
            {item('Sprint 2', 'e3', 'sprint-2-section')}
            {item('Matriz Jira', 'e3', 'jira-matrix-section')}
          </>,
        )}

        {stage(
          'uml',
          '4. Casos de Uso',
          <>
            {item('Diagrama General', 'uml', 'diagrama-general-cu')}
            <div className="pt-1.5 pb-0.5">
              <span className="block px-4 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Fichas Técnicas (6.3)
              </span>
            </div>
            {item('CU-01: Registrar Inmueble', 'uml', 'cu-01')}
            {item('CU-02: Consultar Ocupación', 'uml', 'cu-02')}
            {item('CU-03: Ficha Detallada', 'uml', 'cu-03')}
            {item('CU-04: Registrar Inquilino', 'uml', 'cu-04')}
            {item('CU-05: Asignar Fiador', 'uml', 'cu-05')}
            {item('CU-06: Radicar Contrato', 'uml', 'cu-06')}
            {item('CU-07: Evaluar Riesgo', 'uml', 'cu-07')}
            {item('CU-08: Generar Cobro', 'uml', 'cu-08')}
            {item('CU-09: Resumen Financiero', 'uml', 'cu-09')}
            {item('CU-10: Cargar Comprobante', 'uml', 'cu-10')}
            {item('CU-11: Conciliar Pagos', 'uml', 'cu-11')}
            {item('CU-12: Recibo en PDF', 'uml', 'cu-12')}
            {item('CU-13: Semáforo Morosidad', 'uml', 'cu-13')}
            {item('CU-14: Alerta WhatsApp', 'uml', 'cu-14')}
            {item('CU-15: Actualizar Contacto', 'uml', 'cu-15')}
            {item('CU-16: Devolver Ilegible', 'uml', 'cu-16')}
          </>,
        )}
      </nav>
    </div>
  );
}
