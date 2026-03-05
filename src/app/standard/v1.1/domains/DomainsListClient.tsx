'use client';

import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DomainRadialChart } from '@/components/visualizations/DomainRadialChart';
import type { Domain } from '@/types';

interface DomainsListClientProps {
  domains: Domain[];
}

export function DomainsListClient({ domains }: DomainsListClientProps) {
  const radialDomains = domains.map((d) => ({
    id: d.id,
    slug: d.slug,
    title: d.title,
    shortTitle: d.shortTitle,
    acrCount: d.acrCount,
  }));

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

      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          15 Reliability Domains
        </h1>
        <p className="text-steel leading-relaxed max-w-[72ch]">
          The ARA Standard v1.1 organizes its 410 Autonomous Compliance Requirements into 15
          reliability domains. Domains 1 through 12 and 14-15 carry forward from v1.0 (with
          renumbering). Domain 5 (Data Privacy & Consent Management) and Domain 13 (Societal
          Impact Assessment) are new in v1.1.
        </p>
      </div>

      {/* Radial chart */}
      <div className="flex justify-center mb-12">
        <DomainRadialChart
          domains={radialDomains}
          onDomainClick={(domain) => {
            const slug = domains.find((d) => d.id === domain.id)?.slug;
            if (slug) window.location.href = `/standard/v1.1/domains/${slug}`;
          }}
          className="max-w-[500px] w-full"
        />
      </div>

      {/* Domain grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {domains.map((domain) => (
          <Link
            key={domain.id}
            href={`/standard/v1.1/domains/${domain.slug}`}
            className="group block border border-border rounded-lg p-5 hover:border-border-dark transition-colors bg-white"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-2 py-1 rounded border border-border shrink-0">
                {String(domain.id).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-sm font-semibold text-charcoal leading-tight group-hover:text-navy transition-colors">
                  {domain.title}
                </h2>
                {domain.versionIntroduced === '1.1' && (
                  <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    NEW
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted">
                {domain.acrCount} ACRs
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-navy opacity-0 group-hover:opacity-100 transition-opacity">
                View domain
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Summary stats */}
      <div className="mt-12 border-t border-border pt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-semibold text-charcoal">{domains.length}</p>
            <p className="text-sm text-muted">Reliability Domains</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-charcoal">
              {domains.reduce((sum, d) => sum + d.acrCount, 0)}
            </p>
            <p className="text-sm text-muted">Total ACRs</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-charcoal">
              {domains.filter((d) => d.versionIntroduced === '1.1').length}
            </p>
            <p className="text-sm text-muted">New in v1.1</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-charcoal">
              {domains.filter((d) => d.versionIntroduced !== '1.1').length}
            </p>
            <p className="text-sm text-muted">Carried from v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
