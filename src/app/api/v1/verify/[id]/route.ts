import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { registryEntries as staticRegistryEntries } from '@/data/registry';

async function getEntryFromSupabase(certId: string) {
  try {
    const { data, error } = await supabase
      .from('registry_entries')
      .select('*')
      .eq('certification_id', certId)
      .single();
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try Supabase first
  const supabaseRow = await getEntryFromSupabase(id);

  if (supabaseRow) {
    const isVerified =
      supabaseRow.certification_status === 'Active' ||
      supabaseRow.certification_status === 'Conditional';

    return NextResponse.json({
      meta: {
        standard: 'ARA',
        version: '1.1',
        publisher: 'ARAF',
        generated: new Date().toISOString(),
      },
      verification: {
        certificationId: supabaseRow.certification_id,
        status: supabaseRow.certification_status,
        verified: isVerified,
        organization: supabaseRow.organization,
        systemName: supabaseRow.system_name,
        certificationLevel: supabaseRow.certification_level,
        category: supabaseRow.category,
        certificationType: supabaseRow.certification_type || 'deployment',
        assuranceClass: supabaseRow.assurance_class || null,
        issueDate: supabaseRow.issue_date,
        expiryDate: supabaseRow.expiry_date,
        monitoringStatus: supabaseRow.monitoring_status,
        scopeStatement: supabaseRow.scope_statement,
        industry: supabaseRow.industry,
        versionCertifiedUnder: supabaseRow.version_certified_under,
        capoId: supabaseRow.capo_id || null,
        platformCertId: supabaseRow.platform_cert_id || null,
        insuranceStatus: supabaseRow.insurance_status || null,
        registryUrl: `https://arastandard.org/registry/verify/${supabaseRow.certification_id}`,
      },
    });
  }

  // Fallback to static data
  const entry = staticRegistryEntries.find((e) => e.certificationId === id);

  if (!entry) {
    return NextResponse.json(
      {
        meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF' },
        verification: {
          certificationId: id,
          status: 'NOT_FOUND',
          message: `No certification found for ID '${id}'.`,
          verified: false,
        },
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
    verification: {
      certificationId: entry.certificationId,
      status: entry.certificationStatus,
      verified: entry.certificationStatus === 'Active' || entry.certificationStatus === 'Conditional',
      organization: entry.organization,
      systemName: entry.systemName,
      certificationLevel: entry.certificationLevel,
      category: entry.category,
      certificationType: entry.certificationType || 'deployment',
      assuranceClass: entry.assuranceClass || null,
      issueDate: entry.issueDate,
      expiryDate: entry.expiryDate,
      monitoringStatus: entry.monitoringStatus,
      scopeStatement: entry.scopeStatement,
      industry: entry.industry,
      versionCertifiedUnder: entry.versionCertifiedUnder,
      capoId: entry.capoId || null,
      platformCertId: entry.platformCertId || null,
      insuranceStatus: entry.insuranceStatus || null,
      registryUrl: `https://arastandard.org/registry/verify/${entry.certificationId}`,
    },
  });
}
