'use client';

import React from 'react';
import type { AraBadgeCompactProps } from './types';
import { BADGE_STATUS_MAP } from './types';

/**
 * ARA Badge — Compact Variant
 *
 * Inline badge for tables, lists, and tight UI contexts.
 * Shows: Level pill + Class indicator + Status dot
 * Recognizable at 24–36px height.
 */
export function AraBadgeCompact({ data, className, onClick }: AraBadgeCompactProps) {
  const status = BADGE_STATUS_MAP[data.status];

  const dotColors: Record<typeof data.status, string> = {
    active: '#16A34A',
    monitoring_connected: '#3B82F6',
    monitoring_delayed: '#D97706',
    revalidation_required: '#D97706',
    suspended: '#DC2626',
    expired: '#94A3B8',
  };

  return (
    <button
      type="button"
      className={`ara-compact ${className || ''}`}
      onClick={onClick}
      title={`ARA L${data.level}/${data.assuranceClass} — ${status.label} — ${data.certId}`}
      aria-label={`ARA Level ${data.level} Class ${data.assuranceClass} Certification — ${status.label}`}
    >
      {/* ARA mark */}
      <span className="ara-compact-mark">ARA</span>

      {/* Level + Class pill */}
      <span className={`ara-compact-level ara-compact-level-${data.level}`}>
        L{data.level}/{data.assuranceClass}
      </span>

      {/* Status dot */}
      <span
        className={`ara-compact-dot ${status.pulseSpeed > 0 ? 'ara-compact-dot-pulse' : ''}`}
        style={{
          backgroundColor: dotColors[data.status],
          '--pulse-speed': `${status.pulseSpeed}s`,
        } as React.CSSProperties}
      />
    </button>
  );
}

export default AraBadgeCompact;
