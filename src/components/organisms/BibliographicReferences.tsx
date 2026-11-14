export function BibliographicReferences() {
  const references = [
    {
      num: '1',
      category: 'Marco Legal y Normativo (Colombia)',
      citation: 'Congreso de la República de Colombia. (2003, 10 de julio). Ley 820 de 2003: Por la cual se expide el régimen de arrendamiento de vivienda urbana y se dictan otras disposiciones. Diario Oficial No. 45.244. Bogotá, D.C.',
      annotation: 'Fundamento legal para la formalización de contratos de arrendamiento de vivienda urbana en Faroo: fijación del canon máximo (1% del valor comercial, Art. 18), reajustes anuales ligados al IPC (Art. 20), plazos de terminación unilateral y expedición obligatoria de recibos de pago escritos con desglose de conceptos (Art. 11).'
    },
    {
      num: '2',
      category: 'Estándares de Modelado y Notación UML',
      citation: 'Object Management Group (OMG). (2017). OMG Unified Modeling Language (OMG UML) Specification, Version 2.5.1 (formal/2017-12-05). Object Management Group Standard.',
      annotation: 'Estándar formal utilizado para la especificación de diagramas de casos de uso (actores, relaciones «include», «extend» y límites del sistema) y diagramas de despliegue físico de nodos de cómputo, artefactos y canales de comunicación.'
    },
    {
      num: '3',
      category: 'Simbología y Diagramación de Flujo de Datos',
      citation: 'International Organization for Standardization & International Electrotechnical Commission. (1985). ISO/IEC 5807:1985: Information processing — Documentation symbols and conventions for data, program and system flowcharts, program network charts and system resources charts. Geneva: ISO.',
      annotation: 'Norma internacional aplicada para la construcción de los diagramas de flujo operativo de los 16 casos de uso: uso riguroso del óvalo (inicio/fin), paralelogramo (entradas y salidas de datos), rectángulo (procesamiento lógico), rombo (decisión condicional binaria SÍ/NO) y líneas de reintento.'
    },
    {
      num: '4',
      category: 'Metodología Ágil y Gestión de Requisitos',
      citation: 'Schwaber, K., & Sutherland, J. (2020). La Guía de Scrum: Las Reglas del Juego (The Scrum Guide). Scrum.org / ScrumAlliance.',
      annotation: 'Marco metodológico ágil empleado a lo largo de las 4 entregas del manual técnico para la estructuración de épicas, historias de usuario con criterios de aceptación Gherkin y backlog de sprints.'
    },
    {
      num: '5',
      category: 'Ingeniería de Software y Diseño de Sistemas',
      citation: 'IEEE Computer Society. (2009). IEEE Std 1016-2009: IEEE Standard for Information Technology — Systems Design — Software Design Descriptions. IEEE Standards Association.',
      annotation: 'Guía de referencia para la documentación formal de descripciones de diseño de software (SDD), garantizando trazabilidad entre casos de uso, módulos de negocio y vistas de arquitectura física.'
    },
    {
      num: '6',
      category: 'Arquitectura de Backend y Servicios Web',
      citation: 'Microsoft Corporation. (2024). ASP.NET Core Web API Architecture, Minimal APIs, and Security Guidelines (.NET 10 LTS). Microsoft Learn Documentation.',
      annotation: 'Referencia técnica para la arquitectura del backend de Faroo: pipeline de middlewares, autenticación JWT Bearer, limitación de tasa (Rate Limiting) y motor de serialización de alto rendimiento.'
    },
    {
      num: '7',
      category: 'Infraestructura en la Nube y Base de Datos Serverless',
      citation: 'Neon Tech Inc. (2024). Neon Serverless Postgres Architecture, Connection Pooling with PgBouncer, and Branching Engine. Neon Documentation.',
      annotation: 'Arquitectura del nivel de datos: cómputo elástico desacoplado del almacenamiento, escalado automático de recursos y compatibilidad nativa con PostgreSQL 16 para persistencia ACID.'
    },
    {
      num: '8',
      category: 'Almacenamiento de Objetos en la Nube',
      citation: 'Cloudflare Inc. (2024). Cloudflare R2 Object Storage: S3-Compatible Zero-Egress Storage Architecture. Cloudflare Documentation.',
      annotation: 'Estándar para el resguardo inmutable de documentos legales: almacenamiento distribuido, URLs prefirmadas temporales (Presigned URLs) con expiración de 15 minutos y eliminación de costos por ancho de banda saliente.'
    }
  ];

  return (
    <section id="referentes-bibliograficos" className="scroll-mt-24 space-y-6 pt-10 border-t border-neutral-200">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 border-b border-neutral-200 pb-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Punto 8 · Marco Académico & Normativo
          </span>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold text-neutral-900">
            8. Referentes Bibliográficos
          </h2>
          <p className="mt-1 text-sm text-neutral-600 max-w-3xl">
            Fuentes formales, leyes de la República de Colombia, estándares internacionales ISO/OMG y documentación técnica oficial que sustentan el diseño, los diagramas y la implementación del software Faroo.
          </p>
        </div>
        <div className="text-xs font-mono text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-lg border border-neutral-200 self-start sm:self-auto shrink-0">
          Formato APA 7.ª Edición
        </div>
      </div>

      {/* Lista de referencias bibliográficas */}
      <div className="space-y-4">
        {references.map((ref) => (
          <div
            key={ref.num}
            className="rounded-xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-2xs hover:border-neutral-300 transition-colors"
          >
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold font-mono text-white">
                {ref.num}
              </span>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {ref.category}
              </span>
            </div>
            <p className="text-sm font-medium text-neutral-900 pl-9 leading-relaxed">
              {ref.citation}
            </p>
            <p className="text-xs text-neutral-600 pl-9 mt-2 leading-relaxed bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
              <strong className="text-neutral-700 font-semibold">Aplicación en Faroo: </strong>
              {ref.annotation}
            </p>
          </div>
        ))}
      </div>

      {/* Nota final de autoría académica */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <span className="font-semibold text-neutral-900">Institución Universitaria Pascual Bravo</span> · Facultad de Ingeniería
        </div>
        <div className="text-neutral-500 font-mono">
          Medellín, Antioquia · 2026
        </div>
      </div>
    </section>
  );
}
