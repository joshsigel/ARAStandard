'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ExampleWatermark } from '@/components/ui/ExampleWatermark';
import { AraBadgeCompact } from '@/components/badges/AraBadgeCompact';
import { registryEntryToBadgeData } from '@/components/badges/types';
import { AssuranceClassBadge } from '@/components/badges/AssuranceClassBadge';
import { CertTypeBadge } from '@/components/badges/CertTypeBadge';
import type {
  RegistryEntry,
  AssuranceClass,
  CertificationType,
  CertificationLevel,
  CertificationStatus,
  MonitoringStatus,
} from '@/types';

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
        : status === 'Active — Assurance Lapsed'
          ? 'status-warning'
          : status === 'Under Revalidation'
            ? 'status-suspended'
            : status === 'Suspended'
              ? 'status-suspended'
              : status === 'Revoked'
                ? 'status-revoked'
                : 'status-suspended';
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${cls}`}
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
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${cls}`}
    >
      {status}
    </span>
  );
}

const allLevels: CertificationLevel[] = ['L1', 'L2', 'L3'];
const allStatuses: CertificationStatus[] = [
  'Active',
  'Active — Assurance Lapsed',
  'Under Revalidation',
  'Conditional',
  'Suspended',
  'Expired',
  'Revoked',
];
const allMonitoring: MonitoringStatus[] = [
  'Compliant',
  'Warning',
  'Non-Compliant',
  'Pending',
];
const allAssuranceClasses: AssuranceClass[] = ['A', 'B', 'C'];
const allCertificationTypes: CertificationType[] = ['deployment', 'platform'];

interface Props {
  initialEntries: RegistryEntry[];
}

