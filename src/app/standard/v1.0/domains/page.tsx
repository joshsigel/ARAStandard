import type { Metadata } from 'next';
import Link from 'next/link';
import { domains } from '@/data/domains';
import { acrs } from '@/data/acrs';

export const metadata: Metadata = {
  title: 'Reliability Domains — ARA Standard v1.0',
  description:
    'The 13 reliability domains of the ARA Standard v1.0. Each domain addresses a critical area of operational reliability for autonomous systems.',
};

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
          <span className="text-charcoal font-medium">Domains</span>
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

export default function DomainsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb />

      <div className="max-w-[72ch] mb-10">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          Reliability Domains
        </h1>
        <p className="text-steel leading-relaxed">
          The ARA Standard organizes its requirements into 13 reliability domains. Domains 1
          through 12 constitute the core reliability framework applicable to all autonomous
          systems. Domain 13 is an extension domain required only for systems with physical
          actuation capabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {domains.map((domain) => {
          const domainAcrs = acrs.filter((a) => a.domainId === domain.id);
          const actualCount = domainAcrs.length;

          return (
            <Link
              key={domain.id}
              href={`/standard/v1.0/domains/${domain.slug}`}
              className="group block border border-border rounded-lg p-5 hover:border-border-dark transition-colors bg-white"
            >
              {/* Domain number and title */}
              <div className="flex items-start gap-3 mb-3">
                <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-2 py-1 rounded border border-border shrink-0">
                  {String(domain.id).padStart(2, '0')}
                </span>
                <h2 className="text-sm font-semibold text-charcoal leading-tight group-hover:text-navy transition-colors">
                  {domain.title}
                </h2>
              </div>

              {/* Summary */}
              <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                {domain.summary}
              </p>

              {/* Footer: ACR count and level badges */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted">
                  {actualCount} ACR{actualCount !== 1 ? 's' : ''} defined
                  <span className="text-slate-300 mx-1">|</span>
                  {domain.acrCount} total
                </span>
                <div className="flex items-center gap-1">
                  <LevelBadge level="L1" active={domain.applicability.L1} />
                  <LevelBadge level="L2" active={domain.applicability.L2} />
                  <LevelBadge level="L3" active={domain.applicability.L3} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="mt-12 border-t border-border pt-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-2xl font-semibold text-charcoal">{domains.length}</p>
            <p className="text-sm text-muted">Reliability Domains</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-charcoal">{acrs.length}</p>
            <p className="text-sm text-muted">Defined ACRs</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-charcoal">12</p>
            <p className="text-sm text-muted">Core Domains</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-charcoal">1</p>
            <p className="text-sm text-muted">Extension Domain</p>
          </div>
        </div>
      </div>
    </div>
  );
}
