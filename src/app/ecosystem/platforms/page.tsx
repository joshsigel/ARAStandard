import type { Metadata } from 'next';
import { getPlatformCertifications } from '@/lib/data';
import { PlatformDirectoryClient } from './PlatformDirectoryClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Certified Platforms',
  description:
    'Platforms that have achieved ARA platform certification, enabling ACR inheritance for deployments.',
};

export default async function CertifiedPlatformsPage() {
  const platforms = await getPlatformCertifications();
  return <PlatformDirectoryClient platforms={platforms} />;
}
