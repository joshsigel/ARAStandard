import type { Metadata } from 'next';
import { getInsurerDirectory } from '@/lib/data';
import { InsurerDirectoryClient } from './InsurerDirectoryClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Recognized Insurer Partners',
  description:
    'Insurance providers who accept ARA certification data for autonomous system underwriting and risk assessment.',
};

export default async function InsurersPage() {
  const insurers = await getInsurerDirectory();
  return <InsurerDirectoryClient insurers={insurers} />;
}
