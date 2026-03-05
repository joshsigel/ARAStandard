import type { AssuranceClass } from '@/types';

interface AssuranceClassBadgeProps {
  assuranceClass: AssuranceClass;
  size?: 'sm' | 'md';
  className?: string;
}

const classConfig: Record<AssuranceClass, { label: string; bg: string; text: string; border: string }> = {
  A: { label: 'Class A — Periodic', bg: 'bg-slate-50', text: 'text-steel', border: 'border-slate-300' },
  B: { label: 'Class B — Monitored', bg: 'bg-charcoal', text: 'text-white', border: 'border-charcoal' },
  C: { label: 'Class C — Continuous', bg: 'bg-navy', text: 'text-white', border: 'border-navy' },
};

export function AssuranceClassBadge({
  assuranceClass,
  size = 'md',
  className,
}: AssuranceClassBadgeProps) {
  const config = classConfig[assuranceClass];

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px]'
    : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold rounded border
        ${config.bg} ${config.text} ${config.border} ${sizeClasses}
        ${className ?? ''}`}
      title={config.label}
    >
      {size === 'sm' ? assuranceClass : config.label}
    </span>
  );
}
