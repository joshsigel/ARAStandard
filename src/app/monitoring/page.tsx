import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AssuranceClassBadge } from '@/components/badges/AssuranceClassBadge';

export const metadata: Metadata = {
  title: 'Continuous Assurance Platform — v1.1',
  description:
    'Post-certification monitoring for ARA-certified autonomous systems: class-differentiated monitoring, CAPO requirements, telemetry architecture, operational states, and lapse windows.',
};

export default function MonitoringPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Monitoring' }]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Continuous Assurance Platform — v1.1
        </h1>
        <div className="prose max-w-3xl">
          <p>
            ARA certification is not a point-in-time assessment. The Continuous
            Assurance Platform (CAP) extends certification integrity into
            production by monitoring certified systems for behavioral drift,
            compliance degradation, and operational anomalies throughout the
            certification period.
          </p>
          <p>
            In v1.1, monitoring requirements are differentiated by{' '}
            <strong>Assurance Class</strong>. Class A (Periodic) systems
            self-monitor with annual review. Class B (Monitored) and Class C
            (Continuous) systems require a{' '}
            <strong>Certified Assurance Platform Operator (CAPO)</strong> to
            provide ongoing monitoring infrastructure and incident response.
          </p>
        </div>
      </header>

      {/* Class-Differentiated Monitoring */}
      <section id="class-monitoring" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#class-monitoring"
            className="hover:text-navy transition-colors"
          >
            Class-Differentiated Monitoring
          </a>
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          Monitoring depth, cadence, and infrastructure requirements scale with
          the Assurance Class. Higher classes demand greater automation,
          tighter SLAs, and dedicated CAPO involvement.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <AssuranceClassBadge assuranceClass="A" />
          <AssuranceClassBadge assuranceClass="B" />
          <AssuranceClassBadge assuranceClass="C" />
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  <th className="text-left font-semibold px-5 py-3 text-charcoal">
                    Metric
                  </th>
                  <th className="text-center font-semibold px-5 py-3 text-charcoal">
                    <AssuranceClassBadge assuranceClass="A" size="sm" />
                  </th>
                  <th className="text-center font-semibold px-5 py-3 text-charcoal">
                    <AssuranceClassBadge assuranceClass="B" size="sm" />
                  </th>
                  <th className="text-center font-semibold px-5 py-3 text-charcoal">
                    <AssuranceClassBadge assuranceClass="C" size="sm" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-5 py-3 font-medium text-charcoal">
                    CAPO Required
                  </td>
                  <td className="px-5 py-3 text-center text-muted">No</td>
                  <td className="px-5 py-3 text-center text-steel font-medium">
                    Yes
                  </td>
                  <td className="px-5 py-3 text-center text-steel font-medium">
                    Yes
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-charcoal">
                    Reporting Cadence
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Annual self-assessment
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Monthly CAPO reports
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    24/7 real-time
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-charcoal">
                    Telemetry
                  </td>
                  <td className="px-5 py-3 text-center text-muted">
                    Basic (optional)
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Automated collection
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Full pipeline required
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-charcoal">
                    Drift Detection
                  </td>
                  <td className="px-5 py-3 text-center text-muted">
                    Self-monitored
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    CAPO-managed
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Real-time with alerting
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-charcoal">
                    Incident Response
                  </td>
                  <td className="px-5 py-3 text-center text-muted">
                    Self-managed
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    CAPO-assisted
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    CAPO-led, ≤4hr response
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-medium text-charcoal">
                    Review Cadence
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Annual AVB review
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Quarterly AVB review
                  </td>
                  <td className="px-5 py-3 text-center text-steel">
                    Continuous AVB oversight
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CAPO */}
      <section id="capo" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#capo" className="hover:text-navy transition-colors">
            Certified Assurance Platform Operators (CAPOs)
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            CAPOs are organizations certified by ARAF to provide continuous
            monitoring infrastructure and assurance services for Class B and
            Class C certified systems. They serve as the operational backbone of
            post-certification assurance, bridging the gap between the certified
            organization and the certifying AVB.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              What CAPOs Do
            </h3>
            <ul className="space-y-2">
              {[
                'Continuous monitoring of certified system telemetry against behavioral baselines',
                'Telemetry analysis including trend detection and statistical anomaly identification',
                'Drift detection with configurable thresholds per domain and assurance class',
                'Incident escalation to AVBs and certified organizations with documented response chains',
                'Compliance reporting on agreed cadences (monthly for Class B, real-time for Class C)',
                'Revalidation trigger management when monitoring signals breach thresholds',
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
              CAPO Technical Requirements
            </h3>
            <ul className="space-y-2">
              {[
                'Telemetry ingestion pipeline capable of processing structured ARA telemetry events',
                'Anomaly detection engine with statistical and rule-based analysis capabilities',
                'Real-time monitoring dashboard accessible to certified organizations and AVBs',
                'Alerting system with configurable severity levels and escalation paths',
                'Automated compliance reporting with audit trail and data retention',
                'Secure data handling with encryption in transit (TLS 1.3) and at rest (AES-256)',
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

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-4">
            CAPO SLA Metrics by Assurance Class
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AssuranceClassBadge assuranceClass="B" size="sm" />
                <span className="text-sm font-semibold text-charcoal">
                  Class B SLAs
                </span>
              </div>
              <ul className="space-y-1.5">
                {[
                  '99.5% platform uptime',
                  '24-hour report turnaround',
                  'Monthly compliance summary delivered to AVB',
                  'Drift alerts within 4 hours of detection',
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
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AssuranceClassBadge assuranceClass="C" size="sm" />
                <span className="text-sm font-semibold text-charcoal">
                  Class C SLAs
                </span>
              </div>
              <ul className="space-y-1.5">
                {[
                  '99.9% platform uptime',
                  '4-hour incident response time',
                  'Real-time monitoring dashboard (≤30s latency)',
                  '15-minute escalation to AVB for critical alerts',
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
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/ecosystem/capos"
              className="text-sm text-navy font-medium hover:underline"
            >
              View CAPO directory &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Operational States */}
      <section id="operational-states" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#operational-states"
            className="hover:text-navy transition-colors"
          >
            Operational States
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Every ARA-certified system exists in one of six operational states
            throughout its certification lifecycle. State transitions are
            triggered by monitoring events, time-based conditions, or governance
            actions. New in v1.1, the &ldquo;Active &mdash; Assurance
            Lapsed&rdquo; state provides a grace period before suspension.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {[
            {
              state: 'Active',
              color: 'bg-emerald-500',
              description:
                'Certification valid and monitoring compliant. All reporting obligations current. System in good standing.',
            },
            {
              state: 'Active — Assurance Lapsed',
              color: 'bg-amber-500',
              description:
                'Certification remains valid but monitoring obligations are overdue. The lapse window is active — the organization must remediate within the class-specific lapse period to avoid suspension.',
            },
            {
              state: 'Under Revalidation',
              color: 'bg-blue-500',
              description:
                'Triggered by a material change notification, monitoring threshold breach, or incident report. The system remains operational but is undergoing targeted or full revalidation by the certifying AVB.',
            },
            {
              state: 'Suspended',
              color: 'bg-red-500',
              description:
                'Certification temporarily invalid. Typically triggered by an unremediated lapse, a critical monitoring breach, or a governance action. The system must not represent itself as ARA-certified while suspended.',
            },
            {
              state: 'Expired',
              color: 'bg-slate-400',
              description:
                'The certification has passed its validity period without renewal. The organization must undergo reassessment to restore certification.',
            },
            {
              state: 'Revoked',
              color: 'bg-slate-700',
              description:
                'Certification permanently invalidated by governance action. Revocation is reserved for material misrepresentation, fraud, or sustained non-compliance. A revoked certification cannot be reinstated — the organization must apply for a new certification.',
            },
          ].map((item) => (
            <div
              key={item.state}
              className="border border-border rounded-lg p-5 flex items-start gap-4"
            >
              <span
                className={`mt-1 shrink-0 w-3 h-3 rounded-full ${item.color}`}
              />
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-1">
                  {item.state}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lapse Windows */}
      <section id="lapse-windows" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#lapse-windows"
            className="hover:text-navy transition-colors"
          >
            Lapse Windows
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            When monitoring obligations fall overdue, the system enters
            the &ldquo;Active &mdash; Assurance Lapsed&rdquo; state. Each
            Assurance Class defines a lapse window — the maximum period during
            which the organization may remediate before automatic suspension.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <AssuranceClassBadge assuranceClass="A" size="sm" />
              <span className="text-xl font-bold text-charcoal">90 days</span>
            </div>
            <p className="text-sm text-steel leading-relaxed mb-3">
              After lapse, the organization must re-establish periodic
              self-assessment and submit a remediation report to the certifying
              AVB.
            </p>
            <p className="text-xs text-muted">
              Annual self-assessment cycle must resume before lapse window
              closes.
            </p>
          </div>

          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <AssuranceClassBadge assuranceClass="B" size="sm" />
              <span className="text-xl font-bold text-charcoal">60 days</span>
            </div>
            <p className="text-sm text-steel leading-relaxed mb-3">
              Monthly CAPO reports must resume. A gap analysis covering the
              lapse period is required before the system returns to Active
              status.
            </p>
            <p className="text-xs text-muted">
              CAPO must confirm monitoring restoration and deliver a lapse
              period review.
            </p>
          </div>

          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <AssuranceClassBadge assuranceClass="C" size="sm" />
              <span className="text-xl font-bold text-charcoal">30 days</span>
            </div>
            <p className="text-sm text-steel leading-relaxed mb-3">
              Continuous monitoring must be fully restored. An incident review
              covering the lapse period is required, and the CAPO must confirm
              pipeline integrity.
            </p>
            <p className="text-xs text-muted">
              Real-time telemetry must resume with ≤30s latency before lapse
              window closes.
            </p>
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg p-5 bg-slate-50">
          <h3 className="text-sm font-semibold text-charcoal mb-2">
            Status Progression
          </h3>
          <div className="flex items-center gap-3 text-sm text-steel flex-wrap">
            <span className="font-medium text-charcoal flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              Active
            </span>
            <span className="text-slate-300">&rarr;</span>
            <span className="font-medium text-charcoal flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              Assurance Lapsed
            </span>
            <span className="text-slate-300">&rarr;</span>
            <span className="font-medium text-charcoal flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
              Suspended
            </span>
            <span className="text-muted ml-1">(if unremediated)</span>
          </div>
        </div>
      </section>

      {/* Telemetry Architecture */}
      <section id="telemetry-architecture" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#telemetry-architecture"
            className="hover:text-navy transition-colors"
          >
            Telemetry Architecture
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            The ARA Telemetry SDK is the primary integration mechanism for
            connecting certified systems to the Continuous Assurance Platform.
            The SDK provides a lightweight, language-agnostic interface for
            reporting telemetry events, drift metrics, and operational status to
            the monitoring infrastructure (self-hosted for Class A, CAPO-managed
            for Class B and C).
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Event Types
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Operational Events
                </h4>
                <ul className="space-y-1.5">
                  {[
                    'System startup and shutdown events',
                    'Decision execution events (with outcome metadata)',
                    'Autonomy boundary enforcement events',
                    'Escalation and override events',
                    'Tool invocation events',
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
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Drift Metrics
                </h4>
                <ul className="space-y-1.5">
                  {[
                    'Decision distribution snapshots',
                    'Error rate rolling averages',
                    'Escalation frequency tracking',
                    'Latency profile distributions',
                    'Boundary adherence scores',
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
          </div>

          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Event Types (continued)
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Incident Signals
                </h4>
                <ul className="space-y-1.5">
                  {[
                    'Error and exception events',
                    'Boundary exceedance notifications',
                    'Unauthorized autonomous action alerts',
                    'Cascading failure indicators',
                    'Version change without notification flags',
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
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Health Checks
                </h4>
                <ul className="space-y-1.5">
                  {[
                    'Periodic heartbeat signals',
                    'Telemetry pipeline health status',
                    'Model or version change events',
                    'Resource consumption baselines',
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
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-4">
            Integration Patterns by Assurance Class
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AssuranceClassBadge assuranceClass="B" size="sm" />
                <span className="text-sm font-semibold text-charcoal">
                  Class B Integration
                </span>
              </div>
              <ul className="space-y-1.5">
                {[
                  'Telemetry SDK reports to CAPO-managed ingestion endpoint',
                  'Automated daily batch collection with optional real-time streaming',
                  'CAPO processes drift analysis on configurable schedules',
                  'Monthly compliance reports generated and delivered to AVB',
                  'Webhook-based alerting for threshold breaches',
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
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AssuranceClassBadge assuranceClass="C" size="sm" />
                <span className="text-sm font-semibold text-charcoal">
                  Class C Integration
                </span>
              </div>
              <ul className="space-y-1.5">
                {[
                  'Full telemetry pipeline with real-time streaming (≤30s latency)',
                  'Continuous drift analysis with real-time anomaly detection',
                  'Live monitoring dashboard accessible to organization, CAPO, and AVB',
                  'Automated escalation within 15 minutes for critical alerts',
                  'mTLS required for all API interactions',
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
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/developers/telemetry"
              className="text-sm text-navy font-medium hover:underline"
            >
              View Telemetry SDK documentation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Drift Detection */}
      <section id="drift-detection" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#drift-detection"
            className="hover:text-navy transition-colors"
          >
            Drift Detection
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Behavioral drift occurs when a certified system&apos;s operational
            characteristics diverge from the behavioral baseline established
            during evaluation. Drift may result from model updates, data
            distribution shifts, environmental changes, or emergent behavior
            patterns. Drift detection responsibility varies by class: self-monitored
            for Class A, CAPO-managed for Class B, and real-time with automated
            alerting for Class C.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Drift Dimension
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  What Is Measured
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Threshold Behavior
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Decision distribution
                </td>
                <td className="px-5 py-3 text-steel">
                  Statistical distribution of decision outcomes compared to
                  the baseline. Detects shifts in decision frequency, outcome
                  ratios, or action type distribution.
                </td>
                <td className="px-5 py-3 text-steel">
                  Warning at 15% deviation; critical at 30% deviation from
                  baseline distribution.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Error rate
                </td>
                <td className="px-5 py-3 text-steel">
                  Rate of errors, exceptions, and failed operations relative
                  to total operations. Tracked as a rolling average with
                  configurable window.
                </td>
                <td className="px-5 py-3 text-steel">
                  Warning at 2x baseline error rate; critical at 5x baseline
                  error rate.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Escalation frequency
                </td>
                <td className="px-5 py-3 text-steel">
                  Rate of escalation events compared to baseline. Both
                  increases and decreases may indicate drift — a system that
                  stops escalating may be bypassing controls.
                </td>
                <td className="px-5 py-3 text-steel">
                  Warning at 50% increase or 30% decrease from baseline
                  frequency.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Boundary adherence
                </td>
                <td className="px-5 py-3 text-steel">
                  Frequency and severity of operations approaching or
                  exceeding declared autonomy boundaries.
                </td>
                <td className="px-5 py-3 text-steel">
                  Any boundary exceedance triggers an immediate critical
                  alert.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Latency profile
                </td>
                <td className="px-5 py-3 text-steel">
                  Response time distribution for decision execution.
                  Significant latency changes may indicate underlying system
                  changes.
                </td>
                <td className="px-5 py-3 text-steel">
                  Warning at p99 latency exceeding 3x baseline.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Revalidation Triggers */}
      <section id="revalidation" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#revalidation"
            className="hover:text-navy transition-colors"
          >
            Revalidation Triggers
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Beyond scheduled reassessment cycles, monitoring data may trigger
            unscheduled revalidation when it indicates potential compliance
            degradation. Revalidation triggers are automatic — they cannot be
            suppressed by the certified organization, the CAPO, or the AVB.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {[
            {
              trigger: 'Sustained drift threshold breach',
              description:
                'A drift dimension exceeds the critical threshold for more than 48 consecutive hours without remediation.',
              action:
                'Targeted revalidation of affected domains. AVB must initiate within 10 business days.',
            },
            {
              trigger: 'Blocking ACR indicator',
              description:
                'Runtime telemetry suggests that a blocking ACR may no longer be satisfied (e.g., escalation path unavailability, boundary enforcement failure).',
              action:
                'Immediate AVB notification. Certification suspension pending investigation if not resolved within 24 hours.',
            },
            {
              trigger: 'Telemetry gap',
              description:
                'The system fails to report required telemetry for a period exceeding the maximum allowable gap. Class A: 30 days. Class B: 72 hours. Class C: 1 hour.',
              action:
                'Warning issued to organization. Escalation to AVB if gap persists beyond the class-specific lapse window threshold.',
            },
            {
              trigger: 'Version change without notification',
              description:
                'Monitoring detects behavioral signatures consistent with a material system change that was not reported through the version tracking interface.',
              action:
                'Critical alert. Organization must provide a version change report within 48 hours or face suspension review.',
            },
            {
              trigger: 'Incident report',
              description:
                'A material safety incident, unauthorized autonomous action, or operational failure is reported by the organization, a user, or a third party.',
              action:
                'AVB-led incident review. For Class B/C, CAPO provides monitoring data for investigation. Revalidation scope determined by findings.',
            },
            {
              trigger: 'External intelligence',
              description:
                'ARAF receives credible information (e.g., vulnerability disclosure, regulatory action) that may affect the certified system\u2019s compliance status.',
              action:
                'Targeted revalidation or full reassessment as determined by ARAF.',
            },
          ].map((item) => (
            <div
              key={item.trigger}
              className="border border-border rounded-lg p-5"
            >
              <h3 className="text-sm font-semibold text-charcoal mb-1">
                {item.trigger}
              </h3>
              <p className="text-sm text-steel leading-relaxed mb-2">
                {item.description}
              </p>
              <p className="text-xs text-muted">
                <span className="font-semibold">Action:</span> {item.action}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Certification Inheritance Monitoring */}
      <section id="inheritance-monitoring" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#inheritance-monitoring"
            className="hover:text-navy transition-colors"
          >
            Certification Inheritance Monitoring
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            When a deployment inherits from a platform certification, monitoring
            must cover both the platform layer and the deployment layer. This
            dual-layer monitoring ensures that inherited compliance guarantees
            remain valid throughout the certification period.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Platform Vendor Responsibilities
            </h3>
            <ul className="space-y-2">
              {[
                'Maintains platform-layer monitoring per its own Assurance Class',
                'Reports platform-layer telemetry to its designated CAPO (if Class B/C)',
                'Notifies deployment operators of platform-level changes that may affect inherited domains',
                'Provides platform health data accessible to deployment CAPOs',
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
              Deployment Operator Responsibilities
            </h3>
            <ul className="space-y-2">
              {[
                'Maintains deployment-layer monitoring per its own Assurance Class',
                'Reports deployment-specific telemetry covering non-inherited domains',
                'Monitors the integration boundary between platform and deployment layers',
                'Tracks platform vendor notifications for changes affecting inherited compliance',
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

        <div className="mt-6 border border-border rounded-lg p-5 bg-slate-50">
          <h3 className="text-sm font-semibold text-charcoal mb-2">
            Combined Stack Monitoring
          </h3>
          <p className="text-sm text-steel leading-relaxed">
            When a CAPO is involved (Class B or C deployments), the CAPO
            monitors the combined stack — both the platform-layer signals and
            the deployment-layer signals. The CAPO correlates cross-layer
            telemetry to detect drift or incidents that span the inheritance
            boundary, ensuring that neither the platform vendor nor the
            deployment operator has a blind spot in their compliance posture.
          </p>
        </div>
      </section>

      {/* Version Tracking */}
      <section id="version-tracking" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#version-tracking"
            className="hover:text-navy transition-colors"
          >
            Version Tracking
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            ARA certification is scoped to a specific system version. Any
            material change to the certified system must be reported via the
            version tracking interface. Version changes are categorized and may
            trigger different levels of revalidation.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Change Category
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Examples
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Impact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Minor configuration
                </td>
                <td className="px-5 py-3 text-steel">
                  Threshold adjustments, feature flag toggles, UI changes
                  with no decision logic impact.
                </td>
                <td className="px-5 py-3 text-steel">
                  Logged only. No revalidation required.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Model update
                </td>
                <td className="px-5 py-3 text-steel">
                  Foundation model version change, fine-tuning update,
                  embedding model swap.
                </td>
                <td className="px-5 py-3 text-steel">
                  AVB notification required. Targeted revalidation of
                  affected domains.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Logic change
                </td>
                <td className="px-5 py-3 text-steel">
                  Decision tree modifications, new tool integrations,
                  autonomy boundary adjustments.
                </td>
                <td className="px-5 py-3 text-steel">
                  Full recertification may be required. AVB determination
                  within 10 business days.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal align-top whitespace-nowrap">
                  Scope expansion
                </td>
                <td className="px-5 py-3 text-steel">
                  New deployment environment, new user population, expanded
                  geographic or operational scope.
                </td>
                <td className="px-5 py-3 text-steel">
                  Full recertification required for the expanded scope.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-references */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Related Documentation
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/ecosystem/capos"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              CAPO Directory
            </h3>
            <p className="text-xs text-muted">
              Browse Certified Assurance Platform Operators and their service
              offerings.
            </p>
          </Link>
          <Link
            href="/developers/telemetry"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Telemetry SDK
            </h3>
            <p className="text-xs text-muted">
              SDK documentation, integration guides, and event schema
              reference.
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
            href="/evaluation"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Evaluation Methodology
            </h3>
            <p className="text-xs text-muted">
              10-phase certification lifecycle and scoring methodology.
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
              Authorized Validation Body requirements and accreditation
              process.
            </p>
          </Link>
          <Link
            href="/governance"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Governance Framework
            </h3>
            <p className="text-xs text-muted">
              TSB, advisory bodies, and ecosystem governance structure.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
