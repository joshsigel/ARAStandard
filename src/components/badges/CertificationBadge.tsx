'use client';

import React, { useId } from 'react';

interface CertificationBadgeProps {
  level: 1 | 2 | 3;
  certificationId?: string;
  size?: number;
  variant?: 'dark-on-light' | 'light-on-dark' | 'mono-black' | 'mono-white';
  className?: string;
  /** Assurance class indicator (deployment certs only) */
  assuranceClass?: 'A' | 'B' | 'C';
  /** Certification type — defaults to 'deployment' */
  certType?: 'deployment' | 'platform';
  /** Operational state — drives living badge CSS animation */
  operationalState?: 'active' | 'monitoring-active' | 'monitoring-delayed' | 'revalidation' | 'suspended' | 'expired';
}

const stateClassMap: Record<NonNullable<CertificationBadgeProps['operationalState']>, string> = {
  'active': 'badge-state-active',
  'monitoring-active': 'badge-state-monitoring-active',
  'monitoring-delayed': 'badge-state-monitoring-delayed',
  'revalidation': 'badge-state-revalidation',
  'suspended': 'badge-state-suspended',
  'expired': 'badge-state-expired',
};

export function CertificationBadge({
  level,
  certificationId = 'ARA-2026-XXXXX',
  size = 240,
  variant = 'dark-on-light',
  className,
  assuranceClass,
  certType = 'deployment',
  operationalState,
}: CertificationBadgeProps) {
  const uid = useId().replace(/:/g, '');

  const colors = {
    'dark-on-light': {
      ring: '#111111',
      text: '#111111',
      fill: '#111111',
      certId: '#555555',
    },
    'light-on-dark': {
      ring: '#FFFFFF',
      text: '#FFFFFF',
      fill: '#FFFFFF',
      certId: '#AAAAAA',
    },
    'mono-black': {
      ring: '#000000',
      text: '#000000',
      fill: '#000000',
      certId: '#333333',
    },
    'mono-white': {
      ring: '#FFFFFF',
      text: '#FFFFFF',
      fill: '#FFFFFF',
      certId: '#CCCCCC',
    },
  };

  const c = colors[variant];

  /*
   * Badge geometry — precision-matched to reference SVG (ARAbadge.svg).
   *
   * Reference measured via getBBox() on all 155 paths:
   *   Badge center:        (1131.6, 522.0)
   *   Outer ring outer R:  264     → 286 (stroke center), edge at 292.5
   *   Outer ring band:     252–264 → 13 stroke width
   *   Outer ring gap:      97° centered at bottom (cert ID space)
   *   Inner border:        172.5–179.3 (double concentric circles)
   *   Ring text center:    R=213   (centered in channel for fontSize=38)
   *   Cert ID center:      R=292   → certIdR=292
   *   ARA wordmark:        29px above center
   *   LEVEL center:        100px below center
   *
   * Text sizing:
   *   Upper + CERTIFIED:   fontSize=38, fontWeight=800
   *   CERTIFIED:           wide letter-spacing (0.50em) to span lower arc
   *   Cert ID:             fontSize=18, fontWeight=500
   *   LEVEL:               fontSize=38, fontWeight=800
   */

  const vb = 620;
  const cx = 310;
  const cy = 300;

  // Outer ring band — with gap at bottom for cert ID
  const outerBandR = 286;
  const outerBandStroke = 16;
  const outerCirc = 2 * Math.PI * outerBandR;
  const gapDeg = 97;
  const gapLen = (gapDeg / 360) * outerCirc;
  const visLen = outerCirc - gapLen;
  // Positive dashoffset shifts pattern backward; centers gap at bottom (90°)
  const dashOffset =
    ((360 - (90 + gapDeg / 2)) / 360) * outerCirc;

  // Inner border
  const innerBorderR = 190;
  const innerBorderStroke = 6;

  // Text arc — centered in the donut channel between the two circles.
  // Channel: outer inner edge=278, inner outer edge=193, width=85.
  //
  // UPPER text extends OUTWARD from baseline (away from center):
  //   upperTextR = (outerInner + innerOuter - capHeight) / 2
  //   At fontSize=38, capHeight≈46: centered = (278+193-46)/2 = 212.5
  //   Shifted ~8px toward inner circle per user request:
  //   upperTextR=205, text R=205 to R=251. Inside gap: 12, Outside gap: 27.
  //
  // LOWER text extends INWARD from baseline (toward center):
  //   lowerTextR = (outerInner + innerOuter + capHeight) / 2
  //   At fontSize=38: lowerTextR = (278+193+46)/2 = 258.5 → 259
  //   Text occupies R=213 to R=259. Inside gap: 20, Outside gap: 19. ✓
  const upperTextR = 218;
  const lowerTextR = 255;
  const arcExtendDeg = 25; // degrees below the horizontal midline on each side

  // Cert ID arc — in the outer ring gap area
  const certIdR = 292;

  // ARA wordmark — traced from reference SVG line 74
  const araScale = 1.106;
  const araSrcCX = 1132.76;
  const araSrcCY = 495.52;
  const araOffsetY = 29;
  const araTargetCX = cx;
  const araTargetCY = cy - araOffsetY;

  // LEVEL text
  const levelY = cy + 100;

  // Subline text (CLASS X for deployment, LEVEL X for platform)
  const sublineY = cy + 135;

  const isPlatform = certType === 'platform';

  // Aria label
  const ariaLabel = isPlatform
    ? `ARA Platform Certification Level ${level} — ${certificationId}`
    : `ARA Level ${level} Certification Mark — ${certificationId}`;

  // Wrapper state class
  const stateClass = operationalState ? stateClassMap[operationalState] : undefined;

  return (
    <div
      style={{ display: 'inline-block' }}
      className={stateClass}
    >
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      {/* Outer ring band — with gap at bottom for cert ID */}
      <circle
        cx={cx}
        cy={cy}
        r={outerBandR}
        stroke={c.ring}
        strokeWidth={outerBandStroke}
        fill="none"
        strokeDasharray={`${visLen.toFixed(1)} ${gapLen.toFixed(1)}`}
        strokeDashoffset={dashOffset.toFixed(1)}
      />

      {/* Inner border */}
      <circle
        cx={cx}
        cy={cy}
        r={innerBorderR}
        stroke={c.ring}
        strokeWidth={innerBorderStroke}
        fill="none"
      />

      {/* Arc paths for curved text */}
      <defs>
        {/* Upper arc — extends past semicircle for larger text.
            Starts below-left, sweeps clockwise over top to below-right. */}
        <path
          id={`upper-${uid}`}
          d={`M ${cx - upperTextR * Math.cos(arcExtendDeg * Math.PI / 180)},${cy + upperTextR * Math.sin(arcExtendDeg * Math.PI / 180)} A ${upperTextR},${upperTextR} 0 1,1 ${cx + upperTextR * Math.cos(arcExtendDeg * Math.PI / 180)},${cy + upperTextR * Math.sin(arcExtendDeg * Math.PI / 180)}`}
        />
        {/* Lower arc — semicircle under bottom at larger R (text extends inward).
            sweep=0 = counterclockwise from left to right = under bottom. */}
        <path
          id={`lower-${uid}`}
          d={`M ${cx - lowerTextR},${cy} A ${lowerTextR},${lowerTextR} 0 0,0 ${cx + lowerTextR},${cy}`}
        />
        {/* Cert ID arc — bottom portion at outer ring radius */}
        <path
          id={`cert-${uid}`}
          d={`M ${cx - certIdR},${cy} A ${certIdR},${certIdR} 0 0,0 ${cx + certIdR},${cy}`}
        />
      </defs>

      {/* Upper ring text — AUTONOMOUS RELIABILITY ASSURANCE */}
      <text
        fill={c.text}
        fontSize="38"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        letterSpacing="0.03em"
      >
        <textPath
          href={`#upper-${uid}`}
          startOffset="50%"
          textAnchor="middle"
        >
          AUTONOMOUS RELIABILITY ASSURANCE
        </textPath>
      </text>

      {/* Lower ring text — CERTIFIED with wide spacing */}
      <text
        fill={c.text}
        fontSize="38"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        letterSpacing="0.38em"
      >
        <textPath
          href={`#lower-${uid}`}
          startOffset="50%"
          textAnchor="middle"
        >
          CERTIFIED
        </textPath>
      </text>

      {/* Central ARA wordmark — from reference SVG (Adobe Illustrator trace) */}
      <g
        transform={`translate(${araTargetCX}, ${araTargetCY}) scale(${araScale}) translate(${-araSrcCX}, ${-araSrcCY})`}
        fill={c.fill}
      >
        <path d="M1198.36,525.92l-8.33,31.14-25.09-.14-36.38-58.37-4.92-6.96,3.17-1.73c7.03-.32,12.09-.94,17.86-2.32,7.69-3.84,12.16-10.22,11.62-18.78-.74-7.9-6.93-13.51-15.7-16.11l-27.38-.07-.25,32.26.22,69.35-1.82,2.73-36.18.09-12.69-45.87-7.49-26.33-2.38-11.27-1.62-2.56-2.23,1.66-10.3,20.87-8.26,15.74-5.85,12.49-14.27,28.02-5.34,7.48-18.93-.28.53-4.77,9.66-18.35,25.33-50.45c4.93-9.23,9.06-17.76,13.02-26.84l11.44-22.49,15.79-.37,2.77,2.74,18.8,73.4,8.36,24.8.27-100.72,46.19-.05c12.21-.6,23.56,3.83,31.48,12.9,9.28,11.72,9.88,26.98,3.69,41.08-4.22,7.21-10.18,11.6-18.01,14.71l.47,3.19,15.79,24.54c1.69,1.83,3.85,2.68,3.39.54l2.53-7.09,20.92-75.9,3.07-11.08,2.5-2.79,15.11-.07,6.38,11.11,7.69,16.9,12.26,24.86,30.16,60.69,4.28,9.22-19.22.68-4.49-3.94-26.05-52.69-13.77-27.75-1.96-1.82-1.29,2.43-4.93,18.56-9.67,33.75Z" />
      </g>

      {/* Main line — "LEVEL X" for deployment, "PLATFORM" for platform */}
      <text
        x={cx}
        y={levelY}
        textAnchor="middle"
        fill={c.text}
        fontSize="38"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        letterSpacing="0.15em"
      >
        {isPlatform ? 'PLATFORM' : `LEVEL ${level}`}
      </text>

      {/* Subline — CLASS X for deployment (when assuranceClass provided),
          LEVEL X for platform */}
      {isPlatform && (
        <text
          x={cx}
          y={sublineY}
          textAnchor="middle"
          fill={c.certId}
          fontSize="22"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          LEVEL {level}
        </text>
      )}
      {!isPlatform && assuranceClass && (
        <text
          x={cx}
          y={sublineY}
          textAnchor="middle"
          fill={c.certId}
          fontSize="22"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          CLASS {assuranceClass}
        </text>
      )}

      {/* Certification ID — curved along bottom in outer ring gap */}
      <text
        fill={c.certId}
        fontSize="24"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="500"
        letterSpacing="0.03em"
        dy="6"
      >
        <textPath
          href={`#cert-${uid}`}
          startOffset="50%"
          textAnchor="middle"
        >
          Certification ID: {certificationId}
        </textPath>
      </text>
    </svg>
    </div>
  );
}
