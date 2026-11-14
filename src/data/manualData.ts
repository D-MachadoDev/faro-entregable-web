export type RoleId = 'propietario' | 'inquilino' | 'administrador' | 'soporte';

export interface RoleDefinition {
  id: RoleId;
  name: string;
  shortLabel: string;
  colorHex: string;
  bgSoftHex: string;
  borderHex: string;
  whoIs: string;
  dailyPain: string;
  whatChangesWithFaroo: string;
  stage1Summary: string;
  stage2Summary: string;
  stage3Summary: string;
}

export interface BrainstormIdea {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  selected: boolean;
  statusLabel: string;
  realProblem: string;
  proposedSolution: string;
  differentialValue: string;
  decisionReason: string;
  everydayStory?: string;
  whyWeDecided?: string;
  scores?: {
    realPain: number;
    easeOfDailyUse: number;
    accessToUsers: number;
    learningValue: number;
  };
}

export interface MoscowItem {
  code: string;
  title: string;
  description: string;
  category: 'must' | 'should' | 'could' | 'wont';
  actor: RoleId;
}

export interface MoscowCategory {
  key: 'must' | 'should' | 'could' | 'wont';
  name: string;
  badge: string;
  tag: string;
  description: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  items: MoscowItem[];
}

export interface ImpactMapItem {
  id: string;
  actorId: RoleId;
  actorName: string;
  impactTitle: string;
  behaviorChange: string;
  deliverableTitle: string;
  deliverableDescription: string;
  metric: string;
}

export interface ImpactNode {
  id: string;
  roleId: RoleId;
  impactTitle: string;
  impactEveryday: string;
  whatWeBuildTitle: string;
  whatWeBuildEveryday: string;
  sprintTarget: 'Sprint 1' | 'Sprint 2';
}

export interface StoryMapStep {
  stepId: string;
  activityIndex: number; // 1..6
  roleId: RoleId;
  secondaryRoleId?: RoleId;
  sprint: 'Sprint 1' | 'Sprint 2';
  title: string;
  everydayDescription: string;
  evolvesToStoryId: string; // Link used in Stage 2 & 3 to show evolution
}

export interface StoryMapActivity {
  index: number;
  id: string;
  name: string;
  shortGoal: string;
  everydayExplanation: string;
  rolesInvolved: RoleId[];
  walkingStepTitle: string;
  walkingStepDetail: string;
  evolvesToEpicId: string;
}

export interface StoryTask {
  taskId: string;
  jiraSubtaskKey: string;
  title: string;
  areaLabel: 'Pantalla' | 'Regla y Datos' | 'Revisión';
  doneInSprint: 'Sprint 1' | 'Sprint 2';
}

export interface ValidationScenario {
  id: string;
  title: string;
  given: string;
  when: string;
  then: string;
}

export interface UserStoryItem {
  id: string;              // e.g. 'HU-01'
  jiraKey: string;         // e.g. 'SCRUM-2'
  epicId: string;          // e.g. 'EP-01'
  originStepId: string;    // e.g. 'P-1A' (from Stage 1 Story Map)
  roleId: RoleId;
  sprint: 'Sprint 1' | 'Sprint 2';
  storyPoints: number;
  priorityLabel: 'Alta' | 'Media';
  assignee: 'David Machado' | 'Nikoll Sofia Isaza Rua';
  title: string;
  asA: string;
  iWant: string;
  soThat: string;
  everydayContext: string;
  moscowRef?: string;      // e.g. 'Must Have (MOS-01)'
  backendRef?: string;     // e.g. 'POST /api/properties' o 'Dashboard /api/risk'
  tasks: StoryTask[];
  validations: ValidationScenario[];
}

export interface EpicItem {
  id: string;              // 'EP-01'..'EP-06'
  jiraKey: string;         // 'SCRUM-5'..'SCRUM-11'
  originActivityIndex: number;
  name: string;
  primaryRoleId: RoleId;
  supportingRoles: RoleId[];
  asA: string;
  iWant: string;
  soThat: string;
  humanExplanation: string;
}

export const PROJECT_META = {
  title: 'Manual Técnico — Faroo',
  subtitle: 'Plataforma web para gestión de arriendos, fechas fijas de corte y comprobantes de pago con foto',
  course: 'Ingeniería de Software I • 2026',
  university: 'Institución Universitaria Pascual Bravo',
  team: ['Nikoll Sofia Isaza Rua', 'David Machado'],
  teamStory:
    'Somos Nikoll y David, estudiantes de Ingeniería de Software I en el Pascual Bravo. Desarrollamos Faroo porque vimos en nuestras familias el desorden con los arriendos: se cobra por WhatsApp, las fotos de las transferencias de Nequi o Bancolombia se pierden en los chats y a mitad de mes nadie tiene claro cuánto se debe.',
  generalObjective:
    'Construir una plataforma web sencilla para administrar arriendos que organice los contratos en un solo sitio, genere los cobros en una fecha fija de corte de cada mes y permita a los inquilinos subir la foto de su transferencia para que el dueño o administrador valide el pago sin enredos de chats.',
  specificObjectives: [
    {
      num: '01',
      title: 'Tener inmuebles y contratos en un solo lugar',
      text: 'Registrar apartamentos, casas o locales con sus inquilinos, fijando el valor del arriendo y un día fijo de corte de cada mes (del 1 al 28).',
    },
    {
      num: '02',
      title: 'Cobros automáticos y validación con foto de recibo',
      text: 'Emitir el cobro mensual sin tener que recordar la fecha a mano y permitir subir el pantallazo de la transferencia (Nequi, Bancolombia, etc.) registrando abonos parciales.',
    },
    {
      num: '03',
      title: 'Semáforo de pagos y comprobante paz y salvo',
      text: 'Mostrar en una sola pantalla quién está al día y quién debe mediante colores claros, entregando un comprobante digital descargable.',
    },
  ],
};

export const PROJECT_SELECTION = {
  selectedIdeaId: 'faroo',
  selectedIdeaName: 'Faroo — Gestión de Arriendos y Cobros',
  justification: {
    problemSolved:
      'Resuelve un problema muy común en la administración de arriendos independientes: las cuentas se llevan en cuadernos o por mensajes de WhatsApp. Las capturas de transferencias (Nequi, Daviplata, Bancolombia) se pierden entre los chats, los pagos se hacen en días dispersos y cuando el inquilino hace abonos a mitad de mes, cuadrar la plata pendiente se vuelve incómodo y confuso.',
    targetBeneficiaries: [
      {
        actor: 'Dueño de inmuebles (Propietario)',
        benefit:
          'Sabe al instante qué propiedades tiene ocupadas y ve en segundos si el arriendo del mes ya entró completo o si hay retraso, sin tener que pasar la pena de llamar a cobrar.',
      },
      {
        actor: 'Quien vive en la casa (Inquilino)',
        benefit:
          'Tiene total certeza de cuánto debe pagar y qué día vence su contrato. Sube la foto de su pago por Nequi o banco directamente a la web y recibe su paz y salvo oficial.',
      },
      {
        actor: 'Administrador del inmueble',
        benefit:
          'Revisa las fotos de los pagos que suben los inquilinos en una bandeja rápida, aprueba o devuelve con una nota clara si el valor no coincide, y lleva las cuentas al día.',
      },
      {
        actor: 'Equipo de atención y soporte de Faroo',
        benefit:
          'Vela por los usuarios de la plataforma, ayuda a restablecer accesos si alguien cambia de número, asiste ante dudas y mantiene la atención humana siempre activa.',
      },
    ],
    whyWorthDeveloping:
      'Le metimos la ficha a este proyecto por dos razones: primero, porque es una necesidad real que conocemos de cerca y queríamos hacer una plataforma sencilla para la gente, sin el enredo de programas inmobiliarios caros. Y segundo, porque David ya tenía código adelantado en el repositorio de Faroo (.NET y React) y me lo mostró; eso nos dio una base técnica muy buena para avanzar con juicio y entregar un software que funciona de verdad.',
  },
  objectives: {
    general:
      'Construir una plataforma web sencilla para administrar arriendos que organice los contratos en un solo sitio, genere los cobros en una fecha fija de corte de cada mes y permita a los inquilinos subir la foto de su transferencia para que el dueño o administrador valide el pago sin enredos de chats.',
    specifics: [
      {
        num: '01',
        title: 'Tener inmuebles y contratos en un solo lugar',
        text: 'Registrar apartamentos, casas o locales con sus inquilinos, fijando el valor del arriendo y un día fijo de corte de cada mes (del 1 al 28).',
      },
      {
        num: '02',
        title: 'Cobros automáticos y validación con foto de recibo',
        text: 'Emitir el cobro mensual sin tener que recordar la fecha a mano y permitir subir el pantallazo de la transferencia (Nequi, Bancolombia, etc.) registrando abonos parciales.',
      },
      {
        num: '03',
        title: 'Semáforo de pagos y comprobante paz y salvo',
        text: 'Mostrar en una sola pantalla quién está al día y quién debe mediante colores claros, entregando un comprobante digital descargable.',
      },
    ],
  },
};

