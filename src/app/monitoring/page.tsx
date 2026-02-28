import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Continuous Assurance Platform',
  description:
    'Post-certification monitoring for ARA-certified autonomous systems: telemetry SDK, drift detection, runtime monitoring, version tracking, and revalidation triggers.',
};

export default function MonitoringPage() {
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
          <li className="text-charcoal font-medium">Monitoring</li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Continuous Assurance Platform
        </h1>
        <div className="prose max-w-3xl">
          <p>
            ARA certification is not a point-in-time assessment. The Continuous
            Assurance Platform (CAP) extends certification integrity into
            production by monitoring certified systems for behavioral drift,
            compliance degradation, and operational anomalies throughout the
            certification period. Every ARA-certified system must enroll in
            CAP within 30 days of certification issuance.
          </p>
          <p>
            CAP operates as a passive monitoring layer — it collects telemetry
            data reported by the certified system, analyzes it against the
            certified behavioral baseline, and triggers alerts or revalidation
            workflows when deviations are detected. CAP does not modify,
            control, or interfere with the monitored system&apos;s operations.
          </p>
        </div>
      </header>

      {/* CAP Overview */}
      <section id="overview" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#overview" className="hover:text-navy transition-colors">
            Platform Overview
          </a>
        </h2>
        <p className="text-sm text-muted mb-6 max-w-3xl">
          CAP provides a unified monitoring infrastructure that scales from
          basic telemetry collection (L1) to full production monitoring with
          real-time alerting (L3). The platform is operated by ARAF and
          accessible to certified organizations, their certifying AVBs, and
          authorized regulatory consumers.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Data Ingestion
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              Telemetry data is ingested via the ARA Telemetry SDK or direct
              API integration. The platform accepts structured telemetry events,
              drift reports, version change notifications, and incident reports.
              All data is encrypted in transit (TLS 1.3) and at rest (AES-256).
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Baseline Comparison
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              At certification time, a behavioral baseline is established from
              the evaluation evidence and initial production telemetry. CAP
              continuously compares incoming telemetry against this baseline to
              detect deviations in decision patterns, error rates, response
              distributions, and operational boundaries.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-3">
              Alerting &amp; Response
            </h3>
            <p className="text-sm text-steel leading-relaxed">
              When deviations exceed configured thresholds, CAP generates alerts
              directed to the certified organization and the certifying AVB.
              Alert severity levels (informational, warning, critical) determine
              the required response timeline and may trigger revalidation
              workflows.
            </p>
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Capability
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l1">L1</span>
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l2">L2</span>
                </th>
                <th className="text-center font-semibold px-5 py-3 text-charcoal">
                  <span className="level-badge level-badge-l3">L3</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Telemetry SDK integration
                </td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Minimum reporting frequency
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  Daily
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  Hourly
                </td>
                <td className="px-5 py-3 text-center font-mono text-steel">
                  Real-time
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Drift detection
                </td>
                <td className="px-5 py-3 text-center text-muted">
                  Basic
                </td>
                <td className="px-5 py-3 text-center text-steel">
                  Full + thresholds
                </td>
                <td className="px-5 py-3 text-center text-steel">
                  Full + real-time alerts
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Version tracking
                </td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
                <td className="px-5 py-3 text-center text-steel">Required</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Incident response drills
                </td>
                <td className="px-5 py-3 text-center text-muted">
                  Not required
                </td>
                <td className="px-5 py-3 text-center text-muted">
                  Recommended
                </td>
                <td className="px-5 py-3 text-center text-steel">
                  Required (quarterly)
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Authentication
                </td>
                <td className="px-5 py-3 text-center text-steel">API key</td>
                <td className="px-5 py-3 text-center text-steel">API key</td>
                <td className="px-5 py-3 text-center text-steel">
                  API key + mTLS
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Telemetry SDK */}
      <section id="telemetry-sdk" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#telemetry-sdk"
            className="hover:text-navy transition-colors"
          >
            Telemetry SDK
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            The ARA Telemetry SDK is the primary integration mechanism for
            connecting certified systems to the Continuous Assurance Platform.
            The SDK provides a lightweight, language-agnostic interface for
            reporting telemetry events, drift metrics, and operational status.
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              SDK Capabilities
            </h3>
            <ul className="space-y-2">
              {[
                'Structured telemetry event reporting with ARA-defined schemas',
                'Automatic batching and compression for high-volume systems',
                'Configurable reporting intervals (real-time, batched, or scheduled)',
                'Built-in retry logic with exponential backoff for transient failures',
                'Local buffering during network outages with automatic catch-up',
                'Cryptographic signing of telemetry payloads for integrity verification',
                'Support for custom telemetry dimensions within the ARA schema',
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
              Platform Support
            </h3>
            <ul className="space-y-2">
              {[
                'Python SDK (pip install ara-telemetry)',
                'Node.js / TypeScript SDK (npm install @ara/telemetry)',
                'Go SDK (go get github.com/arastandard/telemetry-go)',
                'Java SDK (Maven Central: org.arastandard:telemetry)',
                'REST API for environments without native SDK support',
                'OpenTelemetry collector integration for existing observability stacks',
                'Kubernetes sidecar deployment option for containerized systems',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-steel"
                >
                  <span className="text-slate-400 mt-0.5 shrink-0">
                    &bull;
                  </span>
                  <span>
                    {item.includes('(') ? (
                      <>
                        {item.split('(')[0]}
                        <span className="font-mono text-xs text-muted">
                          ({item.split('(').slice(1).join('(')}
                        </span>
                      </>
                    ) : (
                      item
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-3">
            Minimum Telemetry Events
          </h3>
          <p className="text-sm text-steel mb-4 max-w-[72ch]">
            All certified systems must report the following minimum telemetry
            event types. Additional event types may be required depending on
            the system&apos;s domain applicability and certification level.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5">
            {[
              'System startup and shutdown events',
              'Decision execution events (with outcome metadata)',
              'Autonomy boundary enforcement events',
              'Escalation and override events',
              'Error and exception events',
              'Tool invocation events (for systems with tool access)',
              'Model or version change events',
              'Drift metric snapshots',
            ].map((event) => (
              <div
                key={event}
                className="flex items-start gap-2.5 text-sm text-steel"
              >
                <span className="text-slate-400 mt-0.5 shrink-0">&bull;</span>
                {event}
              </div>
            ))}
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
            patterns. CAP monitors for drift across multiple dimensions and
            escalates when drift exceeds configured thresholds.
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

      {/* Runtime Monitoring */}
      <section id="runtime-monitoring" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#runtime-monitoring"
            className="hover:text-navy transition-colors"
          >
            Runtime Monitoring
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            Runtime monitoring operates in real-time on the telemetry stream,
            applying rule-based and statistical analysis to detect compliance
            concerns as they occur. Runtime monitoring is required for all
            certification levels, with increasing depth and responsiveness at
            higher levels.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Monitoring Rules
            </h3>
            <p className="text-sm text-steel mb-4">
              CAP applies a layered set of monitoring rules to the incoming
              telemetry stream. Rules are configured per-system based on the
              certification level and domain applicability.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Compliance Rules
                </h4>
                <ul className="space-y-1.5">
                  {[
                    'Autonomy boundary enforcement verification',
                    'Escalation path availability checks',
                    'Human override responsiveness validation',
                    'Audit log completeness verification',
                    'Identity containment assertion checks',
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2.5 text-sm text-steel"
                    >
                      <span className="text-slate-400 mt-0.5 shrink-0">
                        &bull;
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
                  Anomaly Detection
                </h4>
                <ul className="space-y-1.5">
                  {[
                    'Unusual decision pattern detection',
                    'Unexpected tool invocation sequences',
                    'Abnormal resource consumption patterns',
                    'Out-of-distribution input detection',
                    'Cascading failure pattern recognition',
                  ].map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2.5 text-sm text-steel"
                    >
                      <span className="text-slate-400 mt-0.5 shrink-0">
                        &bull;
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-6">
            <h3 className="text-base font-semibold text-charcoal mb-3">
              Alert Severity Levels
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold px-4 py-2 text-charcoal">
                      Severity
                    </th>
                    <th className="text-left font-semibold px-4 py-2 text-charcoal">
                      Response Timeline
                    </th>
                    <th className="text-left font-semibold px-4 py-2 text-charcoal">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2 font-medium text-charcoal">
                      Informational
                    </td>
                    <td className="px-4 py-2 font-mono text-steel">
                      No action required
                    </td>
                    <td className="px-4 py-2 text-steel">
                      Minor deviation within acceptable tolerances. Logged for
                      trend analysis.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-charcoal">
                      Warning
                    </td>
                    <td className="px-4 py-2 font-mono text-steel">
                      72 hours
                    </td>
                    <td className="px-4 py-2 text-steel">
                      Moderate deviation approaching thresholds. Organization
                      must acknowledge and provide a remediation plan.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium text-charcoal">
                      Critical
                    </td>
                    <td className="px-4 py-2 font-mono text-steel">
                      24 hours
                    </td>
                    <td className="px-4 py-2 text-steel">
                      Threshold breach or blocking condition detected. AVB is
                      notified. Failure to respond may trigger certification
                      suspension.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
            material change to the certified system must be reported to CAP
            via the version tracking interface. Version changes are
            categorized and may trigger different levels of revalidation.
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
            Beyond scheduled reassessment cycles, CAP may trigger unscheduled
            revalidation when monitoring data indicates potential compliance
            degradation. Revalidation triggers are automatic — they cannot be
            suppressed by the certified organization or the AVB.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {[
            {
              trigger: 'Sustained drift threshold breach',
              description:
                'A drift dimension exceeds the critical threshold for more than 48 consecutive hours without remediation.',
              action: 'Targeted revalidation of affected domains. AVB must initiate within 10 business days.',
            },
            {
              trigger: 'Blocking ACR indicator',
              description:
                'Runtime telemetry suggests that a blocking ACR may no longer be satisfied (e.g., escalation path unavailability, boundary enforcement failure).',
              action: 'Immediate AVB notification. Certification suspension pending investigation if not resolved within 24 hours.',
            },
            {
              trigger: 'Telemetry gap',
              description:
                'The system fails to report required telemetry for a period exceeding the maximum allowable gap (24 hours for L1/L2, 1 hour for L3).',
              action: 'Warning issued to organization. Escalation to AVB if gap exceeds 72 hours (L1/L2) or 4 hours (L3).',
            },
            {
              trigger: 'Version change without notification',
              description:
                'CAP detects behavioral signatures consistent with a material system change that was not reported through the version tracking interface.',
              action: 'Critical alert. Organization must provide a version change report within 48 hours or face suspension review.',
            },
            {
              trigger: 'Incident report',
              description:
                'A material safety incident, unauthorized autonomous action, or operational failure is reported by the organization, a user, or a third party.',
              action: 'AVB-led incident review. Revalidation scope determined by investigation findings.',
            },
            {
              trigger: 'External intelligence',
              description:
                'ARAF receives credible information (e.g., vulnerability disclosure, regulatory action) that may affect the certified system\u2019s compliance status.',
              action: 'Targeted revalidation or full reassessment as determined by ARAF.',
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

      {/* API Integration */}
      <section id="api-integration" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#api-integration"
            className="hover:text-navy transition-colors"
          >
            API Integration
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            CAP exposes a RESTful API for programmatic integration with
            certified systems, AVBs, and authorized third-party consumers. The
            API supports telemetry submission, status queries, drift report
            submission, webhook registration, and certification verification.
          </p>
          <p>
            All API endpoints require authentication via API key. L3 systems
            additionally require mutual TLS (mTLS) for all API interactions.
            The API uses JSON request and response payloads and follows
            standard HTTP status code conventions.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg p-6 bg-slate-50">
          <h3 className="text-base font-semibold text-charcoal mb-3">
            API Quick Reference
          </h3>
          <div className="space-y-3">
            {[
              { method: 'POST', path: '/api/v1/telemetry', desc: 'Submit telemetry data' },
              { method: 'GET', path: '/api/v1/telemetry/{systemId}/status', desc: 'Get monitoring status' },
              { method: 'POST', path: '/api/v1/telemetry/drift-report', desc: 'Submit drift report' },
              { method: 'POST', path: '/api/v1/webhooks', desc: 'Register webhook' },
              { method: 'GET', path: '/api/v1/verify/{certificationId}', desc: 'Verify certification' },
            ].map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    endpoint.method === 'GET'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {endpoint.method}
                </span>
                <code className="font-mono text-xs text-charcoal">
                  {endpoint.path}
                </code>
                <span className="text-muted">&mdash; {endpoint.desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/monitoring/api"
              className="text-sm text-navy font-medium hover:underline"
            >
              View full API documentation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-references */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Related Documentation
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/monitoring/api"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              API Reference
            </h3>
            <p className="text-xs text-muted">
              Full endpoint documentation, request/response schemas, and
              authentication details.
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
            href="/certification"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Certification Levels
            </h3>
            <p className="text-xs text-muted">
              Monitoring requirements by certification level and
              reassessment schedules.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
