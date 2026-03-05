'use client';

import React, { useState } from 'react';
import type { CertificationLevel, AssuranceClass } from '@/types';

interface MatrixCell {
  level: CertificationLevel;
  class: AssuranceClass;
  label: string;
  description: string;
  examples?: string;
}

interface TwoAxisMatrixProps {
  activeCell?: { level: CertificationLevel; class: AssuranceClass };
  onCellClick?: (level: CertificationLevel, assuranceClass: AssuranceClass) => void;
  compact?: boolean;
  className?: string;
}

const levels: { id: CertificationLevel; name: string; short: string }[] = [
  { id: 'L3', name: 'Comprehensive', short: 'L3' },
  { id: 'L2', name: 'Operational', short: 'L2' },
  { id: 'L1', name: 'Foundation', short: 'L1' },
];

const classes: { id: AssuranceClass; name: string; short: string }[] = [
  { id: 'A', name: 'Periodic', short: 'A' },
  { id: 'B', name: 'Monitored', short: 'B' },
  { id: 'C', name: 'Continuous', short: 'C' },
];

const cellData: Record<string, MatrixCell> = {
  'L1-A': { level: 'L1', class: 'A', label: 'L1-A', description: 'Foundation evaluation with periodic self-assessment. Annual renewal with AVB spot checks.', examples: 'Low-risk chatbots, internal tools' },
  'L1-B': { level: 'L1', class: 'B', label: 'L1-B', description: 'Foundation evaluation with monthly CAPO monitoring. Automated telemetry collection.', examples: 'Customer-facing assistants' },
  'L1-C': { level: 'L1', class: 'C', label: 'L1-C', description: 'Foundation evaluation with continuous 24/7 CAPO oversight. Real-time alerting.', examples: 'Healthcare triage bots' },
  'L2-A': { level: 'L2', class: 'A', label: 'L2-A', description: 'Operational evaluation with periodic assessment. Quarterly reporting and AVB reviews.', examples: 'Financial advisory tools' },
  'L2-B': { level: 'L2', class: 'B', label: 'L2-B', description: 'Operational evaluation with monthly CAPO monitoring. Drift detection and performance tracking.', examples: 'Autonomous trading systems' },
  'L2-C': { level: 'L2', class: 'C', label: 'L2-C', description: 'Operational evaluation with continuous CAPO oversight. Full telemetry pipeline required.', examples: 'Critical infrastructure agents' },
  'L3-A': { level: 'L3', class: 'A', label: 'L3-A', description: 'Comprehensive evaluation with periodic assessment. Full adversarial testing, annual renewal.', examples: 'Research AI platforms' },
  'L3-B': { level: 'L3', class: 'B', label: 'L3-B', description: 'Comprehensive evaluation with monthly CAPO monitoring. Red team testing required.', examples: 'Multi-agent orchestration' },
  'L3-C': { level: 'L3', class: 'C', label: 'L3-C', description: 'Maximum rigor: comprehensive evaluation with 24/7 CAPO oversight. The highest ARA designation.', examples: 'Autonomous vehicles, surgical AI' },
};

const cellBg: Record<AssuranceClass, Record<CertificationLevel, { base: string; hover: string; active: string }>> = {
  A: {
    L1: { base: 'bg-slate-50', hover: 'hover:bg-slate-100', active: 'bg-slate-200 ring-2 ring-charcoal' },
    L2: { base: 'bg-slate-100', hover: 'hover:bg-slate-150', active: 'bg-slate-200 ring-2 ring-charcoal' },
    L3: { base: 'bg-slate-100', hover: 'hover:bg-slate-200', active: 'bg-slate-300 ring-2 ring-charcoal' },
  },
  B: {
    L1: { base: 'bg-charcoal/5', hover: 'hover:bg-charcoal/10', active: 'bg-charcoal/15 ring-2 ring-charcoal' },
    L2: { base: 'bg-charcoal/10', hover: 'hover:bg-charcoal/15', active: 'bg-charcoal/20 ring-2 ring-charcoal' },
    L3: { base: 'bg-charcoal/15', hover: 'hover:bg-charcoal/20', active: 'bg-charcoal/25 ring-2 ring-charcoal' },
  },
  C: {
    L1: { base: 'bg-navy/5', hover: 'hover:bg-navy/10', active: 'bg-navy/15 ring-2 ring-navy' },
    L2: { base: 'bg-navy/10', hover: 'hover:bg-navy/15', active: 'bg-navy/20 ring-2 ring-navy' },
    L3: { base: 'bg-navy/15', hover: 'hover:bg-navy/20', active: 'bg-navy/25 ring-2 ring-navy' },
  },
};

export function TwoAxisMatrix({
  activeCell,
  onCellClick,
  compact = false,
  className,
}: TwoAxisMatrixProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const hoveredData = hovered ? cellData[hovered] : null;

  return (
    <div className={className}>
      <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-px bg-border rounded-lg overflow-hidden">
        {/* Header row */}
        <div className="bg-white p-3" />
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white p-3 text-center">
            <div className="font-mono text-xs font-bold text-charcoal">Class {cls.id}</div>
            {!compact && (
              <div className="text-[11px] text-slate-500 mt-0.5">{cls.name}</div>
            )}
          </div>
        ))}

        {/* Data rows — L3 on top, L1 on bottom */}
        {levels.map((lvl) => (
          <React.Fragment key={lvl.id}>
            {/* Row header */}
            <div className="bg-white p-3 flex items-center">
              <div>
                <div className="font-mono text-xs font-bold text-charcoal">{lvl.short}</div>
                {!compact && (
                  <div className="text-[11px] text-slate-500 mt-0.5">{lvl.name}</div>
                )}
              </div>
            </div>

            {/* Cells */}
            {classes.map((cls) => {
              const key = `${lvl.id}-${cls.id}`;
              const cell = cellData[key];
              const bg = cellBg[cls.id][lvl.id];
              const isActive = activeCell?.level === lvl.id && activeCell?.class === cls.id;
              const isHovered = hovered === key;

              return (
                <button
                  key={key}
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => onCellClick?.(lvl.id, cls.id)}
                  className={`${isActive ? bg.active : bg.base} ${!isActive ? bg.hover : ''}
                    p-3 text-center transition-all duration-150 cursor-pointer
                    ${isHovered && !isActive ? 'shadow-inner' : ''}`}
                  aria-label={`${lvl.name} Level, ${cls.name} Assurance — ${cell.description}`}
                >
                  <div className="font-mono text-sm font-bold text-charcoal">{cell.label}</div>
                  {!compact && (
                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                      {cell.examples}
                    </div>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Hover detail panel */}
      {hoveredData && !compact && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-border text-sm animate-fade-in-up"
             style={{ animationDuration: '0.15s' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-charcoal">{hoveredData.label}</span>
            <span className="text-slate-400">—</span>
            <span className="text-slate-600">{hoveredData.examples}</span>
          </div>
          <p className="text-slate-500 leading-relaxed">{hoveredData.description}</p>
        </div>
      )}

      {/* Axis labels */}
      {!compact && (
        <div className="flex justify-between mt-3 text-[10px] text-slate-400 uppercase tracking-wider">
          <span>Evaluation Rigor &rarr;</span>
          <span>Assurance Intensity &rarr;</span>
        </div>
      )}
    </div>
  );
}
