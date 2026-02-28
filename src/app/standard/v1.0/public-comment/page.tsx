import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Public Comment — ARA Standard v1.0',
  description:
    'Submit feedback on the ARA Standard v1.0 Public Review Draft. All public comments are reviewed by the Technical Steering Committee.',
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
          <span className="text-charcoal font-medium">Public Comment</span>
        </li>
      </ol>
    </nav>
  );
}

function SectionAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-lg font-semibold text-charcoal mt-10 mb-4 scroll-mt-24">
      <a href={`#${id}`} className="group">
        {children}
        <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-muted">#</span>
      </a>
    </h2>
  );
}

export default function PublicCommentPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb />

      <div className="max-w-[72ch]">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-3xl font-semibold text-charcoal tracking-tight">
            Public Comment
          </h1>
          <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Open
          </span>
        </div>

        <p className="text-steel leading-relaxed mb-4">
          The ARA Standard v1.0 is currently designated as a Public Review Draft. The
          Autonomous Reliability Assurance Foundation invites feedback from the technical
          community, industry practitioners, regulatory bodies, and other stakeholders.
          All comments received during the public comment period are reviewed by the
          Technical Steering Committee and inform subsequent revisions to the standard.
        </p>

        <div className="bg-slate-50 border border-border rounded-lg p-5 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Comment Period Opens
              </p>
              <p className="text-charcoal font-medium">January 15, 2026</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Comment Period Closes
              </p>
              <p className="text-charcoal font-medium">To be announced</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Version Under Review
              </p>
              <p className="text-charcoal font-medium">v1.0 Public Review Draft</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Review Body
              </p>
              <p className="text-charcoal font-medium">Technical Steering Committee</p>
            </div>
          </div>
        </div>

        <SectionAnchor id="scope-of-comments">Scope of Comments</SectionAnchor>
        <p className="text-steel leading-relaxed mb-4">
          The Technical Steering Committee welcomes comments on all aspects of the
          ARA Standard v1.0, including but not limited to:
        </p>
        <ul className="space-y-2 text-sm text-steel mb-6">
          <li className="flex items-start gap-2">
            <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
            <span>
              <strong className="text-charcoal">Domain coverage</strong> — Are the 13
              reliability domains comprehensive? Are there reliability concerns for
              autonomous systems that are not adequately addressed by the current domain
              structure?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
            <span>
              <strong className="text-charcoal">ACR specificity</strong> — Are the
              Autonomous Compliance Requirements sufficiently specific to be testable
              and verifiable? Are the evidence requirements clear and achievable?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
            <span>
              <strong className="text-charcoal">Certification levels</strong> — Do the
              three certification levels adequately differentiate systems by risk profile
              and autonomy model? Are the domain thresholds appropriately calibrated?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
            <span>
              <strong className="text-charcoal">Evaluation methods</strong> — Are the
              four evaluation methods appropriate for assessing the controls they are
              assigned to? Are the assessment procedures clear for Authorized Verification
              Bodies?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
            <span>
              <strong className="text-charcoal">Implementation feasibility</strong> —
              Can the requirements be implemented by organizations of varying maturity
              levels? Are there requirements that impose disproportionate burden without
              corresponding reliability benefit?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
            <span>
              <strong className="text-charcoal">Terminology and definitions</strong> —
              Are the terms used throughout the standard clear and consistent? Are there
              ambiguities that could lead to inconsistent interpretation?
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-slate-300 mt-0.5 shrink-0">&bull;</span>
            <span>
              <strong className="text-charcoal">Industry applicability</strong> — Does
              the standard adequately address the needs of specific industries? Are there
              sector-specific concerns that should be reflected in the standard?
            </span>
          </li>
        </ul>

        <SectionAnchor id="submission-format">Submission Format</SectionAnchor>
        <p className="text-steel leading-relaxed mb-4">
          To ensure efficient review, public comments should follow the structured
          format described below. Comments that do not follow this format will still be
          reviewed but may take longer to process.
        </p>
        <div className="border border-border rounded-lg overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border w-1/3">Field</th>
                <th className="text-left font-semibold text-charcoal px-4 py-3 border-b border-border">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 border-b border-border font-medium text-charcoal">Submitter Name</td>
                <td className="px-4 py-3 border-b border-border text-muted">Name of the individual or organization submitting the comment</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border font-medium text-charcoal">Submitter Affiliation</td>
                <td className="px-4 py-3 border-b border-border text-muted">Organization or institution (if applicable)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border font-medium text-charcoal">Section Reference</td>
                <td className="px-4 py-3 border-b border-border text-muted">Specific domain, ACR ID, or section of the standard being addressed</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border font-medium text-charcoal">Comment Type</td>
                <td className="px-4 py-3 border-b border-border text-muted">General, Technical, Editorial, or Structural</td>
              </tr>
              <tr>
                <td className="px-4 py-3 border-b border-border font-medium text-charcoal">Comment</td>
                <td className="px-4 py-3 border-b border-border text-muted">Description of the concern, suggestion, or observation</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-charcoal">Proposed Resolution</td>
                <td className="px-4 py-3 text-muted">Suggested change or alternative approach (if applicable)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SectionAnchor id="how-to-submit">How to Submit</SectionAnchor>
        <p className="text-steel leading-relaxed mb-4">
          Public comments can be submitted through the following channels:
        </p>
        <div className="space-y-4 mb-6">
          <div className="border border-border rounded-lg p-4 bg-white">
            <h3 className="text-sm font-semibold text-charcoal mb-1">Email Submission</h3>
            <p className="text-sm text-muted mb-2">
              Send structured comments to the Technical Steering Committee at:
            </p>
            <p className="font-mono text-sm text-navy">
              public-comment@arastandard.org
            </p>
          </div>
          <div className="border border-border rounded-lg p-4 bg-white">
            <h3 className="text-sm font-semibold text-charcoal mb-1">GitHub Repository</h3>
            <p className="text-sm text-muted mb-2">
              Submit comments as issues on the ARA Standard public repository.
              Use the provided issue templates for structured feedback.
            </p>
            <p className="font-mono text-sm text-navy">
              github.com/araf/ara-standard
            </p>
          </div>
          <div className="border border-border rounded-lg p-4 bg-white">
            <h3 className="text-sm font-semibold text-charcoal mb-1">Structured Form</h3>
            <p className="text-sm text-muted">
              A structured submission form will be made available on the ARAF website
              during the public comment period. Check the Updates page for announcements.
            </p>
          </div>
        </div>

        <SectionAnchor id="review-process">Review Process</SectionAnchor>
        <p className="text-steel leading-relaxed mb-4">
          All comments received during the public comment period are processed through the
          following review procedure:
        </p>
        <ol className="space-y-3 mb-6">
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              1
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Acknowledgment.</strong> All comments are
              acknowledged within 10 business days of receipt with a tracking identifier.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              2
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Classification.</strong> Comments are
              classified by type, severity, and affected section. Duplicate comments
              are consolidated.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              3
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Technical Review.</strong> Each comment is
              reviewed by the relevant domain working group within the Technical Steering
              Committee.
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              4
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Disposition.</strong> Each comment receives
              a disposition: Accepted (incorporated into next revision), Accepted with
              Modification, Deferred (for future revision), or Noted (acknowledged but
              no change made, with rationale).
            </span>
          </li>
          <li className="flex items-start gap-3 text-sm text-steel">
            <span className="font-mono text-xs font-semibold text-navy bg-slate-50 px-1.5 py-0.5 rounded border border-border shrink-0 mt-0.5">
              5
            </span>
            <span className="leading-relaxed">
              <strong className="text-charcoal">Response Publication.</strong> A comment
              disposition report is published after the comment period closes, documenting
              all received comments and their dispositions.
            </span>
          </li>
        </ol>

        <SectionAnchor id="confidentiality">Confidentiality</SectionAnchor>
        <p className="text-steel leading-relaxed mb-4">
          By default, all public comments are treated as public contributions and may be
          published in the comment disposition report. If a submitter requires confidential
          treatment, this must be explicitly stated in the submission. Confidential
          submissions will be reviewed by the Technical Steering Committee but will not
          be included in the published disposition report.
        </p>

        <div className="mt-10 p-5 bg-slate-50 border border-border rounded-lg">
          <p className="text-sm text-steel leading-relaxed">
            The Autonomous Reliability Assurance Foundation is committed to an open and
            transparent standards development process. Public comment is a critical input
            to ensuring that the ARA Standard reflects the needs and expertise of the
            broader community. All substantive feedback is carefully considered regardless
            of the submitter&apos;s organizational affiliation or the channel through which
            the comment is submitted.
          </p>
        </div>
      </div>
    </div>
  );
}
