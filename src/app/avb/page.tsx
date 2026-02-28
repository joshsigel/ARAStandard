import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authorized Validation Bodies',
  description:
    'AVB program overview: authorization levels, independence requirements, insurance obligations, renewal process, and revocation procedures for ARA certification evaluators.',
};

const authorizationLevels = [
  {
    level: 'Basic',
    scope: 'L1 evaluations only',
    requirements: [
      'Minimum 3 qualified assessors on staff',
      'Demonstrated competence in at least 8 of 12 core evaluation domains',
      'Completed ARAF AVB Accreditation Program (Basic tier)',
      'Quality management system compliant with ISO/IEC 17020 or equivalent',
      'Professional indemnity insurance meeting ARAF minimum thresholds',
      'No active conflicts of interest with prospective certification applicants',
    ],
    evaluationScope:
      'L1 (Supervised Operational Reliability) certifications. Automated adversarial suite execution. Standard evidence inspection and documentation review.',
  },
  {
    level: 'Enhanced',
    scope: 'L1 and L2 evaluations',
    requirements: [
      'Minimum 8 qualified assessors on staff, covering all 12 core domains',
      'At least 2 assessors with demonstrated adversarial testing expertise',
      'Completed ARAF AVB Accreditation Program (Enhanced tier)',
      'Minimum 12 months of active Basic authorization with satisfactory performance record',
      'Capability to conduct structured human adversarial simulation (40+ hour engagements)',
      'Enhanced professional indemnity and errors & omissions insurance coverage',
      'Annual quality audit by an ARAF-appointed reviewer',
    ],
    evaluationScope:
      'L1 and L2 (Bounded Autonomous Deployment) certifications. Automated and human adversarial testing. Full 12-domain evaluation scope. Continuous monitoring verification.',
  },
  {
    level: 'Full',
    scope: 'L1, L2, and L3 evaluations',
    requirements: [
      'Minimum 15 qualified assessors on staff, covering all 13 domains including Domain 13',
      'Dedicated adversarial testing team (minimum 4 specialists)',
      'Completed ARAF AVB Accreditation Program (Full tier)',
      'Minimum 24 months of active Enhanced authorization with exemplary performance record',
      'Capability to coordinate independent red team engagements',
      'Capability to conduct 30-day continuous runtime stress testing',
      'Physical systems evaluation competence (for Domain 13)',
      'Maximum-tier professional indemnity, errors & omissions, and general liability insurance',
      'Semi-annual quality audit by an ARAF-appointed reviewer',
      'Dedicated quality assurance function independent of evaluation operations',
    ],
    evaluationScope:
      'All certification levels including L3 (High-Stakes Autonomous Certification). Full adversarial testing suite including independent red team coordination. Domain 13 physical actuation safety evaluation. 30-day stress testing oversight.',
  },
];

