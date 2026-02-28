import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog — ARA Standard v1.0',
  description:
    'Version history and change records for the ARA Standard. Tracks all additions, modifications, and removals across standard revisions.',
};

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <Link href="/standard" className="hover:text-charcoal transition-colors">
            Standard
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <Link href="/standard/v1.0" className="hover:text-charcoal transition-colors">
            v1.0
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <span className="text-charcoal font-medium">Changelog</span>
        </li>
      </ol>
    </nav>
  );
}

interface ChangeEntry {
  type: 'Added' | 'Changed' | 'Removed' | 'Fixed';
  section: string;
  description: string;
}

interface VersionEntry {
  version: string;
  date: string;
  status: string;
  summary: string;
  changes: ChangeEntry[];
}

const versions: VersionEntry[] = [
  {
    version: '1.0',
    date: '2026-01-15',
    status: 'Public Review Draft',
    summary:
      'Initial release of the ARA Standard establishing the foundational framework for autonomous system reliability certification.',
    changes: [
      {
        type: 'Added',
        section: 'Core Framework',
        description:
          'Established the ARA Standard framework with 13 reliability domains, 3 certification levels, and 4 evaluation methods.',
      },
      {
        type: 'Added',
        section: 'Domains 1-12',
        description:
          'Defined 12 core reliability domains applicable to all autonomous systems: Autonomy Scope Definition, Decision Integrity, Tool and API Governance, Identity and Permission Containment, Failure Mode Containment, Behavioral Reliability Under Stress, Adversarial Robustness, Drift Detection and Stability, Monitoring and Telemetry, Escalation and Human Override, Auditability and Transparency, and Operational Governance Controls.',
      },
      {
        type: 'Added',
        section: 'Domain 13',
        description:
          'Defined the Physical Actuation Integrity extension domain for autonomous systems with physical actuator capabilities, including sensor-actuator feedback loops, command validation pipelines, and emergency stop mechanisms.',
      },
      {
        type: 'Added',
        section: 'ACR Library',
        description:
          'Published 52 representative Autonomous Compliance Requirements across all 13 domains with defined evaluation methods, risk weights, evidence requirements, and classification designations.',
      },
      {
        type: 'Added',
        section: 'Certification Levels',
        description:
          'Defined three certification levels: L1 (Supervised Operational Reliability), L2 (Bounded Autonomous Deployment), and L3 (High-Stakes Autonomous Certification) with distinct rigor, monitoring, and reassessment requirements.',
      },
      {
        type: 'Added',
        section: 'Evaluation Methods',
        description:
          'Established four evaluation methods: Automated Testing (AT), Human Simulation (HS), Evidence Inspection (EI), and Continuous Monitoring (CM). Each ACR is assigned a primary evaluation method.',
      },
      {
        type: 'Added',
        section: 'Certification Lifecycle',
        description:
          'Defined the 10-phase certification lifecycle from intake assessment through ongoing compliance monitoring, including formal evaluation procedures, decision criteria, and reassessment protocols.',
      },
      {
        type: 'Added',
        section: 'Risk Weighting',
        description:
          'Implemented a 1-10 risk weighting system for ACRs that influences the contribution of each control to the overall domain compliance score and prioritizes evaluation focus.',
      },
      {
        type: 'Added',
        section: 'ACR Classification',
        description:
          'Established Blocking and Conditional classification designations for ACRs. Blocking controls require full compliance for certification; Conditional controls may allow time-limited remediation.',
      },
      {
        type: 'Added',
        section: 'Normative References',
        description:
          'Referenced ISO/IEC 42001:2023, NIST AI RMF 1.0, ISO 22989:2022, IEC 61508, and OWASP LLM Top 10 as informative references.',
      },
      {
        type: 'Added',
        section: 'Governance',
        description:
          'Established the governance framework for the ARA Standard including the Technical Steering Committee, public comment process, and revision procedures.',
      },
      {
        type: 'Added',
        section: 'Public Comment',
        description:
          'Opened the public comment period for v1.0 Public Review Draft. Comments accepted through formal submission process.',
      },
    ],
  },
];

function ChangeTypeBadge({ type }: { type: ChangeEntry['type'] }) {
  const styles: Record<string, string> = {
    Added: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Changed: 'bg-amber-50 text-amber-700 border-amber-200',
    Removed: 'bg-red-50 text-red-700 border-red-200',
    Fixed: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded border ${styles[type]}`}>
      {type}
    </span>
  );
}

export default function ChangelogPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb />

      <div className="max-w-[72ch]">
        <h1 className="text-3xl font-semibold text-charcoal tracking-tight mb-4">
          Changelog
        </h1>
        <p className="text-steel leading-relaxed mb-10">
          This page documents the version history of the ARA Standard. Each entry records
          the additions, modifications, and removals made in that version along with the
          rationale for significant changes. The changelog serves as the authoritative
          record of the standard&apos;s evolution.
        </p>

        <div className="space-y-12">
          {versions.map((version) => (
            <div key={version.version} id={`v${version.version}`} className="scroll-mt-24">
              {/* Version header */}
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-semibold text-charcoal">
                  <a href={`#v${version.version}`} className="group">
                    Version {version.version}
                    <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-muted">#</span>
                  </a>
                </h2>
                <span className="version-badge text-xs">{version.status}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted mb-4">
                <span>
                  Released: <time dateTime={version.date} className="font-medium text-steel">{version.date}</time>
                </span>
                <span className="text-slate-300">|</span>
                <span>{version.changes.length} changes</span>
              </div>

              <p className="text-steel leading-relaxed mb-6">
                {version.summary}
              </p>

              {/* Change entries */}
              <div className="space-y-3">
                {version.changes.map((change, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 border border-border rounded-lg bg-white"
                  >
                    <ChangeTypeBadge type={change.type} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-charcoal mb-1">
                        {change.section}
                      </p>
                      <p className="text-sm text-steel leading-relaxed">
                        {change.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Future versions note */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted leading-relaxed">
            Future versions of the ARA Standard will be documented here as they are
            released. Each revision follows the governance process defined by the Technical
            Steering Committee, including a public comment period before ratification.
            Subscribe to the ARAF updates page for notifications of new releases.
          </p>
        </div>
      </div>
    </div>
  );
}
