import type { Deliverable } from '@/hooks/useActiveDeliverable';
import { downloadEpicasXLSX, exportCurrentDeliverablePDF } from '@/data/actions';

interface HeaderProps {
  active: Deliverable;
  onSwitch: (d: Deliverable) => void;
  onOpenMobileSidebar: () => void;
}

const TABS: { id: Deliverable; label: string }[] = [
  { id: 'e1', label: '1. Ideación' },
  { id: 'e2', label: '2. Épicas e HUs' },
  { id: 'e3', label: '3. Backlog Jira' },
  { id: 'uml', label: '4. Casos de Uso' },
];

export function Header({ active, onSwitch, onOpenMobileSidebar }: HeaderProps) {
  return (
    <header className="no-print sticky top-0 z-40 h-16 w-full border-b border-[#E5E5E5] bg-[#FFFFFF] sm:h-[72px]">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo e inicio */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onSwitch('e1')}
            aria-label="Ir al inicio"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#E5E5E5] text-[#111111] transition-colors hover:border-[#111111]"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V20h14V9.5" />
            </svg>
          </button>
          <div className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight text-[#111111]">
              Manual Técnico
            </span>
            <span className="block text-[12px] font-normal text-[#737373]">Faroo</span>
          </div>
        </div>

        {/* CENTRO: Navegación de las 3 etapas */}
        <nav
          aria-label="Etapas del manual"
          className="hidden items-center gap-1 rounded-md border border-[#E5E5E5] p-1 md:flex"
        >
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSwitch(tab.id)}
                className={`h-8 rounded px-3.5 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'bg-transparent text-[#737373] hover:text-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* DERECHA: Botones de exportación + botón móvil */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadEpicasXLSX}
            className="hidden h-9 items-center rounded-md border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 text-[13px] font-medium text-[#111111] transition-colors hover:border-[#111111] sm:inline-flex"
          >
            Excel
          </button>
          <button
            type="button"
            onClick={exportCurrentDeliverablePDF}
            className="inline-flex h-9 items-center rounded-md bg-[#111111] px-3.5 text-[13px] font-medium text-[#FFFFFF] transition-opacity hover:opacity-85"
          >
            PDF
          </button>

          {/* Menú para móviles */}
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            aria-label="Abrir índice"
            className="inline-flex h-9 items-center rounded-md border border-[#E5E5E5] px-3 text-[13px] font-medium text-[#111111] lg:hidden"
          >
            Índice
          </button>
        </div>
      </div>

      {/* Selector móvil de etapas */}
      <div className="border-t border-[#E5E5E5] bg-[#FFFFFF] px-3 py-1.5 md:hidden">
        <nav className="grid grid-cols-3 gap-1">
          {TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSwitch(tab.id)}
                className={`truncate rounded py-1 text-center text-[12px] font-medium ${
                  isActive
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'text-[#737373] hover:text-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
