'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Domain } from '@/types';

// Layer definitions — outside in display order, inside out for ring rendering
const layers = [
  {
    id: 'governance',
    name: 'Governance & Accountability',
    description: 'Audit trails, societal impact assessment, operational governance, and physical safety controls.',
    color: '#8E95A0',
    r: 223,
    domainCount: 4,
    acrCount: 103,
    domainIds: [12, 13, 14, 15],
  },
  {
    id: 'observability',
    name: 'Observability & Oversight',
    description: 'Detecting drift, monitoring operations, and ensuring human escalation paths.',
    color: '#636B78',
    r: 181,
    domainCount: 3,
    acrCount: 76,
    domainIds: [9, 10, 11],
  },
  {
    id: 'resilience',
    name: 'Resilience & Security',
    description: 'Containing failures, maintaining reliability under stress, and resisting adversarial attacks.',
    color: '#4A5160',
    r: 139,
    domainCount: 3,
    acrCount: 98,
    domainIds: [6, 7, 8],
  },
  {
    id: 'boundaries',
    name: 'Boundaries & Access',
    description: 'Defining operational scope, controlling identity and permissions, and protecting data privacy.',
    color: '#3A3A3A',
    r: 97,
    domainCount: 3,
    acrCount: 73,
    domainIds: [1, 4, 5],
  },
  {
    id: 'integrity',
    name: 'Decision & Action Integrity',
    description: 'Ensuring decisions are traceable and tool interactions are governed and constrained.',
    color: '#1A2333',
    r: 55,
    domainCount: 2,
    acrCount: 60,
    domainIds: [2, 3],
  },
];

const TOTAL_ACRS = 410;

interface LayerRingDiagramProps {
  /** Show the full interactive panel with domain details (domains page) vs compact (home page) */
  variant?: 'full' | 'compact';
  className?: string;
  /** Optional domain data — if provided, domain cards are shown when a layer is clicked */
  domains?: Domain[];
}

export function LayerRingDiagram({ variant = 'compact', className = '', domains }: LayerRingDiagramProps) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const activeData = activeLayer ? layers.find((l) => l.id === activeLayer) : null;
  const centerCount = activeData ? activeData.acrCount : TOTAL_ACRS;
  const centerLabel = activeData ? 'ACRs in layer' : 'Total ACRs';

  return (
    <div className={`flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start ${className}`}>
      {/* SVG Ring Diagram */}
      <div className="flex-shrink-0">
        <svg
          viewBox="0 0 520 520"
          className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px]"
          role="img"
          aria-label="Concentric ring diagram showing five layers of autonomous reliability"
        >
          <defs>
            <filter id="ring-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Center stat */}
          <text
            x="260"
            y="250"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="38"
            fontWeight="800"
            fill="#1A2333"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {centerCount}
          </text>
          <text
            x="260"
            y="280"
            textAnchor="middle"
            fontSize="12"
            fill="#8E95A0"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            {centerLabel}
          </text>

          {/* Concentric ring arcs — inside out */}
          {layers
            .slice()
            .reverse()
            .map((layer) => {
              const C = 2 * Math.PI * layer.r;
              const show = (280 / 360) * C;
              const gap = C - show;
              const isActive = activeLayer === layer.id;
              const isHovered = hoveredLayer === layer.id;
              const anyHighlighted = activeLayer !== null || hoveredLayer !== null;

              return (
                <circle
                  key={layer.id}
                  cx={260}
                  cy={260}
                  r={layer.r}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth={isActive || isHovered ? 36 : 30}
                  strokeDasharray={`${show} ${gap}`}
                  strokeDashoffset={show + gap / 2}
                  strokeLinecap="round"
                  className="cursor-pointer"
                  style={{
                    opacity: anyHighlighted && !isActive && !isHovered ? 0.15 : 1,
                    filter: isActive ? 'url(#ring-glow)' : undefined,
                    transition: 'opacity 0.3s, stroke-width 0.3s, filter 0.3s',
                  }}
                  onClick={() => setActiveLayer(isActive ? null : layer.id)}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                />
              );
            })}
        </svg>
      </div>

      {/* Layer legend panel */}
      <div className="flex-1 min-w-0 lg:py-2 w-full">
        {layers.map((layer) => {
          const isActive = activeLayer === layer.id;
          const isHovered = hoveredLayer === layer.id;

          // Resolve domains for this layer
          const layerDomains = domains
            ? layer.domainIds
                .map((id) => domains.find((d) => d.id === id))
                .filter(Boolean) as Domain[]
            : [];

          return (
            <div key={layer.id}>
              <button
                onClick={() => setActiveLayer(isActive ? null : layer.id)}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-100 shadow-sm'
                    : isHovered
                      ? 'bg-slate-50/80'
                      : 'hover:bg-slate-50/40'
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-200"
                  style={{
                    backgroundColor: layer.color,
                    transform: isActive || isHovered ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-charcoal leading-tight">
                    {layer.name}
                  </div>
                  <div className="text-[11px] text-muted leading-snug mt-0.5">
                    {layer.description}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-charcoal tabular-nums">{layer.acrCount}</span>
                    <span className="text-[10px] text-muted">ACRs</span>
                  </div>
                  {(domains && domains.length > 0) && (
                    <svg
                      className={`w-4 h-4 text-muted transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </div>
              </button>

              {/* Domain cards — shown when layer is active */}
              {isActive && layerDomains.length > 0 && (
                <div className="pl-10 pr-4 pb-2 pt-1">
                  <div className="space-y-1.5">
                    {layerDomains.map((domain) => (
                      <Link
                        key={domain.id}
                        href={`/standard/v1.1/domains/${domain.slug}`}
                        className="group/card flex items-center gap-3 bg-white border border-border rounded-lg px-3 py-2.5 hover:border-border-dark hover:shadow-sm transition-all"
                      >
                        <span
                          className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 text-white"
                          style={{ backgroundColor: layer.color }}
                        >
                          {String(domain.id).padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-charcoal leading-tight group-hover/card:text-navy transition-colors">
                              {domain.title}
                            </span>
                            {domain.versionIntroduced === '1.1' && (
                              <span className="inline-flex items-center text-[8px] font-semibold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                NEW
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] text-muted tabular-nums shrink-0">{domain.acrCount} ACRs</span>
                        <span className="text-[10px] font-medium text-navy opacity-0 group-hover/card:opacity-100 transition-opacity shrink-0">
                          &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                  {variant === 'compact' && (
                    <div className="flex justify-end pt-2">
                      <Link
                        href="/standard/v1.1/domains"
                        className="text-xs text-navy font-medium hover:underline"
                      >
                        Explore all domains &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Fallback when no domain data available */}
              {isActive && layerDomains.length === 0 && variant === 'compact' && (
                <div className="pl-10 pr-4 pb-2 pt-1">
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{layer.domainCount} reliability domains</span>
                    <Link
                      href="/standard/v1.1/domains"
                      className="text-navy font-medium hover:underline"
                    >
                      Explore domains &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
