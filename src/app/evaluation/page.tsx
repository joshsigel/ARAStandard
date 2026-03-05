import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CertificationLifecycle } from '@/components/visualizations/CertificationLifecycle';

export const metadata: Metadata = {
  title: 'Evaluation Methodology — v1.1',
  description:
    'The ARA certification lifecycle v1.1: 10-phase evaluation process, risk classification, evidence sufficiency matrix, scoring methodology, adversarial testing, and domain scoring thresholds for autonomous system certification.',
};

const phases = [
  {
    number: 1,
    name: 'Intake & Scoping',
    description:
      'The applicant organization initiates the certification process through an Authorized Validation Body (AVB). The system is registered and assigned a unique ARA System Identifier (ASI). The AVB works with the applicant to determine the applicable system profile — Foundational (F), Standard (S), Advanced (A), or Comprehensive (C) — based on the system\u2019s operational scope, deployment context, and autonomy characteristics.',
    duration: '1\u20132 days',
    outputs: [
      'Unique ARA System Identifier (ASI)',
      'AVB assignment confirmation',
      'System profile selection (F/S/A/C)',
      'Certification scope statement',
    ],
  },
  {
    number: 2,
    name: 'Risk Classification',
    description:
      'The AVB conducts a mandatory 7-factor risk assessment to determine the system\u2019s Assurance Class (A, B, or C). The seven factors are: autonomy level, decision impact severity, data sensitivity, operational environment, human oversight capacity, action reversibility, and deployment scale. Each factor is scored and weighted to produce an overall risk classification. This phase is new in v1.1 and replaces the simpler level-confirmation step in v1.0.',
    duration: '1\u20132 weeks',
    outputs: [
      'Risk factor scores (7 factors)',
      'Assurance Class determination (A/B/C)',
      'Risk classification rationale document',
      'Escalation notice (if applicable)',
    ],
    isNew: true,
  },
  {
    number: 3,
    name: 'Evidence Collection',
    description:
      'The applicant organization prepares and submits evidence across four defined categories based on the system profile. Evidence categories are: Log/Platform (LP) for telemetry, audit logs, and platform data; Technical Inspection (TI) for architecture review, configuration artifacts, and code analysis; Operational Proof (OP) for runtime behavior validation and operational testing; and Third-Party Attestation (TP) for independent audits, certifications, and external validation reports.',
    duration: '2\u20136 weeks',
    outputs: [
      'Evidence portfolio organized by category (LP, TI, OP, TP)',
      'Evidence sufficiency mapping per ACR',
      'Gap analysis report',
      'Platform certification inheritance claims (if applicable)',
    ],
  },
  {
    number: 4,
    name: 'ACR Evaluation',
    description:
      'The core evaluation phase. Each applicable Autonomy Compliance Requirement is assessed using one or more of six evaluation methods: Automated Testing (AT), Human Simulation (HS), Evidence Inspection (EI), Continuous Monitoring (CM), Third-Party Attestation (TP), and Operational Proof (OP). The last two methods are new in v1.1. The AVB evaluates compliance against the defined acceptance criteria for each ACR per the system\u2019s profile, records evidence, and assigns per-ACR scores.',
    duration: '2\u20138 weeks',
    outputs: [
      'Per-ACR compliance scores',
      'Evidence artifact repository',
      'Non-conformity register',
      'Interim findings report',
    ],
  },
  {
    number: 5,
    name: 'Adversarial Testing',
    description:
      'Structured adversarial testing proportional to the certification level. L1 evaluations use automated adversarial test suites only. L2 evaluations add structured human adversarial simulation (minimum 40 hours). L3 evaluations require automated suites, human adversarial simulation (minimum 80 hours), an ARAF-approved independent red team engagement, and a minimum 30-day continuous runtime stress test.',
    duration: '1\u20133 weeks',
    outputs: [
      'Adversarial test results',
      'Vulnerability findings log',
      'Red team report (L2/L3)',
      'Stress test telemetry (L3)',
    ],
  },
  {
    number: 6,
    name: 'Scoring & Determination',
    description:
      'Domain scores are calculated against the 15-domain threshold matrix for the requested certification level. The scoring model applies risk weighting and blocking ACR logic. Platform certification inheritance is applied where applicable, allowing systems built on certified platforms to inherit qualifying domain scores. The overall certification determination is pass/fail: all applicable domain thresholds must be met.',
    duration: '1 week',
    outputs: [
      'Domain scorecard (15 domains)',
      'Overall pass/fail determination',
      'Platform cert inheritance applied',
      'Conditional items register (if applicable)',
    ],
  },
  {
    number: 7,
    name: 'Certification Issuance',
    description:
      'The AVB issues a formal two-axis certification designation combining the certification level and Assurance Class (e.g., L2-B). Platform certifications receive a level designation without an Assurance Class. A living badge is generated with real-time operational state tracking. The certification is published to the ARA Public Registry with full metadata.',
    duration: '1\u20132 days',
    outputs: [
      'Two-axis designation (e.g., L2-B)',
      'Platform cert variant (level only, no class)',
      'Living certification badge',
      'Public registry entry',
      'Certification ID (e.g., ARA-2026-XXXXX)',
    ],
  },
  {
    number: 8,
    name: 'Continuous Monitoring',
    description:
      'Post-certification monitoring is calibrated to the system\u2019s Assurance Class. Class A systems perform periodic self-assessment with results reported to the registry. Class B systems are subject to monthly Continuous Assurance Platform Operator (CAPO) reports with telemetry monitoring. Class C systems require 24/7 CAPO oversight with real-time alerting and immediate escalation capabilities.',
    duration: 'Ongoing',
    outputs: [
      'Monitoring reports (per class schedule)',
      'Telemetry dashboards',
      'CAPO engagement records (Class B/C)',
      'Compliance status updates',
    ],
  },
  {
    number: 9,
    name: 'Renewal & Revalidation',
    description:
      'All certifications require annual renewal through a streamlined reassessment. Revalidation may be triggered outside the normal renewal cycle by three conditions: material change to the system\u2019s architecture or operational scope, a monitoring breach detected through continuous monitoring, or an assurance class lapse (e.g., Class B system failing to meet Class B monitoring requirements).',
    duration: 'Ongoing',
    outputs: [
      'Annual renewal assessment',
      'Updated certification record',
      'Revalidation trigger documentation (if applicable)',
      'Updated registry entry',
    ],
  },
  {
    number: 10,
    name: 'Ecosystem Participation',
    description:
      'Certified systems participate in the broader ARA ecosystem. This includes public listing in the ARA Certification Registry, display of the living certification badge, eligibility for ARA-linked insurance products through the Risk-Informed Pricing framework, and participation in regulatory equivalence and consortium programs.',
    duration: 'Ongoing',
    outputs: [
      'Public registry listing',
      'Living badge display rights',
      'Insurance eligibility (RIP framework)',
      'Consortium and regulatory participation',
    ],
  },
];

