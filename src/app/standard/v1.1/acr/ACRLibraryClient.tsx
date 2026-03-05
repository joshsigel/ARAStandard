'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { EvaluationMethod, ACRClassification, ACR, Domain } from '@/types';

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
  TP: 'Third-Party Attestation',
  OP: 'Operational Proof',
};

function ACRCard({ acr, domains, isExpanded, onToggle }: { acr: ACR; domains: Domain[]; isExpanded: boolean; onToggle: () => void }) {
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
              {acr.title ?? acr.requirementStatement?.slice(0, 80)}
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
            <span>{evalMethodLabels[acr.evaluationMethod] ?? acr.evaluationMethod}</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span>
            Risk: <span className="font-mono font-semibold text-charcoal">{acr.riskWeight}</span>/10
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-muted">{acr.domain}</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <div className="flex items-center gap-1">
            <LevelBadge level="L1" active={acr.levelApplicability?.L1 ?? false} />
            <LevelBadge level="L2" active={acr.levelApplicability?.L2 ?? false} />
            <LevelBadge level="L3" active={acr.levelApplicability?.L3 ?? false} />
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
              {acr.description ?? acr.requirementStatement}
            </p>
          </div>

          {/* Evidence Requirements */}
          {acr.evidenceRequirements && acr.evidenceRequirements.length > 0 && (
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
          )}

          {/* v1.1 fields */}
          {(acr.profileApplicability || acr.evaluationFrequency || acr.platformCertEligible != null) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border">
              {acr.profileApplicability && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Profile Applicability</p>
                  <p className="text-sm text-steel">{acr.profileApplicability}</p>
                </div>
              )}
              {acr.evaluationFrequency && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Eval Frequency</p>
                  <p className="text-sm text-steel">{acr.evaluationFrequency}</p>
                </div>
              )}
              {acr.platformCertEligible != null && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Platform Cert Eligible</p>
                  <p className="text-sm text-steel">{acr.platformCertEligible ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
          )}

          {/* Related Controls */}
          {acr.relatedControls && acr.relatedControls.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                Related Controls
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {acr.relatedControls.map((ctrl) => (
                  <Link
                    key={ctrl}
                    href={`/standard/v1.1/acr/${ctrl}`}
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
              Domain:{' '}
              <Link
                href={`/standard/v1.1/domains/${domains.find((d) => d.id === acr.domainId)?.slug}`}
                className="text-navy underline"
              >
                {acr.domain}
              </Link>
            </span>
            <span>Version introduced: {acr.versionIntroduced}</span>
            <Link
              href={`/standard/v1.1/acr/${acr.id}`}
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

interface ACRLibraryClientProps {
  acrs: ACR[];
  domains: Domain[];
}

export function ACRLibraryClient({ acrs, domains }: ACRLibraryClientProps) {
  const [search, setSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState<number | null>(null);
  const [evalFilter, setEvalFilter] = useState<EvaluationMethod | null>(null);
  const [classFilter, setClassFilter] = useState<ACRClassification | null>(null);
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
          !(acr.title ?? '').toLowerCase().includes(q) &&
          !(acr.requirementStatement ?? '').toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (domainFilter !== null && acr.domainId !== domainFilter) return false;
      if (evalFilter !== null && acr.evaluationMethod !== evalFilter) return false;
      if (classFilter !== null && acr.classification !== classFilter) return false;
      return true;
    });
  }, [acrs, search, domainFilter, evalFilter, classFilter]);

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
    setEvalFilter(null);
    setClassFilter(null);
  };

  const hasActiveFilters =
    search || domainFilter !== null || evalFilter !== null || classFilter !== null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1', href: '/standard/v1.1' },
          { label: 'ACR Library' },
        ]}
        className="mb-8"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          ACR Library &mdash; 410 Control Requirements
        </h1>
        <p className="text-steel leading-relaxed max-w-[72ch]">
          The Autonomous Compliance Requirement (ACR) Library contains all testable controls
          defined in ARA Standard v1.1. Each ACR specifies a discrete reliability requirement
          with a defined evaluation method, risk weight, classification, and profile applicability.
          Use the filters below to explore the library.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="lg:col-span-1">
            <label htmlFor="acr-search" className="block text-xs font-medium text-muted mb-1">
              Search by ID, title, or text
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
                  {String(d.id).padStart(2, '0')} &mdash; {d.shortTitle}
                </option>
              ))}
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
              <option value="AT">AT &mdash; Automated Testing</option>
              <option value="HS">HS &mdash; Human Simulation</option>
              <option value="EI">EI &mdash; Evidence Inspection</option>
              <option value="CM">CM &mdash; Continuous Monitoring</option>
              <option value="TP">TP &mdash; Third-Party Attestation</option>
              <option value="OP">OP &mdash; Operational Proof</option>
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
              domains={domains}
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
