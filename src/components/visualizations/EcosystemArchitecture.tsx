'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

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

const typeColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
  governance: { bg: '#1A2333', border: '#0D1219', text: '#FFFFFF', label: 'Governance' },
  evaluator: { bg: '#3A3A3A', border: '#111111', text: '#FFFFFF', label: 'Evaluation' },
  operator: { bg: '#4A5160', border: '#3A3A3A', text: '#FFFFFF', label: 'Operations' },
  participant: { bg: '#F0F1F3', border: '#C8CCD2', text: '#111111', label: 'Ecosystem' },
  market: { bg: '#E2E4E8', border: '#8E95A0', text: '#111111', label: 'Market' },
};

const nodePositions: Record<string, { x: number; y: number }> = {
  araf: { x: 400, y: 50 },
  tsb: { x: 240, y: 140 },
  dpsic: { x: 560, y: 140 },
  avb: { x: 160, y: 260 },
  capo: { x: 400, y: 260 },
  rip: { x: 650, y: 260 },
  'cert-org': { x: 210, y: 400 },
  platform: { x: 400, y: 400 },
  consortium: { x: 590, y: 400 },
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

// Which nodes connect to a given node
function getConnections(nodeId: string) {
  const connected = new Set<string>();
  for (const edge of edges) {
    if (edge.from === nodeId) connected.add(edge.to);
    if (edge.to === nodeId) connected.add(edge.from);
  }
  return connected;
}

export function EcosystemArchitecture({
  onNodeClick,
  className,
}: EcosystemArchitectureProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const activeId = selected || hovered;
  const activeNode = activeId ? nodes.find((n) => n.id === activeId) : null;
  const connections = activeId ? getConnections(activeId) : new Set<string>();

  // Get connected edges and their labels for the detail panel
  const connectedEdges = activeId
    ? edges.filter((e) => e.from === activeId || e.to === activeId)
    : [];

  const nodeH = 36;
  const nodeWidths: Record<string, number> = {
    araf: 90,
    tsb: 80,
    dpsic: 90,
    avb: 80,
    capo: 90,
    rip: 150,
    'cert-org': 125,
    platform: 140,
    consortium: 110,
  };
  const getNodeW = (id: string) => nodeWidths[id] || 100;

  const handleNodeClick = (nodeId: string) => {
    setSelected(selected === nodeId ? null : nodeId);
    onNodeClick?.(nodeId);
  };

  // Scroll detail into view on mobile when selected
  useEffect(() => {
    if (selected && detailRef.current && window.innerWidth < 768) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selected]);

  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Diagram */}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted mb-3 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
            </svg>
            Click any node to explore its role
          </div>
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

              const isActive = activeId === edge.from || activeId === edge.to;
              const isDimmed = activeId && !isActive;

              // Same-row edges connect sides; cross-row edges connect top/bottom
              const sameRow = from.y === to.y;
              let x1: number, y1: number, x2: number, y2: number;

              if (sameRow) {
                const fromW = getNodeW(edge.from);
                const toW = getNodeW(edge.to);
                if (from.x > to.x) {
                  x1 = from.x - fromW / 2;
                  x2 = to.x + toW / 2;
                } else {
                  x1 = from.x + fromW / 2;
                  x2 = to.x - toW / 2;
                }
                y1 = from.y;
                y2 = to.y;
              } else {
                x1 = from.x;
                y1 = from.y + nodeH / 2;
                x2 = to.x;
                y2 = to.y - nodeH / 2;
              }

              // Label position
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              let lx: number, ly: number;
              if (sameRow) {
                lx = mx;
                ly = my - nodeH / 2 - 12;
              } else {
                lx = mx + 12;
                ly = my - 2;
              }
              const textW = edge.label ? edge.label.length * 6.2 + 8 : 0;

              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isActive ? '#111111' : '#C8CCD2'}
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={edge.label === 'Advises' || edge.label === 'Contributes' ? '4 3' : 'none'}
                    opacity={isDimmed ? 0.2 : 1}
                    markerEnd="url(#arrow)"
                    className="transition-all duration-200"
                  />
                  {isActive && edge.label && (
                    <>
                      <rect
                        x={sameRow ? lx - textW / 2 : lx - 4}
                        y={ly - 8}
                        width={textW}
                        height={16}
                        rx={3}
                        fill="white"
                        fillOpacity={0.95}
                        stroke="#E2E4E8"
                        strokeWidth={0.5}
                      />
                      <text
                        x={lx}
                        y={ly}
                        textAnchor={sameRow ? 'middle' : 'start'}
                        dominantBaseline="central"
                        fontSize={10}
                        fill="#4A5160"
                        fontWeight={600}
                      >
                        {edge.label}
                      </text>
                    </>
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
              const isActive = activeId === node.id;
              const isConnected = connections.has(node.id);
              const isDimmed = activeId && !isActive && !isConnected;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleNodeClick(node.id)}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.label}: ${node.description}`}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleNodeClick(node.id); }}
                >
                  {/* Selection ring */}
                  {isActive && (
                    <rect
                      x={pos.x - getNodeW(node.id) / 2 - 4}
                      y={pos.y - nodeH / 2 - 4}
                      width={getNodeW(node.id) + 8}
                      height={nodeH + 8}
                      rx={10}
                      fill="none"
                      stroke={color.border}
                      strokeWidth={2}
                      opacity={0.4}
                      className="animate-pulse"
                    />
                  )}
                  <rect
                    x={pos.x - getNodeW(node.id) / 2}
                    y={pos.y - nodeH / 2}
                    width={getNodeW(node.id)}
                    height={nodeH}
                    rx={6}
                    fill={color.bg}
                    stroke={isActive ? color.border : 'transparent'}
                    strokeWidth={isActive ? 2 : 0}
                    opacity={isDimmed ? 0.3 : 1}
                    className="transition-all duration-200"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={node.label.length > 14 ? 11 : 12}
                    fontWeight={700}
                    fill={color.text}
                    opacity={isDimmed ? 0.3 : 1}
                    className="pointer-events-none select-none transition-opacity duration-200"
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
        </div>

        {/* Detail Panel (side on desktop, below on mobile) */}
        <div
          ref={detailRef}
          className="lg:w-80 lg:flex-shrink-0"
        >
          {activeNode ? (
            <div className="border border-border rounded-lg bg-white overflow-hidden transition-all duration-200">
              {/* Header bar with type color */}
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ backgroundColor: typeColors[activeNode.type].bg }}
              >
                <span className="text-sm font-bold" style={{ color: typeColors[activeNode.type].text }}>
                  {activeNode.label}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    color: typeColors[activeNode.type].text,
                  }}
                >
                  {typeColors[activeNode.type].label}
                </span>
              </div>

              <div className="p-4">
                <p className="text-sm text-steel leading-relaxed mb-4">
                  {activeNode.description}
                </p>

                {/* Connections */}
                {connectedEdges.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                      Connections
                    </h4>
                    <div className="space-y-1.5">
                      {connectedEdges.map((edge, i) => {
                        const otherId = edge.from === activeId ? edge.to : edge.from;
                        const otherNode = nodes.find((n) => n.id === otherId);
                        const direction = edge.from === activeId ? 'outgoing' : 'incoming';
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-steel"
                          >
                            <span className={`text-[10px] ${direction === 'outgoing' ? 'text-navy' : 'text-slate-400'}`}>
                              {direction === 'outgoing' ? '\u2192' : '\u2190'}
                            </span>
                            <span className="font-medium text-charcoal">
                              {edge.label}
                            </span>
                            <span className="text-slate-400">{otherNode?.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Explore link */}
                {activeNode.href && (
                  <Link
                    href={activeNode.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
                  >
                    Learn more
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
              <svg className="w-8 h-8 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
              </svg>
              <p className="text-sm text-muted">
                Click any node in the diagram to see details about its role in the ecosystem.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted">
        {Object.entries(typeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm border"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            />
            <span>{colors.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
