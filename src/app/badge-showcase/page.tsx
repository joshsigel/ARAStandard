'use client';

import React, { useState } from 'react';
import { AraBadge } from '@/components/badges/AraBadge';
import { AraBadgeCompact } from '@/components/badges/AraBadgeCompact';
import { AraBadgeEmbed } from '@/components/badges/AraBadgeEmbed';
import { AraBadgePrint } from '@/components/badges/AraBadgePrint';
import { AraBadgeHero } from '@/components/badges/AraBadgeHero';
import { AraBadgeQR } from '@/components/badges/AraBadgeQR';
import type { BadgeData, BadgeStatus, BadgeAssuranceClass } from '@/components/badges/types';
import { BADGE_STATUS_MAP, LEVEL_CONFIG, CLASS_CONFIG } from '@/components/badges/types';

// ─── Sample Badge Data ─────────────────────────────────────────────────────

const SAMPLE_BADGE: BadgeData = {
  certId: 'ARA-2026-00421',
  orgName: 'Meridian AI Systems',
  systemName: 'Meridian AutoPilot v3',
  level: 2,
  assuranceClass: 'B',
  standardVersion: '1.1',
  status: 'monitoring_connected',
  lastCheckIn: new Date(Date.now() - 300000).toISOString(),
  nextReassessment: '2027-01-15',
  verificationUrl: '/registry/verify/ARA-2026-00421',
};

const ALL_STATUSES: BadgeStatus[] = [
  'active',
  'monitoring_connected',
  'monitoring_delayed',
  'revalidation_required',
  'suspended',
  'expired',
];

const ALL_LEVELS: (1 | 2 | 3)[] = [1, 2, 3];
const ALL_CLASSES: BadgeAssuranceClass[] = ['A', 'B', 'C'];

