import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { acrs } from '@/data/acrs';
import { domains } from '@/data/domains';

interface ACRPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return acrs.map((acr) => ({
    id: acr.id,
  }));
}

export async function generateMetadata({ params }: ACRPageProps): Promise<Metadata> {
  const { id } = await params;
  const acr = acrs.find((a) => a.id === id);
  if (!acr) return { title: 'ACR Not Found' };

  return {
    title: `${acr.id}: ${acr.title} — ARA Standard v1.0`,
    description: acr.description,
  };
}

function Breadcrumb({ acrId }: { acrId: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-1.5 text-sm text-muted flex-wrap">
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
          <Link href="/standard/v1.0/acr" className="hover:text-charcoal transition-colors">
            ACR Library
          </Link>
        </li>
        <li aria-hidden="true" className="text-slate-300">/</li>
        <li>
          <span className="text-charcoal font-medium">{acrId}</span>
        </li>
      </ol>
    </nav>
  );
}

function LevelBadge({ level, active }: { level: string; active: boolean }) {
  if (!active) {
    return (
      <span className="inline-flex items-center justify-center font-mono text-[11px] font-bold w-8 h-[22px] rounded-[3px] bg-white text-slate-300 border border-slate-200">
        {level}
      </span>
    );
  }
  const classes: Record<string, string> = {
    L1: 'level-badge level-badge-l1',
    L2: 'level-badge level-badge-l2',
    L3: 'level-badge level-badge-l3',
  };
  return <span className={classes[level]}>{level}</span>;
}

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-base font-semibold text-charcoal mt-8 mb-3 scroll-mt-24">
      <a href={`#${id}`} className="group">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-muted">#</span>
      </a>
    </h2>
  );
}

const evalMethodLabels: Record<string, string> = {
  AT: 'Automated Testing',
  HS: 'Human Simulation',
  EI: 'Evidence Inspection',
  CM: 'Continuous Monitoring',
};

const evalMethodDescriptions: Record<string, string> = {
  AT: 'Compliance is evaluated through automated test suites that exercise the control under structured test conditions. Results are deterministically reproducible.',
  HS: 'Compliance is evaluated through structured scenarios where qualified human evaluators simulate realistic operational conditions and adversarial interactions.',
  EI: 'Compliance is evaluated through inspection of documentary evidence including architecture documents, configuration artifacts, and operational records.',
  CM: 'Compliance is evaluated through analysis of continuous monitoring telemetry collected over a defined observation period during live or simulated operations.',
};

