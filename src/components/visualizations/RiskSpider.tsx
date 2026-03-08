'use client';

import { useState, useRef, useCallback } from 'react';

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
  /** Called when a user drags a data point to change a score */
  onScoreChange?: (factorIndex: number, newScore: number) => void;
}

export function RiskSpider({
  factors,
  determinedClass,
  maxScore = 5,
  size = 400,
  className,
  onScoreChange,
}: RiskSpiderProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.35;
  const padX = size * 0.28; // horizontal padding for axis labels
  const padY = size * 0.06; // vertical padding
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
  const interactive = !!onScoreChange;

  /* -----------------------------------------------------------------------
   * Drag-to-score: convert mouse/touch position to a score along an axis
   * ----------------------------------------------------------------------- */

  const clientToSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  }, []);

  const scoreFromPosition = useCallback((svgX: number, svgY: number, axisIndex: number) => {
    // Vector from center to mouse
    const dx = svgX - cx;
    const dy = svgY - cy;
    // Unit vector along the axis
    const angle = axisIndex * angleStep - Math.PI / 2;
    const ax = Math.cos(angle);
    const ay = Math.sin(angle);
    // Project mouse vector onto axis
    const projection = dx * ax + dy * ay;
    // Convert to score (1-5), clamped
    const raw = (projection / radius) * maxScore;
    return Math.max(1, Math.min(maxScore, Math.round(raw)));
  }, [cx, cy, angleStep, radius, maxScore]);

  const handlePointerDown = useCallback((e: React.PointerEvent, index: number) => {
    if (!interactive) return;
    e.preventDefault();
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(index);
    setHovered(factors[index].id);
  }, [interactive, factors]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging === null || !interactive) return;
    const pt = clientToSvg(e.clientX, e.clientY);
    if (!pt) return;
    const newScore = scoreFromPosition(pt.x, pt.y, dragging);
    if (newScore !== factors[dragging].score) {
      onScoreChange(dragging, newScore);
    }
  }, [dragging, interactive, clientToSvg, scoreFromPosition, factors, onScoreChange]);

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        viewBox={`${-padX} ${-padY} ${size + 2 * padX} ${size + 2 * padY}`}
        width="100%"
        role="img"
        aria-label={`Risk Classification Spider Chart${determinedClass ? ` — Class ${determinedClass}` : ''}`}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: interactive ? 'none' : undefined }}
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

        {/* Score tick marks along axes (when interactive) */}
        {interactive && factors.map((_, i) => (
          Array.from({ length: maxScore }, (__, s) => {
            const tickR = ((s + 1) / maxScore) * radius;
            const angle = i * angleStep - Math.PI / 2;
            const px = cx + tickR * Math.cos(angle);
            const py = cy + tickR * Math.sin(angle);
            // Small perpendicular tick marks
            const perpX = Math.sin(angle) * 3;
            const perpY = -Math.cos(angle) * 3;
            return (
              <line
                key={`tick-${i}-${s}`}
                x1={px - perpX} y1={py - perpY}
                x2={px + perpX} y2={py + perpY}
                stroke="#C8CCD2"
                strokeWidth={0.75}
              />
            );
          })
        ))}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth={2}
          strokeLinejoin="round"
          className="transition-all duration-150"
        />

        {/* Data points */}
        {dataPoints.map((p, i) => {
          const isActive = hovered === factors[i].id || dragging === i;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={isActive ? 6 : 4}
              fill={dragging === i ? '#111111' : colors.stroke}
              stroke="white"
              strokeWidth={2}
              onMouseEnter={() => { if (dragging === null) setHovered(factors[i].id); }}
              onMouseLeave={() => { if (dragging === null) setHovered(null); }}
              onPointerDown={(e) => handlePointerDown(e, i)}
              className={interactive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
              style={{ transition: 'r 0.15s, fill 0.15s' }}
            />
          );
        })}

        {/* Factor labels */}
        {factors.map((factor, i) => {
          const labelR = radius + size * 0.09;
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
              fontSize={size * 0.034}
              fontWeight={hovered === factor.id ? 700 : 500}
              fill={hovered === factor.id ? '#111111' : '#4A5160'}
              className="pointer-events-none select-none"
            >
              {factor.name}
            </text>
          );
        })}

        {/* Score labels on data points (when hovered or dragging) */}
        {factors.map((factor, i) => {
          const isActive = hovered === factor.id || dragging === i;
          if (!isActive) return null;
          const p = dataPoints[i];
          return (
            <g key={`score-${factor.id}`}>
              <rect
                x={p.x - 16}
                y={p.y - 24}
                width={32}
                height={18}
                rx={4}
                fill={dragging === i ? '#111111' : 'white'}
                stroke={dragging === i ? '#111111' : colors.stroke}
                strokeWidth={1}
              />
              <text
                x={p.x}
                y={p.y - 13}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size * 0.028}
                fontWeight={700}
                fill={dragging === i ? 'white' : '#111111'}
                className="pointer-events-none"
              >
                {factor.score}/{maxScore}
              </text>
            </g>
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

      {/* Drag hint (when interactive) */}
      {interactive && dragging === null && hovered === null && (
        <p className="text-center text-xs text-muted mt-1">
          Drag any point to adjust scores
        </p>
      )}

      {/* Hover detail */}
      {hoveredFactor && hoveredFactor.description && dragging === null && (
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
