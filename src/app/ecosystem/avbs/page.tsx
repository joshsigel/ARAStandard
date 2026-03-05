import type { Metadata } from 'next';
import { getAVBDirectory } from '@/lib/data';
import { AVBDirectoryClient } from './AVBDirectoryClient';

export const metadata: Metadata = {
  title: 'AVB Directory',
  description:
    'Browse Authorized Validation Bodies accredited to conduct ARA evaluations.',
};

export default async function AVBDirectoryPage() {
  const avbs = await getAVBDirectory();
  return <AVBDirectoryClient avbs={avbs} />;
}
