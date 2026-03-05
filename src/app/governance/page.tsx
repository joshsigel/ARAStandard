import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Governance Framework — v1.1',
  description:
    'ARAF governance structure: Technical Standards Board, participant categories, advisory bodies, marketplace principles, and governance evolution roadmap.',
};

const principles = [
  {
    name: 'Independence',
    description:
      'ARAF is independent from any single commercial entity, vendor, government, or testing organization. No stakeholder group may exert undue influence over standard development or certification decisions.',
  },
  {
    name: 'Testability',
    description:
      'Every requirement in the ARA Standard must be objectively testable. Opinion-based, subjective, or unfalsifiable requirements are not permitted. If a requirement cannot be evaluated through defined methods, it is not included.',
  },
  {
    name: 'Technology Neutrality',
    description:
      'The standard evaluates behaviors and outcomes, not implementation methods. Any autonomous system — regardless of underlying architecture, training methodology, or deployment model — is evaluated against the same behavioral requirements.',
  },
  {
    name: 'Proportionality',
    description:
      'Requirements are proportional to the risk profile and deployment context of the system under evaluation. Higher-stakes systems face more rigorous evaluation, while lower-risk systems are not burdened with unnecessary requirements.',
  },
  {
    name: 'Transparency',
    description:
      'The standard, evaluation criteria, certification decisions, and public registry are openly accessible. ARAF does not operate behind closed doors. All major decisions are documented and published.',
  },
  {
    name: 'Continuous Validity',
    description:
      'Certification is not a one-time event. Ongoing monitoring, drift detection, and periodic reassessment are integral to the ARA framework. A certified system must remain compliant throughout its certification period.',
  },
  {
    name: 'Harm Minimization',
    description:
      'When ambiguity exists in the interpretation of a requirement, the interpretation that minimizes potential harm to affected parties shall be adopted.',
  },
];

const participantCategories = [
  {
    name: 'Technical Standards Board (TSB)',
    members: '9–15 members',
    role: 'Ultimate technical authority over the ARA Standard. Responsible for standard development, revision, and ratification. Decisions on major revisions require supermajority (two-thirds) approval.',
    composition:
      'Domain experts in autonomous systems, cybersecurity, safety engineering, risk management, and regulatory compliance. No more than one-third of members may be affiliated with any single organization or industry sector.',
    cadence: 'Quarterly plenary sessions. Working groups convene as needed.',
    link: null,
  },
  {
    name: 'Authorized Validation Bodies (AVBs)',
    members: 'Accredited organizations',
    role: 'Organizations authorized by ARAF to conduct ARA evaluations and issue certifications. AVBs must meet competence, independence, and quality management requirements. Each AVB is subject to periodic ARAF oversight audits.',
    composition:
      'Assessment firms, testing laboratories, and specialized consultancies with demonstrated expertise in autonomous system evaluation.',
    cadence: 'Ongoing operations. Annual ARAF accreditation review.',
    link: '/avb',
  },
  {
    name: 'Certified Assurance Platform Operators (CAPOs)',
    members: 'Certified organizations — New in v1.1',
    role: 'Organizations certified by ARAF to provide continuous monitoring infrastructure and assurance services for Class B (Monitored) and Class C (Continuous) certified systems. CAPOs must meet technical SLA requirements including telemetry ingestion, anomaly detection, dashboarding, alerting, and reporting capabilities.',
    composition:
      'Monitoring platform providers, managed security service providers, and observability vendors with demonstrated infrastructure for continuous assurance.',
    cadence:
      'Ongoing operations. Class B: 99.5% uptime SLA. Class C: 99.9% uptime SLA. Annual ARAF certification review.',
    link: '/ecosystem/capos',
  },
  {
    name: 'Recognized Insurer Partners (RIPs)',
    members: 'Recognized organizations — New in v1.1',
    role: 'Insurance providers who accept ARA certification data for underwriting decisions related to autonomous system liability, operational risk, and technology errors & omissions coverage. RIPs receive structured certification data through the ARAF data exchange.',
    composition:
      'Insurance carriers, managing general agents, and specialty underwriters with technology risk portfolios.',
    cadence: 'Ongoing. Annual recognition renewal.',
    link: '/ecosystem/insurers',
  },
  {
    name: 'Certified Organizations',
    members: 'Organizations holding ARA certifications',
    role: 'Organizations whose autonomous systems have been evaluated and certified under the ARA Standard. Listed in the public ARA Registry. Responsible for maintaining compliance throughout the certification period, including monitoring obligations per their Assurance Class.',
    composition:
      'Any organization deploying autonomous systems that has successfully completed ARA evaluation.',
    cadence:
      'Certification validity per Assurance Class. Monitoring obligations ongoing.',
    link: '/registry',
  },
  {
    name: 'Consortium Members',
    members: 'Tiered membership',
    role: 'Organizations contributing to standard development and ecosystem growth. Consortium members participate in working groups, public comment processes, and governance elections. Three tiers: Founding Members (charter participants with permanent TSB nomination rights), Contributing Members (active participants with working group access), and Observer Members (read-only access to development processes).',
    composition:
      'Technology companies, research institutions, government agencies, and civil society organizations.',
    cadence:
      'Annual consortium assembly. Working group participation ongoing.',
    link: null,
  },
];

