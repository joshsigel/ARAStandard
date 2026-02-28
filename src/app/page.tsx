import Link from 'next/link';
import { domains } from '@/data/domains';
import { certificationLevels } from '@/data/certification-levels';
import { registryEntries } from '@/data/registry';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CertificationBadge } from '@/components/badges/CertificationBadge';

export default function HomePage() {
  // Find a featured L3 certification for the showcase section
  const featuredEntry = registryEntries.find(
    (e) => e.certificationLevel === 'L3' && e.certificationStatus === 'Active'
  ) || registryEntries[0];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-charcoal relative overflow-hidden">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 grid-motif-animated" />
        <div className="relative max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mb-5">
              Autonomous Reliability Assurance Foundation
            </p>
            <h1 className="text-4xl md:text-[3.25rem] font-semibold tracking-tight text-white leading-[1.1] mb-6">
              Autonomous systems should prove they work before they&apos;re deployed.
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              The ARA Standard is the first comprehensive, testable framework
              for certifying that autonomous systems meet minimum operational
              reliability requirements — before they operate in environments
              where failures have real consequences.
            </p>

            {/* Animated stat counters */}
            <div className="flex flex-wrap items-start gap-8 md:gap-12 mb-10">
              <div className="flex flex-col items-start">
                <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                  <AnimatedCounter end={352} duration={1800} />
                </span>
                <div className="section-divider mt-2 mb-1.5 opacity-50" />
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  Control Requirements
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                  <AnimatedCounter end={13} duration={1200} />
                </span>
                <div className="section-divider mt-2 mb-1.5 opacity-50" />
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  Evaluation Domains
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                  <AnimatedCounter end={3} duration={800} />
                </span>
                <div className="section-divider mt-2 mb-1.5 opacity-50" />
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  Certification Levels
                </span>
              </div>
            </div>

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
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <div className="section-divider mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-semibold text-charcoal mb-6 leading-snug">
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
          </ScrollReveal>
        </div>
      </section>

      {/* What ARA Is / Why It Matters */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'The Problem',
                body: 'Autonomous systems are being deployed in finance, healthcare, logistics, infrastructure, and defense with no standardized way to evaluate whether they\'ll behave reliably under real-world conditions. Existing AI frameworks focus on ethics or security management — none provide the granular, testable requirements needed to certify operational readiness.',
              },
              {
                title: 'The Standard',
                body: 'ARA defines 352 Autonomous Control Requirements across 13 domains — from decision integrity and adversarial robustness to escalation protocols and physical actuation safety. Every requirement is observable, measurable, and testable. The standard doesn\'t certify intelligence or ethics. It certifies that a system can operate reliably within its declared boundaries.',
              },
              {
                title: 'The Foundation',
                body: 'ARAF is independent — not tied to any vendor, government, or commercial interest. The standard is developed by a Technical Standards Board of domain experts and maintained through a transparent governance process with public comment periods, advisory councils, and independent oversight.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="border-t-2 border-navy pt-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How Certification Works */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">
              How Certification Works
            </h2>
            <p className="text-sm text-muted mb-10 max-w-2xl">
              The ARA certification lifecycle is a structured, multi-phase evaluation
              process conducted by Authorized Validation Bodies (AVBs) under ARAF oversight.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-0 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-slate-200" />

            {[
              {
                num: 1,
                title: 'Intake & Scoping',
                desc: 'System documentation, scope definition, autonomy boundary mapping, and AVB assignment.',
              },
              {
                num: 2,
                title: 'Evaluation',
                desc: 'Domain-by-domain testing against applicable ACRs — automated testing, human simulation, evidence inspection.',
              },
              {
                num: 3,
                title: 'Certification',
                desc: 'Independent scoring review, blocking ACR validation, and formal issuance of ARA certification.',
              },
              {
                num: 4,
                title: 'Monitoring',
                desc: 'Continuous compliance monitoring, drift detection, telemetry ingestion, and scheduled reassessment.',
              },
            ].map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 120} className="relative">
                <div className="flex flex-col items-center text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-navy text-white flex items-center justify-center text-lg font-bold font-mono mb-4 relative z-10">
                    {step.num}
                  </div>
                  <h3 className="text-sm font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">
              Certification Levels
            </h2>
            <p className="text-sm text-muted mb-8 max-w-2xl">
              Three tiers of certification corresponding to increasing levels of
              autonomous authority, operational risk, and evaluation rigor.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {certificationLevels.map((level, i) => (
              <ScrollReveal key={level.level} delay={i * 100}>
                <div className="bg-white border border-border rounded-lg p-6 card-hover gradient-border h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 badge-glow">
                      <CertificationBadge
                        level={Number(level.level.replace('L', '')) as 1 | 2 | 3}
                        size={56}
                        variant="dark-on-light"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
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
                        <h3 className="font-semibold text-charcoal text-sm">
                          {level.name}
                        </h3>
                      </div>
                      <p className="text-xs text-steel leading-relaxed">
                        {level.autonomyModel}
                      </p>
                    </div>
                  </div>
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Domains Overview */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <ScrollReveal>
            <h2 className="text-2xl font-semibold text-charcoal mb-2">
              Evaluation Domains
            </h2>
            <p className="text-sm text-muted mb-8 max-w-2xl">
              The ARA Standard organizes its 352 Autonomous Control Requirements
              across 13 evaluation domains. Each domain targets a specific
              dimension of operational reliability.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((domain, i) => (
              <ScrollReveal key={domain.id} delay={i * 60}>
                <Link
                  href={`/standard/v1.0/domains/${domain.slug}`}
                  className="group flex items-start gap-3 p-4 border border-border rounded-lg hover:border-border-dark hover:bg-slate-50 transition-colors card-hover"
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
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={200}>
            <div className="mt-6">
              <Link
                href="/standard/v1.0/domains"
                className="text-sm text-navy font-medium hover:underline"
              >
                View all domains with full details
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Certification */}
      <section className="border-b border-border bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 grid-motif-animated" />
        <div className="relative max-w-[1400px] mx-auto px-6 py-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="shrink-0 badge-glow">
                <CertificationBadge
                  level={Number(featuredEntry.certificationLevel.replace('L', '')) as 1 | 2 | 3}
                  certificationId={featuredEntry.certificationId}
                  size={140}
                  variant="light-on-dark"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">
                  Certification in Practice
                </p>
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {featuredEntry.systemName}
                </h2>
                <p className="text-sm text-white/60 mb-1">
                  {featuredEntry.organization} · {featuredEntry.industry}
                </p>
                <p className="text-xs font-mono text-white/40 mb-4">
                  {featuredEntry.certificationId}
                </p>
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`level-badge ${
                      featuredEntry.certificationLevel === 'L1'
                        ? 'level-badge-l1'
                        : featuredEntry.certificationLevel === 'L2'
                        ? 'level-badge-l2'
                        : 'level-badge-l3'
                    }`}
                  >
                    {featuredEntry.certificationLevel}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded status-active">
                    {featuredEntry.certificationStatus}
                  </span>
                </div>
                <Link
                  href={`/registry/verify/${featuredEntry.certificationId}`}
                  className="inline-flex items-center px-5 py-2.5 border border-white/20 text-sm font-medium text-white rounded-md hover:bg-white/10 transition-colors"
                >
                  View certification record
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Registry Lookup CTA */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <ScrollReveal>
            <div className="max-w-xl">
              <div className="border-l-2 border-navy pl-6">
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
          </ScrollReveal>
        </div>
      </section>

      {/* Standard Version + Governance */}
      <section>
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <h2 className="text-2xl font-semibold text-charcoal mb-4">
                Current Standard
              </h2>
              <div className="border border-border rounded-lg p-6 card-hover">
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
            </ScrollReveal>
            <ScrollReveal delay={100}>
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
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
