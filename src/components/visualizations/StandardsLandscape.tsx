'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface FrameworkNode {
  id: string;
  name: string;
  shortName: string;
  layer: 'regulation' | 'governance' | 'agent-ecosystem' | 'operational';
  description: string;
  acrsMapped?: number;
  coveragePct?: number;
  status?: string;
}

interface StandardsLandscapeProps {
  frameworks?: FrameworkNode[];
  onFrameworkClick?: (id: string) => void;
  className?: string;
}

const defaultFrameworks: FrameworkNode[] = [
  { id: 'eu-ai-act', name: 'EU AI Act', shortName: 'EU AI Act', layer: 'regulation', description: 'European Union Artificial Intelligence Act — Risk-based regulatory framework for AI systems in the EU market.', acrsMapped: 287, coveragePct: 70 },
  { id: 'nist-rmf', name: 'NIST AI RMF', shortName: 'NIST RMF', layer: 'regulation', description: 'NIST AI Risk Management Framework — US voluntary framework for trustworthy AI development.', acrsMapped: 312, coveragePct: 76 },
  { id: 'iso-42001', name: 'ISO/IEC 42001', shortName: 'ISO 42001', layer: 'regulation', description: 'AI Management System standard — Requirements for establishing and maintaining an AI management system.', acrsMapped: 256, coveragePct: 62 },
  { id: 'iso-23894', name: 'ISO/IEC 23894', shortName: 'ISO 23894', layer: 'regulation', description: 'AI Risk Management — Guidance on managing risk for organizations developing or using AI.', acrsMapped: 198, coveragePct: 48 },
  { id: 'oecd-ai', name: 'OECD AI Principles', shortName: 'OECD AI', layer: 'governance', description: 'OECD Recommendation on AI — International principles for responsible stewardship of trustworthy AI.', acrsMapped: 178, coveragePct: 43 },
  { id: 'ieee-7000', name: 'IEEE 7000', shortName: 'IEEE 7000', layer: 'governance', description: 'Model Process for Addressing Ethical Concerns During System Design — Ethics-driven system engineering.', acrsMapped: 145, coveragePct: 35 },
  { id: 'soc2', name: 'SOC 2 Type II', shortName: 'SOC 2', layer: 'governance', description: 'Service Organization Control 2 — Trust services criteria for security, availability, processing integrity, confidentiality, privacy.', acrsMapped: 223, coveragePct: 54 },
  { id: 'gdpr', name: 'GDPR', shortName: 'GDPR', layer: 'governance', description: 'General Data Protection Regulation — EU data protection and privacy regulation.', acrsMapped: 134, coveragePct: 33 },
  { id: 'anthropic-rsp', name: 'Anthropic RSP', shortName: 'RSP', layer: 'agent-ecosystem', description: 'Anthropic Responsible Scaling Policy — Commitments for responsible development at increasing capability levels.', acrsMapped: 167, coveragePct: 41 },
  { id: 'openai-safety', name: 'OpenAI Safety Framework', shortName: 'OpenAI', layer: 'agent-ecosystem', description: 'OpenAI Preparedness Framework — Approach to evaluating and mitigating catastrophic risks.', acrsMapped: 156, coveragePct: 38 },
  { id: 'google-saif', name: 'Google SAIF', shortName: 'SAIF', layer: 'agent-ecosystem', description: 'Google Secure AI Framework — Conceptual framework for secure AI systems.', acrsMapped: 189, coveragePct: 46 },
  { id: 'mcp', name: 'MCP Protocol', shortName: 'MCP', layer: 'agent-ecosystem', description: 'Model Context Protocol — Standardized protocol for AI tool use and context management.', acrsMapped: 45, coveragePct: 11 },
  { id: 'ara', name: 'ARA Standard v1.1', shortName: 'ARA', layer: 'operational', description: 'Autonomous Reliability Assurance Standard — The comprehensive operational reliability standard for autonomous systems with 410 ACRs across 15 domains.', acrsMapped: 410, coveragePct: 100, status: 'current' },
  { id: 'iso-25010', name: 'ISO/IEC 25010', shortName: 'ISO 25010', layer: 'operational', description: 'Systems and software Quality Requirements and Evaluation — Quality model for system and software product quality.', acrsMapped: 201, coveragePct: 49 },
];

