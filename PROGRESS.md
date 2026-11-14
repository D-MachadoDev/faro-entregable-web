# PROGRESS.md — Manual Técnico Faroo (Rastreador de Ejecución Persistente)

> **Estado General**: `100% COMPLETADO (6/6 Fases)`
> **Último Checkpoint**: `Fase 6 — Build verificado, sincronizado y desplegado en producción (Vercel)`

---

## Checklist de Progreso por Fase

### Fase 0: Respaldo y Archivos de Control (`PLAN.md` + `PROGRESS.md`) — `[COMPLETADO]`
- [x] Inspeccionar estructura actual en `faro-entregable-web` y `faro-portal-web`.
- [x] Crear copia de seguridad del `index.html` anterior en `C:\Users\da-V7\Desktop\Faro-Documentacion\docs\entregables\index.backup-2026-11-01.html`.
- [x] Guardar `PLAN.md` y `PROGRESS.md` en las tres rutas del proyecto para recuperación inmediata en caso de corte de cuota.

### Fase 1: Datos Evolutivos Canónicos (`src/data/manualData.ts`) — `[COMPLETADO]`
- [x] Definir los **4 Roles fijos** (`propietario`, `inquilino`, `administrador`, `soporte`) con colores editoriales, problemas cotidianos, metas humanas e impactos.
- [x] Definir las **3 Ideas de la Lluvia de Ideas** (`Faroo`, `MediTurnos`, `BarrioStock`) con puntajes comparativos y razones humanas.
- [x] Definir **Objetivo General** y **4 Objetivos Específicos** en lenguaje claro y cotidiano.
- [x] Definir **Mapa de Impacto** conectado a los 4 roles.
- [x] Definir **User Story Map (Etapa 1)** con el Objetivo General en la cima (`La Meta`), las **6 Actividades horizontales** y los **16 Pasos cotidianos** divididos en **Sprint 1** y **Sprint 2** (sin Épicas, sin HUs y sin códigos Jira en Etapa 1).
- [x] Definir **6 Épicas (`EP-01`..`EP-06`)**, **16 Historias de Usuario (`HU-01`..`HU-16`)**, **48 Tasks concretas** y **Criterios de validación (Dado / Cuando / Entonces)** en Etapa 2 conectados por `originStepId` a los pasos de Etapa 1.
- [x] Definir **Backlog, Sprint 1, Sprint 2 y subtareas de Jira (`SCRUM-1`..`SCRUM-47`)** en Etapa 3 conectados a las historias y tasks de Etapa 2.

### Fase 2: Componentes Visuales y Gráficos Interactivos (`Atomic Design` + `better-ui`) — `[COMPLETADO]`
- [x] `src/components/atoms/RoleBadge.tsx`: Insignia de rol con color e ícono de los 4 actores.
- [x] `src/components/molecules/RoleFilterBar.tsx`: Barra interactiva para filtrar cualquier vista por **Todos los roles**, **Propietario**, **Inquilino**, **Administrador** o **Soporte**.
- [x] `src/components/organisms/ImpactMapGraphic.tsx`: Gráfico interactivo de 4 columnas conectadas (`Meta [Objetivo General] → 4 Roles → ¿Qué cambia? → ¿Qué construimos?`).
- [x] `src/components/organisms/StoryMapBoard.tsx`: Tablero visual del User Story Map con **Objetivo General en la cima**, **6 Actividades** y **Pasos en lenguaje cotidiano** (Sprint 1 y Sprint 2).
- [x] `src/components/organisms/EvolutionTreeGraphic.tsx`: Diagrama interactivo de evolución (`Actividad/Paso [Etapa 1] → Épica → Historia de Usuario → Tasks`).

### Fase 3: Implementación de las 3 Etapas Evolutivas — `[COMPLETADO]`
- [x] `src/sections/Entregable1Content.tsx`: Lluvia de ideas + Selección de Faroo + Objetivos + 4 Roles + Mapa de Impacto + User Story Map (sin HUs ni Épicas).
- [x] `src/sections/Entregable2Content.tsx`: Gráfico de Evolución + 6 Épicas + 16 Historias de Usuario + Tasks + Validaciones en lenguaje humano.
- [x] `src/sections/Entregable3Content.tsx`: Resumen de Capacidad por Rol + Sprint 1 + Sprint 2 + Subtareas en Jira + Matriz de Trazabilidad Evolutiva (`Etapa 1 → Etapa 2 → Etapa 3`).

### Fase 4: Navegación Editorial, Animaciones y Pulido (`Header`, `Sidebar`, `App`, `index.css`) — `[COMPLETADO]`
- [x] Actualizar `Header.tsx` y `Sidebar.tsx` con estética minimalista (`Christopher Ware` / `Refined`), selector de etapas y filtro global de los 4 roles.
- [x] Integrar animaciones suaves (`cubic-bezier(0.2, 0, 0, 1)`, `active:scale-[0.96]`, soporte `prefers-reduced-motion`).

### Fase 5: Compilación, Sincronización y Despliegue (`Vercel`) — `[COMPLETADO]`
- [x] Ejecutar `npm run build` en `faro-portal-web` sin errores (`0 errors`).
- [x] Sincronizar salida compilada hacia `C:\Users\da-V7\Desktop\faro-entregable-web`.
- [x] Desplegar en Vercel (`faro-entregable-web`) y verificar respuesta HTTP 200.
