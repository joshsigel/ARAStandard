'use client';

import React from 'react';

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
  const colors = {
    'dark-on-light': {
      border: '#000000',
      text: '#000000',
      wordmark: '#000000',
      certId: '#555555',
      bg: 'transparent',
    },
    'light-on-dark': {
      border: '#FFFFFF',
      text: '#FFFFFF',
      wordmark: '#FFFFFF',
      certId: '#AAAAAA',
      bg: 'transparent',
    },
    'mono-black': {
      border: '#000000',
      text: '#000000',
      wordmark: '#000000',
      certId: '#333333',
      bg: 'transparent',
    },
    'mono-white': {
      border: '#FFFFFF',
      text: '#FFFFFF',
      wordmark: '#FFFFFF',
      certId: '#CCCCCC',
      bg: 'transparent',
    },
  };

  const c = colors[variant];
  const cx = 120;
  const cy = 120;
  const outerR = 110;
  const innerR = 88;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`ARA Level ${level} Certification Mark — ${certificationId}`}
    >
      {/* Outer border */}
      <circle cx={cx} cy={cy} r={outerR} stroke={c.border} strokeWidth="2.5" fill={c.bg} />

      {/* Inner border */}
      <circle cx={cx} cy={cy} r={innerR} stroke={c.border} strokeWidth="1.5" fill="none" />

      {/* Outer ring text — "AUTONOMOUS RELIABILITY ASSURANCE" */}
      <defs>
        <path
          id={`upperArc-${level}`}
          d={`M ${cx - outerR + 12},${cy} A ${outerR - 12},${outerR - 12} 0 1,1 ${cx + outerR - 12},${cy}`}
        />
        <path
          id={`lowerArc-${level}`}
          d={`M ${cx + outerR - 14},${cy + 4} A ${outerR - 14},${outerR - 14} 0 1,1 ${cx - outerR + 14},${cy + 4}`}
        />
      </defs>

      <text
        fill={c.text}
        fontSize="9.5"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
        letterSpacing="0.18em"
      >
        <textPath
          href={`#upperArc-${level}`}
          startOffset="50%"
          textAnchor="middle"
        >
          AUTONOMOUS RELIABILITY ASSURANCE
        </textPath>
      </text>

      {/* Lower ring text — "CERTIFIED" */}
      <text
        fill={c.text}
        fontSize="10"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        letterSpacing="0.22em"
      >
        <textPath
          href={`#lowerArc-${level}`}
          startOffset="50%"
          textAnchor="middle"
        >
          CERTIFIED
        </textPath>
      </text>

      {/* Central ARA wordmark */}
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        dominantBaseline="central"
        fill={c.wordmark}
        fontSize="48"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        ARA
      </text>

      {/* Level text */}
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        fill={c.text}
        fontSize="13"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="700"
        letterSpacing="0.16em"
      >
        LEVEL {level}
      </text>

      {/* Certification ID */}
      <text
        x={cx}
        y={cy + 52}
        textAnchor="middle"
        fill={c.certId}
        fontSize="6.5"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="400"
        letterSpacing="0.04em"
      >
        Certification ID: {certificationId}
      </text>
    </svg>
  );
}
