import { useState } from 'react';
import { MOSCOW_CATEGORIES, ROLES, type RoleId } from '@/data/manualData';

interface MoscowMatrixGraphicProps {
  selectedRole?: RoleId | 'all';
}

type MoscowTab = 'must' | 'should' | 'could' | 'wont';

export function MoscowMatrixGraphic({ selectedRole: _selectedRole }: MoscowMatrixGraphicProps = {}) {
  const [activeTab, setActiveTab] = useState<MoscowTab>('must');

  const currentCategory = MOSCOW_CATEGORIES.find((c) => c.key === activeTab) || MOSCOW_CATEGORIES[0];

  const CATEGORY_STYLES = {
    must: {
      tag: 'M',
      title: 'Must Have',
      translation: 'Obligatorio para arrancar',
      badgeClass: 'bg-[#111111] text-[#FFFFFF]',
      borderClass: 'border-[#111111]',
      cardBorder: 'border-l-4 border-l-[#111111]',
      status: 'Lo mínimo necesario para que el arriendo funcione y se pueda cobrar el primer mes.',
      accentLabel: 'Lo primero que sale',
      colorHint: 'bg-[#111111]',
    },
    should: {
      tag: 'S',
      title: 'Should Have',
      translation: 'Muy importante',
      badgeClass: 'border border-[#111111] bg-[#FAFAFA] text-[#111111]',
      borderClass: 'border-[#111111]',
      cardBorder: 'border-l-4 border-l-[#737373]',
      status: 'Muy necesario para el día a día, pero la aplicación puede arrancar sin esto mientras se prueba.',
      accentLabel: 'Para la segunda entrega',
      colorHint: 'bg-[#737373]',
    },
    could: {
      tag: 'C',
      title: 'Could Have',
      translation: 'Deseable si da tiempo',
      badgeClass: 'border border-[#E5E5E5] bg-[#FFFFFF] text-[#737373]',
      borderClass: 'border-[#111111]',
      cardBorder: 'border-l-4 border-l-[#A3A3A3]',
      status: 'Comodidades y detalles chéveres que sumamos si nos sobra tiempo.',
      accentLabel: 'Si alcanza el tiempo',
      colorHint: 'bg-[#A3A3A3]',
    },
    wont: {
      tag: 'W',
      title: "Won't Have",
      translation: 'Queda para más adelante',
      badgeClass: 'border border-dashed border-[#737373] bg-[#FAFAFA] text-[#737373]',
      borderClass: 'border-dashed border-[#737373]',
      cardBorder: 'border-l-4 border-l-dashed border-l-[#A3A3A3]',
      status: 'Cosas complejas que dejamos por fuera a propósito para no enredarnos en esta primera versión.',
      accentLabel: 'Por fuera por ahora',
      colorHint: 'bg-[#D4D4D4]',
    },
  };

  const style = CATEGORY_STYLES[activeTab];

  return (
    <div className="w-full space-y-6">
      {/* 4 TARJETAS SELECTORAS CON INDICADOR ANIMADO DE CLIC */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(
          [
            { id: 'must', key: 'must' as const, count: 6 },
            { id: 'should', key: 'should' as const, count: 4 },
            { id: 'could', key: 'could' as const, count: 4 },
            { id: 'wont', key: 'wont' as const, count: 4 },
          ] as const
        ).map((card) => {
          const cardStyle = CATEGORY_STYLES[card.key];
          const isSelected = activeTab === card.key;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => setActiveTab(card.key)}
              className={`group relative text-left rounded-xl p-5 transition-all duration-200 ${
                isSelected
                  ? 'border-2 border-[#111111] bg-[#FFFFFF] shadow-md ring-2 ring-[#111111]/5'
                  : 'border border-[#E5E5E5] bg-[#FFFFFF] hover:border-[#111111] hover:bg-[#FAFAFA]/70 hover:shadow-sm'
              }`}
            >
              {/* FLECHA O INDICADOR INFERIOR CUANDO ESTÁ ACTIVO */}
              {isSelected && (
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
                  <svg width="16" height="9" viewBox="0 0 16 9" fill="none">
                    <path d="M0 0L8 9L16 0H0Z" fill="#111111" />
                  </svg>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-mono text-[12px] font-bold ${cardStyle.badgeClass}`}
                >
                  {cardStyle.tag}
                </span>

                <span className="rounded-full bg-[#FAFAFA] border border-[#E5E5E5] px-2 py-0.5 text-[11px] font-semibold text-[#111111]">
                  {card.count} ítems
                </span>
              </div>

              <div className="mt-3">
                <h4 className="text-[15px] font-semibold text-[#111111]">
                  {cardStyle.title}
                </h4>
                <p className="mt-0.5 text-[12px] text-[#737373]">{cardStyle.translation}</p>
              </div>

              {/* INDICADOR CLICLEABLE ANIMADO O ESTADO ACTIVO */}
              <div className="mt-4 border-t border-[#E5E5E5] pt-3 flex items-center justify-between">
                {isSelected ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#111111]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
                    Viendo ahora
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#737373] group-hover:text-[#111111] transition-colors">
                    {/* PULSO ANIMADO QUE INVITA A PRESIONAR */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#111111] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#111111]" />
                    </span>
                    Toca para ver
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                )}

                <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3]">
                  {cardStyle.accentLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* DETALLE EXCLUSIVO DE LA CATEGORÍA ACTIVA (SIN SATURACIÓN) */}
      <div
        className={`rounded-2xl border bg-[#FFFFFF] p-6 sm:p-8 transition-all duration-300 ${style.borderClass} shadow-sm`}
      >
        {/* CABECERA DE LA CATEGORÍA SELECCIONADA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E5E5] pb-5">
          <div className="flex items-center gap-3.5">
            <span
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-[16px] font-bold ${style.badgeClass}`}
            >
              {style.tag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[20px] font-semibold text-[#111111]">
                  {currentCategory.name}
                </h3>
                <span className="text-[14px] font-normal text-[#737373]">
                  — {style.translation}
                </span>
              </div>
              <p className="mt-0.5 text-[13px] text-[#737373]">{style.status}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-1 text-[12px] font-medium text-[#111111]">
              Mostrando {currentCategory.items.length} requerimientos
            </span>
          </div>
        </div>

        {/* LISTA DE TARJETAS DE REQUERIMIENTOS DE LA CATEGORÍA */}
        <div className="mt-6 space-y-3.5">
          {currentCategory.items.map((item) => (
            <div
              key={item.code}
              className={`rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] p-5 transition-all hover:border-[#111111] hover:bg-[#FAFAFA]/50 ${style.cardBorder}`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[12px] font-bold text-[#111111]">
                    {item.code}
                  </span>
                  <span className="text-[#D4D4D4]">·</span>
                  <h4 className="text-[15px] font-semibold text-[#111111]">
                    {item.title}
                  </h4>
                </div>

                <span className="self-start rounded border border-[#E5E5E5] bg-[#FAFAFA] px-2.5 py-0.5 text-[11px] font-medium text-[#737373] sm:self-center">
                  {ROLES[item.actor]?.name || item.actor}
                </span>
              </div>

              <p className="mt-2 text-[14px] leading-relaxed text-[#737373]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