export default function AVBPage() {
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
          <li className="text-charcoal font-medium">AVB Program</li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Authorized Validation Bodies
        </h1>
        <div className="prose max-w-3xl">
          <p>
            Authorized Validation Bodies (AVBs) are independent organizations
            accredited by ARAF to conduct ARA certification evaluations. AVBs
            are the operational layer of the certification system — they
            perform the assessments, apply the scoring methodology, render
            certification decisions, and oversee post-certification monitoring.
          </p>
          <p>
            ARAF does not conduct evaluations directly. All certification
            assessments are performed by AVBs operating under ARAF governance,
            quality standards, and oversight. This separation ensures that the
            standard-setting body maintains independence from the
            certification-granting function.
          </p>
        </div>
      </header>

      {/* Overview */}
      <section id="overview" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#overview" className="hover:text-navy transition-colors">
            Program Overview
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            The AVB program establishes a structured framework for authorizing,
            monitoring, and governing the organizations that perform ARA
            certification evaluations. The program is designed to ensure
            consistent evaluation quality across all AVBs worldwide while
            allowing for geographic and domain specialization.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Role of AVBs
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              AVBs conduct certification evaluations, apply the ARA scoring
              methodology, render certification decisions, publish results to
              the registry, and oversee continuous monitoring for their
              certified systems. They are the primary point of contact for
              organizations seeking ARA certification.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              ARAF Oversight
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              ARAF authorizes AVBs, conducts quality audits, reviews
              certification decisions on a sampling basis, investigates
              complaints, and may suspend or revoke AVB authorization. ARAF
              does not interfere with individual certification decisions unless
              a quality or integrity issue is identified.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Global Coverage
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              The AVB program is designed to support global certification
              coverage. AVBs may operate in any jurisdiction and may specialize
              in specific industries, system types, or evaluation domains. ARAF
              maintains a public directory of all authorized AVBs.
            </p>
          </div>
        </div>
      </section>

      {/* Authorization Levels */}
      <section id="levels" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#levels" className="hover:text-navy transition-colors">
            Levels of Authorization
          </a>
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          AVB authorization is tiered to match the certification levels they
          are permitted to evaluate. Higher authorization levels require more
          staff, broader domain coverage, greater testing capabilities, and
          more extensive insurance.
        </p>

        <div className="space-y-6">
          {authorizationLevels.map((al) => (
            <div
              key={al.level}
              id={`avb-${al.level.toLowerCase()}`}
              className="border border-border rounded-lg overflow-hidden scroll-mt-24"
            >
              <div className="bg-slate-50 border-b border-border px-6 py-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-xs font-bold text-navy bg-white border border-border px-2.5 py-1 rounded">
                    {al.level}
                  </span>
                  <h3 className="text-base font-semibold text-charcoal">
                    <a
                      href={`#avb-${al.level.toLowerCase()}`}
                      className="hover:text-navy transition-colors"
                    >
                      {al.level} Authorization
                    </a>
                  </h3>
                </div>
                <p className="text-xs text-muted">Scope: {al.scope}</p>
              </div>

              <div className="px-6 py-5">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                      Requirements
                    </h4>
                    <ul className="space-y-2">
                      {al.requirements.map((req) => (
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
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                      Evaluation Scope
                    </h4>
                    <p className="text-sm text-steel leading-relaxed">
                      {al.evaluationScope}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Independence Requirements */}
      <section id="independence" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#independence"
            className="hover:text-navy transition-colors"
          >
            Independence Requirements
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Structural independence is a foundational requirement of the AVB
            program. An AVB must not have any financial, organizational, or
            personnel relationships with the organizations whose systems it
            evaluates that could compromise — or reasonably appear to
            compromise — the objectivity of the certification assessment.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Category
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Restriction
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Financial interest
                </td>
                <td className="px-5 py-3 text-steel">
                  No AVB principal, partner, or employee may hold equity,
                  options, or any financial interest in an organization for
                  which the AVB conducts or has conducted an evaluation within
                  the past 24 months.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Consulting services
                </td>
                <td className="px-5 py-3 text-steel">
                  An AVB may not provide consulting, advisory, implementation,
                  or remediation services to an organization and also conduct
                  that organization&apos;s certification evaluation. The
                  cooling-off period between consulting engagement and
                  evaluation eligibility is 24 months.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Personnel overlap
                </td>
                <td className="px-5 py-3 text-steel">
                  No individual who has been employed by or contracted to the
                  applicant organization within the past 12 months may
                  participate in that organization&apos;s ARA evaluation.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Corporate affiliation
                </td>
                <td className="px-5 py-3 text-steel">
                  An AVB that is a subsidiary, affiliate, or division of a
                  larger corporate entity may not evaluate systems produced by
                  any other entity within the same corporate group.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Disclosure obligation
                </td>
                <td className="px-5 py-3 text-steel">
                  AVBs must proactively disclose any relationship that could
                  create an actual or perceived conflict of interest. Failure
                  to disclose is grounds for immediate suspension of
                  authorization.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Insurance Requirements */}
      <section id="insurance" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#insurance" className="hover:text-navy transition-colors">
            Insurance Requirements
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            All AVBs must maintain insurance coverage proportional to their
            authorization level and the scope of evaluations they conduct.
            Insurance requirements are designed to protect both the
            organizations seeking certification and the broader ecosystem
            from the consequences of evaluation errors.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Coverage Type
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  Basic
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  Enhanced
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  Full
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Professional indemnity
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $2M
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $5M
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $10M
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Errors &amp; omissions
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $1M
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $3M
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $5M
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  General liability
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $1M
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $2M
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $5M
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Cyber liability
                </td>
                <td className="px-5 py-3 text-center text-muted">&mdash;</td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $2M
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  $5M
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-muted mt-3 max-w-3xl">
          Minimum coverage amounts are denominated in USD. Equivalent coverage
          in other currencies is accepted subject to ARAF verification.
          Insurance certificates must be submitted at the time of authorization
          application and upon each renewal.
        </p>
      </section>

      {/* Renewal Requirements */}
      <section id="renewal" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#renewal" className="hover:text-navy transition-colors">
            Renewal Requirements
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            AVB authorization is not permanent. All authorization levels are
            subject to periodic renewal to ensure ongoing competence, quality,
            and compliance with program requirements.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Requirement
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Renewal cycle
                </td>
                <td className="px-5 py-3 text-steel">
                  Basic: every 24 months. Enhanced: every 18 months. Full:
                  every 12 months.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Quality audit
                </td>
                <td className="px-5 py-3 text-steel">
                  An ARAF-appointed quality reviewer conducts an audit of the
                  AVB&apos;s evaluation processes, evidence handling, scoring
                  consistency, and certification decisions. The audit scope
                  includes a sample review of completed evaluations.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Assessor credentials
                </td>
                <td className="px-5 py-3 text-steel">
                  All assessors must maintain current credentials through
                  ARAF&apos;s continuing professional development program.
                  Minimum 40 hours of CPD activity per assessor per year.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Insurance verification
                </td>
                <td className="px-5 py-3 text-steel">
                  Current insurance certificates meeting minimum coverage
                  thresholds must be submitted with each renewal application.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Performance metrics
                </td>
                <td className="px-5 py-3 text-steel">
                  ARAF evaluates AVB performance against defined quality
                  metrics, including evaluation consistency, timeliness,
                  complaint history, and inter-AVB calibration results.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Conflict of interest
                </td>
                <td className="px-5 py-3 text-steel">
                  An updated conflict of interest declaration must be submitted
                  at each renewal, covering all current and prospective
                  evaluation engagements.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Revocation Process */}
      <section id="revocation" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#revocation" className="hover:text-navy transition-colors">
            Revocation Process
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            ARAF may suspend or revoke an AVB&apos;s authorization if the AVB
            fails to meet program requirements, exhibits quality deficiencies,
            or engages in conduct that undermines the integrity of the
            certification system.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Grounds for Suspension
            </h3>
            <p className="text-sm text-steel mb-4">
              Suspension temporarily halts an AVB&apos;s authority to initiate
              new evaluations. Evaluations in progress may be completed unless
              ARAF directs otherwise.
            </p>
            <ul className="space-y-2">
              {[
                'Failure to complete a scheduled quality audit within the prescribed window.',
                'Insurance coverage lapses or falls below minimum thresholds.',
                'Substantiated complaint from a certification applicant regarding evaluation quality or procedural fairness.',
                'Scoring inconsistency detected through inter-AVB calibration exercises.',
                'Assessor credential deficiencies affecting more than 25% of the AVB\u2019s evaluation staff.',
                'Failure to submit required reports or documentation to ARAF within prescribed deadlines.',
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

          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Grounds for Revocation
            </h3>
            <p className="text-sm text-steel mb-4">
              Revocation permanently terminates an AVB&apos;s authorization. A
              revoked AVB may reapply after a minimum 24-month cooling-off
              period, subject to enhanced scrutiny.
            </p>
            <ul className="space-y-2">
              {[
                'Fraudulent certification issuance or falsification of evaluation evidence.',
                'Undisclosed conflict of interest discovered after the fact.',
                'Sustained quality deficiencies across multiple audit cycles without adequate remediation.',
                'Material breach of ARAF governance policies or program agreements.',
                'Issuance of certifications outside the AVB\u2019s authorized scope (e.g., a Basic AVB issuing L2 certifications).',
                'Refusal to cooperate with an ARAF investigation or incident review.',
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

          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Impact on Existing Certifications
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              When an AVB&apos;s authorization is suspended or revoked,
              certifications previously issued by that AVB remain valid until
              their scheduled expiry. However, those certifications are flagged
              in the registry with a note indicating that the issuing AVB is
              no longer authorized. Affected organizations are notified and
              assisted in transitioning to an alternative AVB for their next
              reassessment cycle.
            </p>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section id="apply" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#apply" className="hover:text-navy transition-colors">
            How to Apply
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Organizations interested in becoming an Authorized Validation Body
            should review the full program requirements and submit an
            expression of interest through the ARAF governance process. The
            application process is structured as follows:
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {[
            {
              step: 1,
              title: 'Expression of Interest',
              description:
                'Submit a formal expression of interest to ARAF identifying the authorization level sought, the organization\u2019s qualifications, and the proposed evaluation scope. Expressions of interest are reviewed on a rolling basis.',
            },
            {
              step: 2,
              title: 'Eligibility Assessment',
              description:
                'ARAF conducts a preliminary eligibility assessment to verify that the organization meets the minimum structural, personnel, and insurance requirements for the requested authorization level.',
            },
            {
              step: 3,
              title: 'Accreditation Program',
              description:
                'Eligible organizations complete the ARAF AVB Accreditation Program at the appropriate tier. The program includes training on the ARA Standard, evaluation methodology, scoring model, evidence handling, and quality management requirements.',
            },
            {
              step: 4,
              title: 'Supervised Evaluation',
              description:
                'The applicant AVB conducts a supervised evaluation under the observation of an ARAF quality reviewer. The supervised evaluation is assessed for procedural compliance, scoring accuracy, evidence quality, and reporting standards.',
            },
            {
              step: 5,
              title: 'Authorization Decision',
              description:
                'ARAF reviews the supervised evaluation results and all application materials, then issues an authorization decision. Approved AVBs are added to the public AVB directory and may begin accepting evaluation engagements.',
            },
          ].map((step) => (
            <div
              key={step.step}
              className="flex items-start gap-4 border border-border rounded-lg p-5"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-charcoal font-mono text-sm font-bold shrink-0 mt-0.5">
                {step.step}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-2">
            Contact
          </h3>
          <p className="text-sm text-steel leading-relaxed">
            For inquiries about the AVB program, including expressions of
            interest and program requirements, contact the ARAF Accreditation
            Office at{' '}
            <span className="font-mono text-navy">
              avb-program@arastandard.org
            </span>
            . Program documentation and application materials are provided
            upon acceptance of an expression of interest.
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
            href="/evaluation"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Evaluation Methodology
            </h3>
            <p className="text-xs text-muted">
              10-phase certification lifecycle, scoring model, and evidence
              requirements.
            </p>
          </Link>
          <Link
            href="/certification"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Certification Levels
            </h3>
            <p className="text-xs text-muted">
              L1, L2, and L3 certification requirements and domain thresholds.
            </p>
          </Link>
          <Link
            href="/governance"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Governance
            </h3>
            <p className="text-xs text-muted">
              ARAF governance structure, Technical Standards Board, and
              oversight bodies.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