const advisoryBodies = [
  {
    name: 'Adversarial Testing Advisory Group (ATAG)',
    members: '5–9 members',
    role: 'Advises the TSB on adversarial testing methodologies, evolving threat landscapes, and red team validation requirements. Reviews and recommends updates to Domain 7 (Adversarial Robustness) requirements.',
    composition:
      'Security researchers, red team practitioners, adversarial ML specialists, and penetration testing experts.',
    cadence: 'Monthly meetings. Ad hoc sessions for emerging threats.',
    isNew: false,
  },
  {
    name: 'Robotics & Physical Systems Council (RPSC)',
    members: '5–9 members',
    role: 'Advises on physical systems evaluation requirements, sensor-actuator reliability, and safety standards integration. Primary advisory body for Domain 14 (Physical Actuation Integrity).',
    composition:
      'Robotics engineers, safety systems engineers, industrial automation specialists, and representatives from physical safety standards bodies.',
    cadence: 'Bi-monthly meetings.',
    isNew: false,
  },
  {
    name: 'Data Privacy & Societal Impact Committee (DPSIC)',
    members: '7–11 members — New in v1.1',
    role: 'Advises the TSB on requirements related to Domain 5 (Data Privacy & Consent) and Domain 15 (Societal Impact Assessment). Provides guidance on privacy engineering best practices, consent architectures, algorithmic fairness, community impact evaluation, and regulatory alignment with global privacy frameworks.',
    composition:
      'Privacy engineers, ethicists, social scientists, regulatory experts, and representatives from data protection authorities.',
    cadence: 'Bi-monthly meetings. Annual privacy landscape review.',
    isNew: true,
  },
  {
    name: 'Risk & Compliance Advisory Council (RCAC)',
    members: '5–9 members',
    role: 'Advises on regulatory alignment, risk management frameworks, and compliance methodology. Ensures the ARA Standard remains compatible with evolving regulatory requirements across jurisdictions.',
    composition:
      'Regulatory affairs specialists, compliance officers, risk management professionals, and legal experts in AI governance.',
    cadence: 'Bi-monthly meetings. Regulatory watch reports quarterly.',
    isNew: false,
  },
  {
    name: 'Public Interest Oversight Panel (PIOP)',
    members: '5–7 members',
    role: 'Independent oversight body ensuring ARAF operates in the public interest. Reviews governance decisions, certification integrity, and organizational transparency. PIOP members cannot be employed by certified organizations.',
    composition:
      'Consumer advocates, civil society representatives, academic researchers, and independent ethicists.',
    cadence: 'Quarterly reviews. Annual public transparency report.',
    isNew: false,
  },
];

