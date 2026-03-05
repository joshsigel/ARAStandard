'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface NavLink {
  name: string;
  href: string;
  description?: string;
}

interface NavItem {
  name: string;
  href: string;
  children?: NavLink[];
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Standard',
    href: '/standard',
    children: [
      { name: 'Overview', href: '/standard', description: 'ARA Standard introduction' },
      { name: 'v1.1 Standard', href: '/standard/v1.1', description: 'Current version' },
      { name: 'Domains', href: '/standard/v1.1/domains', description: '15 reliability domains' },
      { name: 'ACR Library', href: '/standard/v1.1/acr', description: '410 control requirements' },
      { name: 'Glossary', href: '/standard/v1.1/glossary', description: 'Terms and definitions' },
      { name: 'Changelog', href: '/standard/v1.1/changelog', description: 'Version history' },
    ],
  },
  {
    name: 'Certification',
    href: '/certification',
    children: [
      { name: 'Two-Axis Model', href: '/certification', description: 'Level x Class framework' },
      { name: 'Risk Classification', href: '/certification/risk-classification', description: '7-factor assessment' },
      { name: 'Platform Certification', href: '/certification/platform', description: 'Vendor platform pathway' },
      { name: 'Evaluation Process', href: '/evaluation', description: '10-phase lifecycle' },
      { name: 'Badge Generator', href: '/badge-generator', description: 'Living certification badge' },
    ],
  },
  {
    name: 'Ecosystem',
    href: '/ecosystem',
    children: [
      { name: 'Overview', href: '/ecosystem', description: 'ARA ecosystem architecture' },
      { name: 'Registry', href: '/registry', description: 'Certified systems lookup' },
      { name: 'Platforms', href: '/ecosystem/platforms', description: 'Certified platform vendors' },
      { name: 'AVB Directory', href: '/ecosystem/avbs', description: 'Validation bodies' },
      { name: 'CAPO Directory', href: '/ecosystem/capos', description: 'Assurance operators' },
      { name: 'Insurance Partners', href: '/ecosystem/insurers', description: 'Recognized insurers' },
      { name: 'Consortium', href: '/ecosystem/consortium', description: 'Contributing members' },
    ],
  },
  {
    name: 'Developers',
    href: '/developers',
    children: [
      { name: 'Portal', href: '/developers', description: 'Developer quick start' },
      { name: 'SDK Guide', href: '/developers/sdk', description: 'Integration toolkit' },
      { name: 'Telemetry Schema', href: '/developers/telemetry', description: 'Event specifications' },
      { name: 'Monitoring Architecture', href: '/developers/monitoring', description: 'CAPO integration' },
      { name: 'API Reference', href: '/developers/api', description: 'REST API endpoints' },
    ],
  },
  { name: 'AI Landscape', href: '/ai-landscape' },
  { name: 'Governance', href: '/governance' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnter = (name: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (item: NavItem) =>
    item.href === '/'
      ? pathname === '/'
      : pathname.startsWith(item.href);

  return (
    <header className="border-b border-border bg-white sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logos/araf-wordmark.svg"
              alt="ARAF — Autonomous Reliability Assurance Foundation"
              width={122}
              height={30}
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline text-[11px] leading-[14px] font-medium text-muted tracking-wide uppercase">
              Autonomous Reliability
              <br />
              Assurance Foundation
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                });
                document.dispatchEvent(event);
              }}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-muted border border-border rounded-md hover:border-border-dark transition-colors"
            >
              <span>Search</span>
              <kbd className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/standard/v1.1"
              className="hidden lg:inline-flex version-badge hover:bg-slate-50 transition-colors"
            >
              v1.1
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-steel"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 5l10 10M15 5L5 15" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 5h14M3 10h14M3 15h14" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-0 -mb-px" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = isActive(item);
            const hasDropdown = item.children && item.children.length > 0;
            const isOpen = openDropdown === item.name;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => hasDropdown ? handleMouseEnter(item.name) : setOpenDropdown(null)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    active
                      ? 'border-charcoal text-charcoal'
                      : 'border-transparent text-muted hover:text-charcoal hover:border-slate-300'
                  }`}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                >
                  {item.name}
                  {hasDropdown && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown panel */}
                {hasDropdown && isOpen && (
                  <div
                    className="absolute top-full left-0 mt-px min-w-[280px] bg-white border border-border
                               rounded-b-lg shadow-lg py-2 z-50 animate-fade-in-up"
                    style={{ animationDuration: '0.12s' }}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="text-sm font-medium text-charcoal group-hover:text-navy">
                          {child.name}
                        </div>
                        {child.description && (
                          <div className="text-xs text-slate-500 mt-0.5">
                            {child.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-white max-h-[70vh] overflow-y-auto" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-0.5">
            {navigation.map((item) => {
              const active = isActive(item);
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = mobileExpanded === item.name;

              return (
                <div key={item.name}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 px-3 py-2.5 text-sm rounded-md ${
                        active
                          ? 'bg-slate-100 text-charcoal font-medium'
                          : 'text-muted hover:bg-slate-50 hover:text-charcoal'
                      }`}
                    >
                      {item.name}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                        className="p-2 text-slate-400 hover:text-charcoal"
                        aria-label={`Expand ${item.name}`}
                        aria-expanded={isExpanded}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Mobile sub-navigation */}
                  {hasChildren && isExpanded && (
                    <div className="ml-4 pl-3 border-l border-border space-y-0.5 py-1">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-sm text-muted hover:text-charcoal hover:bg-slate-50 rounded-md"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
