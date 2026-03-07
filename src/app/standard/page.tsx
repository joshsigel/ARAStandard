import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'The ARA Standard',
  description:
    'The Autonomous Reliability Assurance Standard defines the minimum operational reliability requirements for autonomous systems deployed in real-world environments.',
};

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-semibold text-charcoal mt-12 mb-4 scroll-mt-24">
      <a href={`#${id}`} className="group">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-muted">#</span>
      </a>
    </h2>
  );
}

const quickLinks = [
  {
    title: 'Explore Domains',
    description: '15 reliability domains covering the full operational lifecycle',
    href: '/standard/v1.1/domains',
    stat: '15',
    statLabel: 'domains',
  },
  {
    title: 'ACR Library',
    description: 'Browse all Autonomous Compliance Requirements',
    href: '/standard/v1.1/acr',
    stat: '410',
    statLabel: 'ACRs',
  },
  {
    title: 'Certification',
    description: 'Three levels with distinct rigor and monitoring requirements',
    href: '/certification',
    stat: '3',
    statLabel: 'levels',
  },
  {
    title: 'AI Landscape',
    description: 'Where ARA fits among 14 major regulatory frameworks',
    href: '/ai-landscape',
    stat: '14',
    statLabel: 'frameworks',
  },
];

const tocSections = [
  { id: 'scope', label: 'Scope' },
  { id: 'what-ara-certifies', label: 'What ARA Certifies' },
  { id: 'what-ara-does-not-certify', label: 'Exclusions' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'current-version', label: 'Current Version' },
  { id: 'normative-references', label: 'Normative References' },
  { id: 'version-history', label: 'Version History' },
];

