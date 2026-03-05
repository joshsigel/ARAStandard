'use client';

import { useState } from 'react';

interface Phase {
  phase: number;
  name: string;
  description: string;
  duration?: string;
  outputs: string[];
  icon: string; // SVG path
}

interface CertificationLifecycleProps {
  activePhase?: number;
  onPhaseClick?: (phase: number) => void;
  className?: string;
}

const defaultPhases: Phase[] = [
  {
    phase: 1,
    name: 'Intake & Scoping',
    description: 'Organization defines system boundaries, selects certification type (deployment/platform), and determines applicable system profile (F/S/A/C).',
    duration: '1–2 weeks',
    outputs: ['System scope definition', 'Profile selection', 'AVB engagement'],
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    phase: 2,
    name: 'Risk Classification',
    description: 'AVB conducts mandatory 7-factor risk assessment to determine Assurance Class (A/B/C). Factors include autonomy level, decision impact, data sensitivity, operational environment, human oversight capacity, reversibility, and scale.',
    duration: '1–2 weeks',
    outputs: ['Risk factor scores', 'Assurance Class determination', 'Rationale documentation'],
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  {
    phase: 3,
    name: 'Evidence Collection',
    description: 'Organization prepares evidence across four categories: Lifecycle Process (LP), Technical Implementation (TI), Operational Performance (OP), and Third-Party (TP). Platform cert inheritance applied where applicable.',
    duration: '2–6 weeks',
    outputs: ['Evidence portfolio', 'Platform cert inheritance claims', 'Gap analysis'],
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  {
    phase: 4,
    name: 'ACR Evaluation',
    description: 'AVB evaluates each applicable ACR using designated methods: Automated Testing (AT), Human Specialist (HS), Expert Interview (EI), or Compliance Mapping (CM). Domain scores calculated.',
    duration: '2–8 weeks',
    outputs: ['ACR evaluation results', 'Domain scores', 'Non-conformance findings'],
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    phase: 5,
    name: 'Adversarial Testing',
    description: 'For L2 and L3 certifications, red team testing validates system behavior under adversarial conditions. Tests probe failure modes, edge cases, and manipulation resistance.',
    duration: '1–3 weeks',
    outputs: ['Red team report', 'Vulnerability findings', 'Remediation actions'],
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    phase: 6,
    name: 'Scoring & Determination',
    description: 'Final certification scores calculated across all domains. Risk-weighted composite score determines pass/fail against level thresholds. Conditional certification possible for minor non-conformances.',
    duration: '1 week',
    outputs: ['Certification scorecard', 'Domain breakdown', 'Conditional items (if any)'],
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    phase: 7,
    name: 'Certification Issuance',
    description: 'Certification designation issued (e.g., L2-B Deployment). Living badge generated with operational state tracking. Registry entry published. CAPO engagement begins for Class B/C.',
    duration: '1 week',
    outputs: ['Certification ID', 'Living badge', 'Registry entry', 'CAPO onboarding (B/C)'],
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    phase: 8,
    name: 'Continuous Monitoring',
    description: 'Post-certification monitoring per Assurance Class. Class A: periodic self-assessment. Class B: monthly CAPO check-ins with telemetry. Class C: 24/7 CAPO oversight with real-time alerting.',
    duration: 'Ongoing',
    outputs: ['Monitoring reports', 'Telemetry dashboards', 'Compliance status'],
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  {
    phase: 9,
    name: 'Renewal & Revalidation',
    description: 'Certification validity based on level (L1: 24mo, L2: 18mo, L3: 12mo). Revalidation triggered by material changes, assurance class lapse, or version updates. Express pathway available for L1 renewals.',
    duration: 'Per schedule',
    outputs: ['Renewal assessment', 'Updated certification', 'Version migration (if needed)'],
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  {
    phase: 10,
    name: 'Ecosystem Participation',
    description: 'Certified organizations participate in the broader ARA ecosystem: insurance partnerships, consortium membership, regulatory equivalence claims, and marketplace listings.',
    duration: 'Ongoing',
    outputs: ['Insurance eligibility', 'Consortium access', 'Regulatory mapping claims'],
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  },
];

export function CertificationLifecycle({
  activePhase,
  onPhaseClick,
  className,
}: CertificationLifecycleProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(activePhase ?? null);

  const togglePhase = (phase: number) => {
    setExpandedPhase(expandedPhase === phase ? null : phase);
    onPhaseClick?.(phase);
  };

  return (
    <div className={className}>
      {/* Horizontal phase indicators */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {defaultPhases.map((phase, i) => (
          <div key={phase.phase} className="flex items-center flex-shrink-0">
            <button
              onClick={() => togglePhase(phase.phase)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                transition-all duration-200
                ${expandedPhase === phase.phase
                  ? 'bg-charcoal text-white scale-110'
                  : activePhase && phase.phase <= activePhase
                    ? 'bg-charcoal text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              aria-label={`Phase ${phase.phase}: ${phase.name}`}
            >
              {phase.phase}
            </button>
            {i < defaultPhases.length - 1 && (
              <div className={`w-4 h-0.5 ${
                activePhase && phase.phase < activePhase ? 'bg-charcoal' : 'bg-slate-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Phase detail cards */}
      <div className="space-y-2">
        {defaultPhases.map((phase) => {
          const isExpanded = expandedPhase === phase.phase;
          const isActive = activePhase === phase.phase;

          return (
            <div
              key={phase.phase}
              className={`border rounded-lg transition-all duration-200
                ${isActive ? 'border-charcoal' : 'border-border'}
                ${isExpanded ? 'shadow-sm' : ''}`}
            >
              <button
                onClick={() => togglePhase(phase.phase)}
                className="w-full flex items-center gap-3 p-4 text-left group"
              >
                {/* Phase number */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  text-xs font-bold ${
                    isActive || isExpanded ? 'bg-charcoal text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {phase.phase}
                </div>

                {/* Icon */}
                <svg
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive || isExpanded ? 'text-charcoal' : 'text-slate-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={phase.icon} />
                </svg>

                {/* Name & duration */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-charcoal">{phase.name}</div>
                </div>

                {phase.duration && (
                  <span className="text-xs text-slate-400 flex-shrink-0">{phase.duration}</span>
                )}

                {/* Expand indicator */}
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4 ml-11 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
                  <p className="text-sm text-steel leading-relaxed mb-3">
                    {phase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.outputs.map((output, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-slate-50 border border-border rounded text-slate-600"
                      >
                        {output}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
