'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ExampleWatermark } from '@/components/ui/ExampleWatermark';
import { AssuranceClassBadge } from '@/components/badges/AssuranceClassBadge';
import type { AssuranceClass, CAPOEntry } from '@/types';

const allClasses: AssuranceClass[] = ['B', 'C'];

interface Props {
  capos: CAPOEntry[];
}

export function CAPODirectoryClient({ capos }: Props) {
  const allRegions = useMemo(
    () => Array.from(new Set(capos.flatMap((c) => c.regions))).sort(),
    [capos]
  );

  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return capos.filter((capo) => {
      if (
        classFilter !== 'all' &&
        !capo.classesServed.includes(classFilter as AssuranceClass)
      )
        return false;
      if (regionFilter !== 'all' && !capo.regions.includes(regionFilter))
        return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          capo.name.toLowerCase().includes(q) ||
          capo.capabilities.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [capos, search, classFilter, regionFilter]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ecosystem', href: '/ecosystem' },
          { label: 'CAPO Directory' },
        ]}
        className="mb-8"
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Certified Assurance Platform Operator Directory
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          CAPOs provide continuous monitoring infrastructure and assurance
          services for Class B (Monitored) and Class C (Continuous) certified
          systems. Each CAPO is certified by ARAF and must meet defined SLA
          requirements for uptime, telemetry ingestion, and reporting.
        </p>
      </header>


      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Search by name or capability..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 max-w-md px-4 py-2 text-sm border border-border rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
            placeholder:text-slate-400"
        />
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-steel"
        >
          <option value="all">All Classes</option>
          {allClasses.map((c) => (
            <option key={c} value={c}>
              Class {c}
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

      {/* CAPO Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((capo) => (
          <div
            key={capo.id}
            className="relative overflow-hidden border border-border rounded-lg p-6 hover:border-border-dark transition-colors"
          >
            {!capo.name.toLowerCase().includes('xlogix') && <ExampleWatermark />}
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-base font-semibold text-charcoal">
                {capo.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${
                  capo.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {capo.status}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Classes Served
                </span>
                <div className="flex gap-1.5 mt-1">
                  {capo.classesServed.map((c) => (
                    <AssuranceClassBadge
                      key={c}
                      assuranceClass={c}
                      size="sm"
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Regions
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {capo.regions.map((r) => (
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
                  Capabilities
                </span>
                <p className="text-sm text-steel leading-relaxed mt-1">
                  {capo.capabilities}
                </p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted text-sm">
            No CAPOs match your search criteria.
          </div>
        )}
      </div>

      {/* Link to Monitoring */}
      <div className="mt-12 border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Continuous Assurance Monitoring
        </h2>
        <Link
          href="/monitoring"
          className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors max-w-md"
        >
          <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
            Monitoring Requirements
          </h3>
          <p className="text-xs text-muted">
            Learn about Assurance Class monitoring obligations, CAPO SLAs,
            telemetry architecture, and operational states.
          </p>
        </Link>
      </div>
    </div>
  );
}
