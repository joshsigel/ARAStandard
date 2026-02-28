import type { Metadata } from 'next';
import Link from 'next/link';
import { certificationLevels } from '@/data/certification-levels';
import { CertificationBadge } from '@/components/badges/CertificationBadge';

export const metadata: Metadata = {
  title: 'ARA Certification Levels',
  description:
    'Three-tier certification model for autonomous systems: L1 Supervised Operational Reliability, L2 Bounded Autonomous Deployment, and L3 High-Stakes Autonomous Certification.',
};

const levelNumber = (level: string) => level.replace('L', '');

function LevelBadge({ level }: { level: string }) {
  const cls =
    level === 'L1'
      ? 'level-badge level-badge-l1'
      : level === 'L2'
        ? 'level-badge level-badge-l2'
        : 'level-badge level-badge-l3';
  return <span className={cls}>{level}</span>;
}

export default function CertificationPage() {
  const allDomains = Object.keys(certificationLevels[2].domainThresholds);

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
          <li className="text-charcoal font-medium">Certification</li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          ARA Certification Levels
        </h1>
        <div className="prose max-w-3xl">
          <p>
            The ARA Standard defines a three-tier certification model that maps
            autonomous system capabilities and risk profiles to graduated
            reliability requirements. Each level prescribes minimum Autonomy
            Compliance Requirements (ACRs), evaluation scope, adversarial
            testing intensity, and ongoing monitoring obligations proportional
            to the degree of operational autonomy and the potential consequences
            of system failure.
          </p>
          <p>
            Certification is issued per system, per deployment scope. An
            organization may hold different certification levels for different
            systems or different deployment contexts of the same system.
            Certification does not transfer between systems, versions, or
            deployment environments without re-evaluation.
          </p>
        </div>
      </header>

      {/* Level detail sections */}
      <div className="space-y-16 mb-20">
        {certificationLevels.map((cl) => (
          <section
            key={cl.level}
            id={cl.level.toLowerCase()}
            className="scroll-mt-24"
          >
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Section header */}
              <div className="bg-slate-50 border-b border-border px-6 py-5">
                <div className="flex items-start gap-5">
                  <div className="shrink-0 badge-glow">
                    <CertificationBadge
                      level={Number(cl.level.replace('L', '')) as 1 | 2 | 3}
                      size={72}
                      variant="dark-on-light"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <LevelBadge level={cl.level} />
                      <h2 className="text-xl font-semibold text-charcoal">
                        {cl.name}
                      </h2>
                    </div>
                    <p className="text-sm text-muted max-w-2xl">
                      Level {levelNumber(cl.level)} certification for{' '}
                      {cl.level === 'L1'
                        ? 'systems operating under direct human supervision with autonomous components augmenting human decision-making.'
                        : cl.level === 'L2'
                          ? 'systems exercising significant autonomy within defined operational boundaries and constraints.'
                          : 'systems operating autonomously in high-stakes environments where actions may be irreversible, safety-critical, or materially consequential.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section body */}
              <div className="px-6 py-6">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                  {/* Autonomy Model */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                      Autonomy Model
                    </h3>
                    <p className="text-sm text-steel leading-relaxed">
                      {cl.autonomyModel}
                    </p>
                  </div>

                  {/* Human Requirements */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                      Human Requirements
                    </h3>
                    <p className="text-sm text-steel leading-relaxed">
                      {cl.humanRequirement}
                    </p>
                  </div>

                  {/* Minimum ACRs */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                      Minimum ACRs
                    </h3>
                    <p className="text-sm text-steel">
                      <span className="font-mono font-semibold text-charcoal">
                        {cl.minimumACRs}
                      </span>{' '}
                      Autonomy Compliance Requirements must be satisfied.
                    </p>
                  </div>

                  {/* Evaluation Scope */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                      Evaluation Scope
                    </h3>
                    <p className="text-sm text-steel leading-relaxed">
                      {cl.evaluationScope}
                    </p>
                  </div>

                  {/* Adversarial Testing */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                      Adversarial Testing
                    </h3>
                    <p className="text-sm text-steel leading-relaxed">
                      {cl.adversarialTesting}
                    </p>
                  </div>

                  {/* Monitoring */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                      Monitoring
                    </h3>
                    <p className="text-sm text-steel leading-relaxed">
                      {cl.monitoring}
                    </p>
                  </div>

                  {/* Reassessment Schedule */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                      Reassessment Schedule
                    </h3>
                    <p className="text-sm text-steel">{cl.reassessment}</p>
                  </div>
                </div>

                {/* Applicable System Types */}
                <div className="mt-8 pt-6 border-t border-border">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    Applicable System Types
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
                    {cl.applicableSystems.map((sys) => (
                      <li
                        key={sys}
                        className="text-sm text-steel flex items-start gap-2"
                      >
                        <span
                          className="text-slate-400 mt-1.5 shrink-0"
                          aria-hidden="true"
                        >
                          &bull;
                        </span>
                        {sys}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Comparison Table */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Level Comparison
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Side-by-side comparison of certification requirements across all three
          levels. All values represent minimum thresholds for certification
          eligibility.
        </p>

        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal whitespace-nowrap">
                  Requirement
                </th>
                {certificationLevels.map((cl) => (
                  <th
                    key={cl.level}
                    className="text-left font-semibold px-5 py-3 text-charcoal whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <LevelBadge level={cl.level} />
                      <span className="hidden sm:inline">{cl.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Minimum ACRs
                </td>
                {certificationLevels.map((cl) => (
                  <td key={cl.level} className="px-5 py-3 font-mono text-steel">
                    {cl.minimumACRs}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Autonomy Model
                </td>
                {certificationLevels.map((cl) => (
                  <td
                    key={cl.level}
                    className="px-5 py-3 text-steel max-w-[280px]"
                  >
                    {cl.level === 'L1'
                      ? 'Human-in-the-loop'
                      : cl.level === 'L2'
                        ? 'Bounded autonomy'
                        : 'Full autonomy (high-stakes)'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Human Requirement
                </td>
                {certificationLevels.map((cl) => (
                  <td
                    key={cl.level}
                    className="px-5 py-3 text-steel max-w-[280px]"
                  >
                    {cl.level === 'L1'
                      ? 'Per-action approval'
                      : cl.level === 'L2'
                        ? 'Monitoring & override'
                        : 'Multi-layer monitoring + independent red team'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Evaluation Scope
                </td>
                {certificationLevels.map((cl) => (
                  <td
                    key={cl.level}
                    className="px-5 py-3 text-steel max-w-[280px]"
                  >
                    {cl.level === 'L1'
                      ? '12 domains (reduced D8)'
                      : cl.level === 'L2'
                        ? '12 domains (full scope)'
                        : '12 core + Domain 13 (physical)'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Adversarial Testing
                </td>
                {certificationLevels.map((cl) => (
                  <td
                    key={cl.level}
                    className="px-5 py-3 text-steel max-w-[280px]"
                  >
                    {cl.level === 'L1'
                      ? 'Automated suite only'
                      : cl.level === 'L2'
                        ? 'Automated + human (40+ hrs)'
                        : 'Automated + human (80+ hrs) + independent red team + 30-day stress test'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Monitoring
                </td>
                {certificationLevels.map((cl) => (
                  <td
                    key={cl.level}
                    className="px-5 py-3 text-steel max-w-[280px]"
                  >
                    {cl.level === 'L1'
                      ? 'Basic telemetry'
                      : cl.level === 'L2'
                        ? 'Continuous + drift detection'
                        : 'Full production + real-time alerting + incident drills'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Reassessment
                </td>
                {certificationLevels.map((cl) => (
                  <td key={cl.level} className="px-5 py-3 text-steel">
                    {cl.reassessment}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Domain Score Thresholds */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Domain Score Thresholds
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Each certification level requires minimum passing scores across all
          applicable evaluation domains. Scores are expressed as percentages of
          full compliance within each domain. A system must meet or exceed every
          applicable threshold to qualify for certification at that level.
        </p>

        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal whitespace-nowrap">
                  Domain
                </th>
                {certificationLevels.map((cl) => (
                  <th
                    key={cl.level}
                    className="text-center font-semibold px-5 py-3 text-charcoal whitespace-nowrap"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <LevelBadge level={cl.level} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allDomains.map((domain) => (
                <tr key={domain}>
                  <td className="px-5 py-3 font-medium text-charcoal whitespace-nowrap">
                    {domain}
                  </td>
                  {certificationLevels.map((cl) => {
                    const score = cl.domainThresholds[domain];
                    return (
                      <td
                        key={cl.level}
                        className="px-5 py-3 text-center font-mono text-steel"
                      >
                        {score !== undefined ? `${score}%` : '\u2014'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recertification Requirements */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Recertification Requirements
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Certification validity is bounded by both time and operational
            continuity. Recertification is required under the following
            conditions:
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Trigger
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Requirement
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top">
                  Scheduled expiry
                </td>
                <td className="px-5 py-3 text-steel">
                  L1 certifications expire after 12 months. L2 certifications
                  expire after 12 months with semi-annual interim reviews. L3
                  certifications expire after 12 months with quarterly interim
                  reviews. All levels require full re-evaluation upon expiry.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top">
                  Material system change
                </td>
                <td className="px-5 py-3 text-steel">
                  Any modification to the system that alters its decision-making
                  logic, autonomy boundaries, tool integrations, or model
                  weights requires recertification. Minor configuration
                  adjustments within documented operational parameters may be
                  covered by the change control process without triggering full
                  re-evaluation, subject to AVB determination.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top">
                  Scope expansion
                </td>
                <td className="px-5 py-3 text-steel">
                  Extending the certified system to new deployment environments,
                  user populations, geographic regions, or operational contexts
                  not covered by the original scope statement requires
                  supplemental evaluation or full recertification.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top">
                  Standard version update
                </td>
                <td className="px-5 py-3 text-steel">
                  When a new version of the ARA Standard is ratified, existing
                  certifications remain valid until their scheduled expiry.
                  Recertification upon renewal must be conducted against the
                  current standard version. Transition periods are defined in
                  each version&apos;s release notes.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top">
                  Monitoring threshold breach
                </td>
                <td className="px-5 py-3 text-steel">
                  If continuous monitoring detects drift, behavioral anomalies,
                  or compliance threshold breaches that are not resolved within
                  the prescribed remediation window, the certifying AVB may
                  require accelerated recertification.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top">
                  Post-incident review
                </td>
                <td className="px-5 py-3 text-steel">
                  Following a material safety incident, operational failure, or
                  unauthorized autonomous action, ARAF or the certifying AVB may
                  mandate recertification as a condition of continued
                  operational authorization.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Revocation Rules */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Revocation and Suspension
        </h2>
        <div className="prose max-w-3xl">
          <p>
            ARAF reserves the authority to suspend or revoke any ARA
            certification. Revocation actions are recorded in the public
            registry and are visible to all parties who query the affected
            certification ID.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Grounds for Suspension
            </h3>
            <p className="text-sm text-steel mb-4">
              Suspension places a temporary hold on a certification. The system
              may not represent itself as ARA-certified during the suspension
              period. Suspension may be lifted upon remediation.
            </p>
            <ul className="space-y-2">
              {[
                'Failure to complete a scheduled interim review within the prescribed window.',
                'Monitoring data indicates non-compliance with one or more domain thresholds, with remediation in progress.',
                'Incomplete or overdue submission of required audit artifacts to the certifying AVB.',
                'Material change to the certified system deployed without prior notification to the certifying AVB.',
                'Failure to maintain operational governance controls as documented at time of certification.',
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
              Revocation permanently invalidates a certification. A revoked
              certification cannot be reinstated. The organization must apply
              for a new certification through the standard evaluation process.
            </p>
            <ul className="space-y-2">
              {[
                'Confirmed material safety incident caused by failures within the certified scope.',
                'Fraudulent representation of system capabilities, test results, or operational parameters during the evaluation process.',
                'Sustained non-compliance across multiple monitoring cycles without adequate remediation effort.',
                'Unauthorized use of ARA certification marks on systems or deployments outside the certified scope.',
                'Refusal to cooperate with ARAF or AVB audit, investigation, or incident review processes.',
                'System operation beyond certified autonomy boundaries resulting in unauthorized actions with material consequences.',
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
              Appeals Process
            </h3>
            <p className="text-sm text-steel">
              Organizations may appeal suspension or revocation decisions to the
              ARAF Technical Governance Board within 30 calendar days of the
              action. Appeals must include a written response addressing the
              cited grounds, supporting evidence, and a proposed remediation
              plan where applicable. The Governance Board will render a decision
              within 45 calendar days of receiving a complete appeal submission.
              Appeal decisions are final and are published in the governance
              record.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
