/**
 * ARA Certification Mark — Type Definitions
 *
 * This file defines the canonical badge data model used by all badge variants.
 * The same BadgeData object will later be embedded into tokenized badges (Part 2).
 *
 * Naming convention:
 *   Code:    "Badge"  (AraBadge, BadgeData, .ara-badge-*)
 *   Public:  "ARA Trust Signal"
 *   Formal:  "ARA Certification Mark"
 */

// ─── Badge Status (operational state) ──────────────────────────────────────

export type BadgeStatus =
  | 'active'
  | 'monitoring_connected'
  | 'monitoring_delayed'
  | 'revalidation_required'
  | 'suspended'
  | 'expired';

// ─── Core Badge Data ───────────────────────────────────────────────────────

export type BadgeAssuranceClass = 'A' | 'B' | 'C';

export interface BadgeData {
  certId: string;
  orgName?: string;
  systemName?: string;
  level: 1 | 2 | 3;
  assuranceClass: BadgeAssuranceClass;
  standardVersion: string;
  status: BadgeStatus;
  lastCheckIn?: string;       // ISO datetime
  nextReassessment?: string;  // ISO datetime
  verificationUrl?: string;   // placeholder for Part 2
}

// ─── ARA Traced Wordmark Path ─────────────────────────────────────────────

/**
 * 155-point traced SVG path of the ARA wordmark, extracted from the
 * Adobe Illustrator reference file (ARAbadge.svg).
 *
 * Source origin: (1132.76, 495.52) — use ARA_WORDMARK_ORIGIN for transforms.
 */
export const ARA_WORDMARK_PATH =
  'M1198.36,525.92l-8.33,31.14-25.09-.14-36.38-58.37-4.92-6.96,3.17-1.73c7.03-.32,12.09-.94,17.86-2.32,7.69-3.84,12.16-10.22,11.62-18.78-.74-7.9-6.93-13.51-15.7-16.11l-27.38-.07-.25,32.26.22,69.35-1.82,2.73-36.18.09-12.69-45.87-7.49-26.33-2.38-11.27-1.62-2.56-2.23,1.66-10.3,20.87-8.26,15.74-5.85,12.49-14.27,28.02-5.34,7.48-18.93-.28.53-4.77,9.66-18.35,25.33-50.45c4.93-9.23,9.06-17.76,13.02-26.84l11.44-22.49,15.79-.37,2.77,2.74,18.8,73.4,8.36,24.8.27-100.72,46.19-.05c12.21-.6,23.56,3.83,31.48,12.9,9.28,11.72,9.88,26.98,3.69,41.08-4.22,7.21-10.18,11.6-18.01,14.71l.47,3.19,15.79,24.54c1.69,1.83,3.85,2.68,3.39.54l2.53-7.09,20.92-75.9,3.07-11.08,2.5-2.79,15.11-.07,6.38,11.11,7.69,16.9,12.26,24.86,30.16,60.69,4.28,9.22-19.22.68-4.49-3.94-26.05-52.69-13.77-27.75-1.96-1.82-1.29,2.43-4.93,18.56-9.67,33.75Z';

/** Source-space center of the traced ARA wordmark path. */
export const ARA_WORDMARK_ORIGIN = { cx: 1132.76, cy: 495.52 };

// ─── Signal Ring Configuration ────────────────────────────────────────────

/**
 * Configuration for Layer 3 — the assurance signal ring.
 * This is the ONLY animated layer in the four-layer trust seal.
 */
export interface SignalRingConfig {
  /** Signal ring color */
  color: string;
  /** SVG stroke-dasharray (e.g. "none" for continuous, or dash pattern) */
  dashPattern: string;
  /** Whether the ring breathes (opacity animation) */
  breathing: boolean;
  /** Breathing cycle duration in seconds (0 = no animation) */
  cycleDuration: number;
  /** Opacity range: [min, max] */
  opacityRange: [number, number];
}

