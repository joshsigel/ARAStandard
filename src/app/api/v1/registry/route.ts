import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { registryEntries as staticRegistryEntries } from '@/data/registry';

async function getRegistryFromSupabase(filters: {
  level?: string;
  industry?: string;
  status?: string;
  q?: string;
  class?: string;
  type?: string;
  profile?: string;
}) {
  try {
    let query = supabase.from('registry_entries').select('*');

    if (filters.level) {
      query = query.eq('certification_level', filters.level.toUpperCase());
    }
    if (filters.industry) {
      query = query.ilike('industry', `%${filters.industry}%`);
    }
    if (filters.status) {
      query = query.ilike('certification_status', filters.status);
    }
    if (filters.q) {
      query = query.or(
        `organization.ilike.%${filters.q}%,system_name.ilike.%${filters.q}%,certification_id.ilike.%${filters.q}%`
      );
    }
    if (filters.class) {
      query = query.eq('assurance_class', filters.class.toUpperCase());
    }
    if (filters.type) {
      query = query.eq('certification_type', filters.type.toLowerCase());
    }
    if (filters.profile) {
      // Filter by system profile -- entries may store this as a field or require join
      query = query.eq('system_profile', filters.profile.toUpperCase());
    }

    query = query.order('issue_date', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const level = searchParams.get('level');
  const industry = searchParams.get('industry');
  const status = searchParams.get('status');
  const q = searchParams.get('q');
  const assuranceClass = searchParams.get('class');
  const certType = searchParams.get('type');
  const profile = searchParams.get('profile');

  const supabaseData = await getRegistryFromSupabase({
    level: level ?? undefined,
    industry: industry ?? undefined,
    status: status ?? undefined,
    q: q ?? undefined,
    class: assuranceClass ?? undefined,
    type: certType ?? undefined,
    profile: profile ?? undefined,
  });

  let data;

  if (supabaseData) {
    // Map Supabase snake_case rows to camelCase response
    data = supabaseData.map((row) => ({
      certificationId: row.certification_id,
      organization: row.organization,
      systemName: row.system_name,
      category: row.category,
      certificationType: row.certification_type || 'deployment',
      certificationLevel: row.certification_level,
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
      revocationHistory: row.revocation_history || [],
    }));
  } else {
    // Fallback to static data with existing v1.0 filter logic
    let filtered = [...staticRegistryEntries];

    if (level) {
      filtered = filtered.filter((e) => e.certificationLevel === level.toUpperCase());
    }
    if (industry) {
      filtered = filtered.filter((e) =>
        e.industry.toLowerCase().includes(industry.toLowerCase())
      );
    }
    if (status) {
      filtered = filtered.filter(
        (e) => e.certificationStatus.toLowerCase() === status.toLowerCase()
      );
    }
    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.organization.toLowerCase().includes(lower) ||
          e.systemName.toLowerCase().includes(lower) ||
          e.certificationId.toLowerCase().includes(lower)
      );
    }
    // Note: class, type, profile filters not available on v1.0 static data

    data = filtered;
  }

  return NextResponse.json({
    meta: {
      standard: 'ARA',
      version: '1.1',
      publisher: 'ARAF',
      generated: new Date().toISOString(),
      count: data.length,
    },
    data,
  });
}
