import Link from 'next/link';
import { domains } from '@/data/domains';
import { certificationLevels } from '@/data/certification-levels';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mb-5">
              Autonomous Reliability Assurance Foundation
            </p>
            <h1 className="text-4xl md:text-[3.25rem] font-semibold tracking-tight text-white leading-[1.1] mb-6">
              Autonomous systems should prove they work before they&apos;re deployed.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-4">
              The ARA Standard is the first comprehensive, testable framework
              for certifying that autonomous systems meet minimum operational
              reliability requirements — before they operate in environments
              where failures have real consequences.
            </p>
            <p className="text-base text-white/50 leading-relaxed max-w-2xl mb-10">
              352 control requirements. 13 evaluation domains. Three certification
              levels. One global standard.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/standard/v1.0"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-charcoal text-sm font-semibold rounded-md hover:bg-slate-100 transition-colors"
              >
                Read the Standard
                <span className="font-mono text-[10px] font-medium text-muted bg-slate-100 px-1.5 py-0.5 rounded">
                  v1.0
                </span>
              </Link>
              <Link
                href="/registry"
                className="inline-flex items-center px-6 py-3 border border-white/20 text-sm font-medium text-white rounded-md hover:bg-white/10 transition-colors"
              >
                Verify a Certification
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-6 leading-snug">
              A reliability standard built for the age of autonomous systems
            </h2>
            <p className="text-base text-steel leading-relaxed mb-4">
              Autonomous agents are making decisions, executing transactions,
              controlling physical systems, and operating in high-stakes
              environments at an accelerating pace. The question is no longer
              whether these systems will be deployed — it&apos;s whether we have
              a rigorous, universal way to verify they&apos;re ready.
            </p>
            <p className="text-base text-steel leading-relaxed">
              The Autonomous Reliability Assurance Foundation (ARAF) exists to
              answer that question. We develop, maintain, and govern the ARA
              Standard — a technology-neutral framework that evaluates what
              autonomous systems <em>do</em>, not how they&apos;re built.
              Independent. Testable. Enforceable.
            </p>
          </div>
        </div>
      </section>

      {/* What ARA Is / Why It Matters */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
                The Problem
              </h3>
              <p className="text-sm text-steel leading-relaxed">
                Autonomous systems are being deployed in finance, healthcare,
                logistics, infrastructure, and defense with no standardized way
                to evaluate whether they&apos;ll behave reliably under real-world
                conditions. Existing AI frameworks focus on ethics or security
                management — none provide the granular, testable requirements
                needed to certify operational readiness.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
                The Standard
              </h3>
              <p className="text-sm text-steel leading-relaxed">
                ARA defines 352 Autonomous Control Requirements across 13
                domains — from decision integrity and adversarial robustness to
                escalation protocols and physical actuation safety. Every
                requirement is observable, measurable, and testable. The standard
                doesn&apos;t certify intelligence or ethics. It certifies that a
                system can operate reliably within its declared boundaries.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
                The Foundation
              </h3>
              <p className="text-sm text-steel leading-relaxed">
                ARAF is independent — not tied to any vendor, government, or
                commercial interest. The standard is developed by a Technical
                Standards Board of domain experts and maintained through a
                transparent governance process with public comment periods,
                advisory councils, and independent oversight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-charcoal mb-2">
            Certification Levels
          </h2>
          <p className="text-sm text-muted mb-8 max-w-2xl">
            Three tiers of certification corresponding to increasing levels of
            autonomous authority, operational risk, and evaluation rigor.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {certificationLevels.map((level) => (
              <div
                key={level.level}
                className="bg-white border border-border rounded-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`level-badge ${
                      level.level === 'L1'
                        ? 'level-badge-l1'
                        : level.level === 'L2'
                        ? 'level-badge-l2'
                        : 'level-badge-l3'
                    }`}
                  >
                    {level.level}
                  </span>
                  <h3 className="font-semibold text-charcoal">{level.name}</h3>
                </div>
                <p className="text-sm text-steel mb-4">{level.autonomyModel}</p>
                <ul className="text-sm text-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1 shrink-0">—</span>
                    <span>Minimum {level.minimumACRs} ACRs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1 shrink-0">—</span>
                    <span>{level.reassessment} reassessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400 mt-1 shrink-0">—</span>
                    <span>{level.humanRequirement}</span>
                  </li>
                </ul>
                <Link
                  href="/certification"
                  className="inline-block mt-4 text-sm text-navy font-medium hover:underline"
                >
                  View requirements
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Overview */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-charcoal mb-2">
            Evaluation Domains
          </h2>
          <p className="text-sm text-muted mb-8 max-w-2xl">
            The ARA Standard organizes its 352 Autonomous Control Requirements
            across 13 evaluation domains. Each domain targets a specific
            dimension of operational reliability.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((domain) => (
              <Link
                key={domain.id}
                href={`/standard/v1.0/domains/${domain.slug}`}
                className="group flex items-start gap-3 p-4 border border-border rounded-lg hover:border-border-dark hover:bg-slate-50 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded shrink-0">
                  {String(domain.id).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    {domain.acrCount} ACRs
                    {domain.id === 13 && ' · Extension Domain'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/standard/v1.0/domains"
              className="text-sm text-navy font-medium hover:underline"
            >
              View all domains with full details
            </Link>
          </div>
        </div>
      </section>

      {/* Registry Lookup CTA */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-charcoal mb-2">
              Public Certification Registry
            </h2>
            <p className="text-sm text-steel mb-6">
              Verify the certification status of any ARA-certified autonomous
              system. Search by Certification ID, organization name, or system
              name.
            </p>
            <div className="flex gap-3">
              <Link
                href="/registry"
                className="inline-flex items-center px-5 py-2.5 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-navy transition-colors"
              >
                Search Registry
              </Link>
              <Link
                href="/registry/verify/ARA-2026-00142"
                className="inline-flex items-center px-5 py-2.5 border border-border text-sm font-medium text-charcoal rounded-md hover:bg-white transition-colors"
              >
                Example Entry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Standard Version + Governance */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold text-charcoal mb-4">
                Current Standard
              </h2>
              <div className="border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="version-badge">v1.0</span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">
                    Public Review Draft
                  </span>
                </div>
                <p className="text-sm text-steel mb-4">
                  Document ID: ARAF-ARA-STD-2026-001. Effective upon
                  ratification by the ARAF Technical Standards Board. The
                  standard is open for public comment during the review period.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/standard/v1.0"
                    className="text-sm text-navy font-medium hover:underline"
                  >
                    Read v1.0
                  </Link>
                  <Link
                    href="/standard/v1.0/public-comment"
                    className="text-sm text-navy font-medium hover:underline"
                  >
                    Submit Comment
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-charcoal mb-4">
                Governance
              </h2>
              <div className="prose">
                <p>
                  ARAF is governed by an independent Technical Standards Board
                  (TSB) of 9–15 members with ultimate technical authority over
                  the standard. Advisory bodies include:
                </p>
                <ul>
                  <li>Adversarial Testing Advisory Group (ATAG)</li>
                  <li>Robotics &amp; Physical Systems Council (RPSC)</li>
                  <li>Risk &amp; Compliance Advisory Council (RCAC)</li>
                  <li>Public Interest Oversight Panel (PIOP)</li>
                </ul>
                <p>
                  ARAF is independent from any single commercial entity, vendor,
                  government, or testing organization.
                </p>
              </div>
              <Link
                href="/governance"
                className="inline-block mt-2 text-sm text-navy font-medium hover:underline"
              >
                View governance structure
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