// Roles del sistema
export const ROLES: Record<RoleId, RoleDefinition> = {
  propietario: {
    id: 'propietario',
    name: 'Propietario',
    shortLabel: 'Propietario',
    colorHex: '#111111',
    bgSoftHex: '#F4F4F5',
    borderHex: '#111111',
    whoIs: 'Dueño de los apartamentos, casas o locales. No es una gran inmobiliaria, sino una persona que tiene entre 2 y 10 propiedades para complementar sus ingresos.',
    dailyPain:
      'Le mandan fotos de transferencias por WhatsApp que se mezclan con chats de la familia. A mitad de mes no sabe quién pagó completo, quién dio un abono o quién está debiendo, y le da pena llamar a cobrar a cada rato.',
    whatChangesWithFaroo:
      'Entra a una sola pantalla y ve en segundos quién está al día y quién debe mediante un semáforo de colores, con las fotos de los recibos organizadas por contrato.',
    stage1Summary: 'Necesita saber qué inmuebles tiene alquilados, qué dinero entra cada mes y quién está atrasado.',
    stage2Summary: 'Protagoniza las historias de consulta de cartera, historial de aumentos anuales y semáforo de pagos.',
    stage3Summary: 'Recibe desde el Sprint 1 el catálogo de sus propiedades y en el Sprint 2 el semáforo mensual y los reportes consolidados.',
  },
  inquilino: {
    id: 'inquilino',
    name: 'Inquilino',
    shortLabel: 'Inquilino',
    colorHex: '#111111',
    bgSoftHex: '#F4F4F5',
    borderHex: '#111111',
    whoIs: 'Quien vive en la casa o atiende el local comercial y paga el arriendo cada mes.',
    dailyPain:
      'Paga por Nequi o Bancolombia a la carrera en la fecha de corte, envía el pantallazo por WhatsApp y con el tiempo se le borra la foto. Si hace abonos quincenales, nunca le queda constancia de cuánto debe.',
    whatChangesWithFaroo:
      'Entra desde su celular, ve su fecha límite exacta, sube la foto de su transferencia directamente al cobro y descarga su comprobante de paz y salvo con código de verificación.',
    stage1Summary: 'Necesita saber qué día le toca pagar, cuánto debe exactamente y dónde subir su comprobante sin que se pierda.',
    stage2Summary: 'Protagoniza las historias de consulta de cuenta, reporte de pago con foto y descarga de paz y salvo.',
    stage3Summary: 'Dispone en el Sprint 1 de la vista de sus cobros y en el Sprint 2 de la carga de fotos y recibos descargables.',
  },
  administrador: {
    id: 'administrador',
    name: 'Administrador',
    shortLabel: 'Administrador',
    colorHex: '#111111',
    bgSoftHex: '#F4F4F5',
    borderHex: '#111111',
    whoIs: 'Quien gestiona los contratos y las cuentas: puede ser el mismo propietario organizado o una persona de confianza encargada de varios arriendos.',
    dailyPain:
      'Lleva las cuentas en libretas o Excel. Tiene que acordarse de memoria cuándo vence cada arriendo (unos el 5, otros el 15 o el 20), revisar si la foto de la transferencia es real y cuadrar los abonos en papel.',
    whatChangesWithFaroo:
      'El sistema le genera el cobro mensual en la fecha fija de cada contrato. Revisa los comprobantes en una bandeja rápida con visor de fotos y aprueba o devuelve con un clic.',
    stage1Summary: 'Registra los inmuebles, inquilinos y contratos, emite los cobros y valida los comprobantes recibidos.',
    stage2Summary: 'Protagoniza las historias de creación de contratos, emisión de cobros, revisión de comprobantes y descuento de abonos parciales.',
    stage3Summary: 'Ejecuta el registro de contratos en el Sprint 1 y la aprobación de pagos con visor en el Sprint 2.',
  },
  soporte: {
    id: 'soporte',
    name: 'Soporte',
    shortLabel: 'Soporte',
    colorHex: '#111111',
    bgSoftHex: '#F4F4F5',
    borderHex: '#111111',
    whoIs: 'Equipo de atención y soporte de Faroo. Vela por los usuarios de la plataforma, los acompaña en su uso diario y les ayuda a resolver dudas operativas o problemas con sus credenciales y accesos.',
    dailyPain:
      'Los usuarios olvidan sus contraseñas, cambian de número de contacto o correo y necesitan ayuda para no perder el acceso a sus contratos o inmuebles.',
    whatChangesWithFaroo:
      'Dispone de herramientas para gestionar usuarios, restablecer contraseñas de forma segura y atender inquietudes rápidamente para que nadie se quede sin servicio.',
    stage1Summary: 'Vela por los usuarios de Faroo, asegurando su acceso y resolviendo dudas del servicio.',
    stage2Summary: 'Protagoniza las historias de administración de usuarios, actualización de datos de contacto y atención de solicitudes.',
    stage3Summary: 'Garantiza el control de accesos en el Sprint 1 y la gestión y resolución de solicitudes de usuarios en el Sprint 2.',
  },
};

export const ROLE_LIST: RoleDefinition[] = [
  ROLES.propietario,
  ROLES.inquilino,
  ROLES.administrador,
  ROLES.soporte,
];

// Propuestas evaluadas en la lluvia de ideas (Nikoll y David)
export const BRAINSTORM_IDEAS: BrainstormIdea[] = [
  {
    id: 'faroo',
    number: 'Idea 01',
    name: 'Faroo — Gestión de Arriendos y Cobros',
    subtitle: 'Contratos con fecha fija de corte, carga de fotos de transferencias y semáforo de pagos',
    selected: true,
    statusLabel: 'Elegida por el equipo',
    realProblem:
      'David planteó esta idea porque veía de primera mano el desorden con los arriendos: se cobra por WhatsApp, las capturas de transferencias de Nequi o Bancolombia se pierden en los chats, los pagos se hacen en días diferentes y cuando hay abonos parciales, cuadrar las cuentas se vuelve un problema.',
    proposedSolution:
      'Una plataforma web sencilla donde cada arriendo tenga su fecha de corte fija de cada mes (del 1 al 28), el cobro salga puntual y el inquilino suba el pantallazo de su pago para que el dueño lo valide y el saldo se descuente al instante.',
    differentialValue:
      'No es un software pesado de inmobiliaria ni una libreta de notas: está pensado para personas comunes que necesitan verificar transferencias rápido y tener las cuentas claras.',
    decisionReason:
      'David propuso Faroo y me mostró que ya tenía código base avanzado en el repositorio (.NET y React). Entre los dos vimos que era la mejor opción para el semestre: en vez de arrancar desde cero con otra propuesta, podíamos trabajar sobre esa base técnica, pulir bien la aplicación y entregar una solución completa que de verdad sirve.',
    everydayStory:
      'Administración de arriendos donde las capturas bancarias se pierden en chats y se descuadran las cuentas.',
    whyWeDecided:
      'Base de código avanzada previa en el repositorio, afinidad real con el problema y excelente alcance para el semestre.',
  },
  {
    id: 'mediturnos',
    number: 'Idea 02',
    name: 'MediCitas — Turnos y Citas para Consultorios',
    subtitle: 'Agenda de citas y recordatorios para consultorios médicos independientes',
    selected: false,
    statusLabel: 'Descartada en evaluación',
    realProblem:
      'Nikoll propuso esta idea pensando en consultorios médicos y odontológicos independientes que manejan la agenda por chat, donde muchas veces los pacientes no llegan o se cruzan las citas a la misma hora.',
    proposedSolution:
      'Un enlace web directo donde el paciente reserve su cita médica y reciba confirmación automática por mensaje.',
    differentialValue:
      'Autogestión de citas para el paciente sin tener que cruzar múltiples mensajes.',
    decisionReason:
      'Al revisarla entre los dos, nos dimos cuenta de que la mayoría de profesionales ya manejan esto con herramientas que todo el mundo conoce como Google Calendar o WhatsApp Business. Además no teníamos ninguna base de código previa y tocaba arrancar desde cero.',
    everydayStory:
      'Citas cruzadas en consultorios independientes por llevar agendas en papel o mensajes.',
    whyWeDecided:
      'Alta competencia con herramientas consolidadas del mercado y sin base técnica previa.',
  },
  {
    id: 'barriostock',
    number: 'Idea 03',
    name: 'StockBarrio — Control de Vencimientos en Tiendas',
    subtitle: 'Alertas de caducidad de productos perecederos para tiendas de barrio',
    selected: false,
    statusLabel: 'Descartada en evaluación',
    realProblem:
      'Nikoll propuso esta alternativa pensando en las tiendas de barrio y minimercados, donde a veces se vencen productos en las estanterías porque al tendero se le pasa revisar las fechas de caducidad.',
    proposedSolution:
      'Registro rápido de lotes con fecha de vencimiento y un semáforo de alertas para rematar o rotar productos antes de que caduquen.',
    differentialValue:
      'Prevenir pérdidas de dinero en alimentos mediante avisos tempranos.',
    decisionReason:
      'La descartamos porque hablando del día a día de una tienda, el tendero no tiene tiempo de ponerse a digitar fechas de vencimiento una por una en un computador sin lectores de código de barras. La solución resultaba poco práctica para el trabajo real de la tienda.',
    everydayStory:
      'Pérdida de alimentos perecederos en estantes por falta de control sistemático.',
    whyWeDecided:
      'Fricción de uso diaria insostenible para el tendero y falta de lectores de códigos en tiendas de barrio.',
  },
];

