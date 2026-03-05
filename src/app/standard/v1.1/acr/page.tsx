import { getDomains, getACRs } from '@/lib/data';
import { ACRLibraryClient } from './ACRLibraryClient';

export default async function ACRLibraryPage() {
  const [domains, { data: acrs }] = await Promise.all([
    getDomains(),
    getACRs(),
  ]);

  return <ACRLibraryClient acrs={acrs} domains={domains} />;
}
