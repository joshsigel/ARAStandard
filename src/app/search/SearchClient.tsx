'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { Domain, ACR, RegistryEntry } from '@/types';

interface Result {
  type: string;
  title: string;
  description: string;
  url: string;
  meta?: string;
}

const staticPages = [
  { title: 'Two-Axis Certification Model', description: 'Level × Class certification matrix for autonomous systems', url: '/certification', type: 'Page' },
  { title: 'Risk Classification', description: 'Seven-factor risk assessment determining Assurance Class', url: '/certification/risk-classification', type: 'Page' },
  { title: 'Platform Certification', description: 'Reusable platform certification with ACR inheritance', url: '/certification/platform', type: 'Page' },
  { title: 'Ecosystem Overview', description: 'ARA ecosystem participants: AVBs, CAPOs, insurers, consortium', url: '/ecosystem', type: 'Page' },
  { title: 'Developer Portal', description: 'SDK integration, telemetry schemas, API reference', url: '/developers', type: 'Page' },
  { title: 'AI Standards Landscape', description: 'Global AI governance frameworks and ARA positioning', url: '/ai-landscape', type: 'Page' },
  { title: 'Badge Generator', description: 'Generate ARA certification badges with operational state', url: '/badge-generator', type: 'Page' },
  { title: 'AVB Program', description: 'Authorized Validation Body program and requirements', url: '/avb', type: 'Page' },
  { title: 'Monitoring & Assurance', description: 'CAPO monitoring, class-differentiated assurance', url: '/monitoring', type: 'Page' },
  { title: 'Governance Structure', description: 'ARAF governance bodies, advisory committees, marketplace', url: '/governance', type: 'Page' },
  { title: 'Glossary', description: 'Definitions for ARA Standard terminology', url: '/standard/v1.1/glossary', type: 'Page' },
  { title: 'Regulatory Crosswalk', description: 'Framework-to-ACR mapping explorer', url: '/standard/v1.1/regulatory', type: 'Page' },
];

interface SearchClientProps {
  domains: Domain[];
  acrs: ACR[];
  registryEntries: RegistryEntry[];
}

function SearchContent({ domains, acrs, registryEntries }: SearchClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Result[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lower = query.toLowerCase();
    const matched: Result[] = [];

    // Search domains
    for (const d of domains) {
      if (
        d.title.toLowerCase().includes(lower) ||
        d.summary.toLowerCase().includes(lower) ||
        `domain ${d.id}`.includes(lower)
      ) {
        matched.push({
          type: 'Domain',
          title: `Domain ${d.id} — ${d.title}`,
          description: d.summary.slice(0, 200),
          url: `/standard/v1.1/domains/${d.slug}`,
          meta: `${d.acrCount} ACRs`,
        });
      }
    }

    // Search ACRs
    for (const a of acrs) {
      if (
        a.id.toLowerCase().includes(lower) ||
        (a.title ?? '').toLowerCase().includes(lower) ||
        (a.description ?? '').toLowerCase().includes(lower)
      ) {
        matched.push({
          type: 'ACR',
          title: `${a.id} — ${a.title ?? a.id}`,
          description: (a.description ?? '').slice(0, 200),
          url: `/standard/v1.1/acr/${a.id}`,
          meta: a.domain,
        });
      }
    }

    // Search registry
    for (const r of registryEntries) {
      if (
        r.certificationId.toLowerCase().includes(lower) ||
        r.organization.toLowerCase().includes(lower) ||
        r.systemName.toLowerCase().includes(lower)
      ) {
        matched.push({
          type: 'Registry',
          title: `${r.organization} — ${r.systemName}`,
          description: r.scopeStatement.slice(0, 200),
          url: `/registry/verify/${r.certificationId}`,
          meta: r.certificationLevel,
        });
      }
    }

    // Search static pages
    for (const p of staticPages) {
      if (
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
      ) {
        matched.push({
          type: 'Page',
          title: p.title,
          description: p.description,
          url: p.url,
        });
      }
    }

    setResults(matched);
  }, [query, domains, acrs, registryEntries]);

  const filtered = filter === 'all'
    ? results
    : results.filter((r) => r.type === filter);

  const counts: Record<string, number> = {};
  for (const r of results) {
    counts[r.type] = (counts[r.type] || 0) + 1;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold text-charcoal mb-6">Search</h1>

      {/* Search input */}
      <div className="flex items-center gap-3 border border-border rounded-lg px-4 py-3 mb-6 focus-within:border-navy">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400 shrink-0">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search domains, ACRs, registry, pages..."
          className="flex-1 text-sm outline-none text-charcoal placeholder:text-slate-400"
          autoFocus
        />
      </div>

      {/* Facets */}
      {results.length > 0 && (
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
              filter === 'all'
                ? 'bg-charcoal text-white'
                : 'bg-slate-100 text-steel hover:bg-slate-200'
            }`}
          >
            All ({results.length})
          </button>
          {Object.entries(counts).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                filter === type
                  ? 'bg-charcoal text-white'
                  : 'bg-slate-100 text-steel hover:bg-slate-200'
              }`}
            >
              {type} ({count})
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {query && filtered.length === 0 && (
        <p className="text-sm text-muted py-8">
          No results found for &ldquo;{query}&rdquo;.
        </p>
      )}

      <div className="space-y-3">
        {filtered.map((result, i) => (
          <Link
            key={i}
            href={result.url}
            className="block border border-border rounded-lg p-4 hover:bg-slate-50 hover:border-border-dark transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    {result.type}
                  </span>
                  <h3 className="text-sm font-medium text-charcoal truncate">
                    {result.title}
                  </h3>
                </div>
                <p className="text-xs text-muted line-clamp-2">
                  {result.description}
                </p>
              </div>
              {result.meta && (
                <span className="text-xs text-slate-400 shrink-0">
                  {result.meta}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {!query && (
        <div className="text-sm text-muted py-8">
          <p className="mb-2">Try searching for:</p>
          <ul className="space-y-1">
            <li>
              <button onClick={() => setQuery('adversarial')} className="text-navy hover:underline">
                adversarial
              </button>
            </li>
            <li>
              <button onClick={() => setQuery('ACR-7.01')} className="text-navy hover:underline">
                ACR-7.01
              </button>
            </li>
            <li>
              <button onClick={() => setQuery('Meridian')} className="text-navy hover:underline">
                Meridian
              </button>
            </li>
            <li>
              <button onClick={() => setQuery('assurance class')} className="text-navy hover:underline">
                assurance class
              </button>
            </li>
            <li>
              <button onClick={() => setQuery('platform certification')} className="text-navy hover:underline">
                platform certification
              </button>
            </li>
            <li>
              <button onClick={() => setQuery('CAPO')} className="text-navy hover:underline">
                CAPO
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export function SearchClient({ domains, acrs, registryEntries }: SearchClientProps) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <nav className="text-xs text-muted mb-8">
        <Link href="/" className="hover:text-charcoal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">Search</span>
      </nav>
      <Suspense fallback={<div className="text-sm text-muted">Loading search...</div>}>
        <SearchContent domains={domains} acrs={acrs} registryEntries={registryEntries} />
      </Suspense>
    </div>
  );
}
