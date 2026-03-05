// ARA Standard v1.1 — Core Type Definitions
// Backward-compatible with v1.0 static data files during migration to Supabase

// ─── Enums & Literal Types ──────────────────────────────────────────────────

export type CertificationLevel = 'L1' | 'L2' | 'L3';

export type AssuranceClass = 'A' | 'B' | 'C';

export type CertificationType = 'deployment' | 'platform';

export type SystemProfileCode = 'F' | 'S' | 'A' | 'C';

export type EvaluationMethod = 'AT' | 'HS' | 'EI' | 'CM' | 'TP' | 'OP';

export type EvidenceCategory = 'LP' | 'TI' | 'OP' | 'TP';

export type ACRClassification = 'Blocking' | 'Conditional';

export type FailureConsequence = 'A' | 'B' | 'C';

export type EvaluationFrequency = 'Continuous' | 'Quarterly' | 'Annual' | 'At-Certification';

export type CertificationStatus =
  | 'Active'
  | 'Active — Assurance Lapsed'
  | 'Under Revalidation'
  | 'Suspended'
  | 'Expired'
  | 'Revoked'
  | 'Conditional';

export type MonitoringStatus = 'Compliant' | 'Warning' | 'Non-Compliant' | 'Pending';

export type SystemCategory = 'Agent' | 'Multi-Agent' | 'Physical' | 'Hybrid';

export type OperationalState =
  | 'active'
  | 'monitoring-active'
  | 'monitoring-delayed'
  | 'revalidation-required'
  | 'suspended'
  | 'expired';

// ─── Domain ─────────────────────────────────────────────────────────────────

export interface Domain {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  acrCount: number;
  riskDimension?: string;
  applicability: {
    L1: boolean;
    L2: boolean;
    L3: boolean;
  };
  riskRationale: string;
  versionIntroduced: string;
  sortOrder?: number;
}

// ─── ACR (Autonomous Control Requirement) ───────────────────────────────────

export interface ACR {
  id: string;
  domainId: number;
  domain: string;
  // v1.0 fields (kept for backward compat with static data files)
  title?: string;
  description?: string;
  evaluationMethod: string;
  classification?: ACRClassification;
  levelApplicability?: {
    L1: boolean;
    L2: boolean;
    L3: boolean;
  };
  riskWeight: number;
  evidenceRequirements?: string[];
  relatedControls?: string[];
  versionIntroduced: string;
  // v1.1 fields (from Supabase)
  requirementStatement?: string;
  evidenceType?: string;
  minCertLevel?: number;
  failureConsequence?: FailureConsequence;
  crossReferences?: string[];
  profileApplicability?: string;
  evidenceSpecification?: string;
  riskDimension?: string;
  frameworkCrosswalkRefs?: string;
  evaluationFrequency?: string;
  l1EvidenceStandard?: string;
  l2L3EvidenceStandard?: string;
  platformCertEligible?: boolean;
}

// ─── Certification Levels ───────────────────────────────────────────────────

export interface CertificationLevelDetail {
  level: CertificationLevel;
  name: string;
  autonomyModel?: string;
  humanRequirement?: string;
  minimumACRs?: number;
  evaluationScope?: string;
  adversarialTesting?: string;
  monitoring?: string;
  reassessment?: string;
  applicableSystems?: string[];
  domainThresholds?: Record<string, number>;
  // v1.1 fields
  evaluationMethods?: string;
  timeline?: string;
  redTeamRequired?: boolean;
  validityMonths?: number;
  applicableProfiles?: SystemProfileCode[];
}

// ─── Assurance Classes (v1.1) ───────────────────────────────────────────────

export interface AssuranceClassDetail {
  class: AssuranceClass;
  name: string;
  monitoringRequirement: string;
  cadence: string;
  lapseWindow: string;
  useCases: string;
  capoRequired: boolean;
}

// ─── System Profiles (v1.1) ─────────────────────────────────────────────────

export interface SystemProfile {
  code: SystemProfileCode;
  name: string;
  acrCount: number;
  targetSystems: string;
  characteristics: string;
}

// ─── Registry Entries ───────────────────────────────────────────────────────

export interface RegistryEntry {
  certificationId: string;
  organization: string;
  systemName: string;
  category: SystemCategory;
  certificationLevel: CertificationLevel;
  versionCertifiedUnder: string;
  issueDate: string;
  expiryDate: string;
  monitoringStatus: MonitoringStatus;
  certificationStatus: CertificationStatus;
  scopeStatement: string;
  industry: string;
  revocationHistory: RevocationEvent[];
  // v1.1 fields
  certificationType?: CertificationType;
  assuranceClass?: AssuranceClass | null;
  capoId?: string | null;
  platformCertId?: string | null;
  insuranceStatus?: string | null;
}

