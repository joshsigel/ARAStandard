import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { CertTypeBadge } from '@/components/badges/CertTypeBadge';

export const metadata: Metadata = {
  title: 'Platform Certification',
  description:
    'How platforms can be certified against ARA ACRs to enable inheritance across deployment-level certifications.',
};

/* ---------------------------------------------------------------------------
 * Page component
 * --------------------------------------------------------------------------- */

export default function PlatformCertificationPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      {/* ---- Breadcrumb ---- */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Certification', href: '/certification' },
          { label: 'Platform Certification' },
        ]}
        className="mb-8"
      />

      {/* ---- Page header ---- */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal">
            Platform Certification
          </h1>
          <CertTypeBadge type="platform" />
        </div>
        <p className="text-lg text-steel max-w-2xl">
          Certify once, inherit across deployments
        </p>
      </header>

      {/* ---- Overview ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-4">Overview</h2>
        <div className="prose max-w-3xl">
          <p>
            Platform certification allows vendors to certify their platforms
            (e.g., AI orchestration frameworks, agent runtime environments)
            against a subset of ARA ACRs. When a deployment is built on a
            certified platform, the inheritable ACRs don&apos;t need
            re-evaluation &mdash; they&apos;re inherited from the platform
            certification.
          </p>
        </div>
      </section>

      {/* ---- Key Concepts ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Key Concepts
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          Understanding the foundational ideas behind platform certification and
          how it relates to deployment-level assurance.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              title: 'Platform vs Deployment',
              description:
                'Platform certification covers the reusable infrastructure; deployment certification covers the specific system built on top of it.',
            },
            {
              title: 'Inheritance',
              description:
                'Platform-certified ACRs are inherited if the platform certification is valid and the deployment operates within the platform\u2019s reference environment.',
            },
            {
              title: 'Reference Environment',
              description:
                'The certified conditions under which the platform was evaluated \u2014 including OS, runtime, and configuration parameters.',
            },
            {
              title: 'No Assurance Class',
              description:
                'Platform certifications don\u2019t carry an Assurance Class. Only deployment certifications receive a Class A, B, or C designation.',
            },
          ].map((concept) => (
            <div
              key={concept.title}
              className="border border-border rounded-lg p-5"
            >
              <h3 className="text-sm font-semibold text-charcoal mb-1.5">
                {concept.title}
              </h3>
              <p className="text-sm text-steel leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Eligibility ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Eligibility
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Not all software qualifies for platform certification. The following
          criteria must be met before an AVB can begin the platform evaluation
          process.
        </p>

        <div className="space-y-3 max-w-2xl">
          {[
            'Platform must be a reusable software infrastructure (not a specific deployment)',
            'Must be evaluable against at least 50 ACRs marked as platform-cert-eligible',
            'Must define a clear reference environment',
            'Must commit to version tracking and change notification',
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border border-border rounded-lg px-5 py-3"
            >
              <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-[10px] font-bold text-charcoal">
                {i + 1}
              </span>
              <p className="text-sm text-steel leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Certification Process ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Certification Process
        </h2>
        <p className="text-sm text-muted mb-8 max-w-2xl">
          The platform certification lifecycle from initial registration through
          issuance and renewal.
        </p>

        <div className="space-y-4 max-w-2xl">
          {[
            {
              step: 1,
              title: 'Registration',
              description:
                'Platform vendor registers with ARAF through an accredited AVB.',
            },
            {
              step: 2,
              title: 'ACR Evaluation',
              description:
                'AVB evaluates the platform against platform-cert-eligible ACRs using documented evidence and testing.',
            },
            {
              step: 3,
              title: 'Reference Environment Seal',
              description:
                'The reference environment is documented and sealed, defining the exact conditions under which the platform was evaluated.',
            },
            {
              step: 4,
              title: 'Certification Issuance',
              description:
                'Platform certification is issued containing: cert ID, vendor, platform name and version, covered ACRs, reference environment, and validity period.',
            },
            {
              step: 5,
              title: 'Renewal',
              description:
                'Platform certifications are valid for 12 months and are renewable through a streamlined re-evaluation process.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-4 border border-border rounded-lg p-5"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white text-xs font-bold">
                {item.step}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-charcoal mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-steel leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Inheritance Rules ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Inheritance Rules
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          The conditions under which deployment certifications can inherit ACR
          compliance from a platform certification.
        </p>

        <div className="space-y-3 max-w-2xl">
          {[
            {
              rule: 'Reference Environment',
              detail:
                'Deployment must operate within the platform\u2019s certified reference environment.',
            },
            {
              rule: 'No Re-evaluation',
              detail:
                'Inherited ACRs don\u2019t need re-evaluation during deployment certification.',
            },
            {
              rule: 'Active Certification',
              detail:
                'Platform certification must be active (not expired or suspended) at the time of deployment certification.',
            },
            {
              rule: 'Lapse Consequence',
              detail:
                'If platform certification lapses, deployment certifications must address the inherited ACRs at their next renewal.',
            },
            {
              rule: 'Override Option',
              detail:
                'Deployments can override inherited ACRs with deployment-specific evidence if needed.',
            },
          ].map((item) => (
            <div
              key={item.rule}
              className="border border-border rounded-lg px-5 py-4"
            >
              <h3 className="text-sm font-semibold text-charcoal mb-1">
                {item.rule}
              </h3>
              <p className="text-sm text-steel leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Comparison Table ---- */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-charcoal mb-2">
          Platform Certification vs Deployment Certification
        </h2>
        <p className="text-sm text-muted mb-6 max-w-2xl">
          Side-by-side comparison of the two certification types and how they
          differ in scope, requirements, and function.
        </p>

        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  Aspect
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <div className="flex items-center gap-2">
                    <CertTypeBadge type="platform" />
                  </div>
                </th>
                <th className="text-left font-semibold px-5 py-3 text-charcoal">
                  <div className="flex items-center gap-2">
                    <CertTypeBadge type="deployment" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                {
                  aspect: 'Scope',
                  platform: 'Reusable infrastructure',
                  deployment: 'Specific system deployment',
                },
                {
                  aspect: 'Assurance Class',
                  platform: 'None',
                  deployment: 'A, B, or C',
                },
                {
                  aspect: 'ACR Scope',
                  platform: 'Platform-eligible subset',
                  deployment: 'Full profile',
                },
                {
                  aspect: 'CAPO Required',
                  platform: 'No',
                  deployment: 'Depends on class',
                },
                {
                  aspect: 'Inheritance',
                  platform: 'Provides ACRs to deployments',
                  deployment: 'Inherits from platform',
                },
                {
                  aspect: 'Validity',
                  platform: '12 months',
                  deployment: '12 months',
                },
              ].map((row) => (
                <tr key={row.aspect}>
                  <td className="px-5 py-3 font-medium text-charcoal">
                    {row.aspect}
                  </td>
                  <td className="px-5 py-3 text-steel">{row.platform}</td>
                  <td className="px-5 py-3 text-steel">{row.deployment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---- Navigation links ---- */}
      <section className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Continue Reading
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/certification"
            className="group block border border-border rounded-lg p-5 hover:border-charcoal transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:underline mb-1">
              Certification Model
            </h3>
            <p className="text-xs text-muted">
              Two-axis certification framework combining Evaluation Level with
              Assurance Class.
            </p>
          </Link>
          <Link
            href="/evaluation"
            className="group block border border-border rounded-lg p-5 hover:border-charcoal transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:underline mb-1">
              Evaluation Methodology
            </h3>
            <p className="text-xs text-muted">
              The end-to-end evaluation process from scoping through final
              certification decision.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
