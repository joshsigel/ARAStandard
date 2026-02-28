import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The ARA Standard',
  description:
    'The Autonomous Reliability Assurance Standard defines the minimum operational reliability requirements for autonomous systems deployed in real-world environments.',
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
          <span className="text-charcoal font-medium">Standard</span>
        </li>
      </ol>
    </nav>
  );
}

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

export default function StandardPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb />

      <div className="max-w-[72ch]">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-2">
          The ARA Standard
        </h1>
        <p className="text-lg text-muted mb-8">
          Autonomous Reliability Assurance Standard v1.0 — Public Review Draft
        </p>

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
            <li>
              <strong>Operational boundary enforcement</strong> — the system operates within
              explicitly declared limits and cannot exceed its authorized scope of action.
            </li>
            <li>
              <strong>Decision integrity</strong> — decisions are traceable to their source
              inputs, free from fabrication, and consistent under repeated evaluation.
            </li>
            <li>
              <strong>Tool and API governance</strong> — all external integrations are authorized,
              validated, and constrained by a least-privilege access model.
            </li>
            <li>
              <strong>Identity and permission containment</strong> — agent identities are
              isolated, permissions follow least-privilege principles, and privilege escalation
              is technically prevented.
            </li>
            <li>
              <strong>Failure mode containment</strong> — the system degrades gracefully,
              contains failure blast radius, and recovers to verified safe states.
            </li>
            <li>
              <strong>Behavioral reliability under stress</strong> — the system maintains
              consistent behavior under sustained load, adversarial inputs, temporal pressure,
              and concurrent fault conditions.
            </li>
            <li>
              <strong>Adversarial robustness</strong> — the system resists prompt injection,
              data poisoning, model extraction, and supply chain attacks.
            </li>
            <li>
              <strong>Drift detection and stability</strong> — behavioral drift from the
              certified baseline is detected and addressed through continuous monitoring.
            </li>
            <li>
              <strong>Monitoring and telemetry</strong> — comprehensive observability
              infrastructure supports operational oversight and post-incident analysis.
            </li>
            <li>
              <strong>Escalation and human override</strong> — reliable mechanisms for
              human intervention are available at all times during autonomous operation.
            </li>
            <li>
              <strong>Auditability and transparency</strong> — complete audit trails and
              decision explainability interfaces support independent review.
            </li>
            <li>
              <strong>Operational governance controls</strong> — organizational processes
              for change management, incident response, and risk management are documented
              and tested.
            </li>
            <li>
              <strong>Physical actuation integrity</strong> — for systems with physical
              actuators, sensor-actuator feedback loops, command validation, and emergency
              stop mechanisms are independently verified.
            </li>
          </ul>

          {/* What ARA Does Not Certify */}
          <SectionAnchor id="what-ara-does-not-certify">What ARA Does Not Certify</SectionAnchor>
          <p>
            ARA certification is not a general quality assurance endorsement. The following
            are explicitly outside the scope of ARA certification:
          </p>
          <ul>
            <li>
              <strong>Model accuracy or task performance</strong> — ARA does not evaluate
              whether a system produces correct answers, optimal outputs, or commercially
              valuable results. It evaluates whether the system operates reliably within
              its declared boundaries.
            </li>
            <li>
              <strong>Ethical alignment or bias mitigation</strong> — ARA does not assess
              the ethical implications of a system&apos;s decisions or its performance across
              demographic groups. These assessments require domain-specific frameworks that
              are outside the scope of operational reliability certification.
            </li>
            <li>
              <strong>Regulatory compliance</strong> — ARA certification does not satisfy
              the requirements of any specific regulatory framework (e.g., EU AI Act, FDA
              software validation, SEC algorithmic trading rules). Organizations must
              independently verify regulatory compliance in their operating jurisdictions.
            </li>
            <li>
              <strong>Business suitability</strong> — ARA does not evaluate whether a system
              is appropriate for a particular business use case, whether its cost-benefit
              profile is favorable, or whether it meets contractual service-level agreements.
            </li>
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
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">Autonomous System</td>
                <td>
                  A software-driven system that takes actions, makes decisions, or controls
                  resources with limited or no real-time human oversight during normal operation.
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">Agent</td>
                <td>
                  A software component that perceives its environment, reasons about its
                  observations, and takes actions to achieve specified objectives.
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">ACR</td>
                <td>
                  Autonomous Compliance Requirement. A discrete, testable control defined
                  in the ARA Standard that addresses a specific aspect of operational reliability.
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">Domain</td>
                <td>
                  A thematic grouping of related ACRs that collectively address a major
                  reliability concern area such as decision integrity or adversarial robustness.
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">Certification Level</td>
                <td>
                  One of three tiers (L1, L2, L3) that define the rigor, scope, and monitoring
                  requirements for ARA certification based on the system&apos;s autonomy model
                  and operational risk profile.
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">Evaluation Method</td>
                <td>
                  The prescribed technique for assessing compliance with an ACR: Automated
                  Testing (AT), Human Simulation (HS), Evidence Inspection (EI), or Continuous
                  Monitoring (CM).
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">AVB</td>
                <td>
                  Authorized Verification Body. An organization accredited by ARAF to conduct
                  ARA certification evaluations and issue certification decisions.
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">Blocking</td>
                <td>
                  An ACR classification indicating that non-compliance with this control
                  results in automatic certification denial regardless of performance on
                  other controls.
                </td>
              </tr>
              <tr>
                <td className="font-medium text-charcoal whitespace-nowrap">Conditional</td>
                <td>
                  An ACR classification indicating that non-compliance with this control
                  can result in conditional certification with mandated remediation within
                  a specified timeframe.
                </td>
              </tr>
            </tbody>
          </table>

          {/* Current Version */}
          <SectionAnchor id="current-version">Current Version</SectionAnchor>
          <p>
            The current version of the ARA Standard is <strong>v1.0</strong>, designated as a
            Public Review Draft. This version was released for public comment on January 15, 2026
            and defines the initial normative baseline for ARA certification.
          </p>
          <p>Version 1.0 includes:</p>
          <ul>
            <li>13 reliability domains covering the full operational lifecycle</li>
            <li>52 representative Autonomous Compliance Requirements (ACRs) across all domains</li>
            <li>3 certification levels (L1, L2, L3) with distinct rigor and monitoring requirements</li>
            <li>4 evaluation methods for assessing ACR compliance</li>
            <li>A 10-phase certification lifecycle from intake through ongoing monitoring</li>
          </ul>
          <p>
            The full contents of version 1.0, including all domains, ACRs, and supporting
            materials, are available at the version reference page.
          </p>
          <div className="mt-6">
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
            <li>
              <strong>ISO/IEC 42001:2023</strong> — Artificial Intelligence Management System.
              Provides context for organizational governance of AI systems.
            </li>
            <li>
              <strong>NIST AI RMF 1.0</strong> — AI Risk Management Framework. Informs the
              risk-based approach to reliability domain structuring.
            </li>
            <li>
              <strong>ISO 22989:2022</strong> — Artificial Intelligence Concepts and Terminology.
              Referenced for baseline terminology alignment.
            </li>
            <li>
              <strong>IEC 61508</strong> — Functional Safety of Electrical/Electronic/Programmable
              Electronic Safety-related Systems. Referenced for Domain 13 physical actuation
              integrity requirements.
            </li>
            <li>
              <strong>OWASP LLM Top 10</strong> — Informs the adversarial robustness domain,
              particularly prompt injection and data poisoning controls.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
