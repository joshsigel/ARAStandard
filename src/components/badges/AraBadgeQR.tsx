'use client';

import React, { useId } from 'react';
import type { AraBadgeQRProps } from './types';
import { BADGE_STATUS_MAP } from './types';

/**
 * ARA Badge — QR Variant
 *
 * Badge with integrated QR code for physical/print verification.
 * Designed for:
 * - Physical labels on hardware
 * - Compliance documents
 * - Enterprise dashboards
 *
 * QR code is a styled placeholder — Part 2 will generate real QR.
 */
export function AraBadgeQR({ data, size = 200, className }: AraBadgeQRProps) {
  const uid = useId().replace(/:/g, '');
  const status = BADGE_STATUS_MAP[data.status];

  const verifyUrl = data.verificationUrl || `https://ara-standard.vercel.app/registry/verify/${data.certId}`;

  return (
    <div className={`ara-qr ${className || ''}`} style={{ width: size }}>
      {/* Mini seal header */}
      <div className="ara-qr-header">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" stroke="#334155" strokeWidth="1.5" fill="none" />
          <circle cx="24" cy="24" r="18" stroke="#1E293B" strokeWidth="2.5" fill="none" />
          <text x="24" y="22" textAnchor="middle" dominantBaseline="central"
            fill="#0F172A" fontSize="10" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" letterSpacing="0.05em">
            ARA
          </text>
          <text x="24" y="32" textAnchor="middle"
            fill="#475569" fontSize="6" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="0.1em">
            L{data.level}/{data.assuranceClass}
          </text>
        </svg>
        <div className="ara-qr-header-text">
          <div className="ara-qr-title">ARA CERTIFIED</div>
          <div className="ara-qr-subtitle">L{data.level} · Class {data.assuranceClass} · v{data.standardVersion}</div>
        </div>
      </div>

      {/* QR Code placeholder */}
      <div className="ara-qr-code">
        {/* Stylized QR pattern — Part 2 will use real QR generation */}
        <svg viewBox="0 0 120 120" fill="none" width="100%" height="100%">
          {/* QR frame */}
          <rect x="4" y="4" width="112" height="112" rx="4" stroke="#E2E8F0" strokeWidth="1" fill="white" />

          {/* QR corner markers */}
          {[[10, 10], [82, 10], [10, 82]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="28" height="28" rx="2" fill="#0F172A" />
              <rect x={x + 4} y={y + 4} width="20" height="20" rx="1" fill="white" />
              <rect x={x + 8} y={y + 8} width="12" height="12" rx="1" fill="#0F172A" />
            </g>
          ))}

          {/* Stylized data pattern */}
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => {
              // Skip corner marker areas
              if (row < 4 && col < 4) return null;
              if (row < 4 && col > 7) return null;
              if (row > 7 && col < 4) return null;
              // Deterministic pattern from cert ID
              const hash = (data.certId.charCodeAt((row * 12 + col) % data.certId.length) * 31 + row * 7 + col * 13) % 100;
              if (hash > 45) return null;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={10 + col * 8.3}
                  y={10 + row * 8.3}
                  width="6"
                  height="6"
                  rx="0.5"
                  fill="#1E293B"
                  opacity={0.8}
                />
              );
            })
          )}

          {/* Center ARA mark */}
          <rect x="44" y="44" width="32" height="32" rx="3" fill="white" stroke="#E2E8F0" strokeWidth="0.5" />
          <text x="60" y="60" textAnchor="middle" dominantBaseline="central"
            fill="#0F172A" fontSize="10" fontFamily="Inter, system-ui, sans-serif" fontWeight="900">
            ARA
          </text>
        </svg>
      </div>

      {/* Cert ID and scan prompt */}
      <div className="ara-qr-footer">
        <div className="ara-qr-certid">{data.certId}</div>
        <div className="ara-qr-scan">Scan to verify</div>
      </div>
    </div>
  );
}

export default AraBadgeQR;
