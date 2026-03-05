import Link from 'next/link';

const footerSections = [
  {
    title: 'Standard',
    links: [
      { name: 'Overview', href: '/standard' },
      { name: 'v1.1 Standard', href: '/standard/v1.1' },
      { name: 'Domains', href: '/standard/v1.1/domains' },
      { name: 'ACR Library', href: '/standard/v1.1/acr' },
      { name: 'Glossary', href: '/standard/v1.1/glossary' },
      { name: 'Changelog', href: '/standard/v1.1/changelog' },
    ],
  },
  {
    title: 'Certification',
    links: [
      { name: 'Two-Axis Model', href: '/certification' },
      { name: 'Risk Classification', href: '/certification/risk-classification' },
      { name: 'Platform Certification', href: '/certification/platform' },
      { name: 'Evaluation', href: '/evaluation' },
      { name: 'Badge Generator', href: '/badge-generator' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { name: 'Overview', href: '/ecosystem' },
      { name: 'Registry', href: '/registry' },
      { name: 'Certified Platforms', href: '/ecosystem/platforms' },
      { name: 'AVB Directory', href: '/ecosystem/avbs' },
      { name: 'CAPO Directory', href: '/ecosystem/capos' },
      { name: 'Insurance Partners', href: '/ecosystem/insurers' },
      { name: 'Consortium', href: '/ecosystem/consortium' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { name: 'Portal', href: '/developers' },
      { name: 'SDK Guide', href: '/developers/sdk' },
      { name: 'Telemetry Schema', href: '/developers/telemetry' },
      { name: 'API Reference', href: '/developers/api' },
      { name: 'Machine Access', href: '/ai-access' },
    ],
  },
  {
    title: 'Governance',
    links: [
      { name: 'Structure', href: '/governance' },
      { name: 'AI Landscape', href: '/ai-landscape' },
      { name: 'Updates', href: '/updates' },
      { name: 'Public Comment', href: '/standard/v1.1/public-comment' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4 sm:gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-charcoal transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-5">
            <img
              src="/logos/araf-wordmark.svg"
              alt="ARAF"
              width={80}
              height={24}
              className="h-6 w-auto mt-0.5 shrink-0"
            />
            <div>
              <p className="text-sm font-semibold text-charcoal">
                Autonomous Reliability Assurance Foundation
              </p>
              <p className="text-xs text-muted mt-1">
                ARAF, ARA, and the ARA Certification Mark are registered trademarks
                of the Autonomous Reliability Assurance Foundation.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} ARAF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
