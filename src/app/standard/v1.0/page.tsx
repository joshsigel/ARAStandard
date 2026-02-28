import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ARA Standard v1.0',
  description:
    'Version 1.0 of the ARA Standard — Public Review Draft. 13 domains, 52 ACRs, 3 certification levels.',
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
          <span className="text-charcoal font-medium">v1.0</span>
        </li>
      </ol>
    </nav>
  );
}

const sections = [
  {
    title: 'Domains',
    href: '/standard/v1.0/domains',
    description:
      '13 reliability domains covering the full range of operational concerns for autonomous systems, from autonomy scope definition through physical actuation integrity.',
    stat: '13 domains',
  },
  {
    title: 'ACR Library',
    href: '/standard/v1.0/acr',
    description:
      'The complete library of Autonomous Compliance Requirements. Each ACR is a discrete, testable control with defined evaluation methods, evidence requirements, and risk weighting.',
    stat: '52 ACRs',
  },
  {
    title: 'Certification Levels',
    href: '/certification',
    description:
      'Three certification tiers that define the scope, rigor, and ongoing monitoring requirements based on a system\'s autonomy model and operational risk profile.',
    stat: '3 levels',
  },
  {
    title: 'Certification Lifecycle',
    href: '/standard/v1.0/lifecycle',
    description:
      'The 10-phase evaluation process from initial intake through ongoing monitoring. Defines the end-to-end pathway for achieving and maintaining ARA certification.',
    stat: '10 phases',
  },
  {
    title: 'Changelog',
    href: '/standard/v1.0/changelog',
    description:
      'Version history and detailed change records for the ARA Standard. Tracks all additions, modifications, and removals across standard revisions.',
    stat: 'v1.0',
  },
  {
    title: 'Public Comment',
    href: '/standard/v1.0/public-comment',
    description:
      'Submit feedback on the current Public Review Draft. All public comments are reviewed by the Technical Steering Committee and inform subsequent revisions.',
    stat: 'Open',
  },
];

export default function VersionPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb />

      <div className="max-w-[72ch] mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-semibold text-charcoal tracking-tight">
            ARA Standard v1.0
          </h1>
          <span className="version-badge text-xs whitespace-nowrap">
            Public Review Draft
          </span>
        </div>

        <p className="text-steel leading-relaxed mb-4">
          Version 1.0 is the initial release of the Autonomous Reliability Assurance Standard.
          It establishes the foundational framework for evaluating the operational reliability
          of autonomous systems across 13 reliability domains using 52 Autonomous Compliance
          Requirements (ACRs) evaluated at three certification levels.
        </p>
        <p className="text-steel leading-relaxed mb-4">
          This version is designated as a Public Review Draft. It is open for public comment
          and subject to revision based on feedback from the technical community, industry
          stakeholders, and regulatory bodies. The normative content is considered stable for
          pilot certification evaluations conducted by Authorized Verification Bodies.
        </p>
        <p className="text-steel leading-relaxed">
          The standard applies to all categories of autonomous systems including single-agent
          systems, multi-agent orchestrations, hybrid systems with both digital and physical
          components, and purely physical autonomous systems operating in shared human
          environments.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group block border border-border rounded-lg p-6 hover:border-border-dark transition-colors bg-white"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-base font-semibold text-charcoal group-hover:text-navy transition-colors">
                {section.title}
              </h2>
              <span className="font-mono text-xs text-muted bg-slate-50 px-2 py-0.5 rounded border border-border">
                {section.stat}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {section.description}
            </p>
            <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-navy opacity-0 group-hover:opacity-100 transition-opacity">
              View section
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>

      {/* Quick reference */}
      <div className="mt-16 border-t border-border pt-12 max-w-[72ch]">
        <h2 className="text-lg font-semibold text-charcoal mb-6">Quick Reference</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-2">Evaluation Methods</h3>
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">AT</dt>
                <dd className="text-muted">Automated Testing</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">HS</dt>
                <dd className="text-muted">Human Simulation</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">EI</dt>
                <dd className="text-muted">Evidence Inspection</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">CM</dt>
                <dd className="text-muted">Continuous Monitoring</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-2">Certification Levels</h3>
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-start gap-2">
                <dt className="level-badge level-badge-l1 shrink-0">L1</dt>
                <dd className="text-muted">Supervised Operational Reliability</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="level-badge level-badge-l2 shrink-0">L2</dt>
                <dd className="text-muted">Bounded Autonomous Deployment</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="level-badge level-badge-l3 shrink-0">L3</dt>
                <dd className="text-muted">High-Stakes Autonomous Certification</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
