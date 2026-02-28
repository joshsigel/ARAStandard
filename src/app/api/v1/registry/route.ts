import { NextRequest, NextResponse } from 'next/server';
import { registryEntries } from '@/data/registry';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const level = searchParams.get('level');
  const industry = searchParams.get('industry');
  const status = searchParams.get('status');
  const q = searchParams.get('q');

  let filtered = [...registryEntries];

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

  return NextResponse.json({
    meta: {
      standard: 'ARA',
      version: '1.0',
      publisher: 'ARAF',
      generated: new Date().toISOString(),
      count: filtered.length,
    },
    data: filtered,
  });
}
