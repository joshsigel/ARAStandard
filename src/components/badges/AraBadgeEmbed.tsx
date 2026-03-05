'use client';

import React, { useId } from 'react';
import type { AraBadgeEmbedProps } from './types';
import { BADGE_STATUS_MAP, LEVEL_CONFIG, SIGNAL_CONFIG } from './types';

/**
 * ARA Certification Mark — Embeddable Website Variant
 *
 * A horizontal card-style badge designed for third-party website embedding.
 * Shows: Mini ARA seal + Level/Class + Status + Verify link
 * Navy/silver palette. Mini seal uses text "ARA" (too small for traced path).
 */
export function AraBadgeEmbed({ data, width = 320, className }: AraBadgeEmbedProps) {
  const uid = useId().replace(/:/g, '');
  const status = BADGE_STATUS_MAP[data.status];
  const levelCfg = LEVEL_CONFIG[data.level];
  const signal = SIGNAL_CONFIG[data.status];

  const verifyUrl = data.verificationUrl || `/registry/verify/${data.certId}`;

  return (
    <a
      href={verifyUrl}
      className={`ara-embed ${className || ''}`}
      style={{ width, maxWidth: '100%' }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Verify ARA Certification ${data.certId}`}
    >
      {/* Left: Mini badge seal */}
      <div className="ara-embed-seal">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          {/* Outer authority ring */}
          <circle cx="24" cy="24" r="22" stroke="#0F172A" strokeWidth="2" fill="none" />
          {/* Separator */}
          <circle cx="24" cy="24" r="19" stroke="#94A3B8" strokeWidth="0.5" fill="none" opacity="0.5" />
          {/* Signal ring — static at mini size */}
          <circle cx="24" cy="24" r="17" stroke={signal.color} strokeWidth="1.5" fill="none"
            opacity={signal.opacityRange[1]} />
          {/* Core seal */}
          <circle cx="24" cy="24" r="14.5" fill="#F1F5F9" />
          <text x="24" y="22" textAnchor="middle" dominantBaseline="central"
            fill="#0F172A" fontSize="10" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" letterSpacing="0.05em">
            ARA
          </text>
          <text x="24" y="32" textAnchor="middle"
            fill="#475569" fontSize="6" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="0.1em">
            L{data.level}/{data.assuranceClass}
          </text>
        </svg>
      </div>

      {/* Right: Info */}
      <div className="ara-embed-info">
        <div className="ara-embed-title">
          <span className="ara-embed-label">ARA CERTIFIED</span>
          <span
            className="ara-embed-dot"
            style={{ backgroundColor: signal.color }}
          />
        </div>
        <div className="ara-embed-designation">
          Level {data.level} · Class {data.assuranceClass} · v{data.standardVersion}
        </div>
        <div className="ara-embed-certid">{data.certId}</div>
        <div className="ara-embed-verify">Verify certification →</div>
      </div>
    </a>
  );
}

export default AraBadgeEmbed;
