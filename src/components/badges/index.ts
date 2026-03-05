/**
 * ARA Certification Mark — Badge Component Library
 *
 * Components:
 *   AraBadge         — Primary trust seal (digital, interactive)
 *   AraBadgeCompact  — Inline badge for tables/lists
 *   AraBadgeEmbed    — Horizontal card for third-party embedding
 *   AraBadgePrint    — Static badge for print/PDF
 *   AraBadgeHero     — Elevated showpiece for hero sections
 *   AraBadgeQR       — Badge with QR verification code
 *
 * Legacy:
 *   CertificationBadge — v1.0 badge (retained for backward compatibility)
 */

// v2 badge system
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
  SignalRingConfig,
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
  SIGNAL_CONFIG,
  LEVEL_CONFIG,
  CLASS_CONFIG,
  ARA_WORDMARK_PATH,
  ARA_WORDMARK_ORIGIN,
  describeArc,
  decodeBadgeToken,
  encodeBadgeToken,
  registryEntryToBadgeData,
} from './types';

// Legacy badge (v1.0 — retained for backward compatibility)
export { CertificationBadge } from './CertificationBadge';
export { AssuranceClassBadge } from './AssuranceClassBadge';
export { CertTypeBadge } from './CertTypeBadge';
export { SystemProfileBadge } from './SystemProfileBadge';
