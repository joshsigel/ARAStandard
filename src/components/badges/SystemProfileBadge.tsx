import type { SystemProfileCode } from '@/types';

interface SystemProfileBadgeProps {
  profile: SystemProfileCode;
  showLabel?: boolean;
  className?: string;
}

const profileConfig: Record<SystemProfileCode, { name: string; acrs: number; color: string }> = {
  F: { name: 'Foundational', acrs: 97, color: 'bg-slate-100 text-slate-600 border-slate-300' },
  S: { name: 'Standard', acrs: 215, color: 'bg-slate-200 text-steel border-slate-400' },
  A: { name: 'Advanced', acrs: 368, color: 'bg-charcoal text-white border-charcoal' },
  C: { name: 'Comprehensive', acrs: 410, color: 'bg-navy text-white border-navy' },
};

export function SystemProfileBadge({
  profile,
  showLabel = false,
  className,
}: SystemProfileBadgeProps) {
  const config = profileConfig[profile];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono font-semibold
        rounded border ${config.color} ${className ?? ''}`}
      title={`${config.name} Profile — ${config.acrs} ACRs`}
    >
      {profile}
      {showLabel && (
        <span className="font-sans font-medium">{config.name}</span>
      )}
    </span>
  );
}
