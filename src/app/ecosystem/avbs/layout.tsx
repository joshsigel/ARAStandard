import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AVB Directory',
  description:
    'Browse Authorized Validation Bodies accredited to conduct ARA evaluations at Basic, Enhanced, and Full authorization levels.',
};

export default function AVBDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
