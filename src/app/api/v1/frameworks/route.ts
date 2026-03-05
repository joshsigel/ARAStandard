import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const acrId = searchParams.get('acr_id');  // Filter mappings by ACR
  const frameworkId = searchParams.get('framework_id');  // Filter mappings by framework

  // Try Supabase first
  try {
    if (acrId) {
      // Return all framework mappings for a specific ACR
      const { data, error } = await supabase
        .from('regulatory_mappings')
        .select('*, regulatory_frameworks(*)')
        .eq('acr_id', acrId);
      if (error) throw error;
      return NextResponse.json({
        meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString(), count: data?.length || 0 },
        data: data || [],
      });
    }
    if (frameworkId) {
      // Return all ACR mappings for a specific framework
      const { data, error } = await supabase
        .from('regulatory_mappings')
        .select('*')
        .eq('framework_id', frameworkId);
      if (error) throw error;
      return NextResponse.json({
        meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString(), count: data?.length || 0 },
        data: data || [],
      });
    }
    // Default: return all frameworks
    const { data, error } = await supabase
      .from('regulatory_frameworks')
      .select('*')
      .order('acrs_mapped', { ascending: false });
    if (error) throw error;
    return NextResponse.json({
      meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString(), count: data?.length || 0 },
      data: data || [],
    });
  } catch {
    // Fallback: return static framework list
    return NextResponse.json({
      meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString(), count: 14, note: 'Static fallback — Supabase unavailable' },
      data: [
        { id: 'eu-ai-act', name: 'EU AI Act', edition: '2024', acrs_mapped: 287, coverage_pct: 70, status: 'Active' },
        { id: 'iso-42001', name: 'ISO/IEC 42001', edition: '2023', acrs_mapped: 198, coverage_pct: 48, status: 'Active' },
        { id: 'nist-ai-100-1', name: 'NIST AI 100-1', edition: '2024', acrs_mapped: 176, coverage_pct: 43, status: 'Active' },
        { id: 'iso-27001', name: 'ISO/IEC 27001', edition: '2022', acrs_mapped: 142, coverage_pct: 35, status: 'Active' },
        { id: 'nist-sp-800-53', name: 'NIST SP 800-53 Rev.5', edition: '2020', acrs_mapped: 156, coverage_pct: 38, status: 'Active' },
        { id: 'iec-61508', name: 'IEC 61508', edition: '2010', acrs_mapped: 89, coverage_pct: 22, status: 'Active' },
        { id: 'iso-22989', name: 'ISO 22989', edition: '2022', acrs_mapped: 67, coverage_pct: 16, status: 'Active' },
        { id: 'iso-23894', name: 'ISO/IEC 23894', edition: '2023', acrs_mapped: 98, coverage_pct: 24, status: 'Active' },
        { id: 'ieee-7000', name: 'IEEE 7000', edition: '2021', acrs_mapped: 54, coverage_pct: 13, status: 'Active' },
        { id: 'asilomar', name: 'Asilomar AI Principles', edition: '2017', acrs_mapped: 34, coverage_pct: 8, status: 'Active' },
        { id: 'oecd-ai', name: 'OECD AI Principles', edition: '2019', acrs_mapped: 45, coverage_pct: 11, status: 'Active' },
        { id: 'singapore-model-framework', name: 'Singapore Model AI Gov Framework', edition: '2020', acrs_mapped: 76, coverage_pct: 19, status: 'Active' },
        { id: 'canada-aida', name: 'Canada AIDA', edition: '2023', acrs_mapped: 112, coverage_pct: 27, status: 'Active' },
        { id: 'iso-5338', name: 'ISO/IEC 5338', edition: '2023', acrs_mapped: 88, coverage_pct: 21, status: 'Active' },
      ],
    });
  }
}
