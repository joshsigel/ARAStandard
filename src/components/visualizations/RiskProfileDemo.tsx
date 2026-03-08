'use client';

import { useState } from 'react';
import type { AssuranceClass } from '@/types';
import { RiskSpider } from './RiskSpider';
import { AssuranceClassBadge } from '@/components/badges/AssuranceClassBadge';

/* ---------------------------------------------------------------------------
 * Factor descriptions (shared across all classes)
 * --------------------------------------------------------------------------- */

const factorMeta = [
  { id: 1, name: 'Autonomy Scope', description: 'Breadth of autonomous decision-making. Narrow task automation (1) vs. open-ended autonomous agents (5).' },
  { id: 2, name: 'Consequence Severity', description: 'Potential impact of system failure. Minor inconvenience (1) vs. loss of life or critical infrastructure (5).' },
  { id: 3, name: 'Decision Reversibility', description: 'Whether autonomous actions can be undone. Easily reversible suggestions (1) vs. irreversible physical actions (5).' },
  { id: 4, name: 'Operational Environment', description: 'Complexity and unpredictability of deployment context. Controlled lab (1) vs. open-world with adversarial actors (5).' },
  { id: 5, name: 'Data Sensitivity', description: 'Classification of data accessed and processed. Public data only (1) vs. classified/PII/financial data (5).' },
  { id: 6, name: 'Scale of Impact', description: 'Number of people or systems affected. Single user (1) vs. population-scale (5).' },
  { id: 7, name: 'Regulatory Exposure', description: 'Degree of regulatory oversight applicable. Unregulated domain (1) vs. heavily regulated (5).' },
];

/* ---------------------------------------------------------------------------
 * Sample scores per class (trigger each class's determination rules)
 * --------------------------------------------------------------------------- */

const classProfiles: Record<AssuranceClass, {
  scores: number[];
  explanation: string;
  ruleTriggered: string;
}> = {
  A: {
    scores: [2, 2, 1, 2, 2, 2, 3],
    explanation:
      'This low-risk profile has no factor scoring above 3 and an average of 2.0. No escalation rules are triggered, making the system eligible for Class A with periodic reassessment.',
    ruleTriggered: 'No escalation rules triggered — eligible for Class A',
  },
  B: {
    scores: [3, 4, 2, 3, 4, 3, 4],
    explanation:
      'This moderate-risk profile scores 4 on Consequence Severity, Data Sensitivity, and Regulatory Exposure, triggering the "3+ factors at 4+" rule for minimum Class B. The average score of 3.29 alone would not mandate Class B, but the factor concentration rule applies.',
    ruleTriggered: '3+ factors score 4+ → minimum Class B',
  },
  C: {
    scores: [4, 5, 3, 4, 4, 4, 5],
    explanation:
      'This high-risk profile scores 5 on both Consequence Severity and Regulatory Exposure. Any single factor at 5 automatically escalates to minimum Class C, requiring continuous 24/7 CAPO oversight with real-time alerting.',
    ruleTriggered: 'Factor(s) at score 5 → minimum Class C',
  },
};

/* ---------------------------------------------------------------------------
 * Tab styling per class
 * --------------------------------------------------------------------------- */

const tabStyles: Record<AssuranceClass, {
  active: string;
  inactive: string;
}> = {
  A: {
    active: 'bg-slate-100 text-charcoal border-slate-300',
    inactive: 'bg-white text-steel border-border hover:border-slate-300 hover:bg-slate-50',
  },
  B: {
    active: 'bg-charcoal text-white border-charcoal',
    inactive: 'bg-white text-steel border-border hover:border-charcoal/40 hover:bg-slate-50',
  },
  C: {
    active: 'bg-navy text-white border-navy',
    inactive: 'bg-white text-steel border-border hover:border-navy/40 hover:bg-slate-50',
  },
};

const classLabels: Record<AssuranceClass, string> = {
  A: 'Class A — Periodic',
  B: 'Class B — Monitored',
  C: 'Class C — Continuous',
};

/* ---------------------------------------------------------------------------
 * Component
 * --------------------------------------------------------------------------- */

export function RiskProfileDemo({ className }: { className?: string }) {
  const [activeClass, setActiveClass] = useState<AssuranceClass>('B');

  const profile = classProfiles[activeClass];
  const factors = factorMeta.map((f, i) => ({
    ...f,
    score: profile.scores[i],
  }));

  const avgScore = (profile.scores.reduce((a, b) => a + b, 0) / profile.scores.length).toFixed(2);
  const maxFactor = Math.max(...profile.scores);

  return (
    <div className={className}>
      {/* Class selector tabs */}
      <div className="flex gap-2 mb-8">
        {(['A', 'B', 'C'] as AssuranceClass[]).map((cls) => {
          const isActive = activeClass === cls;
          const styles = tabStyles[cls];
          return (
            <button
              key={cls}
              onClick={() => setActiveClass(cls)}
              className={`
                px-4 py-2 rounded-lg border font-medium text-sm transition-all duration-200
                ${isActive ? styles.active : styles.inactive}
              `}
              aria-pressed={isActive}
            >
              {classLabels[cls]}
            </button>
          );
        })}
      </div>

      {/* Spider + explanation grid */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
        <RiskSpider
          factors={factors}
          determinedClass={activeClass}
          className="max-w-md"
        />

        <div className="space-y-5">
          {/* Determined class */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-steel">
              Determined Class:
            </span>
            <AssuranceClassBadge assuranceClass={activeClass} />
          </div>

          {/* Score summary */}
          <div className="flex gap-4">
            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-border">
              <div className="text-xs text-muted mb-0.5">Average Score</div>
              <div className="font-mono text-lg font-bold text-charcoal">{avgScore}</div>
            </div>
            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-border">
              <div className="text-xs text-muted mb-0.5">Highest Factor</div>
              <div className="font-mono text-lg font-bold text-charcoal">{maxFactor}/5</div>
            </div>
          </div>

          {/* Rule triggered */}
          <div className="flex items-start gap-2 text-sm">
            <svg className="w-4 h-4 mt-0.5 shrink-0 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            <span className="font-medium text-charcoal">{profile.ruleTriggered}</span>
          </div>

          {/* Explanation */}
          <p className="text-sm text-steel leading-relaxed">
            {profile.explanation}
          </p>

          {/* Factor score breakdown */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="px-3 py-2 bg-slate-50 border-b border-border">
              <span className="text-xs font-semibold text-charcoal uppercase tracking-wider">
                Factor Scores
              </span>
            </div>
            <div className="divide-y divide-border">
              {factors.map((f) => (
                <div key={f.id} className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-steel">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((v) => (
                        <div
                          key={v}
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            v <= f.score
                              ? f.score >= 5 ? 'bg-navy' : f.score >= 4 ? 'bg-charcoal' : 'bg-slate-400'
                              : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs font-bold text-charcoal w-4 text-right">
                      {f.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
