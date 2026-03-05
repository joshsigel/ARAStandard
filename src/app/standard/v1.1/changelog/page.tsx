import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'ARA v1.1 Changelog',
  description:
    'Detailed changelog for ARA Standard v1.1. All additions and changes from v1.0 to v1.1 including the two-axis certification model, system profiles, and expanded governance.',
};

interface ChangeEntry {
  type: 'Added' | 'Changed';
  description: string;
}

const addedChanges: ChangeEntry[] = [
  {
    type: 'Added',
    description:
      'Domain 5: Data Privacy & Consent Management (28 ACRs) — addresses data collection transparency, consent lifecycle management, cross-border data flows, and privacy-by-design requirements.',
  },
  {
    type: 'Added',
    description:
      'Domain 13: Societal Impact Assessment (22 ACRs) — covers algorithmic fairness evaluation, community impact disclosure, accessibility requirements, and long-term societal effect monitoring.',
  },
  {
    type: 'Added',
    description:
      'Assurance Class dimension (A/B/C) creating a two-axis certification model. Class A (Periodic) requires self-assessment. Class B (Monitored) requires monthly CAPO check-ins. Class C (Continuous) requires 24/7 CAPO oversight with real-time alerting.',
  },
  {
    type: 'Added',
    description:
      'Four System Profiles determining ACR applicability: Foundational (97 ACRs), Standard (215 ACRs), Advanced (368 ACRs), and Comprehensive (410 ACRs).',
  },
  {
    type: 'Added',
    description:
      'Platform Certification pathway allowing reusable platforms and infrastructure components to carry forward ACR compliance to deployment-level evaluations through ACR inheritance.',
  },
  {
    type: 'Added',
    description:
      'Risk Classification: mandatory 7-factor assessment conducted by AVBs to determine the appropriate Assurance Class. Factors: autonomy level, decision impact, data sensitivity, operational environment, human oversight capacity, reversibility, and scale.',
  },
  {
    type: 'Added',
    description:
      'CAPO (Certified Assurance Platform Operator) role for continuous monitoring. CAPOs provide post-certification monitoring services for Assurance Class B and C systems.',
  },
  {
    type: 'Added',
    description:
      'Recognized Insurer Partner (RIP) program enabling insurance providers to offer coverage products tied to ARA certification status and assurance classes.',
  },
  {
    type: 'Added',
    description:
      'Express Evaluation pathway for L1 Foundation certification (3-4 weeks) available for systems meeting predefined eligibility criteria and lower risk profiles.',
  },
  {
    type: 'Added',
    description:
      '14 regulatory framework crosswalk mappings including EU AI Act, ISO/IEC 42001, NIST AI RMF, and others. Each mapping documents direct, partial, and complementary relationships to ACRs.',
  },
  {
    type: 'Added',
    description:
      'DPSIC (Data Privacy and Societal Impact Committee) advisory body providing guidance on Domains 5 and 13 to the Technical Standards Board.',
  },
  {
    type: 'Added',
    description:
      '12 new glossary definitions covering: Assurance Class, CAPO, Deployment Certification, DPSIC, Express Pathway, Lapse Window, Platform Certification, RIP, Risk Classification, System Profile, and related terms.',
  },
  {
    type: 'Added',
    description:
      'Evidence categories formalized as four types: LP (Lifecycle Process), TI (Technical Implementation), OP (Operational Performance), and TP (Third-Party).',
  },
  {
    type: 'Added',
    description:
      'New ACR columns: Profile Applicability (which system profiles require the ACR), Evaluation Frequency (continuous, quarterly, annual, or at-certification), Platform Cert Eligible (whether the ACR can be inherited via platform certification), and Framework Crosswalk Refs (links to mapped regulatory requirements).',
  },
];

