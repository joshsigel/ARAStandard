import { supabase } from './supabase';
import type {
  Domain,
  ACR,
  RegistryEntry,
  PlatformCertEntry,
  CertificationLevelDetail,
  AssuranceClassDetail,
  SystemProfile,
  RegulatoryFramework,
  RegulatoryMapping,
  GlossaryTerm,
  AVBEntry,
  CAPOEntry,
  InsurerEntry,
  ConsortiumMember,
  RiskFactor,
  CAPOSla,
} from '@/types';

// ─── Domains ────────────────────────────────────────────────────────────────

export async function getDomains(): Promise<Domain[]> {
  const { data, error } = await supabase
    .from('domains')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapDomain);
}

export async function getDomain(slug: string): Promise<Domain | null> {
  const { data, error } = await supabase
    .from('domains')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return mapDomain(data);
}

// ─── ACRs ───────────────────────────────────────────────────────────────────

export interface ACRFilters {
  domainId?: number;
  minCertLevel?: number;
  profileApplicability?: string;
  platformCertEligible?: boolean;
  evaluationFrequency?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export async function getACRs(filters?: ACRFilters): Promise<{ data: ACR[]; count: number }> {
  let query = supabase.from('acrs').select('*', { count: 'exact' });

  if (filters?.domainId) query = query.eq('domain_id', filters.domainId);
  if (filters?.minCertLevel) query = query.lte('min_cert_level', filters.minCertLevel);
  if (filters?.profileApplicability) query = query.ilike('profile_applicability', `%${filters.profileApplicability}%`);
  if (filters?.platformCertEligible !== undefined) query = query.eq('platform_cert_eligible', filters.platformCertEligible);
  if (filters?.evaluationFrequency) query = query.eq('evaluation_frequency', filters.evaluationFrequency);
  if (filters?.search) query = query.or(`id.ilike.%${filters.search}%,requirement_statement.ilike.%${filters.search}%`);

  query = query.order('id', { ascending: true });

  if (filters?.limit) query = query.limit(filters.limit);
  if (filters?.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: mapRows(data, mapACR), count: count || 0 };
}

export async function getACR(id: string): Promise<ACR | null> {
  const { data, error } = await supabase
    .from('acrs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return mapACR(data);
}

export async function getACRsByDomain(domainId: number): Promise<ACR[]> {
  const { data, error } = await supabase
    .from('acrs')
    .select('*')
    .eq('domain_id', domainId)
    .order('id', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapACR);
}

// ─── Registry ───────────────────────────────────────────────────────────────

export interface RegistryFilters {
  certificationLevel?: number;
  assuranceClass?: string;
  certificationType?: string;
  certificationStatus?: string;
  monitoringStatus?: string;
  industry?: string;
  search?: string;
}

export async function getRegistryEntries(filters?: RegistryFilters): Promise<RegistryEntry[]> {
  let query = supabase.from('registry_entries').select('*');

  if (filters?.certificationLevel) query = query.eq('certification_level', filters.certificationLevel);
  if (filters?.assuranceClass) query = query.eq('assurance_class', filters.assuranceClass);
  if (filters?.certificationType) query = query.eq('certification_type', filters.certificationType);
  if (filters?.certificationStatus) query = query.eq('certification_status', filters.certificationStatus);
  if (filters?.monitoringStatus) query = query.eq('monitoring_status', filters.monitoringStatus);
  if (filters?.industry) query = query.eq('industry', filters.industry);
  if (filters?.search) {
    query = query.or(`organization.ilike.%${filters.search}%,system_name.ilike.%${filters.search}%,certification_id.ilike.%${filters.search}%`);
  }

  query = query.order('issue_date', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return mapRows(data, mapRegistryEntry);
}

export async function getRegistryEntry(certId: string): Promise<RegistryEntry | null> {
  const { data, error } = await supabase
    .from('registry_entries')
    .select('*')
    .eq('certification_id', certId)
    .single();
  if (error) return null;
  return mapRegistryEntry(data);
}

// ─── Platform Certifications ────────────────────────────────────────────────

export async function getPlatformCertifications(): Promise<PlatformCertEntry[]> {
  const { data, error } = await supabase
    .from('platform_certifications')
    .select('*')
    .order('issue_date', { ascending: false });
  if (error) throw error;
  return mapRows(data, mapPlatformCert);
}

// ─── Certification Levels ───────────────────────────────────────────────────

export async function getCertificationLevels(): Promise<CertificationLevelDetail[]> {
  const { data, error } = await supabase
    .from('certification_levels')
    .select('*')
    .order('level', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapCertLevel);
}

// ─── Assurance Classes ──────────────────────────────────────────────────────

export async function getAssuranceClasses(): Promise<AssuranceClassDetail[]> {
  const { data, error } = await supabase
    .from('assurance_classes')
    .select('*')
    .order('class', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapAssuranceClass);
}

// ─── System Profiles ────────────────────────────────────────────────────────

export async function getSystemProfiles(): Promise<SystemProfile[]> {
  const { data, error } = await supabase
    .from('system_profiles')
    .select('*')
    .order('acr_count', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapSystemProfile);
}

// ─── Regulatory Frameworks ──────────────────────────────────────────────────

export async function getRegulatoryFrameworks(): Promise<RegulatoryFramework[]> {
  const { data, error } = await supabase
    .from('regulatory_frameworks')
    .select('*')
    .order('acrs_mapped', { ascending: false });
  if (error) throw error;
  return mapRows(data, mapRegulatoryFramework);
}

export async function getMappingsForACR(acrId: string): Promise<RegulatoryMapping[]> {
  const { data, error } = await supabase
    .from('regulatory_mappings')
    .select('*')
    .eq('acr_id', acrId);
  if (error) throw error;
  return mapRows(data, mapRegulatoryMapping);
}

export async function getMappingsForFramework(frameworkId: string): Promise<RegulatoryMapping[]> {
  const { data, error } = await supabase
    .from('regulatory_mappings')
    .select('*')
    .eq('framework_id', frameworkId);
  if (error) throw error;
  return mapRows(data, mapRegulatoryMapping);
}

// ─── Glossary ───────────────────────────────────────────────────────────────

export async function getGlossary(): Promise<GlossaryTerm[]> {
  const { data, error } = await supabase
    .from('glossary')
    .select('*')
    .order('term', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapGlossaryTerm);
}

export async function getGlossaryTerm(term: string): Promise<GlossaryTerm | null> {
  const { data, error } = await supabase
    .from('glossary')
    .select('*')
    .eq('term', term)
    .single();
  if (error) return null;
  return mapGlossaryTerm(data);
}

// ─── Ecosystem Directories ──────────────────────────────────────────────────

export async function getAVBDirectory(): Promise<AVBEntry[]> {
  const { data, error } = await supabase
    .from('avb_directory')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapAVBEntry);
}

export async function getCAPODirectory(): Promise<CAPOEntry[]> {
  const { data, error } = await supabase
    .from('capo_directory')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapCAPOEntry);
}

export async function getInsurerDirectory(): Promise<InsurerEntry[]> {
  const { data, error } = await supabase
    .from('insurer_directory')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return mapRows(data, mapInsurerEntry);
}

export async function getConsortiumMembers(): Promise<ConsortiumMember[]> {
  const { data, error } = await supabase
    .from('consortium_members')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data as ConsortiumMember[];
}

// ─── Risk Factors ───────────────────────────────────────────────────────────

export async function getRiskFactors(): Promise<RiskFactor[]> {
  const { data, error } = await supabase
    .from('risk_factors')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data as RiskFactor[];
}

// ─── CAPO SLAs ──────────────────────────────────────────────────────────────

export async function getCAPOSlas(): Promise<CAPOSla[]> {
  const { data, error } = await supabase
    .from('capo_slas')
    .select('*');
  if (error) throw error;
  return data as CAPOSla[];
}

// ─── Row Mappers (snake_case → camelCase) ───────────────────────────────────

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Safely parse a value that might be a JSON string, an already-parsed object, or null/undefined */
function parseJsonField<T>(value: any, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

function mapRows<T>(rows: any[] | null, mapper: (row: any) => T): T[] {
  return (rows || []).map(mapper);
}

function mapDomain(row: any): Domain {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortTitle: row.short_title,
    summary: row.summary,
    acrCount: row.acr_count,
    riskDimension: row.risk_dimension || '',
    applicability: parseJsonField(row.applicability, { L1: true, L2: true, L3: true }),
    riskRationale: row.risk_rationale || '',
    versionIntroduced: row.version_introduced || '1.0',
    sortOrder: row.sort_order || row.id,
  };
}

function mapACR(row: any): ACR {
  return {
    id: row.id,
    domainId: row.domain_id,
    domain: row.domain || '',
    requirementStatement: row.requirement_statement || '',
    evaluationMethod: row.evaluation_method || '',
    evidenceType: row.evidence_type || '',
    minCertLevel: row.min_cert_level || 1,
    riskWeight: row.risk_weight || 1,
    failureConsequence: row.failure_consequence || 'A',
    crossReferences: parseJsonField<ACR['crossReferences']>(row.cross_references, []),
    profileApplicability: row.profile_applicability || '',
    evidenceSpecification: row.evidence_specification || '',
    riskDimension: row.risk_dimension || '',
    frameworkCrosswalkRefs: row.framework_crosswalk_refs || '',
    evaluationFrequency: row.evaluation_frequency || '',
    l1EvidenceStandard: row.l1_evidence_standard || '',
    l2L3EvidenceStandard: row.l2_l3_evidence_standard || '',
    platformCertEligible: row.platform_cert_eligible || false,
    versionIntroduced: row.version_introduced || '1.0',
    // Legacy
    title: row.requirement_statement?.substring(0, 100) || '',
    description: row.requirement_statement || '',
  };
}

function mapRegistryEntry(row: any): RegistryEntry {
  return {
    certificationId: row.certification_id,
    organization: row.organization,
    systemName: row.system_name,
    category: row.category,
    certificationType: row.certification_type || 'deployment',
    certificationLevel: typeof row.certification_level === 'number' ? `L${row.certification_level}` as RegistryEntry['certificationLevel'] : row.certification_level,
    assuranceClass: row.assurance_class || null,
    versionCertifiedUnder: row.version_certified_under,
    issueDate: row.issue_date,
    expiryDate: row.expiry_date,
    monitoringStatus: row.monitoring_status,
    certificationStatus: row.certification_status,
    scopeStatement: row.scope_statement,
    industry: row.industry,
    capoId: row.capo_id || null,
    platformCertId: row.platform_cert_id || null,
    insuranceStatus: row.insurance_status || null,
    revocationHistory: parseJsonField<RegistryEntry['revocationHistory']>(row.revocation_history, []),
  };
}

function mapPlatformCert(row: any): PlatformCertEntry {
  return {
    certificationId: row.certification_id,
    vendor: row.vendor,
    platformName: row.platform_name,
    platformVersion: row.platform_version,
    certificationLevel: row.certification_level,
    acrCoverage: parseJsonField<PlatformCertEntry['acrCoverage']>(row.acr_coverage, []),
    issueDate: row.issue_date,
    expiryDate: row.expiry_date,
    certificationStatus: row.certification_status,
    referenceEnvironment: row.reference_environment || '',
    inheritableAcrCount: row.inheritable_acr_count || 0,
  };
}

function mapCertLevel(row: any): CertificationLevelDetail {
  return {
    level: typeof row.level === 'number' ? `L${row.level}` as CertificationLevelDetail['level'] : row.level,
    name: row.name,
    evaluationMethods: row.evaluation_methods || '',
    timeline: row.timeline || '',
    redTeamRequired: row.red_team_required || false,
    validityMonths: row.validity_months || 12,
    reassessment: row.reassessment || '',
    applicableProfiles: parseJsonField<CertificationLevelDetail['applicableProfiles']>(row.applicable_profiles, []),
    domainThresholds: parseJsonField<CertificationLevelDetail['domainThresholds']>(row.domain_thresholds, {}),
  };
}

function mapAssuranceClass(row: any): AssuranceClassDetail {
  return {
    class: row.class,
    name: row.name,
    monitoringRequirement: row.monitoring_requirement || '',
    cadence: row.cadence || '',
    lapseWindow: row.lapse_window || '',
    useCases: row.use_cases || '',
    capoRequired: row.capo_required || false,
  };
}

function mapSystemProfile(row: any): SystemProfile {
  return {
    code: row.code,
    name: row.name,
    acrCount: row.acr_count,
    targetSystems: row.target_systems || '',
    characteristics: row.characteristics || '',
  };
}

function mapRegulatoryFramework(row: any): RegulatoryFramework {
  return {
    id: row.id,
    name: row.name,
    edition: row.edition || '',
    acrsMapped: row.acrs_mapped || 0,
    coveragePct: row.coverage_pct || 0,
    uniqueRequirements: row.unique_requirements || 0,
    status: row.status || '',
    description: row.description || '',
  };
}

function mapRegulatoryMapping(row: any): RegulatoryMapping {
  return {
    id: row.id,
    acrId: row.acr_id,
    frameworkId: row.framework_id,
    frameworkRequirementId: row.framework_requirement_id || '',
    mappingType: row.mapping_type || 'direct',
    platformCertSufficient: row.platform_cert_sufficient || 'N',
  };
}

function mapGlossaryTerm(row: any): GlossaryTerm {
  return {
    term: row.term,
    definition: row.definition,
    relatedTerms: parseJsonField<GlossaryTerm['relatedTerms']>(row.related_terms, []),
    versionIntroduced: row.version_introduced || '1.0',
  };
}

function mapAVBEntry(row: any): AVBEntry {
  return {
    id: row.id,
    name: row.name,
    authorizationLevel: row.authorization_level,
    regions: parseJsonField<AVBEntry['regions']>(row.regions, []),
    specializations: parseJsonField<AVBEntry['specializations']>(row.specializations, []),
    status: row.status,
    contactUrl: row.contact_url || '',
  };
}

function mapCAPOEntry(row: any): CAPOEntry {
  return {
    id: row.id,
    name: row.name,
    classesServed: parseJsonField<CAPOEntry['classesServed']>(row.classes_served, []),
    regions: parseJsonField<CAPOEntry['regions']>(row.regions, []),
    status: row.status,
    capabilities: row.capabilities || '',
  };
}

function mapInsurerEntry(row: any): InsurerEntry {
  return {
    id: row.id,
    name: row.name,
    coverageTypes: parseJsonField<InsurerEntry['coverageTypes']>(row.coverage_types, []),
    regions: parseJsonField<InsurerEntry['regions']>(row.regions, []),
    araPartnerSince: row.ara_partner_since || '',
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */
