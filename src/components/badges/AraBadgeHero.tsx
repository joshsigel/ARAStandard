'use client';

import React, { useId, useState } from 'react';
import type { AraBadgeHeroProps } from './types';
import {
  BADGE_STATUS_MAP,
  LEVEL_CONFIG,
  CLASS_CONFIG,
  SIGNAL_CONFIG,
  ARA_WORDMARK_PATH,
  ARA_WORDMARK_ORIGIN,
  describeArc,
} from './types';

/**
 * ARA Certification Mark — Hero Variant
 *
 * Elevated showpiece for hero sections and promotional contexts.
 * Same four-layer trust seal architecture as AraBadge, scaled to
 * 700×700 viewBox with more dramatic proportions and an info card below.
 */
export function AraBadgeHero({ data, className }: AraBadgeHeroProps) {
  const uid = useId().replace(/:/g, '');
  const [isHovered, setIsHovered] = useState(false);

  const status = BADGE_STATUS_MAP[data.status];
  const levelCfg = LEVEL_CONFIG[data.level];
  const classCfg = CLASS_CONFIG[data.assuranceClass];
  const signal = SIGNAL_CONFIG[data.status];

  // ─── Geometry (viewBox 700×700, center 350,350) ────────────────
  const vb = 700;
  const cx = 350;
  const cy = 350;

  // Layer 1 — Authority Ring (scaled from 600 base)
  const outerDecorR = 338;
  const authorityR = 327;
  const authorityStroke = 18;
  const innerAuthorityR = 313;
  const upperTextR = 287;
  const lowerTextR = 295;
  const certIdR = 334;
  const tickCount = 12;
  const tickLength = 5;

  // Layer 2 — Identity Separator
  const separatorR = 290;

  // Layer 3 — Signal Ring
  const signalR = 266;
  const signalStroke = 6;

  // Layer 4 — Core Seal
  const sealBorderR = 243;
  const sealSurfaceR = 240;

  // Authority ring gap
  const authorityCirc = 2 * Math.PI * authorityR;
  const gapDeg = 90;
  const gapLen = (gapDeg / 360) * authorityCirc;
  const visLen = authorityCirc - gapLen;
  const dashOffset = ((360 - (90 + gapDeg / 2)) / 360) * authorityCirc;

  // ARA wordmark transform
  const araScale = 0.216;
  const araTargetCX = cx;
  const araTargetCY = cy - 30;

  const isMuted = status.muted;

  return (
    <div
      className={`ara-hero ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow behind badge — blue/silver instead of green */}
      <div
        className="ara-hero-glow"
        style={{
          background: `radial-gradient(ellipse at center, ${signal.color}18 0%, transparent 70%)`,
        }}
      />

      {/* Main badge container */}
      <div className="ara-hero-badge">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${vb} ${vb}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`hero-metallic-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="30%" stopColor="#CBD5E1" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="70%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>

            <radialGradient id={`hero-seal-${uid}`} cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#F1F5F9" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </radialGradient>

            <linearGradient id={`hero-shimmer-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(241,245,249,0.0)">
                <animate attributeName="stop-color"
                  values="rgba(241,245,249,0.0);rgba(241,245,249,0.08);rgba(241,245,249,0.0)"
                  dur="12s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="rgba(203,213,225,0.0)">
                <animate attributeName="stop-color"
                  values="rgba(203,213,225,0.0);rgba(203,213,225,0.1);rgba(203,213,225,0.0)"
                  dur="12s" repeatCount="indefinite" begin="2s" />
              </stop>
              <stop offset="100%" stopColor="rgba(148,163,184,0.0)">
                <animate attributeName="stop-color"
                  values="rgba(148,163,184,0.0);rgba(148,163,184,0.05);rgba(148,163,184,0.0)"
                  dur="12s" repeatCount="indefinite" begin="4s" />
              </stop>
            </linearGradient>

            {isMuted && (
              <filter id={`hero-muted-${uid}`}>
                <feColorMatrix type="saturate" values="0.15" />
              </filter>
            )}

            {/* Text arcs */}
            <path
              id={`hero-upper-${uid}`}
              d={describeArc(cx, cy, upperTextR, -210, 30)}
            />
            <path
              id={`hero-lower-${uid}`}
              d={`M ${cx - lowerTextR},${cy} A ${lowerTextR},${lowerTextR} 0 0,0 ${cx + lowerTextR},${cy}`}
            />
            <path
              id={`hero-certid-${uid}`}
              d={`M ${cx - certIdR},${cy + 10} A ${certIdR},${certIdR} 0 0,0 ${cx + certIdR},${cy + 10}`}
            />
          </defs>

          <g filter={isMuted ? `url(#hero-muted-${uid})` : undefined} opacity={isMuted ? 0.55 : 1}>

            {/* ═══ Layer 1 — Authority Ring ═══ */}

            <circle cx={cx} cy={cy} r={outerDecorR}
              stroke={`url(#hero-metallic-${uid})`} strokeWidth={1} fill="none" opacity={0.5} />

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
                  stroke="#94A3B8" strokeWidth={1.2} opacity={0.45} />
              );
            })}

            {/* Upper ring text */}
            <text fill="#E2E8F0" fontSize="28" fontFamily="Inter, system-ui, sans-serif"
              fontWeight="700" letterSpacing="0.06em">
              <textPath href={`#hero-upper-${uid}`} startOffset="50%" textAnchor="middle">
                AUTONOMOUS RELIABILITY ASSURANCE
              </textPath>
            </text>

            {/* Lower ring text */}
            <text fill="#E2E8F0" fontSize="28" fontFamily="Inter, system-ui, sans-serif"
              fontWeight="700" letterSpacing="0.40em">
              <textPath href={`#hero-lower-${uid}`} startOffset="50%" textAnchor="middle">
                CERTIFIED
              </textPath>
            </text>

            {/* Cert ID */}
            <text fill="#64748B" fontSize="13" fontFamily="'IBM Plex Mono', monospace"
              fontWeight="500" letterSpacing="0.04em">
              <textPath href={`#hero-certid-${uid}`} startOffset="50%" textAnchor="middle">
                {data.certId}
              </textPath>
            </text>

            {/* ═══ Layer 2 — Identity Separator ═══ */}

            <circle cx={cx} cy={cy} r={separatorR}
              stroke="#94A3B8" strokeWidth={1.5} fill="none" opacity={0.4} />

            {/* ═══ Layer 3 — Signal Ring (ONLY animated) ═══ */}

            <circle cx={cx} cy={cy} r={signalR}
              stroke={signal.color} strokeWidth={signalStroke} fill="none"
              strokeDasharray={signal.dashPattern} strokeLinecap="round"
              opacity={signal.opacityRange[0]}>
              {signal.breathing && (
                <animate attributeName="opacity"
                  values={`${signal.opacityRange[0]};${signal.opacityRange[1]};${signal.opacityRange[0]}`}
                  dur={`${signal.cycleDuration}s`} repeatCount="indefinite" />
              )}
            </circle>

            {/* ═══ Layer 4 — Core Seal ═══ */}

            <circle cx={cx} cy={cy} r={sealBorderR}
              stroke="#475569" strokeWidth={1} fill="none" opacity={0.5} />

            <circle cx={cx} cy={cy} r={sealSurfaceR} fill={`url(#hero-seal-${uid})`} />
            <circle cx={cx} cy={cy} r={sealSurfaceR} fill={`url(#hero-shimmer-${uid})`} />

            {/* ARA traced wordmark */}
            <g transform={`translate(${araTargetCX}, ${araTargetCY}) scale(${araScale}) translate(${-ARA_WORDMARK_ORIGIN.cx}, ${-ARA_WORDMARK_ORIGIN.cy})`}>
              <path d={ARA_WORDMARK_PATH} fill="#0F172A" />
            </g>

            {/* Divider */}
            <line x1={cx - 65} y1={cy + 12} x2={cx + 65} y2={cy + 12}
              stroke="#CBD5E1" strokeWidth={0.75} />

            {/* LEVEL */}
            <text x={cx} y={cy + 44} textAnchor="middle"
              fill="#0F172A" fontSize="30" fontFamily="Inter, system-ui, sans-serif"
              fontWeight="800" letterSpacing="0.15em">
              LEVEL {data.level}
            </text>

            {/* CLASS + version */}
            <text x={cx} y={cy + 68} textAnchor="middle"
              fill="#64748B" fontSize="15" fontFamily="Inter, system-ui, sans-serif"
              fontWeight="600" letterSpacing="0.12em">
              CLASS {data.assuranceClass} · v{data.standardVersion}
            </text>

          </g>
        </svg>
      </div>

      {/* Info card below badge */}
      <div className="ara-hero-info">
        {data.orgName && <div className="ara-hero-org">{data.orgName}</div>}
        {data.systemName && <div className="ara-hero-system">{data.systemName}</div>}
        <div className="ara-hero-meta">
          <span className="ara-hero-meta-item">
            <span className="ara-hero-meta-dot" style={{ backgroundColor: signal.color }} />
            {status.label}
          </span>
          <span className="ara-hero-meta-sep">·</span>
          <span className="ara-hero-meta-item">Level {data.level} · Class {data.assuranceClass}</span>
        </div>
      </div>
    </div>
  );
}

export default AraBadgeHero;