export default function GovernancePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Governance' }]}
        className="mb-8"
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-charcoal mb-4">
          Governance Framework — v1.1
        </h1>
        <p className="text-base text-steel leading-relaxed mb-12">
          The Autonomous Reliability Assurance Foundation is governed by a
          multi-body structure designed to ensure independence, technical rigor,
          and public accountability. No single entity — commercial, governmental,
          or academic — controls the standard or its application. In v1.1, the
          governance framework expands to accommodate new ecosystem participants
          including Certified Assurance Platform Operators (CAPOs) and
          Recognized Insurer Partners (RIPs).
        </p>

        {/* Governing Principles */}
        <section id="principles" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            <a
              href="#principles"
              className="hover:text-navy transition-colors"
            >
              Governing Principles
            </a>
          </h2>
          <div className="space-y-4">
            {principles.map((principle) => (
              <div
                key={principle.name}
                className="border border-border rounded-lg p-5"
              >
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

        {/* Participant Categories */}
        <section id="participants" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            <a
              href="#participants"
              className="hover:text-navy transition-colors"
            >
              Participant Categories
            </a>
          </h2>
          <p className="text-sm text-muted mb-6">
            The ARA ecosystem comprises six participant categories, each with
            defined roles, responsibilities, and governance relationships.
          </p>
          <div className="space-y-8">
            {participantCategories.map((category, index) => (
              <div
                key={category.name}
                id={category.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')}
                className="border-l-2 border-charcoal pl-6"
              >
                <div className="flex items-start gap-3 mb-1">
                  <span className="text-xs font-mono text-muted mt-0.5">
                    {index + 1}.
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-charcoal mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs font-mono text-muted mb-3">
                      {category.members}
                    </p>
                    <div className="space-y-3 text-sm text-steel leading-relaxed">
                      <div>
                        <span className="font-medium text-charcoal">
                          Role:{' '}
                        </span>
                        {category.role}
                      </div>
                      <div>
                        <span className="font-medium text-charcoal">
                          Composition:{' '}
                        </span>
                        {category.composition}
                      </div>
                      <div>
                        <span className="font-medium text-charcoal">
                          Cadence:{' '}
                        </span>
                        {category.cadence}
                      </div>
                      {category.link && (
                        <div>
                          <Link
                            href={category.link}
                            className="text-sm text-navy font-medium hover:underline"
                          >
                            Learn more &rarr;
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advisory Bodies */}
        <section id="advisory-bodies" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            <a
              href="#advisory-bodies"
              className="hover:text-navy transition-colors"
            >
              Advisory Bodies
            </a>
          </h2>
          <p className="text-sm text-muted mb-6">
            Advisory bodies provide specialized expertise to the TSB on matters
            within their domain. They do not have binding authority but their
            recommendations carry significant weight in TSB deliberations.
          </p>
          <div className="space-y-8">
            {advisoryBodies.map((body) => (
              <div
                key={body.name}
                id={body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="border-l-2 border-charcoal pl-6"
              >
                <h3 className="text-base font-semibold text-charcoal mb-1">
                  {body.name}
                  {body.isNew && (
                    <span className="ml-2 text-[10px] font-mono font-semibold uppercase tracking-wider bg-navy text-white px-1.5 py-0.5 rounded">
                      New
                    </span>
                  )}
                </h3>
                <p className="text-xs font-mono text-muted mb-3">
                  {body.members}
                </p>
                <div className="space-y-3 text-sm text-steel leading-relaxed">
                  <div>
                    <span className="font-medium text-charcoal">Role: </span>
                    {body.role}
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">
                      Composition:{' '}
                    </span>
                    {body.composition}
                  </div>
                  <div>
                    <span className="font-medium text-charcoal">
                      Cadence:{' '}
                    </span>
                    {body.cadence}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marketplace Principles */}
        <section id="marketplace" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            <a
              href="#marketplace"
              className="hover:text-navy transition-colors"
            >
              Marketplace Principles
            </a>
          </h2>
          <p className="text-sm text-muted mb-6">
            New in v1.1. ARAF operates an open marketplace where ecosystem
            participants compete on quality, not preferential access.
          </p>
          <div className="space-y-4">
            {[
              {
                principle: 'Open Competition',
                description:
                  'No preferential treatment for any AVB, CAPO, or RIP. All ecosystem participants compete on the quality of their services. ARAF does not recommend specific providers.',
              },
              {
                principle: 'Transparent Pricing',
                description:
                  'All ARAF fees — including accreditation, certification, and registry listing fees — are published and uniformly applied. No hidden charges or volume-based preferential pricing.',
              },
              {
                principle: 'No Exclusive Territories',
                description:
                  'Multiple AVBs and CAPOs may serve any region or industry vertical. Geographic or sector exclusivity is not granted to any ecosystem participant.',
              },
              {
                principle: 'Interoperability',
                description:
                  'Certification data is portable between ecosystem participants. Organizations are not locked into any specific AVB, CAPO, or tooling provider. Open schemas ensure data exchange.',
              },
              {
                principle: 'Appeals Process',
                description:
                  'All certification decisions, accreditation outcomes, and governance actions are appealable through a documented process. Appeals are heard by an independent panel drawn from the TSB.',
              },
            ].map((item) => (
              <div
                key={item.principle}
                className="border border-border rounded-lg p-5"
              >
                <h3 className="text-sm font-semibold text-charcoal mb-1">
                  {item.principle}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interoperability & Portability */}
        <section id="interoperability" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            <a
              href="#interoperability"
              className="hover:text-navy transition-colors"
            >
              Interoperability &amp; Portability
            </a>
          </h2>
          <p className="text-sm text-muted mb-6">
            New in v1.1. Certification data and ecosystem relationships are
            designed for portability, preventing vendor lock-in at every layer.
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'Open Certification Schema',
                description:
                  'Certification records follow an open, published schema. Any authorized consumer (AVBs, CAPOs, RIPs, regulators) can ingest and process certification data without proprietary tooling.',
              },
              {
                title: 'AVB Switching at Renewal',
                description:
                  'Organizations may switch their certifying AVB at any renewal point. The outgoing AVB must provide a complete certification history package within 30 days of the switch request.',
              },
              {
                title: 'Platform Certification Portability',
                description:
                  'Platform certifications are portable across deployments. A platform vendor\u2019s certification applies to any deployment built on that platform, subject to the deployment\u2019s own evaluation of non-inherited domains.',
              },
              {
                title: 'CAPO Switching',
                description:
                  'Organizations may switch CAPOs with a 30-day transition period. The outgoing CAPO must maintain monitoring during the transition and provide a full telemetry and compliance data export.',
              },
              {
                title: 'Data Ownership',
                description:
                  'Organizations own their certification data, telemetry data, and evaluation records. Any ecosystem participant holding organizational data must provide a complete export upon request within 30 days.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border rounded-lg p-5"
              >
                <h3 className="text-sm font-semibold text-charcoal mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Standard Development Process */}
        <section id="process" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            <a
              href="#process"
              className="hover:text-navy transition-colors"
            >
              Standard Development Process
            </a>
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

        {/* Governance Evolution Roadmap */}
        <section id="roadmap" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-2">
            <a
              href="#roadmap"
              className="hover:text-navy transition-colors"
            >
              Governance Evolution Roadmap
            </a>
          </h2>
          <p className="text-sm text-muted mb-6">
            ARAF governance is designed to evolve with the ecosystem. The
            roadmap below outlines the planned expansion of governance
            structures.
          </p>

          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">
                  Current
                </span>
                <h3 className="text-base font-semibold text-charcoal">
                  Phase 1: Foundation Governance
                </h3>
              </div>
              <p className="text-sm text-steel leading-relaxed">
                Core governance structures operational: Technical Standards Board,
                Authorized Validation Bodies, basic advisory bodies (ATAG, RPSC,
                RCAC, PIOP). Standard development process established.
                Public registry and certification lifecycle in place.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                  2026–2027
                </span>
                <h3 className="text-base font-semibold text-charcoal">
                  Phase 2: Ecosystem Expansion
                </h3>
              </div>
              <p className="text-sm text-steel leading-relaxed">
                Introduction of CAPOs and RIPs as formal ecosystem participants.
                DPSIC advisory body established. Consortium membership program
                formalized with tiered structure. Marketplace principles
                codified. Interoperability standards published for data exchange
                between ecosystem participants.
              </p>
            </div>

            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-semibold bg-slate-100 text-slate-600 border border-slate-300 px-2 py-0.5 rounded">
                  2027+
                </span>
                <h3 className="text-base font-semibold text-charcoal">
                  Phase 3: Global Federation
                </h3>
              </div>
              <p className="text-sm text-steel leading-relaxed">
                Regional governance bodies established for major jurisdictions.
                Mutual recognition agreements with international standards
                bodies. Federated TSB structure with regional representation.
                Cross-border certification portability framework. Alignment
                with emerging international AI governance frameworks.
              </p>
            </div>
          </div>
        </section>

        {/* Normative References */}
        <section id="references" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            <a
              href="#references"
              className="hover:text-navy transition-colors"
            >
              Normative References
            </a>
          </h2>
          <p className="text-sm text-steel mb-4">
            The ARA Standard is developed with awareness of and alignment to
            the following international standards and frameworks:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border-dark">
                  <th className="text-left py-2 pr-4 font-semibold text-charcoal">
                    Reference
                  </th>
                  <th className="text-left py-2 font-semibold text-charcoal">
                    Scope
                  </th>
                </tr>
              </thead>
              <tbody className="text-steel">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    ISO/IEC 27001:2022
                  </td>
                  <td className="py-2">
                    Information Security Management Systems
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    ISO/IEC 42001:2023
                  </td>
                  <td className="py-2">AI Management Systems</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    ISO 22989:2022
                  </td>
                  <td className="py-2">AI Concepts and Terminology</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    ISO/IEC 23894:2023
                  </td>
                  <td className="py-2">AI Risk Management</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    NIST AI 100-1
                  </td>
                  <td className="py-2">AI Risk Management Framework</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    NIST SP 800-53 Rev. 5
                  </td>
                  <td className="py-2">Security and Privacy Controls</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">IEC 61508</td>
                  <td className="py-2">Functional Safety</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    EU AI Act (2024)
                  </td>
                  <td className="py-2">AI Regulation</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4 font-mono text-xs">
                    IEEE 7000-2021
                  </td>
                  <td className="py-2">
                    Ethical Concerns in System Design
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-xs">
                    SOC 2 Type II
                  </td>
                  <td className="py-2">Trust Services Criteria</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Originating Technical Contributor */}
        <section id="contributor" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            <a
              href="#contributor"
              className="hover:text-navy transition-colors"
            >
              Originating Technical Contributor
            </a>
          </h2>
          <div className="border border-border rounded-lg p-6 bg-slate-50">
            <p className="text-sm text-steel leading-relaxed">
              The ARA Standard originated from foundational technical work
              contributed to ARAF during its formation. This initial contribution
              provided the architectural basis for the 15-domain evaluation
              framework, the Assurance Class structure, the certification
              lifecycle model, and the continuous assurance methodology that
              underpins the standard today. ARAF acknowledges this foundational
              contribution while maintaining that the standard is now a
              community-governed artifact, evolving through the open development
              process described above.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-16 scroll-mt-24">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            <a
              href="#contact"
              className="hover:text-navy transition-colors"
            >
              Contact
            </a>
          </h2>
          <div className="border border-border rounded-lg p-6">
            <p className="text-sm text-steel mb-4">
              For inquiries regarding the ARA Standard, governance structure,
              or ARAF operations:
            </p>
            <ul className="text-sm text-steel space-y-2">
              <li>
                <span className="font-medium text-charcoal">
                  General Inquiries:{' '}
                </span>
                info@araf.org
              </li>
              <li>
                <span className="font-medium text-charcoal">
                  Technical Standards:{' '}
                </span>
                standards@araf.org
              </li>
              <li>
                <span className="font-medium text-charcoal">
                  Certification:{' '}
                </span>
                certification@araf.org
              </li>
              <li>
                <span className="font-medium text-charcoal">
                  Public Comment:{' '}
                </span>
                comments@araf.org
              </li>
            </ul>
          </div>
        </section>

        {/* Related Pages */}
        <section className="border-t border-border pt-10">
          <h2 className="text-lg font-semibold text-charcoal mb-4">
            Related Documentation
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/avb"
              className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
                AVB Program
              </h3>
              <p className="text-xs text-muted">
                Authorized Validation Body requirements and accreditation
                process.
              </p>
            </Link>
            <Link
              href="/ecosystem/avbs"
              className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
                AVB Directory
              </h3>
              <p className="text-xs text-muted">
                Browse Authorized Validation Bodies and their service areas.
              </p>
            </Link>
            <Link
              href="/ecosystem/capos"
              className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
                CAPO Directory
              </h3>
              <p className="text-xs text-muted">
                Certified Assurance Platform Operators and monitoring services.
              </p>
            </Link>
            <Link
              href="/ecosystem/insurers"
              className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
                Insurer Partners
              </h3>
              <p className="text-xs text-muted">
                Recognized Insurer Partners accepting ARA certification for
                underwriting.
              </p>
            </Link>
            <Link
              href="/certification"
              className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
            >
              <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
                Certification Framework
              </h3>
              <p className="text-xs text-muted">
                Assurance Classes, certification types, and lifecycle
                management.
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
                Monitoring requirements, CAPO SLAs, and operational states.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
