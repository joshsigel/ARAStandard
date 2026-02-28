import { NextResponse } from 'next/server';
import { domains } from '@/data/domains';

export async function GET() {
  return NextResponse.json({
    meta: {
      standard: 'ARA',
      version: '1.0',
      publisher: 'Autonomous Reliability Assurance Foundation',
      documentId: 'ARAF-ARA-STD-2026-001',
      status: 'Public Review Draft',
      generated: new Date().toISOString(),
    },
    data: {
      title: 'The ARA Standard: Autonomous Reliability Assurance',
      version: '1.0',
      totalACRs: 352,
      coreACRs: 322,
      extensionACRs: 30,
      certificationLevels: [
        { level: 'L1', name: 'Supervised Operational Reliability', minimumACRs: 160, reassessment: 'Annual' },
        { level: 'L2', name: 'Bounded Autonomous Deployment', minimumACRs: 230, reassessment: 'Semi-annual' },
        { level: 'L3', name: 'High-Stakes Autonomous Certification', minimumACRs: 290, reassessment: 'Quarterly' },
      ],
      domains: domains.map((d) => ({
        id: d.id,
        slug: d.slug,
        title: d.title,
        acrCount: d.acrCount,
        applicability: d.applicability,
      })),
      evaluationMethods: [
        { code: 'AT', name: 'Automated Testing' },
        { code: 'HS', name: 'Human Simulation' },
        { code: 'EI', name: 'Evidence Inspection' },
        { code: 'CM', name: 'Continuous Monitoring' },
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
