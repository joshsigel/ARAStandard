import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI / Machine Access',
  description: 'Machine-readable ARA Standard, OpenAPI specification, and programmatic access endpoints.',
};

export default function AIAccessPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-8">
        <Link href="/" className="hover:text-charcoal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">AI / Machine Access</span>
      </nav>

      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-charcoal mb-4">
          AI / Machine-Readable Access
        </h1>
        <p className="text-base text-steel leading-relaxed mb-12">
          The ARA Standard is designed for programmatic ingestion. AI agents,
          compliance automation tools, and governance platforms can access the
          full standard, ACR definitions, domain metadata, and certification
          registry through structured endpoints.
        </p>

        {/* Endpoints */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-6">
            Available Endpoints
          </h2>
          <div className="space-y-4">
            {[
              {
                method: 'GET',
                path: '/api/v1/standard',
                description: 'Full ARA Standard metadata including version, domains, and ACR summary.',
              },
              {
                method: 'GET',
                path: '/api/v1/acr',
                description: 'Complete ACR library with all fields. Supports query parameters: domain, level, method, classification.',
              },
              {
                method: 'GET',
                path: '/api/v1/acr/{id}',
                description: 'Individual ACR entry by ID (e.g., ACR-1.01).',
              },
              {
                method: 'GET',
                path: '/api/v1/registry',
                description: 'Public certification registry. Supports query parameters: level, industry, status.',
              },
              {
                method: 'GET',
                path: '/api/v1/verify/{certificationId}',
                description: 'Verify certification status by Certification ID.',
              },
            ].map((endpoint) => (
              <div key={endpoint.path} className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-charcoal rounded">
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-navy">{endpoint.path}</code>
                </div>
                <p className="text-sm text-steel">{endpoint.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Response Format */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Response Format
          </h2>
          <p className="text-sm text-steel mb-4">
            All endpoints return JSON with a consistent envelope structure:
          </p>
          <pre className="bg-charcoal text-slate-200 p-5 rounded-lg overflow-x-auto text-sm leading-relaxed font-mono">
{`{
  "meta": {
    "standard": "ARA",
    "version": "1.0",
    "publisher": "ARAF",
    "generated": "2026-02-28T00:00:00Z"
  },
  "data": { ... }
}`}
          </pre>
        </section>

        {/* JSON Schema */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            JSON Schema
          </h2>
          <p className="text-sm text-steel mb-4">
            Machine-readable JSON Schema definitions are available for all
            data structures used in the ARA Standard:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <code className="font-mono text-navy">/api/v1/standard</code>
              <span className="text-muted"> — Standard metadata schema</span>
            </li>
            <li>
              <code className="font-mono text-navy">/api/v1/acr</code>
              <span className="text-muted"> — ACR entry schema</span>
            </li>
            <li>
              <code className="font-mono text-navy">/api/v1/registry</code>
              <span className="text-muted"> — Registry entry schema</span>
            </li>
          </ul>
        </section>

        {/* Structured Data */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Structured Data (JSON-LD)
          </h2>
          <p className="text-sm text-steel mb-4">
            All pages on arastandard.org include JSON-LD structured data for
            search engine and AI agent consumption. The structured data uses
            Schema.org vocabulary extended with ARA-specific properties.
          </p>
          <pre className="bg-charcoal text-slate-200 p-5 rounded-lg overflow-x-auto text-sm leading-relaxed font-mono">
{`{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "name": "ARA Standard v1.0",
  "publisher": {
    "@type": "Organization",
    "name": "Autonomous Reliability Assurance Foundation",
    "url": "https://arastandard.org"
  },
  "version": "1.0",
  "about": "Autonomous Systems Operational Reliability"
}`}
          </pre>
        </section>

        {/* Ingestion Guide */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Ingestion Guide for AI Agents
          </h2>
          <div className="prose">
            <p>
              AI agents seeking to reason about the ARA Standard should follow
              this recommended ingestion approach:
            </p>
            <ol>
              <li>
                <strong>Fetch the standard metadata</strong> from
                <code>/api/v1/standard</code> to understand versioning,
                domain structure, and certification levels.
              </li>
              <li>
                <strong>Fetch the ACR library</strong> from
                <code>/api/v1/acr</code> to obtain all control requirements
                with evaluation methods, level applicability, and risk weights.
              </li>
              <li>
                <strong>Use query parameters</strong> to filter ACRs by domain,
                level, or evaluation method when reasoning about specific
                compliance scenarios.
              </li>
              <li>
                <strong>Verify certifications</strong> via
                <code>/api/v1/verify/&#123;id&#125;</code> when validating
                claims made by autonomous systems or their operators.
              </li>
            </ol>
          </div>
        </section>

        {/* Rate Limits */}
        <section>
          <h2 className="text-xl font-semibold text-charcoal mb-4">
            Rate Limits and Authentication
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-charcoal">Access Tier</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal">Authentication</th>
                  <th className="text-left py-3 px-4 font-semibold text-charcoal">Rate Limit</th>
                </tr>
              </thead>
              <tbody className="text-steel">
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Public (read-only)</td>
                  <td className="py-3 px-4">None required</td>
                  <td className="py-3 px-4 font-mono text-xs">100 requests/hour</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Registered</td>
                  <td className="py-3 px-4">API Key (header)</td>
                  <td className="py-3 px-4 font-mono text-xs">1,000 requests/hour</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Certified Organization</td>
                  <td className="py-3 px-4">API Key + mTLS</td>
                  <td className="py-3 px-4 font-mono text-xs">10,000 requests/hour</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
