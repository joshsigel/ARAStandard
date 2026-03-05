import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { StandardsLandscape } from '@/components/visualizations/StandardsLandscape';

export const metadata: Metadata = {
  title: 'AI Standards Landscape — ARA',
  description:
    'Where ARA fits in the AI standards landscape. 14 regulatory frameworks mapped across four layers — from regulation and governance to the agent ecosystem and operational reliability.',
};

interface LayerFramework {
  name: string;
  detail: string;
  isARA?: boolean;
}

interface Layer {
  name: string;
  description: string;
  color: string;
  isARA?: boolean;
  frameworks: LayerFramework[];
}

const layers: Layer[] = [
  {
    name: 'Regulation Layer',
    description: 'Government-mandated rules that set legal baselines for AI development and deployment.',
    color: 'bg-slate-900',
    frameworks: [
      {
        name: 'EU AI Act',
        detail: 'Risk-based classification, conformity assessment for high-risk systems',
      },
      {
        name: 'GDPR',
        detail: 'Data protection and privacy (maps to ARA Domain 5)',
      },
      {
        name: 'Executive Order 14110',
        detail: 'US executive order on safe AI development and use',
      },
    ],
  },
  {
    name: 'Governance & Risk Layer',
    description: 'Organizational frameworks for AI management, risk assessment, and trust assurance.',
    color: 'bg-slate-700',
    frameworks: [
      {
        name: 'NIST AI RMF',
        detail: 'Risk management framework (map, govern, measure, manage)',
      },
      {
        name: 'ISO 42001',
        detail: 'AI management system standard',
      },
      {
        name: 'ISO 23894',
        detail: 'AI risk management',
      },
      {
        name: 'SOC 2',
        detail: 'Service organization controls for security, availability, processing integrity',
      },
    ],
  },
  {
    name: 'Agent Ecosystem Layer',
    description: 'Standards specific to AI agent systems, LLM security, and trustworthy AI principles.',
    color: 'bg-slate-500',
    frameworks: [
      {
        name: 'OWASP LLM Top 10',
        detail: 'Security risks for LLM applications',
      },
      {
        name: 'Google SAIF',
        detail: 'Secure AI Framework',
      },
      {
        name: 'OECD AI Principles',
        detail: 'International principles for trustworthy AI',
      },
    ],
  },
  {
    name: 'Operational Reliability Layer',
    description: 'Where ARA sits. Granular, testable requirements for operational reliability of autonomous systems.',
    color: 'bg-charcoal',
    isARA: true,
    frameworks: [
      {
        name: 'ARA v1.1',
        detail:
          'The only standard providing testable, per-requirement operational reliability controls for autonomous systems',
        isARA: true,
      },
    ],
  },
];

const coverageData = [
  { framework: 'NIST AI RMF', acrs: 348, pct: 85, note: null },
  { framework: 'EU AI Act', acrs: 320, pct: 78, note: null },
  { framework: 'ISO 42001', acrs: 295, pct: 72, note: null },
  { framework: 'SOC 2', acrs: 279, pct: 68, note: null },
  { framework: 'ISO 23894', acrs: 254, pct: 62, note: null },
  { framework: 'OECD AI Principles', acrs: 226, pct: 55, note: null },
  { framework: 'Executive Order 14110', acrs: 197, pct: 48, note: null },
  { framework: 'Google SAIF', acrs: 185, pct: 45, note: null },
  { framework: 'GDPR', acrs: 172, pct: 42, note: 'Concentrated in Domain 5' },
  { framework: 'IEEE 7000', acrs: 156, pct: 38, note: null },
  { framework: 'OWASP LLM Top 10', acrs: 144, pct: 35, note: 'Concentrated in Domain 7' },
  { framework: 'MITRE ATLAS', acrs: 131, pct: 32, note: 'Concentrated in Domain 7' },
  { framework: 'IEC 61508', acrs: 115, pct: 28, note: 'Concentrated in Domain 15' },
  { framework: 'ISO 22989', acrs: 90, pct: 22, note: null },
];

