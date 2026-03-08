'use client';

import { useState, useCallback, useMemo } from 'react';
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
 * Preset scores per class (trigger each class's determination rules)
 * --------------------------------------------------------------------------- */

const classPresets: Record<AssuranceClass, number[]> = {
  A: [2, 2, 1, 2, 2, 2, 3],
  B: [3, 4, 2, 3, 4, 3, 4],
  C: [4, 5, 3, 4, 4, 4, 5],
};

/* ---------------------------------------------------------------------------
 * Class determination logic (mirrors the official rules)
 * --------------------------------------------------------------------------- */

interface ClassResult {
  class: AssuranceClass;
  rule: string;
  explanation: string;
}

function determineClass(scores: number[]): ClassResult {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const maxScore = Math.max(...scores);
  const factorsAt4Plus = scores.filter((s) => s >= 4).length;
  const factorsAt5 = scores.filter((s) => s >= 5);

  // Rule 1: Any factor at 5 → minimum Class C
  if (maxScore >= 5) {
    const names = factorsAt5.length > 0
      ? scores.map((s, i) => s >= 5 ? factorMeta[i].name : null).filter(Boolean)
      : [];
    return {
      class: 'C',
      rule: `Factor${names.length > 1 ? 's' : ''} at score 5 → minimum Class C`,
      explanation: `${names.join(' and ')} score${names.length === 1 ? 's' : ''} 5, which automatically escalates to minimum Class C. Class C requires continuous 24/7 CAPO oversight with real-time alerting.`,
    };
  }

  // Rule 2: Average > 3.5 → minimum Class B
  if (avg > 3.5) {
    return {
      class: 'B',
      rule: `Average score ${avg.toFixed(2)} > 3.5 → minimum Class B`,
      explanation: `The average factor score of ${avg.toFixed(2)} exceeds the 3.5 threshold, triggering minimum Class B. Class B requires monthly CAPO check-ins and monitored reassessment.`,
    };
  }

  // Rule 3: 3+ factors at 4+ → minimum Class B
  if (factorsAt4Plus >= 3) {
    const names = scores.map((s, i) => s >= 4 ? factorMeta[i].name : null).filter(Boolean);
    return {
      class: 'B',
      rule: `${factorsAt4Plus} factors score 4+ → minimum Class B`,
      explanation: `${names.join(', ')} all score 4 or above (${factorsAt4Plus} factors total), triggering the "3+ factors at 4+" rule for minimum Class B.`,
    };
  }

  // Otherwise → Class A
  return {
    class: 'A',
    rule: 'No escalation rules triggered — eligible for Class A',
    explanation: `No factor scores 5, the average of ${avg.toFixed(2)} is at or below 3.5, and fewer than 3 factors score 4+. The system is eligible for Class A with periodic reassessment.`,
  };
}

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
  A: 'Class A',
  B: 'Class B',
  C: 'Class C',
};

/* ---------------------------------------------------------------------------
 * Component
 * --------------------------------------------------------------------------- */

export function RiskProfileDemo({ className }: { className?: string }) {
  const [scores, setScores] = useState<number[]>([...classPresets.B]);
  const [selectedPreset, setSelectedPreset] = useState<AssuranceClass | null>('B');

  // Auto-determine class from current scores
  const result = useMemo(() => determineClass(scores), [scores]);
  const determinedClass = result.class;

  const factors = useMemo(() =>
    factorMeta.map((f, i) => ({ ...f, score: scores[i] })),
    [scores],
  );

  const avgScore = useMemo(
    () => (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2),
    [scores],
  );
  const maxFactor = useMemo(() => Math.max(...scores), [scores]);

  // Check if current scores match any preset
  const matchesPreset = useCallback((cls: AssuranceClass) => {
    return classPresets[cls].every((s, i) => s === scores[i]);
  }, [scores]);

  const handlePresetClick = useCallback((cls: AssuranceClass) => {
    setScores([...classPresets[cls]]);
    setSelectedPreset(cls);
  }, []);

  const handleScoreChange = useCallback((factorIndex: number, newScore: number) => {
    setScores((prev) => {
      const next = [...prev];
      next[factorIndex] = newScore;
      return next;
    });
    // Clear preset indicator since user is customizing
    setSelectedPreset(null);
  }, []);

  const handleReset = useCallback(() => {
    handlePresetClick('B');
  }, [handlePresetClick]);

  const isCustom = selectedPreset === null && !(['A', 'B', 'C'] as AssuranceClass[]).some(matchesPreset);

  return (
    <div className={className}>
      {/* Preset tabs + custom indicator */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className="text-xs font-medium text-muted mr-1 uppercase tracking-wider">Presets:</span>
        {(['A', 'B', 'C'] as AssuranceClass[]).map((cls) => {
          const isActive = matchesPreset(cls);
          const styles = tabStyles[cls];
          return (
            <button
              key={cls}
              onClick={() => handlePresetClick(cls)}
              className={`
                px-3 py-1.5 rounded-lg border font-medium text-sm transition-all duration-200
                ${isActive ? styles.active : styles.inactive}
              `}
              aria-pressed={isActive}
            >
              {classLabels[cls]}
            </button>
          );
        })}
        {isCustom && (
          <span className="ml-2 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg border border-dashed border-slate-300 text-xs font-medium text-steel bg-white">
              Custom
            </span>
            <button
              onClick={handleReset}
              className="text-xs text-muted hover:text-charcoal transition-colors underline"
            >
              Reset
            </button>
          </span>
        )}
      </div>

      {/* Spider + explanation grid */}
      <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
        <RiskSpider
          factors={factors}
          determinedClass={determinedClass}
          onScoreChange={handleScoreChange}
          className="max-w-md"
        />

        <div className="space-y-5">
          {/* Determined class */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-steel">
              Determined Class:
            </span>
            <AssuranceClassBadge assuranceClass={determinedClass} />
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
            <span className="font-medium text-charcoal">{result.rule}</span>
          </div>

          {/* Explanation */}
          <p className="text-sm text-steel leading-relaxed">
            {result.explanation}
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
