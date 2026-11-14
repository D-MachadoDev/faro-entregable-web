import { useCallback, useEffect, useState } from 'react';

export type Deliverable = 'e1' | 'e2' | 'uml' | 'e3';

const E2_SECTIONS = [
  'e2-hero',
  'catalogo-epicas',
  'desglose-historias',
  'criterios-bdd',
  'epic-ep01',
  'epic-ep02',
  'epic-ep03',
  'epic-ep04',
  'epic-ep05',
  'epic-ep06',
];
const UML_SECTIONS = [
  'uml-hero',
  'diagrama-general-cu',
  'doc-casos-uso',
];
const E3_SECTIONS = [
  'resumen-kpis',
  'sprint-1-section',
  'sprint-2-section',
  'product-backlog-section',
  'jira-matrix-section',
];

function resolveFromHash(): { deliverable: Deliverable; section: string | null } {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return { deliverable: 'e1', section: null };
  if (hash === 'e3' || E3_SECTIONS.includes(hash)) {
    return { deliverable: 'e3', section: hash === 'e3' ? null : hash };
  }
  if (hash === 'uml' || UML_SECTIONS.includes(hash) || hash.startsWith('cu-')) {
    return { deliverable: 'uml', section: hash === 'uml' ? null : hash };
  }
  if (hash === 'e2' || E2_SECTIONS.includes(hash) || hash.startsWith('story-') || hash.startsWith('epic-')) {
    return { deliverable: 'e2', section: hash === 'e2' ? null : hash };
  }
  if (hash.startsWith('seccion-')) {
    return { deliverable: 'e1', section: hash };
  }
  return { deliverable: 'e1', section: null };
}

export function useActiveDeliverable() {
  const [{ deliverable, section }, setState] = useState(resolveFromHash);

  const switchTo = useCallback((next: Deliverable, targetSection: string | null = null) => {
    setState({ deliverable: next, section: targetSection });
    if (targetSection) {
      window.history.replaceState(null, '', `#${targetSection}`);
    }
    if (targetSection) {
      window.setTimeout(() => scrollToSection(targetSection), 60);
    } else {
      window.history.replaceState(null, '', `#${next}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = resolveFromHash();
      setState(next);
      if (next.section) {
        window.setTimeout(() => scrollToSection(next.section!), 60);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return { deliverable, section, switchTo };
}

export function scrollToSection(sectionId: string) {
  const targetId = sectionId.startsWith('cu-') ? 'doc-casos-uso' : sectionId;
  const el = document.getElementById(targetId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