export function RegistryClient({ initialEntries }: Props) {
  const [verifyId, setVerifyId] = useState('');
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<CertificationLevel | 'All'>(
    'All'
  );
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<
    CertificationStatus | 'All'
  >('All');
  const [monitoringFilter, setMonitoringFilter] = useState<
    MonitoringStatus | 'All'
  >('All');
  const [assuranceClassFilter, setAssuranceClassFilter] = useState<
    AssuranceClass | 'All'
  >('All');
  const [certTypeFilter, setCertTypeFilter] = useState<
    CertificationType | 'All'
  >('All');

  const industries = useMemo(() => {
    const set = new Set(initialEntries.map((e) => e.industry));
    return Array.from(set).sort();
  }, [initialEntries]);

  const filtered = useMemo(() => {
    return initialEntries.filter((entry) => {
      if (
        search &&
        !entry.organization.toLowerCase().includes(search.toLowerCase()) &&
        !entry.systemName.toLowerCase().includes(search.toLowerCase()) &&
        !entry.certificationId.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (levelFilter !== 'All' && entry.certificationLevel !== levelFilter) {
        return false;
      }
      if (industryFilter !== 'All' && entry.industry !== industryFilter) {
        return false;
      }
      if (
        statusFilter !== 'All' &&
        entry.certificationStatus !== statusFilter
      ) {
        return false;
      }
      if (
        monitoringFilter !== 'All' &&
        entry.monitoringStatus !== monitoringFilter
      ) {
        return false;
      }
      if (assuranceClassFilter !== 'All') {
        if (!entry.assuranceClass || entry.assuranceClass !== assuranceClassFilter) {
          return false;
        }
      }
      if (certTypeFilter !== 'All') {
        const entryType = entry.certificationType ?? 'deployment';
        if (entryType !== certTypeFilter) {
          return false;
        }
      }
      return true;
    });
  }, [search, levelFilter, industryFilter, statusFilter, monitoringFilter, assuranceClassFilter, certTypeFilter, initialEntries]);

  const handleVerifyLookup = () => {
    const trimmed = verifyId.trim();
    if (!trimmed) return;
    const match = initialEntries.find(
      (e) => e.certificationId.toLowerCase() === trimmed.toLowerCase()
    );
    if (match) {
      window.location.href = `/registry/verify/${match.certificationId}`;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-10">
      {/* Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Registry' },
        ]}
        className="mb-8"
      />

      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          ARA Public Certification Registry
        </h1>
        <p className="text-sm text-steel max-w-2xl leading-relaxed">
          The ARA Public Certification Registry provides an authoritative,
          independently maintained record of all autonomous systems that have
          been evaluated and certified under the ARA Standard. Each entry
          includes the system&apos;s certification scope, current status, and
          monitoring compliance. Certification records are updated in real time
          as status changes occur.
        </p>
      </header>


      {/* Verification ID Lookup */}
      <section className="mb-10">
        <div className="border border-border rounded-lg p-6 bg-slate-50">
          <h2 className="text-sm font-semibold text-charcoal mb-1">
            Verification ID Lookup
          </h2>
          <p className="text-xs text-muted mb-4">
            Enter a certification ID (e.g., ARA-2026-00142) to view the full
            certification record and verification details.
          </p>
          <div className="flex gap-3 max-w-lg">
            <input
              type="text"
              value={verifyId}
              onChange={(e) => setVerifyId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleVerifyLookup();
              }}
              placeholder="ARA-2026-XXXXX"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-white font-mono placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
            <button
              onClick={handleVerifyLookup}
              className="px-4 py-2 text-sm font-medium bg-charcoal text-white rounded-md hover:bg-navy transition-colors"
            >
              Verify
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label
              htmlFor="registry-search"
              className="block text-xs font-semibold text-muted mb-1.5"
            >
              Search
            </label>
            <input
              id="registry-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by organization, system name, or certification ID"
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            />
          </div>

          {/* Level Filter */}
          <div className="w-full lg:w-36">
            <label
              htmlFor="filter-level"
              className="block text-xs font-semibold text-muted mb-1.5"
            >
              Level
            </label>
            <select
              id="filter-level"
              value={levelFilter}
              onChange={(e) =>
                setLevelFilter(
                  e.target.value as CertificationLevel | 'All'
                )
              }
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Levels</option>
              {allLevels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Assurance Class Filter */}
          <div className="w-full lg:w-40">
            <label
              htmlFor="filter-assurance-class"
              className="block text-xs font-semibold text-muted mb-1.5"
            >
              Assurance Class
            </label>
            <select
              id="filter-assurance-class"
              value={assuranceClassFilter}
              onChange={(e) =>
                setAssuranceClassFilter(
                  e.target.value as AssuranceClass | 'All'
                )
              }
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Classes</option>
              {allAssuranceClasses.map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>

          {/* Certification Type Filter */}
          <div className="w-full lg:w-40">
            <label
              htmlFor="filter-cert-type"
              className="block text-xs font-semibold text-muted mb-1.5"
            >
              Cert Type
            </label>
            <select
              id="filter-cert-type"
              value={certTypeFilter}
              onChange={(e) =>
                setCertTypeFilter(
                  e.target.value as CertificationType | 'All'
                )
              }
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Types</option>
              {allCertificationTypes.map((t) => (
                <option key={t} value={t}>
                  {t === 'deployment' ? 'Deployment' : 'Platform'}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div className="w-full lg:w-48">
            <label
              htmlFor="filter-industry"
              className="block text-xs font-semibold text-muted mb-1.5"
            >
              Industry
            </label>
            <select
              id="filter-industry"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <label
              htmlFor="filter-status"
              className="block text-xs font-semibold text-muted mb-1.5"
            >
              Certification Status
            </label>
            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as CertificationStatus | 'All'
                )
              }
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All Statuses</option>
              {allStatuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Monitoring Filter */}
          <div className="w-full lg:w-40">
            <label
              htmlFor="filter-monitoring"
              className="block text-xs font-semibold text-muted mb-1.5"
            >
              Monitoring Status
            </label>
            <select
              id="filter-monitoring"
              value={monitoringFilter}
              onChange={(e) =>
                setMonitoringFilter(
                  e.target.value as MonitoringStatus | 'All'
                )
              }
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
            >
              <option value="All">All</option>
              {allMonitoring.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results count */}
      <div className="mb-4 text-xs text-muted">
        Showing {filtered.length} of {initialEntries.length} certified systems
      </div>

      {/* Results — Mobile Cards */}
      <section className="lg:hidden">
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-muted border border-border rounded-lg">
            No registry entries match the current filters.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry) => (
              <Link
                key={entry.certificationId}
                href={`/registry/verify/${entry.certificationId}`}
                className="relative overflow-hidden block border border-border rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                {!entry.organization.toLowerCase().includes('xlogix') && <ExampleWatermark />}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AraBadgeCompact data={registryEntryToBadgeData(entry)} />
                    <span className="font-mono text-sm font-medium text-navy">
                      {entry.certificationId}
                    </span>
                  </div>
                  <LevelBadge level={entry.certificationLevel} />
                </div>
                <p className="text-sm font-medium text-charcoal">{entry.organization}</p>
                <p className="text-xs text-steel mt-0.5">{entry.systemName}</p>
                <p className="text-xs text-muted mt-0.5">{entry.category}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <StatusBadge status={entry.certificationStatus} />
                  <MonitoringBadge status={entry.monitoringStatus} />
                  {entry.assuranceClass && (
                    <AssuranceClassBadge assuranceClass={entry.assuranceClass} size="sm" />
                  )}
                  <CertTypeBadge type={entry.certificationType ?? 'deployment'} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Results — Desktop Table */}
      <section className="hidden lg:block">
        <div className="relative overflow-x-auto border border-border rounded-lg">
          <ExampleWatermark />
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Certification ID
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Organization
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  System
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Category
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Level
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Class
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Type
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Status
                </th>
                <th className="text-left font-semibold px-4 py-3 text-charcoal whitespace-nowrap">
                  Monitoring
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-muted"
                  >
                    No registry entries match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((entry) => (
                  <tr
                    key={entry.certificationId}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <AraBadgeCompact data={registryEntryToBadgeData(entry)} />
                        <Link
                          href={`/registry/verify/${entry.certificationId}`}
                          className="font-mono text-sm font-medium text-navy hover:underline"
                        >
                          {entry.certificationId}
                        </Link>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-steel">
                      {entry.organization}
                    </td>
                    <td className="px-4 py-3 text-steel max-w-[220px] truncate">
                      {entry.systemName}
                    </td>
                    <td className="px-4 py-3 text-steel">{entry.category}</td>
                    <td className="px-4 py-3">
                      <LevelBadge level={entry.certificationLevel} />
                    </td>
                    <td className="px-4 py-3">
                      {entry.assuranceClass ? (
                        <AssuranceClassBadge assuranceClass={entry.assuranceClass} size="sm" />
                      ) : (
                        <span className="text-muted">&mdash;</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <CertTypeBadge type={entry.certificationType ?? 'deployment'} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={entry.certificationStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <MonitoringBadge status={entry.monitoringStatus} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