const evaluationMethods = [
  {
    code: 'AT',
    name: 'Automated Testing',
    description:
      'Programmatic test suites executed against the system under controlled conditions. Includes functional compliance tests, boundary condition tests, regression suites, and automated adversarial probes. Test results are deterministic and reproducible.',
    applicability: 'All ACRs with observable, deterministic outputs.',
  },
  {
    code: 'HS',
    name: 'Human Simulation',
    description:
      'Structured scenarios executed by trained human evaluators who interact with the system as end users, adversaries, or edge-case operators. Human simulation tests behavioral responses that cannot be fully captured by automated suites, including nuanced escalation behavior, ambiguous input handling, and social engineering resistance.',
    applicability: 'ACRs involving human interaction, escalation, or contextual judgment.',
  },
  {
    code: 'EI',
    name: 'Evidence Inspection',
    description:
      'Review of documentation, configuration artifacts, architecture diagrams, audit logs, and governance records. Evidence inspection validates that the organizational and technical controls surrounding the system are adequate and correctly implemented.',
    applicability: 'ACRs related to governance, documentation, audit trails, and operational procedures.',
  },
  {
    code: 'CM',
    name: 'Continuous Monitoring',
    description:
      'Ongoing telemetry collection and analysis during the system\u2019s production operation. Continuous monitoring validates that the system maintains compliance over time, detects behavioral drift, and triggers alerts when operational parameters deviate from certified baselines.',
    applicability: 'ACRs requiring sustained operational validation beyond point-in-time testing.',
  },
  {
    code: 'TP',
    name: 'Third-Party Attestation',
    description:
      'Independent validation provided by qualified third parties. Includes external audit reports, industry certifications (SOC 2, ISO 27001, etc.), penetration test results from accredited firms, and expert attestation letters. Third-party evidence provides independent corroboration of compliance claims.',
    applicability: 'ACRs where independent validation strengthens assurance, particularly in Domains 5, 6, and 13.',
    isNew: true,
  },
  {
    code: 'OP',
    name: 'Operational Proof',
    description:
      'Validation through observed operational behavior in production or production-equivalent environments. Includes runtime performance data, incident response records, operational metrics, and demonstrated behavior under real-world conditions over defined observation periods.',
    applicability: 'ACRs requiring evidence of sustained operational behavior rather than point-in-time testing.',
    isNew: true,
  },
];