// Mapa de impacto (Gojko Adzic)
export const IMPACT_MAP_NODES: ImpactNode[] = [
  // ADMINISTRADOR
  {
    id: 'IMP-ADM-1',
    roleId: 'administrador',
    impactTitle: 'No tener que acordarse de memoria cuándo cobrarle a cada inquilino',
    impactEveryday:
      'El sistema genera el cobro en el día fijo de corte de cada contrato sin olvidos ni cobros duplicados.',
    whatWeBuildTitle: 'Cobros automáticos generados en la fecha de corte mensual',
    whatWeBuildEveryday:
      'Formulario para fijar el día de corte mensual y sacar la cuenta de cobro puntual.',
    sprintTarget: 'Sprint 1',
  },
  {
    id: 'IMP-ADM-2',
    roleId: 'administrador',
    impactTitle: 'Revisar y validar transferencias en minutos sin buscar en chats',
    impactEveryday:
      'Revisa las fotos de los pagos en una sola pantalla con visor integrado y aprueba con un clic.',
    whatWeBuildTitle: 'Bandeja de comprobantes con visor rápido de transferencias',
    whatWeBuildEveryday:
      'Panel donde el administrador visualiza la transferencia bancaria y confirma el pago.',
    sprintTarget: 'Sprint 1',
  },
  {
    id: 'IMP-ADM-3',
    roleId: 'administrador',
    impactTitle: 'Aceptar abonos a mitad de mes sin enredos en las cuentas',
    impactEveryday:
      'Al registrar un abono parcial, el sistema descuenta el valor y recalcula el saldo pendiente de inmediato.',
    whatWeBuildTitle: 'Cálculo automático de abonos y saldo pendiente en tiempo real',
    whatWeBuildEveryday:
      'Función para descontar abonos parciales del valor del arriendo y mostrar cuánto queda faltando.',
    sprintTarget: 'Sprint 2',
  },

  // INQUILINO
  {
    id: 'IMP-INQ-1',
    roleId: 'inquilino',
    impactTitle: 'Subir la foto del pago directo por la web en vez de enviarla por WhatsApp',
    impactEveryday:
      'Adjunta la captura de Nequi, Daviplata o Bancolombia desde el celular directo al cobro del mes.',
    whatWeBuildTitle: 'Portal web del inquilino para adjuntar fotos de transferencias',
    whatWeBuildEveryday:
      'Interfaz móvil donde el arrendatario sube la foto de su transferencia sin que se pierda.',
    sprintTarget: 'Sprint 1',
  },
  {
    id: 'IMP-INQ-2',
    roleId: 'inquilino',
    impactTitle: 'Saber cuánto debe y qué día vence sin tener que preguntar',
    impactEveryday:
      'Consulta en cualquier momento su fecha límite, el canon exacto y qué abonos ya entraron.',
    whatWeBuildTitle: 'Estado de cuenta en línea con fecha límite y saldo al día',
    whatWeBuildEveryday:
      'Ficha en línea con valor del arriendo, día de corte y saldo pendiente en tiempo real.',
    sprintTarget: 'Sprint 1',
  },
  {
    id: 'IMP-INQ-3',
    roleId: 'inquilino',
    impactTitle: 'Tener su comprobante y paz y salvo oficial apenas le aprueban el pago',
    impactEveryday:
      'Recibe un comprobante con código de verificación que certifica que el arriendo del mes quedó pago.',
    whatWeBuildTitle: 'Generador de paz y salvo digital con código único',
    whatWeBuildEveryday:
      'Recibo digital descargable con código único que certifica el pago del periodo.',
    sprintTarget: 'Sprint 2',
  },

  // PROPIETARIO
  {
    id: 'IMP-PROP-1',
    roleId: 'propietario',
    impactTitle: 'Ver en segundos con colores quién ya pagó y quién está debiendo',
    impactEveryday:
      'Identifica al instante arriendos al día (verde), en periodo de cobro (amarillo) y en mora (rojo).',
    whatWeBuildTitle: 'Tablero con semáforo de pagos (verde al día, amarillo en plazo, rojo mora)',
    whatWeBuildEveryday:
      'Vista panorámica por inmueble con semáforo según el estado del cobro mensual.',
    sprintTarget: 'Sprint 2',
  },
  {
    id: 'IMP-PROP-2',
    roleId: 'propietario',
    impactTitle: 'Saber en tiempo real el dinero recaudado y qué inmuebles están libres sin llamar a preguntar',
    impactEveryday:
      'Consulta en un solo vistazo el total recaudado del mes, qué cánones están pendientes y qué inmuebles están disponibles para volver a arrendar.',
    whatWeBuildTitle: 'Resumen consolidado de ingresos mensuales y tasa de ocupación',
    whatWeBuildEveryday:
      'Tablero financiero con total recaudado, saldo por cobrar y listado de inmuebles desocupados.',
    sprintTarget: 'Sprint 1',
  },
  {
    id: 'IMP-PROP-3',
    roleId: 'propietario',
    impactTitle: 'Tener claro cuánto subió el arriendo en la renovación del año',
    impactEveryday:
      'Revisa cuánto subió el canon en la renovación anual de cada contrato para proyectar sus ingresos.',
    whatWeBuildTitle: 'Historial de incrementos anuales del canon y renovaciones',
    whatWeBuildEveryday:
      'Seguimiento a renovaciones anuales y reajustes del canon según índice legal.',
    sprintTarget: 'Sprint 2',
  },

  // SOPORTE Y ACOMPAÑAMIENTO (EQUIPO FAROO)
  {
    id: 'IMP-SOP-1',
    roleId: 'soporte',
    impactTitle: 'Ayudar a los usuarios si cambiaron de número, correo o clave',
    impactEveryday:
      'Asiste a propietarios e inquilinos cuando cambian de número de WhatsApp para que sigan usando la app.',
    whatWeBuildTitle: 'Panel de administración y recuperación segura de cuentas',
    whatWeBuildEveryday:
      'Módulo administrativo para gestionar accesos por rol y actualizar datos de contacto.',
    sprintTarget: 'Sprint 1',
  },
  {
    id: 'IMP-SOP-2',
    roleId: 'soporte',
    impactTitle: 'Atender inquietudes y solucionar dudas del uso de la plataforma',
    impactEveryday:
      'Canaliza y soluciona cualquier duda o inconveniente operativo de los usuarios de Faroo.',
    whatWeBuildTitle: 'Centro de ayuda y registro de solicitudes de usuarios',
    whatWeBuildEveryday:
      'Historial de solicitudes para brindar una respuesta ágil a las consultas de los usuarios.',
    sprintTarget: 'Sprint 2',
  },
  {
    id: 'IMP-SOP-3',
    roleId: 'soporte',
    impactTitle: 'Devolver comprobantes ilegibles con motivo claro para que el inquilino lo corrija sin enojos',
    impactEveryday:
      'Rechaza fotos borrosas, cortadas o erróneas dejando la observación visible al inquilino para que vuelva a subirla de inmediato sin disputas.',
    whatWeBuildTitle: 'Módulo de mediación y devolución motivada de transferencias dudosas',
    whatWeBuildEveryday:
      'Modal de devolución con causal obligatoria que reabre la carga de pago al inquilino.',
    sprintTarget: 'Sprint 2',
  },
];

// Priorización MoSCoW
export const MOSCOW_CATEGORIES: MoscowCategory[] = [
  {
    key: 'must',
    name: 'Must Have',
    badge: 'Obligatorio para arrancar',
    tag: 'M',
    description: 'Lo que tiene que estar listo sí o sí para poder registrar un arriendo y recibir el primer pago.',
    colorBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    colorBorder: 'border-emerald-600',
    colorText: 'text-emerald-800 dark:text-emerald-300',
    items: [
      {
        code: 'MOS-01',
        title: 'Registro de inmuebles e inquilinos',
        description: 'Guardar casas, apartamentos y locales con sus datos, y registrar a los inquilinos con su cédula, teléfono y correo.',
        category: 'must',
        actor: 'administrador',
      },
      {
        code: 'MOS-02',
        title: 'Crear el contrato y fijar el día de corte',
        description: 'Unir al inquilino con la propiedad que va a arrendar, fijando cuánto va a pagar al mes y qué día fijo vence el arriendo (del 1 al 28).',
        category: 'must',
        actor: 'administrador',
      },
      {
        code: 'MOS-03',
        title: 'Generar el cobro automático cada mes',
        description: 'Que el sistema saque la cuenta de cobro apenas llegue la fecha de pago sin depender de que alguien se acuerde de memoria.',
        category: 'must',
        actor: 'administrador',
      },
      {
        code: 'MOS-04',
        title: 'Subir la foto del pago o transferencia',
        description: 'Que el inquilino pueda montar la captura de Nequi, Daviplata o Bancolombia directamente a la página desde su celular.',
        category: 'must',
        actor: 'inquilino',
      },
      {
        code: 'MOS-05',
        title: 'Revisar la foto y confirmar el pago',
        description: 'Que el administrador o dueño pueda abrir la captura bancaria, verificar que la plata sí entró y marcar el pago como recibido.',
        category: 'must',
        actor: 'administrador',
      },
      {
        code: 'MOS-06',
        title: 'Historial de pagos con sus fotos por casa',
        description: 'Tener una carpeta virtual donde queden guardados los recibos y fotos de los meses anteriores para evitar confusiones o reclamos.',
        category: 'must',
        actor: 'propietario',
      },
    ],
  },
  {
    key: 'should',
    name: 'Should Have',
    badge: 'Muy importante',
    tag: 'S',
    description: 'Funciones de mucho valor para el día a día que dejamos para la segunda entrega para no retrasar el inicio.',
    colorBg: 'bg-amber-50 dark:bg-amber-950/40',
    colorBorder: 'border-amber-600',
    colorText: 'text-amber-800 dark:text-amber-300',
    items: [
      {
        code: 'MOS-07',
        title: 'Recibir abonos y restar de la deuda',
        description: 'Si el inquilino paga una parte a principio de mes y otra después, que el sistema descuente el abono y muestre cuánto queda faltando.',
        category: 'should',
        actor: 'administrador',
      },
      {
        code: 'MOS-08',
        title: 'Semáforo de pagos (verde, amarillo y rojo)',
        description: 'Colores rápidos para ver quién ya pagó completo (verde), a quién se le está cumpliendo el plazo (amarillo) y quién está colgado (rojo).',
        category: 'should',
        actor: 'propietario',
      },
      {
        code: 'MOS-09',
        title: 'Paz y salvo digital descargable',
        description: 'Entregarle al inquilino un recibo digital oficial que certifique que el arriendo de ese mes quedó totalmente pago.',
        category: 'should',
        actor: 'inquilino',
      },
      {
        code: 'MOS-10',
        title: 'Mensaje de rechazo si la foto no se ve o está mala',
        description: 'Poder avisarle al inquilino con una nota clara si la captura de pantalla se subió borrosa o con un valor que no coincide.',
        category: 'should',
        actor: 'soporte',
      },
    ],
  },
  {
    key: 'could',
    name: 'Could Have',
    badge: 'Deseable si da tiempo',
    tag: 'C',
    description: 'Comodidades y detalles chéveres que mejoran la experiencia si nos queda tiempo libre.',
    colorBg: 'bg-sky-50 dark:bg-sky-950/40',
    colorBorder: 'border-sky-600',
    colorText: 'text-sky-800 dark:text-sky-300',
    items: [
      {
        code: 'MOS-11',
        title: 'Descargar las cuentas en archivo Excel',
        description: 'Poder bajar la lista de arriendos, cobros y pagos a un archivo de Excel para quien prefiera revisarlo en su computador.',
        category: 'could',
        actor: 'administrador',
      },
      {
        code: 'MOS-12',
        title: 'Recordatorio listo para mandar por WhatsApp',
        description: 'Un botón que arme un mensaje amable de cobro para enviárselo directamente al inquilino por chat.',
        category: 'could',
        actor: 'administrador',
      },
      {
        code: 'MOS-13',
        title: 'Registro del aumento de arriendo anual',
        description: 'Anotar cuánto subió el arriendo cuando el contrato cumple el año según el porcentaje legal para no perder la cuenta.',
        category: 'could',
        actor: 'propietario',
      },
      {
        code: 'MOS-14',
        title: 'Guardar datos de fiadores o codeudores',
        description: 'Anotar el nombre y teléfono de una o dos personas de respaldo en caso de que el inquilino no aparezca.',
        category: 'could',
        actor: 'administrador',
      },
    ],
  },
  {
    key: 'wont',
    name: "Won't Have",
    badge: 'Queda para más adelante',
    tag: 'W',
    description: 'Cosas complejas que dejamos por fuera a propósito para no enredarnos en esta primera versión.',
    colorBg: 'bg-rose-50 dark:bg-rose-950/40',
    colorBorder: 'border-rose-600',
    colorText: 'text-rose-800 dark:text-rose-300',
    items: [
      {
        code: 'MOS-15',
        title: 'Cobro bancario automático por PSE',
        description: 'No nos metemos con débitos bancarios automáticos; la gente prefiere transferir por su cuenta y subir el comprobante.',
        category: 'wont',
        actor: 'inquilino',
      },
      {
        code: 'MOS-16',
        title: 'Firma de contratos con notaría digital',
        description: 'Firmas electrónicas con huella o notarías digitales; se sale de lo que necesita una persona común y corriente.',
        category: 'wont',
        actor: 'propietario',
      },
      {
        code: 'MOS-17',
        title: 'Seguros o pólizas de arriendo comerciales',
        description: 'Integraciones con aseguradoras comerciales de arriendos; no aplica para dueños independientes.',
        category: 'wont',
        actor: 'administrador',
      },
      {
        code: 'MOS-18',
        title: 'Conexión con programas de contabilidad pesados (SAP o Siigo)',
        description: 'Sistemas contables de empresas grandes que solo complican la aplicación y no los usa la gente de a pie.',
        category: 'wont',
        actor: 'soporte',
      },
    ],
  },
];