export default function BadgeShowcasePage() {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(2);
  const [activeClass, setActiveClass] = useState<BadgeAssuranceClass>('B');
  const [activeStatus, setActiveStatus] = useState<BadgeStatus>('monitoring_connected');

  const interactiveBadge: BadgeData = {
    ...SAMPLE_BADGE,
    level: activeLevel,
    assuranceClass: activeClass,
    status: activeStatus,
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-12">
        <div className="version-badge mb-3">BADGE SYSTEM v2</div>
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal">
          ARA Living Certification Badge
        </h1>
        <p className="text-muted mt-2 max-w-2xl">
          A holographic, animated badge system that communicates certification identity,
          operational monitoring state, and verification capability. Each badge is a
          living trust signal.
        </p>
      </div>

      {/* ═══ Section 1: Interactive Playground ═══ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-charcoal mb-6">Interactive Playground</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Badge preview */}
          <div className="flex items-center justify-center p-12 bg-slate-50 rounded-xl border border-border min-h-[400px]">
            <AraBadge
              data={interactiveBadge}
              size={300}
              interactive
              onVerify={() => alert(`Verify: ${interactiveBadge.certId}\n\nThis would open the verification modal in production.`)}
            />
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Level selector */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Certification Level
              </label>
              <div className="flex gap-2">
                {ALL_LEVELS.map((l) => (
                  <button
                    key={l}
                    onClick={() => setActiveLevel(l)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors ${
                      activeLevel === l
                        ? 'bg-charcoal text-white border-charcoal'
                        : 'bg-white text-slate-600 border-border hover:border-slate-400'
                    }`}
                  >
                    Level {l}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                {LEVEL_CONFIG[activeLevel].name} — {LEVEL_CONFIG[activeLevel].ringCount} ring{LEVEL_CONFIG[activeLevel].ringCount > 1 ? 's' : ''}
              </p>
            </div>

            {/* Class selector */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Assurance Class
              </label>
              <div className="flex gap-2">
                {ALL_CLASSES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveClass(c)}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors ${
                      activeClass === c
                        ? 'bg-navy text-white border-navy'
                        : 'bg-white text-slate-600 border-border hover:border-slate-400'
                    }`}
                  >
                    Class {c}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                {CLASS_CONFIG[activeClass].name} — {CLASS_CONFIG[activeClass].ringStyle} ring, {CLASS_CONFIG[activeClass].cadence} cadence
              </p>
            </div>

            {/* Status selector */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
                Operational Status
              </label>
              <div className="space-y-1.5">
                {ALL_STATUSES.map((s) => {
                  const state = BADGE_STATUS_MAP[s];
                  return (
                    <button
                      key={s}
                      onClick={() => setActiveStatus(s)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-lg border transition-colors ${
                        activeStatus === s
                          ? 'bg-slate-100 border-slate-300 font-semibold'
                          : 'bg-white border-border hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: state.muted ? '#94A3B8' : state.glowColor.replace(/[^#\w]/g, '').length > 0 ? undefined : '#16A34A' }}
                      />
                      <span className="flex-1">{state.label}</span>
                      <span className="text-xs text-slate-400">{state.indicator}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Section 2: All Status States ═══ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-charcoal mb-2">Status States</h2>
        <p className="text-sm text-muted mb-6">
          Each operational status has a distinct animation and visual indicator.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {ALL_STATUSES.map((s) => {
            const state = BADGE_STATUS_MAP[s];
            return (
              <div key={s} className="flex flex-col items-center text-center">
                <AraBadge
                  data={{ ...SAMPLE_BADGE, status: s }}
                  size={140}
                  interactive={false}
                />
                <div className="mt-3">
                  <div className="text-xs font-semibold text-charcoal">{state.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{state.indicator}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ Section 3: Level × Class Matrix ═══ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-charcoal mb-2">Level × Class Matrix</h2>
        <p className="text-sm text-muted mb-6">
          9 certification designations. Level controls ring count; Class controls ring geometry.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-xs font-semibold text-slate-500 text-left" />
                {ALL_CLASSES.map((c) => (
                  <th key={c} className="p-3 text-xs font-semibold text-slate-500 text-center">
                    Class {c}<br />
                    <span className="font-normal text-slate-400">{CLASS_CONFIG[c].name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_LEVELS.map((l) => (
                <tr key={l} className="border-t border-border">
                  <td className="p-3 text-xs font-semibold text-slate-500 align-middle">
                    Level {l}<br />
                    <span className="font-normal text-slate-400">{LEVEL_CONFIG[l].name}</span>
                  </td>
                  {ALL_CLASSES.map((c) => (
                    <td key={c} className="p-4 text-center align-middle">
                      <div className="flex justify-center">
                        <AraBadge
                          data={{
                            ...SAMPLE_BADGE,
                            level: l,
                            assuranceClass: c,
                            status: 'active',
                            certId: `ARA-2026-${String(l * 100 + (c.charCodeAt(0) - 64)).padStart(5, '0')}`,
                          }}
                          size={120}
                          interactive={false}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══ Section 4: Component Variants ═══ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-charcoal mb-6">Component Variants</h2>

        <div className="space-y-12">
          {/* Primary Badge */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              &lt;AraBadge /&gt; — Primary Living Badge
            </h3>
            <div className="flex items-center justify-center p-8 bg-slate-50 rounded-xl border border-border">
              <AraBadge
                data={SAMPLE_BADGE}
                size={260}
                interactive
                onVerify={() => alert('Verify clicked')}
              />
            </div>
          </div>

          {/* Compact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              &lt;AraBadgeCompact /&gt; — Inline Badge
            </h3>
            <div className="flex flex-wrap gap-3 p-6 bg-slate-50 rounded-xl border border-border">
              {ALL_STATUSES.map((s) => (
                <AraBadgeCompact
                  key={s}
                  data={{ ...SAMPLE_BADGE, status: s }}
                  onClick={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Embed */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              &lt;AraBadgeEmbed /&gt; — Embeddable Website Badge
            </h3>
            <div className="flex flex-col gap-4 p-6 bg-slate-50 rounded-xl border border-border max-w-md">
              <AraBadgeEmbed data={SAMPLE_BADGE} />
              <AraBadgeEmbed
                data={{ ...SAMPLE_BADGE, level: 3, assuranceClass: 'C', status: 'monitoring_connected' }}
              />
            </div>
          </div>

          {/* Print */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              &lt;AraBadgePrint /&gt; — Print / Static Badge
            </h3>
            <div className="flex gap-6 items-center justify-center p-8 bg-white rounded-xl border border-border">
              {ALL_LEVELS.map((l) => (
                <AraBadgePrint
                  key={l}
                  data={{ ...SAMPLE_BADGE, level: l }}
                  size={160}
                />
              ))}
            </div>
          </div>

          {/* Hero */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              &lt;AraBadgeHero /&gt; — Hero Showpiece
            </h3>
            <div className="flex items-center justify-center p-12 bg-slate-50 rounded-xl border border-border">
              <AraBadgeHero data={SAMPLE_BADGE} />
            </div>
          </div>

          {/* QR */}
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              &lt;AraBadgeQR /&gt; — QR Verification Badge
            </h3>
            <div className="flex gap-6 items-start justify-center p-8 bg-slate-50 rounded-xl border border-border">
              <AraBadgeQR data={SAMPLE_BADGE} size={200} />
              <AraBadgeQR
                data={{ ...SAMPLE_BADGE, level: 3, assuranceClass: 'C' }}
                size={200}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Section 5: Assurance Class Geometry ═══ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-charcoal mb-2">Assurance Class Visual Grammar</h2>
        <p className="text-sm text-muted mb-6">
          Class A = dashed ring with tick marks. Class B = segmented ring. Class C = continuous ring.
        </p>
        <div className="grid grid-cols-3 gap-8">
          {ALL_CLASSES.map((c) => (
            <div key={c} className="text-center">
              <div className="flex justify-center mb-3">
                <AraBadge
                  data={{
                    ...SAMPLE_BADGE,
                    assuranceClass: c,
                    level: 2,
                    status: 'active',
                  }}
                  size={180}
                  interactive={false}
                />
              </div>
              <div className="text-sm font-semibold text-charcoal">
                Class {c} — {CLASS_CONFIG[c].name}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {CLASS_CONFIG[c].ringStyle} ring · {CLASS_CONFIG[c].tickCount > 0 ? `${CLASS_CONFIG[c].tickCount} tick marks` : 'no tick marks'} · {CLASS_CONFIG[c].cadence}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Section 6: API Stubs ═══ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-charcoal mb-2">Tokenization API (Part 2 Stubs)</h2>
        <p className="text-sm text-muted mb-6">
          These endpoints return mock data. Full cryptographic verification will be
          implemented in Part 2.
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-lg border border-border">
            <code className="text-sm font-mono text-charcoal">
              GET /api/badge/preview?certId=ARA-2026-00289
            </code>
            <p className="text-xs text-slate-400 mt-1">
              Returns BadgeData for a given certification ID (mock).
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-border">
            <code className="text-sm font-mono text-charcoal">
              POST /api/badge/verify
            </code>
            <p className="text-xs text-slate-400 mt-1">
              Verifies a badge token or cert ID (mock). Body: {'{'} token?: string, certId?: string {'}'}.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Section 7: Data Model ═══ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-charcoal mb-2">BadgeData Model</h2>
        <p className="text-sm text-muted mb-4">
          The canonical data interface used by all badge variants.
        </p>
        <pre className="bg-charcoal text-slate-200 p-5 rounded-lg text-sm overflow-x-auto font-mono leading-relaxed">
{`interface BadgeData {
  certId: string;
  orgName?: string;
  systemName?: string;
  level: 1 | 2 | 3;
  assuranceClass: 'A' | 'B' | 'C';
  standardVersion: string;
  status: BadgeStatus;
  lastCheckIn?: string;
  nextReassessment?: string;
  verificationUrl?: string;
}

type BadgeStatus =
  | 'active'
  | 'monitoring_connected'
  | 'monitoring_delayed'
  | 'revalidation_required'
  | 'suspended'
  | 'expired';`}
        </pre>
      </section>
    </div>
  );
}