export default async function ACRDetailPage({ params }: ACRPageProps) {
  const { id } = await params;
  const acr = acrs.find((a) => a.id === id);

  if (!acr) {
    notFound();
  }

  const domain = domains.find((d) => d.id === acr.domainId);

  // Find same-domain ACRs for navigation
  const domainAcrs = acrs.filter((a) => a.domainId === acr.domainId);
  const currentIndex = domainAcrs.findIndex((a) => a.id === acr.id);
  const prevACR = currentIndex > 0 ? domainAcrs[currentIndex - 1] : null;
  const nextACR = currentIndex < domainAcrs.length - 1 ? domainAcrs[currentIndex + 1] : null;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb acrId={acr.id} />

      <div className="max-w-[72ch]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="acr-id text-lg">{acr.id}</span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                acr.classification === 'Blocking'
                  ? 'bg-charcoal text-white'
                  : 'bg-slate-100 text-steel border border-border'
              }`}
            >
              {acr.classification}
            </span>
            <span className="text-xs text-muted">
              v{acr.versionIntroduced}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-charcoal tracking-tight mb-4">
            {acr.title}
          </h1>

          {/* Summary metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-border rounded-lg">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Domain</p>
              <Link
                href={`/standard/v1.0/domains/${domain?.slug}`}
                className="text-sm text-navy underline"
              >
                {String(acr.domainId).padStart(2, '0')} — {acr.domain}
              </Link>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Eval Method</p>
              <span className="inline-flex items-center gap-1.5 text-sm">
                <span className="font-mono font-semibold text-navy">{acr.evaluationMethod}</span>
                <span className="text-steel">{evalMethodLabels[acr.evaluationMethod]}</span>
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Risk Weight</p>
              <span className="text-sm">
                <span className="font-mono font-semibold text-charcoal">{acr.riskWeight}</span>
                <span className="text-muted"> / 10</span>
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Applicability</p>
              <div className="flex items-center gap-1">
                <LevelBadge level="L1" active={acr.levelApplicability.L1} />
                <LevelBadge level="L2" active={acr.levelApplicability.L2} />
                <LevelBadge level="L3" active={acr.levelApplicability.L3} />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <SectionAnchor id="description">Description</SectionAnchor>
        <p className="text-steel leading-relaxed">
          {acr.description}
        </p>

        {/* Evaluation Method */}
        <SectionAnchor id="evaluation-method">Evaluation Method</SectionAnchor>
        <div className="bg-slate-50 border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-sm font-semibold text-navy bg-white px-2 py-0.5 rounded border border-border">
              {acr.evaluationMethod}
            </span>
            <span className="text-sm font-semibold text-charcoal">
              {evalMethodLabels[acr.evaluationMethod]}
            </span>
          </div>
          <p className="text-sm text-steel leading-relaxed">
            {evalMethodDescriptions[acr.evaluationMethod]}
          </p>
        </div>

        {/* Evidence Requirements */}
        <SectionAnchor id="evidence-requirements">Evidence Requirements</SectionAnchor>
        <p className="text-sm text-muted mb-3">
          The following evidence artifacts must be provided to demonstrate compliance with this control:
        </p>
        <ol className="space-y-3">
          {acr.evidenceRequirements.map((req, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-steel">
              <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{req}</span>
            </li>
          ))}
        </ol>

        {/* Level Applicability */}
        <SectionAnchor id="level-applicability">Level Applicability</SectionAnchor>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Level</th>
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Applicable</th>
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Implication</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-b border-border">
                  <LevelBadge level="L1" active={acr.levelApplicability.L1} />
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {acr.levelApplicability.L1 ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {acr.levelApplicability.L1
                    ? acr.classification === 'Blocking'
                      ? 'Must pass for L1 certification. Non-compliance results in automatic denial.'
                      : 'Evaluated for L1 certification. Non-compliance may result in conditional certification.'
                    : 'Not evaluated at L1. This control applies at higher certification levels only.'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border">
                  <LevelBadge level="L2" active={acr.levelApplicability.L2} />
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {acr.levelApplicability.L2 ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3 border-b border-border text-muted">
                  {acr.levelApplicability.L2
                    ? acr.classification === 'Blocking'
                      ? 'Must pass for L2 certification. Non-compliance results in automatic denial.'
                      : 'Evaluated for L2 certification. Non-compliance may result in conditional certification.'
                    : 'Not evaluated at L2.'}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <LevelBadge level="L3" active={acr.levelApplicability.L3} />
                </td>
                <td className="px-4 py-3 text-muted">
                  {acr.levelApplicability.L3 ? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-3 text-muted">
                  {acr.levelApplicability.L3
                    ? acr.classification === 'Blocking'
                      ? 'Must pass for L3 certification with maximum rigor evaluation.'
                      : 'Evaluated at L3 with extended evidence requirements.'
                    : 'Not evaluated at L3.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Related Controls */}
        {acr.relatedControls.length > 0 && (
          <>
            <SectionAnchor id="related-controls">Related Controls</SectionAnchor>
            <p className="text-sm text-muted mb-3">
              This ACR has dependencies or relationships with the following controls:
            </p>
            <div className="space-y-2">
              {acr.relatedControls.map((ctrlId) => {
                const related = acrs.find((a) => a.id === ctrlId);
                if (!related) {
                  return (
                    <div key={ctrlId} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-slate-50">
                      <span className="acr-id">{ctrlId}</span>
                      <span className="text-sm text-muted">Not yet defined in this release</span>
                    </div>
                  );
                }
                return (
                  <Link
                    key={ctrlId}
                    href={`/standard/v1.0/acr/${ctrlId}`}
                    className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-border-dark transition-colors bg-white group"
                  >
                    <span className="acr-id shrink-0">{related.id}</span>
                    <span className="text-sm text-steel group-hover:text-charcoal transition-colors">
                      {related.title}
                    </span>
                    <span className="text-xs text-muted ml-auto shrink-0">
                      {related.domain}
                    </span>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* Classification rationale */}
        <SectionAnchor id="classification">Classification</SectionAnchor>
        <div className="bg-slate-50 border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                acr.classification === 'Blocking'
                  ? 'bg-charcoal text-white'
                  : 'bg-white text-steel border border-border'
              }`}
            >
              {acr.classification}
            </span>
            <span className="text-sm font-semibold text-charcoal">
              {acr.classification === 'Blocking' ? 'Blocking Control' : 'Conditional Control'}
            </span>
          </div>
          <p className="text-sm text-steel leading-relaxed">
            {acr.classification === 'Blocking'
              ? 'This is a blocking control. Non-compliance with this ACR results in automatic certification denial at all applicable levels. No conditional certification or remediation period is available for blocking controls. The system must demonstrate full compliance before certification can be granted.'
              : 'This is a conditional control. Non-compliance with this ACR may result in conditional certification with a mandated remediation period. The Authorized Verification Body will specify the remediation timeline and required evidence for the condition to be cleared. If remediation is not completed within the specified period, the conditional certification will be revoked.'}
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          {prevACR ? (
            <Link
              href={`/standard/v1.0/acr/${prevACR.id}`}
              className="group text-sm text-muted hover:text-charcoal transition-colors"
            >
              <span className="text-xs text-slate-400 block mb-0.5">&larr; Previous</span>
              <span className="font-medium">
                {prevACR.id}: {prevACR.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextACR ? (
            <Link
              href={`/standard/v1.0/acr/${nextACR.id}`}
              className="group text-sm text-muted hover:text-charcoal transition-colors text-right"
            >
              <span className="text-xs text-slate-400 block mb-0.5">Next &rarr;</span>
              <span className="font-medium">
                {nextACR.id}: {nextACR.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
