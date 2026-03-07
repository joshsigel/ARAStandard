import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { EcosystemArchitecture } from '@/components/visualizations/EcosystemArchitecture';

export const metadata: Metadata = {
  title: 'The ARA Ecosystem',
  description:
    'Overview of the ARA ecosystem: six participant categories working together to establish and maintain operational reliability for autonomous systems.',
};

const participants = [
  {
    title: 'Technical Standards Board (TSB)',
    description:
      'Develops and maintains the ARA Standard. The TSB holds ultimate technical authority over standard development, revision, and ratification.',
    href: '/governance',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: 'Authorized Validation Bodies (AVBs)',
    description:
      'Conduct certification evaluations at Basic, Enhanced, and Full authorization levels. AVBs assess autonomous systems against ARA requirements and issue certifications.',
    href: '/ecosystem/avbs',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Certified Assurance Platform Operators (CAPOs)',
    description:
      'Provide continuous monitoring infrastructure and assurance services for Class B (Monitored) and Class C (Continuous) certified systems.',
    href: '/ecosystem/capos',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: 'Recognized Insurer Partners (RIPs)',
    description:
      'Accept ARA certification data for underwriting decisions related to autonomous system liability, operational risk, and technology coverage.',
    href: '/ecosystem/insurers',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Certified Platforms',
    description:
      'Vendors with platform-level certifications enabling ACR inheritance for downstream deployments built on their certified platforms.',
    href: '/ecosystem/platforms',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    title: 'Consortium Members',
    description:
      'Organizations contributing to standard development through technical expertise, operational experience, and industry perspective.',
    href: '/ecosystem/consortium',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

export default function EcosystemPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Ecosystem' }]}
        className="mb-8"
      />

      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-charcoal mb-4">
          The ARA Ecosystem
        </h1>
        <p className="text-base text-steel leading-relaxed max-w-3xl">
          The ARA ecosystem comprises six participant categories working together
          to establish and maintain operational reliability for autonomous systems.
          Each participant plays a distinct role in the certification lifecycle,
          from standard development through evaluation, monitoring, and risk
          transfer.
        </p>
      </header>

      {/* Architecture Visualization */}
      <section className="mb-16">
        <EcosystemArchitecture />
      </section>

      {/* Participant Cards */}
      <section>
        <h2 className="text-xl font-semibold text-charcoal mb-6">
          Participant Categories
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participants.map((participant) => (
            <Link
              key={participant.title}
              href={participant.href}
              className="group block border border-border rounded-lg p-6 hover:border-border-dark hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-charcoal text-white flex items-center justify-center">
                  {participant.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-charcoal group-hover:text-navy transition-colors mb-2">
                    {participant.title}
                  </h3>
                  <p className="text-sm text-steel leading-relaxed">
                    {participant.description}
                  </p>
                  <span className="inline-block mt-3 text-sm text-navy font-medium group-hover:underline">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