// Actividades del User Story Mapping (Etapa 1)
export const STORY_MAP_ACTIVITIES: StoryMapActivity[] = [
  {
    index: 1,
    id: 'ACT-01',
    name: '1. Organizar Inmuebles',
    shortGoal: 'Tener claro qué propiedades existen y su estado',
    everydayExplanation: 'El primer paso natural es anotar qué apartamentos, casas o locales se tienen y saber cuáles están libres u ocupados.',
    rolesInvolved: ['propietario', 'administrador'],
    walkingStepTitle: 'Anotar y consultar las propiedades',
    walkingStepDetail: 'Registrar dirección, tipo de inmueble y valor mensual, viendo rápido cuáles están disponibles.',
    evolvesToEpicId: 'EP-01',
  },
  {
    index: 2,
    id: 'ACT-02',
    name: '2. Registrar Personas y Contactos',
    shortGoal: 'Guardar inquilinos, fiadores y mantener sus datos al día',
    everydayExplanation: 'Antes de arrendar, necesitamos los datos completos del inquilino, sus fiadores de respaldo y poder actualizar su número si cambia de celular.',
    rolesInvolved: ['administrador', 'soporte', 'inquilino'],
    walkingStepTitle: 'Guardar datos de contacto y mantenerlos al día',
    walkingStepDetail: 'Registrar cédula, WhatsApp, fiadores y actualizar los datos cuando el inquilino cambie de línea.',
    evolvesToEpicId: 'EP-02',
  },
  {
    index: 3,
    id: 'ACT-03',
    name: '3. Acordar el Contrato',
    shortGoal: 'Unir inmueble e inquilino con un día fijo de pago',
    everydayExplanation: 'Aquí se formaliza el arriendo definiendo cuánto se paga al mes y qué día exacto (del 1 al 28) vence cada mensualidad.',
    rolesInvolved: ['administrador', 'propietario', 'inquilino'],
    walkingStepTitle: 'Dejar firme el acuerdo mensual',
    walkingStepDetail: 'Vincular propiedad disponible con el inquilino y fijar el día de corte mensual.',
    evolvesToEpicId: 'EP-03',
  },
  {
    index: 4,
    id: 'ACT-04',
    name: '4. Sacar el Cobro del Mes',
    shortGoal: 'Que la cuenta de cobro salga puntual cada mes',
    everydayExplanation: 'Cuando llega el día pactado en el contrato, se genera el cobro del mes para que ni el administrador ni el inquilino lo olviden.',
    rolesInvolved: ['administrador', 'inquilino', 'propietario'],
    walkingStepTitle: 'Preparar el cobro mensual a tiempo',
    walkingStepDetail: 'Emitir el cobro del periodo automáticamente sin duplicarlo y mostrar el total del mes.',
    evolvesToEpicId: 'EP-04',
  },
  {
    index: 5,
    id: 'ACT-05',
    name: '5. Pagar y Revisar Recibos',
    shortGoal: 'Subir la foto del pago, descontar abonos y dar recibo',
    everydayExplanation: 'El corazón del día a día: el inquilino paga y sube la foto; el administrador la revisa, el saldo se actualiza y sale el recibo.',
    rolesInvolved: ['inquilino', 'administrador', 'soporte'],
    walkingStepTitle: 'Respaldar el pago con foto y recibo',
    walkingStepDetail: 'Subir captura bancaria, aprobar o devolver con nota si hay error, y entregar recibo de paz y salvo.',
    evolvesToEpicId: 'EP-05',
  },
  {
    index: 6,
    id: 'ACT-06',
    name: '6. Vigilar la Cartera',
    shortGoal: 'Ver con colores quién debe y recordar por WhatsApp',
    everydayExplanation: 'Con los cobros y pagos andando, el propietario y el administrador miran el semáforo de cartera y envían recordatorios amables.',
    rolesInvolved: ['propietario', 'administrador', 'soporte'],
    walkingStepTitle: 'Monitorear atrasos y acompañar dudas',
    walkingStepDetail: 'Ver semáforo verde/amarillo/rojo, mandar recordatorio a WhatsApp y consultar bitácora de soporte.',
    evolvesToEpicId: 'EP-06',
  },
];

