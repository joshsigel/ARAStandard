import { NextRequest, NextResponse } from 'next/server';
import { acrs } from '@/data/acrs';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const acr = acrs.find((a) => a.id === id);

  if (!acr) {
    return NextResponse.json(
      {
        meta: { standard: 'ARA', version: '1.0', publisher: 'ARAF' },
        error: { code: 'NOT_FOUND', message: `ACR '${id}' not found.` },
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
    data: acr,
  });
}
