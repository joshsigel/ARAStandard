import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'ARA Standard v1.1',
  description:
    'ARA Standard v1.1 — Ratified. 410 ACRs across 15 reliability domains, two-axis certification (Level x Class), 4 system profiles.',
};

const quickStats = [
  { value: '410', label: 'ACRs' },
  { value: '15', label: 'Domains' },
  { value: '9', label: 'Designations (3x3)' },
  { value: '4', label: 'System Profiles' },
  { value: '14', label: 'Framework Mappings' },
  { value: '7', label: 'Risk Factors' },
];

const sections = [
  {
    title: 'Domains',
    href: '/standard/v1.1/domains',
    description:
      '15 reliability domains covering operational boundary enforcement through physical actuation integrity, including two new domains for data privacy and societal impact.',
    stat: '15 domains',
  },
  {
    title: 'ACR Library',
    href: '/standard/v1.1/acr',
    description:
      'The complete library of 410 Autonomous Compliance Requirements. Each ACR is a discrete, testable control with defined evaluation methods, risk weighting, and profile applicability.',
    stat: '410 ACRs',
  },
  {
    title: 'Glossary',
    href: '/standard/v1.1/glossary',
    description:
      'Definitions for all terms used throughout the ARA Standard, including new v1.1 terminology for assurance classes, system profiles, platform certification, and CAPO roles.',
    stat: '20 terms',
  },
  {
    title: 'Certification Lifecycle',
    href: '/standard/v1.1/lifecycle',
    description:
      'The updated 10-phase certification process from intake and risk classification through continuous monitoring and ecosystem participation.',
    stat: '10 phases',
  },
  {
    title: 'Changelog',
    href: '/standard/v1.1/changelog',
    description:
      'Detailed record of all additions and changes from v1.0 to v1.1, including the two-axis certification model, system profiles, and expanded governance structure.',
    stat: 'v1.0 → v1.1',
  },
  {
    title: 'Public Comment',
    href: '/standard/v1.1/public-comment',
    description:
      'Information about the public comment process for the ARA Standard. The v1.1 comment period is now closed following ratification.',
    stat: 'Closed',
  },
];

export default function V11LandingPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1' },
        ]}
        className="mb-8"
      />

      <div className="max-w-[72ch] mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-semibold text-charcoal tracking-tight">
            ARA Standard v1.1
          </h1>
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
            Ratified
          </span>
        </div>

        <p className="text-sm text-muted mb-6">Effective March 2026</p>

        <p className="text-steel leading-relaxed mb-4">
          Version 1.1 is a major expansion of the ARA Standard, introducing a two-axis
          certification model that combines Certification Levels (L1 Foundation, L2 Operational,
          L3 Comprehensive) with Assurance Classes (A Periodic, B Monitored, C Continuous) to
          create nine distinct certification designations. The standard now covers 410 Autonomous
          Compliance Requirements across 15 reliability domains.
        </p>
        <p className="text-steel leading-relaxed mb-4">
          New in v1.1: four system profiles (Foundational, Standard, Advanced, Comprehensive)
          determine which ACRs apply to a given system, enabling right-sized certification.
          Platform Certification allows reusable infrastructure to carry forward ACR compliance
          to deployment-level evaluations. A mandatory 7-factor risk classification conducted by
          AVBs determines the appropriate Assurance Class.
        </p>
        <p className="text-steel leading-relaxed">
          Two new domains address Data Privacy and Consent Management (Domain 5) and Societal
          Impact Assessment (Domain 13), reflecting the growing importance of these concerns in
          autonomous system deployments. The ecosystem now includes Certified Assurance Platform
          Operators (CAPOs) and Recognized Insurer Partners (RIPs).
        </p>
      </div>

      {/* Quick stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border rounded-lg p-4 bg-white text-center"
          >
            <p className="text-2xl font-semibold text-charcoal">{stat.value}</p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Navigation cards */}
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
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">TP</dt>
                <dd className="text-muted">Third-Party Attestation</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">OP</dt>
                <dd className="text-muted">Operational Proof</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-charcoal mb-2">Certification Levels</h3>
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-start gap-2">
                <dt className="level-badge level-badge-l1 shrink-0">L1</dt>
                <dd className="text-muted">Foundation</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="level-badge level-badge-l2 shrink-0">L2</dt>
                <dd className="text-muted">Operational</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="level-badge level-badge-l3 shrink-0">L3</dt>
                <dd className="text-muted">Comprehensive</dd>
              </div>
            </dl>

            <h3 className="text-sm font-semibold text-charcoal mt-4 mb-2">Assurance Classes</h3>
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">A</dt>
                <dd className="text-muted">Periodic</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">B</dt>
                <dd className="text-muted">Monitored</dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border w-8 text-center shrink-0">C</dt>
                <dd className="text-muted">Continuous</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