const evidenceSufficiency = [
  {
    level: 'L1',
    label: 'L1 — Foundation',
    requirements: [
      'LP (Log/Platform) + TI (Technical Inspection) sufficient for most ACRs',
      'OP (Operational Proof) accepted as supplementary evidence',
      'TP (Third-Party Attestation) not required but accepted for Domain 5 and Domain 6',
    ],
  },
  {
    level: 'L2',
    label: 'L2 — Operational',
    requirements: [
      'LP + TI + OP required for all applicable ACRs',
      'TP required for Domain 5 (Data Privacy), Domain 6 (Security), and Domain 13 (Societal Impact)',
      'Platform certification inheritance may reduce evidence burden for inherited domains',
    ],
  },
  {
    level: 'L3',
    label: 'L3 — High-Stakes',
    requirements: [
      'All four evidence categories (LP, TI, OP, TP) required',
      'Independent third-party attestation mandatory for all critical-weight ACRs',
      'Extended observation periods required for OP evidence (minimum 90 days)',
      'Platform certification inheritance claims subject to independent verification',
    ],
  },
];

const specialGuidance = [
  {
    type: 'Voice AI Systems',
    description:
      'Voice AI systems require additional evaluation of real-time speech processing reliability, accent/dialect handling equity, voice consent and disclosure requirements, and emotional manipulation resistance. Domain 4 (Transparency) ACRs include voice-specific disclosure requirements. Domain 14 (Data Privacy) includes voice data retention and biometric consent provisions.',
  },
  {
    type: 'Multimodal Systems',
    description:
      'Systems that process multiple input modalities (text, image, audio, video) are evaluated across all applicable modality-specific ACRs. Cross-modal interaction effects must be tested during adversarial testing. Evidence collection must cover each modality independently and in combination.',
  },
  {
    type: 'Multi-Agent Orchestration',
    description:
      'Orchestration systems that coordinate multiple autonomous agents are evaluated as composite systems. The evaluation scope includes inter-agent communication integrity, delegation chain accountability, conflict resolution mechanisms, and cascading failure containment. Each subordinate agent\u2019s certification status is verified.',
  },
  {
    type: 'Physical / Robotic Systems',
    description:
      'Systems with physical actuation capabilities are evaluated against Domain 15 (Physical Safety) ACRs in addition to all applicable digital domains. Physical safety testing requires controlled environment validation, emergency stop verification, and human proximity safety assessment. L3 certification required for systems with irreversible physical actions.',
  },
  {
    type: 'MCP-Connected Agents',
    description:
      'Agents that use Model Context Protocol (MCP) connections to external tools and services are evaluated for tool-use authorization controls, scope limitation enforcement, data exfiltration prevention, and connection integrity monitoring. Each MCP tool connection is treated as an autonomy boundary expansion requiring specific ACR coverage.',
  },
];

