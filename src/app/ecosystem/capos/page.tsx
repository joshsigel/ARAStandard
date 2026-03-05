import type { Metadata } from 'next';
import { getCAPODirectory } from '@/lib/data';
import { CAPODirectoryClient } from './CAPODirectoryClient';

export const metadata: Metadata = {
  title: 'CAPO Directory',
  description:
    'Browse Certified Assurance Platform Operators providing continuous monitoring for ARA-certified systems.',
};

export default async function CAPODirectoryPage() {
  const capos = await getCAPODirectory();
  return <CAPODirectoryClient capos={capos} />;
}
