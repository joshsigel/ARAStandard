'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Standard', href: '/standard' },
  { name: 'Certification', href: '/certification' },
  { name: 'Registry', href: '/registry' },
  { name: 'Evaluation', href: '/evaluation' },
  { name: 'AVB Program', href: '/avb' },
  { name: 'Monitoring', href: '/monitoring' },
  { name: 'Governance', href: '/governance' },
  { name: 'Updates', href: '/updates' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-white sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logos/araf-logo.svg"
              alt="ARAF — Autonomous Reliability Assurance Foundation"
              width={120}
              height={30}
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline text-xs font-medium text-muted tracking-wide uppercase">
              ARA Standard
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
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted border border-border rounded-md hover:border-border-dark transition-colors"
            >
              <span>Search</span>
              <kbd className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/standard/v1.0"
              className="hidden md:inline-flex version-badge hover:bg-slate-50 transition-colors"
            >
              v1.0
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-steel"
              aria-label="Toggle menu"
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
        <nav className="hidden md:flex items-center gap-0 -mb-px" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-muted hover:text-charcoal hover:border-slate-300'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-white" aria-label="Mobile navigation">
          <div className="px-6 py-3 space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 text-sm rounded-md ${
                    isActive
                      ? 'bg-slate-100 text-charcoal font-medium'
                      : 'text-muted hover:bg-slate-50 hover:text-charcoal'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