export default function EvaluationPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Evaluation' }]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Evaluation Methodology — v1.1
        </h1>
        <div className="prose max-w-3xl">
          <p>
            The ARA Standard defines a structured, repeatable evaluation process
            for certifying autonomous systems. Every system undergoes the same
            10-phase certification lifecycle, adapted in rigor and scope to the
            requested certification level and determined Assurance Class. The
            methodology is technology-neutral, evidence-based, and independently
            verifiable.
          </p>
          <p>
            Evaluations are conducted by Authorized Validation Bodies (AVBs) —
            independent organizations accredited by ARAF to perform certification
            assessments. v1.1 introduces mandatory risk classification,
            expanded evidence categories, two new evaluation methods, and
            system-profile-based scoping.
          </p>
        </div>
      </header>

      {/* Certification Lifecycle Visualization */}
      <section id="lifecycle-visual" className="mb-16 scroll-mt-24">
        <CertificationLifecycle className="max-w-4xl" />
      </section>

      {/* 10-Phase Certification Lifecycle */}
      <section id="lifecycle" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#lifecycle" className="hover:text-navy transition-colors">
            10-Phase Certification Lifecycle
          </a>
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          Every ARA certification follows this sequential lifecycle. Phases are
          completed in order; earlier phases must be finalized before subsequent
          phases begin. The total evaluation timeline depends on the
          certification level, Assurance Class, system complexity, and the
          availability of evidence and test environments.
        </p>

        <div className="space-y-6">
          {phases.map((phase) => (
            <div
              key={phase.number}
              id={`phase-${phase.number}`}
              className="border border-border rounded-lg overflow-hidden scroll-mt-24"
            >
              <div className="bg-slate-50 border-b border-border px-6 py-4 flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-mono text-sm font-bold shrink-0 mt-0.5">
                  {phase.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-charcoal">
                    <a
                      href={`#phase-${phase.number}`}
                      className="hover:text-navy transition-colors"
                    >
                      Phase {phase.number}: {phase.name}
                    </a>
                    {'isNew' in phase && phase.isNew && (
                      <span className="ml-2 text-xs font-bold text-white bg-navy px-2 py-0.5 rounded-full align-middle">
                        NEW IN v1.1
                      </span>
                    )}
                  </h3>
                  {phase.duration && (
                    <p className="text-xs text-muted mt-1">
                      Typical duration: {phase.duration}
                    </p>
                  )}
                </div>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-steel leading-relaxed mb-4 max-w-[72ch]">
                  {phase.description}
                </p>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                    Outputs
                  </h4>
                  <ul className="space-y-1.5">
                    {phase.outputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-start gap-2.5 text-sm text-steel"
                      >
                        <span className="text-slate-400 mt-0.5 shrink-0">
                          &bull;
                        </span>
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evaluation Methods */}
      <section id="methods" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#methods" className="hover:text-navy transition-colors">
            Evaluation Methods
          </a>
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          Each ACR specifies one or more permitted evaluation methods. The AVB
          selects the appropriate method based on the ACR definition, the
          system&apos;s architecture, and the available evidence. Multiple
          methods may be applied to a single ACR for corroboration. v1.1
          introduces two new methods: Third-Party Attestation (TP) and
          Operational Proof (OP).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {evaluationMethods.map((method) => (
            <div
              key={method.code}
              className="border border-border rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-navy bg-slate-100 px-2.5 py-1 rounded">
                  {method.code}
                </span>
                <h3 className="text-base font-semibold text-charcoal">
                  {method.name}
                </h3>
                {'isNew' in method && method.isNew && (
                  <span className="text-xs font-bold text-white bg-navy px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-sm text-steel leading-relaxed mb-3">
                {method.description}
              </p>
              <p className="text-xs text-muted">
                <span className="font-semibold">Applicability:</span>{' '}
                {method.applicability}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Evidence Sufficiency Matrix */}
      <section id="evidence-sufficiency" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#evidence-sufficiency"
            className="hover:text-navy transition-colors"
          >
            Evidence Sufficiency Matrix
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            The Evidence Sufficiency Matrix defines the minimum evidence
            categories required at each certification level. Higher levels
            require broader evidence coverage and more independent validation.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {evidenceSufficiency.map((level) => (
            <div
              key={level.level}
              className="border border-border rounded-lg overflow-hidden"
            >
              <div className="bg-slate-50 border-b border-border px-6 py-3">
                <h3 className="text-base font-semibold text-charcoal">
                  {level.label}
                </h3>
              </div>
              <div className="px-6 py-5">
                <ul className="space-y-2">
                  {level.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 text-sm text-steel"
                    >
                      <span className="text-slate-400 mt-0.5 shrink-0">
                        &bull;
                      </span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Evidence Category
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l1">L1</span>
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l2">L2</span>
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l3">L3</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  LP — Log/Platform
                </td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  TI — Technical Inspection
                </td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  OP — Operational Proof
                </td>
                <td className="px-5 py-3 text-center text-muted">
                  Supplementary
                </td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  TP — Third-Party Attestation
                </td>
                <td className="px-5 py-3 text-center text-muted">
                  Optional
                </td>
                <td className="px-5 py-3 text-center text-steel">
                  Select domains
                </td>
                <td className="px-5 py-3 text-center text-steel">
                  Mandatory (independent)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Evidence Integrity */}
      <section id="evidence-integrity" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#evidence-integrity"
            className="hover:text-navy transition-colors"
          >
            Evidence Integrity Requirements
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            All evaluation evidence must satisfy the following integrity
            requirements to be accepted as part of a certification record:
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal whitespace-nowrap">
                  Requirement
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Provenance
                </td>
                <td className="px-5 py-3 text-steel">
                  Every evidence artifact must be traceable to the evaluation
                  session, test execution, or review event that produced it.
                  Evidence without clear provenance is inadmissible.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Immutability
                </td>
                <td className="px-5 py-3 text-steel">
                  Evidence records must be stored in a tamper-evident format.
                  Cryptographic hashes (SHA-256 minimum) must be computed at
                  the time of capture and verified at the time of review.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Completeness
                </td>
                <td className="px-5 py-3 text-steel">
                  Evidence must cover the full scope of each evaluated ACR.
                  Partial evidence may support a partial compliance finding but
                  cannot support full compliance.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Timeliness
                </td>
                <td className="px-5 py-3 text-steel">
                  Evidence must be collected within the evaluation window.
                  Evidence older than 90 days at the time of certification
                  decision is considered stale and must be re-collected unless
                  otherwise justified in the evaluation record.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Independence
                </td>
                <td className="px-5 py-3 text-steel">
                  Evidence produced by the applicant organization is admissible
                  but must be independently validated by the AVB. Self-reported
                  evidence without independent verification does not satisfy
                  evaluation requirements.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Scoring Model */}
      <section id="scoring" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#scoring" className="hover:text-navy transition-colors">
            Scoring Model
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            The ARA scoring model produces per-domain compliance scores across
            all 15 evaluation domains that are aggregated into an overall
            certification determination. The model is designed to be transparent,
            deterministic, and reproducible across different AVBs evaluating
            the same system.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              ACR-Level Scoring
            </h3>
            <p className="text-sm text-steel leading-relaxed mb-3">
              Each ACR is scored on a 4-point scale based on observed compliance
              against the defined acceptance criteria:
            </p>
            <ul className="space-y-2">
              {[
                { score: '3 — Full Compliance', desc: 'The system fully satisfies all acceptance criteria for the ACR.' },
                { score: '2 — Substantial Compliance', desc: 'The system satisfies the core intent with minor deviations that do not materially affect reliability.' },
                { score: '1 — Partial Compliance', desc: 'The system demonstrates relevant capability but falls short of the acceptance criteria in material ways.' },
                { score: '0 — Non-Compliance', desc: 'The system does not satisfy the ACR. No relevant capability observed or critical failure identified.' },
              ].map((item) => (
                <li key={item.score} className="text-sm text-steel">
                  <span className="font-mono font-semibold text-charcoal">
                    {item.score}
                  </span>
                  <br />
                  <span className="text-muted">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Domain Score Calculation
            </h3>
            <p className="text-sm text-steel leading-relaxed mb-3">
              Domain scores are computed as weighted averages of ACR scores
              within each domain. The formula accounts for risk weighting and
              blocking ACR logic:
            </p>
            <div className="bg-charcoal text-slate-200 rounded-md p-4 font-mono text-sm leading-relaxed mb-3">
              <code>
                Domain Score = (&#931; ACR_score_i &times; weight_i) / (&#931; max_score_i &times; weight_i) &times; 100
              </code>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              The resulting percentage is compared against the domain threshold
              for the requested certification level. A system must meet or
              exceed every applicable domain threshold to qualify for
              certification.
            </p>
          </div>
        </div>
      </section>

      {/* Risk Weighting */}
      <section id="risk-weighting" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#risk-weighting"
            className="hover:text-navy transition-colors"
          >
            Risk Weighting Model
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Not all ACRs carry equal weight in the scoring model. Each ACR is
            assigned a risk weight that reflects its relative importance to
            operational reliability within its domain. Risk weights are
            determined by the ARAF Technical Standards Board and are published
            as part of the standard.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Weight Tier
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Multiplier
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Criteria
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Critical
                </td>
                <td className="px-5 py-3 font-mono text-steel">3.0x</td>
                <td className="px-5 py-3 text-steel">
                  ACR failure could result in safety-critical consequences,
                  irreversible actions, or complete loss of operational
                  reliability. Includes all blocking ACRs.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">High</td>
                <td className="px-5 py-3 font-mono text-steel">2.0x</td>
                <td className="px-5 py-3 text-steel">
                  ACR failure would materially degrade operational reliability
                  or create conditions for cascading failures. Includes ACRs
                  governing core decision integrity and containment mechanisms.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Standard
                </td>
                <td className="px-5 py-3 font-mono text-steel">1.0x</td>
                <td className="px-5 py-3 text-steel">
                  ACR failure would reduce reliability below expected levels
                  but would not create immediate safety or containment risks.
                  The baseline weight for requirements that support operational
                  hygiene.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Advisory
                </td>
                <td className="px-5 py-3 font-mono text-steel">0.5x</td>
                <td className="px-5 py-3 text-steel">
                  ACR represents a best practice or forward-looking
                  requirement. Non-compliance reduces the domain score but is
                  unlikely to independently cause certification failure.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Blocking ACR Logic */}
      <section id="blocking-acrs" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#blocking-acrs"
            className="hover:text-navy transition-colors"
          >
            Blocking ACR Logic
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Certain ACRs are designated as <strong>blocking</strong> — meaning
            that a score of 0 (Non-Compliance) on any blocking ACR results in
            automatic certification denial, regardless of the aggregate domain
            score. Blocking ACRs represent requirements where non-compliance
            constitutes a fundamental reliability failure that cannot be
            compensated for by strong performance elsewhere.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Blocking ACR Rules
            </h3>
            <ul className="space-y-2">
              {[
                'A score of 0 on any blocking ACR results in automatic certification denial.',
                'A score of 1 (Partial Compliance) on a blocking ACR triggers a mandatory remediation requirement. The system may receive Conditional Certification with a defined remediation timeline not to exceed 90 days.',
                'Blocking ACR designations are level-dependent. An ACR that is blocking at L3 may not be blocking at L1.',
                'The set of blocking ACRs is published as part of the standard and cannot be waived by the evaluating AVB.',
                'Organizations may request a Blocking ACR Exception Review through ARAF governance channels, subject to TSB approval.',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-steel"
                >
                  <span className="text-slate-400 mt-0.5 shrink-0">
                    &bull;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border rounded-lg p-6 bg-slate-50">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Examples of Blocking ACR Categories
            </h3>
            <p className="text-sm text-steel mb-4">
              The following categories typically contain blocking ACRs.
              Specific blocking designations are defined per-ACR in the standard
              documentation.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
              {[
                'Autonomy boundary enforcement',
                'Emergency shutdown capability',
                'Human override responsiveness',
                'Unauthorized action prevention',
                'Critical failure containment',
                'Audit log integrity',
                'Escalation path availability',
                'Identity spoofing prevention',
              ].map((cat) => (
                <div
                  key={cat}
                  className="flex items-start gap-2.5 text-sm text-steel"
                >
                  <span className="text-slate-400 mt-0.5 shrink-0">
                    &bull;
                  </span>
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Red-Team Requirements by Level */}
      <section id="red-team" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#red-team" className="hover:text-navy transition-colors">
            Red-Team Requirements by Level
          </a>
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          Adversarial testing intensity is calibrated to the certification
          level. Higher certification levels require more extensive, more
          independent, and longer-duration adversarial engagements.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Requirement
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l1">L1</span>
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l2">L2</span>
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l3">L3</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Automated adversarial suite
                </td>
                <td className="px-5 py-3 text-steel">Required</td>
                <td className="px-5 py-3 text-steel">Required</td>
                <td className="px-5 py-3 text-steel">Required</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Human adversarial simulation
                </td>
                <td className="px-5 py-3 text-muted">Not required</td>
                <td className="px-5 py-3 text-steel">40+ hours minimum</td>
                <td className="px-5 py-3 text-steel">80+ hours minimum</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Independent red team
                </td>
                <td className="px-5 py-3 text-muted">Not required</td>
                <td className="px-5 py-3 text-muted">Not required</td>
                <td className="px-5 py-3 text-steel">
                  ARAF-approved independent red team required
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Continuous stress testing
                </td>
                <td className="px-5 py-3 text-muted">Not required</td>
                <td className="px-5 py-3 text-muted">Not required</td>
                <td className="px-5 py-3 text-steel">
                  30-day minimum runtime stress test
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Red team independence
                </td>
                <td className="px-5 py-3 text-muted">N/A</td>
                <td className="px-5 py-3 text-steel">
                  AVB assessors (structurally independent from applicant)
                </td>
                <td className="px-5 py-3 text-steel">
                  Third-party red team with no relationship to applicant or
                  AVB
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Social engineering testing
                </td>
                <td className="px-5 py-3 text-muted">Not required</td>
                <td className="px-5 py-3 text-steel">Basic probes</td>
                <td className="px-5 py-3 text-steel">
                  Full social engineering engagement
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Domain Scoring Thresholds */}
      <section id="thresholds" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#thresholds" className="hover:text-navy transition-colors">
            Domain Scoring Thresholds
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Each certification level prescribes minimum passing scores for each
            of the 15 applicable evaluation domains. These thresholds represent
            the floor of acceptable compliance — systems must meet or exceed
            every threshold to qualify. Thresholds are intentionally set to
            ensure that higher-stakes certifications demand proportionally
            higher reliability across all dimensions.
          </p>
          <p>
            For detailed domain threshold values by level, see the{' '}
            <Link href="/certification#domain-score-thresholds">
              Certification Levels
            </Link>{' '}
            page.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-3">
            Threshold Interpretation Rules
          </h3>
          <ul className="space-y-2">
            {[
              'A domain score below the threshold for any single domain results in certification failure for that level, regardless of scores in other domains.',
              'Domain scores are not averaged or aggregated. Each domain is independently gated.',
              'A system that fails a single domain may apply for Conditional Certification if the gap is minor and remediable within 90 days.',
              'Domain thresholds increase with certification level: L1 thresholds range from 55\u201375%, L2 from 70\u201385%, and L3 from 85\u201395%.',
              'Domain 14 (Data Privacy) and Domain 15 (Physical Safety) thresholds apply based on system profile and physical actuation capabilities respectively.',
            ].map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-2.5 text-sm text-steel"
              >
                <span className="text-slate-400 mt-0.5 shrink-0">&bull;</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Special Evaluation Guidance */}
      <section id="special-guidance" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#special-guidance"
            className="hover:text-navy transition-colors"
          >
            Special Evaluation Guidance
          </a>
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          Certain system categories require additional evaluation considerations
          beyond the standard 10-phase lifecycle. The following guidance applies
          to systems with specialized characteristics.
        </p>

        <div className="space-y-4">
          {specialGuidance.map((item) => (
            <div
              key={item.type}
              className="border border-border rounded-lg p-6"
            >
              <h3 className="text-base font-semibold text-charcoal mb-2">
                {item.type}
              </h3>
              <p className="text-sm text-steel leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Express Pathway */}
      <section id="express-pathway" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#express-pathway"
            className="hover:text-navy transition-colors"
          >
            Express Pathway — L1 Foundation
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            The Express Pathway provides a streamlined 3-4 week evaluation for
            low-risk systems seeking L1 Foundation certification. This pathway
            reduces evaluation overhead while maintaining certification rigor
            for systems that present minimal risk.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Eligibility Requirements
            </h3>
            <ul className="space-y-2">
              {[
                'Foundational (F) or Standard (S) system profile only',
                'Assurance Class A only (determined in Phase 2)',
                'No Domain 15 (Physical Safety) ACRs applicable',
                'System does not process sensitive personal data at scale',
                'No multi-agent orchestration capabilities',
              ].map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-2.5 text-sm text-steel"
                >
                  <span className="text-slate-400 mt-0.5 shrink-0">
                    &bull;
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Streamlined Process
            </h3>
            <ul className="space-y-2">
              {[
                'Combined Intake, Risk Classification, and Evidence Collection (1 week)',
                'Focused ACR evaluation against profile-specific subset (1\u20132 weeks)',
                'Automated adversarial testing only (3\u20135 days)',
                'Expedited scoring and issuance (2\u20133 days)',
                'Total timeline: 3\u20134 weeks end-to-end',
              ].map((step) => (
                <li
                  key={step}
                  className="flex items-start gap-2.5 text-sm text-steel"
                >
                  <span className="text-slate-400 mt-0.5 shrink-0">
                    &bull;
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <p className="text-sm text-steel leading-relaxed">
            <span className="font-semibold text-charcoal">Note:</span> Express
            Pathway certifications carry the same validity and registry status
            as standard L1 certifications. The pathway notation is recorded in
            the certification metadata but does not affect the certification
            designation or badge.
          </p>
        </div>
      </section>

      {/* Cross-references */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Related Documentation
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/certification"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Certification Levels
            </h3>
            <p className="text-xs text-muted">
              L1, L2, and L3 requirements, domain thresholds, and recertification rules.
            </p>
          </Link>
          <Link
            href="/certification/risk-classification"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Risk Classification
            </h3>
            <p className="text-xs text-muted">
              7-factor risk assessment methodology and Assurance Class determination.
            </p>
          </Link>
          <Link
            href="/monitoring"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Continuous Assurance Platform
            </h3>
            <p className="text-xs text-muted">
              Post-certification monitoring, CAPO oversight, and drift detection by Assurance Class.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
