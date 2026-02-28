import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Governance',
  description: 'ARAF governance structure, Technical Standards Board, and advisory bodies.',
};

const governanceBodies = [
  {
    name: 'Technical Standards Board (TSB)',
    members: '9–15 members',
    role: 'Ultimate technical authority over the ARA Standard. Responsible for standard development, revision, and ratification. Decisions on major revisions require supermajority (two-thirds) approval.',
    composition: 'Domain experts in autonomous systems, cybersecurity, safety engineering, risk management, and regulatory compliance. No more than one-third of members may be affiliated with any single organization or industry sector.',
    cadence: 'Quarterly plenary sessions. Working groups convene as needed.',
  },
  {
    name: 'Adversarial Testing Advisory Group (ATAG)',
    members: '5–9 members',
    role: 'Advises the TSB on adversarial testing methodologies, evolving threat landscapes, and red team validation requirements. Reviews and recommends updates to Domain 7 (Adversarial Robustness) requirements.',
    composition: 'Security researchers, red team practitioners, adversarial ML specialists, and penetration testing experts.',
    cadence: 'Monthly meetings. Ad hoc sessions for emerging threats.',
  },
  {
    name: 'Robotics & Physical Systems Council (RPSC)',
    members: '5–9 members',
    role: 'Advises on physical systems evaluation requirements, sensor-actuator reliability, and safety standards integration. Primary advisory body for Domain 13 (Physical Actuation Integrity).',
    composition: 'Robotics engineers, safety systems engineers, industrial automation specialists, and representatives from physical safety standards bodies.',
    cadence: 'Bi-monthly meetings.',
  },
  {
    name: 'Risk & Compliance Advisory Council (RCAC)',
    members: '5–9 members',
    role: 'Advises on regulatory alignment, risk management frameworks, and compliance methodology. Ensures the ARA Standard remains compatible with evolving regulatory requirements across jurisdictions.',
    composition: 'Regulatory affairs specialists, compliance officers, risk management professionals, and legal experts in AI governance.',
    cadence: 'Bi-monthly meetings. Regulatory watch reports quarterly.',
  },
  {
    name: 'Public Interest Oversight Panel (PIOP)',
    members: '5–7 members',
    role: 'Independent oversight body ensuring ARAF operates in the public interest. Reviews governance decisions, certification integrity, and organizational transparency. PIOP members cannot be employed by certified organizations.',
    composition: 'Consumer advocates, civil society representatives, academic researchers, and independent ethicists.',
    cadence: 'Quarterly reviews. Annual public transparency report.',
  },
];

const principles = [
  {
    name: 'Independence',
    description: 'ARAF is independent from any single commercial entity, vendor, government, or testing organization. No stakeholder group may exert undue influence over standard development or certification decisions.',
  },
  {
    name: 'Testability',
    description: 'Every requirement in the ARA Standard must be objectively testable. Opinion-based, subjective, or unfalsifiable requirements are not permitted. If a requirement cannot be evaluated through defined methods, it is not included.',
  },
  {
    name: 'Technology Neutrality',
    description: 'The standard evaluates behaviors and outcomes, not implementation methods. Any autonomous system — regardless of underlying architecture, training methodology, or deployment model — is evaluated against the same behavioral requirements.',
  },
  {
    name: 'Proportionality',
    description: 'Requirements are proportional to the risk profile and deployment context of the system under evaluation. Higher-stakes systems face more rigorous evaluation, while lower-risk systems are not burdened with unnecessary requirements.',
  },
  {
    name: 'Transparency',
    description: 'The standard, evaluation criteria, certification decisions, and public registry are openly accessible. ARAF does not operate behind closed doors. All major decisions are documented and published.',
  },
  {
    name: 'Continuous Validity',
    description: 'Certification is not a one-time event. Ongoing monitoring, drift detection, and periodic reassessment are integral to the ARA framework. A certified system must remain compliant throughout its certification period.',
  },
  {
    name: 'Harm Minimization',
    description: 'When ambiguity exists in the interpretation of a requirement, the interpretation that minimizes potential harm to affected parties shall be adopted.',
  },
];

