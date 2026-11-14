export interface UmlDocItem {
  id: string; // 'cu-01'..'cu-16'
  huId: string; // 'HU-01'..'HU-16'
  epicName: string;
  name: string;
  actor: string;
  actorRole: 'propietario' | 'inquilino' | 'administrador' | 'soporte';
  casualToneDescription: string;
  preconditions: string[];
  postconditions: string[];
  uml: {
    primaryActor: string;
    secondaryActor?: string;
    secondaryType?: 'db' | 'storage' | 'external_api' | 'user';
    mainOval: string;
    includes: string[];
    extends: { name: string; point: string }[];
    businessNote: string;
  };
  flow: {
    trigger: string;
    userAction: string;
    apiCall: { method: 'GET' | 'POST' | 'PUT' | 'DELETE'; endpoint: string; payloadSummary: string };
    decision: { question: string; evaluation: string };
    yesPath: { action: string; responseCode: string; finalState: string };
    noPath: { action: string; responseCode: string; recoveryState: string };
  };
  prototype: {
    url: string;
    title: string;
    image: string;
    studentNotes: string;
    keyElements: { label: string; explanation: string }[];
  };
}

export const USE_CASE_DOCS: UmlDocItem[] = [
  {
    id: 'cu-01',
    huId: 'HU-01',
    epicName: 'Épica 1: Inmuebles',
    name: 'CU-01: Registro de Inmueble con Canon y Dirección Física',
    actor: 'Propietario / Administrador',
    actorRole: 'propietario',
    casualToneDescription:
      'Aquí el dueño o el admin registra una casa, apartamento o local en Faroo. Mete la dirección real con torre y apto, fija el valor mensual del arriendo en pesos y define estrato y área. Si la dirección no está repetida y el canon es válido, el inmueble queda guardado como "Disponible" listo para asociarle un contrato.',
    preconditions: [
      'Tener sesión iniciada con rol de Propietario o Administrador en la consola.',
      'Contar con la dirección física completa (con nomenclatura colombiana) y el valor del canon pactado mayor a $0.',
    ],
    postconditions: [
      'Inmueble persistido en la tabla Properties de PostgreSQL con estado inicial "Disponible".',
      'Generación automática de UUID único y visualización inmediata en el catálogo.',
    ],
    uml: {
      primaryActor: 'Propietario / Admin',
      secondaryActor: 'PostgreSQL Database',
      secondaryType: 'db',
      mainOval: 'CU-01: Registrar Inmueble',
      includes: ['Validar Dirección Única y Canon Base'],
      extends: [{ name: 'Cargar Fotos y Linderos', point: 'Punto de extensión: Si adjunta multimedia' }],
      businessNote: 'Regla de negocio: La dirección física debe ser única por propietario para evitar inmuebles duplicados.',
    },
    flow: {
      trigger: 'El usuario hace clic en el botón "+ Nuevo Inmueble" desde el catálogo.',
      userAction: 'Diligencia dirección, tipo de propiedad, estrato y el valor del canon mensual base.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/properties',
        payloadSummary: '{ address, propertyType, baseRent, stratum, areaM2 }',
      },
      decision: {
        question: '¿Dirección no existe previamente y Canon > 0?',
        evaluation: 'Valida unicidad en BD y que el monto sea un valor monetario positivo.',
      },
      yesPath: {
        action: 'Inserta registro en BD con estado "Disponible" y asigna UUID.',
        responseCode: 'HTTP 201 Created',
        finalState: 'Inmueble visible en catálogo listo para arrendar.',
      },
      noPath: {
        action: 'Muestra mensaje en rojo: "Esta dirección ya fue registrada" o "Canon inválido".',
        responseCode: 'HTTP 400 / 409 Conflict',
        recoveryState: 'Formulario retenido para que el usuario corrija los campos.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/properties/new',
      title: 'Módulo de Inmuebles: Formulario de Alta de Propiedad',
      image: '/screenshots/cu-01.png',
      studentNotes:
        'En esta pantalla armamos un formulario a dos columnas. A la izquierda los inputs con validación en tiempo real y a la derecha una tarjeta que se actualiza sola para que el propietario vea de una vez cómo va a quedar en el catálogo.',
      keyElements: [
        { label: 'Dirección Exacta', explanation: 'Campo obligatorio con validación de no duplicidad.' },
        { label: 'Canon Mensual', explanation: 'Monto formateado en pesos colombianos ($ COP).' },
        { label: 'Tarjeta Live Preview', explanation: 'Previsualización reactiva de la tarjeta del inmueble.' },
      ],
    },
  },
  {
    id: 'cu-02',
    huId: 'HU-02',
    epicName: 'Épica 1: Inmuebles',
    name: 'CU-02: Catálogo y Filtro de Propiedades por Ocupación',
    actor: 'Propietario / Administrador',
    actorRole: 'propietario',
    casualToneDescription:
      'Es la pantalla principal del catálogo. Muestra todas las propiedades en tarjetas organizadas y permite filtrar con un solo toque entre las que están disponibles, las que ya están arrendadas y las que están en mantenimiento, o buscar por texto si uno tiene muchos inmuebles.',
    preconditions: [
      'Usuario autenticado en la plataforma.',
      'Tener al menos una propiedad dada de alta en el sistema.',
    ],
    postconditions: [
      'Grid de propiedades renderizado según el filtro seleccionado en memoria/URL.',
      'Contadores numéricos de estado (Disponibles, Arrendadas, Mantenimiento) actualizados.',
    ],
    uml: {
      primaryActor: 'Propietario / Admin',
      secondaryActor: 'Motor de Búsqueda / BD',
      secondaryType: 'db',
      mainOval: 'CU-02: Consultar Catálogo',
      includes: ['Listar Inventario Activo'],
      extends: [{ name: 'Filtrar por Disponibilidad / Texto', point: 'Punto de extensión: Selección de pastilla de filtro' }],
      businessNote: 'Muestra badges con colores estándar: Verde para Disponible, Azul para Arrendado y Ámbar para Mantenimiento.',
    },
    flow: {
      trigger: 'El usuario ingresa a la pestaña "Inmuebles" en la barra lateral.',
      userAction: 'Selecciona una pastilla de filtro (e.g. "Disponibles") o escribe en el buscador.',
      apiCall: {
        method: 'GET',
        endpoint: '/api/properties?status=available&search=...',
        payloadSummary: 'Parámetros de consulta en URL',
      },
      decision: {
        question: '¿Existen inmuebles que cumplan con el criterio?',
        evaluation: 'Verifica si la consulta retorna al menos 1 resultado en la base de datos.',
      },
      yesPath: {
        action: 'Renderiza la cuadrícula de tarjetas con foto, canon, dirección y estado.',
        responseCode: 'HTTP 200 OK',
        finalState: 'Listado filtrado desplegado en pantalla.',
      },
      noPath: {
        action: 'Muestra componente Empty State con mensaje amigable y botón de limpiar filtros.',
        responseCode: 'HTTP 200 OK (Array vacío)',
        recoveryState: 'Vista limpia invitando a registrar nuevo inmueble o cambiar filtro.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/properties',
      title: 'Catálogo de Inmuebles: Listado General con Filtros',
      image: '/screenshots/cu-02.png',
      studentNotes:
        'Pusimos los botones de filtro rápido arriba con contadores automáticos para que con un solo clic el dueño sepa cuántas casas tiene desocupadas sin tener que ponerse a contar una por una.',
      keyElements: [
        { label: 'Píldoras de Filtro', explanation: 'Todos, Disponibles, Arrendados y Mantenimiento.' },
        { label: 'Buscador Instantáneo', explanation: 'Filtra por dirección, barrio o inquilino asignado.' },
        { label: 'Badges de Estado', explanation: 'Identificación visual inmediata por código de color.' },
      ],
    },
  },
  {
    id: 'cu-03',
    huId: 'HU-03',
    epicName: 'Épica 1: Inmuebles',
    name: 'CU-03: Ficha Técnica Detallada e Historial del Inmueble',
    actor: 'Propietario / Administrador',
    actorRole: 'propietario',
    casualToneDescription:
      'Al hacer clic en cualquier propiedad se abre su expediente completo. Aquí se ven las características físicas (área, cuartos, matrícula inmobiliaria), quién es el inquilino que está viviendo ahí en este momento con su teléfono, y la lista de todos los contratos anteriores con sus respectivos cánones.',
    preconditions: [
      'Inmueble existente en el catálogo con identificador GUID válido.',
    ],
    postconditions: [
      'Expediente completo desplegado en pantalla con histórico de ocupación.',
    ],
    uml: {
      primaryActor: 'Propietario / Admin',
      secondaryActor: 'Bóveda de Contratos / BD',
      secondaryType: 'db',
      mainOval: 'CU-03: Ver Ficha Técnica',
      includes: ['Consultar Historial de Contratos'],
      extends: [{ name: 'Descargar Copia de Contrato Vigente', point: 'Punto de extensión: Clic en botón de contrato' }],
      businessNote: 'Si la propiedad no tiene contrato vigente, oculta el panel de inquilino y muestra botón para radicar contrato.',
    },
    flow: {
      trigger: 'El usuario hace clic sobre la tarjeta de un inmueble en el catálogo.',
      userAction: 'Navega a la ruta detallada del inmueble.',
      apiCall: {
        method: 'GET',
        endpoint: '/api/properties/{id}',
        payloadSummary: 'Include: contracts, currentTenant, photos',
      },
      decision: {
        question: '¿El inmueble tiene contrato actualmente activo?',
        evaluation: 'Revisa si existe un registro en tabla Contracts con status = "Active".',
      },
      yesPath: {
        action: 'Carga ficha técnica + tarjeta destacada del inquilino titular con fecha de corte y WhatsApp.',
        responseCode: 'HTTP 200 OK',
        finalState: 'Expediente completo visible con trazabilidad contractual.',
      },
      noPath: {
        action: 'Carga ficha física con banner: "Inmueble disponible · Sin contrato activo".',
        responseCode: 'HTTP 200 OK',
        recoveryState: 'Habilita botón directo para radicar nuevo contrato.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/properties/inm-002',
      title: 'Ficha Técnica: Expediente de la Propiedad e Historial',
      image: '/screenshots/cu-03.png',
      studentNotes:
        'Separamos la vista en dos bloques: a la izquierda los datos de la casa o apartamento y la tabla de contratos pasados, y a la derecha los datos de contacto directo del inquilino que está viviendo ahí.',
      keyElements: [
        { label: 'Cabecera de Inmueble', explanation: 'Dirección, canon pactado, área y matrícula inmobiliaria.' },
        { label: 'Tarjeta de Inquilino', explanation: 'Nombre, cédula, WhatsApp y día fijo de corte mensual.' },
        { label: 'Historial de Contratos', explanation: 'Tabla cronológica de vigencias y cánones cobrados.' },
      ],
    },
  },
  {
    id: 'cu-04',
    huId: 'HU-04',
    epicName: 'Épica 2: Inquilinos',
    name: 'CU-04: Registro y Validación de Identidad del Inquilino',
    actor: 'Administrador',
    actorRole: 'administrador',
    casualToneDescription:
      'Registra al arrendatario titular en la base de datos con su cédula de ciudadanía, nombres, celular y correo electrónico. Faroo revisa que la cédula no esté metida dos veces y le crea su perfil para que luego pueda entrar al portal a subir los pagos y recibir avisos.',
    preconditions: [
      'Usuario con rol de Administrador autenticado.',
      'Cédula de ciudadanía física o digital del arrendatario verificada.',
    ],
    postconditions: [
      'Inquilino guardado en tabla Tenants con UUID único.',
      'Habilitación de acceso al portal y directorio de contactos.',
    ],
    uml: {
      primaryActor: 'Administrador',
      secondaryActor: 'Servicio de Cédulas / BD',
      secondaryType: 'db',
      mainOval: 'CU-04: Registrar Inquilino',
      includes: ['Validar Formato de Cédula y Unicidad'],
      extends: [{ name: 'CU-05: Asignar Fiador Solidario', point: 'Punto de extensión: Si el contrato exige fiador' }],
      businessNote: 'La cédula colombiana es la llave primaria de identidad del inquilino y no puede duplicarse.',
    },
    flow: {
      trigger: 'El administrador entra a Inquilinos y presiona "+ Nuevo Inquilino".',
      userAction: 'Digita nombre, apellidos, número de cédula, celular y correo.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/tenants',
        payloadSummary: '{ fullName, nationalId, phone, email }',
      },
      decision: {
        question: '¿Cédula válida y no registrada previamente en Faroo?',
        evaluation: 'Verifica que no exista otro registro con ese mismo número de documento.',
      },
      yesPath: {
        action: 'Crea el perfil del inquilino en BD y devuelve confirmación exitosa.',
        responseCode: 'HTTP 201 Created',
        finalState: 'Inquilino listo en el directorio para vincular a contrato.',
      },
      noPath: {
        action: 'Devuelve error 409 Conflict: "Inquilino con esta cédula ya existe".',
        responseCode: 'HTTP 409 Conflict',
        recoveryState: 'Resalta el campo de documento y ofrece abrir el perfil existente.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/tenants/new',
      title: 'Directorio de Inquilinos: Formulario de Registro',
      image: '/screenshots/cu-04.png',
      studentNotes:
        'Hicimos este formulario muy sencillo pero con validación en caliente: apenas uno termina de escribir la cédula, el sistema chequea que esté bien formateada y que no esté ya registrada en otro contrato.',
      keyElements: [
        { label: 'Cédula de Ciudadanía', explanation: 'Documento único con chequeo anti-duplicado en BD.' },
        { label: 'Celular con WhatsApp', explanation: 'Teléfono validado para envío de comprobantes y recordatorios.' },
        { label: 'Correo Oficial', explanation: 'Destino automático de los recibos de pago en PDF.' },
      ],
    },
  },
  {
    id: 'cu-05',
    huId: 'HU-05',
    epicName: 'Épica 2: Inquilinos',
    name: 'CU-05: Incorporación de Fiador / Codeudor Solidario',
    actor: 'Administrador',
    actorRole: 'administrador',
    casualToneDescription:
      'Asocia a una persona como fiador o codeudor solidario del contrato, tal como lo exige la Ley 820 en Colombia. Se registran sus datos, su parentesco y se adjuntan los extractos bancarios o certificados de ingresos que demuestren que sí puede responder si el titular no paga.',
    preconditions: [
      'Inquilino titular previamente registrado en Faroo.',
      'Datos del fiador disponibles (cédula diferente a la del inquilino y soporte de ingresos).',
    ],
    postconditions: [
      'Registro en tabla ContractGuarantors vinculando al fiador como responsable solidario.',
      'Soporte de ingresos almacenado en el almacenamiento seguro de Faroo.',
    ],
    uml: {
      primaryActor: 'Administrador',
      secondaryActor: 'Bóveda Documental R2 / S3',
      secondaryType: 'storage',
      mainOval: 'CU-05: Asignar Fiador Solidario',
      includes: ['Validar Documento y Parentesco'],
      extends: [{ name: 'Adjuntar Extractos de Ingresos (PDF)', point: 'Punto de extensión: Carga de archivo' }],
      businessNote: 'El fiador no puede ser la misma persona que el inquilino titular (cédulas obligatoriamente distintas).',
    },
    flow: {
      trigger: 'El administrador hace clic en "Agregar Fiador" en el contrato o inquilino.',
      userAction: 'Ingresa nombres, cédula, teléfono, parentesco y adjunta el PDF de extractos.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/contracts/{id}/guarantors',
        payloadSummary: '{ fullName, nationalId, phone, relationship, incomeSupportUrl }',
      },
      decision: {
        question: '¿Cédula del fiador es diferente a la del inquilino titular?',
        evaluation: 'Comprueba que no sea el mismo documento del arrendatario principal.',
      },
      yesPath: {
        action: 'Guarda relación de codeudor solidario en BD y almacena el archivo.',
        responseCode: 'HTTP 201 Created',
        finalState: 'Contrato respaldado legalmente con fiador activo.',
      },
      noPath: {
        action: 'Rechaza la solicitud: "El titular no puede ser su propio fiador".',
        responseCode: 'HTTP 422 Unprocessable Entity',
        recoveryState: 'Mantiene modal abierto solicitando datos de un tercero válido.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/contracts/new/guarantor',
      title: 'Contratos: Asignación de Fiador y Codeudor Solidario',
      image: '/screenshots/cu-05.png',
      studentNotes:
        'Aquí dejamos un espacio claro para subir los extractos bancarios del fiador en PDF. El sistema valida de inmediato que el documento sea de un tercero y muestra la pastilla de garantía activa.',
      keyElements: [
        { label: 'Datos del Fiador', explanation: 'Nombre, cédula y relación o parentesco con el titular.' },
        { label: 'Soporte de Ingresos', explanation: 'Archivo PDF adjunto con verificación administrativa.' },
        { label: 'Cláusula Solidaria', explanation: 'Vínculo jurídico conforme a la Ley 820 de 2003.' },
      ],
    },
  },
  {
    id: 'cu-06',
    huId: 'HU-06',
    epicName: 'Épica 3: Contratos',
    name: 'CU-06: Radicación de Contrato con Día Fijo de Corte',
    actor: 'Administrador',
    actorRole: 'administrador',
    casualToneDescription:
      'Aquí es donde se formaliza el arriendo: se junta una casa o apartamento desocupado con el inquilino titular. Se define la fecha de inicio, la duración en meses y un día fijo de corte mensual (obligatoriamente del 1 al 28 para que en febrero no haya líos con fechas que no existen). Al radicarse, el inmueble pasa a "Arrendado" automáticamente.',
    preconditions: [
      'Inmueble en estado "Disponible" sin contratos vigentes que se traslapen.',
      'Inquilino registrado y activo en el directorio.',
      'Día fijo de corte mensual seleccionado entre 1 y 28.',
    ],
    postconditions: [
      'Contrato creado en estado "Activo" en la tabla Contracts.',
      'Inmueble cambia automáticamente de estado "Disponible" a "Arrendado".',
      'Programación del ciclo de cobros mensuales recurrentes.',
    ],
    uml: {
      primaryActor: 'Administrador',
      secondaryActor: 'Cron Scheduler / Cobros',
      secondaryType: 'external_api',
      mainOval: 'CU-06: Radicar Contrato',
      includes: ['Verificar Disponibilidad sin Traslape', 'Fijar Día de Corte (1..28)'],
      extends: [{ name: 'CU-07: Evaluar Riesgo Contractual', point: 'Punto de extensión: Previo a formalización' }],
      businessNote: 'Se restringe el día de corte al rango 1-28 para garantizar recurrencia en todos los meses del año.',
    },
    flow: {
      trigger: 'El administrador abre el asistente de radicación desde "Contratos".',
      userAction: 'Selecciona inmueble disponible, inquilino, canon, duración y día de corte.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/contracts',
        payloadSummary: '{ propertyId, tenantId, startDate, durationMonths, billingDay, monthlyRent }',
      },
      decision: {
        question: '¿Inmueble 100% disponible y día de corte entre 1 y 28?',
        evaluation: 'Valida que no haya contratos activos vigentes sobre esa propiedad.',
      },
      yesPath: {
        action: 'Crea contrato activo, pasa inmueble a "Arrendado" y programa el cron.',
        responseCode: 'HTTP 201 Created',
        finalState: 'Contrato formalizado y ciclo de cobros iniciado.',
      },
      noPath: {
        action: 'Alerta: "El inmueble ya cuenta con contrato vigente" o "Día fuera de rango".',
        responseCode: 'HTTP 409 Conflict / 400 Bad Request',
        recoveryState: 'Bloquea guardado y resalta las fechas o inmueble en conflicto.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/contracts/new',
      title: 'Módulo de Contratos: Asistente de Radicación y Día de Pago',
      image: '/screenshots/cu-06.png',
      studentNotes:
        'Diseñamos un asistente limpio donde el admin escoge la casa y el arrendatario en un dropdown. Al fijar el día de corte (ejemplo: día 05), el sistema ya sabe qué día exacto debe emitir el cobro cada mes.',
      keyElements: [
        { label: 'Selector de Inmueble', explanation: 'Solo muestra propiedades en estado "Disponible".' },
        { label: 'Día de Corte (1..28)', explanation: 'Campo restringido para garantizar recurrencia uniforme.' },
        { label: 'Canon Mensual Pactado', explanation: 'Monto oficial que regirá las obligaciones mensuales.' },
      ],
    },
  },
  {
    id: 'cu-07',
    huId: 'HU-07',
    epicName: 'Épica 3: Contratos',
    name: 'CU-07: Consulta y Evaluación de Riesgo Contractual',
    actor: 'Administrador / Propietario',
    actorRole: 'administrador',
    casualToneDescription:
      'Calcula un puntaje del 0 al 100 para saber qué tan seguro es arrendarle a ese inquilino. Compara los ingresos demostrados (inquilino + fiador) contra el valor del arriendo (la regla de oro es que ganen al menos 3 veces el canon) y revisa si ha tenido moras antes, para que el dueño no se lleve sorpresas.',
    preconditions: [
      'Contrato en borrador o activo con inquilino asignado.',
      'Ingresos certificados del inquilino y fiador registrados.',
    ],
    postconditions: [
      'Score de riesgo calculado y dictamen guardado en tabla RiskEvaluations.',
    ],
    uml: {
      primaryActor: 'Admin / Propietario',
      secondaryActor: 'Motor de Scoring / BD',
      secondaryType: 'db',
      mainOval: 'CU-07: Evaluar Riesgo',
      includes: ['Ponderar Ingresos vs Canon', 'Verificar Historial de Pagos'],
      extends: [],
      businessNote: 'Score >= 70 clasifica en Riesgo Bajo; entre 50-69 Riesgo Moderado; menor a 50 Riesgo Alto.',
    },
    flow: {
      trigger: 'El usuario solicita la evaluación de riesgo desde la ficha del contrato.',
      userAction: 'Presiona "Calcular Scoring de Riesgo".',
      apiCall: {
        method: 'GET',
        endpoint: '/api/risk/contracts/{id}',
        payloadSummary: 'Calcula sobre ingresos, fiadores y moras históricas',
      },
      decision: {
        question: '¿Score ponderado >= 70 puntos?',
        evaluation: 'Verifica relación ingresos/canon >= 3.0x y fiador validado.',
      },
      yesPath: {
        action: 'Emite dictamen verde: "Riesgo Bajo · Aprobación Recomendada".',
        responseCode: 'HTTP 200 OK',
        finalState: 'Reporte de riesgo favorable registrado en el contrato.',
      },
      noPath: {
        action: 'Emite advertencia amarilla o roja: "Riesgo Moderado/Alto · Requiere garantía adicional".',
        responseCode: 'HTTP 200 OK (Score < 70)',
        recoveryState: 'Recomienda solicitar fiador adicional o depósito de respaldo.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/contracts/ctr-089/risk',
      title: 'Módulo de Riesgo: Tablero de Scoring Contractual',
      image: '/screenshots/cu-07.png',
      studentNotes:
        'En este panel mostramos el puntaje en grande (ejemplo: 84/100) y explicamos en palabras sencillas por qué sacó esa nota: ingresos demostrados de 3.4 veces el canon, fiador al día y sin atrasos anteriores.',
      keyElements: [
        { label: 'Puntaje 0-100', explanation: 'Indicador numérico con código de color visual.' },
        { label: 'Capacidad de Pago', explanation: 'Comparativa clara entre ingresos certificados y el canon.' },
        { label: 'Factores Evaluados', explanation: 'Checklist de solvencia, fiador y comportamiento pasado.' },
      ],
    },
  },
  {
    id: 'cu-08',
    huId: 'HU-08',
    epicName: 'Épica 4: Cobros',
    name: 'CU-08: Emisión Puntual de Cobro Mensual Recurrente',
    actor: 'Sistema Automático (Cron) / Administrador',
    actorRole: 'administrador',
    casualToneDescription:
      'Cada vez que llega el día de corte fijado en el contrato (o cuando el admin le da al botón de emitir), el sistema genera la obligación de cobro del mes. Le pone fecha de vencimiento a 5 días y le habilita de una vez el botón de pago al inquilino en su portal para que sepa cuánto tiene que transferir.',
    preconditions: [
      'Contrato en estado "Activo".',
      'Fecha actual correspondiente al día de corte del contrato.',
    ],
    postconditions: [
      'Registro de cobro creado en tabla Charges con estado inicial "Pendiente".',
      'Habilitación del botón para subir comprobante en el portal del inquilino.',
    ],
    uml: {
      primaryActor: 'Cron Nocturno / Admin',
      secondaryActor: 'Inquilino (Notificado)',
      secondaryType: 'user',
      mainOval: 'CU-08: Generar Cobro Mensual',
      includes: ['Calcular Saldo y Fecha Límite'],
      extends: [{ name: 'Notificar Cobro al Inquilino', point: 'Punto de extensión: Cobro emitido con éxito' }],
      businessNote: 'Mecanismo anti-duplicados: Solo se permite un cobro por contrato en el mismo período (YYYY-MM).',
    },
    flow: {
      trigger: 'El cron nocturno (a las 00:05) o el admin pulsa "Emitir Facturación del Período".',
      userAction: 'Inicia el proceso para los contratos con corte en la fecha.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/charges/batch',
        payloadSummary: '{ period: "2026-10", cutOffDay: 5 }',
      },
      decision: {
        question: '¿El cobro de este mes ya fue generado previamente?',
        evaluation: 'Verifica si ya existe registro para contractId y período YYYY-MM.',
      },
      yesPath: {
        action: 'Omite la creación para evitar duplicidad y registra en el log.',
        responseCode: 'HTTP 200 OK (Skip duplicate)',
        finalState: 'Sin cobros duplicados en la base de datos.',
      },
      noPath: {
        action: 'Inserta cobro en estado "Pendiente" con saldo igual al canon y fecha límite.',
        responseCode: 'HTTP 201 Created',
        recoveryState: 'Obligación disponible en el portal del inquilino.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/charges/issue',
      title: 'Módulo de Cobros: Emisión Mensual de Facturación',
      image: '/screenshots/cu-08.png',
      studentNotes:
        'Esta vista le permite al administrador ver de un vistazo qué cobros se van a disparar hoy según el día de corte y el valor de cada arriendo, con botón para emitir el lote completo en un segundo.',
      keyElements: [
        { label: 'Período Fiscal', explanation: 'Mes y año correspondiente a la facturación emitida.' },
        { label: 'Listado por Contrato', explanation: 'Inmueble, inquilino, día de corte y valor exacto.' },
        { label: 'Estado del Cobro', explanation: 'Pendiente, programado o conciliado.' },
      ],
    },
  },
  {
    id: 'cu-09',
    huId: 'HU-09',
    epicName: 'Épica 4: Cobros',
    name: 'CU-09: Consulta de Resumen Financiero y Cartera Consolidada',
    actor: 'Propietario / Administrador',
    actorRole: 'propietario',
    casualToneDescription:
      'Es el tablero de plata de Faroo. En tres tarjetas gigantes le dice al dueño: cuánta plata ya entró al banco este mes, cuánta plata falta todavía por cobrar y qué porcentaje de los contratos va al día, junto con una gráfica de barras que compara los últimos meses.',
    preconditions: [
      'Usuario autenticado en la plataforma con permisos sobre los inmuebles.',
    ],
    postconditions: [
      'Cifras consolidadas de recaudo y cartera calculadas al instante.',
    ],
    uml: {
      primaryActor: 'Propietario / Admin',
      secondaryActor: 'Módulo Contable / BD',
      secondaryType: 'db',
      mainOval: 'CU-09: Resumen Financiero',
      includes: ['Consolidar Recaudado vs Cartera Pendiente'],
      extends: [{ name: 'Exportar Reporte Contable a Excel', point: 'Punto de extensión: Clic en exportar' }],
      businessNote: 'Calcula sobre cobros pagados y pendientes del período fiscal seleccionado.',
    },
    flow: {
      trigger: 'El usuario hace clic en "Resumen Financiero" en el menú de Cobros.',
      userAction: 'Selecciona el mes a consultar.',
      apiCall: {
        method: 'GET',
        endpoint: '/api/charges/summary?period=2026-10',
        payloadSummary: 'Parámetro de mes y año',
      },
      decision: {
        question: '¿Existen movimientos financieros en el período?',
        evaluation: 'Revisa si hay cobros emitidos o conciliados en ese mes.',
      },
      yesPath: {
        action: 'Calcula totales de recaudo, cartera pendiente, % de cumplimiento y arma la gráfica.',
        responseCode: 'HTTP 200 OK',
        finalState: 'Tablero financiero desplegado con métricas claras.',
      },
      noPath: {
        action: 'Muestra tarjetas en $0 con mensaje de período sin movimientos.',
        responseCode: 'HTTP 200 OK (Cero registros)',
        recoveryState: 'Vista limpia lista para cuando se emitan cobros.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/charges/summary',
      title: 'Módulo de Cobros: Tablero de Resumen Financiero',
      image: '/screenshots/cu-09.png',
      studentNotes:
        'Pusimos los tres datos que cualquier dueño de finca raíz quiere saber apenas se levanta: cuánta plata le ha entrado ($11.600.000), cuánta le deben ($2.900.000) y cuántos inquilinos van al día.',
      keyElements: [
        { label: 'Total Recaudado', explanation: 'Dinero real verificado y conciliado en banco.' },
        { label: 'Cartera Pendiente', explanation: 'Monto de cánones pendientes por pagar este mes.' },
        { label: 'Gráfico Histórico', explanation: 'Comparativa visual del recaudo mes a mes.' },
      ],
    },
  },
  {
    id: 'cu-10',
    huId: 'HU-10',
    epicName: 'Épica 5: Pagos',
    name: 'CU-10: Carga de Comprobante de Pago Bancario con Foto',
    actor: 'Inquilino',
    actorRole: 'inquilino',
    casualToneDescription:
      'El inquilino entra a su portal desde el celular, ve su cobro del mes y le toma foto al pantallazo de la transferencia de Nequi, Daviplata o Bancolombia. El sistema le calcula un código hash SHA-256 a la foto para asegurarse de que nadie suba dos veces el mismo pantallazo viejo, y la deja en revisión.',
    preconditions: [
      'Inquilino con sesión activa en su portal.',
      'Contrato con cobro pendiente emitido.',
      'Archivo de imagen en formato JPG o PNG (máximo 5 MB).',
    ],
    postconditions: [
      'Foto guardada en almacenamiento Cloudflare R2 con hash anti-duplicado.',
      'Registro de pago creado en estado "En revisión" en tabla Payments.',
    ],
    uml: {
      primaryActor: 'Inquilino',
      secondaryActor: 'Cloudflare R2 Storage',
      secondaryType: 'storage',
      mainOval: 'CU-10: Subir Comprobante Foto',
      includes: ['Validar Formato JPG/PNG (≤5MB)', 'Calcular Hash SHA-256 Anti-duplicado'],
      extends: [],
      businessNote: 'Si el hash SHA-256 ya existe en el sistema, rechaza la carga para evitar fraudes con comprobantes viejos.',
    },
    flow: {
      trigger: 'El inquilino abre su portal y presiona "Subir Comprobante de Pago".',
      userAction: 'Selecciona la captura de su transferencia de Nequi/Bancolombia.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/portal/charges/{id}/payments',
        payloadSummary: 'Multipart: file, sha256Hash, bankReference',
      },
      decision: {
        question: '¿Archivo válido (≤ 5MB) y Hash SHA-256 no repetido?',
        evaluation: 'Valida peso, formato de imagen y unicidad criptográfica del comprobante.',
      },
      yesPath: {
        action: 'Guarda archivo en R2, registra en BD con estado "En revisión" y avisa al admin.',
        responseCode: 'HTTP 201 Created',
        finalState: 'Comprobante radicado en espera de conciliación.',
      },
      noPath: {
        action: 'Alerta: "Este comprobante ya fue utilizado anteriormente" o "Archivo superior a 5MB".',
        responseCode: 'HTTP 400 Bad Request / 409 Conflict',
        recoveryState: 'Rechaza la carga y pide subir la foto correcta.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/portal/pagos/subir',
      title: 'Portal del Inquilino: Carga de Comprobante de Pago',
      image: '/screenshots/cu-10.png',
      studentNotes:
        'Hicimos este portal optimizado para celular: el inquilino abre el link desde el WhatsApp, ve cuánto debe, le da al botón de la cámara y monta la captura de su Nequi en 5 segundos sin pedirle contraseñas raras.',
      keyElements: [
        { label: 'Saldo Pendiente', explanation: 'Valor exacto del arriendo y fecha límite.' },
        { label: 'Carga de Imagen', explanation: 'Zona drag & drop o acceso directo a cámara del celular.' },
        { label: 'Hash Anti-duplicado', explanation: 'Seguridad criptográfica SHA-256 visible para trazabilidad.' },
      ],
    },
  },
  {
    id: 'cu-11',
    huId: 'HU-11',
    epicName: 'Épica 5: Pagos',
    name: 'CU-11: Conciliación de Pagos y Aprobación de Abonos Parciales',
    actor: 'Administrador',
    actorRole: 'administrador',
    casualToneDescription:
      'El administrador abre su bandeja de conciliación y ve en pantalla dividida la foto de la transferencia del banco a la izquierda y el formulario de cotejo a la derecha. Si la plata ya cayó a la cuenta, aprueba el pago total (o un abono parcial) y el sistema emite de inmediato el recibo oficial.',
    preconditions: [
      'Administrador autenticado en la plataforma.',
      'Al menos un comprobante subido en estado "En revisión".',
    ],
    postconditions: [
      'Pago marcado como "Aprobado / Conciliado".',
      'Saldo del cobro actualizado a $0 (si fue total) o reducido (si fue abono parcial).',
      'Disparo automático de la emisión del recibo oficial en PDF (CU-12).',
    ],
    uml: {
      primaryActor: 'Administrador',
      secondaryActor: 'Inquilino (Notificado)',
      secondaryType: 'user',
      mainOval: 'CU-11: Conciliar Pago',
      includes: ['CU-12: Emitir Recibo Oficial en PDF'],
      extends: [{ name: 'CU-16: Devolver Foto Ilegible', point: 'Punto de extensión: Si el soporte no se lee' }],
      businessNote: 'Permite aprobar pagos completos o abonos parciales recalculando el saldo en tiempo real.',
    },
    flow: {
      trigger: 'El administrador abre un comprobante pendiente en la bandeja de conciliación.',
      userAction: 'Coteja la foto contra su extracto del banco y digita el valor recibido.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/charges/{id}/payments/{pid}/reconcile',
        payloadSummary: '{ verifiedAmount, bankReference, receivedDate }',
      },
      decision: {
        question: '¿Comprobante coincide con el dinero en cuenta?',
        evaluation: 'Verifica autenticidad del soporte bancario y monto acreditado.',
      },
      yesPath: {
        action: 'Resta abono del saldo, actualiza cobro a "Pagado" si saldo=0 y genera recibo oficial.',
        responseCode: 'HTTP 200 OK',
        finalState: 'Pago conciliado y saldo en paz y salvo.',
      },
      noPath: {
        action: 'Si la foto no se lee o no coincide, presiona "Devolver Foto" con motivo obligatorio.',
        responseCode: 'Deriva a CU-16',
        recoveryState: 'Comprobante marcado en devolución para que el inquilino lo repita.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/charges/reconciliation',
      title: 'Panel de Administrador: Vista de Conciliación de Pagos',
      image: '/screenshots/cu-11.png',
      studentNotes:
        'Pusimos una pantalla tipo split-screen: a la izquierda se ve clarito el pantallazo de Nequi que mandó el inquilino con la hora y la referencia, y a la derecha el botón verde para aprobar o el rojo para devolver si no se lee.',
      keyElements: [
        { label: 'Visor de Soporte', explanation: 'Captura bancaria ampliada para verificar referencia y monto.' },
        { label: 'Valor Conciliado', explanation: 'Campo para registrar el valor efectivamente ingresado.' },
        { label: 'Aprobación / Devolución', explanation: 'Botones directos para liquidar o rechazar el comprobante.' },
      ],
    },
  },
  {
    id: 'cu-12',
    huId: 'HU-12',
    epicName: 'Épica 5: Pagos',
    name: 'CU-12: Descarga de Recibo Oficial en PDF y Paz y Salvo',
    actor: 'Inquilino / Propietario',
    actorRole: 'inquilino',
    casualToneDescription:
      'Apenas el pago queda conciliado, el sistema genera el recibo formal de arrendamiento en PDF con consecutivo único (ejemplo: REC-2026-0891), datos fiscales de Faroo, desglose del canon y el sello digital de "PAZ Y SALVO". Cualquiera de las dos partes puede descargarlo o imprimirlo cuando quiera.',
    preconditions: [
      'Pago previamente verificado y conciliado por la administración.',
    ],
    postconditions: [
      'Documento PDF compilado y entregado como stream de descarga.',
      'Sello de Paz y Salvo estampado si el saldo resultante es $0.',
    ],
    uml: {
      primaryActor: 'Inquilino / Propietario',
      secondaryActor: 'Motor PDF (QuestPDF)',
      secondaryType: 'external_api',
      mainOval: 'CU-12: Descargar Recibo PDF',
      includes: ['Asignar Consecutivo Único REC', 'Estampar Sello de Paz y Salvo'],
      extends: [],
      businessNote: 'El consecutivo REC-YYYY-XXXX es correlativo y garantiza valor probatorio del pago.',
    },
    flow: {
      trigger: 'El inquilino o propietario presiona "Descargar Recibo en PDF".',
      userAction: 'Solicita la generación del documento formal.',
      apiCall: {
        method: 'GET',
        endpoint: '/api/documents/receipt/{id}/pdf',
        payloadSummary: 'Identificador del recibo conciliado',
      },
      decision: {
        question: '¿Pago conciliado y saldo restante igual a $0?',
        evaluation: 'Verifica estado contable del cobro para estampar sello de paz y salvo.',
      },
      yesPath: {
        action: 'Compila el PDF con sello verde "PAZ Y SALVO", consecutivo REC y entrega archivo.',
        responseCode: 'HTTP 200 (application/pdf)',
        finalState: 'Recibo oficial descargado en el equipo del usuario.',
      },
      noPath: {
        action: 'Compila recibo con sello "ABONO PARCIAL" indicando el saldo remanente.',
        responseCode: 'HTTP 200 (application/pdf)',
        recoveryState: 'Recibo parcial descargado con advertencia de saldo pendiente.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/receipts/rec-2026-0891',
      title: 'Documentos: Recibo Oficial de Arrendamiento en PDF',
      image: '/screenshots/cu-12.png',
      studentNotes:
        'Diseñamos el recibo como un documento contable impecable: lleva el NIT de la inmobiliaria, el número consecutivo oficial, el detalle del canon y el sello verde de Paz y Salvo para que al inquilino le sirva ante cualquier reclamo.',
      keyElements: [
        { label: 'Consecutivo Fiscal', explanation: 'Número oficial único (ejemplo REC-2026-0891).' },
        { label: 'Sello Paz y Salvo', explanation: 'Certificación digital de que el mes quedó 100% saldado.' },
        { label: 'Botón Descarga PDF', explanation: 'Genera el archivo estándar para imprimir o archivar.' },
      ],
    },
  },
  {
    id: 'cu-13',
    huId: 'HU-13',
    epicName: 'Épica 6: Semáforo y Alertas',
    name: 'CU-13: Semáforo Visual de Morosidad y Alertas Tempranas',
    actor: 'Propietario / Administrador',
    actorRole: 'administrador',
    casualToneDescription:
      'Una pantalla que pinta en colores la puntualidad de los arriendos para que no haya que adivinar: Verde para los que ya pagaron y están al día, Amarillo para los que se vencen en menos de 48 horas (para mandarles un saludito cordial), y Rojo con los días de atraso contados para los que ya entraron en mora.',
    preconditions: [
      'Cobros mensuales emitidos con sus respectivas fechas límites de pago.',
    ],
    postconditions: [
      'Cartera clasificada visualmente en tres niveles de alerta en tiempo real.',
    ],
    uml: {
      primaryActor: 'Propietario / Admin',
      secondaryActor: 'Cron de Cartera / BD',
      secondaryType: 'db',
      mainOval: 'CU-13: Semáforo Morosidad',
      includes: ['Calcular Días de Mora vs Fecha Límite'],
      extends: [{ name: 'CU-14: Disparar Alerta WhatsApp', point: 'Punto de extensión: Cobros en amarillo o rojo' }],
      businessNote: 'Permite ordenar la cartera por severidad de mora para priorizar la gestión de cobranza.',
    },
    flow: {
      trigger: 'El usuario ingresa a "Semáforo de Cartera".',
      userAction: 'Consulta el estado de morosidad de sus propiedades.',
      apiCall: {
        method: 'GET',
        endpoint: '/api/risk/traffic-light',
        payloadSummary: 'Compara fecha actual del servidor contra dueDate de cada cobro',
      },
      decision: {
        question: '¿Días transcurridos superan la fecha límite de pago?',
        evaluation: 'Calcula si faltan días para vencer, si está pagado o si está vencido.',
      },
      yesPath: {
        action: 'Marca con badge ROJO "Mora Activa", calcula días de atraso y activa cobro prioritario.',
        responseCode: 'HTTP 200 OK (Mora detectada)',
        finalState: 'Contratos con retraso destacados en la cima de la tabla.',
      },
      noPath: {
        action: 'Si faltan ≤2 días marca AMARILLO; si ya pagó marca VERDE "Al Día".',
        responseCode: 'HTTP 200 OK (Al día / Próximo)',
        recoveryState: 'Contratos sanos agrupados con sus respectivos recibos.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/charges/traffic-light',
      title: 'Control de Cartera: Semáforo Visual de Morosidad',
      image: '/screenshots/cu-13.png',
      studentNotes:
        'Pusimos los contadores en la parte superior: 13 contratos en verde, 2 en amarillo y 1 en rojo. Así el administrador no pierde tiempo revisando contratos al día y se va directo a gestionar los que necesitan atención.',
      keyElements: [
        { label: 'Contadores Rápidos', explanation: 'Resumen global de contratos al día vs en riesgo.' },
        { label: 'Colores del Semáforo', explanation: 'Verde (Al día), Amarillo (Por vencer), Rojo (En mora).' },
        { label: 'Días de Atraso', explanation: 'Cálculo dinámico de días transcurridos desde el corte.' },
      ],
    },
  },
  {
    id: 'cu-14',
    huId: 'HU-14',
    epicName: 'Épica 6: Semáforo y Alertas',
    name: 'CU-14: Disparo de Recordatorio Preventivo por WhatsApp',
    actor: 'Administrador / Propietario',
    actorRole: 'administrador',
    casualToneDescription:
      'En vez de llamar al inquilino a cobrarle y pasar un rato incómodo, el admin hace clic en el botón de WhatsApp junto al contrato. Faroo le prepara un mensajito muy formal y amable con el nombre, el valor exacto del arriendo y el link directo para que suba la foto de la transferencia.',
    preconditions: [
      'Inquilino con cobro en estado amarillo (por vencer) o rojo (en mora).',
      'Número de WhatsApp válido registrado en el perfil.',
    ],
    postconditions: [
      'Apertura del enlace api.whatsapp.com / wa.me con mensaje prellenado.',
      'Registro en bitácora de fecha y hora del recordatorio enviado.',
    ],
    uml: {
      primaryActor: 'Admin / Propietario',
      secondaryActor: 'API WhatsApp Web',
      secondaryType: 'external_api',
      mainOval: 'CU-14: Recordatorio WhatsApp',
      includes: ['Validar Celular en Formato Internacional (+57)'],
      extends: [{ name: 'CU-13: Semáforo Morosidad', point: 'Punto de extensión: Disparado desde semáforo' }],
      businessNote: 'El texto del mensaje es respetuoso y no invasivo, enfocado en facilitar el enlace de pago.',
    },
    flow: {
      trigger: 'El administrador presiona el botón "WhatsApp Preventivo" en el semáforo.',
      userAction: 'Abre el modal de confirmación con la vista previa del mensaje.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/charges/{id}/send-whatsapp-reminder',
        payloadSummary: '{ tenantPhone, template: "friendly_reminder" }',
      },
      decision: {
        question: '¿Inquilino cuenta con número celular válido?',
        evaluation: 'Verifica formato telefónico de 10 dígitos colombianos (+57 3XX...).',
      },
      yesPath: {
        action: 'Arma plantilla con nombre, canon y link corto, y abre wa.me en nueva pestaña.',
        responseCode: 'HTTP 200 OK',
        finalState: 'WhatsApp abierto con texto listo para enviar con un tap.',
      },
      noPath: {
        action: 'Alerta: "El inquilino no tiene teléfono registrado; actualice su contacto primero".',
        responseCode: 'HTTP 422 Unprocessable Entity',
        recoveryState: 'Redirige al modal de actualización de teléfono (CU-15).',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/charges/whatsapp-reminder',
      title: 'Alertas: Disparo de Recordatorio Amable por WhatsApp',
      image: '/screenshots/cu-14.png',
      studentNotes:
        'Maquetamos una simulación exacta de la burbuja verde de WhatsApp para que el administrador pueda leer el mensaje antes de dispararlo. Así tiene total tranquilidad de que el texto es súper respetuoso.',
      keyElements: [
        { label: 'Burbuja de Chat', explanation: 'Previsualización del texto con nombre, canon y link.' },
        { label: 'Enlace Directo wa.me', explanation: 'Conecta con la app oficial de WhatsApp en web o móvil.' },
        { label: 'Bitácora de Envíos', explanation: 'Registra la hora para no saturar al inquilino con mensajes repetidos.' },
      ],
    },
  },
  {
    id: 'cu-15',
    huId: 'HU-15',
    epicName: 'Épica 2: Inquilinos',
    name: 'CU-15: Actualización de Teléfono y Datos de Contacto del Inquilino',
    actor: 'Soporte / Administrador',
    actorRole: 'soporte',
    casualToneDescription:
      'Si el inquilino perdió el celular, cambió de operador o cambió de correo, aquí soporte o el admin le actualiza los datos. Para que no haya malos entendidos, el sistema obliga a escribir el motivo del cambio y guarda en una bitácora quién hizo la modificación y a qué hora.',
    preconditions: [
      'Inquilino registrado previamente en el sistema.',
      'Solicitud verificada de cambio de número de teléfono o correo.',
    ],
    postconditions: [
      'Datos actualizados en la tabla Tenants.',
      'Registro inmutable en la bitácora de auditoría (AuditLogs).',
    ],
    uml: {
      primaryActor: 'Soporte / Admin',
      secondaryActor: 'Bitácora de Auditoría / BD',
      secondaryType: 'db',
      mainOval: 'CU-15: Actualizar Contacto',
      includes: ['Validar Formato de Teléfono (+57)', 'Registrar Trazabilidad en Bitácora'],
      extends: [],
      businessNote: 'Todo cambio de teléfono queda auditado con usuario responsable para prevenir suplantaciones.',
    },
    flow: {
      trigger: 'Soporte abre la ficha del inquilino y selecciona "Actualizar Contacto".',
      userAction: 'Ingresa el nuevo número de celular y escribe el motivo del cambio.',
      apiCall: {
        method: 'PUT',
        endpoint: '/api/tenants/{id}/contact',
        payloadSummary: '{ phone, email, reason }',
      },
      decision: {
        question: '¿Nuevo teléfono tiene formato colombiano válido (10 dígitos)?',
        evaluation: 'Valida regex de telefonía móvil colombiana y que haya motivo registrado.',
      },
      yesPath: {
        action: 'Actualiza tabla Tenants, guarda en bitácora de auditoría y muestra toast verde.',
        responseCode: 'HTTP 200 OK',
        finalState: 'Contacto actualizado y notificaciones redirigidas a la nueva línea.',
      },
      noPath: {
        action: 'Alerta: "El número debe tener 10 dígitos y comenzar por 3".',
        responseCode: 'HTTP 400 Bad Request',
        recoveryState: 'Mantiene formulario activo para corregir los dígitos.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/tenants/inq-001/edit-contact',
      title: 'Directorio: Actualización de Teléfono y Datos de Contacto',
      image: '/screenshots/cu-15.png',
      studentNotes:
        'En esta pantalla dejamos clarito el teléfono viejo y el nuevo, y abajo pusimos un aviso de seguridad que le recuerda al usuario que el cambio va a quedar firmado con su nombre en la bitácora.',
      keyElements: [
        { label: 'Nuevo Celular', explanation: 'Campo con máscara telefónica y validación de operador.' },
        { label: 'Motivo del Cambio', explanation: 'Razón justificada (ejemplo: pérdida de línea).' },
        { label: 'Aviso de Auditoría', explanation: 'Garantía de trazabilidad interna en Faroo.' },
      ],
    },
  },
  {
    id: 'cu-16',
    huId: 'HU-16',
    epicName: 'Épica 5: Pagos',
    name: 'CU-16: Devolución de Comprobante Ilegible con Causal Registrada',
    actor: 'Soporte / Administrador',
    actorRole: 'soporte',
    casualToneDescription:
      'Cuando un inquilino sube una foto borrosa, un pantallazo cortado donde no se ve la fecha o una consignación que no coincide, soporte le devuelve el comprobante. Pero para no dejarlo gringo, el sistema obliga a escribir una explicación de mínimo 10 caracteres explicándole clarito qué tiene que corregir para volverlo a subir.',
    preconditions: [
      'Existe un comprobante en estado "En revisión".',
      'Explicación redactada con al menos 10 caracteres obligatorios.',
    ],
    postconditions: [
      'Comprobante marcado en estado "Rechazado / Devuelto" en BD.',
      'Reapertura automática del botón de subida en el portal del inquilino con la nota visible.',
    ],
    uml: {
      primaryActor: 'Soporte / Admin',
      secondaryActor: 'Inquilino (Receptor)',
      secondaryType: 'user',
      mainOval: 'CU-16: Devolver Comprobante',
      includes: ['Exigir Causal Obligatoria (≥ 10 caracteres)'],
      extends: [{ name: 'CU-11: Conciliar Pagos', point: 'Punto de extensión: Disparado por foto no válida' }],
      businessNote: 'El botón de devolver se bloquea si el motivo tiene menos de 10 caracteres para garantizar claridad.',
    },
    flow: {
      trigger: 'Soporte o el admin detecta una foto borrosa y pulsa "Devolver Foto".',
      userAction: 'Selecciona la causal ("Foto borrosa") y redacta la explicación detallada.',
      apiCall: {
        method: 'POST',
        endpoint: '/api/charges/{id}/payments/{pid}/reject',
        payloadSummary: '{ reasonCategory, reasonDetails: "La foto está cortada..." }',
      },
      decision: {
        question: '¿Explicación redactada cuenta con 10 o más caracteres?',
        evaluation: 'Valida longitud mínima del motivo para que no envíen campos vacíos o evasivos.',
      },
      yesPath: {
        action: 'Pasa comprobante a "Rechazado", reabre carga al inquilino y le muestra la nota.',
        responseCode: 'HTTP 200 OK',
        finalState: 'Inquilino notificado con la causa exacta para que repita la foto.',
      },
      noPath: {
        action: 'Mantiene deshabilitado el botón de envío indicando los caracteres faltantes.',
        responseCode: 'Validación en cliente (≥ 10 caracteres)',
        recoveryState: 'Obliga a redactar una instrucción útil para el arrendatario.',
      },
    },
    prototype: {
      url: 'https://app.faroo.co/support/reject-payment',
      title: 'Módulo de Soporte: Devolución de Comprobante con Causal',
      image: '/screenshots/cu-16.png',
      studentNotes:
        'Pusimos un contador dinámico de caracteres (ejemplo: 158 / 10 caracteres) y un selector de motivos rápidos. Así el inquilino no se enoja, porque sabe exactamente qué le faltó a su pantallazo.',
      keyElements: [
        { label: 'Selector de Causal', explanation: 'Foto borrosa, valor no coincide o soporte duplicado.' },
        { label: 'Explicación Obligatoria', explanation: 'Mínimo 10 caracteres para garantizar claridad absoluta.' },
        { label: 'Reapertura de Carga', explanation: 'Habilita de nuevo el botón de pago en el portal del inquilino.' },
      ],
    },
  },
];
