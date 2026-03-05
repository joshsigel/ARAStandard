'use client';

import React, { useId, useState } from 'react';
import type { AraBadgeHeroProps } from './types';
import { BADGE_STATUS_MAP, LEVEL_CONFIG, CLASS_CONFIG } from './types';

/**
 * ARA Badge — Hero Variant
 *
 * An elevated "showpiece" version for hero sections, certification pages,
 * and promotional contexts. Larger, more dramatic holographic effects,
 * with expanded information display.
 */
export function AraBadgeHero({ data, className }: AraBadgeHeroProps) {
  const uid = useId().replace(/:/g, '');
  const [isHovered, setIsHovered] = useState(false);

  const status = BADGE_STATUS_MAP[data.status];
  const levelCfg = LEVEL_CONFIG[data.level];
  const classCfg = CLASS_CONFIG[data.assuranceClass];

  const dotColors: Record<typeof data.status, string> = {
    active: '#16A34A',
    monitoring_connected: '#3B82F6',
    monitoring_delayed: '#D97706',
    revalidation_required: '#D97706',
    suspended: '#DC2626',
    expired: '#94A3B8',
  };

  return (
    <div
      className={`ara-hero ${status.animation} ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow behind badge */}
      <div
        className="ara-hero-glow"
        style={{
          background: `radial-gradient(ellipse at center, ${status.glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Main badge container */}
      <div className="ara-hero-badge">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Hero holographic gradient — more dramatic */}
            <radialGradient id={`hero-holo-${uid}`} cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(241, 245, 249, 0.15)" />
              <stop offset="30%" stopColor="rgba(203, 213, 225, 0.08)" />
              <stop offset="60%" stopColor="rgba(148, 163, 184, 0.04)" />
              <stop offset="100%" stopColor="rgba(30, 41, 59, 0.1)" />
            </radialGradient>

            <linearGradient id={`hero-shimmer-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(226,232,240,0.0)">
                <animate attributeName="stop-color" values="rgba(226,232,240,0.0);rgba(226,232,240,0.12);rgba(226,232,240,0.0)" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="rgba(148,163,184,0.0)">
                <animate attributeName="stop-color" values="rgba(148,163,184,0.0);rgba(203,213,225,0.15);rgba(148,163,184,0.0)" dur="8s" repeatCount="indefinite" begin="1s" />
              </stop>
              <stop offset="100%" stopColor="rgba(71,85,105,0.0)">
                <animate attributeName="stop-color" values="rgba(71,85,105,0.0);rgba(148,163,184,0.08);rgba(71,85,105,0.0)" dur="8s" repeatCount="indefinite" begin="2s" />
              </stop>
            </linearGradient>

            <linearGradient id={`hero-metallic-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="25%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="75%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <filter id={`hero-glow-${uid}`} x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feFlood floodColor={status.glowColor} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Text arcs */}
            <path
              id={`hero-upper-${uid}`}
              d={`M ${350 - 282 * Math.cos(25 * Math.PI / 180)},${350 + 282 * Math.sin(25 * Math.PI / 180)} A 282,282 0 1,1 ${350 + 282 * Math.cos(25 * Math.PI / 180)},${350 + 282 * Math.sin(25 * Math.PI / 180)}`}
            />
            <path
              id={`hero-lower-${uid}`}
              d={`M ${350 - 282},${360} A 282,282 0 0,0 ${350 + 282},${360}`}
            />
            <path
              id={`hero-certid-${uid}`}
              d={`M ${350 - 328},${360} A 328,328 0 0,0 ${350 + 328},${360}`}
            />
            <circle id={`hero-micro-${uid}`} cx="350" cy="350" r="252" />
          </defs>

          {/* Outer decorative ring */}
          <circle cx="350" cy="350" r="330" stroke={`url(#hero-metallic-${uid})`} strokeWidth={1.5} fill="none" opacity={0.4} />

          {/* Outer assurance ring */}
          <g filter={`url(#hero-glow-${uid})`}>
            <circle cx="350" cy="350" r="322" stroke="#475569" strokeWidth={3} fill="none"
              strokeDasharray={classCfg.ringStyle === 'continuous' ? 'none' : classCfg.ringStyle === 'segmented' ? `${(2 * Math.PI * 322) / 16 * 0.8} ${(2 * Math.PI * 322) / 16 * 0.2}` : `${(2 * Math.PI * 322) / 8 * 0.7} ${(2 * Math.PI * 322) / 8 * 0.3}`}
              strokeLinecap="round"
            />
            {/* Tick marks */}
            {classCfg.tickCount > 0 && Array.from({ length: classCfg.tickCount }).map((_, i) => {
              const angle = (i * 360) / classCfg.tickCount - 90;
              const rad = (angle * Math.PI) / 180;
              return (
                <line key={i}
                  x1={350 + 314 * Math.cos(rad)} y1={350 + 314 * Math.sin(rad)}
                  x2={350 + 330 * Math.cos(rad)} y2={350 + 330 * Math.sin(rad)}
                  stroke="#94A3B8" strokeWidth={1.2} opacity={0.4}
                />
              );
            })}
          </g>

          {/* Mid certification ring */}
          {(() => {
            const midR = 298;
            const midCirc = 2 * Math.PI * midR;
            const gapLen = (60 / 360) * midCirc;
            const visLen = midCirc - gapLen;
            const offset = ((360 - 120) / 360) * midCirc;
            return (
              <>
                <circle cx="350" cy="350" r={midR} stroke="#0F172A" strokeWidth={14}
                  fill="none" strokeDasharray={`${visLen.toFixed(1)} ${gapLen.toFixed(1)}`}
                  strokeDashoffset={offset.toFixed(1)} strokeLinecap="round"
                />
                {levelCfg.ringCount >= 2 && (
                  <circle cx="350" cy="350" r={midR - 5} stroke="#1E293B" strokeWidth={1.5} fill="none" opacity={0.25} />
                )}
                {levelCfg.ringCount >= 3 && (
                  <circle cx="350" cy="350" r={midR - 9} stroke="#1E293B" strokeWidth={1.5} fill="none" opacity={0.15} />
                )}
              </>
            );
          })()}

          {/* Inner seal border */}
          <circle cx="350" cy="350" r="266" stroke="#334155" strokeWidth={1.5} fill="none" />

          {/* Holographic surface */}
          <circle cx="350" cy="350" r="262" fill={`url(#hero-holo-${uid})`} />
          <circle cx="350" cy="350" r="262" fill={`url(#hero-shimmer-${uid})`} />
          <circle cx="350" cy="350" r="262" stroke="#E2E8F0" strokeWidth={0.5} fill="none" opacity={0.2} />

          {/* Microprint */}
          <text fill="#94A3B8" fontSize="6" fontFamily="'IBM Plex Mono', monospace" fontWeight="400" letterSpacing="0.08em" opacity={0.2}>
            <textPath href={`#hero-micro-${uid}`} startOffset="0%">
              ARA·STANDARD·v{data.standardVersion}·CERTIFIED·{data.certId}·LEVEL·{data.level}·CLASS·{data.assuranceClass}·ARA·STANDARD·v{data.standardVersion}·CERTIFIED·{data.certId}·LEVEL·{data.level}·CLASS·{data.assuranceClass}·
            </textPath>
          </text>

          {/* Ring text */}
          <text fill="#1E293B" fontSize="28" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="0.06em">
            <textPath href={`#hero-upper-${uid}`} startOffset="50%" textAnchor="middle">
              AUTONOMOUS RELIABILITY ASSURANCE
            </textPath>
          </text>
          <text fill="#1E293B" fontSize="28" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" letterSpacing="0.45em">
            <textPath href={`#hero-lower-${uid}`} startOffset="50%" textAnchor="middle">
              CERTIFIED
            </textPath>
          </text>

          {/* Central identity */}
          <text x="350" y="330" textAnchor="middle" dominantBaseline="central"
            fill="#0F172A" fontSize="78" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" letterSpacing="0.08em">
            ARA
          </text>
          <line x1="290" y1="370" x2="410" y2="370" stroke="#CBD5E1" strokeWidth={0.75} />
          <text x="350" y="402" textAnchor="middle"
            fill="#1E293B" fontSize="32" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" letterSpacing="0.12em">
            LEVEL {data.level}
          </text>
          <text x="350" y="432" textAnchor="middle"
            fill="#64748B" fontSize="16" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" letterSpacing="0.18em">
            CLASS {data.assuranceClass} · v{data.standardVersion}
          </text>

          {/* Status indicator */}
          <circle cx="350" cy="462" r={4} fill={dotColors[data.status]}>
            {status.pulseSpeed > 0 && (
              <animate attributeName="opacity" values="1;0.4;1" dur={`${status.pulseSpeed}s`} repeatCount="indefinite" />
            )}
          </circle>
          <text x="350" y="480" textAnchor="middle"
            fill="#94A3B8" fontSize="9" fontFamily="'IBM Plex Mono', monospace" fontWeight="500" letterSpacing="0.08em">
            {status.label.toUpperCase()}
          </text>

          {/* Cert ID */}
          <text fill="#64748B" fontSize="13" fontFamily="'IBM Plex Mono', monospace" fontWeight="500" letterSpacing="0.04em">
            <textPath href={`#hero-certid-${uid}`} startOffset="50%" textAnchor="middle">
              {data.certId}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Info card below badge */}
      <div className="ara-hero-info">
        {data.orgName && <div className="ara-hero-org">{data.orgName}</div>}
        {data.systemName && <div className="ara-hero-system">{data.systemName}</div>}
        <div className="ara-hero-meta">
          <span className="ara-hero-meta-item">
            <span className="ara-hero-meta-dot" style={{ backgroundColor: dotColors[data.status] }} />
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
