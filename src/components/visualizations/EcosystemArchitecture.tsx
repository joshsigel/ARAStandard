'use client';

import { useState } from 'react';

interface EcosystemNode {
  id: string;
  label: string;
  description: string;
  type: 'governance' | 'evaluator' | 'operator' | 'participant' | 'market';
  href?: string;
}

interface EcosystemArchitectureProps {
  onNodeClick?: (nodeId: string) => void;
  className?: string;
}

const nodes: EcosystemNode[] = [
  { id: 'araf', label: 'ARAF', description: 'Autonomous Reliability Assurance Foundation — Standard owner, governance, and oversight body.', type: 'governance', href: '/governance' },
  { id: 'tsb', label: 'TSB', description: 'Technical Standards Board — Oversees standard development, domain expertise, and version management.', type: 'governance', href: '/governance' },
  { id: 'dpsic', label: 'DPSIC', description: 'Data Privacy & Societal Impact Committee — Advisory body for Domain 5 and Domain 13 concerns.', type: 'governance', href: '/governance' },
  { id: 'avb', label: 'AVBs', description: 'Authorized Validation Bodies — Conduct evaluations, risk classification, and certification issuance at Basic/Enhanced/Full authorization levels.', type: 'evaluator', href: '/avb' },
  { id: 'capo', label: 'CAPOs', description: 'Continuous Assurance Platform Operators — Provide ongoing monitoring for Class B and C certifications with SLA-bound telemetry services.', type: 'operator', href: '/ecosystem/capos' },
  { id: 'rip', label: 'Insurance Partners', description: 'Recognized Insurer Partners — Provide coverage products informed by ARA certification data and assurance class designations.', type: 'market', href: '/ecosystem/insurers' },
  { id: 'cert-org', label: 'Certified Orgs', description: 'Organizations holding active ARA certifications for their autonomous systems deployments.', type: 'participant', href: '/registry' },
  { id: 'platform', label: 'Platform Vendors', description: 'Technology vendors with certified platforms. Platform certifications enable ACR inheritance for downstream deployers.', type: 'participant', href: '/ecosystem/platforms' },
  { id: 'consortium', label: 'Consortium', description: 'Industry consortium members contributing to standard evolution through working groups and public comment.', type: 'participant', href: '/ecosystem/consortium' },
];

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  governance: { bg: '#1A2333', border: '#0D1219', text: '#FFFFFF' },
  evaluator: { bg: '#3A3A3A', border: '#111111', text: '#FFFFFF' },
  operator: { bg: '#4A5160', border: '#3A3A3A', text: '#FFFFFF' },
  participant: { bg: '#F0F1F3', border: '#C8CCD2', text: '#111111' },
  market: { bg: '#E2E4E8', border: '#8E95A0', text: '#111111' },
};

// Layout positions (in a 800x500 coordinate space)
const nodePositions: Record<string, { x: number; y: number }> = {
  araf: { x: 400, y: 50 },
  tsb: { x: 240, y: 140 },
  dpsic: { x: 560, y: 140 },
  avb: { x: 160, y: 260 },
  capo: { x: 400, y: 260 },
  rip: { x: 640, y: 260 },
  'cert-org': { x: 240, y: 400 },
  platform: { x: 400, y: 400 },
  consortium: { x: 560, y: 400 },
};

const edges: { from: string; to: string; label?: string }[] = [
  { from: 'araf', to: 'tsb', label: 'Oversees' },
  { from: 'araf', to: 'dpsic', label: 'Advises' },
  { from: 'tsb', to: 'avb', label: 'Authorizes' },
  { from: 'araf', to: 'capo', label: 'Accredits' },
  { from: 'araf', to: 'rip', label: 'Recognizes' },
  { from: 'avb', to: 'cert-org', label: 'Certifies' },
  { from: 'avb', to: 'platform', label: 'Certifies' },
  { from: 'capo', to: 'cert-org', label: 'Monitors' },
  { from: 'rip', to: 'cert-org', label: 'Insures' },
  { from: 'platform', to: 'cert-org', label: 'Inherits' },
  { from: 'consortium', to: 'araf', label: 'Contributes' },
];

export function EcosystemArchitecture({
  onNodeClick,
  className,
}: EcosystemArchitectureProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const hoveredNode = hovered ? nodes.find((n) => n.id === hovered) : null;

  const nodeW = 100;
  const nodeH = 36;

  return (
    <div className={className}>
      <svg
        viewBox="0 0 800 480"
        width="100%"
        role="img"
        aria-label="ARA Ecosystem Architecture Diagram"
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodePositions[edge.from];
          const to = nodePositions[edge.to];
          if (!from || !to) return null;

          const isHighlighted = hovered === edge.from || hovered === edge.to;

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y + nodeH / 2}
                x2={to.x}
                y2={to.y - nodeH / 2}
                stroke={isHighlighted ? '#111111' : '#C8CCD2'}
                strokeWidth={isHighlighted ? 1.5 : 1}
                strokeDasharray={edge.label === 'Advises' || edge.label === 'Contributes' ? '4 3' : 'none'}
                markerEnd="url(#arrow)"
              />
              {isHighlighted && edge.label && (
                <text
                  x={(from.x + to.x) / 2 + 8}
                  y={(from.y + nodeH / 2 + to.y - nodeH / 2) / 2}
                  fontSize={10}
                  fill="#636B78"
                  fontWeight={500}
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Arrow marker */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C8CCD2" />
          </marker>
        </defs>

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;
          const color = typeColors[node.type];
          const isHovered = hovered === node.id;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onNodeClick?.(node.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`${node.label}: ${node.description}`}
              onKeyDown={(e) => { if (e.key === 'Enter') onNodeClick?.(node.id); }}
            >
              <rect
                x={pos.x - nodeW / 2}
                y={pos.y - nodeH / 2}
                width={nodeW}
                height={nodeH}
                rx={6}
                fill={color.bg}
                stroke={isHovered ? color.border : 'transparent'}
                strokeWidth={isHovered ? 2 : 0}
                className="transition-all duration-150"
              />
              {isHovered && (
                <rect
                  x={pos.x - nodeW / 2 - 2}
                  y={pos.y - nodeH / 2 - 2}
                  width={nodeW + 4}
                  height={nodeH + 4}
                  rx={8}
                  fill="none"
                  stroke={color.border}
                  strokeWidth={1}
                  opacity={0.3}
                />
              )}
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                fontWeight={700}
                fill={color.text}
                className="pointer-events-none select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Layer labels */}
        <text x={40} y={50} fontSize={10} fill="#8E95A0" fontWeight={600} textAnchor="start">GOVERNANCE</text>
        <text x={40} y={260} fontSize={10} fill="#8E95A0" fontWeight={600} textAnchor="start">OPERATIONS</text>
        <text x={40} y={400} fontSize={10} fill="#8E95A0" fontWeight={600} textAnchor="start">ECOSYSTEM</text>
      </svg>

      {/* Hover detail */}
      {hoveredNode && (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-border text-sm animate-fade-in-up"
             style={{ animationDuration: '0.15s' }}>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{
                backgroundColor: typeColors[hoveredNode.type].bg,
                color: typeColors[hoveredNode.type].text,
              }}
            >
              {hoveredNode.label}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">
              {hoveredNode.type}
            </span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">{hoveredNode.description}</p>
        </div>
      )}
    </div>
  );
}
