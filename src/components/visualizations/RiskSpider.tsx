'use client';

import { useState } from 'react';

interface RiskFactorData {
  id: number;
  name: string;
  score: number; // 1-5
  description?: string;
}

interface RiskSpiderProps {
  factors: RiskFactorData[];
  determinedClass?: 'A' | 'B' | 'C';
  maxScore?: number;
  size?: number;
  className?: string;
}

export function RiskSpider({
  factors,
  determinedClass,
  maxScore = 5,
  size = 400,
  className,
}: RiskSpiderProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const count = factors.length;
  const angleStep = (2 * Math.PI) / count;
  const rings = maxScore;

  const polar = (r: number, i: number) => ({
    x: cx + r * Math.cos(i * angleStep - Math.PI / 2),
    y: cy + r * Math.sin(i * angleStep - Math.PI / 2),
  });

  // Build the data polygon path
  const dataPoints = factors.map((f, i) => {
    const r = (f.score / maxScore) * radius;
    return polar(r, i);
  });

  const dataPath = dataPoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

  const classColors: Record<string, { fill: string; stroke: string }> = {
    A: { fill: 'rgba(200,204,210,0.2)', stroke: '#8E95A0' },
    B: { fill: 'rgba(58,58,58,0.12)', stroke: '#3A3A3A' },
    C: { fill: 'rgba(26,35,51,0.15)', stroke: '#1A2333' },
  };

  const colors = determinedClass ? classColors[determinedClass] : classColors.B;
  const hoveredFactor = hovered != null ? factors.find((f) => f.id === hovered) : null;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: size }}
        role="img"
        aria-label={`Risk Classification Spider Chart${determinedClass ? ` — Class ${determinedClass}` : ''}`}
      >
        {/* Concentric ring grid */}
        {Array.from({ length: rings }, (_, i) => {
          const r = ((i + 1) / rings) * radius;
          const points = Array.from({ length: count }, (_, j) => {
            const p = polar(r, j);
            return `${p.x},${p.y}`;
          }).join(' ');
          return (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke="#E2E4E8"
              strokeWidth={i === rings - 1 ? 1 : 0.5}
            />
          );
        })}

        {/* Axis lines */}
        {factors.map((_, i) => {
          const p = polar(radius, i);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="#E2E4E8"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hovered === factors[i].id ? 5 : 3.5}
            fill={colors.stroke}
            stroke="white"
            strokeWidth={2}
            onMouseEnter={() => setHovered(factors[i].id)}
            onMouseLeave={() => setHovered(null)}
            className="cursor-pointer transition-all duration-150"
          />
        ))}

        {/* Factor labels */}
        {factors.map((factor, i) => {
          const labelR = radius + size * 0.07;
          const p = polar(labelR, i);
          const angle = i * angleStep - Math.PI / 2;
          // Determine text anchor based on position
          let anchor: 'start' | 'middle' | 'end' = 'middle';
          if (Math.cos(angle) > 0.3) anchor = 'start';
          else if (Math.cos(angle) < -0.3) anchor = 'end';

          return (
            <text
              key={factor.id}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={size * 0.026}
              fontWeight={hovered === factor.id ? 700 : 500}
              fill={hovered === factor.id ? '#111111' : '#636B78'}
              className="pointer-events-none select-none"
            >
              {factor.name}
            </text>
          );
        })}

        {/* Score labels on data points when hovered */}
        {factors.map((factor, i) => {
          if (hovered !== factor.id) return null;
          const p = dataPoints[i];
          return (
            <text
              key={`score-${factor.id}`}
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              fontSize={size * 0.028}
              fontWeight={700}
              fill="#111111"
              className="pointer-events-none"
            >
              {factor.score}/{maxScore}
            </text>
          );
        })}

        {/* Center label */}
        {determinedClass && (
          <text
            x={cx}
            y={cy + 4}
            textAnchor="middle"
            fontSize={size * 0.05}
            fontWeight={800}
            fill={colors.stroke}
            className="pointer-events-none"
          >
            {determinedClass}
          </text>
        )}
      </svg>

      {/* Hover detail */}
      {hoveredFactor && hoveredFactor.description && (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-border text-sm animate-fade-in-up"
             style={{ animationDuration: '0.15s' }}>
          <div className="font-semibold text-charcoal mb-0.5">{hoveredFactor.name}</div>
          <div className="text-slate-500 text-xs leading-relaxed">{hoveredFactor.description}</div>
          <div className="mt-1 font-mono text-xs font-bold text-charcoal">
            Score: {hoveredFactor.score}/{maxScore}
          </div>
        </div>
      )}
    </div>
  );
}
