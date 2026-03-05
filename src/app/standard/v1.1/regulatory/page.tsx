'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface Framework {
  id: string;
  name: string;
  edition: string;
  description: string;
  acrsMapped: number;
  coveragePct: number;
  uniqueRequirements: number;
  mappingBreakdown: {
    direct: number;
    partial: number;
    complementary: number;
  };
  note: string | null;
}

const frameworks: Framework[] = [
  {
    id: 'nist-ai-rmf',
    name: 'NIST AI RMF',
    edition: '1.0 (January 2023)',
    description:
      'The NIST AI Risk Management Framework provides a voluntary framework for managing AI risk. Organized around four core functions (Govern, Map, Measure, Manage), it offers a structured approach to trustworthy AI development that maps strongly to ARA\u2019s risk-informed controls.',
    acrsMapped: 348,
    coveragePct: 85,
    uniqueRequirements: 42,
    mappingBreakdown: { direct: 187, partial: 112, complementary: 49 },
    note: null,
  },
  {
    id: 'eu-ai-act',
    name: 'EU AI Act',
    edition: 'Regulation (EU) 2024/1689',
    description:
      'The EU AI Act establishes a risk-based regulatory framework for AI systems in the European market. Its high-risk classification requirements, conformity assessment procedures, and post-market surveillance obligations align closely with ARA\u2019s certification and monitoring framework.',
    acrsMapped: 320,
    coveragePct: 78,
    uniqueRequirements: 38,
    mappingBreakdown: { direct: 164, partial: 108, complementary: 48 },
    note: null,
  },
  {
    id: 'iso-42001',
    name: 'ISO/IEC 42001',
    edition: '2023',
    description:
      'The AI management system standard specifies requirements for establishing, implementing, maintaining, and continually improving an AI management system. ARA\u2019s domain structure and evidence requirements complement ISO 42001\u2019s management system approach.',
    acrsMapped: 295,
    coveragePct: 72,
    uniqueRequirements: 35,
    mappingBreakdown: { direct: 148, partial: 102, complementary: 45 },
    note: null,
  },
  {
    id: 'soc-2',
    name: 'SOC 2',
    edition: 'Type II (2017 Trust Services Criteria)',
    description:
      'SOC 2 defines trust services criteria for security, availability, processing integrity, confidentiality, and privacy. ARA extends SOC 2\u2019s traditional controls into the autonomous systems domain, providing AI-specific testability.',
    acrsMapped: 279,
    coveragePct: 68,
    uniqueRequirements: 31,
    mappingBreakdown: { direct: 142, partial: 94, complementary: 43 },
    note: null,
  },
  {
    id: 'iso-23894',
    name: 'ISO/IEC 23894',
    edition: '2023',
    description:
      'The AI risk management standard provides guidance for organizations developing or using AI systems. Its risk assessment methodology aligns with ARA\u2019s mandatory 7-factor risk classification and domain-specific risk weights.',
    acrsMapped: 254,
    coveragePct: 62,
    uniqueRequirements: 28,
    mappingBreakdown: { direct: 126, partial: 88, complementary: 40 },
    note: null,
  },
  {
    id: 'oecd-ai',
    name: 'OECD AI Principles',
    edition: 'Revised 2024',
    description:
      'The OECD Recommendation on AI establishes international principles for trustworthy AI across transparency, accountability, robustness, and human-centered values. ARA operationalizes many of these high-level principles into testable controls.',
    acrsMapped: 226,
    coveragePct: 55,
    uniqueRequirements: 24,
    mappingBreakdown: { direct: 108, partial: 78, complementary: 40 },
    note: null,
  },
  {
    id: 'eo-14110',
    name: 'Executive Order 14110',
    edition: 'October 2023',
    description:
      'The US executive order on Safe, Secure, and Trustworthy AI establishes requirements for AI safety reporting, red-teaming, and standards development. ARA\u2019s adversarial testing and transparency controls map to several EO directives.',
    acrsMapped: 197,
    coveragePct: 48,
    uniqueRequirements: 22,
    mappingBreakdown: { direct: 94, partial: 68, complementary: 35 },
    note: null,
  },
  {
    id: 'google-saif',
    name: 'Google SAIF',
    edition: 'June 2023',
    description:
      'The Secure AI Framework provides a conceptual framework for securing AI systems, with emphasis on expanding security foundations, detection and response, and automating defenses. Maps to ARA\u2019s security and adversarial resilience domains.',
    acrsMapped: 185,
    coveragePct: 45,
    uniqueRequirements: 20,
    mappingBreakdown: { direct: 88, partial: 62, complementary: 35 },
    note: null,
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    edition: 'Regulation (EU) 2016/679',
    description:
      'The General Data Protection Regulation establishes data protection and privacy requirements. ARA Domain 5 (Data Governance & Privacy) provides detailed, testable controls that operationalize GDPR principles for autonomous systems.',
    acrsMapped: 172,
    coveragePct: 42,
    uniqueRequirements: 18,
    mappingBreakdown: { direct: 82, partial: 58, complementary: 32 },
    note: 'Concentrated in Domain 5',
  },
  {
    id: 'ieee-7000',
    name: 'IEEE 7000',
    edition: '2021',
    description:
      'The Model Process for Addressing Ethical Concerns During System Design provides a methodology for ethics-driven system engineering. Maps to ARA\u2019s ethical autonomy and human oversight controls across multiple domains.',
    acrsMapped: 156,
    coveragePct: 38,
    uniqueRequirements: 16,
    mappingBreakdown: { direct: 72, partial: 52, complementary: 32 },
    note: null,
  },
  {
    id: 'owasp-llm',
    name: 'OWASP LLM Top 10',
    edition: 'v1.1 (2023)',
    description:
      'The OWASP Top 10 for Large Language Model Applications identifies critical security risks specific to LLM-powered applications, including prompt injection, data leakage, and model theft. Maps primarily to ARA Domain 7 (Security & Adversarial Resilience).',
    acrsMapped: 144,
    coveragePct: 35,
    uniqueRequirements: 14,
    mappingBreakdown: { direct: 68, partial: 48, complementary: 28 },
    note: 'Concentrated in Domain 7',
  },
  {
    id: 'mitre-atlas',
    name: 'MITRE ATLAS',
    edition: 'v4.0',
    description:
      'The Adversarial Threat Landscape for AI Systems knowledge base catalogs adversarial techniques, tactics, and case studies for AI/ML systems. ARA\u2019s adversarial testing requirements in Domain 7 leverage ATLAS threat models.',
    acrsMapped: 131,
    coveragePct: 32,
    uniqueRequirements: 12,
    mappingBreakdown: { direct: 58, partial: 45, complementary: 28 },
    note: 'Concentrated in Domain 7',
  },
  {
    id: 'iec-61508',
    name: 'IEC 61508',
    edition: 'Edition 2.0 (2010)',
    description:
      'The functional safety standard for electrical, electronic, and programmable electronic safety-related systems. Its safety integrity level (SIL) concepts map to ARA Domain 15 (Physical Safety) for systems with physical-world actuators.',
    acrsMapped: 115,
    coveragePct: 28,
    uniqueRequirements: 10,
    mappingBreakdown: { direct: 48, partial: 40, complementary: 27 },
    note: 'Concentrated in Domain 15',
  },
  {
    id: 'iso-22989',
    name: 'ISO/IEC 22989',
    edition: '2022',
    description:
      'The AI concepts and terminology standard establishes the foundational vocabulary for AI. While primarily definitional, its conceptual framework informs ARA\u2019s scope definitions and system classification criteria.',
    acrsMapped: 90,
    coveragePct: 22,
    uniqueRequirements: 8,
    mappingBreakdown: { direct: 35, partial: 30, complementary: 25 },
    note: null,
  },
];

