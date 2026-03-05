import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Telemetry Event Schema — ARA Standard',
  description:
    'ARA telemetry event schema definitions: base event structure, decision events, tool call events, drift events, incident events, transport requirements, and data retention policies.',
};

export default function TelemetrySchemaPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Developers', href: '/developers' },
          { label: 'Telemetry Schema' },
        ]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Telemetry Event Schema
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          All telemetry events submitted to the ARA Continuous Assurance
          Platform must conform to the schemas defined below. The base event
          schema is shared across all event types, with type-specific payloads
          defined per category.
        </p>
      </header>

      {/* Base Event Schema */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Base Event Schema
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          Every telemetry event includes these top-level fields regardless of
          event type. The <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">payload</code> field
          contains type-specific data defined in the sections below.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-charcoal">
              TypeScript
            </h3>
            <span className="text-xs text-muted font-mono">
              ARATelemetryEvent
            </span>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`interface ARATelemetryEvent {
  eventId: string;       // UUID v4
  systemId: string;      // ARA certification ID
  timestamp: string;     // ISO 8601
  eventType: string;     // e.g., 'decision', 'tool_call', 'drift'
  domain: string;        // ARA domain slug
  severity: 'info' | 'warning' | 'critical';
  payload: Record<string, unknown>;
  metadata: {
    sdkVersion: string;
    profile: 'F' | 'S' | 'A' | 'C';
    environment: string;
  };
}`}</code>
          </pre>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Field
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Type
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { field: 'eventId', type: 'string (UUID v4)', desc: 'Client-generated unique event identifier' },
                { field: 'systemId', type: 'string', desc: 'ARA System Identifier (e.g., ASI-2026-00142)' },
                { field: 'timestamp', type: 'string (ISO 8601)', desc: 'Event occurrence time in UTC' },
                { field: 'eventType', type: 'string', desc: 'Event category: decision, tool_call, drift, incident, health_check, anomaly, baseline' },
                { field: 'domain', type: 'string', desc: 'ARA evaluation domain slug (e.g., decision-integrity)' },
                { field: 'severity', type: 'enum', desc: 'info | warning | critical' },
                { field: 'payload', type: 'object', desc: 'Event-specific data (see schemas below)' },
                { field: 'metadata.sdkVersion', type: 'string', desc: 'Telemetry SDK version (e.g., 1.2.0)' },
                { field: 'metadata.profile', type: 'enum', desc: 'System profile: F | S | A | C' },
                { field: 'metadata.environment', type: 'string', desc: 'Deployment environment (e.g., production, staging)' },
              ].map((row) => (
                <tr key={row.field}>
                  <td className="px-5 py-2.5 font-mono text-charcoal text-xs">
                    {row.field}
                  </td>
                  <td className="px-5 py-2.5 font-mono text-muted text-xs">
                    {row.type}
                  </td>
                  <td className="px-5 py-2.5 text-steel">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Event Type Schemas */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-6">
          Event Type Schemas
        </h2>

        {/* 1. Decision Events */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            1. Decision Events
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Emitted when the system makes an autonomous decision. Captures
            the action taken, confidence level, reasoning, and outcome.
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  Payload Schema
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface DecisionPayload {
  action: string;          // Action identifier
  confidence: number;      // 0.0 - 1.0
  reasoning: string;       // Human-readable rationale
  outcome: string;         // Result: 'approved', 'denied', 'deferred'
  escalated: boolean;      // Whether human review was invoked
  boundaryCheck: 'pass' | 'fail' | 'not_applicable';
}`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  JSON Example
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`{
  "eventId": "550e8400-e29b-41d4-a716-446655440000",
  "systemId": "ASI-2026-00142",
  "timestamp": "2026-02-28T14:30:00.000Z",
  "eventType": "decision",
  "domain": "decision-integrity",
  "severity": "info",
  "payload": {
    "action": "transaction.approve",
    "confidence": 0.94,
    "reasoning": "Policy rules #14, #22 satisfied; amount within threshold.",
    "outcome": "approved",
    "escalated": false,
    "boundaryCheck": "pass"
  },
  "metadata": {
    "sdkVersion": "1.2.0",
    "profile": "S",
    "environment": "production"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 2. Tool Call Events */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            2. Tool Call Events
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Emitted when the system invokes an external tool or API.
            Captures the tool name, parameters, response status, and latency.
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  Payload Schema
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface ToolCallPayload {
  toolName: string;                  // Tool identifier
  parameters: Record<string, unknown>; // Input parameters (redacted if sensitive)
  responseStatus: 'success' | 'error' | 'timeout';
  latencyMs: number;                 // Round-trip time in milliseconds
  errorCode?: string;                // Error code if responseStatus is 'error'
}`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  JSON Example
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`{
  "eventId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "systemId": "ASI-2026-00142",
  "timestamp": "2026-02-28T14:30:01.234Z",
  "eventType": "tool_call",
  "domain": "performance-reliability",
  "severity": "info",
  "payload": {
    "toolName": "credit-check-api",
    "parameters": { "applicantId": "app_12345" },
    "responseStatus": "success",
    "latencyMs": 234
  },
  "metadata": {
    "sdkVersion": "1.2.0",
    "profile": "S",
    "environment": "production"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 3. Drift Events */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            3. Drift Events
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Emitted when a monitored metric deviates from its behavioral
            baseline. Captures the metric name, baseline and current values,
            and deviation percentage.
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  Payload Schema
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface DriftPayload {
  metricName: string;          // Metric identifier
  baselineValue: number;       // Expected value from baseline period
  currentValue: number;        // Observed value in current window
  deviationPercent: number;    // Percentage deviation from baseline
  windowHours: number;         // Measurement window in hours
  thresholdPercent: number;    // Configured drift threshold
  breached: boolean;           // Whether threshold was exceeded
}`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  JSON Example
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`{
  "eventId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "systemId": "ASI-2026-00142",
  "timestamp": "2026-02-28T15:00:00.000Z",
  "eventType": "drift",
  "domain": "decision-integrity",
  "severity": "warning",
  "payload": {
    "metricName": "approval_rate",
    "baselineValue": 0.73,
    "currentValue": 0.82,
    "deviationPercent": 12.3,
    "windowHours": 72,
    "thresholdPercent": 15.0,
    "breached": false
  },
  "metadata": {
    "sdkVersion": "1.2.0",
    "profile": "S",
    "environment": "production"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* 4. Incident Events */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-charcoal mb-2">
            4. Incident Events
          </h3>
          <p className="text-sm text-steel leading-relaxed max-w-3xl mb-4">
            Emitted when the system detects or is involved in an incident
            requiring investigation. Captures the incident type, severity,
            affected domains, and resolution status.
          </p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  Payload Schema
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`interface IncidentPayload {
  incidentType: string;              // e.g., 'boundary_exceedance', 'data_anomaly'
  severity: 'warning' | 'critical';
  affectedDomains: string[];         // ARA domain slugs
  description: string;               // Human-readable description
  resolutionStatus: 'open' | 'investigating' | 'resolved';
  resolvedAt?: string;               // ISO 8601 (if resolved)
  rootCause?: string;                // Root cause description (if known)
}`}</code>
              </pre>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b border-border px-5 py-3">
                <h4 className="text-sm font-semibold text-charcoal">
                  JSON Example
                </h4>
              </div>
              <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
                <code>{`{
  "eventId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "systemId": "ASI-2026-00142",
  "timestamp": "2026-02-28T15:58:42.000Z",
  "eventType": "incident",
  "domain": "operational-boundaries",
  "severity": "critical",
  "payload": {
    "incidentType": "boundary_exceedance",
    "severity": "critical",
    "affectedDomains": [
      "decision-integrity",
      "operational-boundaries"
    ],
    "description": "System approved transaction of $12,500 exceeding the declared $10,000 limit.",
    "resolutionStatus": "investigating"
  },
  "metadata": {
    "sdkVersion": "1.2.0",
    "profile": "S",
    "environment": "production"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Transport Requirements */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Transport Requirements by Class
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          The transport protocol and delivery guarantees differ by Assurance
          Class. Class A systems are exempt from telemetry submission. Class B
          uses HTTPS batch delivery. Class C requires WebSocket streaming for
          real-time monitoring.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Requirement
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Class A (Periodic)
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
                  Protocol
                </td>
                <td className="px-5 py-3 text-steel">
                  N/A (self-monitored)
                </td>
                <td className="px-5 py-3 text-steel">HTTPS batch (POST)</td>
                <td className="px-5 py-3 text-steel">WebSocket (WSS)</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Max latency
                </td>
                <td className="px-5 py-3 text-steel">N/A</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  30 seconds
                </td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  1 second
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Batch size
                </td>
                <td className="px-5 py-3 text-steel">N/A</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  1 - 1,000 events
                </td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  1 event (streaming)
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Encryption
                </td>
                <td className="px-5 py-3 text-steel">N/A</td>
                <td className="px-5 py-3 text-steel">TLS 1.2+</td>
                <td className="px-5 py-3 text-steel">TLS 1.3 + mTLS</td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Delivery guarantee
                </td>
                <td className="px-5 py-3 text-steel">N/A</td>
                <td className="px-5 py-3 text-steel">At-least-once</td>
                <td className="px-5 py-3 text-steel">
                  Exactly-once (idempotent)
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Authentication
                </td>
                <td className="px-5 py-3 text-steel">N/A</td>
                <td className="px-5 py-3 text-steel">API key (Bearer)</td>
                <td className="px-5 py-3 text-steel">
                  API key + client certificate
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Data Retention */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">
          Data Retention
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          Telemetry data is retained by the CAPO for the duration specified by
          the Assurance Class. After the retention period, data is archived or
          purged according to the CAPO&apos;s data management policy.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-charcoal mb-1">
              Class B (Monitored)
            </h3>
            <p className="text-2xl font-semibold text-charcoal mb-2">
              90 days
            </p>
            <p className="text-xs text-steel leading-relaxed">
              Telemetry events are retained for 90 days from the event
              timestamp. Aggregated metrics and drift reports are retained for
              the full certification period.
            </p>
          </div>
          <div className="border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-charcoal mb-1">
              Class C (Continuous)
            </h3>
            <p className="text-2xl font-semibold text-charcoal mb-2">
              365 days
            </p>
            <p className="text-xs text-steel leading-relaxed">
              Full event-level retention for 365 days. All events, including
              raw payloads and metadata, are preserved for audit and
              compliance purposes.
            </p>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Related Documentation
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/developers/sdk"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              SDK Integration Guide
            </h3>
            <p className="text-xs text-muted">
              Installation, configuration, event tracking methods, and error
              handling.
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
              REST API endpoints, authentication, rate limits, and error codes.
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
              CAP architecture, CAPO enrollment, drift thresholds, and
              operational states.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
