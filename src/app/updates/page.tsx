import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Updates',
  description: 'ARA Standard revisions, announcements, and public comment periods.',
};

const updates = [
  // ── v1.1 Announcements (2026-03-01) ──────────────────────────────────
  {
    date: '2026-03-01',
    type: 'Release',
    title: 'ARA Standard v1.1 — Ratified',
    description:
      'The ARA Standard v1.1 has been ratified, introducing a two-axis certification model (Evaluation Level × Assurance Class), 410 ACRs across 15 reliability domains, four system profiles, platform certification with ACR inheritance, and 14 regulatory framework crosswalk mappings.',
    links: [
      { label: 'Read v1.1 Standard', href: '/standard/v1.1' },
      { label: 'Changelog', href: '/standard/v1.1/changelog' },
    ],
  },
  {
    date: '2026-03-01',
    type: 'Program',
    title: 'CAPO Program — Applications Open',
    description:
      'The Certified Assurance Platform Operator (CAPO) program is now accepting applications. CAPOs provide continuous monitoring services for Class B (Monitored) and Class C (Continuously Assured) certified systems. Initial CAPO authorization review begins Q2 2026.',
    links: [
      { label: 'Monitoring Details', href: '/monitoring' },
      { label: 'CAPO Requirements', href: '/ecosystem/capos' },
    ],
  },
  {
    date: '2026-03-01',
    type: 'Program',
    title: 'Recognized Insurer Partner Program Announced',
    description:
      'ARAF announces the Recognized Insurer Partner (RIP) program, enabling insurance providers to leverage ARA certification data for autonomous system underwriting. Partner applications open Q2 2026.',
    links: [
      { label: 'Insurance Partners', href: '/ecosystem/insurers' },
    ],
  },
  {
    date: '2026-03-01',
    type: 'Technical',
    title: 'Platform Certification Pathway Available',
    description:
      'Platform vendors can now certify their reusable AI infrastructure against platform-eligible ACRs. Certified platforms enable ACR inheritance for deployment certifications built on the platform.',
    links: [
      { label: 'Platform Certification', href: '/certification/platform' },
    ],
  },
  {
    date: '2026-03-01',
    type: 'Technical',
    title: 'Risk Classification Framework Published',
    description:
      'The mandatory 7-factor risk classification framework is now published, defining how AVBs determine the appropriate Assurance Class (A, B, or C) for systems seeking ARA certification.',
    links: [
      { label: 'Risk Classification', href: '/certification/risk-classification' },
    ],
  },
  {
    date: '2026-03-01',
    type: 'Release',
    title: '14 Regulatory Framework Crosswalk Mappings Published',
    description:
      'ARA v1.1 includes crosswalk mappings to 14 major regulatory frameworks including EU AI Act, NIST AI RMF, ISO 42001, SOC 2, GDPR, and more. These mappings help organizations understand how ARA certification aligns with their existing compliance obligations.',
    links: [
      { label: 'AI Standards Landscape', href: '/ai-landscape' },
    ],
  },
  // ── v1.0 Announcements (2026-02-28) ──────────────────────────────────
  {
    date: '2026-02-28',
    type: 'Release',
    title: 'ARA Standard v1.0 — Public Review Draft Published',
    description:
      'The inaugural version of the ARA Standard has been published for public review. This release includes all 13 evaluation domains, 352 Autonomous Control Requirements, three certification levels, and the complete evaluation methodology. The public comment period is now open.',
    links: [
      { label: 'Read the Standard', href: '/standard/v1.0' },
      { label: 'Submit Comment', href: '/standard/v1.0/public-comment' },
    ],
  },
  {
    date: '2026-02-28',
    type: 'Program',
    title: 'AVB Authorization Program — Applications Open',
    description:
      'The Authorized Validation Body program is now accepting applications. Qualified assessment organizations may apply for Basic, Enhanced, or Full authorization levels. Initial authorization cohort review begins Q2 2026.',
    links: [
      { label: 'AVB Program Details', href: '/avb' },
    ],
  },
  {
    date: '2026-02-28',
    type: 'Technical',
    title: 'Behavioral Telemetry SDK Reference Published',
    description:
      'The ARAF Behavioral Telemetry SDK Reference (ARAF-ARA-SDK-2026-001) has been published, providing technical specifications for telemetry integration required under the Continuous Assurance Platform.',
    links: [
      { label: 'Monitoring Documentation', href: '/monitoring' },
      { label: 'API Reference', href: '/developers/api' },
    ],
  },
  {
    date: '2026-02-28',
    type: 'Governance',
    title: 'ARAF Governance Structure Established',
    description:
      'The ARAF governance framework has been formally constituted, including the Technical Standards Board (TSB), Adversarial Testing Advisory Group (ATAG), Robotics & Physical Systems Council (RPSC), Risk & Compliance Advisory Council (RCAC), and Public Interest Oversight Panel (PIOP).',
    links: [
      { label: 'Governance Details', href: '/governance' },
    ],
  },
  {
    date: '2026-02-28',
    type: 'Registry',
    title: 'ARA Public Certification Registry — Operational',
    description:
      'The ARA Public Certification Registry is now operational, providing real-time verification of certification status for all ARA-certified autonomous systems. The registry supports search by Certification ID, organization, system name, level, and industry.',
    links: [
      { label: 'Search Registry', href: '/registry' },
    ],
  },
  {
    date: '2026-02-28',
    type: 'Technical',
    title: 'Machine-Readable Standard and API Endpoints Available',
    description:
      'The ARA Standard is now available in machine-readable JSON format, with OpenAPI-documented endpoints for programmatic access to standard content, ACR definitions, and certification verification. Designed for AI agent ingestion and automated compliance tooling.',
    links: [
      { label: 'AI / Machine Access', href: '/ai-access' },
      { label: 'API Documentation', href: '/developers/api' },
    ],
  },
];

const typeColors: Record<string, string> = {
  Release: 'bg-navy text-white',
  Program: 'bg-slate-100 text-charcoal',
  Technical: 'bg-slate-100 text-charcoal',
  Governance: 'bg-slate-100 text-charcoal',
  Registry: 'bg-slate-100 text-charcoal',
};

export default function UpdatesPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Updates' },
        ]}
        className="mb-8"
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-charcoal mb-4">Updates</h1>
        <p className="text-base text-steel leading-relaxed mb-12">
          Standard revisions, program announcements, and technical publications
          from the Autonomous Reliability Assurance Foundation.
        </p>

        {/* Updates list */}
        <div className="space-y-8">
          {updates.map((update, i) => (
            <article key={i} className="border-l-2 border-slate-200 pl-6 relative">
              <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-300" />
              <div className="flex items-center gap-3 mb-2">
                <time className="text-xs font-mono text-muted">{update.date}</time>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${typeColors[update.type] || 'bg-slate-100 text-charcoal'}`}>
                  {update.type}
                </span>
              </div>
              <h2 className="text-base font-semibold text-charcoal mb-2">
                {update.title}
              </h2>
              <p className="text-sm text-steel leading-relaxed mb-3">
                {update.description}
              </p>
              {update.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {update.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-navy font-medium hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Subscribe */}
        <div className="mt-16 border border-border rounded-lg p-6">
          <h2 className="text-base font-semibold text-charcoal mb-2">
            Stay Informed
          </h2>
          <p className="text-sm text-steel mb-4">
            For notifications on standard revisions, public comment periods,
            and program updates, contact{' '}
            <span className="font-medium text-charcoal">updates@araf.org</span>{' '}
            to subscribe to the ARAF announcement list.
          </p>
        </div>
      </div>
    </div>
  );
}