export default function RegulatoryMappingPage() {
  const [activeTab, setActiveTab] = useState<'framework' | 'acr'>('framework');
  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>('');

  const selectedFramework = frameworks.find((f) => f.id === selectedFrameworkId) ?? null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1', href: '/standard/v1.1' },
          { label: 'Regulatory Mappings' },
        ]}
        className="mb-8"
      />

      <div className="max-w-[72ch] mb-10">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          Regulatory Framework Crosswalk Mappings
        </h1>
        <p className="text-steel leading-relaxed">
          Explore how ARA&apos;s 410 ACRs map to 14 major regulatory frameworks. Each mapping is
          classified as direct (1:1 requirement match), partial (overlapping scope with
          differences), or complementary (ARA extends the framework&apos;s intent).
        </p>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit mb-8">
        <button
          onClick={() => setActiveTab('framework')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'framework'
              ? 'bg-white text-charcoal shadow-sm'
              : 'text-slate-500 hover:text-charcoal'
          }`}
        >
          By Framework
        </button>
        <button
          onClick={() => setActiveTab('acr')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'acr'
              ? 'bg-white text-charcoal shadow-sm'
              : 'text-slate-500 hover:text-charcoal'
          }`}
        >
          By ACR
        </button>
      </div>

      {/* Tab: By Framework */}
      {activeTab === 'framework' && (
        <div>
          {/* Framework Selector */}
          <div className="mb-8">
            <label htmlFor="framework-select" className="block text-sm font-medium text-charcoal mb-2">
              Select a framework
            </label>
            <select
              id="framework-select"
              value={selectedFrameworkId}
              onChange={(e) => setSelectedFrameworkId(e.target.value)}
              className="w-full max-w-md px-3 py-2.5 text-sm border border-border rounded-md bg-white
                         text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                         transition-colors"
            >
              <option value="">Choose a regulatory framework...</option>
              {frameworks.map((fw) => (
                <option key={fw.id} value={fw.id}>
                  {fw.name} ({fw.coveragePct}% coverage)
                </option>
              ))}
            </select>
          </div>

          {/* Framework Detail */}
          {selectedFramework ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="border border-border rounded-lg p-6 bg-white">
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <h2 className="text-xl font-semibold text-charcoal">{selectedFramework.name}</h2>
                  <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-600 border border-border">
                    {selectedFramework.edition}
                  </span>
                </div>
                <p className="text-sm text-steel leading-relaxed">{selectedFramework.description}</p>
              </div>

              {/* Coverage Stats */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border border-border rounded-lg p-5 bg-white">
                  <div className="text-2xl font-semibold text-charcoal tabular-nums">
                    {selectedFramework.acrsMapped}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">ACRs Mapped</div>
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-charcoal rounded-full h-2 transition-all duration-300"
                      style={{ width: `${selectedFramework.coveragePct}%` }}
                    />
                  </div>
                </div>
                <div className="border border-border rounded-lg p-5 bg-white">
                  <div className="text-2xl font-semibold text-charcoal tabular-nums">
                    {selectedFramework.coveragePct}%
                  </div>
                  <div className="text-sm text-slate-500 mt-1">ARA Coverage</div>
                  <div className="text-xs text-slate-400 mt-3">
                    of 410 total ACRs
                  </div>
                </div>
                <div className="border border-border rounded-lg p-5 bg-white">
                  <div className="text-2xl font-semibold text-charcoal tabular-nums">
                    {selectedFramework.uniqueRequirements}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">Unique Requirements</div>
                  <div className="text-xs text-slate-400 mt-3">
                    in {selectedFramework.name}
                  </div>
                </div>
              </div>

              {/* Mapping Breakdown */}
              <div className="border border-border rounded-lg p-6 bg-white">
                <h3 className="text-base font-semibold text-charcoal mb-4">Mapping Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-charcoal" />
                      <span className="text-slate-700 font-medium">Direct</span>
                      <span className="text-xs text-slate-400">1:1 requirement match</span>
                    </div>
                    <span className="tabular-nums font-semibold text-charcoal">
                      {selectedFramework.mappingBreakdown.direct} ACRs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-slate-400" />
                      <span className="text-slate-700 font-medium">Partial</span>
                      <span className="text-xs text-slate-400">Overlapping scope</span>
                    </div>
                    <span className="tabular-nums font-semibold text-charcoal">
                      {selectedFramework.mappingBreakdown.partial} ACRs
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
                      <span className="text-slate-700 font-medium">Complementary</span>
                      <span className="text-xs text-slate-400">ARA extends intent</span>
                    </div>
                    <span className="tabular-nums font-semibold text-charcoal">
                      {selectedFramework.mappingBreakdown.complementary} ACRs
                    </span>
                  </div>
                </div>

                {/* Visual bar */}
                <div className="mt-5 flex h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-charcoal"
                    style={{
                      width: `${(selectedFramework.mappingBreakdown.direct / selectedFramework.acrsMapped) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-slate-400"
                    style={{
                      width: `${(selectedFramework.mappingBreakdown.partial / selectedFramework.acrsMapped) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-slate-200"
                    style={{
                      width: `${(selectedFramework.mappingBreakdown.complementary / selectedFramework.acrsMapped) * 100}%`,
                    }}
                  />
                </div>

                {selectedFramework.note && (
                  <p className="mt-4 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-md border border-border">
                    Note: {selectedFramework.note}
                  </p>
                )}
              </div>

              {/* Placeholder for detailed ACR mappings */}
              <div className="border border-border rounded-lg p-6 bg-slate-50">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-charcoal mb-1">
                      Detailed ACR-level mappings coming soon
                    </p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Detailed ACR-level mappings will be available when Supabase is connected.
                      Currently showing summary statistics. The crosswalk data will include per-ACR
                      mapping type, requirement text comparisons, and gap analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* No framework selected */
            <div className="border border-border rounded-lg overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-slate-50">
                      <th className="text-left px-5 py-3 font-semibold text-charcoal">Framework</th>
                      <th className="text-left px-5 py-3 font-semibold text-charcoal">Edition</th>
                      <th className="text-right px-5 py-3 font-semibold text-charcoal">ACRs</th>
                      <th className="text-right px-5 py-3 font-semibold text-charcoal">Coverage</th>
                      <th className="text-left px-5 py-3 font-semibold text-charcoal">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frameworks.map((fw, i) => (
                      <tr
                        key={fw.id}
                        onClick={() => setSelectedFrameworkId(fw.id)}
                        className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                        }`}
                      >
                        <td className="px-5 py-3 font-medium text-charcoal">{fw.name}</td>
                        <td className="px-5 py-3 text-slate-500 text-xs">{fw.edition}</td>
                        <td className="px-5 py-3 text-right tabular-nums text-slate-600">
                          {fw.acrsMapped}
                        </td>
                        <td className="px-5 py-3 text-right tabular-nums font-semibold text-charcoal">
                          {fw.coveragePct}%
                        </td>
                        <td className="px-5 py-3 text-xs text-slate-500">{fw.note ?? ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: By ACR */}
      {activeTab === 'acr' && (
        <div>
          <div className="mb-6">
            <label htmlFor="acr-search" className="block text-sm font-medium text-charcoal mb-2">
              Search by ACR ID
            </label>
            <input
              id="acr-search"
              type="text"
              placeholder="e.g. ACR-001, ACR-142..."
              className="w-full max-w-md px-3 py-2.5 text-sm border border-border rounded-md bg-white
                         text-charcoal placeholder:text-slate-400
                         focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                         transition-colors"
            />
          </div>

          <div className="border border-border rounded-lg p-6 bg-slate-50">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
              </svg>
              <div>
                <p className="text-sm font-medium text-charcoal mb-1">
                  Supabase connection required
                </p>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                  ACR-level crosswalk data requires Supabase connection. Use the API endpoint{' '}
                  <code className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-border text-charcoal">
                    GET /v1/acr/:id
                  </code>{' '}
                  for programmatic access.
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  When connected, this tab will display all frameworks that reference a given ACR,
                  the mapping type for each, and the corresponding requirement text from each framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer links */}
      <div className="mt-12 border-t border-border pt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/ai-landscape"
          className="inline-flex items-center gap-2 text-sm font-medium text-charcoal bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-md transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          View visual standards landscape
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
