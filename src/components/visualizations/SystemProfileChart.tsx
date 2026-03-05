'use client';

import { useState } from 'react';
import type { SystemProfileCode } from '@/types';

interface ProfileData {
  code: SystemProfileCode;
  name: string;
  acrCount: number;
  targetSystems: string;
  characteristics: string;
}

interface SystemProfileChartProps {
  profiles?: ProfileData[];
  activeProfile?: SystemProfileCode;
  onProfileClick?: (code: SystemProfileCode) => void;
  className?: string;
}

const defaultProfiles: ProfileData[] = [
  { code: 'F', name: 'Foundational', acrCount: 97, targetSystems: 'Single-purpose agents, limited-scope tools', characteristics: 'Core safety and reliability baseline' },
  { code: 'S', name: 'Standard', acrCount: 215, targetSystems: 'General-purpose agents, customer-facing systems', characteristics: 'Operational reliability with monitoring' },
  { code: 'A', name: 'Advanced', acrCount: 368, targetSystems: 'Multi-agent systems, high-autonomy deployments', characteristics: 'Comprehensive coverage with adversarial testing' },
  { code: 'C', name: 'Comprehensive', acrCount: 410, targetSystems: 'Safety-critical, physical, cross-domain systems', characteristics: 'Full 410-ACR evaluation suite' },
];

const profileColors: Record<SystemProfileCode, { fill: string; stroke: string; text: string }> = {
  F: { fill: '#F0F1F3', stroke: '#C8CCD2', text: '#636B78' },
  S: { fill: '#E2E4E8', stroke: '#8E95A0', text: '#4A5160' },
  A: { fill: '#3A3A3A', stroke: '#111111', text: '#FFFFFF' },
  C: { fill: '#1A2333', stroke: '#0D1219', text: '#FFFFFF' },
};

export function SystemProfileChart({
  profiles = defaultProfiles,
  activeProfile,
  onProfileClick,
  className,
}: SystemProfileChartProps) {
  const [hovered, setHovered] = useState<SystemProfileCode | null>(null);

  const maxACRs = 410;
  const barHeight = 48;
  const barGap = 12;
  const labelWidth = 120;
  const valueWidth = 60;
  const chartWidth = 500;
  const totalHeight = profiles.length * (barHeight + barGap) - barGap;

  const hoveredProfile = hovered ? profiles.find((p) => p.code === hovered) : null;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${labelWidth + chartWidth + valueWidth + 20} ${totalHeight + 20}`}
        width="100%"
        role="img"
        aria-label="System Profile ACR Coverage Chart"
      >
        {/* Profiles — sorted ascending (F on top, C on bottom) */}
        {profiles.map((profile, i) => {
          const y = i * (barHeight + barGap) + 10;
          const barWidth = (profile.acrCount / maxACRs) * chartWidth;
          const color = profileColors[profile.code];
          const isHovered = hovered === profile.code;
          const isActive = activeProfile === profile.code;

          return (
            <g
              key={profile.code}
              onMouseEnter={() => setHovered(profile.code)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onProfileClick?.(profile.code)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`${profile.name} profile: ${profile.acrCount} ACRs`}
              onKeyDown={(e) => { if (e.key === 'Enter') onProfileClick?.(profile.code); }}
            >
              {/* Label */}
              <text
                x={labelWidth - 8}
                y={y + barHeight / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={14}
                fontWeight={isHovered || isActive ? 700 : 500}
                fill={isHovered || isActive ? '#111111' : '#636B78'}
              >
                {profile.name}
              </text>

              {/* Profile code */}
              <text
                x={labelWidth - 8}
                y={y + barHeight / 2 + 16}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                fontFamily="IBM Plex Mono, monospace"
                fill="#8E95A0"
              >
                {profile.code}
              </text>

              {/* Bar */}
              <rect
                x={labelWidth}
                y={y + 4}
                width={barWidth}
                height={barHeight - 8}
                rx={4}
                fill={color.fill}
                stroke={isHovered || isActive ? color.stroke : 'transparent'}
                strokeWidth={isHovered || isActive ? 2 : 0}
                className="transition-all duration-200"
              />

              {/* ACR count inside bar */}
              <text
                x={labelWidth + barWidth - 8}
                y={y + barHeight / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={16}
                fontWeight={700}
                fontFamily="IBM Plex Mono, monospace"
                fill={color.text}
              >
                {profile.acrCount}
              </text>

              {/* ACR label */}
              <text
                x={labelWidth + barWidth + 8}
                y={y + barHeight / 2}
                dominantBaseline="middle"
                fontSize={12}
                fill="#8E95A0"
              >
                ACRs
              </text>
            </g>
          );
        })}

        {/* Nesting indicator — dotted lines showing F ⊂ S ⊂ A ⊂ C */}
        {profiles.slice(0, -1).map((profile, i) => {
          const y1 = i * (barHeight + barGap) + 10 + barHeight;
          const barWidth = (profile.acrCount / maxACRs) * chartWidth;
          return (
            <line
              key={`nest-${i}`}
              x1={labelWidth + barWidth}
              y1={y1}
              x2={labelWidth + barWidth}
              y2={y1 + barGap}
              stroke="#C8CCD2"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          );
        })}
      </svg>

      {/* Hover detail */}
      {hoveredProfile && (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-border text-sm animate-fade-in-up"
             style={{ animationDuration: '0.15s' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: profileColors[hoveredProfile.code].fill,
                    color: profileColors[hoveredProfile.code].text,
                  }}>
              {hoveredProfile.code}
            </span>
            <span className="font-semibold text-charcoal">{hoveredProfile.name}</span>
            <span className="font-mono text-xs text-slate-500">{hoveredProfile.acrCount} ACRs</span>
          </div>
          <p className="text-slate-500 text-xs">{hoveredProfile.targetSystems}</p>
          <p className="text-slate-400 text-xs mt-0.5">{hoveredProfile.characteristics}</p>
        </div>
      )}
    </div>
  );
}