export const SIGNAL_CONFIG: Record<BadgeStatus, SignalRingConfig> = {
  active: {
    color: '#3B82F6',
    dashPattern: 'none',
    breathing: true,
    cycleDuration: 8,
    opacityRange: [0.35, 0.75],
  },
  monitoring_connected: {
    color: '#3B82F6',
    dashPattern: 'none',
    breathing: true,
    cycleDuration: 6,
    opacityRange: [0.4, 0.85],
  },
  monitoring_delayed: {
    color: '#D97706',
    dashPattern: '12 6',
    breathing: true,
    cycleDuration: 4,
    opacityRange: [0.3, 0.7],
  },
  revalidation_required: {
    color: '#D97706',
    dashPattern: '40 100',
    breathing: true,
    cycleDuration: 6,
    opacityRange: [0.35, 0.65],
  },
  suspended: {
    color: '#DC2626',
    dashPattern: '8 20',
    breathing: false,
    cycleDuration: 0,
    opacityRange: [0.35, 0.35],
  },
  expired: {
    color: '#94A3B8',
    dashPattern: 'none',
    breathing: false,
    cycleDuration: 0,
    opacityRange: [0.15, 0.15],
  },
};

// ─── Visual State Mapping ──────────────────────────────────────────────────

export interface BadgeVisualState {
  /** Human-readable status label */
  label: string;
  /** Short description for accessibility */
  description: string;
  /** Whether the badge should appear muted/desaturated */
  muted: boolean;
  /** Status dot color (for compact/embed/hero info) */
  dotColor: string;
}

export const BADGE_STATUS_MAP: Record<BadgeStatus, BadgeVisualState> = {
  active: {
    label: 'Active',
    description: 'Certification is active and in good standing',
    muted: false,
    dotColor: '#3B82F6',
  },
  monitoring_connected: {
    label: 'Monitoring Connected',
    description: 'Continuous monitoring telemetry is connected and reporting',
    muted: false,
    dotColor: '#3B82F6',
  },
  monitoring_delayed: {
    label: 'Monitoring Delayed',
    description: 'Monitoring telemetry is delayed — check-in overdue',
    muted: false,
    dotColor: '#D97706',
  },
  revalidation_required: {
    label: 'Revalidation Required',
    description: 'Certification requires revalidation assessment',
    muted: false,
    dotColor: '#D97706',
  },
  suspended: {
    label: 'Suspended',
    description: 'Certification has been suspended pending review',
    muted: true,
    dotColor: '#DC2626',
  },
  expired: {
    label: 'Expired',
    description: 'Certification has expired and is no longer valid',
    muted: true,
    dotColor: '#94A3B8',
  },
};

// ─── Level Visual Grammar ──────────────────────────────────────────────────

export interface LevelVisualConfig {
  name: string;
  shortName: string;
  /** Number of concentric rings to render */
  ringCount: number;
  /** Gradient accent */
  accentGradient: string;
}

export const LEVEL_CONFIG: Record<1 | 2 | 3, LevelVisualConfig> = {
  1: {
    name: 'Foundation',
    shortName: 'L1',
    ringCount: 1,
    accentGradient: 'linear-gradient(135deg, #94A3B8, #64748B)',
  },
  2: {
    name: 'Operational',
    shortName: 'L2',
    ringCount: 2,
    accentGradient: 'linear-gradient(135deg, #475569, #1E293B)',
  },
  3: {
    name: 'Comprehensive',
    shortName: 'L3',
    ringCount: 3,
    accentGradient: 'linear-gradient(135deg, #1A2333, #0F172A)',
  },
};

// ─── Assurance Class Visual Grammar ────────────────────────────────────────

export interface ClassVisualConfig {
  name: string;
  /** Ring style descriptor */
  ringStyle: 'dashed' | 'segmented' | 'continuous';
  /** Number of tick marks on outer ring (Class A = periodic, Class C = none/continuous) */
  tickCount: number;
  /** Monitoring cadence description */
  cadence: string;
}

export const CLASS_CONFIG: Record<BadgeAssuranceClass, ClassVisualConfig> = {
  A: {
    name: 'Standard',
    ringStyle: 'dashed',
    tickCount: 8,
    cadence: 'Annual',
  },
  B: {
    name: 'Enhanced',
    ringStyle: 'segmented',
    tickCount: 16,
    cadence: 'Quarterly',
  },
  C: {
    name: 'Continuous',
    ringStyle: 'continuous',
    tickCount: 0,
    cadence: 'Continuous',
  },
};

