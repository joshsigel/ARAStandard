import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { domains as staticDomains } from '@/data/domains';

async function getDomainsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('domains')
      .select('id, slug, title, acr_count')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data?.map((d) => ({
      id: d.id,
      slug: d.slug,
      title: d.title,
      acrCount: d.acr_count,
    })) ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  const supabaseDomains = await getDomainsFromSupabase();
  const domainList = supabaseDomains ?? staticDomains.map((d) => ({
    id: d.id,
    slug: d.slug,
    title: d.title,
    acrCount: d.acrCount,
  }));

  return NextResponse.json({
    meta: {
      standard: 'ARA',
      version: '1.1',
      publisher: 'Autonomous Reliability Assurance Foundation',
      documentId: 'ARAF-ARA-STD-2026-001',
      status: 'Public Review Draft',
      generated: new Date().toISOString(),
    },
    data: {
      title: 'The ARA Standard: Autonomous Reliability Assurance',
      version: '1.1',
      totalACRs: 410,
      totalDomains: 15,
      certificationModel: 'two-axis',
      assuranceClasses: [
        { class: 'A', name: 'Periodic', monitoringCadence: 'Annual re-assessment' },
        { class: 'B', name: 'Monitored', monitoringCadence: 'Quarterly telemetry review' },
        { class: 'C', name: 'Continuously Assured', monitoringCadence: 'Real-time CAPO monitoring' },
      ],
      systemProfiles: [
        { code: 'F', name: 'Foundational', acrCount: 97 },
        { code: 'S', name: 'Standard', acrCount: 215 },
        { code: 'A', name: 'Advanced', acrCount: 368 },
        { code: 'C', name: 'Comprehensive', acrCount: 410 },
      ],
      certificationLevels: [
        { level: 'L1', name: 'Foundation', minimumACRs: 160, reassessment: 'Annual' },
        { level: 'L2', name: 'Operational', minimumACRs: 230, reassessment: 'Semi-annual' },
        { level: 'L3', name: 'Comprehensive', minimumACRs: 290, reassessment: 'Quarterly' },
      ],
      domains: domainList,
      evaluationMethods: [
        { code: 'AT', name: 'Automated Testing' },
        { code: 'HS', name: 'Human Simulation' },
        { code: 'EI', name: 'Evidence Inspection' },
        { code: 'CM', name: 'Continuous Monitoring' },
        { code: 'TP', name: 'Third-Party Audit' },
        { code: 'OP', name: 'Operational Proof' },
      ],
      normativeReferences: [
        'ISO/IEC 27001:2022',
        'ISO/IEC 42001:2023',
        'ISO 22989:2022',
        'ISO/IEC 23894:2023',
        'NIST AI 100-1',
        'NIST SP 800-53 Rev. 5',
        'IEC 61508',
        'EU AI Act (2024)',
      ],
    },
  });
}
