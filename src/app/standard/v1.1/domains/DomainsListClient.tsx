'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { Domain } from '@/types';

interface DomainsListClientProps {
  domains: Domain[];
}

// Domain categories - grouping the 15 domains into 5 logical pillars
interface DomainCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  bgColor: string;
  domainIds: number[];
}

const categories: DomainCategory[] = [
  {
    id: 'boundaries',
    name: 'Boundaries & Access',
    description: 'Defining operational scope, controlling identity and permissions, and protecting data privacy.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: '#1A2333',
    borderColor: '#1A2333',
    bgColor: '#1A233308',
    domainIds: [1, 4, 5],
  },
  {
    id: 'integrity',
    name: 'Decision & Action Integrity',
    description: 'Ensuring decisions are traceable and tool interactions are governed and constrained.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    color: '#3A3A3A',
    borderColor: '#3A3A3A',
    bgColor: '#3A3A3A08',
    domainIds: [2, 3],
  },
  {
    id: 'resilience',
    name: 'Resilience & Security',
    description: 'Containing failures, maintaining reliability under stress, and resisting adversarial attacks.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    color: '#4A5160',
    borderColor: '#4A5160',
    bgColor: '#4A516008',
    domainIds: [6, 7, 8],
  },
  {
    id: 'observability',
    name: 'Observability & Oversight',
    description: 'Detecting drift, monitoring operations, and ensuring human escalation paths.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: '#636B78',
    borderColor: '#636B78',
    bgColor: '#636B7808',
    domainIds: [9, 10, 11],
  },
  {
    id: 'governance',
    name: 'Governance & Accountability',
    description: 'Audit trails, societal impact assessment, operational governance, and physical safety controls.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    color: '#8E95A0',
    borderColor: '#8E95A0',
    bgColor: '#8E95A008',
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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'categories' | 'grid'>('categories');

  const totalACRs = domains.reduce((sum, d) => sum + d.acrCount, 0);
  const newDomains = domains.filter((d) => d.versionIntroduced === '1.1');

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

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
          reliability domains across five pillars. Each pillar represents a fundamental aspect of
          autonomous system reliability.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-charcoal tabular-nums">{domains.length}</span>
            <span className="text-sm text-muted">Domains</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-charcoal tabular-nums">{totalACRs}</span>
            <span className="text-sm text-muted">Total ACRs</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-charcoal tabular-nums">{categories.length}</span>
            <span className="text-sm text-muted">Pillars</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              {newDomains.length} NEW
            </span>
            <span className="text-sm text-muted">in v1.1</span>
          </div>

          {/* View mode toggle */}
          <div className="ml-auto flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
            <button
              onClick={() => setViewMode('categories')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewMode === 'categories'
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              By Pillar
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'categories' ? (
        /* Category-based view */
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryDomains = category.domainIds
              .map((id) => domains.find((d) => d.id === id))
              .filter(Boolean) as Domain[];
            const categoryACRs = categoryDomains.reduce((sum, d) => sum + d.acrCount, 0);
            const isExpanded = expandedCategory === category.id;
            const hasNew = categoryDomains.some((d) => d.versionIntroduced === '1.1');

            return (
              <div
                key={category.id}
                className="border rounded-lg overflow-hidden transition-all duration-200"
                style={{ borderColor: isExpanded ? category.borderColor : undefined }}
              >
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="text-base font-semibold text-charcoal">
                        {category.name}
                      </h2>
                      {hasNew && (
                        <span className="inline-flex items-center text-[9px] font-semibold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-sm font-semibold text-charcoal tabular-nums">{categoryDomains.length}</span>
                      <span className="text-xs text-muted ml-1">domains</span>
                      <span className="text-slate-300 mx-2">|</span>
                      <span className="text-sm font-semibold text-charcoal tabular-nums">{categoryACRs}</span>
                      <span className="text-xs text-muted ml-1">ACRs</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-muted transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {/* Expanded domain cards */}
                {isExpanded && (
                  <div className="border-t border-border">
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ backgroundColor: category.bgColor }}>
                      {categoryDomains.map((domain) => (
                        <Link
                          key={domain.id}
                          href={`/standard/v1.1/domains/${domain.slug}`}
                          className="group block bg-white border border-border rounded-lg p-4 hover:border-border-dark hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <span
                              className="font-mono text-xs font-bold px-2 py-1 rounded shrink-0 text-white"
                              style={{ backgroundColor: category.color }}
                            >
                              {String(domain.id).padStart(2, '0')}
                            </span>
                            <div className="flex items-center gap-2 min-w-0">
                              <h3 className="text-sm font-semibold text-charcoal leading-tight group-hover:text-navy transition-colors">
                                {domain.title}
                              </h3>
                              {domain.versionIntroduced === '1.1' && (
                                <span className="inline-flex items-center text-[9px] font-semibold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                  NEW
                                </span>
                              )}
                            </div>
                          </div>

                          <p className="text-xs text-steel leading-relaxed mb-3 line-clamp-2">
                            {domain.summary}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted tabular-nums">
                                {domain.acrCount} ACRs
                              </span>
                              <div className="flex items-center gap-0.5">
                                <LevelBadge level="L1" active={domain.applicability.L1} />
                                <LevelBadge level="L2" active={domain.applicability.L2} />
                                <LevelBadge level="L3" active={domain.applicability.L3} />
                              </div>
                            </div>
                            <span className="text-xs font-medium text-navy opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              View
                              <span aria-hidden="true">&rarr;</span>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collapsed preview: domain name chips */}
                {!isExpanded && (
                  <div className="px-5 pb-4 flex flex-wrap gap-2">
                    {categoryDomains.map((domain) => (
                      <Link
                        key={domain.id}
                        href={`/standard/v1.1/domains/${domain.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-border text-steel hover:bg-slate-50 hover:border-border-dark transition-colors"
                      >
                        <span className="font-mono font-bold text-[10px]" style={{ color: category.color }}>
                          {String(domain.id).padStart(2, '0')}
                        </span>
                        {domain.shortTitle}
                        {domain.versionIntroduced === '1.1' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {domains.map((domain) => {
            const category = categories.find((c) => c.domainIds.includes(domain.id));
            return (
              <Link
                key={domain.id}
                href={`/standard/v1.1/domains/${domain.slug}`}
                className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:shadow-sm transition-all bg-white"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="font-mono text-xs font-bold px-2 py-1 rounded shrink-0 text-white"
                    style={{ backgroundColor: category?.color || '#3A3A3A' }}
                  >
                    {String(domain.id).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-sm font-semibold text-charcoal leading-tight group-hover:text-navy transition-colors">
                        {domain.title}
                      </h2>
                      {domain.versionIntroduced === '1.1' && (
                        <span className="inline-flex items-center text-[9px] font-semibold px-1 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          NEW
                        </span>
                      )}
                    </div>
                    {category && (
                      <span className="text-[10px] text-muted">{category.name}</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-steel leading-relaxed mb-3 line-clamp-3">
                  {domain.summary}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted tabular-nums">
                      {domain.acrCount} ACRs
                    </span>
                    <div className="flex items-center gap-0.5">
                      <LevelBadge level="L1" active={domain.applicability.L1} />
                      <LevelBadge level="L2" active={domain.applicability.L2} />
                      <LevelBadge level="L3" active={domain.applicability.L3} />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-navy opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Pillar overview visualization */}
      <div className="mt-16 border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-charcoal mb-6">
          Five Pillars of Autonomous Reliability
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const categoryDomains = category.domainIds
              .map((id) => domains.find((d) => d.id === id))
              .filter(Boolean) as Domain[];
            const categoryACRs = categoryDomains.reduce((sum, d) => sum + d.acrCount, 0);
            const pct = Math.round((categoryACRs / totalACRs) * 100);

            return (
              <button
                key={category.id}
                onClick={() => {
                  setViewMode('categories');
                  setExpandedCategory(category.id);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="text-left p-4 rounded-lg border border-border hover:border-border-dark transition-colors group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white mb-3"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <h3 className="text-sm font-semibold text-charcoal mb-1 group-hover:text-navy transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-lg font-bold text-charcoal tabular-nums">{categoryACRs}</span>
                  <span className="text-xs text-muted">ACRs</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="rounded-full h-1.5 transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted mt-1 block">{pct}% of total</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
