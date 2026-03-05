import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { acrs as staticACRs } from '@/data/acrs';

async function getACRFromSupabase(id: string) {
  try {
    const { data, error } = await supabase
      .from('acrs')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

async function getRegulatoryMappings(acrId: string) {
  try {
    const { data, error } = await supabase
      .from('regulatory_mappings')
      .select('*')
      .eq('acr_id', acrId);
    if (error) throw error;
    return data?.map((row) => ({
      id: row.id,
      acrId: row.acr_id,
      frameworkId: row.framework_id,
      frameworkRequirementId: row.framework_requirement_id || '',
      mappingType: row.mapping_type || 'direct',
      platformCertSufficient: row.platform_cert_sufficient || 'N',
    })) ?? [];
  } catch {
    return [];
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try Supabase first
  const supabaseRow = await getACRFromSupabase(id);

  if (supabaseRow) {
    const regulatoryMappings = await getRegulatoryMappings(id);

    return NextResponse.json({
      meta: {
        standard: 'ARA',
        version: '1.1',
        publisher: 'ARAF',
        generated: new Date().toISOString(),
      },
      data: {
        id: supabaseRow.id,
        domainId: supabaseRow.domain_id,
        domain: supabaseRow.domain || '',
        requirementStatement: supabaseRow.requirement_statement || '',
        evaluationMethod: supabaseRow.evaluation_method || '',
        evidenceType: supabaseRow.evidence_type || '',
        minCertLevel: supabaseRow.min_cert_level || 1,
        riskWeight: supabaseRow.risk_weight || 1,
        failureConsequence: supabaseRow.failure_consequence || 'A',
        crossReferences: supabaseRow.cross_references || [],
        profileApplicability: supabaseRow.profile_applicability || '',
        evidenceSpecification: supabaseRow.evidence_specification || '',
        riskDimension: supabaseRow.risk_dimension || '',
        frameworkCrosswalkRefs: supabaseRow.framework_crosswalk_refs || '',
        evaluationFrequency: supabaseRow.evaluation_frequency || '',
        l1EvidenceStandard: supabaseRow.l1_evidence_standard || '',
        l2L3EvidenceStandard: supabaseRow.l2_l3_evidence_standard || '',
        platformCertEligible: supabaseRow.platform_cert_eligible || false,
        versionIntroduced: supabaseRow.version_introduced || '1.0',
        regulatoryCrosswalk: regulatoryMappings,
      },
    });
  }

  // Fallback to static data
  const acr = staticACRs.find((a) => a.id === id);

  if (!acr) {
    return NextResponse.json(
      {
        meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF' },
        error: { code: 'NOT_FOUND', message: `ACR '${id}' not found.` },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    meta: {
      standard: 'ARA',
      version: '1.1',
      publisher: 'ARAF',
      generated: new Date().toISOString(),
    },
    data: {
      ...acr,
      regulatoryCrosswalk: [],
    },
  });
}
