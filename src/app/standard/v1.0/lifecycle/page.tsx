import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Certification Lifecycle — ARA Standard v1.0',
  description:
    'The 10-phase certification lifecycle for ARA certification. From intake assessment through ongoing compliance monitoring.',
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
          <Link href="/standard/v1.0" className="hover:text-charcoal transition-colors">
            v1.0
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <span className="text-charcoal font-medium">Lifecycle</span>
        </li>
      </ol>
    </nav>
  );
}

interface Phase {
  number: number;
  name: string;
  duration: string;
  description: string;
  activities: string[];
  outputs: string[];
}

const phases: Phase[] = [
  {
    number: 1,
    name: 'Intake Assessment',
    duration: '1-2 weeks',
    description:
      'The certifying organization submits a formal intake request to an Authorized Verification Body (AVB). The AVB conducts a preliminary assessment of the system to determine scope, applicable certification level, and evaluation feasibility. This phase identifies whether the system is a candidate for ARA certification and which domains apply.',
    activities: [
      'Organization submits system description, deployment context, and requested certification level',
      'AVB reviews system architecture and operational scope documentation',
      'AVB determines applicable domains based on system category (Agent, Multi-Agent, Physical, Hybrid)',
      'Preliminary gap analysis identifies potential areas of non-compliance',
      'Engagement agreement is formalized with scope, timeline, and fee structure',
    ],
    outputs: [
      'Intake assessment report with feasibility determination',
      'Applicable domain and ACR mapping',
      'Preliminary evaluation plan and timeline',
      'Signed engagement agreement',
    ],
  },
  {
    number: 2,
    name: 'Documentation Review',
    duration: '2-4 weeks',
    description:
      'The AVB conducts a comprehensive review of the organization\'s technical and governance documentation. This phase evaluates the completeness and adequacy of evidence artifacts required by applicable ACRs before proceeding to active testing phases.',
    activities: [
      'Review of system architecture documentation and operational boundary declarations',
      'Assessment of governance framework documents, change management procedures, and incident response plans',
      'Verification of audit trail schemas, monitoring configurations, and telemetry pipeline specifications',
      'Review of credential lifecycle management, identity isolation, and permission boundary documentation',
      'Gap identification for missing or insufficient documentation',
    ],
    outputs: [
      'Documentation review report with completeness assessment',
      'Evidence gap register identifying required supplementary documentation',
      'Readiness determination for active evaluation phases',
    ],
  },
  {
    number: 3,
    name: 'Automated Testing',
    duration: '2-6 weeks',
    description:
      'ACRs designated with the Automated Testing (AT) evaluation method are assessed through structured test execution. The AVB either executes standardized test suites or reviews the organization\'s test results against defined acceptance criteria. This phase covers the majority of technical controls across all applicable domains.',
    activities: [
      'Execution of operational boundary enforcement tests',
      'Privilege escalation and identity isolation testing',
      'Graceful degradation and failure blast radius containment verification',
      'Prompt injection resistance and adversarial input testing',
      'Behavioral consistency testing under sustained load and temporal pressure',
      'Drift detection regression testing and data integrity verification',
      'API response validation and cross-system data flow integrity testing',
    ],
    outputs: [
      'Automated test execution report with pass/fail results for each AT-designated ACR',
      'Test coverage analysis mapping test cases to ACR requirements',
      'Deficiency notices for any failed controls',
    ],
  },
  {
    number: 4,
    name: 'Human Simulation Testing',
    duration: '2-4 weeks',
    description:
      'ACRs designated with the Human Simulation (HS) evaluation method are assessed through structured scenarios conducted by qualified human evaluators. These scenarios simulate realistic operational conditions including adversarial interactions, failure events, and edge cases that cannot be adequately assessed through automated testing alone.',
    activities: [
      'Value alignment constraint enforcement testing through adversarial scenario simulation',
      'Human override activation testing under nominal, degraded, and failure conditions',
      'Adversarial input behavioral robustness evaluation across input channels',
      'Safe state recovery verification following simulated failure events',
      'Contested decision arbitration protocol evaluation',
      'Emergency stop mechanism testing for physical systems (L3)',
      'Multi-agent permission boundary bypass scenario evaluation (L2/L3)',
    ],
    outputs: [
      'Human simulation test report with scenario descriptions and outcomes',
      'Evaluator assessment forms with structured scoring for each HS-designated ACR',
      'Behavioral observation notes and safety concern flags',
    ],
  },
  {
    number: 5,
    name: 'Evidence Inspection',
    duration: '1-3 weeks',
    description:
      'ACRs designated with the Evidence Inspection (EI) evaluation method are assessed through detailed examination of documentary evidence, configuration artifacts, and operational records. This phase validates that required infrastructure, processes, and documentation are in place and adequately maintained.',
    activities: [
      'Inspection of decision provenance chain records and tamper-evidence verification',
      'Review of behavioral drift baseline specifications with cryptographic signature verification',
      'Assessment of telemetry pipeline architecture and integrity verification mechanisms',
      'Audit trail completeness verification through sample reconstruction exercises',
      'Governance framework document review and role/authority matrix validation',
      'Algorithmic impact disclosure document assessment',
      'Supply chain integrity verification including SBOM review and vulnerability monitoring',
    ],
    outputs: [
      'Evidence inspection report with compliance assessment for each EI-designated ACR',
      'Evidence quality assessment with recommendations for improvement',
    ],
  },
  {
    number: 6,
    name: 'Continuous Monitoring Validation',
    duration: '4-12 weeks',
    description:
      'ACRs designated with the Continuous Monitoring (CM) evaluation method are assessed through analysis of telemetry and monitoring data collected over a defined observation period. This phase validates that ongoing monitoring infrastructure is operational and capable of detecting the conditions specified in applicable controls.',
    activities: [
      'Validation of resource exhaustion monitoring thresholds and shedding activation',
      'Continuous drift monitoring verification against certified behavioral baseline',
      'Data distribution shift detection capability assessment',
      'Anomaly detection effectiveness evaluation over the observation period',
      'Monitoring coverage verification across all declared operational parameters',
    ],
    outputs: [
      'Continuous monitoring validation report with telemetry analysis',
      'Monitoring coverage matrix mapping monitored parameters to ACR requirements',
      'Observation period summary with detected events and system responses',
    ],
  },
  {
    number: 7,
    name: 'Adversarial Evaluation',
    duration: '2-8 weeks',
    description:
      'For L2 and L3 certifications, structured adversarial evaluation is conducted to validate system resilience against deliberate attack. L2 requires a minimum of 40 hours of structured human adversarial simulation. L3 requires 80 or more hours plus an independent red team assessment approved by ARAF.',
    activities: [
      'Structured red team exercises targeting all adversarial robustness controls',
      'Multi-turn attack sequence evaluation including social engineering and role confusion',
      'Supply chain attack simulation and third-party component compromise testing',
      'For physical systems: adversarial example testing in perception pipelines',
      'Independent red team validation by ARAF-approved evaluators (L3 only)',
    ],
    outputs: [
      'Adversarial evaluation report with attack taxonomy coverage analysis',
      'Resistance rate calculations against known attack categories',
      'Independent red team report with findings and severity classifications (L3)',
      'Remediation recommendations for identified vulnerabilities',
    ],
  },
  {
    number: 8,
    name: 'Certification Decision',
    duration: '1-2 weeks',
    description:
      'The AVB consolidates all evaluation findings and renders a formal certification decision. The decision is one of: Certified (full compliance at the requested level), Conditionally Certified (minor non-compliances with mandated remediation), or Denied (blocking control failures or insufficient overall compliance).',
    activities: [
      'Consolidation of all evaluation phase reports into a comprehensive assessment',
      'Domain compliance score calculation using risk-weighted ACR results',
      'Comparison of domain scores against certification level thresholds',
      'Identification of any blocking control failures that mandate denial',
      'Formulation of conditions and remediation timelines for conditional certification',
      'Peer review of certification decision by a second qualified evaluator',
    ],
    outputs: [
      'Formal certification decision document',
      'Certification certificate with scope statement, level, and validity period',
      'Conditions register with remediation timelines (if conditionally certified)',
      'Denial rationale with specific control failures identified (if denied)',
      'Registry entry for certified systems',
    ],
  },
  {
    number: 9,
    name: 'Post-Certification Onboarding',
    duration: '2-4 weeks',
    description:
      'Following a positive certification decision, the certified organization completes onboarding into the ARA monitoring framework. This includes establishing continuous monitoring integrations, configuring alerting thresholds, and setting up the reporting cadence for the ongoing compliance monitoring phase.',
    activities: [
      'Configuration of continuous compliance monitoring integrations',
      'Establishment of drift detection baseline synchronization with monitoring infrastructure',
      'Configuration of alerting thresholds and notification channels',
      'Onboarding to the ARA public registry with verified certification details',
      'Distribution of ARA certification mark assets with usage guidelines',
      'Scheduling of first reassessment based on certification level requirements',
    ],
    outputs: [
      'Monitoring onboarding confirmation with integration verification',
      'Public registry entry with certification details',
      'Certification mark package with brand usage guidelines',
      'Reassessment schedule confirmation',
    ],
  },
  {
    number: 10,
    name: 'Ongoing Compliance Monitoring',
    duration: 'Continuous',
    description:
      'Certified systems are subject to ongoing compliance monitoring for the duration of their certification period. The monitoring cadence and depth are determined by the certification level: L1 annual, L2 semi-annual, L3 quarterly. Material changes to the system or its operating environment may trigger interim reassessment requirements.',
    activities: [
      'Continuous monitoring of behavioral drift against certified baseline',
      'Periodic reassessment at the cadence defined by the certification level',
      'Review of change management logs and incident response records',
      'Verification that conditional certification remediation has been completed on schedule',
      'Investigation of monitoring alerts that indicate potential compliance deviations',
      'Assessment of material changes that may affect certification scope or validity',
      'Certification renewal evaluation at the end of each certification period',
    ],
    outputs: [
      'Periodic compliance monitoring reports',
      'Reassessment results with updated compliance status',
      'Monitoring alert investigation reports',
      'Certification renewal decision at period expiry',
      'Registry status updates reflecting current compliance state',
    ],
  },
];

