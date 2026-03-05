import { getDomains } from '@/lib/data';
import { DomainsListClient } from './DomainsListClient';

export default async function DomainsPage() {
  const domains = await getDomains();

  return <DomainsListClient domains={domains} />;
}
