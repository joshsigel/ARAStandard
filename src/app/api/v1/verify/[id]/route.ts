import { NextRequest, NextResponse } from 'next/server';
import { registryEntries } from '@/data/registry';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const entry = registryEntries.find((e) => e.certificationId === id);

  if (!entry) {
    return NextResponse.json(
      {
        meta: { standard: 'ARA', version: '1.0', publisher: 'ARAF' },
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
      version: '1.0',
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
      issueDate: entry.issueDate,
      expiryDate: entry.expiryDate,
      monitoringStatus: entry.monitoringStatus,
      scopeStatement: entry.scopeStatement,
      industry: entry.industry,
      versionCertifiedUnder: entry.versionCertifiedUnder,
      registryUrl: `https://arastandard.org/registry/verify/${entry.certificationId}`,
    },
  });
}
