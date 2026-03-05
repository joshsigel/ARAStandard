'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface GlossaryEntry {
  term: string;
  abbreviation?: string;
  definition: string;
  versionIntroduced: '1.0' | '1.1';
}

const glossaryTerms: GlossaryEntry[] = [
  {
    term: 'Autonomous Compliance Requirement',
    abbreviation: 'ACR',
    definition:
      'A discrete, testable control within the ARA Standard. Each ACR specifies a single reliability requirement with a defined evaluation method, risk weight, classification, and evidence requirements.',
    versionIntroduced: '1.0',
  },
  {
    term: 'Agent',
    definition:
      'A software component that perceives its environment, reasons about available information, and acts to achieve specified objectives with some degree of autonomy.',
    versionIntroduced: '1.0',
  },
  {
    term: 'Assurance Class',
    definition:
      'One of three classes (A Periodic, B Monitored, C Continuous) that determine the ongoing monitoring intensity and CAPO engagement requirements for a certified system. The Assurance Class is determined by a mandatory 7-factor risk classification conducted by the AVB.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Autonomous System',
    definition:
      'A software-driven system that acts with limited human oversight to perceive, reason, decide, and execute actions in pursuit of defined objectives. Includes single-agent, multi-agent, hybrid, and physical autonomous systems.',
    versionIntroduced: '1.0',
  },
  {
    term: 'Authorized Validation Body',
    abbreviation: 'AVB',
    definition:
      'An organization authorized by ARAF to conduct ARA certification evaluations. AVBs are responsible for intake assessment, ACR evaluation, risk classification, certification decisions, and ongoing compliance monitoring.',
    versionIntroduced: '1.0',
  },
  {
    term: 'Blocking',
    definition:
      'An ACR classification where non-compliance results in automatic certification denial at all applicable levels. No conditional certification or remediation period is available for blocking controls.',
    versionIntroduced: '1.0',
  },
  {
    term: 'Certified Assurance Platform Operator',
    abbreviation: 'CAPO',
    definition:
      'A certified organization that provides continuous monitoring services for ARA-certified systems. CAPO engagement is mandatory for Assurance Class B (monthly check-ins) and Class C (24/7 oversight with real-time alerting).',
    versionIntroduced: '1.1',
  },
  {
    term: 'Certification Level',
    definition:
      'One of three tiers that define the scope and rigor of ARA certification: L1 Foundation (baseline controls, express pathway available), L2 Operational (full evaluation with adversarial testing), and L3 Comprehensive (maximum rigor with independent red team assessment).',
    versionIntroduced: '1.0',
  },
  {
    term: 'Conditional',
    definition:
      'An ACR classification that allows conditional certification with a mandated remediation period when non-compliance is identified. The AVB specifies the remediation timeline and required evidence.',
    versionIntroduced: '1.0',
  },
  {
    term: 'Deployment Certification',
    definition:
      'Certification of a specific autonomous system in a specific deployment context. Evaluates the system as deployed, including its operational environment, integration points, and runtime configuration. Contrasts with Platform Certification.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Domain',
    definition:
      'A thematic grouping of related ACRs that addresses a specific area of operational reliability for autonomous systems. The ARA Standard v1.1 defines 15 reliability domains.',
    versionIntroduced: '1.0',
  },
  {
    term: 'Data Privacy and Societal Impact Committee',
    abbreviation: 'DPSIC',
    definition:
      'An advisory body within the ARAF governance structure that provides guidance on data privacy, consent management, and societal impact assessment requirements. DPSIC advises the Technical Standards Board on domains 5 and 13.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Evaluation Method',
    definition:
      'A prescribed technique for assessing ACR compliance. The six methods are: Automated Testing (AT), Human Simulation (HS), Evidence Inspection (EI), Continuous Monitoring (CM), Third-Party Attestation (TP), and Operational Proof (OP).',
    versionIntroduced: '1.0',
  },
  {
    term: 'Express Pathway',
    definition:
      'An accelerated evaluation pathway available for L1 Foundation certification. The express pathway typically completes in 3-4 weeks and is available for systems with lower risk profiles that meet predefined eligibility criteria.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Lapse Window',
    definition:
      'A grace period before a certified system\'s assurance status is downgraded due to missed monitoring obligations or expired certification. The lapse window duration varies by Assurance Class.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Platform Certification',
    definition:
      'Certification of a reusable platform or infrastructure component that enables ACR inheritance for deployment-level certifications built on that platform. Platform certifications carry forward eligible ACR compliance, reducing evaluation scope for individual deployments.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Recognized Insurer Partner',
    abbreviation: 'RIP',
    definition:
      'An insurance provider recognized by ARAF that offers coverage products tied to ARA certification status. RIPs participate in the ARA ecosystem by providing insurance products that reference certification levels and assurance classes.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Risk Classification',
    definition:
      'A mandatory 7-factor assessment conducted by AVBs to determine the appropriate Assurance Class for a system seeking certification. The seven risk factors evaluate autonomy level, decision impact, data sensitivity, operational environment, human oversight capacity, reversibility, and scale.',
    versionIntroduced: '1.1',
  },
  {
    term: 'System Profile',
    definition:
      'One of four profiles (F Foundational with 97 ACRs, S Standard with 215 ACRs, A Advanced with 368 ACRs, C Comprehensive with 410 ACRs) that determine which ACRs are applicable to a given system based on its complexity, autonomy level, and deployment context.',
    versionIntroduced: '1.1',
  },
  {
    term: 'Technical Standards Board',
    abbreviation: 'TSB',
    definition:
      'The ultimate technical authority within the ARAF governance structure. The TSB is responsible for ratifying standard revisions, approving domain modifications, and resolving technical disputes related to ACR interpretation and evaluation methodology.',
    versionIntroduced: '1.0',
  },
];

