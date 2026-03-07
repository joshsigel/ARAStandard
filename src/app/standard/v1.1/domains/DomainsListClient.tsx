'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { Domain } from '@/types';

interface DomainsListClientProps {
  domains: Domain[];
}

// Domain categories - grouping the 15 domains into 5 layers
interface DomainCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  domainIds: number[];
}

const categories: DomainCategory[] = [
  {
    id: 'integrity',
    name: 'Decision & Action Integrity',
    shortName: 'Integrity',
    description: 'Ensuring decisions are traceable and tool interactions are governed and constrained.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    color: '#1A2333',
    domainIds: [2, 3],
  },
  {
    id: 'boundaries',
    name: 'Boundaries & Access',
    shortName: 'Boundaries',
    description: 'Defining operational scope, controlling identity and permissions, and protecting data privacy.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: '#3A3A3A',
    domainIds: [1, 4, 5],
  },
  {
    id: 'resilience',
    name: 'Resilience & Security',
    shortName: 'Resilience',
    description: 'Containing failures, maintaining reliability under stress, and resisting adversarial attacks.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: '#4A5160',
    domainIds: [6, 7, 8],
  },
  {
    id: 'observability',
    name: 'Observability & Oversight',
    shortName: 'Observability',
    description: 'Detecting drift, monitoring operations, and ensuring human escalation paths.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: '#636B78',
    domainIds: [9, 10, 11],
  },
  {
    id: 'governance',
    name: 'Governance & Accountability',
    shortName: 'Governance',
    description: 'Audit trails, societal impact assessment, operational governance, and physical safety controls.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    color: '#8E95A0',
    domainIds: [12, 13, 14, 15],
  },
];

function LevelBadge({ level, active }: { level: string; active: boolean }) {
  if (!active) {
    return (
      <span className="inline-flex items-center justify-center font-mono text-[10px] font-bold w-7 h-5 rounded-[3px] bg-white text-slate-300 border border-slate-200">
        {level}
      </span>
    );
  }
  const classes: Record<string, string> = {
    L1: 'level-badge level-badge-l1',
    L2: 'level-badge level-badge-l2',
    L3: 'level-badge level-badge-l3',
  };
  return <span className={`${classes[level]} !text-[10px] !w-7 !h-5`}>{level}</span>;
}

