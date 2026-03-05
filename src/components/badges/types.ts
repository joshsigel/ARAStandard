/**
 * ARA Living Certification Badge — Type Definitions
 *
 * This file defines the canonical badge data model used by all badge variants.
 * The same BadgeData object will later be embedded into tokenized badges (Part 2).
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

// ─── Visual State Mapping ──────────────────────────────────────────────────

export interface BadgeVisualState {
  /** CSS animation class name */
  animation: string;
  /** Outer ring color token */
  ringColor: string;
  /** Pulse/glow color token */
  glowColor: string;
  /** Pulse speed in seconds (0 = no pulse) */
  pulseSpeed: number;
  /** Human-readable status label */
  label: string;
  /** Short description for accessibility */
  description: string;
  /** Whether the badge should appear muted/desaturated */
  muted: boolean;
  /** Status indicator icon key */
  indicator: 'pulse' | 'heartbeat' | 'intermittent' | 'alert' | 'static' | 'off';
}

export const BADGE_STATUS_MAP: Record<BadgeStatus, BadgeVisualState> = {
  active: {
    animation: 'ara-badge-active',
    ringColor: 'var(--badge-ring-active)',
    glowColor: 'rgba(22, 163, 74, 0.2)',
    pulseSpeed: 4,
    label: 'Active',
    description: 'Certification is active and in good standing',
    muted: false,
    indicator: 'pulse',
  },
  monitoring_connected: {
    animation: 'ara-badge-heartbeat',
    ringColor: 'var(--badge-ring-monitoring)',
    glowColor: 'rgba(59, 130, 246, 0.15)',
    pulseSpeed: 3,
    label: 'Monitoring Connected',
    description: 'Continuous monitoring telemetry is connected and reporting',
    muted: false,
    indicator: 'heartbeat',
  },
  monitoring_delayed: {
    animation: 'ara-badge-intermittent',
    ringColor: 'var(--badge-ring-delayed)',
    glowColor: 'rgba(217, 119, 6, 0.2)',
    pulseSpeed: 2,
    label: 'Monitoring Delayed',
    description: 'Monitoring telemetry is delayed — check-in overdue',
    muted: false,
    indicator: 'intermittent',
  },
  revalidation_required: {
    animation: 'ara-badge-alert',
    ringColor: 'var(--badge-ring-revalidation)',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    pulseSpeed: 1.5,
    label: 'Revalidation Required',
    description: 'Certification requires revalidation assessment',
    muted: false,
    indicator: 'alert',
  },
  suspended: {
    animation: 'ara-badge-static',
    ringColor: 'var(--badge-ring-suspended)',
    glowColor: 'rgba(220, 38, 38, 0.15)',
    pulseSpeed: 0,
    label: 'Suspended',
    description: 'Certification has been suspended pending review',
    muted: true,
    indicator: 'static',
  },
  expired: {
    animation: 'ara-badge-off',
    ringColor: 'var(--badge-ring-expired)',
    glowColor: 'transparent',
    pulseSpeed: 0,
    label: 'Expired',
    description: 'Certification has expired and is no longer valid',
    muted: true,
    indicator: 'off',
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
