// Siluetas minimalistas en blanco y negro (Black & White Silhouettes)
// Diseñadas con precisión geométrica y alto contraste para dar personalidad sin saturar.

interface SilhouetteProps {
  className?: string;
  size?: number;
}

// 1. Silueta de Faroo (Inmuebles, llaves y arriendo)
export function SilhouetteFarooBuilding({ className = 'text-[#111111]', size = 40 }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Edificio principal silueta */}
      <path
        d="M6 42V12H26V42H6Z"
        fill="currentColor"
      />
      {/* Ventanas en negativo */}
      <rect x="10" y="16" width="4" height="4" fill="#FFFFFF" />
      <rect x="18" y="16" width="4" height="4" fill="#FFFFFF" />
      <rect x="10" y="24" width="4" height="4" fill="#FFFFFF" />
      <rect x="18" y="24" width="4" height="4" fill="#FFFFFF" />
      <rect x="10" y="32" width="4" height="4" fill="#FFFFFF" />
      <rect x="18" y="32" width="4" height="4" fill="#FFFFFF" />
      {/* Puerta */}
      <rect x="14" y="38" width="4" height="4" fill="#FFFFFF" />
      {/* Casa adyacente */}
      <path
        d="M26 22L38 13L42 16V42H26V22Z"
        fill="currentColor"
      />
      {/* Ventana casa */}
      <rect x="31" y="24" width="6" height="6" fill="#FFFFFF" />
      {/* Línea de base */}
      <line x1="4" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// 2. Silueta de MediCitas (Salud, citas y estetoscopio)
export function SilhouetteHealthClinic({ className = 'text-[#111111]', size = 40 }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Calendario silueta */}
      <rect x="8" y="10" width="32" height="32" rx="4" fill="currentColor" />
      {/* Perforaciones calendario */}
      <rect x="14" y="6" width="4" height="8" rx="2" fill="currentColor" />
      <rect x="30" y="6" width="4" height="8" rx="2" fill="currentColor" />
      {/* Cruz médica en negativo */}
      <rect x="21" y="20" width="6" height="16" rx="1" fill="#FFFFFF" />
      <rect x="16" y="25" width="16" height="6" rx="1" fill="#FFFFFF" />
    </svg>
  );
}

// 3. Silueta de StockBarrio (Tienda de barrio y estantes)
export function SilhouetteCornerShop({ className = 'text-[#111111]', size = 40 }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Techo tienda */}
      <path d="M4 18L24 6L44 18H4Z" fill="currentColor" />
      {/* Cuerpo tienda */}
      <rect x="8" y="18" width="32" height="24" fill="currentColor" />
      {/* Mostrador / vitrina en negativo */}
      <rect x="12" y="24" width="10" height="12" rx="1" fill="#FFFFFF" />
      {/* Estante y productos */}
      <rect x="26" y="24" width="10" height="18" rx="1" fill="#FFFFFF" />
      <line x1="4" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 4. Silueta del Propietario (Dueño con llaves de propiedad)
export function SilhouetteOwner({ className = 'text-[#111111]', size = 32 }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cabeza */}
      <circle cx="16" cy="9" r="5" fill="currentColor" />
      {/* Torso */}
      <path
        d="M6 26C6 20.4772 10.4772 16 16 16C21.5228 16 26 20.4772 26 26H6Z"
        fill="currentColor"
      />
      {/* Llave pequeña en negativo */}
      <circle cx="21" cy="22" r="2" fill="#FFFFFF" />
      <rect x="20" y="23" width="6" height="2" rx="0.5" fill="#FFFFFF" />
    </svg>
  );
}

// 5. Silueta del Inquilino (Persona en el hogar con celular)
export function SilhouetteTenant({ className = 'text-[#111111]', size = 32 }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Casa silueta */}
      <path d="M16 4L4 14V28H28V14L16 4Z" fill="currentColor" />
      {/* Persona en negativo dentro de la casa */}
      <circle cx="16" cy="14" r="3" fill="#FFFFFF" />
      <path
        d="M10 26C10 22.6863 12.6863 20 16 20C19.3137 20 22 22.6863 22 26H10Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 6. Silueta del Administrador (Gestión con lista y comprobante)
export function SilhouetteAdmin({ className = 'text-[#111111]', size = 32 }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tabla con clip */}
      <rect x="6" y="6" width="20" height="24" rx="3" fill="currentColor" />
      <rect x="11" y="3" width="10" height="5" rx="1.5" fill="currentColor" />
      {/* Checkmarks en negativo */}
      <line x1="11" y1="13" x2="21" y2="13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="18" x2="21" y2="18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="11" y1="23" x2="17" y2="23" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 7. Silueta de Soporte (Atención y acompañamiento con diadema)
export function SilhouetteSupport({ className = 'text-[#111111]', size = 32 }: SilhouetteProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cabeza */}
      <circle cx="16" cy="11" r="5" fill="currentColor" />
      {/* Diadema de soporte */}
      <path
        d="M9 11C9 7.13401 12.134 4 16 4C19.866 4 23 7.13401 23 11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Auricular */}
      <rect x="7" y="9" width="3" height="5" rx="1.5" fill="currentColor" />
      <rect x="22" y="9" width="3" height="5" rx="1.5" fill="currentColor" />
      {/* Micrófono hacia la boca */}
      <path d="M22 13V15C22 17 20 18 17 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Torso */}
      <path
        d="M7 28C7 23.0294 11.0294 19 16 19C20.9706 19 25 23.0294 25 28H7Z"
        fill="currentColor"
      />
    </svg>
  );
}
