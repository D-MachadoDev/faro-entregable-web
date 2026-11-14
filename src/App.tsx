import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { useActiveDeliverable } from '@/hooks/useActiveDeliverable';
import { Entregable1Content } from '@/sections/Entregable1Content';
import { Entregable2Content } from '@/sections/Entregable2Content';
import { UmlDiagramsContent } from '@/sections/UmlDiagramsContent';
import { Entregable3Content } from '@/sections/Entregable3Content';
import { downloadEpicasXLSX } from '@/data/actions';
import type { RoleId } from '@/data/manualData';

export function App() {
  const { deliverable, section, switchTo } = useActiveDeliverable();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleId | 'all'>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(() => {
    if (section && section.startsWith('cu-')) return section;
    return 'cu-01';
  });

  useEffect(() => {
    if (section && section.startsWith('cu-')) {
      setSelectedCaseId(section);
    }
  }, [section]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileSidebarOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF] text-[#111111]">
      <ScrollProgress />

      {/* BARRA SUPERIOR EXCLUSIVA PARA MÓVIL (EN ESCRITORIO SE USA EL SIDEBAR) */}
      <div className="no-print flex h-14 items-center justify-between border-b border-[#E5E5E5] bg-[#FFFFFF] px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#111111] text-[11px] font-bold text-[#FFFFFF]">
            F
          </div>
          <span className="text-[13px] font-semibold text-[#111111]">Faroo</span>
          <span className="text-[11px] text-[#737373]">· Manual Técnico</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="flex items-center gap-1.5 rounded-md border border-[#E5E5E5] bg-[#FAFAFA] px-2.5 py-1 text-[12px] font-medium text-[#111111] hover:border-[#111111]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          Índice
        </button>
      </div>

      {/* DRAWER LATERAL PARA MÓVIL */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-[#111111]/30 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            id="mobile-sidebar"
            className="relative h-full w-[290px] max-w-[85vw] overflow-y-auto border-r border-[#E5E5E5] bg-[#FFFFFF] p-6 sidebar-scroll"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#111111]">
                Navegación del Manual
              </span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="Cerrar índice"
                className="flex h-8 w-8 items-center justify-center rounded border border-[#E5E5E5] text-[#737373] hover:text-[#111111]"
              >
                &times;
              </button>
            </div>
            <Sidebar
              active={deliverable}
              section={section}
              onSwitch={(d, sec) => switchTo(d, sec)}
              onNavigate={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* CONTENEDOR PRINCIPAL */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 gap-12 px-4 pb-24 pt-8 sm:px-6 lg:gap-16 lg:px-8 lg:pt-10">
        <aside className="no-print sticky top-8 hidden max-h-[calc(100vh-4rem)] w-[260px] shrink-0 self-start overflow-y-auto pr-2 sidebar-scroll lg:block">
          <Sidebar
            active={deliverable}
            section={section}
            onSwitch={(d, sec) => switchTo(d, sec)}
          />
        </aside>

        <main id="main-content" className="min-w-0 flex-1">
          <div id="entregable-1-container" className={deliverable === 'e1' ? '' : 'hidden'}>
            <Entregable1Content
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
              onJumpToStage2={() => switchTo('e2')}
            />
          </div>
          <div id="entregable-2-container" className={deliverable === 'e2' ? '' : 'hidden'}>
            <Entregable2Content
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
              onJumpToStage3={() => switchTo('e3')}
              onDownloadExcel={downloadEpicasXLSX}
            />
          </div>
          <div id="entregable-3-container" className={deliverable === 'e3' ? '' : 'hidden'}>
            <Entregable3Content
              selectedRole={selectedRole}
              onSelectRole={setSelectedRole}
              onDownloadExcel={downloadEpicasXLSX}
              onNavigateDeliverable={switchTo}
              activeSection={section}
            />
          </div>
          <div id="uml-diagrams-container" className={deliverable === 'uml' ? '' : 'hidden'}>
            <UmlDiagramsContent
              selectedCaseId={selectedCaseId}
              onSelectCaseId={setSelectedCaseId}
            />
          </div>
        </main>
      </div>

      {/* FOOTER CON IDENTIDAD Y MARCA PERSONAL */}
      <footer className="no-print border-t border-[#E5E5E5] bg-[#FAFAFA] py-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 px-4 text-[13px] sm:px-6 md:flex-row lg:px-8">
          <div className="flex flex-col items-center gap-1 sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#111111]">Faroo — Manual Técnico</span>
              <span className="rounded-full border border-[#E5E5E5] bg-[#FFFFFF] px-2 py-0.5 font-mono text-[10px] text-[#737373]">
                Ingeniería de Software I
              </span>
            </div>
            <p className="text-[12px] text-[#737373]">
              Construido con rigor técnico, código real y esmero para simplificar el cobro de arriendos.
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 sm:items-end text-center sm:text-right">
            <div className="flex items-center gap-1.5 font-medium text-[#111111]">
              <span>Desarrollado con</span>
              <span className="text-red-500" title="Hecho con dedicación">❤️</span>
              <span>por</span>
              <span className="font-semibold">Nikoll Sofia Isaza Rua</span>
              <span>&</span>
              <span className="font-semibold">David Machado</span>
            </div>
            <span className="text-[12px] text-[#737373]">
              Institución Universitaria Pascual Bravo · Medellín, 2026
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
