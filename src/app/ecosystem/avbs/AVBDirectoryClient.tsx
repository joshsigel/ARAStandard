'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ExampleWatermark, ExampleBanner } from '@/components/ui/ExampleWatermark';
import type { AVBEntry } from '@/types';

const allLevels: AVBEntry['authorizationLevel'][] = ['Basic', 'Enhanced', 'Full'];

function LevelBadge({ level }: { level: AVBEntry['authorizationLevel'] }) {
  const cls =
    level === 'Full'
      ? 'bg-navy text-white border-navy'
      : level === 'Enhanced'
        ? 'bg-charcoal text-white border-charcoal'
        : 'bg-slate-100 text-steel border-slate-300';
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded border ${cls}`}
    >
      {level}
    </span>
  );
}

interface Props {
  avbs: AVBEntry[];
}

export function AVBDirectoryClient({ avbs }: Props) {
  const allRegions = useMemo(
    () => Array.from(new Set(avbs.flatMap((a) => a.regions))).sort(),
    [avbs]
  );

  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return avbs.filter((avb) => {
      if (levelFilter !== 'all' && avb.authorizationLevel !== levelFilter) return false;
      if (regionFilter !== 'all' && !avb.regions.includes(regionFilter))
        return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          avb.name.toLowerCase().includes(q) ||
          avb.specializations.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [avbs, search, levelFilter, regionFilter]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ecosystem', href: '/ecosystem' },
          { label: 'AVB Directory' },
        ]}
        className="mb-8"
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Authorized Validation Body Directory
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          Browse Authorized Validation Bodies accredited to conduct ARA
          evaluations. AVBs are authorized at three levels — Basic, Enhanced,
          and Full — determining the scope of certifications they can issue.
        </p>
      </header>

      <ExampleBanner />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 text-sm border border-border rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
            placeholder:text-slate-400"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-steel"
        >
          <option value="all">All Levels</option>
          {allLevels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-steel"
        >
          <option value="all">All Regions</option>
          {allRegions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* AVB Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((avb) => (
          <div
            key={avb.id}
            className="relative overflow-hidden border border-border rounded-lg p-6 hover:border-border-dark transition-colors"
          >
            {!avb.name.toLowerCase().includes('xlogix') && <ExampleWatermark />}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-base font-semibold text-charcoal">
                {avb.name}
              </h3>
              <LevelBadge level={avb.authorizationLevel} />
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Regions
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {avb.regions.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center px-2 py-0.5 text-xs bg-slate-100 text-steel rounded"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Specializations
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {avb.specializations.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center px-2 py-0.5 text-xs bg-blue-50 text-navy border border-blue-100 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Status
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${
                    avb.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}
                >
                  {avb.status}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-2 py-12 text-center text-muted text-sm">
            No AVBs match your search criteria.
          </div>
        )}
      </div>

      {/* Link to AVB Program */}
      <div className="mt-12 border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          About the AVB Program
        </h2>
        <Link
          href="/avb"
          className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors max-w-md"
        >
          <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
            AVB Program Details
          </h3>
          <p className="text-xs text-muted">
            Authorization levels, competency requirements, independence
            standards, and the accreditation process for becoming an AVB.
          </p>
        </Link>
      </div>
    </div>
  );
}
