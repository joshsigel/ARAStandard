import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CertificationLifecycle } from '@/components/visualizations/CertificationLifecycle';

export const metadata: Metadata = {
  title: 'Certification Lifecycle',
  description:
    'The 10-phase certification lifecycle for ARA v1.1. From intake and risk classification through continuous monitoring and ecosystem participation.',
};

interface PhaseDescription {
  number: number;
  name: string;
  description: string;
  keyActivities: string[];
}

const phaseDescriptions: PhaseDescription[] = [
  {
    number: 1,
    name: 'Intake & Scoping',
    description:
      'The certifying organization submits a formal intake request to an Authorized Validation Body (AVB). The AVB reviews the system description, determines the applicable system profile (F/S/A/C), and establishes whether the certification will be a Deployment Certification or Platform Certification.',
    keyActivities: [
      'Submit system scope definition and deployment context',
      'AVB determines applicable system profile and certification type',
      'Engagement agreement formalized with timeline and fees',
    ],
  },
  {
    number: 2,
    name: 'Risk Classification',
    description:
      'The AVB conducts a mandatory 7-factor risk assessment to determine the appropriate Assurance Class (A, B, or C). The seven factors are: autonomy level, decision impact, data sensitivity, operational environment, human oversight capacity, reversibility, and scale. The determined class sets the ongoing monitoring intensity for the certified system.',
    keyActivities: [
      'AVB evaluates each of the 7 risk factors',
      'Assurance Class (A/B/C) determined and documented',
      'Risk classification rationale recorded for audit trail',
    ],
  },
  {
    number: 3,
    name: 'Evidence Collection',
    description:
      'The organization prepares evidence across four categories: Lifecycle Process (LP), Technical Implementation (TI), Operational Performance (OP), and Third-Party (TP). For systems built on certified platforms, ACR inheritance claims are documented and validated against the platform certification.',
    keyActivities: [
      'Assemble evidence portfolio across LP, TI, OP, and TP categories',
      'Document platform certification inheritance claims (if applicable)',
      'AVB conducts preliminary gap analysis on evidence completeness',
    ],
  },
  {
    number: 4,
    name: 'ACR Evaluation',
    description:
      'The AVB evaluates each applicable ACR using its designated evaluation method: Automated Testing (AT), Human Simulation (HS), Evidence Inspection (EI), Continuous Monitoring (CM), Third-Party Attestation (TP), or Operational Proof (OP). Domain scores are calculated based on risk-weighted ACR results.',
    keyActivities: [
      'Execute evaluation for each applicable ACR using designated method',
      'Calculate risk-weighted domain scores',
      'Document non-conformance findings with severity classification',
    ],
  },
  {
    number: 5,
    name: 'Adversarial Testing',
    description:
      'For L2 Operational and L3 Comprehensive certifications, structured adversarial evaluation validates system resilience. L2 requires structured red team exercises. L3 requires independent red team assessment by ARAF-approved evaluators with minimum 80 hours of testing.',
    keyActivities: [
      'Red team exercises targeting adversarial robustness controls',
      'Multi-turn attack sequence and manipulation resistance testing',
      'Independent red team validation for L3 certifications',
    ],
  },
  {
    number: 6,
    name: 'Scoring & Determination',
    description:
      'Final certification scores are calculated across all applicable domains. The risk-weighted composite score is compared against level thresholds to determine pass/fail. Blocking ACR failures result in automatic denial. Conditional certification is available for minor non-conformances on conditional ACRs.',
    keyActivities: [
      'Consolidate all evaluation results into certification scorecard',
      'Compare domain scores against certification level thresholds',
      'Render certification decision: Certified, Conditional, or Denied',
    ],
  },
  {
    number: 7,
    name: 'Certification Issuance',
    description:
      'The certification designation is issued (e.g., "L2-B Deployment"). A living badge is generated with operational state tracking. The system is registered in the ARA public registry. For Assurance Class B and C, CAPO engagement is initiated.',
    keyActivities: [
      'Issue certification designation with level, class, and type',
      'Generate living certification badge',
      'Publish registry entry and initiate CAPO onboarding (Class B/C)',
    ],
  },
  {
    number: 8,
    name: 'Continuous Monitoring',
    description:
      'Post-certification monitoring intensity is determined by the Assurance Class. Class A: periodic self-assessment with annual review. Class B: monthly CAPO check-ins with telemetry integration. Class C: 24/7 CAPO oversight with real-time alerting and immediate escalation pathways.',
    keyActivities: [
      'Monitor behavioral drift against certified baseline',
      'CAPO telemetry integration and alerting (Class B/C)',
      'Investigate monitoring alerts indicating compliance deviations',
    ],
  },
  {
    number: 9,
    name: 'Renewal & Revalidation',
    description:
      'Certification validity varies by level: L1 Foundation (24 months), L2 Operational (18 months), L3 Comprehensive (12 months). Revalidation is triggered by material changes, assurance class lapse, or version updates. The Express Pathway is available for L1 renewals meeting eligibility criteria.',
    keyActivities: [
      'Scheduled renewal evaluation before certification expiry',
      'Material change assessment and revalidation when triggered',
      'Version migration evaluation when standard is updated',
    ],
  },
  {
    number: 10,
    name: 'Ecosystem Participation',
    description:
      'Certified organizations participate in the broader ARA ecosystem including insurance partnerships through Recognized Insurer Partners (RIPs), consortium membership, regulatory equivalence claims via framework crosswalk mappings, and marketplace listings.',
    keyActivities: [
      'Insurance eligibility assessment with RIP partners',
      'Consortium membership and working group participation',
      'Regulatory framework equivalence claims via crosswalk mappings',
    ],
  },
];

