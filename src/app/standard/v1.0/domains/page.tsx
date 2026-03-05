import type { Metadata } from 'next';
import { getDomains, getACRs } from '@/lib/data';
import { DomainsListClient } from './DomainsListClient';

export const metadata: Metadata = {
  title: 'Reliability Domains — ARA Standard v1.0',
  description:
    'The 13 reliability domains of the ARA Standard v1.0. Each domain addresses a critical area of operational reliability for autonomous systems.',
};

export default async function DomainsPage() {
  const [domains, { data: acrs }] = await Promise.all([
    getDomains(),
    getACRs(),
  ]);

  return <DomainsListClient domains={domains} acrs={acrs} />;
}
