import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RiskProfileDemo } from '@/components/visualizations/RiskProfileDemo';
import { AssuranceClassBadge } from '@/components/badges/AssuranceClassBadge';

export const metadata: Metadata = {
  title: 'Risk Classification',
  description:
    'Mandatory 7-factor risk assessment determining Assurance Class (A/B/C) for ARA v1.1 certification.',
};

/* ---------------------------------------------------------------------------
 * Risk factor card data
 * --------------------------------------------------------------------------- */

const riskFactors = [
  {
    number: 1,
    name: 'Autonomy Scope',
    description: 'Breadth of autonomous decision-making.',
    lowExample: 'narrow task automation (1)',
    highExample: 'open-ended autonomous agents (5)',
  },
  {
    number: 2,
    name: 'Consequence Severity',
    description: 'Potential impact of system failure.',
    lowExample: 'minor inconvenience (1)',
    highExample: 'loss of life or critical infrastructure (5)',
  },
  {
    number: 3,
    name: 'Decision Reversibility',
    description: 'Whether autonomous actions can be undone.',
    lowExample: 'easily reversible suggestions (1)',
    highExample: 'irreversible physical actions (5)',
  },
  {
    number: 4,
    name: 'Operational Environment',
    description: 'Complexity and unpredictability of deployment context.',
    lowExample: 'controlled lab environment (1)',
    highExample: 'open-world with adversarial actors (5)',
  },
  {
    number: 5,
    name: 'Data Sensitivity',
    description: 'Classification of data accessed and processed.',
    lowExample: 'public data only (1)',
    highExample: 'classified/PII/financial data (5)',
  },
  {
    number: 6,
    name: 'Scale of Impact',
    description: 'Number of people or systems affected.',
    lowExample: 'single user (1)',
    highExample: 'population-scale (5)',
  },
  {
    number: 7,
    name: 'Regulatory Exposure',
    description: 'Degree of regulatory oversight applicable.',
    lowExample: 'unregulated domain (1)',
    highExample: 'heavily regulated (healthcare, finance, aviation) (5)',
  },
] as const;

/* ---------------------------------------------------------------------------
 * Page component
 * --------------------------------------------------------------------------- */

export default function RiskClassificationPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      {/* ---- Breadcrumb ---- */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Certification', href: '/certification' },
          { label: 'Risk Classification' },
        ]}
        className="mb-8"
      />

      {/* ---- Page header ---- */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-3">
          Risk Classification
        </h1>
        <p className="text-lg text-steel max-w-2xl">
          Mandatory 7-factor assessment determining Assurance Class
        </p>
      </header>

      {/* ---- Overview ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">Overview</h2>
        <div className="prose max-w-3xl">
          <p>
            Risk classification is a mandatory step in the ARA certification
            process (Phase 2). An AVB conducts the assessment to determine the
            appropriate Assurance Class for the system being certified. The
            assessment evaluates 7 risk factors, each scored 1&ndash;5.
          </p>
        </div>
      </section>

      {/* ---- RiskSpider Visualization ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Risk Profile Visualization
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Select an Assurance Class to see a representative risk profile. Hover
          over any data point on the chart to see the factor name, score, and
          description.
        </p>
        <RiskProfileDemo />
      </section>

      {/* ---- The 7 Risk Factors ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          The 7 Risk Factors
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          Each factor is independently scored from 1 (lowest risk) to 5 (highest
          risk) by the certifying AVB based on system documentation and
          operational context.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {riskFactors.map((factor) => (
            <div
              key={factor.number}
              className="border border-border rounded-lg p-5 flex gap-4"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 font-mono text-sm font-bold text-charcoal">
                {factor.number}
              </span>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold text-charcoal">
                  {factor.name}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {factor.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                  <span>
                    <span className="font-medium text-charcoal">Low:</span>{' '}
                    {factor.lowExample}
                  </span>
                  <span>
                    <span className="font-medium text-charcoal">High:</span>{' '}
                    {factor.highExample}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Class Determination Rules ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Class Determination Rules
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          The following rules are applied in order to determine the minimum
          Assurance Class. Organizations may voluntarily choose a higher class
          but may not select a lower one.
        </p>

        <div className="space-y-3 max-w-2xl">
          {[
            {
              rule: 'If any factor scores 5',
              result: 'minimum Class C',
              class: 'C' as const,
            },
            {
              rule: 'If average score > 3.5',
              result: 'minimum Class B',
              class: 'B' as const,
            },
            {
              rule: 'If any 3+ factors score 4+',
              result: 'minimum Class B',
              class: 'B' as const,
            },
            {
              rule: 'Otherwise',
              result: 'Class A eligible',
              class: 'A' as const,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border border-border rounded-lg px-5 py-3"
            >
              <span className="text-sm text-steel flex-1">{item.rule}</span>
              <span className="text-sm font-medium text-charcoal mx-2">
                &rarr;
              </span>
              <AssuranceClassBadge assuranceClass={item.class} size="sm" />
            </div>
          ))}
        </div>

        <div className="mt-6 border border-border rounded-lg p-5 bg-slate-50 max-w-2xl">
          <p className="text-sm text-steel leading-relaxed">
            <span className="font-semibold text-charcoal">
              Voluntary upgrade:
            </span>{' '}
            Organizations may voluntarily choose a higher Assurance Class than
            the one determined by the risk assessment. A higher class imposes
            stricter ongoing monitoring requirements but may be desirable for
            regulatory, reputational, or contractual reasons.
          </p>
        </div>
      </section>

      {/* ---- Assessment Process ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Assessment Process
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          The risk classification assessment follows a structured six-step
          process conducted during Phase 2 of the certification lifecycle.
        </p>

        <div className="space-y-4 max-w-2xl">
          {[
            {
              step: 1,
              title: 'Documentation Review',
              description:
                'AVB reviews system documentation and operational context to understand the system scope, capabilities, and deployment environment.',
            },
            {
              step: 2,
              title: 'Independent Scoring',
              description:
                'Each of the 7 risk factors is scored independently with documented rationale explaining the assigned score.',
            },
            {
              step: 3,
              title: 'Score Aggregation',
              description:
                'Scores are aggregated using the determination rules to identify the minimum Assurance Class.',
            },
            {
              step: 4,
              title: 'Class Recommendation',
              description:
                'The AVB produces a recommended Assurance Class based on the aggregated scores and any additional risk considerations.',
            },
            {
              step: 5,
              title: 'Organization Acceptance',
              description:
                'The organization may accept the recommended class or request a higher class. The organization may not request a lower class.',
            },
            {
              step: 6,
              title: 'Record Finalization',
              description:
                'The final Assurance Class is recorded in the certification record along with the full scoring rationale.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 border border-border rounded-lg p-5"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-charcoal text-white text-xs font-bold">
                {item.step}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Navigation links ---- */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Continue Reading
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/certification"
            className="group block border border-border rounded-lg p-5 hover:border-charcoal transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:underline mb-1">
              Certification Model
            </h3>
            <p className="text-xs text-muted">
              Two-axis certification framework combining Evaluation Level with
              Assurance Class.
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
