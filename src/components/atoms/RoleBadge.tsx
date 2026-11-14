import { ROLES, type RoleId } from '@/data/manualData';
import { RoleMark } from '@/components/atoms/RoleMark';

interface RoleBadgeProps {
  roleId: RoleId;
  size?: 'xs' | 'sm' | 'md';
  variant?: 'solid' | 'soft';
}

export function RoleBadge({ roleId, size = 'xs', variant = 'soft' }: RoleBadgeProps) {
  const role = ROLES[roleId];
  if (!role) return null;

  const sizeClasses =
    size === 'xs'
      ? 'text-[12px] px-2 py-0.5 gap-1.5'
      : size === 'sm'
      ? 'text-[13px] px-2.5 py-1 gap-2'
      : 'text-[14px] px-3 py-1.5 gap-2';

  const base = `inline-flex items-center rounded-sm border font-medium leading-none ${sizeClasses}`;

  if (variant === 'solid') {
    return (
      <span className={`${base} border-ink bg-ink text-white`}>
        <RoleMark roleId={roleId} className="h-1.5 w-1.5 text-white" />
        <span>{role.shortLabel}</span>
      </span>
    );
  }

  return (
    <span className={`${base} border-line bg-subtle text-ink`}>
      <RoleMark roleId={roleId} className="h-1.5 w-1.5 text-ink" />
      <span>{role.shortLabel}</span>
    </span>
  );
}
