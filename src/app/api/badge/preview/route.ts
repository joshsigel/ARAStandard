/**
 * GET /api/badge/preview?certId=...
 *
 * Part 2 Stub: Returns mock BadgeData for a given certification ID.
 * In Part 2, this will validate the cert ID against the registry
 * and return live operational state from monitoring telemetry.
 */

import { NextRequest, NextResponse } from 'next/server';

interface BadgeData {
  certId: string;
  orgName?: string;
  systemName?: string;
  level: 1 | 2 | 3;
  assuranceClass: 'A' | 'B' | 'C';
  standardVersion: string;
  status: string;
  lastCheckIn?: string;
  nextReassessment?: string;
  verificationUrl?: string;
}

// Mock badge data for preview
const MOCK_BADGES: Record<string, BadgeData> = {
  'ARA-2026-00289': {
    certId: 'ARA-2026-00289',
    orgName: 'Meridian AI Systems',
    systemName: 'Meridian AutoPilot v3',
    level: 2,
    assuranceClass: 'B',
    standardVersion: '1.1',
    status: 'active',
    lastCheckIn: new Date(Date.now() - 3600000).toISOString(),
    nextReassessment: '2027-01-15',
    verificationUrl: '/registry/verify/ARA-2026-00289',
  },
  'ARA-2026-00378': {
    certId: 'ARA-2026-00378',
    orgName: 'Nexus Robotics',
    systemName: 'Atlas Warehouse System',
    level: 3,
    assuranceClass: 'C',
    standardVersion: '1.1',
    status: 'monitoring_connected',
    lastCheckIn: new Date(Date.now() - 300000).toISOString(),
    nextReassessment: '2026-12-01',
    verificationUrl: '/registry/verify/ARA-2026-00378',
  },
};

export async function GET(request: NextRequest) {
  const certId = request.nextUrl.searchParams.get('certId');

  if (!certId) {
    return NextResponse.json(
      { error: 'Missing required parameter: certId' },
      { status: 400 }
    );
  }

  // Part 2: Look up real badge data from registry + monitoring state
  const badge = MOCK_BADGES[certId];

  if (!badge) {
    // Part 2: Return NOT_FOUND for unknown cert IDs
    // For now, return a default mock
    return NextResponse.json({
      certId,
      level: 1,
      assuranceClass: 'A',
      standardVersion: '1.1',
      status: 'active',
      verificationUrl: `/registry/verify/${certId}`,
    } satisfies BadgeData);
  }

  return NextResponse.json(badge);
}
