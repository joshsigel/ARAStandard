import { getDomains } from '@/lib/data';
import { DomainsListClient } from './DomainsListClient';

export const dynamic = 'force-dynamic';

export default async function DomainsPage() {
  const domains = await getDomains();

  return <DomainsListClient domains={domains} />;
}
