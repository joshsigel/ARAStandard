import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Evaluation Methodology',
  description:
    'The ARA certification lifecycle: 10-phase evaluation process, scoring methodology, adversarial testing requirements, and domain scoring thresholds for autonomous system certification.',
};

const phases = [
  {
    number: 1,
    name: 'System Registration',
    description:
      'The applicant organization submits a registration request through an Authorized Validation Body (AVB). The system is assigned a unique ARA System Identifier (ASI) that persists across all evaluation, certification, and monitoring records. Registration captures the system name, declared autonomy level, operational scope, deployment context, and the identity of the submitting organization.',
    duration: '1\u20132 business days',
    outputs: ['Unique ARA System Identifier (ASI)', 'Registration confirmation record', 'Assigned AVB acknowledgment'],
  },
  {
    number: 2,
    name: 'Risk Classification',
    description:
      'The AVB reviews the declared certification level (L1, L2, or L3) against the system\u2019s operational characteristics, autonomy boundaries, deployment context, and consequence profile. This phase confirms that the requested level is appropriate for the system\u2019s risk exposure. Systems that under-classify may be escalated; systems that over-classify are flagged for scope correction.',
    duration: '3\u20135 business days',
    outputs: ['Confirmed certification level', 'Risk classification rationale document', 'Escalation notice (if applicable)'],
  },
  {
    number: 3,
    name: 'Domain Mapping',
    description:
      'The evaluation scope is determined by mapping the system\u2019s capabilities, integrations, and deployment context to the applicable ARA evaluation domains. All L1 and L2 systems are evaluated against the 12 core domains. L3 systems with physical actuation capabilities are additionally evaluated against Domain 13. Domain mapping defines the ACR subset and scoring thresholds that apply to this specific evaluation.',
    duration: '3\u20135 business days',
    outputs: ['Domain applicability matrix', 'Applicable ACR inventory', 'Scope statement document'],
  },
  {
    number: 4,
    name: 'ACR Evaluation',
    description:
      'The core evaluation phase. Each applicable Autonomy Compliance Requirement is assessed using one or more evaluation methods (Automated Testing, Human Simulation, Evidence Inspection, or Continuous Monitoring). The AVB evaluates compliance against the defined acceptance criteria for each ACR, records evidence, and assigns per-ACR scores. This phase accounts for the majority of evaluation calendar time.',
    duration: '4\u20138 weeks (L1), 8\u201314 weeks (L2), 12\u201320 weeks (L3)',
    outputs: ['Per-ACR compliance scores', 'Evidence artifact repository', 'Non-conformity register', 'Interim findings report'],
  },
  {
    number: 5,
    name: 'Adversarial Simulation',
    description:
      'Structured adversarial testing proportional to the certification level. L1 evaluations use automated adversarial test suites only. L2 evaluations add structured human adversarial simulation (minimum 40 hours). L3 evaluations require automated suites, human adversarial simulation (minimum 80 hours), an ARAF-approved independent red team engagement, and a minimum 30-day continuous runtime stress test.',
    duration: '1\u20132 weeks (L1), 3\u20134 weeks (L2), 6\u20138 weeks (L3)',
    outputs: ['Adversarial test results', 'Vulnerability findings log', 'Red team report (L3)', 'Stress test telemetry (L3)'],
  },
  {
    number: 6,
    name: 'Human Expert Review',
    description:
      'Qualified human assessors review all evaluation findings, adversarial simulation results, and supporting evidence. The review panel must include at least one domain expert for each applicable evaluation domain. Reviewers verify that automated test results are consistent with observed system behavior, validate evidence integrity, and assess whether borderline findings warrant compliance or non-conformity classification.',
    duration: '1\u20132 weeks',
    outputs: ['Expert review findings', 'Evidence validation attestation', 'Borderline adjudication records'],
  },
  {
    number: 7,
    name: 'Certification Decision',
    description:
      'The AVB issues a formal certification decision based on the aggregate evaluation record. Four outcomes are possible: Certified (all domain thresholds met, no blocking ACR failures), Conditionally Certified (minor non-conformities with defined remediation timeline), Deferred (material gaps requiring re-evaluation of specific domains), or Denied (fundamental non-compliance or blocking ACR failures).',
    outputs: ['Certification decision document', 'Conditions register (if applicable)', 'Remediation timeline (if applicable)', 'Appeal eligibility notice'],
  },
  {
    number: 8,
    name: 'Registry Publication',
    description:
      'Certified and conditionally certified systems are published in the ARA Public Certification Registry. The registry entry includes the system identifier, organization name, certification level, certified scope, effective date, expiry date, certifying AVB, and current status. Registry entries are publicly queryable and machine-readable via the Registry API.',
    outputs: ['Public registry entry', 'Certification ID (e.g., ARA-2026-XXXXX)', 'Embeddable certification badge', 'Machine-readable registry record'],
  },
  {
    number: 9,
    name: 'Continuous Monitoring Enrollment',
    description:
      'The certified organization deploys the ARA Telemetry SDK within the production environment and configures continuous monitoring integrations. The SDK reports operational telemetry, drift metrics, and compliance signals to the Continuous Assurance Platform (CAP). Monitoring enrollment must be completed within 30 days of certification issuance.',
    outputs: ['Telemetry SDK deployment confirmation', 'CAP enrollment record', 'Monitoring baseline established', 'Alert threshold configuration'],
  },
  {
    number: 10,
    name: 'Reassessment',
    description:
      'Ongoing reassessment ensures continued compliance throughout the certification period. L1 systems undergo annual reassessment. L2 systems undergo semi-annual reassessment (every 6 months). L3 systems undergo quarterly reassessment (every 3 months). Reassessment may be accelerated if continuous monitoring detects material drift, behavioral anomalies, or compliance threshold breaches.',
    outputs: ['Reassessment report', 'Updated compliance scores', 'Certification renewal or escalation', 'Updated registry entry'],
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
];

function LifecycleDiagram() {
  return (
    <div className="my-10 overflow-x-auto">
      <svg
        viewBox="0 0 920 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-4xl mx-auto"
        role="img"
        aria-label="10-phase certification lifecycle diagram showing sequential phases from Registration to Reassessment"
      >
        {phases.map((phase, i) => {
          const cx = 50 + i * 92;
          const cy = 60;
          return (
            <g key={phase.number}>
              {/* Connector line */}
              {i > 0 && (
                <line
                  x1={cx - 92 + 18}
                  y1={cy}
                  x2={cx - 18}
                  y2={cy}
                  stroke="#C8CCD2"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              )}
              {/* Circle */}
              <circle
                cx={cx}
                cy={cy}
                r="18"
                fill={phase.number <= 7 ? '#1A2333' : '#111111'}
                stroke={phase.number <= 7 ? '#1A2333' : '#3A3A3A'}
                strokeWidth="1.5"
              />
              {/* Number */}
              <text
                x={cx}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="12"
                fontWeight="700"
                fontFamily="var(--font-mono), monospace"
              >
                {phase.number}
              </text>
              {/* Label */}
              <text
                x={cx}
                y={cy + 38}
                textAnchor="middle"
                fill="#3A3A3A"
                fontSize="9"
                fontWeight="500"
                fontFamily="var(--font-sans), sans-serif"
              >
                {phase.name.length > 14
                  ? phase.name.split(' ').reduce((lines: string[], word: string) => {
                      const last = lines[lines.length - 1];
                      if (last && (last + ' ' + word).length <= 14) {
                        lines[lines.length - 1] = last + ' ' + word;
                      } else {
                        lines.push(word);
                      }
                      return lines;
                    }, []).map((line: string, li: number) => (
                      <tspan key={li} x={cx} dy={li === 0 ? 0 : 12}>
                        {line}
                      </tspan>
                    ))
                  : phase.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function EvaluationPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted">
          <li>
            <Link href="/" className="hover:text-charcoal transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-charcoal font-medium">Evaluation</li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Evaluation Methodology
        </h1>
        <div className="prose max-w-3xl">
          <p>
            The ARA Standard defines a structured, repeatable evaluation process
            for certifying autonomous systems. Every system undergoes the same
            10-phase certification lifecycle, adapted in rigor and scope to the
            requested certification level. The methodology is designed to be
            technology-neutral, evidence-based, and independently verifiable.
          </p>
          <p>
            Evaluations are conducted by Authorized Validation Bodies (AVBs) —
            independent organizations accredited by ARAF to perform certification
            assessments. AVBs must maintain structural independence from the
            organizations whose systems they evaluate.
          </p>
        </div>
      </header>

      {/* Certification Lifecycle */}
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
          certification level, system complexity, and the availability of
          evidence and test environments.
        </p>

        <LifecycleDiagram />

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
          methods may be applied to a single ACR for corroboration.
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
            The ARA scoring model produces per-domain compliance scores that are
            aggregated into an overall certification determination. The model is
            designed to be transparent, deterministic, and reproducible across
            different AVBs evaluating the same system.
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
            applicable evaluation domain. These thresholds represent the floor
            of acceptable compliance — systems must meet or exceed every
            threshold to qualify. Thresholds are intentionally set to ensure
            that higher-stakes certifications demand proportionally higher
            reliability across all dimensions.
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
              'Domain 13 (Physical Actuation Safety) thresholds apply only to L3 systems with physical actuation capabilities.',
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
            href="/avb"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              AVB Program
            </h3>
            <p className="text-xs text-muted">
              How to become an Authorized Validation Body and AVB authorization levels.
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
              Post-certification monitoring, telemetry SDK, and drift detection.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
