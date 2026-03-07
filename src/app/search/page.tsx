import { getDomains, getACRs, getRegistryEntries } from '@/lib/data';
import { SearchClient } from './SearchClient';

export const dynamic = 'force-dynamic';

export default async function SearchPage() {
  const [domains, { data: acrs }, registryEntries] = await Promise.all([
    getDomains(),
    getACRs(),
    getRegistryEntries(),
  ]);

  return <SearchClient domains={domains} acrs={acrs} registryEntries={registryEntries} />;
}