const differentiators = [
  {
    label: 'Testable',
    description: 'Every ACR has a defined evaluation method',
  },
  {
    label: 'Two-axis',
    description: 'Both evaluation rigor and ongoing assurance',
  },
  {
    label: 'Living',
    description: 'Certification status reflects real-time operational state',
  },
  {
    label: 'Comprehensive',
    description: '410 controls across 15 reliability domains',
  },
  {
    label: 'Composable',
    description: 'Platform certification enables inheritance',
  },
  {
    label: 'Interoperable',
    description: 'Maps to 14 major frameworks for compliance synergy',
  },
];

export default function AILandscapePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'AI Standards Landscape' },
        ]}
        className="mb-8"
      />

      <div className="max-w-[72ch] mb-12">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          Where ARA Fits in the AI Standards Landscape
        </h1>
        <p className="text-steel leading-relaxed">
          14 regulatory frameworks mapped across four layers — from regulation and governance
          to the agent ecosystem and operational reliability. ARA sits at the operational
          reliability layer, providing the granular, testable requirements that high-level
          frameworks lack.
        </p>
      </div>

      {/* Interactive Standards Landscape Visualization */}
      <section className="mb-16">
        <StandardsLandscape className="border border-border rounded-lg p-6 bg-white" />
      </section>

      {/* Four Layers */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-8">
          Four Layers of AI Standards
        </h2>
        <div className="space-y-8">
          {layers.map((layer, idx) => (
            <div
              key={layer.name}
              className={`border rounded-lg overflow-hidden ${
                layer.isARA ? 'border-charcoal' : 'border-border'
              }`}
            >
              <div className={`px-6 py-4 ${layer.color} flex items-center gap-3`}>
                <span className="text-white/60 font-mono text-sm">{idx + 1}</span>
                <h3 className="text-lg font-semibold text-white">{layer.name}</h3>
              </div>
              <div className="p-6 bg-white">
                <p className="text-steel text-sm leading-relaxed mb-4">{layer.description}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {layer.frameworks.map((fw) => (
                    <div
                      key={fw.name}
                      className={`p-3 rounded-md border text-sm ${
                        fw.isARA
                          ? 'border-charcoal bg-charcoal/[0.03]'
                          : 'border-border bg-slate-50'
                      }`}
                    >
                      <span
                        className={`font-semibold ${
                          fw.isARA ? 'text-charcoal' : 'text-slate-700'
                        }`}
                      >
                        {fw.name}
                      </span>
                      <span className="text-slate-500"> — {fw.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coverage Analysis */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-3">
          Coverage Analysis
        </h2>
        <p className="text-steel text-sm leading-relaxed mb-6 max-w-[72ch]">
          Percentage of ARA&apos;s 410 ACRs that map to each framework. Higher coverage indicates
          stronger alignment and more compliance synergy when pursuing both certifications.
        </p>

        <div className="border border-border rounded-lg overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50">
                  <th className="text-left px-5 py-3 font-semibold text-charcoal">Framework</th>
                  <th className="text-right px-5 py-3 font-semibold text-charcoal">ACRs Mapped</th>
                  <th className="text-right px-5 py-3 font-semibold text-charcoal">Coverage</th>
                  <th className="px-5 py-3 font-semibold text-charcoal text-left min-w-[200px]">
                    &nbsp;
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-charcoal">Note</th>
                </tr>
              </thead>
              <tbody>
                {coverageData.map((row, i) => (
                  <tr
                    key={row.framework}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="px-5 py-3 font-medium text-charcoal">{row.framework}</td>
                    <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                      {row.acrs}
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums font-semibold text-charcoal">
                      {row.pct}%
                    </td>
                    <td className="px-5 py-3">
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-charcoal rounded-full h-2 transition-all"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">{row.note ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What Makes ARA Different */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-6">
          What Makes ARA Different
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <div
              key={item.label}
              className="border border-border rounded-lg p-5 bg-white"
            >
              <h3 className="text-base font-semibold text-charcoal mb-1">{item.label}</h3>
              <p className="text-sm text-steel leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Crosswalk Link */}
      <div className="border-t border-border pt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/standard/v1.1/regulatory"
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-md transition-colors"
        >
          Explore detailed crosswalk mappings
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href="/standard/v1.1"
          className="text-sm text-muted hover:text-charcoal transition-colors"
        >
          &larr; Back to ARA Standard v1.1
        </Link>
      </div>
    </div>
  );
}