export const STORY_MAP_STEPS: StoryMapStep[] = [
  // ACTIVIDAD 1: INMUEBLES
  {
    stepId: 'Paso 1A',
    activityIndex: 1,
    roleId: 'administrador',
    secondaryRoleId: 'propietario',
    sprint: 'Sprint 1',
    title: 'Anotar un inmueble nuevo con su dirección y valor mensual',
    everydayDescription: 'Guardar los datos básicos de la casa, apartamento o local para que quede disponible en el inventario.',
    evolvesToStoryId: 'HU-01',
  },
  {
    stepId: 'Paso 1B',
    activityIndex: 1,
    roleId: 'propietario',
    secondaryRoleId: 'administrador',
    sprint: 'Sprint 1',
    title: 'Separar qué inmuebles están libres y cuáles ocupados',
    everydayDescription: 'Poder filtrar la lista rápidamente cuando alguien pregunta si hay un apartamento libre para arrendar.',
    evolvesToStoryId: 'HU-02',
  },
  {
    stepId: 'Paso 1C',
    activityIndex: 1,
    roleId: 'propietario',
    secondaryRoleId: 'administrador',
    sprint: 'Sprint 2',
    title: 'Guardar el historial cuando sube el valor del arriendo cada año',
    everydayDescription: 'Llevar anotado cuánto valía antes el arriendo y cuánto subió en la renovación anual para no perder la cuenta.',
    evolvesToStoryId: 'HU-03',
  },

  // ACTIVIDAD 2: PERSONAS Y ACCESOS
  {
    stepId: 'Paso 2A',
    activityIndex: 2,
    roleId: 'administrador',
    sprint: 'Sprint 1',
    title: 'Guardar los datos del inquilino con su cédula y WhatsApp',
    everydayDescription: 'Tener su documento único y su número de celular a la mano sin que se pierda entre los contactos personales.',
    evolvesToStoryId: 'HU-04',
  },
  {
    stepId: 'Paso 2B',
    activityIndex: 2,
    roleId: 'administrador',
    secondaryRoleId: 'propietario',
    sprint: 'Sprint 1',
    title: 'Anotar hasta dos fiadores o deudores de respaldo',
    everydayDescription: 'Dejar registrados los datos de las personas que respaldan al inquilino en caso de un atraso largo.',
    evolvesToStoryId: 'HU-05',
  },
  {
    stepId: 'Paso 2C',
    activityIndex: 2,
    roleId: 'soporte',
    sprint: 'Sprint 1',
    title: 'Actualizar teléfono y datos de contacto ante cambios de línea',
    everydayDescription: 'Modificar el WhatsApp o correo del inquilino cuando cambia de número para no perder la comunicación de cobros ni recibos.',
    evolvesToStoryId: 'HU-15',
  },

  // ACTIVIDAD 3: CONTRATOS
  {
    stepId: 'Paso 3A',
    activityIndex: 3,
    roleId: 'administrador',
    secondaryRoleId: 'propietario',
    sprint: 'Sprint 1',
    title: 'Armar el contrato fijando el día de pago mensual (del 1 al 28)',
    everydayDescription: 'Unir el inmueble disponible con el inquilino, definir el valor mensual y elegir un día fijo de corte que exista en todos los meses.',
    evolvesToStoryId: 'HU-06',
  },
  {
    stepId: 'Paso 3B',
    activityIndex: 3,
    roleId: 'administrador',
    secondaryRoleId: 'propietario',
    sprint: 'Sprint 2',
    title: 'Recibir un aviso un mes antes de que termine el contrato',
    everydayDescription: 'Saber con 30 días de anticipación qué contratos están por vencerse para hablar a tiempo con el inquilino.',
    evolvesToStoryId: 'HU-07',
  },

  // ACTIVIDAD 4: COBROS
  {
    stepId: 'Paso 4A',
    activityIndex: 4,
    roleId: 'administrador',
    secondaryRoleId: 'inquilino',
    sprint: 'Sprint 1',
    title: 'Generar el cobro del mes automáticamente en la fecha de corte',
    everydayDescription: 'Que cuando llegue el día de pago pactado aparezca listo el cobro del mes sin tener que crearlo a mano ni repetirlo.',
    evolvesToStoryId: 'HU-08',
  },
  {
    stepId: 'Paso 4B',
    activityIndex: 4,
    roleId: 'propietario',
    secondaryRoleId: 'administrador',
    sprint: 'Sprint 1',
    title: 'Ver en una sola lista todos los cobros del mes y cuánto falta',
    everydayDescription: 'Comparar cuánto dinero debía entrar este mes en total frente a lo que ya se ha recibido hasta hoy.',
    evolvesToStoryId: 'HU-09',
  },

  // ACTIVIDAD 5: PAGOS Y RECIBOS
  {
    stepId: 'Paso 5A',
    activityIndex: 5,
    roleId: 'inquilino',
    secondaryRoleId: 'administrador',
    sprint: 'Sprint 2',
    title: 'Subir la foto o captura de la transferencia bancaria',
    everydayDescription: 'Adjuntar la imagen de Nequi, Bancolombia o Daviplata directamente al cobro del mes evitando subir dos veces la misma foto.',
    evolvesToStoryId: 'HU-10',
  },
  {
    stepId: 'Paso 5B',
    activityIndex: 5,
    roleId: 'administrador',
    secondaryRoleId: 'propietario',
    sprint: 'Sprint 2',
    title: 'Aprobar abonos parciales o pagos completos calculando el saldo',
    everydayDescription: 'Confirmar el comprobante para que el sistema reste el abono automáticamente y diga si aún queda saldo pendiente o ya quedó en cero.',
    evolvesToStoryId: 'HU-11',
  },
  {
    stepId: 'Paso 5C',
    activityIndex: 5,
    roleId: 'inquilino',
    secondaryRoleId: 'administrador',
    sprint: 'Sprint 2',
    title: 'Generar y compartir el recibo digital de pago',
    everydayDescription: 'Emitir un comprobante limpio con número único apenas se valida el pago para descargarlo o mandarlo por WhatsApp.',
    evolvesToStoryId: 'HU-12',
  },
  {
    stepId: 'Paso 5D',
    activityIndex: 5,
    roleId: 'soporte',
    secondaryRoleId: 'administrador',
    sprint: 'Sprint 2',
    title: 'Explicar el motivo cuando un comprobante se devuelve y ver historial',
    everydayDescription: 'Si un comprobante es devuelto por el sistema o surge alguna discrepancia, registrar la justificación en bitácora y brindar acompañamiento al usuario.',
    evolvesToStoryId: 'HU-16',
  },

  // ACTIVIDAD 6: CONTROL
  {
    stepId: 'Paso 6A',
    activityIndex: 6,
    roleId: 'propietario',
    secondaryRoleId: 'administrador',
    sprint: 'Sprint 2',
    title: 'Ver con semáforo de colores (verde, amarillo y rojo) el estado de cada arriendo',
    everydayDescription: 'Distinguir al instante quién está al día (verde), quién está en sus primeros 5 días de plazo (amarillo) y quién pasó a mora (rojo).',
    evolvesToStoryId: 'HU-13',
  },
  {
    stepId: 'Paso 6B',
    activityIndex: 6,
    roleId: 'administrador',
    secondaryRoleId: 'propietario',
    sprint: 'Sprint 2',
    title: 'Mandar un recordatorio amable por WhatsApp con el saldo listo',
    everydayDescription: 'Abrir el chat del inquilino en un clic con un mensaje cordial que ya trae escrito el valor pendiente y la fecha de corte.',
    evolvesToStoryId: 'HU-14',
  },
];

// Épicas principales del proyecto
export const EPICS: EpicItem[] = [
  {
    id: 'EP-01',
    jiraKey: 'SCRUM-5',
    originActivityIndex: 1,
    name: 'Organización del inventario de inmuebles',
    primaryRoleId: 'propietario',
    supportingRoles: ['administrador'],
    asA: 'propietario o administrador',
    iWant: 'registrar y mantener organizadas las propiedades con su dirección, tipo de espacio, estado de ocupación e historial de valor mensual',
    soThat: 'sepamos siempre qué espacios están alquilados y cuáles disponibles sin depender de cuadernos tachados',
    humanExplanation:
      'Nace de la Actividad 1 del Story Map. Reúne todo lo relacionado con dar de alta los apartamentos o locales, saber si están libres u ocupados y guardar cómo ha cambiado el precio del arriendo año tras año.',
  },
  {
    id: 'EP-02',
    jiraKey: 'SCRUM-6',
    originActivityIndex: 2,
    name: 'Directorio de inquilinos, fiadores y actualización de contactos',
    primaryRoleId: 'administrador',
    supportingRoles: ['soporte', 'inquilino'],
    asA: 'administrador y equipo de soporte',
    iWant: 'registrar a cada inquilino con su documento, su WhatsApp, sus fiadores de respaldo y actualizar sus datos si cambian de número',
    soThat: 'podamos contactarlos sin perder números en el celular y el directorio se mantenga siempre al día',
    humanExplanation:
      'Nace de la Actividad 2 del Story Map. Agrupa el registro ordenado de las personas que participan en el arriendo y la actualización de sus datos de contacto.',
  },
  {
    id: 'EP-03',
    jiraKey: 'SCRUM-7',
    originActivityIndex: 3,
    name: 'Acuerdo y seguimiento de contratos de arriendo',
    primaryRoleId: 'administrador',
    supportingRoles: ['propietario', 'inquilino'],
    asA: 'administrador o propietario',
    iWant: 'crear contratos uniendo un inmueble libre con un inquilino, fijando el día de corte mensual (del 1 al 28) y recibiendo avisos antes de que terminen',
    soThat: 'quede claro qué día del mes debe pagar cada persona y renovemos los contratos a tiempo',
    humanExplanation:
      'Nace de la Actividad 3 del Story Map. Convierte el acuerdo verbal o en papel en un contrato activo dentro de Faroo con reglas claras para que no se arriende dos veces el mismo inmueble.',
  },
  {
    id: 'EP-04',
    jiraKey: 'SCRUM-9',
    originActivityIndex: 4,
    name: 'Emisión puntual y resumen mensual de cobros',
    primaryRoleId: 'administrador',
    supportingRoles: ['propietario', 'inquilino'],
    asA: 'administrador o propietario',
    iWant: 'que el cobro de cada mes se genere automáticamente cuando llega el día de corte pactado y ver el resumen de todo lo cobrado en el mes',
    soThat: 'no tengamos que acordarnos de cobrar de memoria ni sumar recibos sueltos a mano',
    humanExplanation:
      'Nace de la Actividad 4 del Story Map. Se encarga de que cada mes aparezca la obligación de pago puntual y de mostrar cuánto dinero se espera recaudar frente a lo que ya entró.',
  },
  {
    id: 'EP-05',
    jiraKey: 'SCRUM-10',
    originActivityIndex: 5,
    name: 'Pagos con foto de comprobante, abonos y recibo digital',
    primaryRoleId: 'inquilino',
    supportingRoles: ['administrador', 'propietario', 'soporte'],
    asA: 'inquilino, administrador o soporte',
    iWant: 'subir la foto de cada transferencia, aprobar abonos parciales o pagos totales (o devolver con explicación si la foto tiene error) y descargar el recibo de pago',
    soThat: 'ningún comprobante se pierda en WhatsApp, las cuentas de abonos cuadren al peso y el inquilino tenga su paz y salvo',
    humanExplanation:
      'Nace de la Actividad 5 del Story Map y es el corazón de Faroo: conecta al inquilino que sube su comprobante, al administrador que lo revisa y a soporte cuando hay que corregir un archivo mal subido.',
  },
  {
    id: 'EP-06',
    jiraKey: 'SCRUM-11',
    originActivityIndex: 6,
    name: 'Semáforo de cartera y recordatorios por WhatsApp',
    primaryRoleId: 'propietario',
    supportingRoles: ['administrador', 'soporte'],
    asA: 'propietario o administrador',
    iWant: 'ver en un tablero con colores (verde, amarillo y rojo) quién está al día o atrasado y enviar recordatorios cordiales por WhatsApp en un clic',
    soThat: 'detectemos cualquier atraso en menos de dos minutos sin llamadas incómodas ni revisiones manuales',
    humanExplanation:
      'Nace de la Actividad 6 del Story Map. Cierra el ciclo dándole al propietario y al administrador visibilidad inmediata del estado de todos sus inmuebles.',
  },
];

