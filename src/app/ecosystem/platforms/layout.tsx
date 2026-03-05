import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certified Platforms',
  description:
    'Platforms that have achieved ARA platform certification, enabling ACR inheritance for deployments.',
};

export default function CertifiedPlatformsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
