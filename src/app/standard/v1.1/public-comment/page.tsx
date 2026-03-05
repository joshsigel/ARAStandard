import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Public Comment',
  description:
    'Public comment information for the ARA Standard v1.1. The comment period for v1.1 is now closed following ratification.',
};

export default function PublicCommentPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Standard', href: '/standard' },
          { label: 'v1.1', href: '/standard/v1.1' },
          { label: 'Public Comment' },
        ]}
        className="mb-8"
      />

      <div className="max-w-[72ch]">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-semibold text-charcoal tracking-tight">
            Public Comment Period
          </h1>
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            Closed
          </span>
        </div>

        <p className="text-steel leading-relaxed mb-6">
          The public comment period for ARA Standard v1.1 is now closed. Version 1.1 was
          ratified in March 2026 following review by the Technical Standards Board. All
          comments received during the public comment period were reviewed and dispositioned
          by the relevant working groups.
        </p>

        {/* Status summary */}
        <div className="bg-slate-50 border border-border rounded-lg p-5 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Comment Period Opened
              </p>
              <p className="text-charcoal font-medium">December 2025</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Comment Period Closed
              </p>
              <p className="text-charcoal font-medium">February 2026</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Version Under Review
              </p>
              <p className="text-charcoal font-medium">v1.1 Draft</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Final Status
              </p>
              <p className="text-charcoal font-medium">Ratified &mdash; March 2026</p>
            </div>
          </div>
        </div>

        {/* How public comment works */}
        <h2 className="text-lg font-semibold text-charcoal mt-10 mb-4">
          How Public Comment Works
        </h2>
        <p className="text-steel leading-relaxed mb-4">
          The ARA Standard follows a structured public comment process as part of its
          governance framework. Before any version of the standard is ratified, a public
          comment period is opened to solicit feedback from the technical community, industry
          practitioners, regulatory bodies, and other stakeholders.
        </p>

        <ol className="space-y-3 mb-8">
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              1
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Draft Publication.</strong> A draft version
              of the standard is published with all proposed changes clearly documented in
              the changelog.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              2
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Comment Collection.</strong> Stakeholders
              submit structured feedback via email, GitHub, or the ARAF submission form.
              Comments are classified by type, severity, and affected section.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              3
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Technical Review.</strong> Each comment is
              reviewed by the relevant domain working group. Comments are dispositioned as
              Accepted, Accepted with Modification, Deferred, or Noted.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              4
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Ratification.</strong> After incorporating
              feedback, the Technical Standards Board votes to ratify the updated version.
              A disposition report is published documenting all comments and their outcomes.
            </span>
          </li>
        </ol>

        {/* Next comment period */}
        <div className="bg-slate-50 border border-border rounded-lg p-5 mb-10">
          <h3 className="text-sm font-semibold text-charcoal mb-2">
            Future Comment Periods
          </h3>
          <p className="text-sm text-steel leading-relaxed">
            Public comment periods for future versions of the ARA Standard will be announced
            on the Updates page and through ARAF communication channels. Subscribe to updates
            to be notified when the next comment period opens.
          </p>
        </div>

        {/* Links */}
        <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/governance"
            className="text-sm text-navy hover:underline"
          >
            Governance Framework &rarr;
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
  );
}