export default function LifecyclePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1', href: '/standard/v1.1' },
          { label: 'Certification Lifecycle' },
        ]}
        className="mb-8"
      />

      <div className="max-w-[72ch]">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          Certification Lifecycle
        </h1>
        <p className="text-steel leading-relaxed mb-10">
          The ARA v1.1 certification lifecycle defines the end-to-end process for achieving and
          maintaining certification under the two-axis model. It consists of 10 phases spanning
          from initial intake through ongoing ecosystem participation. Each phase produces
          specific outputs that feed into subsequent phases.
        </p>

        {/* Interactive lifecycle visualization */}
        <div className="mb-12">
          <CertificationLifecycle className="max-w-[72ch]" />
        </div>

        {/* Detailed phase descriptions */}
        <h2 className="text-lg font-semibold text-charcoal mb-6">Phase Details</h2>
        <div className="space-y-10">
          {phaseDescriptions.map((phase) => (
            <div
              key={phase.number}
              id={`phase-${phase.number}`}
              className="scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center justify-center font-mono text-sm font-bold text-white bg-charcoal w-8 h-8 rounded">
                  {phase.number}
                </span>
                <h3 className="text-base font-semibold text-charcoal">
                  {phase.name}
                </h3>
              </div>

              <p className="text-sm text-steel leading-relaxed mb-4">
                {phase.description}
              </p>

              <div className="bg-slate-50 border border-border rounded-lg p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Key Activities
                </h4>
                <ul className="space-y-1.5">
                  {phase.keyActivities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-steel">
                      <span className="text-navy shrink-0 mt-0.5">&rarr;</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Duration summary */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Duration Estimates</h2>
          <p className="text-sm text-steel leading-relaxed mb-4">
            Total time from intake to certification varies by level, system profile, and
            certification type. The Express Pathway is available for L1 Foundation.
          </p>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Level</th>
                  <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Typical Duration</th>
                  <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Validity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border-b border-border">
                    <span className="level-badge level-badge-l1">L1</span>
                    <span className="ml-2 text-muted">Foundation</span>
                  </td>
                  <td className="px-4 py-3 border-b border-border text-muted">3-4 weeks (Express) / 8-12 weeks</td>
                  <td className="px-4 py-3 border-b border-border text-muted">24 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border-b border-border">
                    <span className="level-badge level-badge-l2">L2</span>
                    <span className="ml-2 text-muted">Operational</span>
                  </td>
                  <td className="px-4 py-3 border-b border-border text-muted">12-20 weeks</td>
                  <td className="px-4 py-3 border-b border-border text-muted">18 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <span className="level-badge level-badge-l3">L3</span>
                    <span className="ml-2 text-muted">Comprehensive</span>
                  </td>
                  <td className="px-4 py-3 text-muted">18-32 weeks</td>
                  <td className="px-4 py-3 text-muted">12 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="text-base font-semibold text-charcoal mb-4">Related Pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/evaluation"
              className="text-sm text-navy hover:underline"
            >
              Evaluation Process &rarr;
            </Link>
            <Link
              href="/certification"
              className="text-sm text-navy hover:underline"
            >
              Certification Overview &rarr;
            </Link>
            <Link
              href="/monitoring"
              className="text-sm text-navy hover:underline"
            >
              Monitoring Framework &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
