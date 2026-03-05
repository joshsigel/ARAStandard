'use client';

import React, { useId, useState, useCallback } from 'react';
import type { AraBadgeProps, BadgeData } from './types';
import { BADGE_STATUS_MAP, LEVEL_CONFIG, CLASS_CONFIG } from './types';

/**
 * ARA Living Certification Badge — Primary Component
 *
 * A holographic, animated certification seal that communicates:
 * - Certification identity (ARA mark, cert ID)
 * - Certification dimensionality (level, assurance class, version)
 * - Operational monitoring state (living pulse/animation)
 * - Verification capability (click to verify)
 *
 * Architecture: Layered radial trust seal
 *   Outer ring → Assurance signal (class-driven geometry)
 *   Middle ring → Certification level + monitoring state
 *   Inner seal → ARA mark + certification ID
 */
export function AraBadge({
  data,
  size = 280,
  className,
  onVerify,
  interactive = true,
}: AraBadgeProps) {
  const uid = useId().replace(/:/g, '');
  const [isHovered, setIsHovered] = useState(false);

  const status = BADGE_STATUS_MAP[data.status];
  const levelCfg = LEVEL_CONFIG[data.level];
  const classCfg = CLASS_CONFIG[data.assuranceClass];

  const handleClick = useCallback(() => {
    if (interactive && onVerify) onVerify();
  }, [interactive, onVerify]);

  // ─── Geometry ──────────────────────────────────────────────────
  const vb = 600;
  const cx = 300;
  const cy = 300;

  // Outer assurance ring
  const outerR = 280;
  const outerStroke = 3;

  // Middle certification ring
  const midR = 258;
  const midStroke = 12;

  // Inner seal border
  const innerR = 230;
  const innerStroke = 1.5;

  // Holographic surface
  const surfaceR = 226;

  // Text arcs
  const upperTextR = 244;
  const certIdR = 284;

  // ARA wordmark position
  const araY = cy - 20;

  // Circumference for dash calculations
  const outerCirc = 2 * Math.PI * outerR;
  const midCirc = 2 * Math.PI * midR;

  // ─── Assurance Class Ring Pattern ──────────────────────────────
  const classRingPattern = (() => {
    switch (data.assuranceClass) {
      case 'A':
        // Dashed: 8 segments with gaps
        const segA = outerCirc / 8;
        return { dasharray: `${segA * 0.7} ${segA * 0.3}`, dashoffset: 0 };
      case 'B':
        // Segmented: 16 finer segments
        const segB = outerCirc / 16;
        return { dasharray: `${segB * 0.8} ${segB * 0.2}`, dashoffset: 0 };
      case 'C':
        // Continuous: solid ring
        return { dasharray: 'none', dashoffset: 0 };
    }
  })();

  // ─── Level Ring Count ──────────────────────────────────────────
  const levelRings = (() => {
    const rings = [];
    for (let i = 0; i < levelCfg.ringCount; i++) {
      rings.push(midR - i * 4);
    }
    return rings;
  })();

  // ─── Monitoring State Ring ─────────────────────────────────────
  // Gap at bottom for cert ID
  const gapDeg = 60;
  const gapLen = (gapDeg / 360) * midCirc;
  const visLen = midCirc - gapLen;
  const dashOffset = ((360 - (90 + gapDeg / 2)) / 360) * midCirc;

  const isMuted = status.muted;

  return (
    <div
      className={`ara-badge-wrapper ${status.animation} ${interactive ? 'ara-badge-interactive' : ''} ${isHovered ? 'ara-badge-hovered' : ''} ${className || ''}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        cursor: interactive ? 'pointer' : 'default',
        width: size,
        height: size,
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={interactive ? 'button' : 'img'}
      aria-label={`ARA Level ${data.level} Class ${data.assuranceClass} Certification — ${status.label} — ${data.certId}`}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${vb} ${vb}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ara-badge-svg"
      >
        <defs>
          {/* Holographic gradient */}
          <radialGradient id={`holo-${uid}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.06)" />
            <stop offset="40%" stopColor="rgba(100, 116, 139, 0.03)" />
            <stop offset="100%" stopColor="rgba(30, 41, 59, 0.08)" />
          </radialGradient>

          {/* Iridescent shimmer overlay */}
          <linearGradient id={`shimmer-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.0)">
              <animate attributeName="stop-color" values="rgba(148,163,184,0.0);rgba(148,163,184,0.08);rgba(148,163,184,0.0)" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="35%" stopColor="rgba(100, 116, 139, 0.04)">
              <animate attributeName="stop-color" values="rgba(100,116,139,0.04);rgba(203,213,225,0.1);rgba(100,116,139,0.04)" dur="6s" repeatCount="indefinite" begin="0.5s" />
            </stop>
            <stop offset="65%" stopColor="rgba(71, 85, 105, 0.02)">
              <animate attributeName="stop-color" values="rgba(71,85,105,0.02);rgba(148,163,184,0.08);rgba(71,85,105,0.02)" dur="6s" repeatCount="indefinite" begin="1s" />
            </stop>
            <stop offset="100%" stopColor="rgba(30, 41, 59, 0.0)">
              <animate attributeName="stop-color" values="rgba(30,41,59,0.0);rgba(71,85,105,0.06);rgba(30,41,59,0.0)" dur="6s" repeatCount="indefinite" begin="1.5s" />
            </stop>
          </linearGradient>

          {/* Metallic edge gradient */}
          <linearGradient id={`metallic-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Status glow filter */}
          <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor={status.glowColor} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtle depth shadow */}
          <filter id={`depth-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.08)" />
          </filter>

          {/* Upper text arc */}
          <path
            id={`upper-${uid}`}
            d={describeArc(cx, cy, upperTextR, -210, 30)}
          />

          {/* Lower text arc (for CERTIFIED) */}
          <path
            id={`lower-${uid}`}
            d={`M ${cx - upperTextR},${cy + 10} A ${upperTextR},${upperTextR} 0 0,0 ${cx + upperTextR},${cy + 10}`}
          />

          {/* Cert ID arc at bottom */}
          <path
            id={`certid-${uid}`}
            d={`M ${cx - certIdR},${cy + 10} A ${certIdR},${certIdR} 0 0,0 ${cx + certIdR},${cy + 10}`}
          />

          {/* Microprint circular path */}
          <circle id={`micro-${uid}`} cx={cx} cy={cy} r={218} />

          {/* Muted overlay for suspended/expired */}
          {isMuted && (
            <filter id={`muted-${uid}`}>
              <feColorMatrix type="saturate" values="0.15" />
            </filter>
          )}
        </defs>

        {/* ═══ Layer 0: Subtle depth shadow ═══ */}
        <circle cx={cx} cy={cy + 2} r={outerR + 4} fill="rgba(0,0,0,0.04)" filter={`url(#depth-${uid})`} />

        <g filter={isMuted ? `url(#muted-${uid})` : undefined} opacity={isMuted ? 0.55 : 1}>

          {/* ═══ Layer 1: Outer Assurance Ring ═══ */}
          <g className="ara-badge-outer-ring" filter={!isMuted ? `url(#glow-${uid})` : undefined}>
            {/* Ring background */}
            <circle
              cx={cx} cy={cy} r={outerR}
              stroke={`url(#metallic-${uid})`}
              strokeWidth={outerStroke}
              fill="none"
              opacity={0.3}
            />
            {/* Class-driven pattern ring */}
            <circle
              cx={cx} cy={cy} r={outerR}
              stroke="#475569"
              strokeWidth={outerStroke}
              fill="none"
              strokeDasharray={classRingPattern.dasharray}
              strokeLinecap="round"
              className="ara-badge-assurance-ring"
            />

            {/* Tick marks for Class A and B */}
            {classCfg.tickCount > 0 && Array.from({ length: classCfg.tickCount }).map((_, i) => {
              const angle = (i * 360) / classCfg.tickCount - 90;
              const rad = (angle * Math.PI) / 180;
              const innerTick = outerR - 8;
              const outerTick = outerR + 4;
              return (
                <line
                  key={i}
                  x1={cx + innerTick * Math.cos(rad)}
                  y1={cy + innerTick * Math.sin(rad)}
                  x2={cx + outerTick * Math.cos(rad)}
                  y2={cy + outerTick * Math.sin(rad)}
                  stroke="#94A3B8"
                  strokeWidth={1}
                  opacity={0.4}
                />
              );
            })}
          </g>

          {/* ═══ Layer 2: Middle Certification Ring ═══ */}
          <g className="ara-badge-mid-ring">
            {/* Level rings — more rings = higher level */}
            {levelRings.map((r, i) => (
              <circle
                key={i}
                cx={cx} cy={cy} r={r}
                stroke="#1E293B"
                strokeWidth={i === 0 ? midStroke : 1.5}
                fill="none"
                strokeDasharray={i === 0 ? `${visLen.toFixed(1)} ${gapLen.toFixed(1)}` : 'none'}
                strokeDashoffset={i === 0 ? dashOffset.toFixed(1) : '0'}
                opacity={i === 0 ? 1 : 0.2}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* ═══ Layer 3: Inner Seal Border ═══ */}
          <circle
            cx={cx} cy={cy} r={innerR}
            stroke="#334155"
            strokeWidth={innerStroke}
            fill="none"
          />

          {/* ═══ Layer 4: Holographic Surface ═══ */}
          <circle
            cx={cx} cy={cy} r={surfaceR}
            fill={`url(#holo-${uid})`}
          />
          <circle
            cx={cx} cy={cy} r={surfaceR}
            fill={`url(#shimmer-${uid})`}
            className="ara-badge-shimmer"
          />
          {/* Inner surface border */}
          <circle
            cx={cx} cy={cy} r={surfaceR}
            stroke="#CBD5E1"
            strokeWidth={0.5}
            fill="none"
            opacity={0.3}
          />

          {/* ═══ Layer 5: Microprint Security Ring ═══ */}
          <text
            fill="#94A3B8"
            fontSize="5.5"
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight="400"
            letterSpacing="0.08em"
            opacity={0.25}
          >
            <textPath href={`#micro-${uid}`} startOffset="0%">
              ARA·STANDARD·v{data.standardVersion}·CERTIFIED·{data.certId}·LEVEL·{data.level}·CLASS·{data.assuranceClass}·ARA·STANDARD·v{data.standardVersion}·CERTIFIED·{data.certId}·LEVEL·{data.level}·CLASS·{data.assuranceClass}·
            </textPath>
          </text>

          {/* ═══ Layer 6: Ring Text ═══ */}
          {/* Upper arc — AUTONOMOUS RELIABILITY ASSURANCE */}
          <text
            fill="#1E293B"
            fontSize="26"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            <textPath href={`#upper-${uid}`} startOffset="50%" textAnchor="middle">
              AUTONOMOUS RELIABILITY ASSURANCE
            </textPath>
          </text>

          {/* Lower arc — CERTIFIED */}
          <text
            fill="#1E293B"
            fontSize="26"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            letterSpacing="0.45em"
          >
            <textPath href={`#lower-${uid}`} startOffset="50%" textAnchor="middle">
              CERTIFIED
            </textPath>
          </text>

          {/* ═══ Layer 7: Central Identity ═══ */}
          <g className="ara-badge-center">
            {/* ARA Wordmark */}
            <text
              x={cx}
              y={araY}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#0F172A"
              fontSize="68"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="900"
              letterSpacing="0.08em"
            >
              ARA
            </text>

            {/* Thin divider */}
            <line
              x1={cx - 60} y1={cy + 18}
              x2={cx + 60} y2={cy + 18}
              stroke="#CBD5E1"
              strokeWidth={0.75}
            />

            {/* Level + Class designation */}
            <text
              x={cx}
              y={cy + 48}
              textAnchor="middle"
              fill="#1E293B"
              fontSize="28"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="800"
              letterSpacing="0.12em"
            >
              LEVEL {data.level}
            </text>

            {/* Assurance Class label */}
            <text
              x={cx}
              y={cy + 76}
              textAnchor="middle"
              fill="#64748B"
              fontSize="14"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="600"
              letterSpacing="0.18em"
            >
              CLASS {data.assuranceClass} · v{data.standardVersion}
            </text>

            {/* Status indicator */}
            <StatusIndicator cx={cx} cy={cy + 102} status={data.status} uid={uid} />
          </g>

          {/* ═══ Layer 8: Certification ID (bottom arc) ═══ */}
          <text
            fill="#64748B"
            fontSize="12"
            fontFamily="'IBM Plex Mono', monospace"
            fontWeight="500"
            letterSpacing="0.04em"
          >
            <textPath href={`#certid-${uid}`} startOffset="50%" textAnchor="middle">
              {data.certId}
            </textPath>
          </text>

        </g>
      </svg>

      {/* Hover verification tooltip */}
      {interactive && isHovered && (
        <div className="ara-badge-tooltip">
          <div className="ara-badge-tooltip-inner">
            <div className="ara-badge-tooltip-status">
              <span className={`ara-badge-tooltip-dot ara-badge-dot-${data.status}`} />
              <span>{status.label}</span>
            </div>
            <div className="ara-badge-tooltip-id">{data.certId}</div>
            {data.orgName && <div className="ara-badge-tooltip-org">{data.orgName}</div>}
            <div className="ara-badge-tooltip-action">Click to verify →</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Status Indicator Sub-Component ────────────────────────────────────────

function StatusIndicator({ cx, cy, status, uid }: { cx: number; cy: number; status: BadgeData['status']; uid: string }) {
  const state = BADGE_STATUS_MAP[status];

  const dotColors: Record<BadgeData['status'], string> = {
    active: '#16A34A',
    monitoring_connected: '#3B82F6',
    monitoring_delayed: '#D97706',
    revalidation_required: '#D97706',
    suspended: '#DC2626',
    expired: '#94A3B8',
  };

  const color = dotColors[status];
  const showPulse = state.pulseSpeed > 0;

  return (
    <g>
      {/* Pulse ring */}
      {showPulse && (
        <circle cx={cx} cy={cy} r={4} fill="none" stroke={color} strokeWidth={1} opacity={0.3}>
          <animate attributeName="r" values="4;10;4" dur={`${state.pulseSpeed}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur={`${state.pulseSpeed}s`} repeatCount="indefinite" />
        </circle>
      )}
      {/* Status dot */}
      <circle cx={cx} cy={cy} r={3.5} fill={color} />
      {/* Status label */}
      <text
        x={cx}
        y={cy + 16}
        textAnchor="middle"
        fill="#94A3B8"
        fontSize="8"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="500"
        letterSpacing="0.08em"
      >
        {state.label.toUpperCase()}
      </text>
    </g>
  );
}

// ─── SVG Arc Utility ───────────────────────────────────────────────────────

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2}`;
}

export default AraBadge;
