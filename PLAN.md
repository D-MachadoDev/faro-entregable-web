# PLAN MAESTRO — Manual Técnico Faroo (Evolución en 3 Etapas)

> **Propósito de este archivo**: Servir como hoja de ruta persistente y punto de recuperación ante cualquier corte de sesión o límite de cuota.
> **Ubicaciones sincronizadas**:
> - `C:\Users\da-V7\Desktop\faro-entregable-web\PLAN.md`
> - `C:\Users\da-V7\Desktop\Faro-Documentacion\docs\docs\entregables\faro-portal-web\PLAN.md`
> - `C:\Users\da-V7\Desktop\Proyectos\Faroo\odd\tasks\PLAN_MANUAL_TECNICO.md`

---

## 1. Principios Rectores del Usuario (Innegociables)

1. **Lenguaje 100% humano, cercano y sin rastro de IA**:
   - Redactado como estudiantes reales de Ingeniería de Software (Nikoll & David) contando paso a paso cómo nació y creció el proyecto.
   - Cero palabras robóticas o infladas (*"artefacto canónico"*, *"dictamen fáctico"*, *"invariante determinístico"*, *"MVP"*, *"MoSCoW"*, *"Walking Skeleton"*, *"slicing bidimensional"*).
   - Explicaciones cotidianas que cualquier persona no técnica entienda a la primera lectura.

2. **Evolución progresiva real entre las 3 Etapas (todo conectado)**:
   - **Etapa 1 (`1. Ideación & Planificación`)**:
     - **1.1 Lluvia de ideas**: Las 3 ideas evaluadas (**Faroo**, **MediTurnos**, **BarrioStock**), qué problema real buscaba resolver cada una y por qué nos quedamos con **Faroo**.
     - **1.2 Selección de Faroo, Objetivos y los 4 Roles**: Explicación sencilla del problema real, **Objetivo General**, **Objetivos Específicos** y presentación de los **4 roles únicos** (**Propietario, Inquilino, Administrador, Soporte**) que se mantienen idénticos en las 3 etapas.
     - **1.3 Mapa de Impacto**: Gráfico detallado e interactivo de 4 niveles (*1. Meta [Objetivo General] → 2. Actores [los 4 roles] → 3. Qué cambia en su día a día → 4. Qué vamos a construir*). Sin tablas pesadas ni jerga de etapas posteriores.
     - **1.4 User Story Mapping**: Tablero gráfico detallado donde **la cima (La Meta) es el Objetivo General**, seguido de las **6 actividades del recorrido** (*1. Inmuebles → 2. Inquilinos → 3. Contratos → 4. Cobros → 5. Pagos → 6. Control*) y los **pasos cotidianos** organizados en **Sprint 1** y **Sprint 2**.
     - **REGLA ESTRICTA ETAPA 1**: En la Etapa 1 **NO** aparecen Épicas (`EP-XX`), ni Historias de Usuario formales (*"Como... quiero..."*), ni Tasks técnicas, ni códigos de Jira (`SCRUM-X`). Aquí todo son ideas y pasos cotidianos del usuario.
   - **Etapa 2 (`2. Épicas e Historias`)**:
     - Muestra gráficamente cómo la ideación de la Etapa 1 **evoluciona y crece**:
       - Las **6 actividades** del Story Map se convierten en las **6 Épicas (`EP-01` a `EP-06`)**.
       - Los **pasos cotidianos** del Story Map se transforman en **Historias de Usuario formales** para los **4 roles** (**Propietario, Inquilino, Administrador, Soporte**).
       - Cada Historia de Usuario se desglosa en **Tasks (tareas concretas)** y **Criterios de validación claros** (Dado / Cuando / Entonces en lenguaje humano).
   - **Etapa 3 (`3. Backlog & Sprints Jira`)**:
     - Todo lo construido en la Etapa 2 aterriza en el **Product Backlog** y se organiza en **Sprint 1** y **Sprint 2** dentro de Jira Cloud (`SCRUM-1` a `SCRUM-47`), manteniendo trazabilidad completa desde la idea inicial de la Etapa 1 hasta la tarea verificada en Jira.

