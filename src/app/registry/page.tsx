import { getRegistryEntries } from '@/lib/data';
import { RegistryClient } from './RegistryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ARA Public Certification Registry',
  description: 'Search and verify ARA-certified autonomous systems.',
};

export default async function RegistryPage() {
  const entries = await getRegistryEntries();
  return <RegistryClient initialEntries={entries} />;
}
