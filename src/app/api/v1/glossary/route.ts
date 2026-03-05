import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const term = searchParams.get('term');
  const q = searchParams.get('q');

  try {
    if (term) {
      // Exact term lookup
      const { data, error } = await supabase
        .from('glossary')
        .select('*')
        .eq('term', term)
        .single();
      if (error) throw error;
      return NextResponse.json({
        meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString() },
        data,
      });
    }

    let query = supabase.from('glossary').select('*');
    if (q) {
      query = query.or(`term.ilike.%${q}%,definition.ilike.%${q}%`);
    }
    query = query.order('term', { ascending: true });

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString(), count: data?.length || 0 },
      data: data || [],
    });
  } catch {
    // Fallback: static glossary
    const staticGlossary = [
      { term: 'ACR', definition: 'Autonomous Control Requirement — a specific, testable requirement within the ARA Standard.', related_terms: ['Domain', 'Evaluation Method'], version_introduced: '1.0' },
      { term: 'Assurance Class', definition: 'Risk-based classification (A, B, or C) determined by a seven-factor AVB assessment, dictating monitoring intensity.', related_terms: ['Risk Classification', 'CAPO'], version_introduced: '1.1' },
      { term: 'AVB', definition: 'Authorized Validation Body — an organization authorized by ARAF to conduct ARA certification evaluations.', related_terms: ['Evaluation', 'Certification'], version_introduced: '1.0' },
      { term: 'CAPO', definition: 'Certified Assurance Platform Operator — provides continuous monitoring infrastructure for Class B and C certifications.', related_terms: ['Assurance Class', 'Monitoring'], version_introduced: '1.1' },
      { term: 'Certification Designation', definition: 'The two-axis designation combining Evaluation Level and Assurance Class (e.g., L2-B).', related_terms: ['Evaluation Level', 'Assurance Class'], version_introduced: '1.1' },
      { term: 'DPSIC', definition: 'Data Privacy and Societal Impact Committee — advisory body for Domain 5 and Domain 13 oversight.', related_terms: ['Governance', 'Data Privacy'], version_introduced: '1.1' },
      { term: 'Evaluation Level', definition: 'The depth of evaluation rigor (L1 Foundation, L2 Operational, L3 Comprehensive).', related_terms: ['Certification', 'ACR'], version_introduced: '1.0' },
      { term: 'Platform Certification', definition: 'Reusable certification for AI platforms whose ACR compliance can be inherited by deployment certifications.', related_terms: ['Deployment Certification', 'ACR Inheritance'], version_introduced: '1.1' },
      { term: 'RIP', definition: 'Recognized Insurer Partner — insurance providers with ARA-specific coverage products.', related_terms: ['Insurance', 'Ecosystem'], version_introduced: '1.1' },
      { term: 'System Profile', definition: 'Categorization of system complexity determining applicable ACR count: Foundational (97), Standard (215), Advanced (368), Comprehensive (410).', related_terms: ['ACR', 'Evaluation Level'], version_introduced: '1.1' },
      { term: 'TSB', definition: 'Technical Standards Body — the ARAF committee responsible for maintaining and evolving the ARA Standard.', related_terms: ['Governance', 'ARAF'], version_introduced: '1.0' },
      { term: 'Two-Axis Model', definition: 'The v1.1 certification model combining Evaluation Level (L1/L2/L3) with Assurance Class (A/B/C) for 9 possible designations.', related_terms: ['Evaluation Level', 'Assurance Class', 'Certification Designation'], version_introduced: '1.1' },
    ];

    let filtered = staticGlossary;
    if (term) {
      const found = staticGlossary.find(g => g.term === term);
      return NextResponse.json({
        meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString(), note: 'Static fallback' },
        data: found || null,
      });
    }
    if (q) {
      const lower = q.toLowerCase();
      filtered = staticGlossary.filter(g => g.term.toLowerCase().includes(lower) || g.definition.toLowerCase().includes(lower));
    }

    return NextResponse.json({
      meta: { standard: 'ARA', version: '1.1', publisher: 'ARAF', generated: new Date().toISOString(), count: filtered.length, note: 'Static fallback' },
      data: filtered,
    });
  }
}
