import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { registryEntries } from '@/data/registry';
import { CertificationBadge } from '@/components/badges/CertificationBadge';
import type {
  CertificationLevel,
  CertificationStatus,
  MonitoringStatus,
} from '@/types';

interface VerifyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return registryEntries.map((entry) => ({
    id: entry.certificationId,
  }));
}

export async function generateMetadata({
  params,
}: VerifyPageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = registryEntries.find((e) => e.certificationId === id);
  if (!entry) {
    return { title: 'Certification Not Found' };
  }
  return {
    title: `${entry.certificationId} — ${entry.organization}`,
    description: `ARA certification record for ${entry.systemName} by ${entry.organization}. Level ${entry.certificationLevel}, Status: ${entry.certificationStatus}.`,
  };
}

function LevelBadge({ level }: { level: CertificationLevel }) {
  const cls =
    level === 'L1'
      ? 'level-badge level-badge-l1'
      : level === 'L2'
        ? 'level-badge level-badge-l2'
        : 'level-badge level-badge-l3';
  return <span className={cls}>{level}</span>;
}

function StatusBadge({ status }: { status: CertificationStatus }) {
  const cls =
    status === 'Active'
      ? 'status-active'
      : status === 'Conditional'
        ? 'status-warning'
        : status === 'Suspended'
          ? 'status-suspended'
          : status === 'Revoked'
            ? 'status-revoked'
            : 'status-suspended';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded ${cls}`}
    >
      {status}
    </span>
  );
}

function MonitoringBadge({ status }: { status: MonitoringStatus }) {
  const cls =
    status === 'Compliant'
      ? 'status-active'
      : status === 'Warning'
        ? 'status-warning'
        : status === 'Non-Compliant'
          ? 'status-revoked'
          : 'status-suspended';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded ${cls}`}
    >
      {status}
    </span>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 py-3.5 border-b border-border last:border-b-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </dt>
      <dd className="text-sm text-steel">{children}</dd>
    </div>
  );
}

