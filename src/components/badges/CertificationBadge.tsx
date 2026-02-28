'use client';

import React, { useId } from 'react';

interface CertificationBadgeProps {
  level: 1 | 2 | 3;
  certificationId?: string;
  size?: number;
  variant?: 'dark-on-light' | 'light-on-dark' | 'mono-black' | 'mono-white';
}

export function CertificationBadge({
  level,
  certificationId = 'ARA-2026-XXXXX',
  size = 240,
  variant = 'dark-on-light',
}: CertificationBadgeProps) {
  const uid = useId().replace(/:/g, '');

  const colors = {
    'dark-on-light': {
      ring: '#000000',
      text: '#000000',
      wordmark: '#000000',
      certId: '#555555',
      divider: '#000000',
    },
    'light-on-dark': {
      ring: '#FFFFFF',
      text: '#FFFFFF',
      wordmark: '#FFFFFF',
      certId: '#AAAAAA',
      divider: '#FFFFFF',
    },
    'mono-black': {
      ring: '#000000',
      text: '#000000',
      wordmark: '#000000',
      certId: '#333333',
      divider: '#000000',
    },
    'mono-white': {
      ring: '#FFFFFF',
      text: '#FFFFFF',
      wordmark: '#FFFFFF',
      certId: '#CCCCCC',
      divider: '#FFFFFF',
    },
  };

  const c = colors[variant];

  // High-resolution viewBox for crisp rendering
  const vb = 480;
  const cx = vb / 2;
  const cy = vb / 2;
  const outerR = 220;
  const innerR = 176;
  const textR = 198; // radius for arc text (between rings)

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`ARA Level ${level} Certification Mark — ${certificationId}`}
    >
      {/* Outer ring — thick */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        stroke={c.ring}
        strokeWidth="5"
        fill="none"
      />

      {/* Inner ring — thinner */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        stroke={c.ring}
        strokeWidth="2.5"
        fill="none"
      />

      {/* Arc paths for curved text */}
      <defs>
        {/* Upper arc — text reads left-to-right along the top */}
        <path
          id={`upper-${uid}`}
          d={`M ${cx - textR},${cy} A ${textR},${textR} 0 1,1 ${cx + textR},${cy}`}
        />
        {/* Lower arc — text reads left-to-right along the bottom (reversed sweep) */}
        <path
          id={`lower-${uid}`}
          d={`M ${cx + textR},${cy + 6} A ${textR},${textR} 0 1,1 ${cx - textR},${cy + 6}`}
        />
      </defs>

      {/* Upper ring text: "AUTONOMOUS RELIABILITY ASSURANCE" */}
      <text
        fill={c.text}
        fontSize="19"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.18em"
      >
        <textPath
          href={`#upper-${uid}`}
          startOffset="50%"
          textAnchor="middle"
        >
          AUTONOMOUS RELIABILITY ASSURANCE
        </textPath>
      </text>

      {/* Lower ring text: "CERTIFIED" */}
      <text
        fill={c.text}
        fontSize="20"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        letterSpacing="0.24em"
      >
        <textPath
          href={`#lower-${uid}`}
          startOffset="50%"
          textAnchor="middle"
        >
          CERTIFIED
        </textPath>
      </text>

      {/* Central "ARA" wordmark — large, bold */}
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        dominantBaseline="central"
        fill={c.wordmark}
        fontSize="96"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="900"
        letterSpacing="-0.02em"
      >
        ARA
      </text>

      {/* Horizontal divider line */}
      <line
        x1={cx - 42}
        y1={cy + 28}
        x2={cx + 42}
        y2={cy + 28}
        stroke={c.divider}
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* "LEVEL X" text */}
      <text
        x={cx}
        y={cy + 52}
        textAnchor="middle"
        fill={c.text}
        fontSize="26"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        letterSpacing="0.18em"
      >
        LEVEL {level}
      </text>

      {/* Certification ID */}
      <text
        x={cx}
        y={cy + 100}
        textAnchor="middle"
        fill={c.certId}
        fontSize="12.5"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="400"
        letterSpacing="0.04em"
      >
        Certification ID: {certificationId}
      </text>
    </svg>
  );
}
