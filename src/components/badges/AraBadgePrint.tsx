'use client';

import React, { useId } from 'react';
import type { AraBadgePrintProps } from './types';

/**
 * ARA Badge — Print / Static Variant
 *
 * No animations, no interactivity. Designed for:
 * - PDF documents
 * - Compliance reports
 * - Physical certificates
 *
 * Includes QR code placeholder area and cert ID.
 * Renders at high fidelity in print contexts.
 */
export function AraBadgePrint({ data, size = 240, className }: AraBadgePrintProps) {
  const uid = useId().replace(/:/g, '');
  const vb = 600;
  const cx = 300;
  const cy = 300;

  const outerR = 280;
  const midR = 258;
  const innerR = 226;

  const upperTextR = 244;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`ARA Level ${data.level} Class ${data.assuranceClass} Certification — ${data.certId}`}
      className={`ara-badge-print ${className || ''}`}
    >
      <defs>
        {/* Text arcs */}
        <path
          id={`print-upper-${uid}`}
          d={`M ${cx - upperTextR * Math.cos(25 * Math.PI / 180)},${cy + upperTextR * Math.sin(25 * Math.PI / 180)} A ${upperTextR},${upperTextR} 0 1,1 ${cx + upperTextR * Math.cos(25 * Math.PI / 180)},${cy + upperTextR * Math.sin(25 * Math.PI / 180)}`}
        />
        <path
          id={`print-lower-${uid}`}
          d={`M ${cx - upperTextR},${cy + 10} A ${upperTextR},${upperTextR} 0 0,0 ${cx + upperTextR},${cy + 10}`}
        />
        <path
          id={`print-certid-${uid}`}
          d={`M ${cx - 284},${cy + 10} A 284,284 0 0,0 ${cx + 284},${cy + 10}`}
        />
        <circle id={`print-micro-${uid}`} cx={cx} cy={cy} r={218} />
      </defs>

      {/* Outer ring — solid for print */}
      <circle cx={cx} cy={cy} r={outerR} stroke="#1E293B" strokeWidth={2.5} fill="none" />

      {/* Mid ring with gap */}
      <circle
        cx={cx} cy={cy} r={midR}
        stroke="#0F172A"
        strokeWidth={10}
        fill="none"
        strokeDasharray={`${(300 / 360) * 2 * Math.PI * midR} ${(60 / 360) * 2 * Math.PI * midR}`}
        strokeDashoffset={((360 - 120) / 360) * 2 * Math.PI * midR}
        strokeLinecap="round"
      />

      {/* Inner seal */}
      <circle cx={cx} cy={cy} r={innerR} stroke="#475569" strokeWidth={1} fill="white" />

      {/* Microprint ring */}
      <text fill="#CBD5E1" fontSize="5" fontFamily="'IBM Plex Mono', monospace" fontWeight="400" letterSpacing="0.06em">
        <textPath href={`#print-micro-${uid}`} startOffset="0%">
          ARA·STANDARD·v{data.standardVersion}·CERTIFIED·{data.certId}·LEVEL·{data.level}·CLASS·{data.assuranceClass}·ARA·STANDARD·v{data.standardVersion}·CERTIFIED·{data.certId}·LEVEL·{data.level}·CLASS·{data.assuranceClass}·
        </textPath>
      </text>

      {/* Upper ring text */}
      <text fill="#1E293B" fontSize="26" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="0.06em">
        <textPath href={`#print-upper-${uid}`} startOffset="50%" textAnchor="middle">
          AUTONOMOUS RELIABILITY ASSURANCE
        </textPath>
      </text>

      {/* Lower ring text */}
      <text fill="#1E293B" fontSize="26" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="0.45em">
        <textPath href={`#print-lower-${uid}`} startOffset="50%" textAnchor="middle">
          CERTIFIED
        </textPath>
      </text>

      {/* ARA Wordmark */}
      <text x={cx} y={cy - 20} textAnchor="middle" dominantBaseline="central"
        fill="#0F172A" fontSize="68" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" letterSpacing="0.08em">
        ARA
      </text>

      {/* Divider */}
      <line x1={cx - 60} y1={cy + 18} x2={cx + 60} y2={cy + 18} stroke="#CBD5E1" strokeWidth={0.75} />

      {/* Level */}
      <text x={cx} y={cy + 48} textAnchor="middle"
        fill="#1E293B" fontSize="28" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" letterSpacing="0.12em">
        LEVEL {data.level}
      </text>

      {/* Class + Version */}
      <text x={cx} y={cy + 76} textAnchor="middle"
        fill="#64748B" fontSize="14" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" letterSpacing="0.18em">
        CLASS {data.assuranceClass} · v{data.standardVersion}
      </text>

      {/* Cert ID */}
      <text fill="#64748B" fontSize="12" fontFamily="'IBM Plex Mono', monospace" fontWeight="500" letterSpacing="0.04em">
        <textPath href={`#print-certid-${uid}`} startOffset="50%" textAnchor="middle">
          {data.certId}
        </textPath>
      </text>
    </svg>
  );
}

export default AraBadgePrint;
