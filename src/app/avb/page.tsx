import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Authorized Validation Bodies — v1.1',
  description:
    'AVB program overview v1.1: authorization levels, risk classification responsibility, platform certification evaluation, Domain 5 & 13 competency, independence requirements, insurance-relevant reporting, renewal process, and revocation procedures.',
};

const authorizationLevels = [
  {
    level: 'Basic',
    scope: 'L1 evaluations only',
    requirements: [
      'Minimum 3 qualified assessors on staff',
      'Demonstrated competence in at least 8 of 15 evaluation domains',
      'Must complete Domain 5 (Data Privacy) specialist training',
      'Completed ARAF AVB Accreditation Program (Basic tier)',
      'Quality management system compliant with ISO/IEC 17020 or equivalent',
      'Professional indemnity insurance meeting ARAF minimum thresholds',
      'No active conflicts of interest with prospective certification applicants',
      'Can conduct risk classification for Class A systems only',
    ],
    evaluationScope:
      'L1 (Foundation) certifications only. Automated adversarial suite execution. Standard evidence inspection and documentation review. Risk classification authority limited to Class A systems.',
  },
  {
    level: 'Enhanced',
    scope: 'L1 and L2 evaluations',
    requirements: [
      'Minimum 8 qualified assessors on staff, covering all 15 evaluation domains',
      'At least 2 assessors with demonstrated adversarial testing expertise',
      'Must demonstrate Domain 5 (Data Privacy) and Domain 13 (Societal Impact) competency',
      'Completed ARAF AVB Accreditation Program (Enhanced tier)',
      'Minimum 12 months of active Basic authorization with satisfactory performance record',
      'Capability to conduct structured human adversarial simulation (40+ hour engagements)',
      'Can conduct risk classification for all Assurance Classes (A, B, C)',
      'Can evaluate platform certifications (basic scope)',
      'Enhanced professional indemnity and errors & omissions insurance coverage',
      'Annual quality audit by an ARAF-appointed reviewer',
    ],
    evaluationScope:
      'L1 and L2 (Operational) certifications. Automated and human adversarial testing. Full 15-domain evaluation scope. Basic platform certification evaluation. Risk classification for all Assurance Classes. Continuous monitoring verification.',
  },
  {
    level: 'Full',
    scope: 'L1, L2, and L3 evaluations',
    requirements: [
      'Minimum 12 qualified assessors on staff, covering all 15 domains',
      'Dedicated adversarial testing team (minimum 4 specialists)',
      'Domain 5 (Data Privacy) and Domain 13 (Societal Impact) specialist assessors required',
      'Completed ARAF AVB Accreditation Program (Full tier)',
      'Minimum 24 months of active Enhanced authorization with exemplary performance record',
      'Capability to coordinate independent red team engagements',
      'Capability to conduct 30-day continuous runtime stress testing',
      'Full platform certification authority',
      'Risk classification authority for all Assurance Classes (A, B, C)',
      'Insurance-relevant reporting capability (RIP-compatible)',
      'Physical systems evaluation competence (for Domain 15)',
      'Maximum-tier professional indemnity, errors & omissions, and general liability insurance',
      'Semi-annual quality audit by an ARAF-appointed reviewer',
      'Dedicated quality assurance function independent of evaluation operations',
    ],
    evaluationScope:
      'All certification levels including L3 (High-Stakes). Full adversarial testing suite including independent red team coordination. Domain 15 physical safety evaluation. 30-day stress testing oversight. Complete platform certification authority. Insurance-relevant reporting for RIP framework.',
  },
];

