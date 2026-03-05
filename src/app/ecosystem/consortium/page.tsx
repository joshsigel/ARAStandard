import type { Metadata } from 'next';
import { getConsortiumMembers } from '@/lib/data';
import { ConsortiumClient } from './ConsortiumClient';
import type { ConsortiumMember } from '@/types';

export const metadata: Metadata = {
  title: 'ARA Consortium',
  description:
    'Organizations contributing to the development and evolution of the ARA Standard through technical expertise, operational experience, and industry perspective.',
};

// Fallback data used when Supabase returns empty (e.g. during initial setup)
const fallbackMembers: ConsortiumMember[] = [
  { id: 'f1', name: 'Apex Reliability Partners', role: 'Founding', sector: 'Assessment', joinDate: '2025-06' },
  { id: 'f2', name: 'AgentStack', role: 'Founding', sector: 'Platform Vendor', joinDate: '2025-06' },
  { id: 'f3', name: 'Meridian AI', role: 'Founding', sector: 'Platform Vendor', joinDate: '2025-06' },
  { id: 'c1', name: 'CertAssure Global', role: 'Contributing', sector: 'Assessment', joinDate: '2025-09' },
  { id: 'c2', name: 'Assurance Cloud', role: 'Contributing', sector: 'Monitoring', joinDate: '2025-10' },
  { id: 'c3', name: 'NeuralForge', role: 'Contributing', sector: 'Platform Vendor', joinDate: '2025-11' },
  { id: 'c4', name: 'TrustBridge Assessment', role: 'Contributing', sector: 'Assessment', joinDate: '2025-12' },
  { id: 'o1', name: 'Autonomous Risk Underwriters', role: 'Observer', sector: 'Insurance', joinDate: '2026-01' },
  { id: 'o2', name: 'TechShield Insurance', role: 'Observer', sector: 'Insurance', joinDate: '2026-01' },
  { id: 'o3', name: 'Global Standards Institute', role: 'Observer', sector: 'Research', joinDate: '2026-02' },
];

export default async function ConsortiumPage() {
  let members = await getConsortiumMembers();

  // Fall back to hardcoded data if Supabase returns empty
  if (!members || members.length === 0) {
    members = fallbackMembers;
  }

  const foundingMembers = members.filter((m) => m.role === 'Founding');
  const contributingMembers = members.filter((m) => m.role === 'Contributing');
  const observerMembers = members.filter((m) => m.role === 'Observer');

  return (
    <ConsortiumClient
      foundingMembers={foundingMembers}
      contributingMembers={contributingMembers}
      observerMembers={observerMembers}
    />
  );
}