export function DomainsListClient({ domains }: DomainsListClientProps) {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const domainGridRef = useRef<HTMLDivElement>(null);

  const totalACRs = domains.reduce((sum, d) => sum + d.acrCount, 0);
  const newDomains = domains.filter((d) => d.versionIntroduced === '1.1');

  // Resolve category domains helper
  const getCategoryDomains = (category: DomainCategory) =>
    category.domainIds
      .map((id) => domains.find((d) => d.id === id))
      .filter(Boolean) as Domain[];

  const getCategoryACRs = (category: DomainCategory) =>
    getCategoryDomains(category).reduce((sum, d) => sum + d.acrCount, 0);

  // Filtered domains for the grid
  const filteredDomains = selectedLayer
    ? (() => {
        const cat = categories.find((c) => c.id === selectedLayer);
        return cat ? getCategoryDomains(cat) : domains;
      })()
    : domains;

  const selectedCategory = selectedLayer ? categories.find((c) => c.id === selectedLayer) : null;

  // Scroll to domain grid when a layer is selected
  useEffect(() => {
    if (selectedLayer && domainGridRef.current) {
      domainGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedLayer]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1', href: '/standard/v1.1' },
          { label: 'Domains' },
        ]}
        className="mb-8"
      />

      {/* Hero header */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          15 Reliability Domains
        </h1>
        <p className="text-steel leading-relaxed max-w-[72ch] mb-6">
          The ARA Standard v1.1 organizes its {totalACRs} Autonomous Compliance Requirements into 15
          reliability domains across five layers. Each layer builds upon the ones it contains, from
          core decision integrity outward to overarching governance.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-charcoal tabular-nums">{categories.length}</span>
            <span className="text-sm text-muted">Layers</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-charcoal tabular-nums">{domains.length}</span>
            <span className="text-sm text-muted">Domains</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-charcoal tabular-nums">{totalACRs}</span>
            <span className="text-sm text-muted">ACRs</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {newDomains.length} NEW
            </span>
            <span className="text-sm text-muted">in v1.1</span>
          </div>
        </div>
      </div>

      {/* ─── Layer Cards Dashboard ─────────────────────────────────────── */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-charcoal mb-5">
          Five Layers of Autonomous Reliability
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const catDomains = getCategoryDomains(category);
            const catACRs = getCategoryACRs(category);
            const pct = Math.round((catACRs / totalACRs) * 100);
            const isSelected = selectedLayer === category.id;
            const hasNew = catDomains.some((d) => d.versionIntroduced === '1.1');

            return (
              <button
                key={category.id}
                onClick={() => setSelectedLayer(isSelected ? null : category.id)}
                className={`group relative text-left rounded-xl border-2 p-4 transition-all duration-200 ${
                  isSelected
                    ? 'shadow-md scale-[1.02]'
                    : 'border-border hover:border-slate-300 hover:shadow-sm'
                }`}
                style={{
                  borderColor: isSelected ? category.color : undefined,
                  backgroundColor: isSelected ? `${category.color}06` : undefined,
                }}
              >
                {/* Layer number indicator */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  {hasNew && (
                    <span className="text-[8px] font-semibold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      NEW
                    </span>
                  )}
                </div>

                {/* Name + description */}
                <h3 className="text-sm font-semibold text-charcoal leading-tight mb-1">
                  {category.name}
                </h3>
                <p className="text-[11px] text-muted leading-snug mb-4 line-clamp-2">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-baseline gap-3 mb-2">
                  <div>
                    <span className="text-xl font-bold text-charcoal tabular-nums">{catACRs}</span>
                    <span className="text-[10px] text-muted ml-1">ACRs</span>
                  </div>
                  <div className="text-[10px] text-muted">
                    {catDomains.length} domains
                  </div>
                </div>

                {/* Proportion bar */}
                <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: category.color,
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  />
                </div>
                <div className="text-[10px] text-muted mt-1 tabular-nums">
                  {pct}% of total
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div
                    className="absolute -bottom-px left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-b-2 border-r-2 bg-white"
                    style={{ borderColor: category.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Domain Grid ───────────────────────────────────────────────── */}
      <div ref={domainGridRef} className="scroll-mt-24">
        {/* Header with filter status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-charcoal">
              {selectedCategory ? selectedCategory.name : 'All Domains'}
            </h2>
            {selectedCategory && (
              <span className="text-xs text-muted bg-slate-100 px-2 py-0.5 rounded-full tabular-nums">
                {filteredDomains.length} domain{filteredDomains.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          {selectedLayer && (
            <button
              onClick={() => setSelectedLayer(null)}
              className="text-xs text-navy font-medium hover:underline flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Show all domains
            </button>
          )}
        </div>

        {/* Domain cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredDomains.map((domain) => {
            const category = categories.find((c) => c.domainIds.includes(domain.id));
            return (
              <Link
                key={domain.id}
                href={`/standard/v1.1/domains/${domain.slug}`}
                className="group block border border-border rounded-xl p-5 hover:border-border-dark hover:shadow-md transition-all duration-200 bg-white relative overflow-hidden"
              >
                {/* Subtle layer color accent */}
                <div
                  className="absolute top-0 left-0 w-1 h-full rounded-l-xl"
                  style={{ backgroundColor: category?.color || '#3A3A3A' }}
                />

                <div className="pl-3">
                  {/* Header: domain number + title */}
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className="font-mono text-xs font-bold px-2 py-1 rounded shrink-0 text-white"
                      style={{ backgroundColor: category?.color || '#3A3A3A' }}
                    >
                      {String(domain.id).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-charcoal leading-tight group-hover:text-navy transition-colors">
                          {domain.title}
                        </h3>
                        {domain.versionIntroduced === '1.1' && (
                          <span className="inline-flex items-center text-[9px] font-semibold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                            NEW
                          </span>
                        )}
                      </div>
                      {category && (
                        <span className="text-[10px] text-muted">{category.shortName} layer</span>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-steel leading-relaxed mb-4 line-clamp-3">
                    {domain.summary}
                  </p>

                  {/* Footer: ACRs + levels + arrow */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-charcoal tabular-nums">
                        {domain.acrCount} ACRs
                      </span>
                      <div className="flex items-center gap-0.5">
                        <LevelBadge level="L1" active={domain.applicability.L1} />
                        <LevelBadge level="L2" active={domain.applicability.L2} />
                        <LevelBadge level="L3" active={domain.applicability.L3} />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-navy opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      Explore
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
