import { NextRequest, NextResponse } from 'next/server';
import { acrs } from '@/data/acrs';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const domain = searchParams.get('domain');
  const level = searchParams.get('level');
  const method = searchParams.get('method');
  const classification = searchParams.get('classification');

  let filtered = [...acrs];

  if (domain) {
    const domainId = parseInt(domain, 10);
    filtered = filtered.filter((a) => a.domainId === domainId);
  }

  if (level) {
    const key = level.toUpperCase() as 'L1' | 'L2' | 'L3';
    filtered = filtered.filter((a) => a.levelApplicability[key]);
  }

  if (method) {
    filtered = filtered.filter(
      (a) => a.evaluationMethod === method.toUpperCase()
    );
  }

  if (classification) {
    filtered = filtered.filter(
      (a) => a.classification.toLowerCase() === classification.toLowerCase()
    );
  }

  return NextResponse.json({
    meta: {
      standard: 'ARA',
      version: '1.0',
      publisher: 'ARAF',
      generated: new Date().toISOString(),
      count: filtered.length,
      totalInStandard: 352,
    },
    data: filtered,
  });
}
