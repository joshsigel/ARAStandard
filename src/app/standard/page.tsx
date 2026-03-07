import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SectionNav } from '@/components/ui/SectionNav';

const sectionNavItems = [
  { id: 'scope', label: 'Scope' },
  { id: 'certifies', label: 'What ARA Certifies' },
  { id: 'exclusions', label: 'Exclusions' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'current-version', label: 'Current Version' },
  { id: 'references', label: 'References' },
  { id: 'version-history', label: 'Version History' },
];

export const metadata: Metadata = {
  title: 'The ARA Standard',
  description:
    'The Autonomous Reliability Assurance Standard defines the minimum operational reliability requirements for autonomous systems deployed in real-world environments.',
};

const quickLinks = [
  {
    title: 'Explore Domains',
    description: '15 reliability domains covering the full operational lifecycle',
    href: '/standard/v1.1/domains',
    stat: '15',
    statLabel: 'domains',
    icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
  },
  {
    title: 'ACR Library',
    description: 'Browse all Autonomous Compliance Requirements',
    href: '/standard/v1.1/acr',
    stat: '410',
    statLabel: 'ACRs',
    icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
  },
  {
    title: 'Certification',
    description: 'Three levels with distinct rigor and monitoring requirements',
    href: '/certification',
    stat: '3',
    statLabel: 'levels',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
  {
    title: 'AI Landscape',
    description: 'Where ARA fits among 14 major regulatory frameworks',
    href: '/ai-landscape',
    stat: '14',
    statLabel: 'frameworks',
    icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
  },
];

const certificationItems = [
  { label: 'Operational boundary enforcement', desc: 'The system operates within declared limits and cannot exceed its authorized scope.' },
  { label: 'Decision integrity', desc: 'Decisions are traceable, free from fabrication, and consistent under evaluation.' },
  { label: 'Tool and API governance', desc: 'External integrations are authorized, validated, and least-privilege constrained.' },
  { label: 'Identity & permission containment', desc: 'Agent identities are isolated and privilege escalation is prevented.' },
  { label: 'Data privacy & consent', desc: 'Data minimization, purpose limitation, and consent protocols are enforced.' },
  { label: 'Failure mode containment', desc: 'The system degrades gracefully and recovers to verified safe states.' },
  { label: 'Behavioral reliability', desc: 'Consistent behavior under load, adversarial inputs, and concurrent faults.' },
  { label: 'Adversarial robustness', desc: 'Resistance to prompt injection, data poisoning, and supply chain attacks.' },
  { label: 'Drift detection & stability', desc: 'Behavioral drift from the certified baseline is detected and addressed.' },
  { label: 'Monitoring & telemetry', desc: 'Comprehensive observability supporting oversight and post-incident analysis.' },
  { label: 'Escalation & human override', desc: 'Reliable human intervention mechanisms available at all times.' },
  { label: 'Auditability & transparency', desc: 'Complete audit trails and explainability interfaces support review.' },
  { label: 'Societal impact assessment', desc: 'Evaluated for equity, accessibility, environmental, and community effects.' },
  { label: 'Operational governance', desc: 'Change management, incident response, and risk management are documented.' },
  { label: 'Physical actuation integrity', desc: 'Sensor-actuator feedback, command validation, and emergency stops verified.' },
];

const exclusions = [
  { label: 'Model accuracy or task performance', desc: 'ARA does not evaluate whether a system produces correct answers or optimal outputs. It evaluates whether the system operates reliably within its declared boundaries.' },
  { label: 'Ethical alignment or bias mitigation', desc: 'ARA does not assess ethical implications or demographic performance. These require domain-specific frameworks outside operational reliability scope.' },
  { label: 'Regulatory compliance', desc: 'ARA certification does not satisfy specific regulatory requirements (EU AI Act, FDA, SEC). Organizations must independently verify compliance.' },
  { label: 'Business suitability', desc: 'ARA does not evaluate whether a system is appropriate for a particular use case, cost-benefit profile, or contractual SLAs.' },
];

const definitions = [
  { term: 'Autonomous System', def: 'A software-driven system that takes actions, makes decisions, or controls resources with limited or no real-time human oversight.' },
  { term: 'Agent', def: 'A software component that perceives its environment, reasons about observations, and takes actions to achieve objectives.' },
  { term: 'ACR', def: 'Autonomous Compliance Requirement. A discrete, testable control that addresses a specific aspect of operational reliability.' },
  { term: 'Domain', def: 'A thematic grouping of related ACRs addressing a major reliability concern area.' },
  { term: 'Certification Level', def: 'One of three tiers (L1, L2, L3) defining rigor, scope, and monitoring requirements.' },
  { term: 'Assurance Class', def: 'One of three classes (A, B, C) determining ongoing monitoring and reassessment intensity.' },
  { term: 'System Profile', def: 'One of four profiles (Foundational, Standard, Advanced, Comprehensive) determining applicable ACRs.' },
  { term: 'Risk Classification', def: 'A mandatory 7-factor assessment determining the appropriate Assurance Class.' },
  { term: 'Evaluation Method', def: 'The prescribed technique for assessing ACR compliance: AT, HS, EI, CM, TP, or OP.' },
  { term: 'AVB', def: 'Authorized Verification Body. An organization accredited by ARAF to conduct evaluations and issue certification decisions.' },
  { term: 'CAPO', def: 'Certified Assurance Platform Operator. Provides continuous monitoring and ongoing assurance services.' },
  { term: 'Platform Certification', def: 'Certification of a reusable platform, enabling downstream deployments to inherit certified controls.' },
  { term: 'Deployment Certification', def: 'Certification of a specific system deployment, evaluating the complete stack.' },
  { term: 'Blocking', def: 'ACR classification where non-compliance results in automatic certification denial.' },
  { term: 'Conditional', def: 'ACR classification where non-compliance can result in conditional certification with mandated remediation.' },
];

const normativeReferences = [
  { id: 'ISO/IEC 42001:2023', title: 'AI Management System', desc: 'Context for organizational governance of AI systems.' },
  { id: 'NIST AI RMF 1.0', title: 'AI Risk Management Framework', desc: 'Informs the risk-based approach to domain structuring.' },
  { id: 'ISO 22989:2022', title: 'AI Concepts & Terminology', desc: 'Referenced for baseline terminology alignment.' },
  { id: 'IEC 61508', title: 'Functional Safety', desc: 'Referenced for Domain 15 physical actuation integrity requirements.' },
  { id: 'OWASP LLM Top 10', title: 'LLM Security Risks', desc: 'Informs adversarial robustness, prompt injection, and data poisoning controls.' },
];

export default function StandardPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Standard' }]} className="mb-8" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-3">
            Autonomous Reliability Assurance Standard
          </p>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-semibold text-charcoal tracking-tight">
              The ARA Standard
            </h1>
            <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-charcoal text-white">
              v1.1 Ratified
            </span>
          </div>
          <p className="text-base text-steel leading-relaxed max-w-[72ch]">
            The Autonomous Reliability Assurance Standard establishes a structured framework for
            evaluating and certifying the operational reliability of autonomous systems.
          </p>
        </div>
      </section>

      {/* ─── Quick Links ──────────────────────────────────────────────── */}
      <section className="border-b border-border bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col p-5 border border-border rounded-lg hover:border-border-dark card-hover gradient-border bg-white"
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-5 h-5 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-charcoal tabular-nums">{item.stat}</span>
                    <span className="text-xs text-muted">{item.statLabel}</span>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed flex-1">
                  {item.description}
                </p>
                <span className="text-xs text-navy font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section Nav ──────────────────────────────────────────────── */}
      <SectionNav items={sectionNavItems} />

      {/* ─── Scope ────────────────────────────────────────────────────── */}
      <section id="scope" className="border-b border-border scroll-mt-[140px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="section-divider mb-6" />
          <h2 className="text-xl font-semibold text-charcoal mb-3">Scope</h2>
          <div className="max-w-[72ch] space-y-4">
            <p className="text-sm text-steel leading-relaxed">
              The ARA Standard applies to any software-driven system that takes actions, makes
              decisions, or controls resources with limited or no real-time human oversight. It is
              domain-agnostic — addressing reliability characteristics common to all autonomous
              systems regardless of industry, input modality, or output type.
            </p>
            <p className="text-sm text-steel leading-relaxed">
              Industry-specific regulatory requirements remain the responsibility of the deploying
              organization; ARA certification complements but does not replace sector-level
              compliance obligations.
            </p>
            <p className="text-sm text-steel leading-relaxed">
              The standard is maintained by the Autonomous Reliability Assurance Foundation (ARAF)
              through an open governance process with public comment periods preceding each ratified
              revision.
            </p>
          </div>
        </div>
      </section>

      {/* ─── What ARA Certifies ───────────────────────────────────────── */}
      <section id="certifies" className="border-b border-border bg-slate-50 scroll-mt-[140px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="section-divider mb-6" />
          <h2 className="text-xl font-semibold text-charcoal mb-3">What ARA Certifies</h2>
          <p className="text-sm text-steel leading-relaxed mb-8 max-w-[72ch]">
            ARA certification attests that an autonomous system has been evaluated against a
            comprehensive set of reliability controls and has demonstrated compliance at a specified
            certification level. The 15 domains cover:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certificationItems.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg bg-white border border-border"
              >
                <div className="w-5 h-5 rounded-full bg-charcoal/10 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-semibold text-charcoal leading-tight block mb-0.5">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-muted leading-snug block">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Exclusions ───────────────────────────────────────────────── */}
      <section id="exclusions" className="border-b border-border scroll-mt-[140px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="section-divider mb-6" />
          <h2 className="text-xl font-semibold text-charcoal mb-3">What ARA Does Not Certify</h2>
          <p className="text-sm text-steel leading-relaxed mb-6 max-w-[72ch]">
            ARA certification is not a general quality assurance endorsement. The following are
            explicitly outside scope:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {exclusions.map((item, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-4 bg-slate-50/50"
              >
                <div className="flex items-start gap-2 mb-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <h3 className="text-sm font-semibold text-charcoal leading-tight">{item.label}</h3>
                </div>
                <p className="text-xs text-steel leading-relaxed pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Definitions ──────────────────────────────────────────────── */}
      <section id="definitions" className="border-b border-border bg-slate-50 scroll-mt-[140px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="section-divider mb-6" />
          <h2 className="text-xl font-semibold text-charcoal mb-3">Definitions</h2>
          <p className="text-sm text-steel leading-relaxed mb-6 max-w-[72ch]">
            Key terms used throughout the ARA Standard with specific technical meanings.
          </p>

          <div className="bg-white border border-border rounded-lg overflow-hidden max-w-4xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-border">
                  <th className="text-left font-semibold px-5 py-3 text-charcoal whitespace-nowrap">Term</th>
                  <th className="text-left font-semibold px-5 py-3 text-charcoal">Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {definitions.map((row) => (
                  <tr key={row.term}>
                    <td className="px-5 py-3 font-medium text-charcoal whitespace-nowrap align-top">{row.term}</td>
                    <td className="px-5 py-3 text-steel">{row.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <Link
              href="/standard/v1.1/glossary"
              className="text-sm text-navy font-medium hover:underline"
            >
              View full glossary &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Current Version ──────────────────────────────────────────── */}
      <section id="current-version" className="border-b border-border scroll-mt-[140px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="section-divider mb-6" />
          <h2 className="text-xl font-semibold text-charcoal mb-3">Current Version</h2>
          <p className="text-sm text-steel leading-relaxed mb-4 max-w-[72ch]">
            The current version is <strong className="text-charcoal">v1.1</strong>, ratified
            following the public review period. Version 1.1 introduces a two-axis certification model
            combining Certification Levels with Assurance Classes to create nine distinct certification
            designations across 410 requirements.
          </p>
          <p className="text-sm text-steel leading-relaxed mb-6 max-w-[72ch]">
            New in v1.1: four system profiles enable right-sized certification, Platform Certification
            allows infrastructure to carry forward ACR compliance, and a mandatory 7-factor risk
            classification determines Assurance Class. Two new domains address data privacy and
            societal impact.
          </p>

          <div className="border border-border rounded-lg p-6 bg-white max-w-2xl mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="version-badge">v1.1</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ratified
              </span>
              <span className="text-xs text-muted">March 2026</span>
            </div>
            <ul className="space-y-2 text-sm text-steel">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                15 reliability domains covering the full operational lifecycle
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                410 Autonomous Compliance Requirements across all domains
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                3 levels &times; 3 classes — nine distinct certification designations
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                4 system profiles for right-sized certification
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                6 evaluation methods for assessing ACR compliance
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                10-phase certification lifecycle from intake through monitoring
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/standard/v1.1"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-charcoal rounded-md hover:bg-navy transition-colors"
            >
              View Standard v1.1
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link
              href="/standard/v1.0"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-charcoal border border-border rounded-md hover:bg-slate-50 transition-colors"
            >
              View Standard v1.0
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Normative References ─────────────────────────────────────── */}
      <section id="references" className="border-b border-border bg-slate-50 scroll-mt-[140px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="section-divider mb-6" />
          <h2 className="text-xl font-semibold text-charcoal mb-3">Normative References</h2>
          <p className="text-sm text-steel leading-relaxed mb-6 max-w-[72ch]">
            The ARA Standard draws on established principles from the following reference
            frameworks. These references are informative; ARA defines its own requirements
            independently.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {normativeReferences.map((ref) => (
              <div
                key={ref.id}
                className="border border-border rounded-lg p-4 bg-white"
              >
                <span className="font-mono text-[10px] font-bold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border">
                  {ref.id}
                </span>
                <h3 className="text-sm font-semibold text-charcoal mt-2 mb-1">
                  {ref.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {ref.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Version History ──────────────────────────────────────────── */}
      <section id="version-history" className="scroll-mt-[140px]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10 sm:py-12">
          <div className="section-divider mb-6" />
          <h2 className="text-xl font-semibold text-charcoal mb-6">Version History</h2>

          <div className="bg-white border border-border rounded-lg overflow-hidden max-w-2xl">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-border">
                  <th className="text-left font-semibold px-5 py-3 text-charcoal">Version</th>
                  <th className="text-left font-semibold px-5 py-3 text-charcoal">Status</th>
                  <th className="text-left font-semibold px-5 py-3 text-charcoal">Date</th>
                  <th className="text-left font-semibold px-5 py-3 text-charcoal"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-5 py-3 font-semibold text-charcoal">v1.1</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Ratified
                    </span>
                  </td>
                  <td className="px-5 py-3 text-steel">March 2026</td>
                  <td className="px-5 py-3">
                    <Link href="/standard/v1.1" className="text-sm text-navy font-medium hover:underline">
                      View &rarr;
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-charcoal">v1.0</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      Public Review
                    </span>
                  </td>
                  <td className="px-5 py-3 text-steel">January 2026</td>
                  <td className="px-5 py-3">
                    <Link href="/standard/v1.0" className="text-sm text-navy font-medium hover:underline">
                      View &rarr;
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
