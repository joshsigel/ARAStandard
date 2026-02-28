'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { acrs } from '@/data/acrs';
import { domains } from '@/data/domains';
import type { EvaluationMethod, ACRClassification, ACR } from '@/types';

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <Link href="/standard" className="hover:text-charcoal transition-colors">
            Standard
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <Link href="/standard/v1.0" className="hover:text-charcoal transition-colors">
            v1.0
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <span className="text-charcoal font-medium">ACR Library</span>
        </li>
      </ol>
    </nav>
  );
}

function LevelBadge({ level, active }: { level: string; active: boolean }) {
  if (!active) {
    return (
      <span className="inline-flex items-center justify-center font-mono text-[11px] font-bold w-8 h-[22px] rounded-[3px] bg-white text-slate-300 border border-slate-200">
        {level}
      </span>
    );
  }
  const classes: Record<string, string> = {
    L1: 'level-badge level-badge-l1',
    L2: 'level-badge level-badge-l2',
    L3: 'level-badge level-badge-l3',
  };
  return <span className={classes[level]}>{level}</span>;
}

const evalMethodLabels: Record<string, string> = {
  AT: 'Automated Testing',
  HS: 'Human Simulation',
  EI: 'Evidence Inspection',
  CM: 'Continuous Monitoring',
};

