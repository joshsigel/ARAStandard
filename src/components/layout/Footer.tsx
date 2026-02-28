import Link from 'next/link';

const footerSections = [
  {
    title: 'Standard',
    links: [
      { name: 'Overview', href: '/standard' },
      { name: 'Domains', href: '/standard/v1.0/domains' },
      { name: 'ACR Library', href: '/standard/v1.0/acr' },
      { name: 'Changelog', href: '/standard/v1.0/changelog' },
      { name: 'Public Comment', href: '/standard/v1.0/public-comment' },
    ],
  },
  {
    title: 'Certification',
    links: [
      { name: 'Levels', href: '/certification' },
      { name: 'Evaluation', href: '/evaluation' },
      { name: 'AVB Program', href: '/avb' },
      { name: 'Registry', href: '/registry' },
      { name: 'Badge Generator', href: '/badge-generator' },
    ],
  },
  {
    title: 'Technical',
    links: [
      { name: 'Monitoring', href: '/monitoring' },
      { name: 'API Reference', href: '/monitoring/api' },
      { name: 'Machine Access', href: '/ai-access' },
      { name: 'Schema (JSON)', href: '/api/v1/standard' },
    ],
  },
  {
    title: 'Governance',
    links: [
      { name: 'Structure', href: '/governance' },
      { name: 'Updates', href: '/updates' },
      { name: 'Contact', href: '/governance#contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
