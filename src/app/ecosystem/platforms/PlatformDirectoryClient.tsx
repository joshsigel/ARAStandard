'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ExampleWatermark } from '@/components/ui/ExampleWatermark';
import { CertTypeBadge } from '@/components/badges/CertTypeBadge';
import type { PlatformCertEntry } from '@/types';

function LevelBadge({ level }: { level: number }) {
  const label = `L${level}`;
  const cls =
    level === 1
      ? 'bg-slate-100 text-steel border-slate-300'
      : level === 2
        ? 'bg-charcoal text-white border-charcoal'
        : 'bg-navy text-white border-navy';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-mono font-semibold rounded border ${cls}`}
    >
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'Active'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : status === 'Suspended'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-red-50 text-red-700 border-red-200';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${cls}`}
    >
      {status}
    </span>
  );
}

interface Props {
  platforms: PlatformCertEntry[];
}

export function PlatformDirectoryClient({ platforms }: Props) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return platforms;
    const q = search.toLowerCase();
    return platforms.filter(
      (p) =>
        p.vendor.toLowerCase().includes(q) ||
        p.platformName.toLowerCase().includes(q) ||
        p.platformVersion.toLowerCase().includes(q)
    );
  }, [platforms, search]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ecosystem', href: '/ecosystem' },
          { label: 'Certified Platforms' },
        ]}
        className="mb-8"
      />

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold tracking-tight text-charcoal">
            Certified Platforms
          </h1>
          <CertTypeBadge type="platform" />
        </div>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          Platforms that have achieved ARA platform certification, enabling ACR
          inheritance for deployments. When a deployment is built on a certified
          platform, the inheritable ACRs covered by the platform certification do
          not need to be re-evaluated at the deployment level.
        </p>
      </header>


      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by vendor, platform, or version..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 text-sm border border-border rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
            placeholder:text-slate-400"
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto border border-border rounded-lg">
        <ExampleWatermark />
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-border-dark bg-slate-50">
              <th className="text-left py-3 px-4 font-semibold text-charcoal">
                Vendor
              </th>
              <th className="text-left py-3 px-4 font-semibold text-charcoal">
                Platform
              </th>
              <th className="text-left py-3 px-4 font-semibold text-charcoal">
                Version
              </th>
              <th className="text-left py-3 px-4 font-semibold text-charcoal">
                Level
              </th>
              <th className="text-right py-3 px-4 font-semibold text-charcoal">
                ACRs Covered
              </th>
              <th className="text-left py-3 px-4 font-semibold text-charcoal">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-steel">
            {filtered.map((p) => (
              <tr
                key={`${p.vendor}-${p.platformName}-${p.platformVersion}`}
                className="border-b border-border hover:bg-slate-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-charcoal">
                  {p.vendor}
                </td>
                <td className="py-3 px-4">
                  <div>{p.platformName}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {p.referenceEnvironment}
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-xs">{p.platformVersion}</td>
                <td className="py-3 px-4">
                  <LevelBadge level={p.certificationLevel} />
                </td>
                <td className="py-3 px-4 text-right font-mono">
                  {p.inheritableAcrCount}
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={p.certificationStatus} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-muted text-sm"
                >
                  No platforms match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Expiry details (expandable row info) */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div
            key={`${p.vendor}-detail`}
            className="relative overflow-hidden border border-border rounded-lg p-4 bg-slate-50"
          >
            {!p.vendor.toLowerCase().includes('xlogix') && <ExampleWatermark />}
            <h3 className="text-sm font-semibold text-charcoal mb-2">
              {p.platformName}{' '}
              <span className="text-muted font-normal">v{p.platformVersion}</span>
            </h3>
            <dl className="grid grid-cols-2 gap-y-1.5 text-xs">
              <dt className="text-muted">Issued</dt>
              <dd className="text-steel font-mono">{p.issueDate}</dd>
              <dt className="text-muted">Expires</dt>
              <dd className="text-steel font-mono">{p.expiryDate}</dd>
              <dt className="text-muted">Reference Env</dt>
              <dd className="text-steel col-span-2 mt-0.5">
                {p.referenceEnvironment}
              </dd>
            </dl>
          </div>
        ))}
      </div>

      {/* Link to Platform Certification */}
      <div className="mt-12 border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          How Platform Certification Works
        </h2>
        <Link
          href="/certification/platform"
          className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors max-w-md"
        >
          <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
            Platform Certification Framework
          </h3>
          <p className="text-xs text-muted">
            Learn how platforms are evaluated, how ACR inheritance works, and how
            to apply for platform certification.
          </p>
        </Link>
      </div>
    </div>
  );
}