export default function AVBPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'AVB Program' }]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Authorized Validation Bodies — v1.1
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-[72ch] mb-3">
            Authorized Validation Bodies (AVBs) are independent organizations
            accredited by ARAF to conduct ARA certification evaluations. AVBs
            are the operational layer of the certification system — they
            perform the assessments, conduct risk classification, apply the
            scoring methodology, render certification decisions, and oversee
            post-certification monitoring.
          </p>
          <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            ARAF does not conduct evaluations directly. All certification
            assessments are performed by AVBs operating under ARAF governance,
            quality standards, and oversight. v1.1 expands AVB responsibilities
            to include mandatory risk classification, platform certification
            evaluation, and insurance-relevant reporting.
          </p>
      </header>

      {/* Overview */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="overview" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Program Overview
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            The AVB program establishes a structured framework for authorizing,
            monitoring, and governing the organizations that perform ARA
            certification evaluations. The program is designed to ensure
            consistent evaluation quality across all AVBs worldwide while
            allowing for geographic and domain specialization.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Role of AVBs
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              AVBs conduct certification evaluations, perform risk
              classification, apply the ARA scoring methodology, render
              certification decisions, publish results to the registry, and
              oversee continuous monitoring for their certified systems. They
              are the primary point of contact for organizations seeking ARA
              certification.
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
              maintains a{' '}
              <Link href="/ecosystem/avbs" className="text-navy hover:underline">
                public directory
              </Link>{' '}
              of all authorized AVBs.
            </p>
          </div>
        </div>
      </section>

      {/* Authorization Levels */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="levels" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Levels of Authorization
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          AVB authorization is tiered to match the certification levels they
          are permitted to evaluate. Higher authorization levels require more
          staff, broader domain coverage across all 15 evaluation domains,
          greater testing capabilities, and more extensive insurance.
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

      {/* Risk Classification Responsibility */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="risk-classification" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Risk Classification Responsibility
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            Under v1.1, AVBs are responsible for conducting the mandatory
            7-factor risk assessment during Phase 2 of the certification
            lifecycle. The risk classification determines the system&apos;s
            Assurance Class (A, B, or C), which in turn governs monitoring
            requirements, certification designation, and insurance relevance.
        </p>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  AVB Tier
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Risk Classification Authority
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">Basic</td>
                <td className="px-5 py-3 text-steel">
                  Class A systems only. Systems classified as Class B or C must
                  be referred to an Enhanced or Full AVB.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">Enhanced</td>
                <td className="px-5 py-3 text-steel">
                  All Assurance Classes (A, B, and C). Full 7-factor assessment
                  authority.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">Full</td>
                <td className="px-5 py-3 text-steel">
                  All Assurance Classes (A, B, and C). Full 7-factor assessment
                  authority. May serve as classification reviewer for disputed
                  or escalated assessments.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-2">
            7-Factor Assessment
          </h3>
          <p className="text-sm text-steel leading-relaxed mb-3">
            The risk classification evaluates seven factors, each scored and
            weighted to produce an overall Assurance Class determination:
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {[
              'Autonomy level',
              'Decision impact severity',
              'Data sensitivity',
              'Operational environment',
              'Human oversight capacity',
              'Action reversibility',
              'Deployment scale',
            ].map((factor) => (
              <div
                key={factor}
                className="flex items-start gap-2.5 text-sm text-steel"
              >
                <span className="text-slate-400 mt-0.5 shrink-0">&bull;</span>
                {factor}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Certification Evaluation */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="platform-certification" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Platform Certification Evaluation
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            v1.1 introduces platform certification as a distinct certification
            variant. Platform certifications allow infrastructure and framework
            providers to certify their platforms, enabling downstream systems
            built on those platforms to inherit qualifying domain scores. AVB
            authority for platform evaluations varies by tier.
        </p>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  AVB Tier
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Platform Certification Authority
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">Basic</td>
                <td className="px-5 py-3 text-muted">
                  No platform certification authority.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">Enhanced</td>
                <td className="px-5 py-3 text-steel">
                  Basic platform evaluations. Limited to L1 and L2 platform
                  certifications. Can validate platform inheritance claims for
                  downstream system evaluations.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">Full</td>
                <td className="px-5 py-3 text-steel">
                  Complete platform certification authority across all levels.
                  Can evaluate complex multi-layer platform architectures,
                  validate cross-platform inheritance chains, and issue L3
                  platform certifications.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Domain 5 & 13 Competency */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="domain-competency" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Domain 5 &amp; 13 Competency
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            v1.1 expands the evaluation framework to 15 domains, with Domain 5
            (Data Privacy) and Domain 13 (Societal Impact) receiving particular
            emphasis due to their cross-cutting nature and regulatory
            significance. All AVB tiers must demonstrate competency in these
            two domains.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Domain 5 — Data Privacy
            </h3>
            <ul className="space-y-2">
              {[
                'All AVB tiers must complete Domain 5 specialist training',
                'Covers data collection transparency, consent mechanisms, retention policies, and cross-border data handling',
                'Training includes GDPR, CCPA, and emerging AI-specific privacy regulation alignment',
                'Full-tier AVBs must maintain at least one Domain 5 specialist assessor',
                'Annual recertification required for Domain 5 competency',
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
              Domain 13 — Societal Impact
            </h3>
            <ul className="space-y-2">
              {[
                'Enhanced and Full AVBs must demonstrate Domain 13 competency',
                'Covers bias assessment, equity impact analysis, accessibility compliance, and community impact evaluation',
                'Evaluation methodology includes structured stakeholder impact mapping',
                'Full-tier AVBs must maintain at least one Domain 13 specialist assessor',
                'Domain 13 competency is prerequisite for L2 and L3 evaluation authority',
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
        </div>
      </section>

      {/* Insurance-Relevant Reporting */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="insurance-reporting" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Insurance-Relevant Reporting
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            Full-tier AVBs must produce certification reports that are
            compatible with the ARA Risk-Informed Pricing (RIP) assessment
            framework. Insurance-relevant reports provide structured risk data
            that insurance carriers can use to price autonomous system coverage.
        </p>

        <div className="mt-6 border border-border rounded-lg p-6">
          <h3 className="text-base font-semibold text-charcoal mb-3">
            RIP Report Requirements
          </h3>
          <ul className="space-y-2">
            {[
              'Structured risk factor data aligned with the 7-factor classification model',
              'Domain-level scoring with confidence intervals for each evaluation domain',
              'Adversarial testing summary with vulnerability severity classification',
              'Continuous monitoring baseline metrics and drift tolerance thresholds',
              'Assurance Class rationale with factor-by-factor breakdown',
              'Historical compliance trajectory for renewal certifications',
              'Reports must follow the standardized RIP Data Schema (published by ARAF)',
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

        <p className="text-xs text-muted mt-3 max-w-3xl">
          Basic and Enhanced AVBs are not required to produce RIP-compatible
          reports but are encouraged to adopt the reporting schema to support
          ecosystem-wide insurance integration.
        </p>
      </section>

      {/* Independence Requirements */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="independence" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Independence Requirements
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            Structural independence is a foundational requirement of the AVB
            program. An AVB must not have any financial, organizational, or
            personnel relationships with the organizations whose systems it
            evaluates that could compromise — or reasonably appear to
            compromise — the objectivity of the certification assessment.
        </p>

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
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="insurance" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Insurance Requirements
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            All AVBs must maintain insurance coverage proportional to their
            authorization level and the scope of evaluations they conduct.
            Insurance requirements are designed to protect both the
            organizations seeking certification and the broader ecosystem
            from the consequences of evaluation errors.
        </p>

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

      {/* Revalidation Triggers */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="revalidation-triggers" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Revalidation Triggers
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            v1.1 updates the conditions that trigger revalidation of AVB
            authorization outside of the standard renewal cycle. AVBs must
            initiate a revalidation review when any of the following conditions
            occur.
        </p>

        <div className="mt-6 border border-border rounded-lg p-6">
          <ul className="space-y-2">
            {[
              'Assurance Class lapse: an AVB fails to maintain the competency or staffing requirements for a previously authorized Assurance Class scope.',
              'Assurance Class escalation request: an AVB seeks to expand its risk classification authority (e.g., Basic AVB requesting Class B authority).',
              'Platform cert dependency change: an AVB\u2019s platform certification authority is affected by changes to a platform\u2019s certification status.',
              'Domain competency gap: loss of Domain 5 or Domain 13 specialist assessors below minimum thresholds.',
              'Insurance coverage change: material change to insurance coverage that affects the AVB\u2019s authorized evaluation scope.',
              'Organizational restructuring: material change to the AVB\u2019s corporate structure, ownership, or operational independence.',
              'Performance deficiency: identification of systematic evaluation quality issues through ARAF audit or inter-AVB calibration.',
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
      </section>

      {/* Renewal Requirements */}
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="renewal" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Renewal Requirements
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            AVB authorization is not permanent. All authorization levels are
            subject to periodic renewal to ensure ongoing competence, quality,
            and compliance with program requirements.
        </p>

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
                  Domain competency
                </td>
                <td className="px-5 py-3 text-steel">
                  Demonstrated competency across all 15 evaluation domains
                  must be verified at renewal. Domain 5 and Domain 13
                  specialist credentials are independently validated.
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
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="revocation" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            Revocation Process
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            ARAF may suspend or revoke an AVB&apos;s authorization if the AVB
            fails to meet program requirements, exhibits quality deficiencies,
            or engages in conduct that undermines the integrity of the
            certification system.
        </p>

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
                'Loss of Domain 5 or Domain 13 competency below minimum thresholds.',
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
                'Fraudulent risk classification to circumvent Assurance Class requirements.',
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
      <section className="mb-20 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="apply" className="text-2xl font-semibold text-charcoal mb-3 scroll-mt-24">
            How to Apply
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-[72ch]">
            Organizations interested in becoming an Authorized Validation Body
            should review the full program requirements and submit an
            expression of interest through the ARAF governance process. The
            application process is structured as follows:
        </p>

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
                'ARAF conducts a preliminary eligibility assessment to verify that the organization meets the minimum structural, personnel, and insurance requirements for the requested authorization level. Domain 5 and Domain 13 competency is assessed at this stage.',
            },
            {
              step: 3,
              title: 'Accreditation Program',
              description:
                'Eligible organizations complete the ARAF AVB Accreditation Program at the appropriate tier. The program includes training on the ARA Standard, evaluation methodology, scoring model, evidence handling, risk classification procedures, and quality management requirements.',
            },
            {
              step: 4,
              title: 'Supervised Evaluation',
              description:
                'The applicant AVB conducts a supervised evaluation under the observation of an ARAF quality reviewer. The supervised evaluation is assessed for procedural compliance, scoring accuracy, risk classification methodology, evidence quality, and reporting standards.',
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
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
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
            href="/ecosystem/avbs"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              AVB Directory
            </h3>
            <p className="text-xs text-muted">
              Public directory of all authorized AVBs with tier and scope
              information.
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
