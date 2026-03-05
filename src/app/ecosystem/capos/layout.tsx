import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CAPO Directory',
  description:
    'Certified Assurance Platform Operators providing continuous monitoring infrastructure for Class B and Class C certified systems.',
};

export default function CAPODirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