// Historias de usuario, tareas y criterios de aceptación
export const USER_STORIES: UserStoryItem[] = [
  {
    id: 'HU-01',
    jiraKey: 'SCRUM-2',
    epicId: 'EP-01',
    originStepId: 'Paso 1A',
    roleId: 'administrador',
    sprint: 'Sprint 1',
    storyPoints: 3,
    priorityLabel: 'Alta',
    assignee: 'David Machado',
    title: 'Registrar un inmueble con su dirección, tipo y valor mensual',
    asA: 'administrador (en nombre del propietario)',
    iWant: 'guardar cada propiedad indicando su dirección física, si es apartamento, casa o local y el valor base del arriendo',
    soThat: 'tengamos el inventario organizado desde el primer día sin apuntes sueltos en papel',
    everydayContext:
      'Evoluciona del Paso 1A de la Etapa 1. Cuando entra una propiedad nueva a administrarse, se anota una sola vez y arranca en estado "Disponible" lista para asociarse a un contrato.',
    moscowRef: 'Must Have (MOS-01)',
    backendRef: 'POST /api/properties',
    tasks: [
      {
        taskId: 'T-01.1',
        jiraSubtaskKey: 'SCRUM-29',
        title: 'Crear la tabla y reglas de inmuebles para guardar dirección, tipo, valor mensual y estado de ocupación',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-01.2',
        jiraSubtaskKey: 'SCRUM-30',
        title: 'Armar el formulario de registro de propiedad y verificar que no deje guardar valores en cero ni direcciones repetidas',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-01A',
        title: 'Guardar una propiedad completa',
        given: 'que el administrador escribe la dirección completa, elige el tipo de espacio y pone un valor mensual mayor a cero',
        when: 'presiona el botón para guardar el inmueble',
        then: 'la propiedad queda guardada con estado "Disponible" y aparece de inmediato en el listado general',
      },
      {
        id: 'VAL-01B',
        title: 'Evitar que se guarde dos veces la misma dirección',
        given: 'que ya existe un inmueble registrado con la misma dirección para ese propietario',
        when: 'alguien intenta guardarlo otra vez por equivocación',
        then: 'el sistema avisa que esa dirección ya está registrada y evita crear un duplicado',
      },
    ],
  },
  {
    id: 'HU-02',
    jiraKey: 'SCRUM-1',
    epicId: 'EP-01',
    originStepId: 'Paso 1B',
    roleId: 'propietario',
    sprint: 'Sprint 1',
    storyPoints: 2,
    priorityLabel: 'Alta',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Filtrar propiedades para ver cuáles están libres, ocupadas o en arreglo',
    asA: 'propietario',
    iWant: 'filtrar mi lista de inmuebles según su estado actual (disponible, ocupado o en mantenimiento)',
    soThat: 'sepa al instante qué apartamentos tengo vacíos para ofrecer en arriendo sin revisar carpetas físicas',
    everydayContext:
      'Evoluciona del Paso 1B de la Etapa 1. Cuando alguien llama a preguntar si hay un apartamento libre, el propietario filtra en un segundo.',
    moscowRef: 'Must Have (MOS-01)',
    backendRef: 'GET /api/properties · Dashboard',
    tasks: [
      {
        taskId: 'T-02.1',
        jiraSubtaskKey: 'SCRUM-31',
        title: 'Agregar el filtro por estado de ocupación y búsqueda rápida por nombre o dirección',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-02.2',
        jiraSubtaskKey: 'SCRUM-32',
        title: 'Diseñar los botones de filtro ("Todos", "Disponibles", "Ocupados") y las etiquetas de color en cada tarjeta',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-02.3',
        jiraSubtaskKey: 'SCRUM-33',
        title: 'Comprobar que al cambiar de filtro solo se muestren los inmuebles que corresponden',
        areaLabel: 'Revisión',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-02A',
        title: 'Ver únicamente los apartamentos libres',
        given: 'que hay 5 propiedades registradas (3 ya alquiladas y 2 libres)',
        when: 'el propietario toca el filtro "Disponibles"',
        then: 'la pantalla muestra únicamente las 2 propiedades libres con su valor mensual',
      },
      {
        id: 'VAL-02B',
        title: 'Buscar un apartamento por su número o barrio',
        given: 'que el propietario escribe "Apto 302" en el cuadro de búsqueda',
        when: 'la lista se actualiza al escribir',
        then: 'aparece directamente la tarjeta de ese apartamento sin recargar la página',
      },
    ],
  },
  {
    id: 'HU-03',
    jiraKey: 'SCRUM-21',
    epicId: 'EP-01',
    originStepId: 'Paso 1C',
    roleId: 'propietario',
    sprint: 'Sprint 2',
    storyPoints: 2,
    priorityLabel: 'Media',
    assignee: 'David Machado',
    title: 'Consultar el historial de aumentos anuales del arriendo',
    asA: 'propietario',
    iWant: 'guardar y consultar cómo ha cambiado el valor mensual de cada propiedad cuando se cumple un año de contrato',
    soThat: 'tenga claridad de cuánto se cobraba antes y qué porcentaje se ajustó en cada renovación anual',
    everydayContext:
      'Evoluciona del Paso 1C de la Etapa 1. En Colombia el arriendo suele ajustarse una vez al año; guardar esa historia evita discusiones sobre cuánto subió.',
    moscowRef: 'Could Have (MOS-13)',
    backendRef: 'Ficha Inmueble / Reajuste Ley 820',
    tasks: [
      {
        taskId: 'T-03.1',
        jiraSubtaskKey: 'SCRUM-23',
        title: 'Guardar cada cambio de canon con su valor anterior, el valor nuevo y la fecha en que empezó a regir',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-03.2',
        jiraSubtaskKey: 'SCRUM-24',
        title: 'Mostrar una línea de tiempo sencilla dentro de la ficha del inmueble con los valores por año',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-03A',
        title: 'Registrar el ajuste anual de un apartamento',
        given: 'que un apartamento tenía un arriendo de $1.200.000 y cumplió los 12 meses',
        when: 'se actualiza el valor a $1.300.000 indicando la fecha de inicio del nuevo año',
        then: 'queda guardado el nuevo valor y en el historial permanece visible el valor anterior de $1.200.000',
      },
    ],
  },
  {
    id: 'HU-04',
    jiraKey: 'SCRUM-8',
    epicId: 'EP-02',
    originStepId: 'Paso 2A',
    roleId: 'administrador',
    sprint: 'Sprint 1',
    storyPoints: 3,
    priorityLabel: 'Alta',
    assignee: 'David Machado',
    title: 'Registrar al inquilino con su documento de identidad y WhatsApp',
    asA: 'administrador',
    iWant: 'guardar los datos de cada inquilino con su nombre completo, cédula única y número de celular con WhatsApp',
    soThat: 'pueda asociarlo a su contrato y escribirle en un clic sin confundir nombres ni perder teléfonos',
    everydayContext:
      'Evoluciona del Paso 2A de la Etapa 1. Es la base para saber quién vive en cada propiedad y a qué número se le envían los recibos.',
    moscowRef: 'Must Have (MOS-01)',
    backendRef: 'POST /api/tenants',
    tasks: [
      {
        taskId: 'T-04.1',
        jiraSubtaskKey: 'SCRUM-34',
        title: 'Guardar la ficha del inquilino verificando que el número de cédula no esté repetido',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-04.2',
        jiraSubtaskKey: 'SCRUM-35',
        title: 'Construir la ventana para agregar inquilinos validando los 10 dígitos del celular',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-04.3',
        jiraSubtaskKey: 'SCRUM-36',
        title: 'Probar que si se intenta meter la misma cédula dos veces el sistema avise claramente',
        areaLabel: 'Revisión',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-04A',
        title: 'Registrar un inquilino nuevo correctamente',
        given: 'que el administrador ingresa nombre, número de documento y teléfono celular de 10 dígitos',
        when: 'guarda la ficha del inquilino',
        then: 'el inquilino aparece en el directorio listo para ser asignado a un contrato de arriendo',
      },
      {
        id: 'VAL-04B',
        title: 'Avisar si la cédula ya estaba registrada',
        given: 'que ya existe una persona con ese mismo documento en el directorio',
        when: 'se intenta crear otra ficha con la misma cédula',
        then: 'el sistema detiene el guardado y muestra que ese inquilino ya existe',
      },
    ],
  },
  {
    id: 'HU-05',
    jiraKey: 'SCRUM-22',
    epicId: 'EP-02',
    originStepId: 'Paso 2B',
    roleId: 'administrador',
    sprint: 'Sprint 1',
    storyPoints: 2,
    priorityLabel: 'Media',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Asociar hasta dos fiadores o deudores solidarios al inquilino',
    asA: 'administrador',
    iWant: 'anotar los datos de contacto de hasta dos fiadores dentro de la ficha del inquilino',
    soThat: 'el propietario tenga un respaldo claro a quién acudir si el titular se atrasa gravemente',
    everydayContext:
      'Evoluciona del Paso 2B de la Etapa 1. En vez de dejar la fotocopia de la cédula del fiador perdida en un cajón, sus datos quedan unidos al contrato.',
    moscowRef: 'Could Have (MOS-14)',
    backendRef: 'Contratos / Fiadores de respaldo',
    tasks: [
      {
        taskId: 'T-05.1',
        jiraSubtaskKey: 'SCRUM-43',
        title: 'Permitir asociar hasta 2 fiadores (nombre, cédula y celular) a cada inquilino titular',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-05.2',
        jiraSubtaskKey: 'SCRUM-44',
        title: 'Mostrar los fiadores como contactos de respaldo dentro del detalle del contrato',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-05A',
        title: 'Guardar los datos de un fiador',
        given: 'que el administrador está editando la ficha de un inquilino titular',
        when: 'agrega el nombre, cédula y teléfono del fiador',
        then: 'el fiador queda visible como respaldo del contrato activo',
      },
    ],
  },
  {
    id: 'HU-15',
    jiraKey: 'SCRUM-3',
    epicId: 'EP-02',
    originStepId: 'Paso 2C',
    roleId: 'soporte',
    sprint: 'Sprint 1',
    storyPoints: 3,
    priorityLabel: 'Alta',
    assignee: 'David Machado',
    title: 'Actualizar teléfono y datos de contacto del inquilino ante cambios de línea',
    asA: 'encargado de soporte (o administrador)',
    iWant: 'modificar el número de teléfono, WhatsApp o correo en la ficha del inquilino cuando este reporte un cambio de línea',
    soThat: 'no se pierda la comunicación de los cobros mensuales ni los recibos digitales y el directorio se mantenga al día',
    everydayContext:
      'Evoluciona del Paso 2C de la Etapa 1. Si un inquilino cambia de número celular o de correo, soporte o el administrador actualizan la ficha para que los avisos sigan llegando a la línea correcta.',
    moscowRef: 'Should Have (MOS-01 Soporte)',
    backendRef: 'PUT /api/tenants/{id}',
    tasks: [
      {
        taskId: 'T-15.1',
        jiraSubtaskKey: 'SCRUM-45',
        title: 'Crear la regla para actualizar el teléfono y correo del inquilino verificando el formato de 10 dígitos (PUT /api/tenants/{id})',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-15.2',
        jiraSubtaskKey: 'SCRUM-46',
        title: 'Diseñar la ventana de edición de contacto dentro de la ficha del inquilino con confirmación de cambio',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-15.3',
        jiraSubtaskKey: 'SCRUM-47',
        title: 'Comprobar que al guardar el nuevo número los avisos de WhatsApp apunten a la línea actualizada',
        areaLabel: 'Revisión',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-15A',
        title: 'Actualizar el celular de un inquilino',
        given: 'que un inquilino informa que cambió de número de celular',
        when: 'el encargado de soporte actualiza los 10 dígitos en la ficha del inquilino',
        then: 'el nuevo número queda guardado y los futuros recordatorios de cobro y recibos se envían a ese nuevo teléfono',
      },
    ],
  },
  {
    id: 'HU-06',
    jiraKey: 'SCRUM-12',
    epicId: 'EP-03',
    originStepId: 'Paso 3A',
    roleId: 'administrador',
    sprint: 'Sprint 1',
    storyPoints: 5,
    priorityLabel: 'Alta',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Crear un contrato fijando el día de pago mensual entre el 1 y el 28',
    asA: 'administrador',
    iWant: 'crear el contrato uniendo un inmueble disponible con un inquilino y eligiendo el día fijo de corte mensual (del 1 al 28)',
    soThat: 'el inmueble pase automáticamente a "Ocupado" y sepamos qué día exacto vence cada mes sin enredos en febrero',
    everydayContext:
      'Evoluciona del Paso 3A de la Etapa 1. Elegir un día entre el 1 y el 28 evita el problema clásico de los contratos fijados el día 30 o 31 cuando llega febrero.',
    moscowRef: 'Must Have (MOS-02)',
    backendRef: 'POST /api/contracts · Corte días 1-28',
    tasks: [
      {
        taskId: 'T-06.1',
        jiraSubtaskKey: 'SCRUM-37',
        title: 'Validar que el día de pago esté entre 1 y 28 y que un inmueble ocupado no se pueda alquilar dos veces al mismo tiempo',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-06.2',
        jiraSubtaskKey: 'SCRUM-38',
        title: 'Cambiar automáticamente el estado del inmueble de "Disponible" a "Ocupado" apenas se activa el contrato',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-06.3',
        jiraSubtaskKey: 'SCRUM-39',
        title: 'Construir el asistente paso a paso para elegir inmueble, inquilino, valor mensual y día de corte',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-06.4',
        jiraSubtaskKey: 'SCRUM-40',
        title: 'Probar el flujo completo desde que se crea el contrato hasta que el inmueble queda ocupado',
        areaLabel: 'Revisión',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-06A',
        title: 'Activar un contrato sobre un apartamento libre',
        given: 'que se elige un apartamento disponible, un inquilino registrado y el día 5 de cada mes como fecha de pago',
        when: 'el administrador confirma la creación del contrato',
        then: 'el contrato queda "Activo" y el apartamento pasa inmediatamente a estado "Ocupado"',
      },
      {
        id: 'VAL-06B',
        title: 'Impedir días de corte que no existen en todos los meses',
        given: 'que alguien intenta poner el día 31 como fecha de pago mensual',
        when: 'va a guardar el contrato',
        then: 'el formulario pide elegir un día del 1 al 28 para que funcione igual todos los meses del año',
      },
    ],
  },
  {
    id: 'HU-07',
    jiraKey: 'SCRUM-19',
    epicId: 'EP-03',
    originStepId: 'Paso 3B',
    roleId: 'administrador',
    sprint: 'Sprint 2',
    storyPoints: 2,
    priorityLabel: 'Media',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Recibir alerta preventiva 30 días antes de que venza un contrato',
    asA: 'administrador o propietario',
    iWant: 'ver un aviso claro cuando a un contrato le falten 30 días para cumplir su fecha final',
    soThat: 'alcancemos a acordar la renovación con el inquilino o preparar la entrega del inmueble con tiempo',
    everydayContext:
      'Evoluciona del Paso 3B de la Etapa 1. Evita que los contratos se venzan en silencio sin haber hablado antes con el inquilino.',
    moscowRef: 'Should Have (Preventivo)',
    backendRef: 'Dashboard · ExpiringContractsTable',
    tasks: [
      {
        taskId: 'T-07.1',
        jiraSubtaskKey: 'SCRUM-25',
        title: 'Calcular cuántos días faltan para la fecha final de cada contrato activo y marcar los de 30 días o menos',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-07.2',
        jiraSubtaskKey: 'SCRUM-26',
        title: 'Mostrar una etiqueta de aviso ("Próximo a vencer") en el listado de contratos',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-07A',
        title: 'Mostrar aviso cuando falta un mes para terminar',
        given: 'que un contrato tiene fecha de finalización dentro de 30 días',
        when: 'el administrador abre la vista de contratos',
        then: 'aparece resaltado en la sección de contratos por renovar',
      },
    ],
  },
  {
    id: 'HU-08',
    jiraKey: 'SCRUM-13',
    epicId: 'EP-04',
    originStepId: 'Paso 4A',
    roleId: 'administrador',
    sprint: 'Sprint 1',
    storyPoints: 3,
    priorityLabel: 'Alta',
    assignee: 'David Machado',
    title: 'Generar automáticamente el cobro mensual al llegar el día de corte',
    asA: 'administrador',
    iWant: 'que el cobro del mes se cree solo cuando llegue el día de pago pactado en cada contrato',
    soThat: 'el inquilino vea su cuenta a tiempo y no tengamos que crear cobros uno por uno de memoria',
    everydayContext:
      'Evoluciona del Paso 4A de la Etapa 1. Además, garantiza que para un mismo mes y contrato solo se cree un cobro, sin duplicados.',
    moscowRef: 'Must Have (MOS-03)',
    backendRef: 'POST /api/charges · Generación mensual',
    tasks: [
      {
        taskId: 'T-08.1',
        jiraSubtaskKey: 'SCRUM-41',
        title: 'Crear el generador mensual de cobros asegurando que nunca duplique el cobro del mismo mes',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-08.2',
        jiraSubtaskKey: 'SCRUM-42',
        title: 'Comprobar que el cobro nazca en estado "Pendiente" con el valor exacto del contrato',
        areaLabel: 'Revisión',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-08A',
        title: 'Emisión puntual sin duplicar cobros',
        given: 'que hoy es el día de corte de un contrato activo',
        when: 'se generan los cobros del periodo actual',
        then: 'se crea un único cobro en estado "Pendiente" para ese mes aunque el proceso se ejecute dos veces',
      },
    ],
  },
  {
    id: 'HU-09',
    jiraKey: 'SCRUM-20',
    epicId: 'EP-04',
    originStepId: 'Paso 4B',
    roleId: 'propietario',
    sprint: 'Sprint 1',
    storyPoints: 2,
    priorityLabel: 'Alta',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Consultar el resumen de cobros del mes y cuánto falta por recaudar',
    asA: 'propietario',
    iWant: 'ver en una sola pantalla el total que debía entrar este mes, cuánto ya pagaron y cuánto sigue pendiente',
    soThat: 'entienda en segundos cómo van mis ingresos del mes sin sumar con calculadora',
    everydayContext:
      'Evoluciona del Paso 4B de la Etapa 1. Le da tanto al propietario como al inquilino claridad sobre las cuentas vigentes del mes.',
    moscowRef: 'Must Have (MOS-06)',
    backendRef: 'DashboardWorkspace · KPIs recaudo y mora',
    tasks: [
      {
        taskId: 'T-09.1',
        jiraSubtaskKey: 'SCRUM-27',
        title: 'Sumar en tiempo real el total esperado del mes, lo recaudado y el saldo pendiente',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 1',
      },
      {
        taskId: 'T-09.2',
        jiraSubtaskKey: 'SCRUM-28',
        title: 'Mostrar las tarjetas superiores de resumen mensual y la lista filtrable por mes',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 1',
      },
    ],
    validations: [
      {
        id: 'VAL-09A',
        title: 'Cuadre inmediato de totales del mes',
        given: 'que en el mes hay cobros por $3.000.000 y ya se han aprobado pagos por $2.000.000',
        when: 'el propietario abre la sección de cobros del mes',
        then: 've claramente $3.000.000 esperados, $2.000.000 recibidos y $1.000.000 pendientes',
      },
    ],
  },
  {
    id: 'HU-10',
    jiraKey: 'SCRUM-14',
    epicId: 'EP-05',
    originStepId: 'Paso 5A',
    roleId: 'inquilino',
    sprint: 'Sprint 2',
    storyPoints: 5,
    priorityLabel: 'Alta',
    assignee: 'David Machado',
    title: 'Subir la foto o captura del comprobante de transferencia bancaria',
    asA: 'inquilino (o administrador al registrar el pago)',
    iWant: 'adjuntar la foto o captura de la transferencia (Nequi, Bancolombia o Daviplata) directamente al cobro del mes',
    soThat: 'mi pago quede respaldado con su imagen y no se pierda ni se use dos veces la misma foto por error',
    everydayContext:
      'Evoluciona del Paso 5A de la Etapa 1. Resuelve el dolor número uno del proyecto: las capturas de pago extraviadas en WhatsApp.',
    moscowRef: 'Must Have (MOS-04)',
    backendRef: 'POST /api/portal/charges/{id}/payments',
    tasks: [
      {
        taskId: 'T-10.1',
        jiraSubtaskKey: 'SCRUM-14A',
        title: 'Guardar la imagen del comprobante asociada al cobro verificando que el mismo archivo no se haya subido antes',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-10.2',
        jiraSubtaskKey: 'SCRUM-14B',
        title: 'Crear el cargador de imagen desde celular o computador con vista previa del comprobante',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-10A',
        title: 'Subir captura válida desde el celular',
        given: 'que el inquilino tiene un cobro pendiente y selecciona la foto de su transferencia en formato JPG, PNG o PDF',
        when: 'envía el comprobante con el valor transferido',
        then: 'la imagen queda guardada dentro del cobro lista para revisión',
      },
      {
        id: 'VAL-10B',
        title: 'Detectar si intentan subir la misma foto de un mes anterior',
        given: 'que esa misma imagen de comprobante ya fue usada en otro pago',
        when: 'se intenta cargar de nuevo',
        then: 'el sistema avisa que ese comprobante ya fue registrado antes y bloquea el duplicado',
      },
    ],
  },
  {
    id: 'HU-11',
    jiraKey: 'SCRUM-15',
    epicId: 'EP-05',
    originStepId: 'Paso 5B',
    roleId: 'administrador',
    sprint: 'Sprint 2',
    storyPoints: 5,
    priorityLabel: 'Alta',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Aprobar pagos totales o abonos parciales recalculando el saldo al instante',
    asA: 'administrador',
    iWant: 'revisar la foto del comprobante y aprobar el valor abonado para que el sistema descuente automáticamente lo pagado',
    soThat: 'cuando un inquilino pague en dos contados sepamos exactamente cuánto abonó y cuánto le falta sin errar en la resta',
    everydayContext:
      'Evoluciona del Paso 5B de la Etapa 1. Si el arriendo es de $900.000 y abonan $450.000, el estado pasa a "Abono parcial" con saldo de $450.000.',
    moscowRef: 'Must / Should (MOS-05 & MOS-07)',
    backendRef: 'POST /api/charges/{id}/payments/{pid}/confirm',
    tasks: [
      {
        taskId: 'T-11.1',
        jiraSubtaskKey: 'SCRUM-15A',
        title: 'Restar automáticamente cada abono aprobado del valor del cobro y actualizar el estado a "Abono parcial" o "Pagado"',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-11.2',
        jiraSubtaskKey: 'SCRUM-15B',
        title: 'Diseñar la vista donde el administrador ve la foto del recibo al lado del monto y confirma en un clic',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-11A',
        title: 'Registrar un abono de la mitad del arriendo',
        given: 'que el cobro del mes es de $800.000',
        when: 'el administrador aprueba un primer comprobante por $500.000',
        then: 'el cobro queda en estado "Abono parcial" y muestra claramente un saldo pendiente de $300.000',
      },
      {
        id: 'VAL-11B',
        title: 'Completar el pago total del mes',
        given: 'que quedaban $300.000 pendientes en ese cobro',
        when: 'se aprueba el segundo comprobante por los $300.000 restantes',
        then: 'el saldo queda en $0 y el cobro pasa automáticamente a estado "Pagado"',
      },
    ],
  },
  {
    id: 'HU-12',
    jiraKey: 'SCRUM-16',
    epicId: 'EP-05',
    originStepId: 'Paso 5C',
    roleId: 'inquilino',
    sprint: 'Sprint 2',
    storyPoints: 3,
    priorityLabel: 'Media',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Descargar y enviar el recibo digital de pago con código único',
    asA: 'inquilino (y administrador)',
    iWant: 'obtener un recibo digital de paz y salvo con número consecutivo único apenas se confirma el pago',
    soThat: 'tenga mi constancia formal de pago sin depender de talonarios de papel',
    everydayContext:
      'Evoluciona del Paso 5C de la Etapa 1. Le da tranquilidad al inquilino y respaldo formal al propietario.',
    moscowRef: 'Should Have (MOS-09)',
    backendRef: 'GET /api/documents · Recibo REC-2026',
    tasks: [
      {
        taskId: 'T-12.1',
        jiraSubtaskKey: 'SCRUM-16A',
        title: 'Generar el recibo con código consecutivo (REC-2026-XXXX), fecha, inmueble, valor pagado y saldo restante',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-12.2',
        jiraSubtaskKey: 'SCRUM-16B',
        title: 'Agregar vista imprimible del recibo y botón para compartirlo directo al WhatsApp del inquilino',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-12A',
        title: 'Generación inmediata del recibo al aprobar el pago',
        given: 'que un pago acaba de ser confirmado',
        when: 'el inquilino o administrador pulsa "Ver recibo"',
        then: 'se muestra el comprobante oficial con su código único listo para descargar o enviar por WhatsApp',
      },
    ],
  },
  {
    id: 'HU-16',
    jiraKey: 'SCRUM-23',
    epicId: 'EP-05',
    originStepId: 'Paso 5D',
    roleId: 'soporte',
    sprint: 'Sprint 2',
    storyPoints: 2,
    priorityLabel: 'Media',
    assignee: 'David Machado',
    title: 'Devolver comprobantes ilegibles indicando el motivo y consultar la bitácora',
    asA: 'encargado de soporte (o administrador)',
    iWant: 'dejar escrito el motivo claro cuando se rechaza una foto mal subida y consultar el historial de qué pasó con cada pago',
    soThat: 'el inquilino sepa exactamente qué corregir y podamos aclarar cualquier duda o reclamo en segundos',
    everydayContext:
      'Evoluciona del Paso 5D de la Etapa 1. Si un inquilino sube por equivocación la captura de otro pago o una imagen cortada, sabe por qué fue devuelta.',
    moscowRef: 'Should Have (MOS-10)',
    backendRef: 'POST /api/charges/{id}/payments/{pid}/reject',
    tasks: [
      {
        taskId: 'T-16.1',
        jiraSubtaskKey: 'SCRUM-25A',
        title: 'Exigir una nota explicativa al devolver un comprobante y guardar cada evento en la bitácora del contrato',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-16.2',
        jiraSubtaskKey: 'SCRUM-25B',
        title: 'Mostrar el motivo de devolución al inquilino para que pueda subir la foto corregida',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-16A',
        title: 'Devolución con explicación obligatoria',
        given: 'que el sistema o el administrador detecta un comprobante ilegible o con monto no coincidente',
        when: 'se marca como devuelta escribiendo "La imagen está recortada y no se ve la fecha"',
        then: 'el cobro sigue abierto, el inquilino ve ese mensaje claro y el evento queda anotado en la bitácora de soporte',
      },
    ],
  },
  {
    id: 'HU-13',
    jiraKey: 'SCRUM-17',
    epicId: 'EP-06',
    originStepId: 'Paso 6A',
    roleId: 'propietario',
    sprint: 'Sprint 2',
    storyPoints: 3,
    priorityLabel: 'Alta',
    assignee: 'David Machado',
    title: 'Ver el estado de todos los arriendos con semáforo de colores',
    asA: 'propietario',
    iWant: 'ver mis contratos clasificados con colores claros (verde, amarillo y rojo) según los días transcurridos desde la fecha de corte',
    soThat: 'identifique de un vistazo quién está al día, quién está en días de pago y quién tiene atraso sin revisar uno por uno',
    everydayContext:
      'Evoluciona del Paso 6A de la Etapa 1. Verde: al día; Amarillo: entre 1 y 5 días después del corte; Rojo: más de 5 días de atraso.',
    moscowRef: 'Should Have (MOS-08)',
    backendRef: 'GET /api/risk/traffic-light · Dashboard',
    tasks: [
      {
        taskId: 'T-13.1',
        jiraSubtaskKey: 'SCRUM-17A',
        title: 'Clasificar automáticamente cada contrato en Verde (al día), Amarillo (1 a 5 días) o Rojo (más de 5 días de atraso)',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-13.2',
        jiraSubtaskKey: 'SCRUM-17B',
        title: 'Construir el tablero visual con contadores por color y filtro rápido para ver solo los atrasados',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-13A',
        title: 'Cambio a color rojo cuando pasan más de 5 días del corte',
        given: 'que un arriendo tenía fecha de pago el día 5 y hoy es día 12 sin haberse registrado pago',
        when: 'el propietario abre su tablero principal',
        then: 'ese contrato aparece marcado en color rojo indicando los días de atraso y el valor pendiente',
      },
    ],
  },
  {
    id: 'HU-14',
    jiraKey: 'SCRUM-18',
    epicId: 'EP-06',
    originStepId: 'Paso 6B',
    roleId: 'administrador',
    sprint: 'Sprint 2',
    storyPoints: 3,
    priorityLabel: 'Media',
    assignee: 'Nikoll Sofia Isaza Rua',
    title: 'Enviar recordatorio cordial de pago por WhatsApp en un clic',
    asA: 'administrador',
    iWant: 'abrir el chat de WhatsApp del inquilino con un mensaje respetuoso que ya traiga escrito su nombre, el inmueble y el valor pendiente',
    soThat: 'hagamos seguimiento a los cobros de forma amable y rápida sin redactar el mismo texto veinte veces',
    everydayContext:
      'Evoluciona del Paso 6B de la Etapa 1. Usa el canal que ya todos tienen en su celular (WhatsApp) pero con los datos exactos calculados por Faroo.',
    moscowRef: 'Could Have (MOS-12)',
    backendRef: 'Dashboard · Botón WhatsApp waLink',
    tasks: [
      {
        taskId: 'T-14.1',
        jiraSubtaskKey: 'SCRUM-18A',
        title: 'Armar la plantilla del mensaje con el nombre del inquilino, dirección del inmueble, fecha de corte y saldo exacto',
        areaLabel: 'Regla y Datos',
        doneInSprint: 'Sprint 2',
      },
      {
        taskId: 'T-14.2',
        jiraSubtaskKey: 'SCRUM-18B',
        title: 'Conectar el botón de recordatorio directo a WhatsApp y anotar en la bitácora la fecha en que se envió el aviso',
        areaLabel: 'Pantalla',
        doneInSprint: 'Sprint 2',
      },
    ],
    validations: [
      {
        id: 'VAL-14A',
        title: 'Abrir mensaje listo para enviar al inquilino',
        given: 'que un contrato tiene un saldo pendiente de $450.000',
        when: 'el administrador hace clic en "Recordar por WhatsApp"',
        then: 'se abre la conversación con el teléfono del inquilino y el mensaje cordial con el saldo de $450.000 listo para enviar',
      },
    ],
  },
];
