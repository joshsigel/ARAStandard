'use client';

import { useState } from 'react';

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
  // Regulation layer
  { id: 'eu-ai-act', name: 'EU AI Act', shortName: 'EU AI Act', layer: 'regulation', description: 'European Union Artificial Intelligence Act — Risk-based regulatory framework for AI systems in the EU market.', acrsMapped: 287, coveragePct: 70 },
  { id: 'nist-rmf', name: 'NIST AI RMF', shortName: 'NIST RMF', layer: 'regulation', description: 'NIST AI Risk Management Framework — US voluntary framework for trustworthy AI development.', acrsMapped: 312, coveragePct: 76 },
  { id: 'iso-42001', name: 'ISO/IEC 42001', shortName: 'ISO 42001', layer: 'regulation', description: 'AI Management System standard — Requirements for establishing and maintaining an AI management system.', acrsMapped: 256, coveragePct: 62 },
  { id: 'iso-23894', name: 'ISO/IEC 23894', shortName: 'ISO 23894', layer: 'regulation', description: 'AI Risk Management — Guidance on managing risk for organizations developing or using AI.', acrsMapped: 198, coveragePct: 48 },

  // Governance layer
  { id: 'oecd-ai', name: 'OECD AI Principles', shortName: 'OECD AI', layer: 'governance', description: 'OECD Recommendation on AI — International principles for responsible stewardship of trustworthy AI.', acrsMapped: 178, coveragePct: 43 },
  { id: 'ieee-7000', name: 'IEEE 7000', shortName: 'IEEE 7000', layer: 'governance', description: 'Model Process for Addressing Ethical Concerns During System Design — Ethics-driven system engineering.', acrsMapped: 145, coveragePct: 35 },
  { id: 'soc2', name: 'SOC 2 Type II', shortName: 'SOC 2', layer: 'governance', description: 'Service Organization Control 2 — Trust services criteria for security, availability, processing integrity, confidentiality, privacy.', acrsMapped: 223, coveragePct: 54 },
  { id: 'gdpr', name: 'GDPR', shortName: 'GDPR', layer: 'governance', description: 'General Data Protection Regulation — EU data protection and privacy regulation.', acrsMapped: 134, coveragePct: 33 },

  // Agent ecosystem layer
  { id: 'anthropic-rsp', name: 'Anthropic RSP', shortName: 'RSP', layer: 'agent-ecosystem', description: 'Anthropic Responsible Scaling Policy — Commitments for responsible development at increasing capability levels.', acrsMapped: 167, coveragePct: 41 },
  { id: 'openai-safety', name: 'OpenAI Safety Framework', shortName: 'OpenAI', layer: 'agent-ecosystem', description: 'OpenAI Preparedness Framework — Approach to evaluating and mitigating catastrophic risks.', acrsMapped: 156, coveragePct: 38 },
  { id: 'google-saif', name: 'Google SAIF', shortName: 'SAIF', layer: 'agent-ecosystem', description: 'Google Secure AI Framework — Conceptual framework for secure AI systems.', acrsMapped: 189, coveragePct: 46 },
  { id: 'mcp', name: 'MCP Protocol', shortName: 'MCP', layer: 'agent-ecosystem', description: 'Model Context Protocol — Standardized protocol for AI tool use and context management.', acrsMapped: 45, coveragePct: 11 },

  // Operational reliability (ARA sits here)
  { id: 'ara', name: 'ARA Standard v1.1', shortName: 'ARA', layer: 'operational', description: 'Autonomous Reliability Assurance Standard — The comprehensive operational reliability standard for autonomous systems with 410 ACRs across 15 domains.', acrsMapped: 410, coveragePct: 100, status: 'current' },
  { id: 'iso-25010', name: 'ISO/IEC 25010', shortName: 'ISO 25010', layer: 'operational', description: 'Systems and software Quality Requirements and Evaluation — Quality model for system and software product quality.', acrsMapped: 201, coveragePct: 49 },
];

const layerConfig: Record<string, { label: string; y: number; color: string }> = {
  regulation: { label: 'Regulation', y: 50, color: '#1A2333' },
  governance: { label: 'Standards & Governance', y: 170, color: '#3A3A3A' },
  'agent-ecosystem': { label: 'AI / Agent Ecosystem', y: 290, color: '#4A5160' },
  operational: { label: 'Operational Reliability', y: 410, color: '#636B78' },
};

