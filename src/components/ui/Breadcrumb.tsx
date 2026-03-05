'use client';

import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-sm text-slate-500">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-slate-300" aria-hidden="true">/</span>
            )}
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-charcoal transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={i === items.length - 1 ? 'text-charcoal font-medium' : ''}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
