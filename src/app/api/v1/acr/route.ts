import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { acrs as staticACRs } from '@/data/acrs';

async function getACRsFromSupabase(filters: {
  domain?: string;
  level?: string;
  method?: string;
  classification?: string;
  profile?: string;
  frequency?: string;
  platform_eligible?: string;
}) {
  try {
    let query = supabase.from('acrs').select('*');

    if (filters.domain) {
      const domainId = parseInt(filters.domain, 10);
      query = query.eq('domain_id', domainId);
    }
    if (filters.level) {
      const levelNum = parseInt(filters.level.replace(/\D/g, ''), 10);
      if (!isNaN(levelNum)) {
        query = query.lte('min_cert_level', levelNum);
      }
    }
    if (filters.method) {
      query = query.eq('evaluation_method', filters.method.toUpperCase());
    }
    if (filters.classification) {
      query = query.ilike('failure_consequence', filters.classification);
    }
    if (filters.profile) {
      query = query.ilike('profile_applicability', `%${filters.profile.toUpperCase()}%`);
    }
    if (filters.frequency) {
      query = query.eq('evaluation_frequency', filters.frequency);
    }
    if (filters.platform_eligible !== undefined) {
      const eligible = filters.platform_eligible === 'true';
      query = query.eq('platform_cert_eligible', eligible);
    }

    query = query.order('id', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const domain = searchParams.get('domain');
  const level = searchParams.get('level');
  const method = searchParams.get('method');
  const classification = searchParams.get('classification');
  const profile = searchParams.get('profile');
  const frequency = searchParams.get('frequency');
  const platformEligible = searchParams.get('platform_eligible');

  const supabaseData = await getACRsFromSupabase({
    domain: domain ?? undefined,
    level: level ?? undefined,
    method: method ?? undefined,
    classification: classification ?? undefined,
    profile: profile ?? undefined,
    frequency: frequency ?? undefined,
    platform_eligible: platformEligible ?? undefined,
  });

  let data;

  if (supabaseData) {
    // Map Supabase snake_case rows to camelCase response
    data = supabaseData.map((row) => ({
      id: row.id,
      domainId: row.domain_id,
      domain: row.domain || '',
      requirementStatement: row.requirement_statement || '',
      evaluationMethod: row.evaluation_method || '',
      evidenceType: row.evidence_type || '',
      minCertLevel: row.min_cert_level || 1,
      riskWeight: row.risk_weight || 1,
      failureConsequence: row.failure_consequence || 'A',
      crossReferences: row.cross_references || [],
      profileApplicability: row.profile_applicability || '',
      evidenceSpecification: row.evidence_specification || '',
      riskDimension: row.risk_dimension || '',
      frameworkCrosswalkRefs: row.framework_crosswalk_refs || '',
      evaluationFrequency: row.evaluation_frequency || '',
      l1EvidenceStandard: row.l1_evidence_standard || '',
      l2L3EvidenceStandard: row.l2_l3_evidence_standard || '',
      platformCertEligible: row.platform_cert_eligible || false,
      versionIntroduced: row.version_introduced || '1.0',
    }));
  } else {
    // Fallback to static data with existing v1.0 filter logic
    let filtered = [...staticACRs];

    if (domain) {
      const domainId = parseInt(domain, 10);
      filtered = filtered.filter((a) => a.domainId === domainId);
    }
    if (level) {
      const key = level.toUpperCase() as 'L1' | 'L2' | 'L3';
      filtered = filtered.filter((a) => a.levelApplicability?.[key]);
    }
    if (method) {
      filtered = filtered.filter(
        (a) => a.evaluationMethod === method.toUpperCase()
      );
    }
    if (classification) {
      filtered = filtered.filter(
        (a) => a.classification?.toLowerCase() === classification.toLowerCase()
      );
    }
    // Note: profile, frequency, platform_eligible filters not available on v1.0 static data

    data = filtered;
  }

  return NextResponse.json({
    meta: {
      standard: 'ARA',
      version: '1.1',
      publisher: 'ARAF',
      generated: new Date().toISOString(),
      count: data.length,
      totalInStandard: 410,
    },
    data,
  });
}