export interface RevocationEvent {
  date: string;
  action: 'Suspended' | 'Revoked' | 'Reinstated';
  reason: string;
}

// ─── Platform Certifications (v1.1) ─────────────────────────────────────────

export interface PlatformCertEntry {
  certificationId: string;
  vendor: string;
  platformName: string;
  platformVersion: string;
  certificationLevel: number;
  acrCoverage: string[];
  issueDate: string;
  expiryDate: string;
  certificationStatus: CertificationStatus;
  referenceEnvironment: string;
  inheritableAcrCount: number;
}

// ─── Ecosystem Directory Entries (v1.1) ─────────────────────────────────────

export interface AVBEntry {
  id: string;
  name: string;
  authorizationLevel: 'Basic' | 'Enhanced' | 'Full';
  regions: string[];
  specializations: string[];
  status: 'Active' | 'Suspended' | 'Revoked';
  contactUrl: string;
}

export interface CAPOEntry {
  id: string;
  name: string;
  classesServed: AssuranceClass[];
  regions: string[];
  status: 'Active' | 'Suspended';
  capabilities: string;
}

export interface InsurerEntry {
  id: string;
  name: string;
  coverageTypes: string[];
  regions: string[];
  araPartnerSince: string;
}

export interface ConsortiumMember {
  id: string;
  name: string;
  role: 'Founding' | 'Contributing' | 'Observer';
  sector: string;
  joinDate: string;
}

// ─── Regulatory Frameworks & Mappings (v1.1) ────────────────────────────────

export interface RegulatoryFramework {
  id: string;
  name: string;
  edition: string;
  acrsMapped: number;
  coveragePct: number;
  uniqueRequirements: number;
  status: string;
  description: string;
}

export interface RegulatoryMapping {
  id: number;
  acrId: string;
  frameworkId: string;
  frameworkRequirementId: string;
  mappingType: 'direct' | 'partial' | 'complementary';
  platformCertSufficient: 'Y' | 'N' | 'Partial';
}

// ─── Risk Classification (v1.1) ─────────────────────────────────────────────

export interface RiskFactor {
  id: number;
  name: string;
  description: string;
  examples: string;
}

export interface RiskClassification {
  factors: RiskFactorScore[];
  determinedClass: AssuranceClass;
  rationale: string;
  assessedBy: string;
}

export interface RiskFactorScore {
  factorId: number;
  factorName: string;
  score: number;
}

// ─── Glossary (v1.1) ────────────────────────────────────────────────────────

export interface GlossaryTerm {
  term: string;
  definition: string;
  relatedTerms: string[];
  versionIntroduced: string;
}

// ─── Standard Version ───────────────────────────────────────────────────────

export interface StandardVersion {
  version: string;
  releaseDate: string;
  status: 'Draft' | 'Public Review' | 'Ratified' | 'Superseded';
  changelog: ChangelogEntry[];
}

export interface ChangelogEntry {
  section: string;
  description: string;
  type: 'Added' | 'Changed' | 'Removed' | 'Fixed';
}

// ─── Search ─────────────────────────────────────────────────────────────────

export interface SearchResult {
  type: 'domain' | 'acr' | 'registry' | 'page' | 'governance' | 'glossary' | 'ecosystem';
  title: string;
  description: string;
  url: string;
  version?: string;
}

// ─── Evaluation ─────────────────────────────────────────────────────────────

export interface EvaluationPhase {
  phase: number;
  name: string;
  description: string;
  duration?: string;
  outputs: string[];
}

// ─── AVB Requirements ───────────────────────────────────────────────────────

export interface AVBRequirement {
  category: string;
  requirement: string;
  level: 'Basic' | 'Enhanced' | 'Full';
}

// ─── CAPO SLA (v1.1) ───────────────────────────────────────────────────────

export interface CAPOSla {
  metric: string;
  target: string;
  classApplicability: AssuranceClass[];
  description: string;
}

// ─── Certification Designation (v1.1 Two-Axis) ─────────────────────────────

export interface CertificationDesignation {
  level: CertificationLevel;
  assuranceClass?: AssuranceClass;
  type: CertificationType;
}

// ─── Enterprise Risk Dimension (v1.1) ───────────────────────────────────────

export interface EnterpriseRiskDimension {
  id: string;
  name: string;
  description: string;
  domainIds: number[];
}