function VersionBadge({ version }: { version: '1.0' | '1.1' }) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
        version === '1.1'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-slate-50 text-slate-500 border-slate-200'
      }`}
    >
      v{version}
    </span>
  );
}

export default function GlossaryPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return glossaryTerms;
    const q = search.toLowerCase();
    return glossaryTerms.filter(
      (entry) =>
        entry.term.toLowerCase().includes(q) ||
        (entry.abbreviation && entry.abbreviation.toLowerCase().includes(q)) ||
        entry.definition.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1', href: '/standard/v1.1' },
          { label: 'Glossary' },
        ]}
        className="mb-8"
      />

      <div className="max-w-[72ch]">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          ARA Glossary
        </h1>
        <p className="text-steel leading-relaxed mb-8">
          Definitions for all terms used throughout the ARA Standard v1.1. Each term
          indicates which version of the standard introduced it.
        </p>

        {/* Search filter */}
        <div className="relative mb-8">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search terms, abbreviations, or definitions..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-border rounded-md bg-white
                       text-charcoal placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                       transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-charcoal"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Result count */}
        <p className="text-sm text-muted mb-6">
          Showing <span className="font-semibold text-charcoal">{filtered.length}</span> of{' '}
          <span className="font-semibold text-charcoal">{glossaryTerms.length}</span> terms
        </p>

        {/* Definition list */}
        {filtered.length > 0 ? (
          <dl className="space-y-6">
            {filtered.map((entry) => (
              <div
                key={entry.term}
                className="border border-border rounded-lg p-5 bg-white"
              >
                <dt className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-base font-semibold text-charcoal">
                    {entry.term}
                  </span>
                  {entry.abbreviation && (
                    <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border">
                      {entry.abbreviation}
                    </span>
                  )}
                  <VersionBadge version={entry.versionIntroduced} />
                </dt>
                <dd className="text-sm text-steel leading-relaxed">
                  {entry.definition}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="border border-border rounded-lg p-8 bg-slate-50 text-center">
            <p className="text-sm text-muted mb-2">No terms match your search.</p>
            <button
              onClick={() => setSearch('')}
              className="text-sm text-navy underline hover:no-underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/standard/v1.1"
            className="text-sm text-muted hover:text-charcoal transition-colors"
          >
            &larr; Back to ARA Standard v1.1
          </Link>
        </div>
      </div>
    </div>
  );
}