function ACRCard({ acr, isExpanded, onToggle }: { acr: ACR; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div
      id={acr.id}
      className="border border-border rounded-lg bg-white scroll-mt-24"
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-4 hover:bg-slate-50/50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <span className="acr-id shrink-0">{acr.id}</span>
            <h3 className="text-sm font-semibold text-charcoal truncate">
              {acr.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                acr.classification === 'Blocking'
                  ? 'bg-charcoal text-white'
                  : 'bg-slate-100 text-steel border border-border'
              }`}
            >
              {acr.classification}
            </span>
            <svg
              className={`w-4 h-4 text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="font-mono font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border">
              {acr.evaluationMethod}
            </span>
            <span>{evalMethodLabels[acr.evaluationMethod]}</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span>
            Risk: <span className="font-mono font-semibold text-charcoal">{acr.riskWeight}</span>/10
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-muted">{acr.domain}</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1">
            <LevelBadge level="L1" active={acr.levelApplicability.L1} />
            <LevelBadge level="L2" active={acr.levelApplicability.L2} />
            <LevelBadge level="L3" active={acr.levelApplicability.L3} />
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border p-4 space-y-5">
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Description
            </h4>
            <p className="text-sm text-steel leading-relaxed">
              {acr.description}
            </p>
          </div>

          {/* Evidence Requirements */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Evidence Requirements
            </h4>
            <ul className="space-y-1.5">
              {acr.evidenceRequirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-steel">
                  <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Related Controls */}
          {acr.relatedControls.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Related Controls
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {acr.relatedControls.map((ctrl) => (
                  <Link
                    key={ctrl}
                    href={`/standard/v1.0/acr/${ctrl}`}
                    className="font-mono text-xs font-semibold text-navy bg-slate-50 px-2 py-1 rounded border border-border hover:border-border-dark transition-colors"
                  >
                    {ctrl}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Metadata row */}
          <div className="flex items-center gap-6 pt-3 border-t border-border text-xs text-muted flex-wrap">
            <span>
              Domain: <Link href={`/standard/v1.0/domains/${domains.find(d => d.id === acr.domainId)?.slug}`} className="text-navy underline">{acr.domain}</Link>
            </span>
            <span>Version introduced: {acr.versionIntroduced}</span>
            <Link
              href={`/standard/v1.0/acr/${acr.id}`}
              className="text-navy underline ml-auto"
            >
              Permalink
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ACRLibraryPage() {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState<number | null>(null);
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  const [evalFilter, setEvalFilter] = useState<EvaluationMethod | null>(null);
  const [classFilter, setClassFilter] = useState<ACRClassification | null>(null);
  const [riskFilter, setRiskFilter] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // Handle hash-based deep linking
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setExpanded(new Set([hash]));
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  const filtered = useMemo(() => {
    return acrs.filter((acr) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !acr.id.toLowerCase().includes(q) &&
          !acr.title.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (domainFilter !== null && acr.domainId !== domainFilter) return false;
      if (levelFilter !== null) {
        const key = levelFilter as 'L1' | 'L2' | 'L3';
        if (!acr.levelApplicability[key]) return false;
      }
      if (evalFilter !== null && acr.evaluationMethod !== evalFilter) return false;
      if (classFilter !== null && acr.classification !== classFilter) return false;
      if (riskFilter !== null && acr.riskWeight < riskFilter) return false;
      return true;
    });
  }, [search, domainFilter, levelFilter, evalFilter, classFilter, riskFilter]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpanded(new Set(filtered.map((a) => a.id)));
  };

  const collapseAll = () => {
    setExpanded(new Set());
  };

  const clearFilters = () => {
    setSearch('');
    setDomainFilter(null);
    setLevelFilter(null);
    setEvalFilter(null);
    setClassFilter(null);
    setRiskFilter(null);
  };

  const hasActiveFilters =
    search || domainFilter !== null || levelFilter !== null || evalFilter !== null || classFilter !== null || riskFilter !== null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb />

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          ACR Library
        </h1>
        <p className="text-steel leading-relaxed max-w-[72ch]">
          The Autonomous Compliance Requirement (ACR) Library contains all testable controls
          defined in the ARA Standard. Each ACR specifies a discrete reliability requirement
          with a defined evaluation method, risk weight, and classification.
        </p>
      </div>

      {/* Filters */}
      <div className="border border-border rounded-lg p-4 mb-6 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-charcoal">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-muted hover:text-charcoal transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Search */}
          <div className="lg:col-span-2">
            <label htmlFor="acr-search" className="block text-xs font-medium text-muted mb-1">
              Search by ID or title
            </label>
            <input
              id="acr-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. ACR-7.01 or Prompt"
              className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-white text-charcoal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
          </div>

          {/* Domain */}
          <div>
            <label htmlFor="domain-filter" className="block text-xs font-medium text-muted mb-1">
              Domain
            </label>
            <select
              id="domain-filter"
              value={domainFilter ?? ''}
              onChange={(e) => setDomainFilter(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="">All domains</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {String(d.id).padStart(2, '0')} — {d.shortTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label htmlFor="level-filter" className="block text-xs font-medium text-muted mb-1">
              Level
            </label>
            <select
              id="level-filter"
              value={levelFilter ?? ''}
              onChange={(e) => setLevelFilter(e.target.value || null)}
              className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="">All levels</option>
              <option value="L1">L1 — Supervised</option>
              <option value="L2">L2 — Bounded</option>
              <option value="L3">L3 — High-Stakes</option>
            </select>
          </div>

          {/* Evaluation Method */}
          <div>
            <label htmlFor="eval-filter" className="block text-xs font-medium text-muted mb-1">
              Eval Method
            </label>
            <select
              id="eval-filter"
              value={evalFilter ?? ''}
              onChange={(e) => setEvalFilter((e.target.value || null) as EvaluationMethod | null)}
              className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="">All methods</option>
              <option value="AT">AT — Automated Testing</option>
              <option value="HS">HS — Human Simulation</option>
              <option value="EI">EI — Evidence Inspection</option>
              <option value="CM">CM — Continuous Monitoring</option>
            </select>
          </div>

          {/* Classification */}
          <div>
            <label htmlFor="class-filter" className="block text-xs font-medium text-muted mb-1">
              Classification
            </label>
            <select
              id="class-filter"
              value={classFilter ?? ''}
              onChange={(e) => setClassFilter((e.target.value || null) as ACRClassification | null)}
              className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="">All</option>
              <option value="Blocking">Blocking</option>
              <option value="Conditional">Conditional</option>
            </select>
          </div>
        </div>

        {/* Risk weight slider */}
        <div className="mt-3">
          <label htmlFor="risk-filter" className="block text-xs font-medium text-muted mb-1">
            Minimum risk weight: {riskFilter ?? 'Any'}
          </label>
          <input
            id="risk-filter"
            type="range"
            min={0}
            max={10}
            value={riskFilter ?? 0}
            onChange={(e) => {
              const v = Number(e.target.value);
              setRiskFilter(v === 0 ? null : v);
            }}
            className="w-full max-w-xs accent-navy"
          />
        </div>
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          Showing <span className="font-semibold text-charcoal">{filtered.length}</span> of{' '}
          <span className="font-semibold text-charcoal">{acrs.length}</span> ACRs
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs text-muted hover:text-charcoal transition-colors px-2 py-1 border border-border rounded hover:bg-slate-50"
          >
            Expand all
          </button>
          <button
            onClick={collapseAll}
            className="text-xs text-muted hover:text-charcoal transition-colors px-2 py-1 border border-border rounded hover:bg-slate-50"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* ACR list */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((acr) => (
            <ACRCard
              key={acr.id}
              acr={acr}
              isExpanded={expanded.has(acr.id)}
              onToggle={() => toggleExpand(acr.id)}
            />
          ))
        ) : (
          <div className="border border-border rounded-lg p-8 bg-slate-50 text-center">
            <p className="text-sm text-muted mb-2">No ACRs match the current filters.</p>
            <button
              onClick={clearFilters}
              className="text-sm text-navy underline hover:no-underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