export default async function VerifyPage({ params }: VerifyPageProps) {
  const { id } = await params;
  const entry = registryEntries.find((e) => e.certificationId === id);

  if (!entry) {
    notFound();
  }

  const verifyUrl = `https://arastandard.org/registry/verify/${entry.certificationId}`;
  const isExpired = new Date(entry.expiryDate) < new Date();
  const levelName =
    entry.certificationLevel === 'L1'
      ? 'Supervised Operational Reliability'
      : entry.certificationLevel === 'L2'
        ? 'Bounded Autonomous Deployment'
        : 'High-Stakes Autonomous Certification';

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted">
          <li>
            <Link href="/" className="hover:text-charcoal transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/registry"
              className="hover:text-charcoal transition-colors"
            >
              Registry
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-charcoal font-medium font-mono text-xs">
            {entry.certificationId}
          </li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <LevelBadge level={entry.certificationLevel} />
          <StatusBadge status={entry.certificationStatus} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-charcoal mb-1">
          {entry.systemName}
        </h1>
        <p className="text-base text-steel">{entry.organization}</p>
        <p className="text-xs font-mono text-muted mt-2">
          {entry.certificationId}
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        {/* Main content */}
        <div>
          {/* Certification Details */}
          <section className="border border-border rounded-lg overflow-hidden mb-8">
            <div className="bg-slate-50 border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-charcoal">
                Certification Record
              </h2>
            </div>
            <div className="px-6 py-2">
              <dl>
                <DetailRow label="Certification ID">
                  <span className="font-mono font-medium text-charcoal">
                    {entry.certificationId}
                  </span>
                </DetailRow>
                <DetailRow label="Organization">
                  {entry.organization}
                </DetailRow>
                <DetailRow label="System Name">
                  {entry.systemName}
                </DetailRow>
                <DetailRow label="System Category">
                  {entry.category}
                </DetailRow>
                <DetailRow label="Certification Level">
                  <div className="flex items-center gap-2">
                    <LevelBadge level={entry.certificationLevel} />
                    <span>{levelName}</span>
                  </div>
                </DetailRow>
                <DetailRow label="Version Certified Under">
                  <span className="version-badge">
                    v{entry.versionCertifiedUnder}
                  </span>
                </DetailRow>
                <DetailRow label="Industry">
                  {entry.industry}
                </DetailRow>
                <DetailRow label="Issue Date">
                  {formatDate(entry.issueDate)}
                </DetailRow>
                <DetailRow label="Expiry Date">
                  <span className={isExpired ? 'text-red-700 font-medium' : ''}>
                    {formatDate(entry.expiryDate)}
                    {isExpired && ' (Expired)'}
                  </span>
                </DetailRow>
                <DetailRow label="Certification Status">
                  <StatusBadge status={entry.certificationStatus} />
                </DetailRow>
                <DetailRow label="Monitoring Status">
                  <MonitoringBadge status={entry.monitoringStatus} />
                </DetailRow>
              </dl>
            </div>
          </section>

          {/* Scope Statement */}
          <section className="border border-border rounded-lg overflow-hidden mb-8">
            <div className="bg-slate-50 border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-charcoal">
                Scope Statement
              </h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-steel leading-relaxed">
                {entry.scopeStatement}
              </p>
            </div>
          </section>

          {/* Revocation History */}
          <section className="border border-border rounded-lg overflow-hidden">
            <div className="bg-slate-50 border-b border-border px-6 py-4">
              <h2 className="text-base font-semibold text-charcoal">
                Revocation History
              </h2>
            </div>
            <div className="px-6 py-5">
              {entry.revocationHistory.length === 0 ? (
                <p className="text-sm text-muted">
                  No suspension, revocation, or reinstatement events have been
                  recorded for this certification.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left font-semibold px-0 py-2 text-charcoal pr-6">
                          Date
                        </th>
                        <th className="text-left font-semibold py-2 text-charcoal pr-6">
                          Action
                        </th>
                        <th className="text-left font-semibold py-2 text-charcoal">
                          Reason
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {entry.revocationHistory.map((event, i) => (
                        <tr key={i}>
                          <td className="py-2.5 pr-6 text-steel whitespace-nowrap">
                            {formatDate(event.date)}
                          </td>
                          <td className="py-2.5 pr-6">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                                event.action === 'Reinstated'
                                  ? 'status-active'
                                  : event.action === 'Suspended'
                                    ? 'status-suspended'
                                    : 'status-revoked'
                              }`}
                            >
                              {event.action}
                            </span>
                          </td>
                          <td className="py-2.5 text-steel">
                            {event.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar — Badge, QR Code, and verification */}
        <aside>
          <div className="border border-border rounded-lg p-6 sticky top-24">
            {/* Certification Badge */}
            <div className="flex justify-center mb-6 pb-6 border-b border-border">
              <div className="badge-glow">
                <CertificationBadge
                  level={Number(entry.certificationLevel.replace('L', '')) as 1 | 2 | 3}
                  certificationId={entry.certificationId}
                  size={160}
                  variant="dark-on-light"
                />
              </div>
            </div>

            <h3 className="text-sm font-semibold text-charcoal mb-1">
              Verification QR Code
            </h3>
            <p className="text-xs text-muted mb-5">
              Scan this code to verify this certification record independently.
              The QR code encodes the permanent verification URL for this
              certification.
            </p>
            <div className="flex justify-center mb-5">
              <div className="p-4 bg-white border border-border rounded-lg">
                <QRCodeSVG
                  value={verifyUrl}
                  size={200}
                  level="M"
                  marginSize={0}
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted mb-1">Verification URL</p>
              <p className="text-xs font-mono text-steel break-all">
                {verifyUrl}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-border">
              <Link
                href="/registry"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium border border-border rounded-md text-charcoal hover:bg-slate-50 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11L5 7l4-4" />
                </svg>
                Back to Registry
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