const layerConfig: Record<string, { label: string; y: number; color: string; description: string }> = {
  regulation: { label: 'Regulation', y: 50, color: '#1A2333', description: 'Government-mandated rules and regulatory frameworks' },
  governance: { label: 'Standards & Governance', y: 170, color: '#3A3A3A', description: 'Organizational frameworks for AI management and risk' },
  'agent-ecosystem': { label: 'AI / Agent Ecosystem', y: 290, color: '#4A5160', description: 'Standards specific to AI agent systems and LLM security' },
  operational: { label: 'Operational Reliability', y: 410, color: '#636B78', description: 'Granular, testable requirements for operational reliability' },
};

export function StandardsLandscape({
  frameworks = defaultFrameworks,
  onFrameworkClick,
  className,
}: StandardsLandscapeProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [barAnimKey, setBarAnimKey] = useState(0);

  const activeId = selected || hovered;
  const activeFw = activeId ? frameworks.find((f) => f.id === activeId) : null;

  const width = 900;
  const height = 500;
  const nodeW = 90;
  const nodeH = 32;

  const getNodePosition = useCallback(
    (fw: FrameworkNode, index: number, layerNodes: FrameworkNode[]) => {
      const layer = layerConfig[fw.layer];
      const totalWidth = layerNodes.length * (nodeW + 20) - 20;
      const startX = (width - totalWidth) / 2;
      return {
        x: startX + index * (nodeW + 20) + nodeW / 2,
        y: layer.y,
      };
    },
    []
  );

  const layers = Object.keys(layerConfig);
  const groupedNodes = layers.map((layer) => ({
    layer,
    nodes: frameworks.filter((f) => f.layer === layer),
  }));

  const handleNodeClick = (fwId: string) => {
    setSelected(selected === fwId ? null : fwId);
    setBarAnimKey((k) => k + 1);
    onFrameworkClick?.(fwId);
  };

  useEffect(() => {
    if (selected && detailRef.current && window.innerWidth < 768) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selected]);

  // Find frameworks in the same layer for "related" display
  const relatedFrameworks = activeFw
    ? frameworks.filter((f) => f.layer === activeFw.layer && f.id !== activeFw.id)
    : [];

  // Coverage ranking (excluding ARA)
  const rankedFrameworks = frameworks
    .filter((f) => f.id !== 'ara' && f.coveragePct != null)
    .sort((a, b) => (b.coveragePct ?? 0) - (a.coveragePct ?? 0));

  const activeRank =
    activeFw && activeFw.id !== 'ara'
      ? rankedFrameworks.findIndex((f) => f.id === activeFw.id) + 1
      : null;

  // Compute ARA position for connection lines
  const araFw = frameworks.find((f) => f.id === 'ara');
  const araLayerNodes = frameworks.filter((f) => f.layer === 'operational');
  const araPos = araFw ? getNodePosition(araFw, araLayerNodes.indexOf(araFw), araLayerNodes) : null;

  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Diagram */}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted mb-3 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg>
            Click any framework to see coverage details
          </div>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            role="img"
            aria-label="AI Standards Landscape — Four-layer framework positioning"
          >
            <defs>
              <filter id="fw-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Layer backgrounds */}
            {layers.map((layer) => {
              const config = layerConfig[layer];
              const isLayerActive = activeFw?.layer === layer;
              return (
                <g key={layer}>
                  <rect
                    x={30}
                    y={config.y - 25}
                    width={width - 60}
                    height={74}
                    rx={8}
                    fill={isLayerActive ? config.color : '#F8F9FA'}
                    fillOpacity={isLayerActive ? 0.07 : 1}
                    stroke={isLayerActive ? config.color : '#E2E4E8'}
                    strokeWidth={isLayerActive ? 1.5 : 0.5}
                    className="transition-all duration-300"
                  />
                  <text
                    x={50}
                    y={config.y - 8}
                    fontSize={9}
                    fontWeight={600}
                    fill={config.color}
                    letterSpacing={1}
                    opacity={isLayerActive ? 1 : 0.7}
                    className="pointer-events-none select-none transition-opacity duration-200"
                  >
                    {config.label.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Connection lines from active framework to ARA */}
            {activeFw && activeFw.id !== 'ara' && araPos && (() => {
              const activeLayerNodes = frameworks.filter((f) => f.layer === activeFw.layer);
              const activeIdx = activeLayerNodes.indexOf(activeFw);
              const activePos = getNodePosition(activeFw, activeIdx, activeLayerNodes);
              const coverage = activeFw.coveragePct ?? 0;

              // Bezier control points for a flowing curve
              const startY = activePos.y + nodeH / 2 + 8;
              const endY = araPos.y - nodeH / 2 - 6;
              const midY = (startY + endY) / 2;

              return (
                <path
                  d={`M ${activePos.x} ${startY} C ${activePos.x} ${midY}, ${araPos.x} ${midY}, ${araPos.x} ${endY}`}
                  fill="none"
                  stroke={layerConfig[activeFw.layer].color}
                  strokeWidth={Math.max(1, coverage / 40)}
                  strokeDasharray="6 4"
                  opacity={Math.max(0.15, coverage / 100 * 0.5)}
                  className="transition-all duration-500"
                />
              );
            })()}

            {/* Framework nodes */}
            {groupedNodes.map(({ layer, nodes: layerNodes }) =>
              layerNodes.map((fw, i) => {
                const pos = getNodePosition(fw, i, layerNodes);
                const isActive = activeId === fw.id;
                const isHovered = hovered === fw.id;
                const isARA = fw.id === 'ara';
                const layerColor = layerConfig[layer].color;
                const isSameLayer = activeFw?.layer === fw.layer;
                const isDimmed = activeId && !isActive && !isSameLayer;
                const coverage = fw.coveragePct ?? 0;
                const barMaxW = nodeW - 8;
                const barW = barMaxW * (coverage / 100);

                return (
                  <g
                    key={fw.id}
                    onMouseEnter={() => setHovered(fw.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleNodeClick(fw.id)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`${fw.name}: ${fw.description}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleNodeClick(fw.id);
                    }}
                    style={{
                      transform: isActive
                        ? 'translateY(-2px)'
                        : isHovered
                          ? 'translateY(-1px)'
                          : 'translateY(0)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    {/* Selection glow ring */}
                    {isActive && (
                      <rect
                        x={pos.x - nodeW / 2 - 5}
                        y={pos.y - nodeH / 2 - 5}
                        width={nodeW + 10}
                        height={nodeH + 10}
                        rx={7}
                        fill="none"
                        stroke={isARA ? '#1A2333' : layerColor}
                        strokeWidth={2}
                        opacity={0.35}
                        filter="url(#fw-glow)"
                      />
                    )}
                    {/* Hover ring */}
                    {isHovered && !isActive && (
                      <rect
                        x={pos.x - nodeW / 2 - 2}
                        y={pos.y - nodeH / 2 - 2}
                        width={nodeW + 4}
                        height={nodeH + 4}
                        rx={5}
                        fill="none"
                        stroke={layerColor}
                        strokeWidth={1}
                        opacity={0.25}
                        className="transition-opacity duration-200"
                      />
                    )}
                    {/* Node background */}
                    <rect
                      x={pos.x - nodeW / 2}
                      y={pos.y - nodeH / 2}
                      width={nodeW}
                      height={nodeH}
                      rx={4}
                      fill={isARA ? '#1A2333' : isActive ? layerColor : 'white'}
                      stroke={isARA ? '#1A2333' : isActive ? layerColor : isHovered ? layerColor : '#C8CCD2'}
                      strokeWidth={isARA ? 2 : isActive ? 1.5 : 1}
                      opacity={isDimmed ? 0.3 : 1}
                      className="transition-all duration-200"
                    />
                    {/* Node label */}
                    <text
                      x={pos.x}
                      y={pos.y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={10}
                      fontWeight={isARA ? 800 : isActive ? 700 : isHovered ? 600 : 500}
                      fill={isARA || isActive ? '#FFFFFF' : '#4A5160'}
                      opacity={isDimmed ? 0.3 : 1}
                      className="pointer-events-none select-none transition-opacity duration-200"
                    >
                      {fw.shortName}
                    </text>
                    {/* Mini coverage bar below node */}
                    {!isDimmed && (
                      <g opacity={isActive || isHovered ? 1 : 0.45} className="transition-opacity duration-200" style={{ transition: 'opacity 0.2s' }}>
                        <rect
                          x={pos.x - barMaxW / 2}
                          y={pos.y + nodeH / 2 + 4}
                          width={barMaxW}
                          height={3}
                          rx={1.5}
                          fill="#E2E4E8"
                        />
                        <rect
                          x={pos.x - barMaxW / 2}
                          y={pos.y + nodeH / 2 + 4}
                          width={barW}
                          height={3}
                          rx={1.5}
                          fill={isARA ? '#1A2333' : layerColor}
                          className="transition-all duration-300"
                        />
                        {/* Coverage % label (shown on hover/active) */}
                        {(isActive || isHovered) && (
                          <text
                            x={pos.x + barMaxW / 2 + 6}
                            y={pos.y + nodeH / 2 + 7}
                            fontSize={8}
                            fontWeight={600}
                            fill={layerColor}
                            dominantBaseline="central"
                            className="pointer-events-none select-none"
                          >
                            {coverage}%
                          </text>
                        )}
                      </g>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        </div>

        {/* Detail Panel */}
        <div ref={detailRef} className="lg:w-80 lg:flex-shrink-0">
          {activeFw ? (
            <div
              key={activeFw.id}
              className="border border-border rounded-lg bg-white overflow-hidden"
              style={{ animation: 'fadeSlideIn 0.25s ease-out' }}
            >
              {/* Header bar */}
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ backgroundColor: layerConfig[activeFw.layer].color }}
              >
                <span className="text-sm font-bold text-white">{activeFw.name}</span>
                {activeFw.id === 'ara' && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white font-semibold">
                    Current
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <span
                    className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-medium"
                    style={{
                      backgroundColor: layerConfig[activeFw.layer].color + '10',
                      color: layerConfig[activeFw.layer].color,
                    }}
                  >
                    {layerConfig[activeFw.layer].label}
                  </span>
                </div>

                <p className="text-sm text-steel leading-relaxed mb-4">
                  {activeFw.description}
                </p>

                {/* Coverage stats */}
                {activeFw.acrsMapped != null && (
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                      ARA Coverage
                    </h4>
                    <div className="flex items-baseline gap-3 mb-2.5">
                      <span className="text-2xl font-bold text-charcoal tabular-nums">
                        {activeFw.coveragePct}%
                      </span>
                      <span className="text-xs text-muted">
                        {activeFw.acrsMapped} of 410 ACRs
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        key={`bar-${barAnimKey}`}
                        className="rounded-full h-2"
                        style={{
                          width: `${activeFw.coveragePct}%`,
                          backgroundColor: layerConfig[activeFw.layer].color,
                          animation: 'barGrow 0.6s ease-out forwards',
                          transformOrigin: 'left',
                        }}
                      />
                    </div>
                    {/* Ranking context */}
                    {activeRank != null && (
                      <p className="text-[11px] text-muted mt-2 leading-snug">
                        Ranked <span className="font-semibold text-charcoal">#{activeRank}</span> of{' '}
                        {rankedFrameworks.length} frameworks by ARA alignment
                      </p>
                    )}
                  </div>
                )}

                {/* Cross-layer connections summary */}
                {activeFw.id !== 'ara' && activeFw.coveragePct != null && (
                  <div className="mb-4 flex items-center gap-2 text-xs text-steel">
                    <svg className="w-3.5 h-3.5 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                    <span>
                      {activeFw.coveragePct >= 60
                        ? 'Strong alignment with ARA operational controls'
                        : activeFw.coveragePct >= 40
                          ? 'Moderate overlap with ARA requirements'
                          : 'Complementary to ARA — covers different ground'}
                    </span>
                  </div>
                )}

                {/* Related in same layer */}
                {relatedFrameworks.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                      Same Layer
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {relatedFrameworks.map((fw) => (
                        <button
                          key={fw.id}
                          onClick={() => handleNodeClick(fw.id)}
                          className="text-xs px-2.5 py-1 rounded-md border border-border text-steel hover:bg-slate-50 hover:border-border-dark hover:text-charcoal transition-all duration-150"
                        >
                          {fw.shortName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
              <svg className="w-8 h-8 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
              </svg>
              <p className="text-sm text-muted">
                Click any framework in the diagram to see its coverage details and relationship to ARA.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Inline keyframe animation */}
      <style>{`
        @keyframes barGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
