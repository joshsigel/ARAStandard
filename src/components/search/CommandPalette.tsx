'use client';

// TODO: Migrate to API route fetch for live data. Currently uses static imports
// for instant client-side search responsiveness. An API route would allow live
// Supabase data but would add latency to the command palette experience.

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { domains } from '@/data/domains';
import { acrs } from '@/data/acrs';

interface SearchResult {
  type: 'domain' | 'acr' | 'page' | 'registry' | 'ecosystem' | 'glossary';
  title: string;
  description: string;
  url: string;
  meta?: string;
}

const staticPages: SearchResult[] = [
  // Core
  { type: 'page', title: 'Home', description: 'ARA Standard overview', url: '/' },
  { type: 'page', title: 'Standard Overview', description: 'Scope, definitions, and what ARA certifies', url: '/standard' },
  // Standard v1.1
  { type: 'page', title: 'ARA Standard v1.1', description: 'Current version — 15 domains, 410 ACRs, two-axis model', url: '/standard/v1.1' },
  { type: 'page', title: 'ACR Library', description: 'Full searchable library of 410 Autonomous Control Requirements', url: '/standard/v1.1/acr' },
  { type: 'page', title: 'Domains', description: '15 reliability domains covering operational, security, and governance', url: '/standard/v1.1/domains' },
  { type: 'page', title: 'Glossary', description: 'ARA terminology and definitions', url: '/standard/v1.1/glossary' },
  { type: 'page', title: 'Changelog', description: 'Version history and changes', url: '/standard/v1.1/changelog' },
  // Certification
  { type: 'page', title: 'Certification — Two-Axis Model', description: 'Evaluation Level (L1/L2/L3) x Assurance Class (A/B/C)', url: '/certification' },
  { type: 'page', title: 'Risk Classification', description: '7-factor AVB assessment determining Assurance Class', url: '/certification/risk-classification' },
  { type: 'page', title: 'Platform Certification', description: 'Vendor platform certification pathway and ACR inheritance', url: '/certification/platform' },
  { type: 'page', title: 'Evaluation Methodology', description: '10-phase certification lifecycle and scoring model', url: '/evaluation' },
  { type: 'page', title: 'Badge Generator', description: 'Generate ARA living certification badges', url: '/badge-generator' },
  // Ecosystem
  { type: 'page', title: 'Ecosystem', description: 'ARA ecosystem architecture and participants', url: '/ecosystem' },
  { type: 'page', title: 'Registry', description: 'Public certification registry and verification lookup', url: '/registry' },
  { type: 'page', title: 'Certified Platforms', description: 'Platform vendor certifications directory', url: '/ecosystem/platforms' },
  { type: 'page', title: 'AVB Directory', description: 'Authorized Validation Bodies by region and specialization', url: '/ecosystem/avbs' },
  { type: 'page', title: 'CAPO Directory', description: 'Continuous Assurance Platform Operators', url: '/ecosystem/capos' },
  { type: 'page', title: 'Insurance Partners', description: 'Recognized Insurer Partners for ARA coverage', url: '/ecosystem/insurers' },
  { type: 'page', title: 'Consortium', description: 'Industry consortium contributing members', url: '/ecosystem/consortium' },
  // Developers
  { type: 'page', title: 'Developer Portal', description: 'SDK integration, telemetry schemas, and API reference', url: '/developers' },
  { type: 'page', title: 'SDK Guide', description: 'ARA SDK integration toolkit for developers', url: '/developers/sdk' },
  { type: 'page', title: 'Telemetry Schema', description: 'Event specifications for CAPO monitoring', url: '/developers/telemetry' },
  { type: 'page', title: 'API Reference', description: 'REST endpoints, JSON schemas, and webhook structure', url: '/developers/api' },
  { type: 'page', title: 'AI / Machine Access', description: 'Machine-readable standard, OpenAPI spec, JSON-LD', url: '/ai-access' },
  // Governance & landscape
  { type: 'page', title: 'AI Standards Landscape', description: '14 frameworks positioned across regulation, governance, and operational layers', url: '/ai-landscape' },
  { type: 'page', title: 'Governance', description: 'ARAF governance structure, TSB, DPSIC, and advisory bodies', url: '/governance' },
  { type: 'page', title: 'AVB Program', description: 'Authorized Validation Bodies program and requirements', url: '/avb' },
  { type: 'page', title: 'Monitoring', description: 'CAPO architecture and class-differentiated SLAs', url: '/monitoring' },
  { type: 'page', title: 'Updates', description: 'Standard revisions, announcements, and public comment periods', url: '/updates' },
  // Legacy
  { type: 'page', title: 'ARA Standard v1.0', description: 'Previous version — 13 domains, 352 ACRs', url: '/standard/v1.0' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = useCallback((q: string) => {
    if (!q.trim()) {
      setResults(staticPages.slice(0, 6));
      return;
    }

    const lower = q.toLowerCase();
    const matched: SearchResult[] = [];

    // Search static pages
    for (const page of staticPages) {
      if (
        page.title.toLowerCase().includes(lower) ||
        page.description.toLowerCase().includes(lower)
      ) {
        matched.push(page);
      }
    }

    // Search domains
    if (typeof domains !== 'undefined') {
      for (const domain of domains) {
        if (
          domain.title.toLowerCase().includes(lower) ||
          domain.summary.toLowerCase().includes(lower) ||
          `domain ${domain.id}`.includes(lower)
        ) {
          matched.push({
            type: 'domain',
            title: `Domain ${domain.id} — ${domain.title}`,
            description: domain.summary.slice(0, 120) + '...',
            url: `/standard/v1.0/domains/${domain.slug}`,
            meta: `${domain.acrCount} ACRs`,
          });
        }
      }
    }

    // Search ACRs
    if (typeof acrs !== 'undefined') {
      for (const acr of acrs) {
        if (
          acr.id.toLowerCase().includes(lower) ||
          (acr.title ?? '').toLowerCase().includes(lower) ||
          (acr.description ?? '').toLowerCase().includes(lower) ||
          acr.domain.toLowerCase().includes(lower)
        ) {
          matched.push({
            type: 'acr',
            title: `${acr.id} — ${acr.title ?? acr.id}`,
            description: (acr.description ?? '').slice(0, 120) + '...',
            url: `/standard/v1.0/acr/${acr.id}`,
            meta: acr.domain,
          });
        }
      }
    }

    setResults(matched.slice(0, 12));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      search('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open, search]);

  useEffect(() => {
    search(query);
    setSelectedIndex(0);
  }, [query, search]);

  const navigate = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].url);
    }
  };

  if (!open) return null;

  const typeLabels: Record<string, string> = {
    domain: 'Domain',
    acr: 'ACR',
    page: 'Page',
    registry: 'Registry',
    ecosystem: 'Ecosystem',
    glossary: 'Glossary',
  };

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div
        className="w-full max-w-xl bg-white rounded-lg shadow-2xl border border-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-400 shrink-0">
            <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search standard, domains, ACRs, registry..."
            className="flex-1 text-sm outline-none text-charcoal placeholder:text-slate-400"
          />
          <kbd className="text-xs text-slate-400 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted">
              No results found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul role="listbox" className="py-1">
              {results.map((result, i) => (
                <li key={result.url + i} role="option" aria-selected={i === selectedIndex}>
                  <button
                    onClick={() => navigate(result.url)}
                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                      i === selectedIndex ? 'bg-slate-50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                      {typeLabels[result.type]}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-muted truncate mt-0.5">
                        {result.description}
                      </p>
                    </div>
                    {result.meta && (
                      <span className="text-xs text-slate-400 shrink-0 mt-0.5">
                        {result.meta}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded">↵</kbd> open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
