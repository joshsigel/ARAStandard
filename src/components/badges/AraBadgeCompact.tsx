'use client';

import React from 'react';
import type { AraBadgeCompactProps } from './types';
import { BADGE_STATUS_MAP, SIGNAL_CONFIG } from './types';

/**
 * ARA Certification Mark — Compact Variant
 *
 * Inline badge for tables, lists, and tight UI contexts.
 * Shows: ARA mark + Level/Class pill + Status dot
 * Recognizable at 24–36px height.
 */
export function AraBadgeCompact({ data, className, onClick }: AraBadgeCompactProps) {
  const status = BADGE_STATUS_MAP[data.status];
  const signal = SIGNAL_CONFIG[data.status];

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

      {/* Status dot — color from signal config, subtle 6–8s pulse */}
      <span
        className={`ara-compact-dot ${signal.breathing ? 'ara-compact-dot-pulse' : ''}`}
        style={{
          backgroundColor: signal.color,
          '--pulse-speed': `${signal.cycleDuration || 6}s`,
        } as React.CSSProperties}
      />
    </button>
  );
}

export default AraBadgeCompact;