export default function LifecyclePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb />

      <div className="max-w-[72ch]">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          Certification Lifecycle
        </h1>
        <p className="text-steel leading-relaxed mb-10">
          The ARA certification lifecycle defines the end-to-end process for achieving and
          maintaining certification. It consists of 10 phases spanning from initial intake
          through ongoing compliance monitoring. Each phase produces specific outputs that
          feed into subsequent phases, creating a structured and auditable certification
          pathway.
        </p>

        {/* Phase overview */}
        <div className="mb-12 p-5 bg-slate-50 border border-border rounded-lg">
          <h2 className="text-sm font-semibold text-charcoal mb-3">Phase Overview</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {phases.map((phase) => (
              <li key={phase.number}>
                <a
                  href={`#phase-${phase.number}`}
                  className="flex items-center gap-2 text-sm text-muted hover:text-charcoal transition-colors py-1"
                >
                  <span className="font-mono text-xs font-semibold text-navy bg-white px-1.5 py-0.5 rounded border border-border w-6 text-center shrink-0">
                    {phase.number}
                  </span>
                  <span>{phase.name}</span>
                  <span className="text-xs text-slate-400 ml-auto">{phase.duration}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Phase details */}
        <div className="space-y-12">
          {phases.map((phase) => (
            <div
              key={phase.number}
              id={`phase-${phase.number}`}
              className="scroll-mt-24"
            >
              {/* Phase header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center font-mono text-sm font-bold text-white bg-charcoal w-8 h-8 rounded">
                  {phase.number}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-charcoal">
                    <a href={`#phase-${phase.number}`} className="group">
                      {phase.name}
                      <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-muted">#</span>
                    </a>
                  </h2>
                  <p className="text-xs text-muted">
                    Typical duration: {phase.duration}
                  </p>
                </div>
              </div>

              <p className="text-sm text-steel leading-relaxed mb-5">
                {phase.description}
              </p>

              {/* Activities */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Key Activities
                </h3>
                <ul className="space-y-1.5">
                  {phase.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-steel">
                      <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outputs */}
              <div className="bg-slate-50 border border-border rounded-lg p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Phase Outputs
                </h3>
                <ul className="space-y-1.5">
                  {phase.outputs.map((output, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-steel">
                      <span className="text-navy shrink-0 mt-0.5">&rarr;</span>
                      {output}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector line */}
              {phase.number < phases.length && (
                <div className="flex justify-center mt-6">
                  <div className="w-px h-8 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Duration summary */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Duration Estimates</h2>
          <p className="text-sm text-steel leading-relaxed mb-4">
            The total time from intake to certification decision varies by certification level
            and system complexity. The following are typical duration ranges:
          </p>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Level</th>
                  <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Typical Duration</th>
                  <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Reassessment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border-b border-border">
                    <span className="level-badge level-badge-l1">L1</span>
                    <span className="ml-2 text-muted">Supervised</span>
                  </td>
                  <td className="px-4 py-3 border-b border-border text-muted">8-16 weeks</td>
                  <td className="px-4 py-3 border-b border-border text-muted">Annual</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-border">
                    <span className="level-badge level-badge-l2">L2</span>
                    <span className="ml-2 text-muted">Bounded</span>
                  </td>
                  <td className="px-4 py-3 border-b border-border text-muted">14-26 weeks</td>
                  <td className="px-4 py-3 border-b border-border text-muted">Semi-annual</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <span className="level-badge level-badge-l3">L3</span>
                    <span className="ml-2 text-muted">High-Stakes</span>
                  </td>
                  <td className="px-4 py-3 text-muted">20-40 weeks</td>
                  <td className="px-4 py-3 text-muted">Quarterly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