// ─── SVG Helpers ──────────────────────────────────────────────────────────

/**
 * Generate an SVG arc path from startAngle to endAngle (degrees, 0=right, CW).
 * Used for text arcs, ring segments, etc.
 */
export function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
): string {
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const x1 = cx + r * Math.cos(startRad);
  const y1 = cy + r * Math.sin(startRad);
  const x2 = cx + r * Math.cos(endRad);
  const y2 = cy + r * Math.sin(endRad);
  const sweep = endAngle - startAngle;
  const largeArc = (sweep > 0 ? sweep : sweep + 360) > 180 ? 1 : 0;
  return `M ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2}`;
}

// ─── Badge Token (Part 2 Stub) ─────────────────────────────────────────────

export type BadgeToken = string;

/** Part 2: Decode a signed badge token into BadgeData. Returns null for now. */
export function decodeBadgeToken(_token: BadgeToken): BadgeData | null {
  // Part 2: JWT / cryptographic token verification
  return null;
}

/** Part 2: Encode BadgeData into a signed token. Returns empty string for now. */
export function encodeBadgeToken(_data: BadgeData): BadgeToken {
  // Part 2: JWT / cryptographic token signing
  return '';
}

// ─── Registry Entry → BadgeData Converter ─────────────────────────────────

/**
 * Convert a RegistryEntry (from Supabase/types) into the canonical BadgeData
 * used by all v2 badge components. This avoids duplicating conversion logic
 * across every page that renders badges from registry data.
 */
export function registryEntryToBadgeData(entry: {
  certificationId: string;
  organization: string;
  systemName: string;
  certificationLevel: string;
  assuranceClass?: string | null;
  versionCertifiedUnder: string;
  certificationStatus: string;
  monitoringStatus?: string;
}): BadgeData {
  // Map CertificationLevel string (L1/L2/L3) to number
  const levelNum = (
    entry.certificationLevel === 'L1' ? 1
    : entry.certificationLevel === 'L2' ? 2
    : 3
  ) as 1 | 2 | 3;

  // Map CertificationStatus to BadgeStatus
  const statusMap: Record<string, BadgeStatus> = {
    'Active': 'active',
    'Active — Assurance Lapsed': 'monitoring_delayed',
    'Under Revalidation': 'revalidation_required',
    'Conditional': 'monitoring_delayed',
    'Suspended': 'suspended',
    'Expired': 'expired',
    'Revoked': 'suspended',
  };
  const badgeStatus: BadgeStatus = statusMap[entry.certificationStatus] ?? 'active';

  // Monitoring status can refine the badge status
  let finalStatus = badgeStatus;
  if (badgeStatus === 'active' && entry.monitoringStatus) {
    if (entry.monitoringStatus === 'Warning') {
      finalStatus = 'monitoring_delayed';
    } else if (entry.monitoringStatus === 'Compliant' && (entry.assuranceClass === 'B' || entry.assuranceClass === 'C')) {
      finalStatus = 'monitoring_connected';
    }
  }

  return {
    certId: entry.certificationId,
    orgName: entry.organization,
    systemName: entry.systemName,
    level: levelNum,
    assuranceClass: (entry.assuranceClass as BadgeAssuranceClass) || 'A',
    standardVersion: entry.versionCertifiedUnder,
    status: finalStatus,
    verificationUrl: `https://ara-standard.vercel.app/registry/verify/${entry.certificationId}`,
  };
}

// ─── Component Props ───────────────────────────────────────────────────────

export interface AraBadgeProps {
  data: BadgeData;
  size?: number;
  className?: string;
  /** Show verification affordance on click */
  onVerify?: () => void;
  /** Show as interactive (clickable with hover effects) */
  interactive?: boolean;
}

export interface AraBadgeCompactProps {
  data: BadgeData;
  className?: string;
  onClick?: () => void;
}

export interface AraBadgeEmbedProps {
  data: BadgeData;
  width?: number;
  className?: string;
}

export interface AraBadgePrintProps {
  data: BadgeData;
  size?: number;
  className?: string;
}

export interface AraBadgeHeroProps {
  data: BadgeData;
  className?: string;
}

export interface AraBadgeQRProps {
  data: BadgeData;
  size?: number;
  className?: string;
}
