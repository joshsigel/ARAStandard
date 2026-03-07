import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TwoAxisMatrix } from '@/components/visualizations/TwoAxisMatrix';
import { SystemProfileChart } from '@/components/visualizations/SystemProfileChart';
import { AraBadge } from '@/components/badges/AraBadge';
import { AssuranceClassBadge } from '@/components/badges/AssuranceClassBadge';
import type { BadgeData } from '@/components/badges/types';
import { getCertificationLevels } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Certification — ARA Standard',
  description: 'ARA two-axis certification model.',
};

/* ---------------------------------------------------------------------------
 * Helpers & local data
 * --------------------------------------------------------------------------- */

function LevelBadge({ level }: { level: string }) {
  const cls =
    level === 'L1'
      ? 'level-badge level-badge-l1'
      : level === 'L2'
        ? 'level-badge level-badge-l2'
        : 'level-badge level-badge-l3';
  return <span className={cls}>{level}</span>;
}

const evaluationLevels = [
  {
    level: 'L1',
    name: 'Foundation',
    description:
      'Structured self-assessment with AVB oversight. Express pathway available for low-risk systems, completing certification in 3\u20134 weeks. Suitable for Foundational and Standard system profiles.',
    metrics: {
      acrScope: 'Foundational (97) or Standard (215) profile',
      adversarialTesting: 'Automated suite only',
      timeline: '3\u20134 weeks (express) or 6\u20138 weeks (standard)',
      reassessment: 'Annual',
    },
  },
  {
    level: 'L2',
    name: 'Operational',
    description:
      'Full independent evaluation by an accredited AVB. Includes automated and human adversarial testing with a minimum of 40 hours of structured simulation. Suitable for Standard and Advanced system profiles.',
    metrics: {
      acrScope: 'Standard (215) or Advanced (368) profile',
      adversarialTesting: 'Automated + human adversarial (40+ hrs)',
      timeline: '8\u201312 weeks',
      reassessment: 'Semi-annual',
    },
  },
  {
    level: 'L3',
    name: 'Comprehensive',
    description:
      'Maximum evaluation rigor. Requires an independent red team engagement (80+ hours), a 30-day continuous runtime stress test, and full coverage of all 410 ACRs. Suitable for Advanced and Comprehensive system profiles.',
    metrics: {
      acrScope: 'All 410 ACRs (Comprehensive profile)',
      adversarialTesting: 'Automated + human (80+ hrs) + independent red team + 30-day stress test',
      timeline: '16\u201324 weeks',
      reassessment: 'Quarterly',
    },
  },
] as const;

const assuranceClasses = [
  {
    class: 'A' as const,
    name: 'Periodic',
    description:
      'Self-assessment with AVB spot checks. Designed for systems where periodic validation is sufficient to maintain assurance. No continuous oversight infrastructure is required.',
    monitoring: 'Self-assessment with AVB spot checks',
    cadence: 'Annual renewal',
    lapseWindow: '90 days',
    capoRequired: false,
  },
  {
    class: 'B' as const,
    name: 'Monitored',
    description:
      'Monthly CAPO monitoring reports with automated telemetry collection. Provides an ongoing assurance signal between evaluation cycles through structured reporting and drift detection.',
    monitoring: 'Monthly CAPO monitoring reports',
    cadence: 'Quarterly review',
    lapseWindow: '60 days',
    capoRequired: true,
  },
  {
    class: 'C' as const,
    name: 'Continuously Assured',
    description:
      'Full 24/7 CAPO oversight with real-time alerting and a complete telemetry pipeline. The highest assurance posture, providing continuous verification that the certified system remains within compliance boundaries.',
    monitoring: '24/7 CAPO oversight with real-time alerting',
    cadence: 'Continuous review',
    lapseWindow: '30 days',
    capoRequired: true,
  },
] as const;

