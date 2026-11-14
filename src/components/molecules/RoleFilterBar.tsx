import { ROLE_LIST, type RoleId } from '@/data/manualData';
import { RoleMark } from '@/components/atoms/RoleMark';

interface RoleFilterBarProps {
  selectedRole: RoleId | 'all';
  onSelectRole: (role: RoleId | 'all') => void;
  stageLabel?: string;
}

export function RoleFilterBar({ selectedRole, onSelectRole, stageLabel }: RoleFilterBarProps) {
  const chip =
    'inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[13px] font-medium leading-none transition-colors';

  return (
    <div className="no-print flex flex-wrap items-center gap-x-4 gap-y-2.5 border-y border-line py-3.5">
      <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted">Rol</span>

      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtrar por rol">
        <button
          type="button"
          onClick={() => onSelectRole('all')}
          aria-pressed={selectedRole === 'all'}
          className={`${chip} ${
            selectedRole === 'all'
              ? 'border-ink bg-ink text-white'
              : 'border-line text-ink hover:border-ink/40'
          }`}
        >
          Todos
        </button>

        {ROLE_LIST.map((role) => {
          const active = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(active ? 'all' : role.id)}
              aria-pressed={active}
              className={`${chip} ${
                active
                  ? 'border-ink bg-ink text-white'
                  : 'border-line text-ink hover:border-ink/40'
              }`}
            >
              <RoleMark roleId={role.id} className="h-1.5 w-1.5" />
              <span>{role.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {stageLabel ? (
        <span className="ml-auto hidden text-[12px] text-muted lg:inline">{stageLabel}</span>
      ) : null}
    </div>
  );
}