3. **Diseño Visual Minimalista, Cálido y Artesanal (`refined.framer.website` + `christopher-ware.com` + `better-ui`)**:
   - **Paleta oficial**: Fondo crema cálido `#F5F1E8`, tarjetas `#FAF8F3` y `#FFFFFF`, tinta principal azul marino `#1B2566`, acentos terracota `#E26B4A`, amarillo faro `#F1EE2E`, verde salvia `#2A6F4E`.
   - **Identidad cromática por Rol (consistente en las 3 etapas)**:
     - **Propietario**: Azul Marino (`#1B2566`)
     - **Inquilino**: Verde Salvia (`#2A6F4E`)
     - **Administrador**: Terracota / Ámbar (`#D97706` / `#E26B4A`)
     - **Soporte**: Índigo Suave (`#4F46E5`)
   - **Foco en gráficos detallados hechos a medida**:
     - Gráfico 1 (Etapa 1.1): Comparador visual de las 3 ideas de la lluvia de ideas y embudo de decisión hacia Faroo.
     - Gráfico 2 (Etapa 1.2): Ecosistema conectado de los 4 Roles alrededor de Faroo.
     - Gráfico 3 (Etapa 1.3): **Mapa de Impacto interactivo** con conectores curvos SVG (Desktop) y árbol conectado (Móvil) filtrable por cualquiera de los 4 roles.
     - Gráfico 4 (Etapa 1.4): **User Story Map completo** con el **Objetivo General en la cima (La Meta)**, las 6 actividades horizontales y las tarjetas de pasos cotidianos separadas en **Sprint 1** y **Sprint 2**.
     - Gráfico 5 (Etapa 2.0): **Diagrama interactivo de Evolución** (*Idea de Etapa 1 → Épica → Historia de Usuario → Tasks*).
     - Gráfico 6 (Etapa 3.1): **Mapa visual de Sprints y Trazabilidad Evolutiva** (*Etapa 1 → Etapa 2 → Etapa 3 en Jira*).
   - **Animaciones y micro-interacciones (`better-ui`)**:
     - Curva `cubic-bezier(0.2, 0, 0, 1)` para cambios de etapa, filtros de rol y acordeones.
     - Entrada progresiva suave (`translateY(12px)`, `blur(4px)` → `0`, `300ms`, escalonado `80ms`).
     - Respuesta táctil `active:scale-[0.96]` en botones interactivos.
     - Respeto estricto a `@media (prefers-reduced-motion: reduce)`.

---

## 2. Fases de Ejecución

- **Fase 1**: Creación de `PLAN.md` y `PROGRESS.md` en las carpetas del proyecto para respaldo ante corte de cuota.
- **Fase 2**: Diseño y construcción de la base de datos evolutiva unificada (los 4 roles, las 3 ideas, el Mapa de Impacto de 4 niveles, los pasos del Story Map en Etapa 1, su transformación en Épicas/Historias/Tasks en Etapa 2, y su asignación a Sprint 1 / Sprint 2 / Jira en Etapa 3).
- **Fase 3**: Implementación del portal completo en `C:\Users\da-V7\Desktop\faro-entregable-web\index.html` y sincronización en `C:\Users\da-V7\Desktop\Faro-Documentacion\docs\docs\entregables\faro-portal-web` (tanto versión standalone lista para producción como arquitectura modular React).
- **Fase 4**: Verificación visual, auditoría de reglas (cero palabras prohibidas, cero adelanto de conceptos en Etapa 1, 4 roles presentes en todas las etapas, gráficos interactivos funcionando en desktop y móvil) y despliegue en Vercel (`faro-entregable-web`).
