'use client';

import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { InsurerEntry } from '@/types';

interface Props {
  insurers: InsurerEntry[];
}

export function InsurerDirectoryClient({ insurers }: Props) {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Ecosystem', href: '/ecosystem' },
          { label: 'Insurance Partners' },
        ]}
        className="mb-8"
      />

      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          Recognized Insurer Partners
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          Insurance providers who accept ARA certification data for autonomous
          system underwriting and risk assessment. Recognized Insurer Partners
          receive structured certification data through the ARAF data exchange,
          enabling more informed underwriting decisions for technology liability,
          operational risk, and errors &amp; omissions coverage.
        </p>
      </header>

      {/* Insurer Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {insurers.map((insurer) => (
          <div
            key={insurer.id}
            className="border border-border rounded-lg p-6 hover:border-border-dark transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-base font-semibold text-charcoal">
                {insurer.name}
              </h3>
              <span className="flex-shrink-0 inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-slate-100 text-steel border border-slate-300 rounded">
                Since {insurer.araPartnerSince}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Coverage Types
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {insurer.coverageTypes.map((ct) => (
                    <span
                      key={ct}
                      className="inline-flex items-center px-2 py-0.5 text-xs bg-blue-50 text-navy border border-blue-100 rounded"
                    >
                      {ct}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted">
                  Regions
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {insurer.regions.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center px-2 py-0.5 text-xs bg-slate-100 text-steel rounded"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insurance & ARA Certification Info */}
      <section className="border border-border rounded-lg p-6 bg-slate-50 mb-12">
        <h2 className="text-lg font-semibold text-charcoal mb-3">
          How ARA Certification Benefits Insurance Applications
        </h2>
        <div className="space-y-3 text-sm text-steel leading-relaxed max-w-3xl">
          <p>
            ARA certification provides insurers with standardized, independently
            verified data about the reliability and risk profile of autonomous
            systems. This structured data can support more accurate underwriting
            by replacing subjective risk assessments with objective evaluation
            outcomes.
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li>
              <strong className="text-charcoal">Standardized risk profiles:</strong>{' '}
              Risk classification data mapped to Assurance Classes (A, B, C)
              provides clear risk stratification.
            </li>
            <li>
              <strong className="text-charcoal">Continuous compliance data:</strong>{' '}
              Class B and C certifications include ongoing monitoring data,
              giving insurers real-time visibility into system reliability.
            </li>
            <li>
              <strong className="text-charcoal">Domain-level evaluation results:</strong>{' '}
              Granular assessment data across 15 evaluation domains enables
              targeted underwriting decisions.
            </li>
            <li>
              <strong className="text-charcoal">Independent verification:</strong>{' '}
              All evaluations are conducted by accredited AVBs, ensuring
              independence and consistency.
            </li>
          </ul>
        </div>
      </section>

      {/* Related Links */}
      <div className="border-t border-border pt-10">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Related Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <Link
            href="/certification"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Certification Framework
            </h3>
            <p className="text-xs text-muted">
              Assurance Classes, certification types, and the evaluation
              lifecycle.
            </p>
          </Link>
          <Link
            href="/certification/risk-classification"
            className="group block border border-border rounded-lg p-5 hover:border-border-dark hover:bg-slate-50 transition-colors"
          >
            <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-1">
              Risk Classification
            </h3>
            <p className="text-xs text-muted">
              How autonomous systems are classified into risk tiers for
              evaluation and monitoring.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
