import type { RoleId } from '@/data/manualData';

/**
 * Marca geométrica por rol: en blanco y negro la forma distingue
 * (cuadrado, círculo, triángulo, rombo) y funciona en impresión.
 */
const PATHS: Record<RoleId, string> = {
  propietario: 'M1 1h8v8H1z',
  inquilino: 'M5 1a4 4 0 1 1 0 8 4 4 0 0 1 0-8z',
  administrador: 'M5 1l4.2 7.4H0.8z',
  soporte: 'M5 1l4 4-4 4-4-4z',
};

interface RoleMarkProps {
  roleId: RoleId;
  className?: string;
}

export function RoleMark({ roleId, className = 'h-2 w-2' }: RoleMarkProps) {
  return (
    <svg
      viewBox="0 0 10 10"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 fill-current ${className}`}
    >
      <path d={PATHS[roleId]} />
    </svg>
  );
}
