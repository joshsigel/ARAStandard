import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CertificationBadge } from '@/components/badges/CertificationBadge';
import { TwoAxisMatrix } from '@/components/visualizations/TwoAxisMatrix';
import { SystemProfileChart } from '@/components/visualizations/SystemProfileChart';
import { CertificationLifecycle } from '@/components/visualizations/CertificationLifecycle';
import { EcosystemArchitecture } from '@/components/visualizations/EcosystemArchitecture';

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 grid-motif-animated" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50 mb-5">
              Autonomous Reliability Assurance Foundation
            </p>
            <h1 className="text-[clamp(2rem,1.25rem+2vw,3.25rem)] font-semibold tracking-tight text-white leading-[1.1] mb-6">
              The Reliability Standard for Autonomous Systems
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
              ARA is the first comprehensive, testable framework for certifying
              that autonomous systems meet operational reliability requirements.
              Four integrated systems: standard, certification, monitoring, and ecosystem.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-start gap-6 sm:gap-8 md:gap-12 mb-10">
              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                  <AnimatedCounter end={410} duration={1800} />
                </span>
                <div className="section-divider mt-2 mb-1.5 opacity-50" />
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  Control Requirements
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                  <AnimatedCounter end={15} duration={1200} />
                </span>
                <div className="section-divider mt-2 mb-1.5 opacity-50" />
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  Reliability Domains
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                  3<span className="text-white/40 mx-1">&times;</span>3
                </span>
                <div className="section-divider mt-2 mb-1.5 opacity-50" />
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  Level &times; Class Model
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
                  <AnimatedCounter end={4} duration={800} />
                </span>
                <div className="section-divider mt-2 mb-1.5 opacity-50" />
                <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                  System Profiles
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/standard/v1.1"
                className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-charcoal text-sm font-semibold rounded-md hover:bg-slate-100 transition-colors"
              >
                Read the Standard
                <span className="font-mono text-[10px] font-medium text-muted bg-slate-100 px-1.5 py-0.5 rounded">
                  v1.1
                </span>
              </Link>
              <Link
                href="/registry"
                className="inline-flex items-center px-4 py-2.5 sm:px-6 sm:py-3 border border-white/20 text-sm font-medium text-white rounded-md hover:bg-white/10 transition-colors"
              >
                Verify a Certification
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Role-Based Entry Paths ───────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <ScrollReveal>
            <div className="section-divider mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-2">
              What brings you here?
            </h2>
            <p className="text-sm text-muted mb-8 max-w-xl">
              Whether you build, evaluate, monitor, insure, or explore autonomous systems — ARA has a path for you.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                title: 'Build Systems',
                desc: 'Integrate ARA compliance into your development lifecycle with SDKs, telemetry schemas, and evaluation guides.',
                href: '/developers',
                icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
              },
              {
                title: 'Certify a System',
                desc: 'Understand the two-axis model, choose your evaluation level and assurance class, prepare evidence.',
                href: '/certification',
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              },
              {
                title: 'Monitor Systems',
                desc: 'Explore CAPO architecture, class-differentiated SLAs, and continuous assurance telemetry pipelines.',
                href: '/monitoring',
                icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
              },
              {
                title: 'Insure Systems',
                desc: 'Access risk classification data, certification records, and assurance class designations for underwriting.',
                href: '/ecosystem/insurers',
                icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
              },
              {
                title: 'Explore Ecosystem',
                desc: 'Browse the registry, AVB and CAPO directories, certified platforms, and consortium membership.',
                href: '/ecosystem',
                icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
              },
            ].map((path, i) => (
              <ScrollReveal key={path.title} delay={i * 80}>
                <Link
                  href={path.href}
                  className="group block p-5 border border-border rounded-lg hover:border-border-dark card-hover gradient-border h-full"
                >
                  <svg
                    className="w-6 h-6 text-navy mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={path.icon} />
                  </svg>
                  <h3 className="text-sm font-semibold text-charcoal mb-1.5 group-hover:text-navy transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {path.desc}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Two-Axis Certification Model ─────────────────────────────── */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <ScrollReveal>
              <div className="section-divider mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">
                Two-Axis Certification Model
              </h2>
              <p className="text-sm text-steel leading-relaxed mb-4">
                ARA v1.1 introduces a two-axis framework: <strong>Evaluation Level</strong> (L1
                Foundation, L2 Operational, L3 Comprehensive) determines evaluation rigor,
                while <strong>Assurance Class</strong> (A Periodic, B Monitored, C Continuous)
                determines ongoing monitoring intensity.
              </p>
              <p className="text-sm text-steel leading-relaxed mb-6">
                The combination — e.g., L2-B — creates nine distinct certification designations.
                A mandatory 7-factor risk classification determines your Assurance Class,
                conducted by the assigned AVB.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/certification"
                  className="inline-flex items-center px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-navy transition-colors"
                >
                  Explore the model
                </Link>
                <Link
                  href="/certification/risk-classification"
                  className="inline-flex items-center px-4 py-2 border border-border text-sm font-medium text-charcoal rounded-md hover:bg-white transition-colors"
                >
                  Risk classification
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <TwoAxisMatrix className="max-w-md mx-auto lg:mx-0" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── System Profiles ──────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <ScrollReveal delay={100} className="order-2 lg:order-1">
              <SystemProfileChart className="max-w-lg mx-auto lg:mx-0" />
            </ScrollReveal>

            <ScrollReveal className="order-1 lg:order-2">
              <div className="section-divider mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">
                Four System Profiles
              </h2>
              <p className="text-sm text-steel leading-relaxed mb-4">
                Not every system needs all 410 ACRs. ARA v1.1 defines four nested profiles
                that scope evaluation to your system&apos;s complexity and risk:
              </p>
              <ul className="space-y-2 text-sm text-steel mb-6">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded mt-0.5">F</span>
                  <span><strong>Foundational</strong> — 97 ACRs for single-purpose, limited-scope agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded mt-0.5">S</span>
                  <span><strong>Standard</strong> — 215 ACRs for general-purpose, customer-facing systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-charcoal px-1.5 py-0.5 rounded mt-0.5">A</span>
                  <span><strong>Advanced</strong> — 368 ACRs for multi-agent, high-autonomy deployments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-navy px-1.5 py-0.5 rounded mt-0.5">C</span>
                  <span><strong>Comprehensive</strong> — All 410 ACRs for safety-critical, cross-domain systems</span>
                </li>
              </ul>
              <Link
                href="/standard/v1.1"
                className="text-sm text-navy font-medium hover:underline"
              >
                View full standard details
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Certification Lifecycle ──────────────────────────────────── */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <ScrollReveal>
            <div className="section-divider mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-2">
              10-Phase Certification Lifecycle
            </h2>
            <p className="text-sm text-muted mb-8 max-w-2xl">
              From intake and risk classification through evaluation, issuance, continuous
              monitoring, and renewal — a complete lifecycle managed by AVBs and CAPOs.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <CertificationLifecycle className="max-w-3xl" />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-6">
              <Link
                href="/evaluation"
                className="text-sm text-navy font-medium hover:underline"
              >
                View full evaluation methodology
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Ecosystem Architecture ───────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <ScrollReveal>
              <div className="section-divider mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">
                The ARA Ecosystem
              </h2>
              <p className="text-sm text-steel leading-relaxed mb-4">
                ARA is more than a standard — it&apos;s a complete reliability ecosystem.
                Six participant categories work together to ensure autonomous systems
                meet and maintain operational reliability requirements.
              </p>
              <ul className="space-y-2 text-sm text-steel mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span><strong>ARAF &amp; TSB</strong> — Standard governance and oversight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span><strong>AVBs</strong> — Evaluation, risk classification, and certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span><strong>CAPOs</strong> — Continuous monitoring for Class B and C</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span><strong>Insurance Partners</strong> — Coverage informed by ARA data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span><strong>Platform Vendors</strong> — Certified platforms enabling ACR inheritance</span>
                </li>
              </ul>
              <Link
                href="/ecosystem"
                className="inline-flex items-center px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-navy transition-colors"
              >
                Explore the ecosystem
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <EcosystemArchitecture className="max-w-lg mx-auto lg:mx-0" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Featured Certification ───────────────────────────────────── */}
      <section className="border-b border-border bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 grid-motif-animated" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 md:gap-16">
              <div className="shrink-0 badge-glow badge-state-active w-24 sm:w-28 md:w-[140px]">
                <CertificationBadge
                  level={2}
                  certificationId="ARA-2026-00187"
                  size={140}
                  variant="light-on-dark"
                  className="!w-full !h-auto"
                />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">
                  Living Certification Badge
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  Real-time operational state
                </h2>
                <p className="text-sm text-white/60 mb-4 max-w-lg">
                  Every ARA certification carries a living badge — a dynamic credential
                  that reflects the system&apos;s current operational state. Active monitoring,
                  assurance class, and certification status are embedded in real-time.
                </p>
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="level-badge level-badge-l2">L2</span>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold rounded bg-charcoal text-white border border-white/20">
                    Class B
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded status-active">
                    Active
                  </span>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/badge-generator"
                    className="inline-flex items-center px-5 py-2.5 bg-white text-charcoal text-sm font-medium rounded-md hover:bg-slate-100 transition-colors"
                  >
                    Badge Generator
                  </Link>
                  <Link
                    href="/registry"
                    className="inline-flex items-center px-5 py-2.5 border border-white/20 text-sm font-medium text-white rounded-md hover:bg-white/10 transition-colors"
                  >
                    View Registry
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── AI Standards Landscape Teaser ─────────────────────────────── */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="section-divider mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-3">
                Where ARA Fits in the AI Standards Landscape
              </h2>
              <p className="text-sm text-steel leading-relaxed mb-4">
                14 regulatory frameworks mapped across four layers — from regulation and
                governance to the agent ecosystem and operational reliability. ARA sits
                at the operational reliability layer, providing the granular, testable
                requirements that high-level frameworks lack.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['EU AI Act', 'NIST AI RMF', 'ISO 42001', 'SOC 2', 'GDPR', 'OECD AI', 'Google SAIF'].map((fw) => (
                  <span key={fw} className="text-xs px-2.5 py-1 bg-white border border-border rounded text-slate-600">
                    {fw}
                  </span>
                ))}
                <span className="text-xs px-2.5 py-1 bg-navy text-white rounded font-semibold">
                  ARA v1.1
                </span>
              </div>
              <Link
                href="/ai-landscape"
                className="inline-flex items-center px-4 py-2 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-navy transition-colors"
              >
                Explore the landscape
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Registry CTA + Governance ────────────────────────────────── */}
      <section>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-4">
                Public Certification Registry
              </h2>
              <div className="border border-border rounded-lg p-6 card-hover">
                <p className="text-sm text-steel mb-4">
                  Verify the certification status of any ARA-certified autonomous system.
                  Search by Certification ID, organization, or filter by level, assurance
                  class, and certification type.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/registry"
                    className="inline-flex items-center px-5 py-2.5 bg-charcoal text-white text-sm font-medium rounded-md hover:bg-navy transition-colors"
                  >
                    Search Registry
                  </Link>
                  <Link
                    href="/ecosystem/platforms"
                    className="inline-flex items-center px-5 py-2.5 border border-border text-sm font-medium text-charcoal rounded-md hover:bg-slate-50 transition-colors"
                  >
                    Certified Platforms
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-4">
                Current Standard &amp; Governance
              </h2>
              <div className="border border-border rounded-lg p-6 card-hover">
                <div className="flex items-center gap-3 mb-3">
                  <span className="version-badge">v1.1</span>
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">
                    Public Review Draft
                  </span>
                </div>
                <p className="text-sm text-steel mb-4">
                  Document ID: ARAF-ARA-STD-2026-002. Governed by the Technical Standards
                  Board (TSB) with advisory bodies including the Data Privacy &amp; Societal
                  Impact Committee (DPSIC).
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/standard/v1.1"
                    className="text-sm text-navy font-medium hover:underline"
                  >
                    Read v1.1
                  </Link>
                  <Link
                    href="/governance"
                    className="text-sm text-navy font-medium hover:underline"
                  >
                    Governance
                  </Link>
                  <Link
                    href="/standard/v1.1/public-comment"
                    className="text-sm text-navy font-medium hover:underline"
                  >
                    Submit Comment
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
