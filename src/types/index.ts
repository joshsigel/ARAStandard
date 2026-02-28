// ARA Standard — Core Type Definitions

export type CertificationLevel = 'L1' | 'L2' | 'L3';

export type EvaluationMethod = 'AT' | 'HS' | 'EI' | 'CM';

export type ACRClassification = 'Blocking' | 'Conditional';

export type CertificationStatus = 'Active' | 'Suspended' | 'Expired' | 'Revoked' | 'Conditional';

export type MonitoringStatus = 'Compliant' | 'Warning' | 'Non-Compliant' | 'Pending';

export type SystemCategory = 'Agent' | 'Multi-Agent' | 'Physical' | 'Hybrid';

export interface Domain {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  acrCount: number;
  applicability: {
    L1: boolean;
    L2: boolean;
    L3: boolean;
  };
  riskRationale: string;
  versionIntroduced: string;
}

export interface ACR {
  id: string;
  title: string;
  domainId: number;
  domain: string;
  description: string;
  evaluationMethod: EvaluationMethod;
  levelApplicability: {
    L1: boolean;
    L2: boolean;
    L3: boolean;
  };
  riskWeight: number;
  classification: ACRClassification;
  evidenceRequirements: string[];
  relatedControls: string[];
  versionIntroduced: string;
}

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
}

export interface RevocationEvent {
  date: string;
  action: 'Suspended' | 'Revoked' | 'Reinstated';
  reason: string;
}

export interface CertificationLevelDetail {
  level: CertificationLevel;
  name: string;
  autonomyModel: string;
  humanRequirement: string;
  minimumACRs: number;
  evaluationScope: string;
  adversarialTesting: string;
  monitoring: string;
  reassessment: string;
  applicableSystems: string[];
  domainThresholds: Record<string, number>;
}

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

export interface SearchResult {
  type: 'domain' | 'acr' | 'registry' | 'page' | 'governance';
  title: string;
  description: string;
  url: string;
  version?: string;
}

export interface EvaluationPhase {
  phase: number;
  name: string;
  description: string;
  duration?: string;
  outputs: string[];
}

export interface AVBRequirement {
  category: string;
  requirement: string;
  level: 'Basic' | 'Enhanced' | 'Full';
}