export default function GovernancePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-8">
        <Link href="/" className="hover:text-charcoal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">Governance</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-charcoal mb-4">Governance</h1>
        <p className="text-base text-steel leading-relaxed mb-12">
          The Autonomous Reliability Assurance Foundation is governed by a
          multi-body structure designed to ensure independence, technical rigor,
          and public accountability. No single entity — commercial, governmental,
          or academic — controls the standard or its application.
        </p>

        {/* Governing Principles */}
        <section id="principles" className="mb-16">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            Governing Principles
          </h2>
          <div className="space-y-4">
            {principles.map((principle) => (
              <div key={principle.name} className="border border-border rounded-lg p-5">
                <h3 className="text-sm font-semibold text-charcoal mb-1">
                  {principle.name}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Governance Bodies */}
        <section id="bodies" className="mb-16">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            Governance Bodies
          </h2>
          <div className="space-y-8">
            {governanceBodies.map((body) => (
              <div key={body.name} id={body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="border-l-2 border-charcoal pl-6">
                <h3 className="text-base font-semibold text-charcoal mb-1">
                  {body.name}
                </h3>
                <p className="text-xs font-mono text-muted mb-3">{body.members}</p>
                <div className="space-y-3 text-sm text-steel leading-relaxed">
                  <div>
                    <span className="font-medium text-charcoal">Role: </span>
                    {body.role}
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Composition: </span>
                    {body.composition}
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">Cadence: </span>
                    {body.cadence}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Standard Development Process */}
        <section id="process" className="mb-16">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Standard Development Process
          </h2>
          <div className="prose">
            <p>
              Revisions to the ARA Standard follow a structured development
              process designed to balance thoroughness with responsiveness to
              the evolving autonomous systems landscape.
            </p>
            <ol>
              <li>
                <strong>Proposal.</strong> Any stakeholder may submit a revision
                proposal to the TSB. Proposals must include rationale, scope of
                impact, and draft requirement language.
              </li>
              <li>
                <strong>Working Group Review.</strong> The TSB assigns proposals
                to a working group for technical review, impact assessment, and
                draft development. Working groups may consult advisory bodies.
              </li>
              <li>
                <strong>Public Comment Period.</strong> Draft revisions are
                published for a minimum 60-day public comment period. All
                substantive comments receive documented responses.
              </li>
              <li>
                <strong>TSB Vote.</strong> Following public comment review, the
                TSB votes on adoption. Major revisions require supermajority
                (two-thirds). Minor revisions require simple majority.
              </li>
              <li>
                <strong>Publication.</strong> Adopted revisions are published
                with a defined effective date and transition period for
                currently certified systems.
              </li>
            </ol>
          </div>
        </section>

        {/* Normative References */}
        <section id="references" className="mb-16">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Normative References
          </h2>
          <p className="text-sm text-steel mb-4">
            The ARA Standard is developed with awareness of and alignment to
            the following international standards and frameworks:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border-dark">
                  <th className="text-left py-2 pr-4 font-semibold text-charcoal">Reference</th>
                  <th className="text-left py-2 font-semibold text-charcoal">Scope</th>
                </tr>
              </thead>
              <tbody className="text-steel">
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">ISO/IEC 27001:2022</td><td className="py-2">Information Security Management Systems</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">ISO/IEC 42001:2023</td><td className="py-2">AI Management Systems</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">ISO 22989:2022</td><td className="py-2">AI Concepts and Terminology</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">ISO/IEC 23894:2023</td><td className="py-2">AI Risk Management</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">NIST AI 100-1</td><td className="py-2">AI Risk Management Framework</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">NIST SP 800-53 Rev. 5</td><td className="py-2">Security and Privacy Controls</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">IEC 61508</td><td className="py-2">Functional Safety</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">EU AI Act (2024)</td><td className="py-2">AI Regulation</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4 font-mono text-xs">IEEE 7000-2021</td><td className="py-2">Ethical Concerns in System Design</td></tr>
                <tr><td className="py-2 pr-4 font-mono text-xs">SOC 2 Type II</td><td className="py-2">Trust Services Criteria</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <h2 className="text-xl font-semibold text-charcoal mb-4">Contact</h2>
          <div className="border border-border rounded-lg p-6">
            <p className="text-sm text-steel mb-4">
              For inquiries regarding the ARA Standard, governance structure,
              or ARAF operations:
            </p>
            <ul className="text-sm text-steel space-y-2">
              <li>
                <span className="font-medium text-charcoal">General Inquiries: </span>
                info@araf.org
              </li>
              <li>
                <span className="font-medium text-charcoal">Technical Standards: </span>
                standards@araf.org
              </li>
              <li>
                <span className="font-medium text-charcoal">Certification: </span>
                certification@araf.org
              </li>
              <li>
                <span className="font-medium text-charcoal">Public Comment: </span>
                comments@araf.org
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
