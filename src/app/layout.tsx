import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/search/CommandPalette';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ARA Standard — Autonomous Reliability Assurance Foundation',
    template: '%s | ARA Standard',
  },
  description:
    'The operational reliability standard for autonomous systems. 410 ACRs across 15 domains, two-axis certification (Level x Class), living badges, and ecosystem directories.',
  metadataBase: new URL('https://arastandard.org'),
  openGraph: {
    title: 'ARA Standard — Autonomous Reliability Assurance Foundation',
    description:
      'The operational reliability standard for autonomous systems — 410 ACRs, 15 domains, two-axis certification.',
    url: 'https://arastandard.org',
    siteName: 'ARA Standard',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="font-[family-name:var(--font-inter)] antialiased bg-white text-charcoal">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
