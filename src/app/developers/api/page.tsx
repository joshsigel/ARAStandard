import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'API Reference — ARA Standard',
  description:
    'ARA Standard REST API reference: endpoints for ACRs, domains, regulatory framework mappings, certification verification, and registry search with authentication, rate limiting, and error codes.',
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

export default function APIReferencePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Developers', href: '/developers' },
          { label: 'API Reference' },
        ]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          API Reference
        </h1>
        <div className="max-w-3xl">
          <p className="text-base text-steel leading-relaxed mb-4">
            The ARA Standard API provides programmatic access to ACR
            definitions, evaluation domains, regulatory framework mappings,
            the certification registry, and certification verification.
          </p>
          <p className="text-sm text-steel leading-relaxed">
            Base URL:{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded text-charcoal">
              https://api.arastandard.org/v1
            </code>
          </p>
        </div>
      </header>

      {/* Authentication */}
      <section id="authentication" className="mb-16 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="authentication" className="text-2xl font-semibold text-charcoal mb-4">
            Authentication
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          Authenticated requests require an API key passed via the{' '}
          <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">X-ARA-API-Key</code> header.
          Public endpoints (standard metadata, certification verification) are
          accessible without authentication at reduced rate limits.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Authenticated Request
            </h3>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`curl -H "X-ARA-API-Key: ara_k1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  https://api.arastandard.org/v1/acr`}</code>
          </pre>
        </div>
      </section>

      {/* Response Format */}
      <section id="response-format" className="mb-16 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="response-format" className="text-2xl font-semibold text-charcoal mb-4">
            Response Format
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          All endpoints return JSON with a consistent envelope containing a{' '}
          <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">meta</code> object
          and a{' '}
          <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">data</code> object
          or array.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Standard Response Envelope
            </h3>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1",
    "publisher": "ARAF",
    "generated": "2026-03-05T00:00:00Z",
    "page": 1,
    "per_page": 25,
    "total": 410
  },
  "data": [ ... ]
}`}</code>
          </pre>
        </div>
      </section>

      {/* Endpoints heading */}
      <section id="endpoints" className="mb-10 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="endpoints" className="text-2xl font-semibold text-charcoal mb-2">
            Endpoints
        </h2>
      </section>

      {/* GET /v1/standard */}
      <section id="get-standard" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#get-standard"
              className="hover:text-navy transition-colors"
            >
              /v1/standard
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Returns standard metadata including the current version, total
          domain count, and total ACR count. No authentication required.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Example Request
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`curl https://api.arastandard.org/v1/standard`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response &mdash;{' '}
                <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1",
    "publisher": "ARAF",
    "generated": "2026-03-05T00:00:00Z"
  },
  "data": {
    "version": "1.1",
    "name": "Autonomous Reliability Assurance Standard",
    "domainsCount": 15,
    "acrCount": 410,
    "certificationLevels": ["L1", "L2", "L3"],
    "assuranceClasses": ["A", "B", "C"],
    "systemProfiles": ["F", "S", "A", "C"],
    "effectiveDate": "2026-01-01",
    "publishedAt": "2025-12-15T00:00:00Z"
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* GET /v1/acr */}
      <section id="list-acrs" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#list-acrs"
              className="hover:text-navy transition-colors"
            >
              /v1/acr
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          List and filter ACRs (Assurance Control Requirements). Supports
          filtering by domain, evaluation level, evaluation method,
          classification, and system profile.
        </p>

        <div className="mb-4 border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h4 className="text-sm font-semibold text-charcoal">
              Query Parameters
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
              <tbody className="divide-y divide-border">
                {[
                  { param: 'domain', type: 'string', desc: 'Filter by domain slug (e.g., decision-integrity)' },
                  { param: 'level', type: 'string', desc: 'Filter by evaluation level: L1, L2, L3' },
                  { param: 'method', type: 'string', desc: 'Filter by evaluation method: documentation, testing, observation, interview' },
                  { param: 'classification', type: 'string', desc: 'Filter by risk classification: foundational, important, critical' },
                  { param: 'profile', type: 'string', desc: 'Filter by system profile: F, S, A, C' },
                  { param: 'page', type: 'integer', desc: 'Page number (default: 1)' },
                  { param: 'per_page', type: 'integer', desc: 'Results per page (default: 25, max: 100)' },
                ].map((row) => (
                  <tr key={row.param}>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      {row.param}
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      {row.type}
                    </td>
                    <td className="px-5 py-2 text-steel">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Example Request
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`curl -H "X-ARA-API-Key: ara_k1_xxx" \\
  "https://api.arastandard.org/v1/acr?domain=decision-integrity&level=L2&per_page=10"`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response &mdash;{' '}
                <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1",
    "page": 1,
    "per_page": 10,
    "total": 28
  },
  "data": [
    {
      "id": "ACR-1.01",
      "domain": "decision-integrity",
      "title": "Decision Audit Trail",
      "description": "The system shall maintain a complete audit trail...",
      "classification": "critical",
      "levels": ["L1", "L2", "L3"],
      "profiles": ["F", "S", "A", "C"],
      "evaluationMethods": ["documentation", "testing"],
      "weight": 1.0,
      "crosswalkRefs": [
        { "framework": "ISO-42001", "clause": "6.1.2" },
        { "framework": "NIST-AI-RMF", "ref": "MAP 1.1" }
      ]
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* GET /v1/acr/:id */}
      <section id="get-acr" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#get-acr"
              className="hover:text-navy transition-colors"
            >
              /v1/acr/:id
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Retrieve a single ACR by its identifier. Returns the full ACR record
          including crosswalk references to external regulatory frameworks.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Example Request
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`curl -H "X-ARA-API-Key: ara_k1_xxx" \\
  https://api.arastandard.org/v1/acr/ACR-1.01`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response &mdash;{' '}
                <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1"
  },
  "data": {
    "id": "ACR-1.01",
    "domain": "decision-integrity",
    "domainNumber": 1,
    "title": "Decision Audit Trail",
    "description": "The system shall maintain a complete audit trail of all autonomous decisions including inputs, reasoning, confidence scores, and outputs.",
    "classification": "critical",
    "levels": ["L1", "L2", "L3"],
    "profiles": ["F", "S", "A", "C"],
    "evaluationMethods": ["documentation", "testing"],
    "weight": 1.0,
    "crosswalkRefs": [
      { "framework": "ISO-42001", "clause": "6.1.2" },
      { "framework": "NIST-AI-RMF", "ref": "MAP 1.1" },
      { "framework": "EU-AI-Act", "article": "Art. 12" }
    ]
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* GET /v1/verify/:id */}
      <section id="verify" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#verify"
              className="hover:text-navy transition-colors"
            >
              /v1/verify/:id
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Verify an ARA certification by its Certification ID. Returns the
          certification record, current status, and assurance class. This
          endpoint is publicly accessible without authentication.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Example Request
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`curl https://api.arastandard.org/v1/verify/ARA-2026-00142`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response &mdash;{' '}
                <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1"
  },
  "data": {
    "certificationId": "ARA-2026-00142",
    "systemName": "Meridian Transaction Processor",
    "organization": "Meridian Financial Systems, Inc.",
    "level": "L2",
    "assuranceClass": "B",
    "designation": "L2-B",
    "status": "active",
    "scope": "Automated transaction approval for amounts up to $10,000 USD.",
    "standardVersion": "1.1",
    "issuedAt": "2026-01-15T00:00:00Z",
    "expiresAt": "2027-01-15T00:00:00Z",
    "avb": {
      "name": "Apex Certification Partners",
      "avbId": "AVB-2025-003"
    },
    "monitoringStatus": "active",
    "registryUrl": "https://arastandard.org/registry/verify/ARA-2026-00142"
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* GET /v1/registry */}
      <section id="registry-search" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#registry-search"
              className="hover:text-navy transition-colors"
            >
              /v1/registry
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Search the public certification registry. Supports filtering by
          evaluation level, assurance class, system type, industry, and status.
        </p>

        <div className="mb-4 border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h4 className="text-sm font-semibold text-charcoal">
              Query Parameters
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
              <tbody className="divide-y divide-border">
                {[
                  { param: 'level', type: 'string', desc: 'Filter by level: L1, L2, L3' },
                  { param: 'class', type: 'string', desc: 'Filter by assurance class: A, B, C' },
                  { param: 'type', type: 'string', desc: 'Filter by system type' },
                  { param: 'industry', type: 'string', desc: 'Filter by industry sector' },
                  { param: 'status', type: 'string', desc: 'Filter by status: active, suspended, expired, revoked' },
                  { param: 'page', type: 'integer', desc: 'Page number (default: 1)' },
                  { param: 'per_page', type: 'integer', desc: 'Results per page (default: 25, max: 100)' },
                ].map((row) => (
                  <tr key={row.param}>
                    <td className="px-5 py-2 font-mono text-charcoal text-xs">
                      {row.param}
                    </td>
                    <td className="px-5 py-2 font-mono text-muted text-xs">
                      {row.type}
                    </td>
                    <td className="px-5 py-2 text-steel">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h4 className="text-sm font-semibold text-charcoal">
              Example Request
            </h4>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`curl -H "X-ARA-API-Key: ara_k1_xxx" \\
  "https://api.arastandard.org/v1/registry?level=L2&class=B&status=active&per_page=10"`}</code>
          </pre>
        </div>
      </section>

      {/* GET /v1/domains */}
      <section id="list-domains" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#list-domains"
              className="hover:text-navy transition-colors"
            >
              /v1/domains
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          List all 15 ARA evaluation domains with their slugs, names,
          descriptions, and ACR counts.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Example Request
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`curl https://api.arastandard.org/v1/domains`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response &mdash;{' '}
                <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1",
    "total": 15
  },
  "data": [
    {
      "number": 1,
      "slug": "decision-integrity",
      "name": "Decision Integrity & Traceability",
      "description": "Requirements for decision audit trails, confidence calibration, and reasoning transparency.",
      "acrCount": 30,
      "weight": 1.0
    },
    {
      "number": 2,
      "slug": "operational-boundaries",
      "name": "Operational Boundaries & Scope Adherence",
      "description": "Requirements for operational scope enforcement and boundary compliance.",
      "acrCount": 28,
      "weight": 1.0
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* GET /v1/frameworks */}
      <section id="list-frameworks" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#list-frameworks"
              className="hover:text-navy transition-colors"
            >
              /v1/frameworks
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          List all regulatory frameworks with crosswalk mappings to ARA ACRs.
          Includes ISO 42001, NIST AI RMF, EU AI Act, and others.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Example Request
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`curl https://api.arastandard.org/v1/frameworks`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response &mdash;{' '}
                <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1"
  },
  "data": [
    {
      "id": "iso-42001",
      "name": "ISO/IEC 42001:2023",
      "description": "AI Management Systems",
      "mappedAcrs": 187
    },
    {
      "id": "nist-ai-rmf",
      "name": "NIST AI Risk Management Framework",
      "description": "AI Risk Management Framework 1.0",
      "mappedAcrs": 203
    },
    {
      "id": "eu-ai-act",
      "name": "EU AI Act",
      "description": "Regulation (EU) on Artificial Intelligence",
      "mappedAcrs": 156
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* GET /v1/frameworks/:id/mappings */}
      <section id="framework-mappings" className="mb-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-4">
          <MethodBadge method="GET" />
          <h3 className="text-lg font-semibold text-charcoal font-mono">
            <a
              href="#framework-mappings"
              className="hover:text-navy transition-colors"
            >
              /v1/frameworks/:id/mappings
            </a>
          </h3>
        </div>
        <p className="text-sm text-steel mb-6 max-w-[72ch]">
          Retrieve the ACR-to-clause mappings for a specific regulatory
          framework. Returns each mapped ACR with the corresponding framework
          clause or reference.
        </p>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Example Request
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`curl -H "X-ARA-API-Key: ara_k1_xxx" \\
  https://api.arastandard.org/v1/frameworks/eu-ai-act/mappings`}</code>
            </pre>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-5 py-3">
              <h4 className="text-sm font-semibold text-charcoal">
                Response &mdash;{' '}
                <span className="font-mono text-emerald-700">200 OK</span>
              </h4>
            </div>
            <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
              <code>{`{
  "meta": {
    "standard": "ARA",
    "version": "1.1",
    "framework": "eu-ai-act",
    "total": 156
  },
  "data": [
    {
      "acrId": "ACR-1.01",
      "acrTitle": "Decision Audit Trail",
      "frameworkRef": "Art. 12",
      "frameworkClause": "Record-keeping",
      "mappingStrength": "direct"
    },
    {
      "acrId": "ACR-3.01",
      "acrTitle": "Human Override Capability",
      "frameworkRef": "Art. 14",
      "frameworkClause": "Human oversight",
      "mappingStrength": "direct"
    }
  ]
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Rate Limiting */}
      <section id="rate-limiting" className="mb-16 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="rate-limiting" className="text-2xl font-semibold text-charcoal mb-4">
            Rate Limiting
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          API requests are rate-limited per API key. Unauthenticated requests
          are limited by IP address. Rate limit headers are included in all
          responses.
        </p>

        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Tier
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Authentication
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Rate Limit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Free (unauthenticated)
                </td>
                <td className="px-5 py-3 text-steel">None</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  100 requests / minute
                </td>
              </tr>
              <tr>
                <td className="px-5 py-3 font-medium text-charcoal">
                  Registered
                </td>
                <td className="px-5 py-3 text-steel">API key</td>
                <td className="px-5 py-3 font-mono text-steel text-xs">
                  1,000 requests / minute
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

      {/* Error Codes */}
      <section id="errors" className="mb-16 scroll-mt-24">
        <div className="section-divider mb-6" />
        <h2 id="errors" className="text-2xl font-semibold text-charcoal mb-4">
            Error Codes
        </h2>
        <p className="text-sm text-steel leading-relaxed max-w-3xl mb-6">
          All error responses use a consistent JSON structure with an error
          code, message, and documentation link.
        </p>

        <div className="mb-4 border border-border rounded-lg overflow-hidden">
          <div className="bg-slate-50 border-b border-border px-5 py-3">
            <h3 className="text-sm font-semibold text-charcoal">
              Error Response Format
            </h3>
          </div>
          <pre className="bg-charcoal text-slate-200 px-5 py-4 text-sm leading-relaxed overflow-x-auto font-[family-name:var(--font-ibm-plex-mono)]">
            <code>{`{
  "error": "not_found",
  "message": "No ACR found with ID 'ACR-99.99'.",
  "documentation": "https://arastandard.org/developers/api#errors"
}`}</code>
          </pre>
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
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
              {[
                { status: '400', code: 'bad_request', desc: 'Invalid query parameters or request body.' },
                { status: '401', code: 'unauthorized', desc: 'Missing or invalid API key.' },
                { status: '404', code: 'not_found', desc: 'Requested resource does not exist.' },
                { status: '429', code: 'rate_limited', desc: 'Rate limit exceeded. Check Retry-After header.' },
                { status: '500', code: 'internal_error', desc: 'Unexpected server error. Retry with exponential backoff.' },
              ].map((row) => (
                <tr key={row.status}>
                  <td className="px-5 py-3 font-mono text-charcoal">
                    {row.status}
                  </td>
                  <td className="px-5 py-3 font-mono text-steel text-xs">
                    {row.code}
                  </td>
                  <td className="px-5 py-3 text-steel">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Related links */}
      <section className="border-t border-border pt-10">
        <div className="section-divider mb-6" />
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
              Install and configure the Telemetry SDK for event tracking.
            </p>
          </Link>
          <Link
            href="/developers/telemetry"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Telemetry Schema
            </h3>
            <p className="text-xs text-muted">
              Event schema definitions, payload structures, and transport
              requirements.
            </p>
          </Link>
          <Link
            href="/ai-access"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Machine Access
            </h3>
            <p className="text-xs text-muted">
              JSON-LD structured data, JSON Schemas, and AI agent ingestion
              guide.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
