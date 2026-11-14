import type { ReactNode } from 'react';

interface SectionIntroProps {
  step: string;
  kicker?: string;
  title: string;
  lede?: string;
  aside?: ReactNode;
}

/**
 * Identificación contextual + titular + bajada breve.
 * El filete superior es solo un separador de ritmo, no decoración.
 */
export function SectionIntro({ step, kicker, title, lede, aside }: SectionIntroProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-reading">
        <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">
          {step}
          {kicker ? ` · ${kicker}` : ''}
        </p>
        <h2 className="mt-2 text-[28px] font-semibold leading-[1.15] tracking-[-0.024em] text-ink sm:text-[32px]">
          {title}
        </h2>
        {lede ? (
          <p className="mt-3 max-w-[65ch] text-[16px] leading-[1.65] text-muted">{lede}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0 sm:pt-1">{aside}</div> : null}
    </header>
  );
}