export function StandardsLandscape({
  frameworks = defaultFrameworks,
  onFrameworkClick,
  className,
}: StandardsLandscapeProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const hoveredFw = hovered ? frameworks.find((f) => f.id === hovered) : null;

  const width = 900;
  const height = 500;
  const nodeW = 90;
  const nodeH = 32;

  // Distribute nodes within each layer
  const getNodePosition = (fw: FrameworkNode, index: number, layerNodes: FrameworkNode[]) => {
    const layer = layerConfig[fw.layer];
    const totalWidth = layerNodes.length * (nodeW + 20) - 20;
    const startX = (width - totalWidth) / 2;
    return {
      x: startX + index * (nodeW + 20) + nodeW / 2,
      y: layer.y,
    };
  };

  // Group by layer
  const layers = Object.keys(layerConfig);
  const groupedNodes = layers.map((layer) => ({
    layer,
    nodes: frameworks.filter((f) => f.layer === layer),
  }));

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label="AI Standards Landscape — Four-layer framework positioning"
      >
        {/* Layer backgrounds */}
        {layers.map((layer) => {
          const config = layerConfig[layer];
          const isSelected = selectedLayer === layer;
          return (
            <g key={layer}>
              <rect
                x={30}
                y={config.y - 25}
                width={width - 60}
                height={70}
                rx={8}
                fill={isSelected ? config.color : '#F8F9FA'}
                fillOpacity={isSelected ? 0.06 : 1}
                stroke={isSelected ? config.color : '#E2E4E8'}
                strokeWidth={isSelected ? 1.5 : 0.5}
                onClick={() => setSelectedLayer(selectedLayer === layer ? null : layer)}
                className="cursor-pointer"
              />
              <text
                x={50}
                y={config.y - 8}
                fontSize={9}
                fontWeight={600}
                fill={config.color}
                letterSpacing={1}
                className="pointer-events-none select-none"
              >
                {config.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Framework nodes */}
        {groupedNodes.map(({ layer, nodes: layerNodes }) =>
          layerNodes.map((fw, i) => {
            const pos = getNodePosition(fw, i, layerNodes);
            const isHovered = hovered === fw.id;
            const isARA = fw.id === 'ara';
            const layerColor = layerConfig[layer].color;

            return (
              <g
                key={fw.id}
                onMouseEnter={() => setHovered(fw.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onFrameworkClick?.(fw.id)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${fw.name}: ${fw.description}`}
                onKeyDown={(e) => { if (e.key === 'Enter') onFrameworkClick?.(fw.id); }}
              >
                <rect
                  x={pos.x - nodeW / 2}
                  y={pos.y - nodeH / 2}
                  width={nodeW}
                  height={nodeH}
                  rx={4}
                  fill={isARA ? '#1A2333' : isHovered ? layerColor : 'white'}
                  stroke={isARA ? '#1A2333' : isHovered ? layerColor : '#C8CCD2'}
                  strokeWidth={isARA ? 2 : isHovered ? 1.5 : 1}
                  className="transition-all duration-150"
                />
                {isARA && (
                  <rect
                    x={pos.x - nodeW / 2 - 3}
                    y={pos.y - nodeH / 2 - 3}
                    width={nodeW + 6}
                    height={nodeH + 6}
                    rx={6}
                    fill="none"
                    stroke="#1A2333"
                    strokeWidth={1}
                    opacity={0.3}
                  />
                )}
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={10}
                  fontWeight={isARA ? 800 : isHovered ? 700 : 500}
                  fill={isARA || isHovered ? '#FFFFFF' : '#4A5160'}
                  className="pointer-events-none select-none"
                >
                  {fw.shortName}
                </text>
              </g>
            );
          })
        )}
      </svg>

      {/* Hover detail */}
      {hoveredFw && (
        <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-border text-sm animate-fade-in-up"
             style={{ animationDuration: '0.15s' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-semibold text-charcoal">{hoveredFw.name}</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200 text-slate-600">
              {hoveredFw.layer.replace('-', ' ')}
            </span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-2">{hoveredFw.description}</p>
          {hoveredFw.acrsMapped != null && (
            <div className="flex gap-4 text-xs">
              <span className="text-slate-500">
                <span className="font-semibold text-charcoal">{hoveredFw.acrsMapped}</span> ACRs mapped
              </span>
              <span className="text-slate-500">
                <span className="font-semibold text-charcoal">{hoveredFw.coveragePct}%</span> ARA coverage
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
