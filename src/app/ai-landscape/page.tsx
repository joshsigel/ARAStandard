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
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Two-axis',
    description: 'Both evaluation rigor and ongoing assurance',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: 'Living',
    description: 'Certification status reflects real-time operational state',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: 'Comprehensive',
    description: '410 controls across 15 reliability domains',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75l-5.571-3m11.142 0l4.179 2.25L12 17.25l-9.75-5.25 4.179-2.25m11.142 0l4.179 2.25L12 21.75l-9.75-5.25 4.179-2.25" />
      </svg>
    ),
  },
  {
    label: 'Composable',
    description: 'Platform certification enables inheritance',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
  },
  {
    label: 'Interoperable',
    description: 'Maps to 14 major frameworks for compliance synergy',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
];

export default function AILandscapePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-12">
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
        <div className="section-divider mb-6" />
        <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-8">
          Four Layers of AI Standards
        </h2>
        <div className="space-y-6">
          {layers.map((layer, idx) => (
            <div
              key={layer.name}
              className={`border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
                layer.isARA ? 'border-charcoal shadow-sm' : 'border-border'
              }`}
            >
              <div className={`px-6 py-4 ${layer.color} flex items-center gap-3`}>
                <span className="text-white/40 font-mono text-sm font-bold">{idx + 1}</span>
                <h3 className="text-lg font-semibold text-white">{layer.name}</h3>
                <span className="ml-auto text-white/40 text-xs font-medium">
                  {layer.frameworks.length} {layer.frameworks.length === 1 ? 'framework' : 'frameworks'}
                </span>
              </div>
              <div className="p-6 bg-white">
                <p className="text-steel text-sm leading-relaxed mb-4">{layer.description}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {layer.frameworks.map((fw) => (
                    <div
                      key={fw.name}
                      className={`p-3.5 rounded-lg border text-sm transition-all duration-150 ${
                        fw.isARA
                          ? 'border-charcoal bg-charcoal/[0.03] shadow-sm'
                          : 'border-border bg-slate-50/80 hover:bg-white hover:shadow-sm hover:border-slate-300'
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
        <div className="section-divider mb-6" />
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
                    className={`transition-colors duration-150 hover:bg-slate-100/80 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                  >
                    <td className="px-5 py-3.5 font-medium text-charcoal">{row.framework}</td>
                    <td className="px-5 py-3.5 text-right tabular-nums text-slate-600">
                      {row.acrs}
                    </td>
                    <td className="px-5 py-3.5 text-right tabular-nums font-semibold text-charcoal">
                      {row.pct}%
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="rounded-full h-2.5 transition-all duration-500"
                          style={{
                            width: `${row.pct}%`,
                            background: row.pct >= 70
                              ? '#1A2333'
                              : row.pct >= 50
                                ? '#3A3A3A'
                                : row.pct >= 35
                                  ? '#636B78'
                                  : '#8E95A0',
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 italic">{row.note ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What Makes ARA Different */}
      <section className="mb-16">
        <div className="section-divider mb-6" />
        <h2 className="text-2xl font-semibold text-charcoal tracking-tight mb-6">
          What Makes ARA Different
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <div
              key={item.label}
              className="group border border-border rounded-lg p-5 bg-white transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <div className="text-slate-400 group-hover:text-charcoal transition-colors duration-200 mt-0.5 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-charcoal mb-1">{item.label}</h3>
                  <p className="text-sm text-steel leading-relaxed">{item.description}</p>
                </div>
              </div>
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
