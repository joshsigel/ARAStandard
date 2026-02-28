import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Monitoring API Reference',
  description:
    'REST API documentation for the ARA Continuous Assurance Platform: telemetry submission, drift reports, webhooks, certification verification, and authentication requirements.',
};

function MethodBadge({ method }: { method: string }) {
  const colors =
    method === 'GET'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : method === 'POST'
        ? 'bg-blue-50 text-blue-700 border-blue-200'
        : method === 'DELETE'
          ? 'bg-red-50 text-red-700 border-red-200'
          : 'bg-amber-50 text-amber-700 border-amber-200';
  return (
    <span
      className={`font-mono text-xs font-bold px-2.5 py-1 rounded border ${colors}`}
    >
      {method}
    </span>
  );
}

export default function MonitoringApiPage() {
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
          <li>
            <Link
              href="/monitoring"
              className="hover:text-charcoal transition-colors"
            >
              Monitoring
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-charcoal font-medium">API Reference</li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Monitoring API Reference
        </h1>
        <div className="prose max-w-3xl">
          <p>
            The Continuous Assurance Platform (CAP) API provides programmatic
            access to telemetry submission, monitoring status, drift reporting,
            webhook management, and certification verification. All endpoints
            use JSON request and response payloads over HTTPS.
          </p>
          <p>
            Base URL:{' '}
            <code>https://api.arastandard.org/v1</code>
          </p>
        </div>
      </header>

      {/* Authentication */}
      <section id="authentication" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#authentication"
            className="hover:text-navy transition-colors"
          >
            Authentication
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            All API requests must include a valid API key in the{' '}
            <code>Authorization</code> header using the Bearer scheme. API
            keys are issued upon CAP enrollment and are scoped to a specific
            certified system.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h3 className="text-sm font-semibold text-charcoal">
                API Key Authentication
              </h3>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`Authorization: Bearer ara_live_k1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h3 className="text-sm font-semibold text-charcoal">
                mTLS Requirements (L3 Only)
              </h3>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-steel leading-relaxed mb-3 max-w-[72ch]">
                L3-certified systems must authenticate using mutual TLS (mTLS)
                in addition to API key authentication. The client certificate
                must be issued by the ARAF Certificate Authority or a
                pre-approved enterprise CA.
              </p>
              <ul className="space-y-1.5">
                {[
                  'Client certificate: X.509 v3, RSA 2048+ or ECDSA P-256+',
                  'Certificate chain must include the ARAF Root CA or approved intermediate',
                  'Certificate CN must match the registered system identifier',
                  'Certificate validity must not exceed 12 months',
                  'Certificate revocation is checked via OCSP stapling',
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
      </section>

      {/* Rate Limiting */}
      <section id="rate-limiting" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a
            href="#rate-limiting"
            className="hover:text-navy transition-colors"
          >
            Rate Limiting
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            API requests are rate-limited per API key. Rate limit headers are
            included in all responses. When the rate limit is exceeded, the API
            returns HTTP 429 with a <code>Retry-After</code> header indicating
            the number of seconds to wait before retrying.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Endpoint Category
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Rate Limit
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Burst Limit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Telemetry submission
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  1,000 req/min
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  5,000 req/min
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Status queries
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  100 req/min
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  200 req/min
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Drift reports
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  60 req/min
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  120 req/min
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Webhook management
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  10 req/min
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  20 req/min
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Verification
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  300 req/min
                </td>
                <td className="px-5 py-3 font-mono text-steel">
                  600 req/min
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Rate Limit Response Headers
            </h3>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 847
X-RateLimit-Reset: 1709251200
Retry-After: 32`}</code>
          </pre>
        </div>
      </section>

      {/* Endpoints */}
      <section id="endpoints" className="mb-10 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-6">
          <a href="#endpoints" className="hover:text-navy transition-colors">
            Endpoints
          </a>
        </h2>
      </section>

      {/* POST /api/v1/telemetry */}
      <section id="submit-telemetry" className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="POST" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#submit-telemetry"
              className="hover:text-navy transition-colors"
            >
              /api/v1/telemetry
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Submit telemetry data from a certified system. Accepts single events
          or batched event arrays. Each event must conform to the ARA telemetry
          schema and include a valid system identifier and timestamp.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Request Headers
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`POST /api/v1/telemetry HTTP/1.1
Host: api.arastandard.org
Authorization: Bearer ara_live_k1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Content-Type: application/json
X-ARA-System-ID: ASI-2026-00142`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Request Body
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "systemId": "ASI-2026-00142",
  "schemaVersion": "1.0",
  "events": [
    {
      "eventId": "evt_a1b2c3d4e5f6",
      "eventType": "decision.executed",
      "timestamp": "2026-02-28T14:30:00.000Z",
      "severity": "info",
      "domain": "decision_integrity",
      "payload": {
        "decisionId": "dec_789xyz",
        "action": "transaction.approve",
        "confidence": 0.94,
        "inputHash": "sha256:abcdef1234567890",
        "outcome": "approved",
        "latencyMs": 142,
        "boundaryCheck": "pass",
        "escalated": false
      },
      "metadata": {
        "environment": "production",
        "region": "us-east-1",
        "version": "2.4.1"
      }
    }
  ],
  "signature": "sha256:fedcba0987654321..."
}`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response — <span className="font-mono text-emerald-700">202 Accepted</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "status": "accepted",
  "eventsReceived": 1,
  "batchId": "batch_9f8e7d6c5b4a",
  "timestamp": "2026-02-28T14:30:01.123Z"
}`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Request Body Schema
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Field
                    </th>
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Type
                    </th>
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Required
                    </th>
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      systemId
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      ARA System Identifier
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      schemaVersion
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      Telemetry schema version (currently &quot;1.0&quot;)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      array
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      Array of telemetry events (max 1,000 per request)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events[].eventId
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      Unique event identifier (client-generated)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events[].eventType
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      Event type from the ARA event taxonomy
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events[].timestamp
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      ISO 8601
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      Event occurrence time in UTC
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events[].severity
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      enum
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      info | warning | error | critical
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events[].domain
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      ARA evaluation domain slug
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events[].payload
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      object
                    </td>
                    <td className="px-5 py-2 text-steel">Yes</td>
                    <td className="px-5 py-2 text-steel">
                      Event-specific data conforming to the event type schema
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      events[].metadata
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      object
                    </td>
                    <td className="px-5 py-2 text-steel">No</td>
                    <td className="px-5 py-2 text-steel">
                      Environment, region, and version metadata
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      signature
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">L3 only</td>
                    <td className="px-5 py-2 text-steel">
                      SHA-256 HMAC signature of the payload
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* GET /api/v1/telemetry/{systemId}/status */}
      <section id="monitoring-status" className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#monitoring-status"
              className="hover:text-navy transition-colors"
            >
              /api/v1/telemetry/&#123;systemId&#125;/status
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Retrieve the current monitoring status for a certified system.
          Returns the system&apos;s compliance status, active alerts, drift
          metrics, and last telemetry receipt timestamp.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Path Parameters
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Parameter
                    </th>
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Type
                    </th>
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      systemId
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">
                      ARA System Identifier (e.g., ASI-2026-00142)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response — <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "systemId": "ASI-2026-00142",
  "certificationId": "ARA-2026-00142",
  "certificationLevel": "L2",
  "status": "compliant",
  "monitoringState": "active",
  "lastTelemetryReceived": "2026-02-28T14:30:01.123Z",
  "driftMetrics": {
    "decisionDistribution": {
      "deviation": 0.08,
      "threshold": 0.15,
      "status": "normal"
    },
    "errorRate": {
      "current": 0.003,
      "baseline": 0.002,
      "status": "normal"
    },
    "escalationFrequency": {
      "deviation": -0.05,
      "threshold": 0.30,
      "status": "normal"
    },
    "boundaryAdherence": {
      "exceedances": 0,
      "status": "clear"
    }
  },
  "activeAlerts": [],
  "nextReassessment": "2026-08-28T00:00:00.000Z"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* POST /api/v1/telemetry/drift-report */}
      <section id="drift-report" className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="POST" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#drift-report"
              className="hover:text-navy transition-colors"
            >
              /api/v1/telemetry/drift-report
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Submit a self-reported drift report. Organizations may proactively
          report detected behavioral drift before it triggers automated
          alerts. Proactive reporting is documented in the compliance record
          and may be considered favorably during reassessment.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Request Body
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "systemId": "ASI-2026-00142",
  "reportType": "self_reported",
  "driftDimension": "decision_distribution",
  "severity": "warning",
  "description": "Observed 12% shift in approval rate distribution over the past 72 hours following a data pipeline update.",
  "detectedAt": "2026-02-27T10:15:00.000Z",
  "metrics": {
    "baselineApprovalRate": 0.73,
    "currentApprovalRate": 0.82,
    "windowHours": 72
  },
  "rootCauseHypothesis": "Data pipeline schema change introduced additional qualifying records.",
  "remediationPlan": "Reverting pipeline change and conducting impact analysis before re-deployment.",
  "attachments": []
}`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response — <span className="font-mono text-emerald-700">201 Created</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "reportId": "dr_x1y2z3w4v5u6",
  "status": "acknowledged",
  "avbNotified": true,
  "requiredResponseDeadline": "2026-03-02T10:15:00.000Z",
  "timestamp": "2026-02-28T15:00:00.000Z"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* POST /api/v1/webhooks */}
      <section id="register-webhook" className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="POST" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#register-webhook"
              className="hover:text-navy transition-colors"
            >
              /api/v1/webhooks
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Register a webhook endpoint to receive real-time notifications for
          monitoring events. Webhooks can be filtered by event type and
          severity level. CAP delivers webhook payloads with HMAC-SHA256
          signatures for verification.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Request Body
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "url": "https://hooks.example.com/ara/monitoring",
  "systemId": "ASI-2026-00142",
  "events": [
    "alert.warning",
    "alert.critical",
    "drift.threshold_breach",
    "revalidation.triggered",
    "certification.status_change"
  ],
  "secret": "whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "description": "Production monitoring alerts"
}`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response — <span className="font-mono text-emerald-700">201 Created</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "webhookId": "wh_m1n2o3p4q5r6",
  "url": "https://hooks.example.com/ara/monitoring",
  "status": "active",
  "events": [
    "alert.warning",
    "alert.critical",
    "drift.threshold_breach",
    "revalidation.triggered",
    "certification.status_change"
  ],
  "createdAt": "2026-02-28T15:05:00.000Z"
}`}</code>
            </pre>
          </div>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h4 className="text-sm font-semibold text-charcoal">
              Webhook Delivery Payload Structure
            </h4>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`{
  "webhookId": "wh_m1n2o3p4q5r6",
  "deliveryId": "del_s7t8u9v0w1x2",
  "event": "alert.critical",
  "timestamp": "2026-02-28T16:00:00.000Z",
  "systemId": "ASI-2026-00142",
  "data": {
    "alertId": "alt_a1b2c3d4",
    "severity": "critical",
    "dimension": "boundary_adherence",
    "message": "Autonomy boundary exceedance detected in production environment.",
    "details": {
      "boundaryType": "transaction_limit",
      "declaredLimit": 10000,
      "observedValue": 12500,
      "occurredAt": "2026-02-28T15:58:42.000Z"
    },
    "requiredAction": "Acknowledge within 24 hours. Failure to respond may trigger certification suspension review."
  }
}`}</code>
          </pre>
          <div className="px-5 py-3 border-t border-border bg-slate-50">
            <p className="text-xs text-muted">
              Webhook deliveries include a{' '}
              <code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded">
                X-ARA-Signature
              </code>{' '}
              header containing an HMAC-SHA256 signature computed using the
              registered webhook secret. Verify this signature before
              processing the payload.
            </p>
          </div>
        </div>
      </section>

      {/* GET /api/v1/verify/{certificationId} */}
      <section id="verify-certification" className="mb-20 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#verify-certification"
              className="hover:text-navy transition-colors"
            >
              /api/v1/verify/&#123;certificationId&#125;
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Verify the current status of an ARA certification. This endpoint is
          publicly accessible and does not require authentication. It returns
          the certification status, level, scope, and validity period for any
          certification ID in the ARA registry.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Path Parameters
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Parameter
                    </th>
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Type
                    </th>
                    <th className="text-left font-semibold px-5 py-2 text-charcoal">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      certificationId
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      string
                    </td>
                    <td className="px-5 py-2 text-steel">
                      ARA Certification ID (e.g., ARA-2026-00142)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response — <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "certificationId": "ARA-2026-00142",
  "systemName": "Meridian Transaction Processor",
  "organization": "Meridian Financial Systems, Inc.",
  "level": "L2",
  "status": "active",
  "scope": "Automated transaction approval for amounts up to $10,000 USD within the North American market.",
  "standardVersion": "1.0",
  "issuedAt": "2026-01-15T00:00:00.000Z",
  "expiresAt": "2027-01-15T00:00:00.000Z",
  "nextReassessment": "2026-07-15T00:00:00.000Z",
  "avb": {
    "name": "Apex Certification Partners",
    "avbId": "AVB-2025-003",
    "authorizationLevel": "Enhanced"
  },
  "monitoringStatus": "active",
  "registryUrl": "https://arastandard.org/registry/verify/ARA-2026-00142"
}`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response — <span className="font-mono text-red-700">404 Not Found</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "error": "certification_not_found",
  "message": "No certification found with ID 'ARA-2026-99999'.",
  "documentation": "https://arastandard.org/monitoring/api#verify-certification"
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Error Responses */}
      <section id="errors" className="mb-20 scroll-mt-24">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          <a href="#errors" className="hover:text-navy transition-colors">
            Error Responses
          </a>
        </h2>
        <div className="prose max-w-3xl">
          <p>
            All error responses follow a consistent structure with an error
            code, human-readable message, and a link to relevant documentation.
          </p>
        </div>

        <div className="mt-6 border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Error Response Format
            </h3>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`{
  "error": "validation_error",
  "message": "Field 'events[0].eventType' is required.",
  "field": "events[0].eventType",
  "documentation": "https://arastandard.org/monitoring/api#submit-telemetry"
}`}</code>
          </pre>
        </div>

        <div className="mt-4 border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  HTTP Status
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Error Code
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-mono text-charcoal">400</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  validation_error
                </td>
                <td className="px-5 py-3 text-steel">
                  Request body failed schema validation.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-charcoal">401</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  authentication_required
                </td>
                <td className="px-5 py-3 text-steel">
                  Missing or invalid API key.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-charcoal">403</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  forbidden
                </td>
                <td className="px-5 py-3 text-steel">
                  API key does not have access to the requested resource.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-charcoal">404</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  not_found
                </td>
                <td className="px-5 py-3 text-steel">
                  Requested resource does not exist.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-charcoal">409</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  conflict
                </td>
                <td className="px-5 py-3 text-steel">
                  Duplicate resource (e.g., duplicate event ID or webhook URL).
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-charcoal">429</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  rate_limited
                </td>
                <td className="px-5 py-3 text-steel">
                  Rate limit exceeded. Check <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">Retry-After</code> header.
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-mono text-charcoal">500</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  internal_error
                </td>
                <td className="px-5 py-3 text-steel">
                  Unexpected server error. Retry with exponential backoff.
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
            href="/monitoring"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Continuous Assurance Platform
            </h3>
            <p className="text-xs text-muted">
              CAP overview, telemetry SDK, drift detection, and revalidation
              triggers.
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
              10-phase certification lifecycle and continuous monitoring
              enrollment.
            </p>
          </Link>
          <Link
            href="/registry"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Certification Registry
            </h3>
            <p className="text-xs text-muted">
              Search and verify ARA-certified systems in the public registry.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
