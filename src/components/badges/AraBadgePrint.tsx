'use client';

import React, { useId } from 'react';
import type { AraBadgePrintProps } from './types';
import {
  ARA_WORDMARK_PATH,
  ARA_WORDMARK_ORIGIN,
  describeArc,
} from './types';

/**
 * ARA Certification Mark — Print / Static Variant
 *
 * Same four-layer trust seal geometry as AraBadge, but:
 * - No animations (no SMIL <animate> elements)
 * - No gradients (solid fills only)
 * - No filters (no glow, blur, or saturation)
 * - Clean strokes for high-DPI print rendering
 *
 * Designed for PDF documents, compliance reports, and physical certificates.
 */
export function AraBadgePrint({ data, size = 240, className }: AraBadgePrintProps) {
  const uid = useId().replace(/:/g, '');

  const vb = 600;
  const cx = 300;
  const cy = 300;

  // Layer 1 — Authority Ring
  const outerDecorR = 290;
  const authorityR = 280;
  const authorityStroke = 16;
  const innerAuthorityR = 268;
  const upperTextR = 246;
  const lowerTextR = 253;
  const certIdR = 286;
  const tickCount = 12;
  const tickLength = 4;

  // Layer 2 — Identity Separator
  const separatorR = 248;

  // Layer 3 — Signal Ring (static for print — just a solid ring)
  const signalR = 228;
  const signalStroke = 5;

  // Layer 4 — Core Seal
  const sealBorderR = 208;
  const sealSurfaceR = 206;

  // Authority ring gap
  const authorityCirc = 2 * Math.PI * authorityR;
  const gapDeg = 90;
  const gapLen = (gapDeg / 360) * authorityCirc;
  const visLen = authorityCirc - gapLen;
  const dashOffset = ((360 - (90 + gapDeg / 2)) / 360) * authorityCirc;

  // ARA wordmark transform
  const araScale = 0.185;
  const araTargetCX = cx;
  const araTargetCY = cy - 26;

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
        {/* Upper text arc */}
        <path
          id={`print-upper-${uid}`}
          d={describeArc(cx, cy, upperTextR, -210, 30)}
        />
        {/* Lower text arc */}
        <path
          id={`print-lower-${uid}`}
          d={`M ${cx - lowerTextR},${cy} A ${lowerTextR},${lowerTextR} 0 0,0 ${cx + lowerTextR},${cy}`}
        />
        {/* Cert ID arc */}
        <path
          id={`print-certid-${uid}`}
          d={`M ${cx - certIdR},${cy + 10} A ${certIdR},${certIdR} 0 0,0 ${cx + certIdR},${cy + 10}`}
        />
      </defs>

      {/* ═══ Layer 1 — Authority Ring (solid strokes for print) ═══ */}

      <circle cx={cx} cy={cy} r={outerDecorR}
        stroke="#94A3B8" strokeWidth={1} fill="none" opacity={0.5} />

      <circle cx={cx} cy={cy} r={authorityR}
        stroke="#0F172A" strokeWidth={authorityStroke} fill="none"
        strokeDasharray={`${visLen.toFixed(1)} ${gapLen.toFixed(1)}`}
        strokeDashoffset={dashOffset.toFixed(1)} />

      <circle cx={cx} cy={cy} r={innerAuthorityR}
        stroke="#475569" strokeWidth={0.75} fill="none" opacity={0.6} />

      {/* Tick marks */}
      {Array.from({ length: tickCount }).map((_, i) => {
        const angle = (i * 360) / tickCount - 90;
        const rad = (angle * Math.PI) / 180;
        const innerTick = authorityR + authorityStroke / 2 - tickLength;
        const outerTick = authorityR + authorityStroke / 2;
        return (
          <line key={i}
            x1={cx + innerTick * Math.cos(rad)} y1={cy + innerTick * Math.sin(rad)}
            x2={cx + outerTick * Math.cos(rad)} y2={cy + outerTick * Math.sin(rad)}
            stroke="#94A3B8" strokeWidth={1} opacity={0.45} />
        );
      })}

      {/* Upper ring text */}
      <text fill="#E2E8F0" fontSize="24" fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700" letterSpacing="0.06em">
        <textPath href={`#print-upper-${uid}`} startOffset="50%" textAnchor="middle">
          AUTONOMOUS RELIABILITY ASSURANCE
        </textPath>
      </text>

      {/* Lower ring text */}
      <text fill="#E2E8F0" fontSize="24" fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700" letterSpacing="0.40em">
        <textPath href={`#print-lower-${uid}`} startOffset="50%" textAnchor="middle">
          CERTIFIED
        </textPath>
      </text>

      {/* Cert ID */}
      <text fill="#64748B" fontSize="12" fontFamily="'IBM Plex Mono', monospace"
        fontWeight="500" letterSpacing="0.04em">
        <textPath href={`#print-certid-${uid}`} startOffset="50%" textAnchor="middle">
          {data.certId}
        </textPath>
      </text>

      {/* ═══ Layer 2 — Identity Separator ═══ */}

      <circle cx={cx} cy={cy} r={separatorR}
        stroke="#94A3B8" strokeWidth={1.5} fill="none" opacity={0.4} />

      {/* ═══ Layer 3 — Signal Ring (static for print) ═══ */}

      <circle cx={cx} cy={cy} r={signalR}
        stroke="#94A3B8" strokeWidth={signalStroke} fill="none" opacity={0.3} />

      {/* ═══ Layer 4 — Core Seal ═══ */}

      <circle cx={cx} cy={cy} r={sealBorderR}
        stroke="#475569" strokeWidth={1} fill="none" opacity={0.5} />

      {/* White fill for clean print */}
      <circle cx={cx} cy={cy} r={sealSurfaceR} fill="white" />

      {/* ARA traced wordmark */}
      <g transform={`translate(${araTargetCX}, ${araTargetCY}) scale(${araScale}) translate(${-ARA_WORDMARK_ORIGIN.cx}, ${-ARA_WORDMARK_ORIGIN.cy})`}>
        <path d={ARA_WORDMARK_PATH} fill="#0F172A" />
      </g>

      {/* Divider */}
      <line x1={cx - 55} y1={cy + 10} x2={cx + 55} y2={cy + 10}
        stroke="#CBD5E1" strokeWidth={0.75} />

      {/* LEVEL */}
      <text x={cx} y={cy + 38} textAnchor="middle"
        fill="#0F172A" fontSize="26" fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800" letterSpacing="0.15em">
        LEVEL {data.level}
      </text>

      {/* CLASS + version */}
      <text x={cx} y={cy + 58} textAnchor="middle"
        fill="#64748B" fontSize="13" fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600" letterSpacing="0.12em">
        CLASS {data.assuranceClass} · v{data.standardVersion}
      </text>
    </svg>
  );
}

export default AraBadgePrint;