const changedChanges: ChangeEntry[] = [
  {
    type: 'Changed',
    description:
      'Domain count increased from 13 to 15. Existing domains renumbered to accommodate new Domain 5 (Data Privacy & Consent Management) and Domain 13 (Societal Impact Assessment).',
  },
  {
    type: 'Changed',
    description:
      'ACR count expanded from 352 to 410 (58 new ACRs across new and existing domains).',
  },
  {
    type: 'Changed',
    description:
      'Certification levels renamed: L1 Foundation (was L1 Supervised Operational Reliability), L2 Operational (was L2 Bounded Autonomous Deployment), L3 Comprehensive (was L3 High-Stakes Autonomous Certification).',
  },
  {
    type: 'Changed',
    description:
      'Level names updated from single-axis model (level only) to two-axis model (level + assurance class). Certification designations now expressed as e.g. "L2-B Deployment" or "L1-A Platform".',
  },
  {
    type: 'Changed',
    description:
      'Evaluation methods expanded from four to six: added TP (Third-Party Attestation) for controls validated through independent third-party evidence, and OP (Operational Proof) for controls demonstrated through operational performance data.',
  },
  {
    type: 'Changed',
    description:
      'Domain score thresholds recalibrated for 15 domains. Threshold calculations now account for system profile applicability and risk-weighted composite scoring across the expanded domain set.',
  },
  {
    type: 'Changed',
    description:
      'AVB authorization scope expanded to include risk classification responsibilities and platform certification evaluation capabilities. AVB authorization levels updated to Basic, Enhanced, and Full.',
  },
  {
    type: 'Changed',
    description:
      'Governance structure expanded to include six participant categories: Technical Standards Board (TSB), Data Privacy and Societal Impact Committee (DPSIC), Authorized Validation Bodies (AVBs), Certified Assurance Platform Operators (CAPOs), Recognized Insurer Partners (RIPs), and Consortium Members.',
  },
];

function ChangeTypeBadge({ type }: { type: 'Added' | 'Changed' }) {
  const styles: Record<string, string> = {
    Added: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Changed: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded border shrink-0 ${styles[type]}`}>
      {type}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1', href: '/standard/v1.1' },
          { label: 'Changelog' },
        ]}
        className="mb-8"
      />

      <div className="max-w-[72ch]">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          Changelog
        </h1>
        <p className="text-steel leading-relaxed mb-10">
          This page documents the changes introduced in ARA Standard v1.1. Each entry records
          additions and modifications relative to v1.0. The changelog serves as the authoritative
          record of the standard&apos;s evolution between versions.
        </p>

        {/* Version header */}
        <div id="v1.1" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold text-charcoal">
              <a href="#v1.1" className="group">
                Version 1.1
                <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-muted">#</span>
              </a>
            </h2>
            <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Ratified
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted mb-4">
            <span>
              Effective: <time dateTime="2026-03-01" className="font-medium text-steel">March 2026</time>
            </span>
            <span className="text-slate-300">|</span>
            <span>{addedChanges.length + changedChanges.length} changes</span>
          </div>

          <p className="text-steel leading-relaxed mb-8">
            Major expansion introducing the two-axis certification model, four system profiles,
            platform certification, and two new reliability domains. This version transitions the
            standard from a single-axis (level-only) model to a comprehensive Level x Class
            framework with right-sized certification through system profiles.
          </p>

          {/* Added section */}
          <div className="mb-10">
            <h3 className="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
              <ChangeTypeBadge type="Added" />
              <span>Added ({addedChanges.length})</span>
            </h3>
            <div className="space-y-3">
              {addedChanges.map((change, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 border border-border rounded-lg bg-white"
                >
                  <ChangeTypeBadge type={change.type} />
                  <p className="text-sm text-steel leading-relaxed">
                    {change.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Changed section */}
          <div className="mb-10">
            <h3 className="text-base font-semibold text-charcoal mb-4 flex items-center gap-2">
              <ChangeTypeBadge type="Changed" />
              <span>Changed ({changedChanges.length})</span>
            </h3>
            <div className="space-y-3">
              {changedChanges.map((change, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 border border-border rounded-lg bg-white"
                >
                  <ChangeTypeBadge type={change.type} />
                  <p className="text-sm text-steel leading-relaxed">
                    {change.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Previous version link */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between">
            <Link
              href="/standard/v1.0/changelog"
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              &larr; View v1.0 Changelog
            </Link>
            <Link
              href="/standard/v1.1"
              className="text-sm text-muted hover:text-charcoal transition-colors"
            >
              Back to v1.1 Overview &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
