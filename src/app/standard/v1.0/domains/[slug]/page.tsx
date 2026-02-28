import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { domains } from '@/data/domains';
import { acrs } from '@/data/acrs';

interface DomainPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return domains.map((domain) => ({
    slug: domain.slug,
  }));
}

export async function generateMetadata({ params }: DomainPageProps): Promise<Metadata> {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) return { title: 'Domain Not Found' };

  return {
    title: `Domain ${domain.id}: ${domain.title} — ARA Standard v1.0`,
    description: domain.summary,
  };
}

function Breadcrumb({ domainTitle }: { domainTitle: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-1.5 text-sm text-muted flex-wrap">
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
          <Link href="/standard/v1.0/domains" className="hover:text-charcoal transition-colors">
            Domains
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <span className="text-charcoal font-medium">{domainTitle}</span>
        </li>
      </ol>
    </nav>
  );
}

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-lg font-semibold text-charcoal mt-10 mb-4 scroll-mt-24">
      <a href={`#${id}`} className="group">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-muted">#</span>
      </a>
    </h2>
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

function EvalMethodLabel({ method }: { method: string }) {
  const labels: Record<string, string> = {
    AT: 'Automated Testing',
    HS: 'Human Simulation',
    EI: 'Evidence Inspection',
    CM: 'Continuous Monitoring',
  };

  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span className="font-mono font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border">
        {method}
      </span>
      <span className="text-muted">{labels[method]}</span>
    </span>
  );
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { slug } = await params;
  const domain = domains.find((d) => d.slug === slug);

  if (!domain) {
    notFound();
  }

  const domainAcrs = acrs.filter((a) => a.domainId === domain.id);

  // Find adjacent domains for navigation
  const currentIndex = domains.findIndex((d) => d.id === domain.id);
  const prevDomain = currentIndex > 0 ? domains[currentIndex - 1] : null;
  const nextDomain = currentIndex < domains.length - 1 ? domains[currentIndex + 1] : null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb domainTitle={domain.shortTitle} />

      <div className="max-w-[72ch]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-sm font-semibold text-navy bg-slate-50 px-2.5 py-1 rounded border border-border">
              Domain {String(domain.id).padStart(2, '0')}
            </span>
            <span className="text-xs text-muted">
              Introduced in v{domain.versionIntroduced}
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
            {domain.title}
          </h1>
          <div className="flex items-center gap-2 mb-6">
            <LevelBadge level="L1" active={domain.applicability.L1} />
            <LevelBadge level="L2" active={domain.applicability.L2} />
            <LevelBadge level="L3" active={domain.applicability.L3} />
            <span className="text-xs text-muted ml-2">
              {domain.acrCount} ACRs ({domainAcrs.length} defined in current release)
            </span>
          </div>
        </div>

        {/* Summary */}
        <SectionAnchor id="summary">Summary</SectionAnchor>
        <p className="text-steel leading-relaxed mb-6">
          {domain.summary}
        </p>

        {/* Applicability */}
        <SectionAnchor id="applicability">Applicability</SectionAnchor>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">
                  Certification Level
                </th>
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">
                  Status
                </th>
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-b border-border">
                  <LevelBadge level="L1" active={domain.applicability.L1} />
                  <span className="ml-2 text-muted">Supervised Operational Reliability</span>
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {domain.applicability.L1 ? 'Required' : 'Not applicable'}
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {domain.applicability.L1
                    ? 'Applicable ACRs must be satisfied for L1 certification.'
                    : 'This domain is not evaluated at the L1 certification level.'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border">
                  <LevelBadge level="L2" active={domain.applicability.L2} />
                  <span className="ml-2 text-muted">Bounded Autonomous Deployment</span>
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {domain.applicability.L2 ? 'Required' : 'Not applicable'}
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {domain.applicability.L2
                    ? 'Full domain scope is evaluated for L2 certification.'
                    : 'This domain is not evaluated at the L2 certification level.'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <LevelBadge level="L3" active={domain.applicability.L3} />
                  <span className="ml-2 text-muted">High-Stakes Autonomous Certification</span>
                </td>
                <td className="px-4 py-3 text-muted">
                  {domain.applicability.L3 ? 'Required' : 'Not applicable'}
                </td>
                <td className="px-4 py-3 text-muted">
                  {domain.applicability.L3
                    ? 'Maximum rigor evaluation at L3 level with extended evidence requirements.'
                    : 'This domain is not evaluated at the L3 certification level.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Risk Rationale */}
        <SectionAnchor id="risk-rationale">Risk Rationale</SectionAnchor>
        <div className="bg-slate-50 border border-border rounded-lg p-5 mb-6">
          <p className="text-sm text-steel leading-relaxed">
            {domain.riskRationale}
          </p>
        </div>

        {/* Linked ACR Controls */}
        <SectionAnchor id="acr-controls">Linked ACR Controls</SectionAnchor>
        <p className="text-sm text-muted mb-4">
          The following Autonomous Compliance Requirements are assigned to this domain.
          Each ACR defines a specific, testable control with its own evaluation method,
          classification, and evidence requirements.
        </p>

        {domainAcrs.length > 0 ? (
          <div className="space-y-4">
            {domainAcrs.map((acr) => (
              <Link
                key={acr.id}
                href={`/standard/v1.0/acr/${acr.id}`}
                className="group block border border-border rounded-lg p-4 hover:border-border-dark transition-colors bg-white"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="acr-id">{acr.id}</span>
                    <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors">
                      {acr.title}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ${
                      acr.classification === 'Blocking'
                        ? 'bg-charcoal text-white'
                        : 'bg-slate-100 text-steel border border-border'
                    }`}
                  >
                    {acr.classification}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">
                  {acr.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted">
                  <EvalMethodLabel method={acr.evaluationMethod} />
                  <span className="text-slate-300">|</span>
                  <span>
                    Risk weight: <span className="font-mono font-semibold text-charcoal">{acr.riskWeight}</span>/10
                  </span>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1">
                    <LevelBadge level="L1" active={acr.levelApplicability.L1} />
                    <LevelBadge level="L2" active={acr.levelApplicability.L2} />
                    <LevelBadge level="L3" active={acr.levelApplicability.L3} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-border rounded-lg p-6 bg-slate-50 text-center">
            <p className="text-sm text-muted">
              No ACRs are currently defined for this domain in the public release.
              The full specification includes {domain.acrCount} controls.
            </p>
          </div>
        )}

        {/* Navigation between domains */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          {prevDomain ? (
            <Link
              href={`/standard/v1.0/domains/${prevDomain.slug}`}
              className="group text-sm text-muted hover:text-charcoal transition-colors"
            >
              <span className="text-xs text-slate-400 block mb-0.5">&larr; Previous</span>
              <span className="font-medium">
                Domain {String(prevDomain.id).padStart(2, '0')}: {prevDomain.shortTitle}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextDomain ? (
            <Link
              href={`/standard/v1.0/domains/${nextDomain.slug}`}
              className="group text-sm text-muted hover:text-charcoal transition-colors text-right"
            >
              <span className="text-xs text-slate-400 block mb-0.5">Next &rarr;</span>
              <span className="font-medium">
                Domain {String(nextDomain.id).padStart(2, '0')}: {nextDomain.shortTitle}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
