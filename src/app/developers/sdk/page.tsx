import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Telemetry SDK Integration Guide — ARA Standard',
  description:
    'Install and configure the ARA Telemetry SDK. Event types, batching, error handling, retry logic, and class-specific integration for autonomous system monitoring.',
};

export default function SDKGuidePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Developers', href: '/developers' },
          { label: 'SDK Guide' },
        ]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Telemetry SDK Integration Guide
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          The <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">@araf/telemetry-sdk</code> package
          provides a TypeScript client for submitting telemetry events from your
          autonomous system to the ARA Continuous Assurance Platform. It handles
          batching, retries, and transport negotiation based on your Assurance
          Class.
        </p>
      </header>

      {/* Installation */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Installation
        </h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Package Manager
            </h3>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`npm install @araf/telemetry-sdk
# or
yarn add @araf/telemetry-sdk`}</code>
          </pre>
        </div>
      </section>

      {/* Configuration */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Configuration
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          Initialize the SDK with your ARA System Identifier, system profile,
          and telemetry endpoint. The endpoint is provided by your CAPO for
          Class B/C systems, or the ARA public ingestion endpoint for Class A.
        </p>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">
              TypeScript
            </h3>
            <span className="text-xs text-muted font-mono">config.ts</span>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`import { ARATelemetry, SystemProfile } from '@araf/telemetry-sdk';

const telemetry = new ARATelemetry({
  systemId: process.env.ARA_SYSTEM_ID!,
  profile: SystemProfile.STANDARD,
  endpoint: process.env.ARA_TELEMETRY_ENDPOINT!,
  batchSize: 100,
  flushIntervalMs: 5000,
});`}</code>
          </pre>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Option
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Type
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Required
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { opt: 'systemId', type: 'string', req: 'Yes', desc: 'Your ARA System Identifier (e.g., ASI-2026-00142)' },
                { opt: 'profile', type: 'SystemProfile', req: 'Yes', desc: 'System profile: FOUNDATIONAL, STANDARD, ADVANCED, or COMPREHENSIVE' },
                { opt: 'endpoint', type: 'string', req: 'Yes', desc: 'Telemetry ingestion URL (provided by CAPO or ARA)' },
                { opt: 'batchSize', type: 'number', req: 'No', desc: 'Events per batch (default: 50, max: 1000)' },
                { opt: 'flushIntervalMs', type: 'number', req: 'No', desc: 'Auto-flush interval in milliseconds (default: 10000)' },
                { opt: 'maxRetries', type: 'number', req: 'No', desc: 'Maximum retry attempts on failure (default: 3)' },
                { opt: 'debug', type: 'boolean', req: 'No', desc: 'Enable verbose logging (default: false)' },
              ].map((row) => (
                <tr key={row.opt}>
                  <td className="px-5 py-2.5 font-mono text-charcoal text-xs">
                    {row.opt}
                  </td>
                  <td className="px-5 py-2.5 font-mono text-muted text-xs">
                    {row.type}
                  </td>
                  <td className="px-5 py-2.5 text-steel">{row.req}</td>
                  <td className="px-5 py-2.5 text-steel">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Event Types */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-6">
          Event Types
        </h2>

        {/* Operational Events */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            Operational Events
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Track core system operations: decisions, tool invocations, and
            escalations to human oversight.
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">
                  trackDecision()
                </h4>
                <span className="text-xs text-muted font-mono">
                  DecisionEvent
                </span>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface DecisionEvent {
  domain: string;        // ARA domain slug
  action: string;        // Action taken (e.g., 'recommendation', 'approval')
  confidence: number;    // 0.0 - 1.0
  reasoning: string;     // Human-readable rationale
  outcome?: string;      // Result of the decision
  escalated?: boolean;   // Whether human oversight was invoked
}

telemetry.trackDecision({
  domain: 'decision-integrity',
  action: 'transaction.approve',
  confidence: 0.94,
  reasoning: 'Policy rules #14, #22 satisfied; amount within threshold.',
  outcome: 'approved',
  escalated: false,
});`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">
                  trackToolCall()
                </h4>
                <span className="text-xs text-muted font-mono">
                  ToolCallEvent
                </span>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface ToolCallEvent {
  toolName: string;          // Identifier of the tool invoked
  parameters: Record<string, unknown>;
  responseStatus: 'success' | 'error' | 'timeout';
  latencyMs: number;         // Round-trip time
}

telemetry.trackToolCall({
  toolName: 'credit-check-api',
  parameters: { applicantId: 'app_12345' },
  responseStatus: 'success',
  latencyMs: 234,
});`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">
                  trackEscalation()
                </h4>
                <span className="text-xs text-muted font-mono">
                  EscalationEvent
                </span>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface EscalationEvent {
  reason: string;            // Why escalation was triggered
  domain: string;            // ARA domain slug
  severity: 'warning' | 'critical';
  assignedTo?: string;       // Human operator identifier
  resolvedWithinMs?: number; // Time to human resolution
}

telemetry.trackEscalation({
  reason: 'Confidence below threshold for high-value transaction',
  domain: 'human-oversight',
  severity: 'warning',
  assignedTo: 'ops-team-lead',
});`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Drift Metrics */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            Drift Metrics
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Report behavioral baseline measurements and deviations that feed
            the drift detection pipeline.
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">
                  trackDrift()
                </h4>
                <span className="text-xs text-muted font-mono">
                  DriftEvent
                </span>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface DriftEvent {
  metricName: string;        // Metric identifier
  baselineValue: number;     // Expected value
  currentValue: number;      // Observed value
  deviationPercent: number;  // Percentage deviation
  windowHours: number;       // Measurement window
}

telemetry.trackDrift({
  metricName: 'approval_rate',
  baselineValue: 0.73,
  currentValue: 0.82,
  deviationPercent: 12.3,
  windowHours: 72,
});`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">
                  trackBehavioralBaseline()
                </h4>
                <span className="text-xs text-muted font-mono">
                  BaselineEvent
                </span>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface BaselineEvent {
  metricName: string;
  value: number;
  sampleSize: number;
  periodStart: string;   // ISO 8601
  periodEnd: string;     // ISO 8601
}

telemetry.trackBehavioralBaseline({
  metricName: 'approval_rate',
  value: 0.73,
  sampleSize: 14200,
  periodStart: '2026-01-01T00:00:00Z',
  periodEnd: '2026-01-31T23:59:59Z',
});`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Incident Signals */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            Incident Signals
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Report incidents and anomalies detected in your system for
            compliance record and alerting.
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">
                  trackIncident()
                </h4>
                <span className="text-xs text-muted font-mono">
                  IncidentEvent
                </span>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface IncidentEvent {
  incidentType: string;          // e.g., 'boundary_exceedance', 'data_anomaly'
  severity: 'warning' | 'critical';
  affectedDomains: string[];     // ARA domain slugs
  description: string;
  resolutionStatus: 'open' | 'investigating' | 'resolved';
}

telemetry.trackIncident({
  incidentType: 'boundary_exceedance',
  severity: 'critical',
  affectedDomains: ['decision-integrity', 'operational-boundaries'],
  description: 'System approved transaction exceeding declared limit.',
  resolutionStatus: 'investigating',
});`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-charcoal">
                  trackAnomaly()
                </h4>
                <span className="text-xs text-muted font-mono">
                  AnomalyEvent
                </span>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface AnomalyEvent {
  anomalyType: string;
  domain: string;
  severity: 'info' | 'warning' | 'critical';
  metric: string;
  expectedRange: [number, number];
  observedValue: number;
}

telemetry.trackAnomaly({
  anomalyType: 'statistical_outlier',
  domain: 'performance-reliability',
  severity: 'warning',
  metric: 'response_latency_p99',
  expectedRange: [100, 500],
  observedValue: 1240,
});`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Health Checks */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            Health Checks
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Periodic health check events confirm system liveness and SDK
            connectivity.
          </p>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-charcoal">
                trackHealthCheck()
              </h4>
              <span className="text-xs text-muted font-mono">
                HealthCheckEvent
              </span>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`interface HealthCheckEvent {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;          // Seconds since last restart
  eventQueueDepth: number; // Pending events in buffer
  lastFlushAt: string;     // ISO 8601
}

telemetry.trackHealthCheck({
  status: 'healthy',
  uptime: 86400,
  eventQueueDepth: 12,
  lastFlushAt: '2026-02-28T14:29:55Z',
});`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Class B vs Class C */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Class B vs Class C Integration
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          The SDK automatically adjusts its transport and batching behavior
          based on the Assurance Class of your certification. The key
          differences are summarized below.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Capability
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Class B (Monitored)
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Class C (Continuous)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Transport
                </td>
                <td className="px-5 py-3 text-steel">
                  HTTPS batch (POST)
                </td>
                <td className="px-5 py-3 text-steel">
                  WebSocket streaming
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Flush interval
                </td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  5,000 - 30,000 ms
                </td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  Real-time (&lt;1,000 ms)
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Batch size
                </td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  Up to 1,000 events
                </td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  Single event streaming
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Data retention
                </td>
                <td className="px-5 py-3 text-steel">90 days</td>
                <td className="px-5 py-3 text-steel">365 days</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Health check frequency
                </td>
                <td className="px-5 py-3 text-steel">Every 5 minutes</td>
                <td className="px-5 py-3 text-steel">Every 60 seconds</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Connection recovery
                </td>
                <td className="px-5 py-3 text-steel">
                  Retry with exponential backoff
                </td>
                <td className="px-5 py-3 text-steel">
                  Auto-reconnect with buffered replay
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Error handling & retry */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Error Handling &amp; Retry Logic
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          The SDK includes built-in error handling with configurable retry
          behavior. Failed transmissions are buffered locally and retried with
          exponential backoff.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Error Handling Configuration
            </h3>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`const telemetry = new ARATelemetry({
  systemId: process.env.ARA_SYSTEM_ID!,
  profile: SystemProfile.STANDARD,
  endpoint: process.env.ARA_TELEMETRY_ENDPOINT!,
  maxRetries: 5,
  retryBaseDelayMs: 1000,     // Initial retry delay
  retryMaxDelayMs: 30000,     // Maximum retry delay
  onError: (error, events) => {
    console.error('Telemetry transmission failed:', error.message);
    console.error('Affected events:', events.length);
  },
  onRetry: (attempt, delay) => {
    console.warn(\`Retry attempt \${attempt}, next in \${delay}ms\`);
  },
});`}</code>
          </pre>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Automatic Buffering',
              description:
                'Events are buffered in memory during network failures. The buffer holds up to 10,000 events before the oldest entries are dropped.',
            },
            {
              title: 'Exponential Backoff',
              description:
                'Retries use exponential backoff with jitter: delay = min(baseDelay * 2^attempt + random(0, 1000), maxDelay).',
            },
            {
              title: 'Graceful Shutdown',
              description:
                'Call telemetry.flush() before process exit to transmit all buffered events. The SDK registers SIGTERM/SIGINT handlers automatically.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-border rounded-lg p-5"
            >
              <h4 className="text-sm font-semibold text-charcoal mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-steel leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Related links */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Related Documentation
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/developers/telemetry"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Telemetry Schema
            </h3>
            <p className="text-xs text-muted">
              Full event schema definitions, payload structures, and transport
              requirements.
            </p>
          </Link>
          <Link
            href="/developers/api"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              API Reference
            </h3>
            <p className="text-xs text-muted">
              REST API endpoints for ACRs, registry search, and certification
              verification.
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
              CAP architecture, CAPO requirements, drift detection, and
              operational states.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