export default function StandardPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Standard' }]} className="mb-8" />

      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold text-charcoal tracking-tight">
            The ARA Standard
          </h1>
          <span className="inline-flex items-center text-xs font-semibold px-2 py-1 rounded bg-charcoal text-white">
            v1.1 Ratified
          </span>
        </div>
        <p className="text-lg text-steel max-w-[72ch]">
          The Autonomous Reliability Assurance Standard establishes a structured framework for
          evaluating and certifying the operational reliability of autonomous systems.
        </p>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col p-4 border border-border rounded-lg hover:border-border-dark hover:shadow-sm transition-all bg-white"
          >
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl font-bold text-charcoal tabular-nums">{item.stat}</span>
              <span className="text-xs text-muted">{item.statLabel}</span>
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

      {/* Main content with TOC sidebar */}
      <div className="flex gap-12">
        {/* TOC sidebar (desktop only) */}
        <nav className="hidden xl:block w-48 flex-shrink-0">
          <div className="sticky top-20">
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
              On this page
            </h3>
            <ul className="space-y-1.5 border-l border-border pl-3">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-muted hover:text-charcoal transition-colors block py-0.5"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 max-w-[72ch]">
          <div className="prose">
            {/* Scope */}
            <SectionAnchor id="scope">Scope</SectionAnchor>
            <p>
              The Autonomous Reliability Assurance (ARA) Standard establishes a structured framework
              for evaluating and certifying the operational reliability of autonomous systems.
              It applies to any software-driven system that takes actions, makes decisions, or
              controls resources with limited or no real-time human oversight.
            </p>
            <p>
              The standard is domain-agnostic. It addresses the reliability characteristics
              common to all autonomous systems regardless of the industry in which they operate,
              the modality of their inputs, or the nature of their outputs. Industry-specific
              regulatory requirements remain the responsibility of the deploying organization;
              ARA certification complements but does not replace sector-level compliance obligations.
            </p>
            <p>
              The standard is maintained by the Autonomous Reliability Assurance Foundation (ARAF),
              an independent standards body. All normative requirements, evaluation methodologies,
              and certification criteria are developed through an open governance process with
              public comment periods preceding each ratified revision.
            </p>

            {/* What ARA Certifies */}
            <SectionAnchor id="what-ara-certifies">What ARA Certifies</SectionAnchor>
            <p>
              ARA certification attests that an autonomous system has been evaluated against a
              comprehensive set of reliability controls and has demonstrated compliance at a
              specified certification level. Specifically, ARA certifies:
            </p>
            <ul>
              <li><strong>Operational boundary enforcement</strong> — the system operates within explicitly declared limits and cannot exceed its authorized scope of action.</li>
              <li><strong>Decision integrity</strong> — decisions are traceable to their source inputs, free from fabrication, and consistent under repeated evaluation.</li>
              <li><strong>Tool and API governance</strong> — all external integrations are authorized, validated, and constrained by a least-privilege access model.</li>
              <li><strong>Identity and permission containment</strong> — agent identities are isolated, permissions follow least-privilege principles, and privilege escalation is technically prevented.</li>
              <li><strong>Data privacy and consent management</strong> — the system enforces data minimization, purpose limitation, and explicit consent protocols for all personal and sensitive data processing.</li>
              <li><strong>Failure mode containment</strong> — the system degrades gracefully, contains failure blast radius, and recovers to verified safe states.</li>
              <li><strong>Behavioral reliability under stress</strong> — the system maintains consistent behavior under sustained load, adversarial inputs, temporal pressure, and concurrent fault conditions.</li>
              <li><strong>Adversarial robustness</strong> — the system resists prompt injection, data poisoning, model extraction, and supply chain attacks.</li>
              <li><strong>Drift detection and stability</strong> — behavioral drift from the certified baseline is detected and addressed through continuous monitoring.</li>
              <li><strong>Monitoring and telemetry</strong> — comprehensive observability infrastructure supports operational oversight and post-incident analysis.</li>
              <li><strong>Escalation and human override</strong> — reliable mechanisms for human intervention are available at all times during autonomous operation.</li>
              <li><strong>Auditability and transparency</strong> — complete audit trails and decision explainability interfaces support independent review.</li>
              <li><strong>Societal impact assessment</strong> — the system is evaluated for downstream societal effects including equity, accessibility, environmental impact, and community-level consequences.</li>
              <li><strong>Operational governance controls</strong> — organizational processes for change management, incident response, and risk management are documented and tested.</li>
              <li><strong>Physical actuation integrity</strong> — for systems with physical actuators, sensor-actuator feedback loops, command validation, and emergency stop mechanisms are independently verified.</li>
            </ul>

            {/* What ARA Does Not Certify */}
            <SectionAnchor id="what-ara-does-not-certify">What ARA Does Not Certify</SectionAnchor>
            <p>
              ARA certification is not a general quality assurance endorsement. The following
              are explicitly outside the scope of ARA certification:
            </p>
            <ul>
              <li><strong>Model accuracy or task performance</strong> — ARA does not evaluate whether a system produces correct answers, optimal outputs, or commercially valuable results. It evaluates whether the system operates reliably within its declared boundaries.</li>
              <li><strong>Ethical alignment or bias mitigation</strong> — ARA does not assess the ethical implications of a system&apos;s decisions or its performance across demographic groups. These assessments require domain-specific frameworks that are outside the scope of operational reliability certification.</li>
              <li><strong>Regulatory compliance</strong> — ARA certification does not satisfy the requirements of any specific regulatory framework (e.g., EU AI Act, FDA software validation, SEC algorithmic trading rules). Organizations must independently verify regulatory compliance in their operating jurisdictions.</li>
              <li><strong>Business suitability</strong> — ARA does not evaluate whether a system is appropriate for a particular business use case, whether its cost-benefit profile is favorable, or whether it meets contractual service-level agreements.</li>
            </ul>

            {/* Definitions */}
            <SectionAnchor id="definitions">Definitions</SectionAnchor>
            <p>
              The following terms are used throughout the ARA Standard with specific technical meanings:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Definition</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Autonomous System</td><td>A software-driven system that takes actions, makes decisions, or controls resources with limited or no real-time human oversight during normal operation.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Agent</td><td>A software component that perceives its environment, reasons about its observations, and takes actions to achieve specified objectives.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">ACR</td><td>Autonomous Compliance Requirement. A discrete, testable control defined in the ARA Standard that addresses a specific aspect of operational reliability.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Domain</td><td>A thematic grouping of related ACRs that collectively address a major reliability concern area such as decision integrity or adversarial robustness.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Certification Level</td><td>One of three tiers (L1, L2, L3) that define the rigor, scope, and monitoring requirements for ARA certification based on the system&apos;s autonomy model and operational risk profile.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Assurance Class</td><td>One of three classes (A, B, C) determining the intensity of ongoing monitoring and reassessment requirements following initial certification.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">System Profile</td><td>One of four profiles (Foundational, Standard, Advanced, Comprehensive) that determine which ACRs apply to a given system based on its capabilities and deployment context.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Risk Classification</td><td>A mandatory 7-factor assessment that evaluates a system&apos;s operational risk to determine the appropriate Assurance Class for certification.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Evaluation Method</td><td>The prescribed technique for assessing compliance with an ACR: Automated Testing (AT), Human Simulation (HS), Evidence Inspection (EI), or Continuous Monitoring (CM).</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">AVB</td><td>Authorized Verification Body. An organization accredited by ARAF to conduct ARA certification evaluations and issue certification decisions.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">CAPO</td><td>Certified Assurance Platform Operator. An organization certified by ARAF to provide continuous monitoring infrastructure and ongoing assurance services for certified systems.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Platform Certification</td><td>Certification of a reusable platform or infrastructure layer, enabling downstream deployments to inherit certified controls rather than re-evaluating them independently.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Deployment Certification</td><td>Certification of a specific system deployment, evaluating the complete stack including any inherited platform controls and deployment-specific configurations.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Blocking</td><td>An ACR classification indicating that non-compliance with this control results in automatic certification denial regardless of performance on other controls.</td></tr>
                <tr><td className="font-medium text-charcoal whitespace-nowrap">Conditional</td><td>An ACR classification indicating that non-compliance with this control can result in conditional certification with mandated remediation within a specified timeframe.</td></tr>
              </tbody>
            </table>

            {/* Current Version */}
            <SectionAnchor id="current-version">Current Version</SectionAnchor>
            <p>
              The current version of the ARA Standard is <strong>v1.1</strong>, ratified following
              the public review period for v1.0. This version establishes the full normative baseline
              for ARA certification with expanded domain coverage and a structured certification
              architecture.
            </p>
            <p>Version 1.1 includes:</p>
            <ul>
              <li>15 reliability domains covering the full operational lifecycle</li>
              <li>410 Autonomous Compliance Requirements (ACRs) across all domains</li>
              <li>3 certification levels (L1, L2, L3) &times; 3 assurance classes (A, B, C) defining rigor, scope, and monitoring intensity</li>
              <li>4 system profiles (Foundational, Standard, Advanced, Comprehensive) determining applicable ACRs</li>
              <li>4 evaluation methods for assessing ACR compliance</li>
              <li>A 10-phase certification lifecycle from intake through ongoing monitoring</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/standard/v1.1"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-charcoal rounded-md hover:bg-charcoal/90 transition-colors no-underline"
              >
                View Standard v1.1
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/standard/v1.0"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-charcoal border border-border rounded-md hover:bg-slate-50 transition-colors no-underline"
              >
                View Standard v1.0
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            {/* Normative References */}
            <SectionAnchor id="normative-references">Normative References</SectionAnchor>
            <p>
              The ARA Standard draws on established principles from the following reference
              frameworks. These references are informative; ARA defines its own normative
              requirements independently.
            </p>
            <ul>
              <li><strong>ISO/IEC 42001:2023</strong> — Artificial Intelligence Management System. Provides context for organizational governance of AI systems.</li>
              <li><strong>NIST AI RMF 1.0</strong> — AI Risk Management Framework. Informs the risk-based approach to reliability domain structuring.</li>
              <li><strong>ISO 22989:2022</strong> — Artificial Intelligence Concepts and Terminology. Referenced for baseline terminology alignment.</li>
              <li><strong>IEC 61508</strong> — Functional Safety of Electrical/Electronic/Programmable Electronic Safety-related Systems. Referenced for Domain 15 physical actuation integrity requirements.</li>
              <li><strong>OWASP LLM Top 10</strong> — Informs the adversarial robustness domain, particularly prompt injection and data poisoning controls.</li>
            </ul>

            {/* Version History */}
            <SectionAnchor id="version-history">Version History</SectionAnchor>
            <table>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium text-charcoal">v1.1</td>
                  <td>Ratified</td>
                  <td>March 2026</td>
                  <td><Link href="/standard/v1.1" className="text-blue-600 hover:underline">View v1.1</Link></td>
                </tr>
                <tr>
                  <td className="font-medium text-charcoal">v1.0</td>
                  <td>Public Review Draft</td>
                  <td>January 2026</td>
                  <td><Link href="/standard/v1.0" className="text-blue-600 hover:underline">View v1.0</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
