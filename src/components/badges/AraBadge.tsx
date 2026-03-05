'use client';

import React, { useId, useState, useCallback } from 'react';
import type { AraBadgeProps, BadgeData } from './types';
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
 * ARA Certification Mark — Primary Badge Component
 *
 * Four-layer radial trust seal communicating:
 *   Layer 1 — Authority Ring (static, institutional)
 *   Layer 2 — Identity Separator (thin ring boundary)
 *   Layer 3 — Signal Ring (ONLY animated layer — breathing opacity)
 *   Layer 4 — Core Seal (ARA traced wordmark, level/class, cert ID)
 *
 * Only Layer 3 animates. Everything else is static and authoritative.
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
  const signal = SIGNAL_CONFIG[data.status];

  const handleClick = useCallback(() => {
    if (interactive && onVerify) onVerify();
  }, [interactive, onVerify]);

  // ─── Geometry (viewBox 600×600, center 300,300) ────────────────
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
  const tickLength = 4;
  const tickCount = 12;

  // Layer 2 — Identity Separator
  const separatorR = 248;

  // Layer 3 — Signal Ring
  const signalR = 228;
  const signalStroke = 5;

  // Layer 4 — Core Seal
  const sealBorderR = 208;
  const sealSurfaceR = 206;

  // Authority ring gap at bottom for cert ID
  const authorityCirc = 2 * Math.PI * authorityR;
  const gapDeg = 90;
  const gapLen = (gapDeg / 360) * authorityCirc;
  const visLen = authorityCirc - gapLen;
  const dashOffset = ((360 - (90 + gapDeg / 2)) / 360) * authorityCirc;

  // ARA wordmark transform: position traced path at center of core seal
  const araScale = 0.185; // scale from source ~265px wide to ~49px in 600 viewBox
  const araTargetCX = cx;
  const araTargetCY = cy - 26;

  const isMuted = status.muted;

  return (
    <div
      className={`ara-badge-wrapper ${interactive ? 'ara-badge-interactive' : ''} ${isHovered ? 'ara-badge-hovered' : ''} ${className || ''}`}
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
          {/* Metallic edge gradient for decorative borders */}
          <linearGradient id={`metallic-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Core seal radial gradient — subtle metallic */}
          <radialGradient id={`seal-${uid}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>

          {/* Very subtle shimmer on core seal (12s cycle) */}
          <linearGradient id={`shimmer-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(241,245,249,0.0)">
              <animate attributeName="stop-color"
                values="rgba(241,245,249,0.0);rgba(241,245,249,0.06);rgba(241,245,249,0.0)"
                dur="12s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="rgba(203,213,225,0.0)">
              <animate attributeName="stop-color"
                values="rgba(203,213,225,0.0);rgba(203,213,225,0.08);rgba(203,213,225,0.0)"
                dur="12s" repeatCount="indefinite" begin="2s" />
            </stop>
            <stop offset="100%" stopColor="rgba(148,163,184,0.0)">
              <animate attributeName="stop-color"
                values="rgba(148,163,184,0.0);rgba(148,163,184,0.04);rgba(148,163,184,0.0)"
                dur="12s" repeatCount="indefinite" begin="4s" />
            </stop>
          </linearGradient>

          {/* Muted filter for suspended/expired */}
          {isMuted && (
            <filter id={`muted-${uid}`}>
              <feColorMatrix type="saturate" values="0.15" />
            </filter>
          )}

          {/* ── Text arc paths ── */}

          {/* Upper text arc: sweeps from below-left over top to below-right */}
          <path
            id={`upper-${uid}`}
            d={describeArc(cx, cy, upperTextR, -210, 30)}
          />

          {/* Lower text arc: semicircle under bottom (counter-clockwise for text reading left-to-right) */}
          <path
            id={`lower-${uid}`}
            d={`M ${cx - lowerTextR},${cy} A ${lowerTextR},${lowerTextR} 0 0,0 ${cx + lowerTextR},${cy}`}
          />

          {/* Cert ID arc at bottom (in authority ring gap) */}
          <path
            id={`certid-${uid}`}
            d={`M ${cx - certIdR},${cy + 10} A ${certIdR},${certIdR} 0 0,0 ${cx + certIdR},${cy + 10}`}
          />
        </defs>

        <g filter={isMuted ? `url(#muted-${uid})` : undefined} opacity={isMuted ? 0.55 : 1}>

          {/* ═══════════════════════════════════════════════════════════
               Layer 1 — AUTHORITY RING (static, institutional)
             ═══════════════════════════════════════════════════════════ */}

          {/* Outer decorative border — steel silver hairline */}
          <circle
            cx={cx} cy={cy} r={outerDecorR}
            stroke={`url(#metallic-${uid})`}
            strokeWidth={1}
            fill="none"
            opacity={0.5}
          />

          {/* Main authority band — deep navy, with 90° gap at bottom */}
          <circle
            cx={cx} cy={cy} r={authorityR}
            stroke="#0F172A"
            strokeWidth={authorityStroke}
            fill="none"
            strokeDasharray={`${visLen.toFixed(1)} ${gapLen.toFixed(1)}`}
            strokeDashoffset={dashOffset.toFixed(1)}
          />

          {/* Inner authority border — thin hairline */}
          <circle
            cx={cx} cy={cy} r={innerAuthorityR}
            stroke="#475569"
            strokeWidth={0.75}
            fill="none"
            opacity={0.6}
          />

          {/* Tick marks — evenly spaced engineering certification stamps */}
          {Array.from({ length: tickCount }).map((_, i) => {
            const angle = (i * 360) / tickCount - 90;
            const rad = (angle * Math.PI) / 180;
            const innerTick = authorityR + authorityStroke / 2 - tickLength;
            const outerTick = authorityR + authorityStroke / 2;
            return (
              <line
                key={i}
                x1={cx + innerTick * Math.cos(rad)}
                y1={cy + innerTick * Math.sin(rad)}
                x2={cx + outerTick * Math.cos(rad)}
                y2={cy + outerTick * Math.sin(rad)}
                stroke="#94A3B8"
                strokeWidth={1}
                opacity={0.45}
              />
            );
          })}

          {/* Upper ring text: AUTONOMOUS RELIABILITY ASSURANCE */}
          <text
            fill="#E2E8F0"
            fontSize="24"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            letterSpacing="0.06em"
          >
            <textPath href={`#upper-${uid}`} startOffset="50%" textAnchor="middle">
              AUTONOMOUS RELIABILITY ASSURANCE
            </textPath>
          </text>

          {/* Lower ring text: CERTIFIED */}
          <text
            fill="#E2E8F0"
            fontSize="24"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            letterSpacing="0.40em"
          >
            <textPath href={`#lower-${uid}`} startOffset="50%" textAnchor="middle">
              CERTIFIED
            </textPath>
          </text>

          {/* Cert ID — in gap at bottom, monospace */}
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

          {/* ═══════════════════════════════════════════════════════════
               Layer 2 — IDENTITY SEPARATOR (thin ring, visual boundary)
             ═══════════════════════════════════════════════════════════ */}

          <circle
            cx={cx} cy={cy} r={separatorR}
            stroke="#94A3B8"
            strokeWidth={1.5}
            fill="none"
            opacity={0.4}
          />

          {/* ═══════════════════════════════════════════════════════════
               Layer 3 — SIGNAL RING (ONLY animated layer)
               Breathing opacity driven by SIGNAL_CONFIG
             ═══════════════════════════════════════════════════════════ */}

          <circle
            cx={cx} cy={cy} r={signalR}
            stroke={signal.color}
            strokeWidth={signalStroke}
            fill="none"
            strokeDasharray={signal.dashPattern}
            strokeLinecap="round"
            opacity={signal.opacityRange[0]}
          >
            {signal.breathing && (
              <animate
                attributeName="opacity"
                values={`${signal.opacityRange[0]};${signal.opacityRange[1]};${signal.opacityRange[0]}`}
                dur={`${signal.cycleDuration}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* ═══════════════════════════════════════════════════════════
               Layer 4 — CORE SEAL (central anchor)
             ═══════════════════════════════════════════════════════════ */}

          {/* Seal border */}
          <circle
            cx={cx} cy={cy} r={sealBorderR}
            stroke="#475569"
            strokeWidth={1}
            fill="none"
            opacity={0.5}
          />

          {/* Seal surface — subtle metallic radial gradient */}
          <circle cx={cx} cy={cy} r={sealSurfaceR} fill={`url(#seal-${uid})`} />
          <circle cx={cx} cy={cy} r={sealSurfaceR} fill={`url(#shimmer-${uid})`} />

          {/* ARA traced wordmark — the dominant central anchor */}
          <g transform={`translate(${araTargetCX}, ${araTargetCY}) scale(${araScale}) translate(${-ARA_WORDMARK_ORIGIN.cx}, ${-ARA_WORDMARK_ORIGIN.cy})`}>
            <path d={ARA_WORDMARK_PATH} fill="#0F172A" />
          </g>

          {/* Thin divider */}
          <line
            x1={cx - 55} y1={cy + 10}
            x2={cx + 55} y2={cy + 10}
            stroke="#CBD5E1"
            strokeWidth={0.75}
          />

          {/* LEVEL designation */}
          <text
            x={cx}
            y={cy + 38}
            textAnchor="middle"
            fill="#0F172A"
            fontSize="26"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="800"
            letterSpacing="0.15em"
          >
            LEVEL {data.level}
          </text>

          {/* CLASS + version */}
          <text
            x={cx}
            y={cy + 58}
            textAnchor="middle"
            fill="#64748B"
            fontSize="13"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="600"
            letterSpacing="0.12em"
          >
            CLASS {data.assuranceClass} · v{data.standardVersion}
          </text>

        </g>
      </svg>

      {/* Hover verification tooltip */}
      {interactive && isHovered && (
        <div className="ara-badge-tooltip">
          <div className="ara-badge-tooltip-inner">
            <div className="ara-badge-tooltip-status">
              <span
                className="ara-badge-tooltip-dot"
                style={{ backgroundColor: signal.color }}
              />
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

export default AraBadge;
