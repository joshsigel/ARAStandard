'use client';

import { useState } from 'react';

interface DomainData {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  acrCount: number;
  riskDimension?: string;
  score?: number; // 0-100, optional overlay for certification views
}

interface DomainRadialChartProps {
  domains: DomainData[];
  onDomainClick?: (domain: DomainData) => void;
  showScores?: boolean;
  size?: number;
  className?: string;
}

export function DomainRadialChart({
  domains,
  onDomainClick,
  showScores = false,
  size = 500,
  className,
}: DomainRadialChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.42;
  const innerR = size * 0.22;
  const labelR = size * 0.35;
  const count = domains.length;
  const angleStep = (2 * Math.PI) / count;
  const gapAngle = 0.02; // radians gap between segments

  // Color palette for risk dimensions
  const dimensionColors: Record<string, string> = {
    'Operational': '#3A3A3A',
    'Security': '#1A2333',
    'Governance': '#4A5160',
    'Safety': '#636B78',
    'Data': '#8E95A0',
    'default': '#3A3A3A',
  };

  const getDimensionColor = (dim?: string) => {
    if (!dim) return dimensionColors.default;
    for (const [key, color] of Object.entries(dimensionColors)) {
      if (dim.toLowerCase().includes(key.toLowerCase())) return color;
    }
    return dimensionColors.default;
  };

  const polarToCart = (r: number, angle: number) => ({
    x: cx + r * Math.cos(angle - Math.PI / 2),
    y: cy + r * Math.sin(angle - Math.PI / 2),
  });

  const arcPath = (r: number, startAngle: number, endAngle: number, reverse = false) => {
    const start = polarToCart(r, startAngle);
    const end = polarToCart(r, endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    if (reverse) {
      return `A ${r} ${r} 0 ${largeArc} 0 ${start.x} ${start.y}`;
    }
    return `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  const segmentPath = (index: number, iR: number, oR: number) => {
    const startAngle = index * angleStep + gapAngle / 2;
    const endAngle = (index + 1) * angleStep - gapAngle / 2;

    const outerStart = polarToCart(oR, startAngle);
    const outerEnd = polarToCart(oR, endAngle);
    const innerEnd = polarToCart(iR, endAngle);
    const innerStart = polarToCart(iR, startAngle);

    return [
      `M ${outerStart.x} ${outerStart.y}`,
      arcPath(oR, startAngle, endAngle),
      `L ${innerEnd.x} ${innerEnd.y}`,
      `A ${iR} ${iR} 0 0 0 ${innerStart.x} ${innerStart.y}`,
      'Z',
    ].join(' ');
  };

  const hoveredDomain = hovered != null ? domains.find((d) => d.id === hovered) : null;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: size }}
        role="img"
        aria-label="ARA Reliability Domains Radial Chart"
      >
        {/* Center circle */}
        <circle cx={cx} cy={cy} r={innerR * 0.85} fill="#F8F9FA" stroke="#E2E4E8" strokeWidth={1} />
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize={size * 0.028} fontWeight={700} fill="#111111">
          ARA v1.1
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={size * 0.02} fill="#636B78">
          {domains.length} Domains
        </text>
        <text x={cx} y={cy + 26} textAnchor="middle" fontSize={size * 0.02} fill="#636B78">
          {domains.reduce((sum, d) => sum + d.acrCount, 0)} ACRs
        </text>

        {/* Domain segments */}
        {domains.map((domain, i) => {
          const isHovered = hovered === domain.id;
          const scoreR = showScores && domain.score != null
            ? innerR + (outerR - innerR) * (domain.score / 100)
            : outerR;
          const baseColor = getDimensionColor(domain.riskDimension);

          return (
            <g key={domain.id}>
              {/* Score fill (lighter) */}
              {showScores && domain.score != null && (
                <path
                  d={segmentPath(i, innerR, scoreR)}
                  fill={baseColor}
                  opacity={0.15}
                />
              )}

              {/* Segment outline */}
              <path
                d={segmentPath(i, innerR, outerR)}
                fill={isHovered ? baseColor : 'transparent'}
                fillOpacity={isHovered ? 0.08 : 0}
                stroke={baseColor}
                strokeWidth={isHovered ? 2 : 1}
                strokeOpacity={isHovered ? 1 : 0.3}
                onMouseEnter={() => setHovered(domain.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onDomainClick?.(domain)}
                className="cursor-pointer transition-all duration-150"
                role="button"
                aria-label={`${domain.title}: ${domain.acrCount} ACRs`}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onDomainClick?.(domain); }}
              />

              {/* Domain label */}
              {(() => {
                const midAngle = (i + 0.5) * angleStep;
                const pos = polarToCart(labelR, midAngle);
                const rotation = ((midAngle * 180) / Math.PI - 90);
                const flip = rotation > 90 && rotation < 270;
                const textRotation = flip ? rotation + 180 : rotation;

                return (
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={size * 0.018}
                    fontWeight={isHovered ? 700 : 500}
                    fill={isHovered ? '#111111' : '#636B78'}
                    transform={`rotate(${textRotation}, ${pos.x}, ${pos.y})`}
                    className="pointer-events-none select-none transition-all duration-150"
                  >
                    {domain.shortTitle}
                  </text>
                );
              })()}

              {/* ACR count in outer ring */}
              {(() => {
                const midAngle = (i + 0.5) * angleStep;
                const countR = outerR + size * 0.035;
                const pos = polarToCart(countR, midAngle);

                return isHovered ? (
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={size * 0.016}
                    fontWeight={600}
                    fill="#111111"
                    className="pointer-events-none"
                  >
                    {domain.acrCount}
                  </text>
                ) : null;
              })()}
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip panel */}
      {hoveredDomain && (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-border text-sm animate-fade-in-up"
             style={{ animationDuration: '0.15s' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold text-navy">D{hoveredDomain.id}</span>
            <span className="font-semibold text-charcoal">{hoveredDomain.title}</span>
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <span>{hoveredDomain.acrCount} ACRs</span>
            {hoveredDomain.riskDimension && <span>{hoveredDomain.riskDimension}</span>}
            {showScores && hoveredDomain.score != null && (
              <span className="font-semibold text-charcoal">Score: {hoveredDomain.score}%</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
