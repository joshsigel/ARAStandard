/**
 * ARA Living Certification Badge System
 *
 * Component library for the ARA Dynamic Assurance Mark.
 *
 * Components:
 *   AraBadge         — Primary living badge (digital, interactive)
 *   AraBadgeCompact  — Inline badge for tables/lists
 *   AraBadgeEmbed    — Horizontal card for third-party embedding
 *   AraBadgePrint    — Static badge for print/PDF
 *   AraBadgeHero     — Elevated showpiece for hero sections
 *   AraBadgeQR       — Badge with QR verification code
 *
 * Legacy:
 *   CertificationBadge — v1.0 badge (retained for backward compatibility)
 */

// New v2 badge system
export { AraBadge } from './AraBadge';
export { AraBadgeCompact } from './AraBadgeCompact';
export { AraBadgeEmbed } from './AraBadgeEmbed';
export { AraBadgePrint } from './AraBadgePrint';
export { AraBadgeHero } from './AraBadgeHero';
export { AraBadgeQR } from './AraBadgeQR';

// Types and configuration
export type {
  BadgeData,
  BadgeStatus,
  BadgeAssuranceClass,
  BadgeToken,
  BadgeVisualState,
  LevelVisualConfig,
  ClassVisualConfig,
  AraBadgeProps,
  AraBadgeCompactProps,
  AraBadgeEmbedProps,
  AraBadgePrintProps,
  AraBadgeHeroProps,
  AraBadgeQRProps,
} from './types';

export {
  BADGE_STATUS_MAP,
  LEVEL_CONFIG,
  CLASS_CONFIG,
  decodeBadgeToken,
  encodeBadgeToken,
  registryEntryToBadgeData,
} from './types';

// Legacy badge (v1.0 — retained for backward compatibility)
export { CertificationBadge } from './CertificationBadge';
export { AssuranceClassBadge } from './AssuranceClassBadge';
export { CertTypeBadge } from './CertTypeBadge';
export { SystemProfileBadge } from './SystemProfileBadge';
