import { useState, useEffect } from 'react';
import {
  STORY_MAP_ACTIVITIES,
  type RoleId,
} from '@/data/manualData';

interface StoryMapBoardProps {
  selectedRole?: RoleId | 'all';
}

export function StoryMapBoard({ selectedRole: _selectedRole }: StoryMapBoardProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cerrar modal con tecla Escape y bloquear scroll del body
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // Inclinaciones orgánicas para simular notas pegadas a mano en una pared de taller
  const ROTATIONS = [
    '-rotate-[0.8deg]',
    'rotate-[0.6deg]',
    '-rotate-[0.5deg]',
    'rotate-[0.8deg]',
    '-rotate-[0.7deg]',
    'rotate-[0.5deg]',
  ];

  const STORY_ROTATIONS = [
    'rotate-[0.5deg]',
    '-rotate-[0.7deg]',
    'rotate-[0.6deg]',
    '-rotate-[0.4deg]',
    'rotate-[0.7deg]',
    '-rotate-[0.6deg]',
  ];

  // Datos alineados 1:1 con el backend de Faroo (Inquilino y Propietario)
  const BOARD_COLUMNS = [
    {
      index: 1,
      activity: '1. Inmuebles',
      step: 'Registrar propiedades y disponibilidad',
      release1Stories: [
        { text: 'Anotar dirección, tipo y canon mensual', role: 'Administrador' },
        { text: 'Ver cuáles están libres y ocupadas', role: 'Propietario' },
      ],
      release2Stories: [
        { text: 'Historial de incrementos anuales del canon', role: 'Propietario' },
      ],
    },
    {
      index: 2,
      activity: '2. Personas',
      step: 'Guardar datos de contacto y accesos',
      release1Stories: [
        { text: 'Cédula y teléfono de inquilinos', role: 'Administrador' },
        { text: 'Acceso seguro al portal con su documento', role: 'Inquilino' },
      ],
      release2Stories: [
        { text: 'Registro de fiadores o codeudores', role: 'Administrador' },
      ],
    },
    {
      index: 3,
      activity: '3. Contratos',
      step: 'Fijar arriendo y fecha fija de corte',
      release1Stories: [
        { text: 'Día fijo de corte mensual (del 1 al 28)', role: 'Administrador' },
        { text: 'Definir canon exacto pactado en contrato', role: 'Propietario' },
      ],
      release2Stories: [
        { text: 'Alertas de vencimiento del contrato', role: 'Administrador' },
      ],
    },
    {
      index: 4,
      activity: '4. Cobros',
      step: 'Sacar el cobro automático puntual',
      release1Stories: [
        { text: 'Emisión automática al llegar la fecha de corte', role: 'Administrador' },
        { text: 'Ver cargos y valor pendiente del mes', role: 'Inquilino' },
      ],
      release2Stories: [
        { text: 'Armar mensaje de cobro para WhatsApp', role: 'Administrador' },
      ],
    },
    {
      index: 5,
      activity: '5. Pagos',
      step: 'Subir comprobante y validar recibo',
      release1Stories: [
        { text: 'Subir foto de transferencia (Nequi o banco)', role: 'Inquilino' },
        { text: 'Revisar captura en visor y confirmar el pago', role: 'Propietario' },
      ],
      release2Stories: [
        { text: 'Descontar abonos parciales del saldo', role: 'Administrador' },
        { text: 'Descargar paz y salvo digital con código', role: 'Inquilino' },
      ],
    },
    {
      index: 6,
      activity: '6. Cartera',
      step: 'Monitorear cobros y resolver dudas',
      release1Stories: [
        { text: 'Historial de pagos recibidos por contrato', role: 'Propietario' },
        { text: 'Soporte y recuperación de accesos', role: 'Soporte' },
      ],
      release2Stories: [
        { text: 'Semáforo de pagos (verde, amarillo y rojo)', role: 'Propietario' },
        { text: 'Bitácora de dudas y soporte técnico', role: 'Soporte' },
      ],
    },
  ];

  // Componente del lienzo del tablero en Miro con auténticas notas adhesivas de pared
  const MiroBoardCanvas = () => (
    <div className="min-w-[1150px] space-y-8">
      
      {/* SECCIÓN 1: ACTIVIDADES Y PASOS DE USUARIO (NOTAS DE PARED) */}
      <div className="relative">
        <div className="flex items-center justify-between border-b border-[#CBD5E1] pb-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#0284C7]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F172A]">
              Paso a paso cronológico del arriendo (6 Momentos)
            </span>
          </div>
          <span className="font-mono text-[11px] font-semibold text-[#64748B]">
            6 Actividades · 6 Pasos Iniciales
          </span>
        </div>

        {/* FILA 1: ACTIVIDADES (NOTAS AZULES CON BANDA DE PEGAMENTO SUPERIOR Y RELIEVE) */}
        <div className="grid grid-cols-6 gap-4">
          {BOARD_COLUMNS.map((col, idx) => {
            const rot = ROTATIONS[idx % ROTATIONS.length];
            return (
              <div
                key={'act-' + col.index}
                className={`relative flex min-h-[108px] flex-col justify-between rounded-sm bg-[#E0F2FE] border border-[#BAE6FD] p-3.5 shadow-[2px_6px_14px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:rotate-0 hover:scale-[1.03] hover:z-20 hover:shadow-xl ${rot}`}
              >
                {/* BANDA DE PEGAMENTO SUPERIOR TIPO POST-IT */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#7DD3FC]/80 rounded-t-sm" />

                <div className="pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                      0{col.index}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[#0369A1] bg-[#BAE6FD]/60 px-1 rounded">
                      {STORY_MAP_ACTIVITIES[col.index - 1]?.evolvesToEpicId || `EP-0${col.index}`}
                    </span>
                  </div>
                  <h4 className="mt-1 text-[13px] font-bold leading-snug text-[#0C4A6E]">
                    {col.activity.replace(/^\d+\.\s*/, '')}
                  </h4>
                </div>

                {/* ESQUINA INFERIOR CON SOMBRA DE PAPEL LEVANTADO */}
                <div className="mt-2 text-right">
                  <span className="text-[9px] font-mono text-[#0284C7]/80">Actividad</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FILA 2: PASOS DEL USUARIO (NOTAS VERDES CON BANDA SUPERIOR) */}
        <div className="mt-4 grid grid-cols-6 gap-4">
          {BOARD_COLUMNS.map((col, idx) => {
            const rot = STORY_ROTATIONS[(idx + 1) % STORY_ROTATIONS.length];
            return (
              <div
                key={'step-' + col.index}
                className={`relative flex min-h-[92px] flex-col justify-between rounded-sm bg-[#DCFCE7] border border-[#BBF7D0] p-3 shadow-[2px_6px_12px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:rotate-0 hover:scale-[1.03] hover:z-20 hover:shadow-xl ${rot}`}
              >
                {/* BANDA DE PEGAMENTO SUPERIOR */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-[#86EFAC]/80 rounded-t-sm" />

                <div className="pt-1">
                  <span className="font-mono text-[9px] font-semibold uppercase text-[#16A34A]">
                    Paso inicial
                  </span>
                  <p className="mt-1 text-[12px] font-medium leading-snug text-[#14532D]">
                    {col.step}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SEPARADOR DE CORTE: RELEASE 1 (SPRINT 1 · MVP) */}
      <div className="relative pt-6">
        <div className="flex items-center gap-3">
          {/* NOTA NARANJA DE CORTE CON CINTA ADHESIVA VIRTUAL */}
          <div className="relative shrink-0 rounded-sm bg-[#FFEDD5] border border-[#FED7AA] px-4 py-2.5 shadow-[2px_6px_14px_rgba(0,0,0,0.08)] -rotate-[1deg]">
            {/* CINTA ADHESIVA WASHI TAPE */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3 w-12 rounded-xs bg-[#111111]/15 backdrop-blur-xs" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">
              Release 1 · Sprint 1 (MVP)
            </div>
            <div className="text-[12px] font-bold text-[#7C2D12]">
              Lo mínimo para operar cobros y pagos
            </div>
          </div>

          <div className="h-[3px] flex-1 bg-[#111111]" />

          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111]">
            Línea de corte MVP
          </span>
        </div>

        {/* FILA DE HISTORIAS DE RELEASE 1 (NOTAS AMARILLAS VIRTUALES TIPO POST-IT) */}
        <div className="mt-4 grid grid-cols-6 gap-4">
          {BOARD_COLUMNS.map((col, cIdx) => (
            <div key={'rel1-' + col.index} className="space-y-3.5">
              {col.release1Stories.map((story, sIdx) => {
                const rot = STORY_ROTATIONS[(cIdx + sIdx) % STORY_ROTATIONS.length];
                return (
                  <div
                    key={'story-r1-' + col.index + '-' + sIdx}
                    className={`relative flex min-h-[105px] flex-col justify-between rounded-sm bg-[#FEF08A] border border-[#FDE047] p-3.5 shadow-[2px_6px_14px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:rotate-0 hover:scale-[1.03] hover:z-20 hover:shadow-xl ${rot}`}
                  >
                    {/* BANDA DE PEGAMENTO SUPERIOR */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-[#FACC15]/80 rounded-t-sm" />

                    <div className="pt-1">
                      <p className="text-[12px] font-medium leading-snug text-[#713F12]">
                        {story.text}
                      </p>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-[#FACC15]/60 pt-1.5">
                      <span className="text-[10px] font-bold text-[#854D0E]">
                        {story.role}
                      </span>
                      <span className="font-mono text-[9px] font-semibold text-[#A16207]">MVP</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* SEPARADOR DE CORTE: RELEASE 2 (SPRINT 2 · OPERACIÓN Y CONTROL) */}
      <div className="relative pt-6">
        <div className="flex items-center gap-3">
          {/* NOTA NARANJA DE CORTE CON CINTA ADHESIVA */}
          <div className="relative shrink-0 rounded-sm bg-[#FFEDD5] border border-[#FED7AA] px-4 py-2.5 shadow-[2px_6px_14px_rgba(0,0,0,0.08)] rotate-[0.8deg]">
            {/* CINTA ADHESIVA WASHI TAPE */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3 w-12 rounded-xs bg-[#111111]/15 backdrop-blur-xs" />
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C]">
              Release 2 · Sprint 2
            </div>
            <div className="text-[12px] font-bold text-[#7C2D12]">
              Control Avanzado (Semáforo, Abonos, Recibos)
            </div>
          </div>

          <div className="h-[3px] flex-1 bg-[#111111]" />

          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111]">
            Línea de corte Sprint 2
          </span>
        </div>

        {/* FILA DE HISTORIAS DE RELEASE 2 (NOTAS AMARILLAS VIRTUALES) */}
        <div className="mt-4 grid grid-cols-6 gap-4">
          {BOARD_COLUMNS.map((col, cIdx) => (
            <div key={'rel2-' + col.index} className="space-y-3.5">
              {col.release2Stories.map((story, sIdx) => {
                const rot = ROTATIONS[(cIdx + sIdx + 1) % ROTATIONS.length];
                return (
                  <div
                    key={'story-r2-' + col.index + '-' + sIdx}
                    className={`relative flex min-h-[105px] flex-col justify-between rounded-sm bg-[#FEF08A] border border-[#FDE047] p-3.5 shadow-[2px_6px_14px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] transition-all duration-200 hover:rotate-0 hover:scale-[1.03] hover:z-20 hover:shadow-xl ${rot}`}
                  >
                    {/* BANDA DE PEGAMENTO SUPERIOR */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-[#FACC15]/80 rounded-t-sm" />

                    <div className="pt-1">
                      <p className="text-[12px] font-medium leading-snug text-[#713F12]">
                        {story.text}
                      </p>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between border-t border-[#FACC15]/60 pt-1.5">
                      <span className="text-[10px] font-bold text-[#854D0E]">
                        {story.role}
                      </span>
                      <span className="font-mono text-[9px] font-semibold text-[#A16207]">Sprint 2</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* PIE DEL TABLERO */}
      <div className="border-t border-[#CBD5E1] pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px] text-[#64748B]">
        <span>
          Prioridad vertical: lo urgente arriba en el MVP; mejoras de control abajo en Sprint 2.
        </span>
        <span className="font-semibold text-[#0F172A]">
          Total: 6 Actividades · 6 Pasos · 16 Historias de Arriendo
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-5">
      {/* TARJETA DE VISTA PREVIA LIMPIA CON FONDO CUADRICULADO DE PUNTOS */}
      <div
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#E5E5E5] bg-[#FBFBFA] p-6 sm:p-8 transition-all hover:border-[#111111] hover:shadow-lg"
      >
        {/* CABECERA DE LA TARJETA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E5E5] bg-[#FFFFFF]/90 backdrop-blur-xs -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111111] text-[#FFFFFF] shadow-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </span>
            <div>
              <h3 className="text-[17px] font-semibold text-[#111111] group-hover:text-black transition-colors">
                Tablero de Notas en Miro
              </h3>
              <p className="text-[13px] text-[#737373]">
                6 momentos del arriendo con notas adhesivas organizadas por release.
              </p>
            </div>
          </div>

          {/* BOTÓN INVITACIÓN A ABRIR */}
          <div className="flex items-center gap-2 self-start rounded-full bg-[#111111] px-4 py-2 text-[12px] font-semibold text-[#FFFFFF] shadow transition-transform group-hover:scale-105 sm:self-center">
            <span>Abrir tablero completo</span>
            <span className="font-mono text-[14px]">⤢</span>
          </div>
        </div>

        {/* VISTA PREVIA MINIMALISTA DE LAS 6 ACTIVIDADES EN GRID RESPONSIVO (SIN SCROLL HORIZONTAL) */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {BOARD_COLUMNS.map((col, idx) => {
            const rot = ROTATIONS[idx % ROTATIONS.length];
            return (
              <div
                key={'preview-' + col.index}
                className={`flex flex-col justify-between rounded-sm bg-[#FFFFFF] border border-[#E5E5E5] p-3.5 shadow-sm transition-all group-hover:border-[#111111] group-hover:shadow-md ${rot}`}
              >
                {/* BANDA SUPERIOR TIPO POST-IT */}
                <div className="h-1.5 w-full bg-[#CBD5E1] rounded-t-sm -mt-1 mb-2" />

                <div>
                  <span className="font-mono text-[10px] font-bold text-[#737373]">
                    0{col.index}
                  </span>
                  <h4 className="mt-1 text-[13px] font-bold text-[#111111]">
                    {col.activity.replace(/^\d+\.\s*/, '')}
                  </h4>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-[#E5E5E5] pt-2 text-[10px] text-[#737373]">
                  <span className="text-[#0284C7] font-semibold">
                    {col.release1Stories.length + col.release2Stories.length} notas
                  </span>
                  <span className="font-mono font-medium text-[#111111]">
                    {STORY_MAP_ACTIVITIES[col.index - 1]?.evolvesToEpicId}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MODAL A PANTALLA COMPLETA CON BLUR EN EL FONDO (HIGH DESIGN)
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          {/* FONDO OSCURO CON DESENFOQUE (BLUR) */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-[#111111]/75 backdrop-blur-md transition-opacity"
          />

          {/* CONTENEDOR FLOTANTE DEL TABLERO EN PANTALLA COMPLETA */}
          <div className="relative z-10 flex max-h-[92vh] w-full max-w-[1400px] flex-col rounded-3xl border border-[#FFFFFF]/20 bg-[#FFFFFF] shadow-2xl overflow-hidden">
            
            {/* CABECERA FLOTANTE DEL MODAL ESTILO MIRO */}
            <div className="flex items-center justify-between border-b border-[#E5E5E5] bg-[#FFFFFF] px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#111111]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFFFFF]" />
                </span>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111111]">
                    Tablero Completo en Miro · User Story Mapping
                  </h3>
                </div>
              </div>

              {/* AVATARES DE COLABORADORES ACTIVOS (NIKOLL & DAVID) + LEYENDA + BOTÓN */}
              <div className="flex items-center gap-4">
                {/* AVATARES COLABORADORES EN VIVO */}
                <div className="hidden md:flex items-center gap-2 border-r border-[#E5E5E5] pr-4">
                  <div className="flex -space-x-1.5 items-center">
                    <div
                      className="h-6 w-6 rounded-full bg-[#111111] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center border-2 border-[#FFFFFF] shadow-xs"
                      title="David Machado (Editor)"
                    >
                      DM
                    </div>
                    <div
                      className="h-6 w-6 rounded-full bg-[#CA8A04] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center border-2 border-[#FFFFFF] shadow-xs"
                      title="Nikoll Sofia Isaza Rua (Editora)"
                    >
                      NS
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#737373] flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                    2 editores
                  </span>
                </div>

                {/* LEYENDA COMPACTA DE NOTAS */}
                <div className="hidden lg:flex items-center gap-3 text-[11px] text-[#737373]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-xs bg-[#BAE6FD] border border-[#7DD3FC]" />
                    Actividad
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-xs bg-[#BBF7D0] border border-[#86EFAC]" />
                    Paso Inicial
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-xs bg-[#FED7AA] border border-[#FDBA74]" />
                    Release
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-xs bg-[#FEF08A] border border-[#FDE047]" />
                    Historias
                  </span>
                </div>

                {/* BOTÓN CERRAR */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-3.5 py-1.5 text-[12px] font-semibold text-[#111111] transition-all hover:bg-[#111111] hover:text-[#FFFFFF]"
                >
                  <span>Cerrar</span>
                  <span className="font-mono text-[11px] text-[#737373] group-hover:text-[#FFFFFF]">
                    (Esc)
                  </span>
                  <span>✕</span>
                </button>
              </div>
            </div>

            {/* CUERPO DEL TABLERO CON FONDO AUTÉNTICO DE PUNTOS DE MIRO */}
            <div
              style={{
                backgroundImage: 'radial-gradient(circle, #CBD5E1 1.2px, transparent 1.2px)',
                backgroundSize: '24px 24px',
              }}
              className="flex-1 overflow-auto bg-[#F8FAFC] p-6 sm:p-10 shadow-inner"
            >
              <MiroBoardCanvas />
            </div>

            {/* PIE DEL MODAL CON INSTRUCCIÓN */}
            <div className="border-t border-[#E5E5E5] bg-[#FFFFFF] px-6 py-3 flex items-center justify-between text-[12px] text-[#737373]">
              <span>Presiona <kbd className="rounded border border-[#E5E5E5] bg-[#FAFAFA] px-1.5 py-0.5 font-mono text-[11px] text-[#111111]">Esc</kbd> o haz clic afuera para volver al documento.</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="font-medium text-[#111111] hover:underline"
              >
                Volver a la entrega
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