const systemProfiles = [
  {
    code: 'F' as const,
    name: 'Foundational',
    acrCount: 97,
    targetSystems: 'Single-purpose agents, limited-scope internal tools, low-risk chatbots',
  },
  {
    code: 'S' as const,
    name: 'Standard',
    acrCount: 215,
    targetSystems: 'General-purpose agents, customer-facing systems, enterprise copilots',
  },
  {
    code: 'A' as const,
    name: 'Advanced',
    acrCount: 368,
    targetSystems: 'Multi-agent orchestration, high-autonomy deployments, financial automation',
  },
  {
    code: 'C' as const,
    name: 'Comprehensive',
    acrCount: 410,
    targetSystems: 'Safety-critical systems, physical autonomy, cross-domain AI platforms',
  },
] as const;

/* ---------------------------------------------------------------------------
 * Page component
 * --------------------------------------------------------------------------- */

export default async function CertificationPage() {
  const certificationLevels = await getCertificationLevels();

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* ---- Breadcrumb ---- */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Certification' },
        ]}
        className="mb-8"
      />

      {/* ---- Page header ---- */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Two-Axis Certification Model
        </h1>
        <div className="prose max-w-3xl">
          <p>
            ARA v1.1 introduces a two-axis certification framework that combines{' '}
            <strong>Evaluation Level</strong> (the depth of initial assessment)
            with <strong>Assurance Class</strong> (the intensity of ongoing
            monitoring) to produce nine distinct certification designations. This
            model decouples how thoroughly a system is evaluated from how
            continuously its compliance is verified, enabling organizations to
            select a certification posture that matches both the risk profile of
            the system and the operational oversight capacity available.
          </p>
          <p>
            Certification is issued per system, per deployment scope. An
            organization may hold different designations for different systems or
            different deployment contexts of the same system. Certification does
            not transfer between systems, versions, or deployment environments
            without re-evaluation.
          </p>
        </div>
      </header>

      {/* ---- Interactive Two-Axis Matrix ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Evaluation Level &times; Assurance Class
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Click any cell to see the combination of evaluation rigor and
          assurance intensity. Each of the nine designations maps to a unique
          set of requirements.
        </p>
        <TwoAxisMatrix className="max-w-3xl" />
      </section>

      {/* ---- Three Evaluation Levels ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Evaluation Levels
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          The evaluation level determines the depth and rigor of the initial
          certification assessment, including ACR scope, adversarial testing
          intensity, and evaluation timeline.
        </p>

        <div className="space-y-8">
          {evaluationLevels.map((el) => (
            <div
              key={el.level}
              id={el.level.toLowerCase()}
              className="border border-border rounded-lg overflow-hidden scroll-mt-24"
            >
              {/* Card header */}
              <div className="bg-slate-50 border-b border-border px-6 py-5">
                <div className="flex items-start gap-5">
                  <div className="shrink-0">
                    <AraBadge
                      data={{
                        certId: `ARA-DEMO-${el.level}`,
                        level: Number(el.level.replace('L', '')) as 1 | 2 | 3,
                        assuranceClass: 'B',
                        standardVersion: '1.1',
                        status: 'active',
                      }}
                      size={80}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <LevelBadge level={el.level} />
                      <h3 className="text-xl font-semibold text-charcoal">
                        {el.name}
                      </h3>
                    </div>
                    <p className="text-sm text-muted max-w-2xl">
                      {el.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key metrics */}
              <div className="px-6 py-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    ACR Scope
                  </h4>
                  <p className="text-sm text-steel leading-relaxed">
                    {el.metrics.acrScope}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Adversarial Testing
                  </h4>
                  <p className="text-sm text-steel leading-relaxed">
                    {el.metrics.adversarialTesting}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Timeline
                  </h4>
                  <p className="text-sm text-steel leading-relaxed">
                    {el.metrics.timeline}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                    Reassessment
                  </h4>
                  <p className="text-sm text-steel leading-relaxed">
                    {el.metrics.reassessment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Three Assurance Classes ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Assurance Classes
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          The assurance class determines the intensity and cadence of ongoing
          compliance monitoring after initial certification is granted.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {assuranceClasses.map((ac) => (
            <div
              key={ac.class}
              className="border border-border rounded-lg overflow-hidden flex flex-col"
            >
              {/* Card header */}
              <div className="bg-slate-50 border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <AssuranceClassBadge assuranceClass={ac.class} />
                  <h3 className="text-base font-semibold text-charcoal">
                    {ac.name}
                  </h3>
                </div>
              </div>

              {/* Card body */}
              <div className="px-5 py-5 flex-1 space-y-4">
                <p className="text-sm text-steel leading-relaxed">
                  {ac.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-0.5">
                      Monitoring
                    </h4>
                    <p className="text-xs text-steel">{ac.monitoring}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-0.5">
                      Cadence
                    </h4>
                    <p className="text-xs text-steel">{ac.cadence}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-0.5">
                      Lapse Window
                    </h4>
                    <p className="text-xs text-steel">{ac.lapseWindow}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-0.5">
                      CAPO Required
                    </h4>
                    <p className="text-xs text-steel">
                      {ac.capoRequired ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- System Profiles ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          System Profiles
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          System profiles determine which subset of the 410 Autonomy Compliance
          Requirements apply to a given system, based on its capabilities,
          deployment context, and risk exposure.
        </p>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
          {/* Chart */}
          <SystemProfileChart className="max-w-lg" />

          {/* Profile list */}
          <div className="space-y-4">
            {systemProfiles.map((sp) => (
              <div
                key={sp.code}
                className="flex items-start gap-4 p-4 border border-border rounded-lg"
              >
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 font-mono text-sm font-bold text-charcoal">
                  {sp.code}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-charcoal">
                    {sp.name}{' '}
                    <span className="text-muted font-mono font-normal">
                      ({sp.acrCount} ACRs)
                    </span>
                  </h3>
                  <p className="text-xs text-steel mt-0.5">
                    {sp.targetSystems}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Certification Inheritance ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Certification Inheritance
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Platform certification enables ACR inheritance for deployment-level
            certifications. When a platform has been certified at a given level,
            deployments built on that platform may inherit the platform&apos;s
            satisfied ACRs rather than re-evaluating them independently. This
            reduces the evaluation burden for individual deployments while
            preserving the integrity of the certification chain.
          </p>
          <p>
            Inherited ACRs do not require re-evaluation as long as the
            underlying platform certification remains valid and the
            deployment&apos;s use of the platform falls within the certified
            scope. If the platform certification lapses or is revoked, inherited
            ACRs revert to unevaluated status and the deployment must be
            re-assessed.
          </p>
        </div>
        <div className="mt-4">
          <Link
            href="/certification/platform"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal hover:underline"
          >
            Platform Certification details &rarr;
          </Link>
        </div>
      </section>

      {/* ---- CAPO Requirements by Class ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          CAPO Requirements by Class
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Certified Autonomous-system Performance Observers (CAPOs) provide the
          ongoing monitoring infrastructure required for Class B and Class C
          assurance.
        </p>

        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Requirement
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <AssuranceClassBadge assuranceClass="A" size="sm" />
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <AssuranceClassBadge assuranceClass="B" size="sm" />
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <AssuranceClassBadge assuranceClass="C" size="sm" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  CAPO Designation
                </td>
                <td className="px-5 py-3 text-steel">Not required</td>
                <td className="px-5 py-3 text-steel">Required</td>
                <td className="px-5 py-3 text-steel">Required</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Reporting
                </td>
                <td className="px-5 py-3 text-steel">Self-reporting</td>
                <td className="px-5 py-3 text-steel">Monthly reports</td>
                <td className="px-5 py-3 text-steel">24/7 monitoring</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Review Cadence
                </td>
                <td className="px-5 py-3 text-steel">Annual review</td>
                <td className="px-5 py-3 text-steel">Quarterly review</td>
                <td className="px-5 py-3 text-steel">Continuous review</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Telemetry
                </td>
                <td className="px-5 py-3 text-steel">Basic (self-collected)</td>
                <td className="px-5 py-3 text-steel">Automated collection</td>
                <td className="px-5 py-3 text-steel">Full pipeline (real-time)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Drift Detection
                </td>
                <td className="px-5 py-3 text-steel">Manual check at renewal</td>
                <td className="px-5 py-3 text-steel">Automated, monthly threshold checks</td>
                <td className="px-5 py-3 text-steel">Real-time alerting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Lapse Windows & Remediation ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Lapse Windows &amp; Remediation
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          Each assurance class defines a lapse window: the maximum period a
          certification holder may operate without completing its scheduled
          monitoring obligations before the assurance state degrades. After the
          lapse window expires, the certification remains technically valid but
          the status transitions to <strong>Assurance Lapsed</strong>, which is
          visible on the public registry.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { class: 'A' as const, window: '90 days', note: 'Annual renewal deadline plus 90-day grace period.' },
            { class: 'B' as const, window: '60 days', note: 'Monthly report deadline plus 60-day grace period.' },
            { class: 'C' as const, window: '30 days', note: 'Continuous monitoring gap exceeding 30 days triggers lapse.' },
          ].map((lw) => (
            <div
              key={lw.class}
              className="border border-border rounded-lg p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <AssuranceClassBadge assuranceClass={lw.class} size="sm" />
                <span className="font-mono text-lg font-bold text-charcoal">
                  {lw.window}
                </span>
              </div>
              <p className="text-xs text-steel leading-relaxed">{lw.note}</p>
            </div>
          ))}
        </div>

        <div className="border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-3">
            After Lapse
          </h3>
          <ul className="space-y-2">
            {[
              'The certification remains on record but the assurance state transitions to Assurance Lapsed.',
              'The lapsed status is published in the public registry and is visible to all querying parties.',
              'The certified organization must complete the outstanding monitoring obligations and submit a remediation report to the certifying AVB to restore active assurance.',
              'If the lapse exceeds twice the original lapse window, the AVB may require a partial or full re-evaluation.',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-steel"
              >
                <span className="text-slate-400 mt-0.5 shrink-0">&bull;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Level Comparison (retained from v1.0) ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Level Comparison
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Side-by-side comparison of certification requirements across all three
          evaluation levels. All values represent minimum thresholds for
          certification eligibility.
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

      {/* ---- Domain Score Thresholds (retained from v1.0) ---- */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Domain Score Thresholds
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Each evaluation level requires minimum passing scores across all
          applicable evaluation domains. Scores are expressed as percentages of
          full compliance within each domain.
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
              {Object.keys(certificationLevels[2]?.domainThresholds ?? {}).map(
                (domain) => (
                  <tr key={domain}>
                    <td className="px-5 py-3 font-medium text-charcoal whitespace-nowrap">
                      {domain}
                    </td>
                    {certificationLevels.map((cl) => {
                      const score = cl.domainThresholds?.[domain];
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
                ),
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Navigation links ---- */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Continue Reading
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/certification/risk-classification"
            className="group block border border-border rounded-lg p-5 hover:border-charcoal transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:underline mb-1">
              Risk Classification
            </h3>
            <p className="text-xs text-muted">
              How deployment risk tiers map to evaluation levels and assurance
              classes.
            </p>
          </Link>
          <Link
            href="/certification/platform"
            className="group block border border-border rounded-lg p-5 hover:border-charcoal transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:underline mb-1">
              Platform Certification
            </h3>
            <p className="text-xs text-muted">
              Certify the platform once, inherit ACRs across deployments.
            </p>
          </Link>
          <Link
            href="/evaluation"
            className="group block border border-border rounded-lg p-5 hover:border-charcoal transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:underline mb-1">
              Evaluation Methodology
            </h3>
            <p className="text-xs text-muted">
              The end-to-end evaluation process from scoping through final
              certification decision.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
