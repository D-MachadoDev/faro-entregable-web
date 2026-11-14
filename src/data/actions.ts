import { EPICS, USER_STORIES } from '@/data/manualData';

export async function downloadEpicasXLSX(): Promise<void> {
  // Se carga solo al pulsar "Excel": mantiene el bundle inicial liviano.
  type XLSXModule = typeof import('xlsx');
  const mod = (await import('xlsx')) as XLSXModule & { default?: XLSXModule };
  const XLSX = mod.default ?? mod;

  const encabezadoEpicas = ['ID Épica', 'Nombre de la Épica', 'Como… (rol)', 'Quiero… (objetivo)', 'Para… (beneficio)', 'Explicación humana'];
  const filasEpicas = EPICS.map((e) => [e.id, e.name, e.asA, e.iWant, e.soThat, e.humanExplanation]);
  const wsEpicas = XLSX.utils.aoa_to_sheet([encabezadoEpicas, ...filasEpicas]);
  wsEpicas['!cols'] = [{ wch: 10 }, { wch: 36 }, { wch: 24 }, { wch: 45 }, { wch: 45 }, { wch: 65 }];

  const encabezadoHU = ['ID Historia', 'Épica', 'Rol', 'Sprint', 'Story Points', 'Título', 'Historia de Usuario', 'Tasks', 'Jira Key'];
  const filasHU = USER_STORIES.map((h) => [
    h.id,
    h.epicId,
    h.roleId,
    h.sprint,
    h.storyPoints,
    h.title,
    `Como ${h.asA}, quiero ${h.iWant}, para ${h.soThat}`,
    h.tasks.map((t) => `${t.taskId}: ${t.title}`).join(' | '),
    h.jiraKey,
  ]);
  const wsHU = XLSX.utils.aoa_to_sheet([encabezadoHU, ...filasHU]);
  wsHU['!cols'] = [{ wch: 12 }, { wch: 10 }, { wch: 16 }, { wch: 12 }, { wch: 14 }, { wch: 34 }, { wch: 65 }, { wch: 55 }, { wch: 14 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, wsEpicas, 'Épicas Faroo');
  XLSX.utils.book_append_sheet(wb, wsHU, 'Historias y Tasks');

  wb.Props = {
    Title: 'Faroo — Épicas, Historias y Tasks (Entregable 2)',
    Subject: 'Ingeniería de Software I — I.U. Pascual Bravo',
    Author: 'Nikoll Sofia Isaza Rua & David Machado',
  };

  XLSX.writeFile(wb, 'Faroo_Epicas_e_Historias.xlsx');
}

export function exportCurrentDeliverablePDF(): void {
  window.print();
}
