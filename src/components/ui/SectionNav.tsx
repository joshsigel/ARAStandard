'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
  className?: string;
}

export function SectionNav({ items, className = '' }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(98);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Measure header height on mount and resize
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('header');
      if (header) setHeaderHeight(header.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Track which section is in view
  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section (topmost in viewport)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Track sticky state via sentinel element
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Scroll active pill into view horizontally
  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current;
      const btn = activeRef.current;
      const navRect = nav.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      // Only scroll if button is outside the visible area
      if (btnRect.left < navRect.left || btnRect.right > navRect.right) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeId]);

  const scrollOffset = headerHeight + 42; // header + nav height

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  }, [scrollOffset]);

  return (
    <>
      {/* Sentinel — when it scrolls out of view, the nav becomes sticky */}
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />

      <div
        className={`sticky z-30 border-b border-border bg-white/95 backdrop-blur-sm transition-shadow duration-200 ${
          isSticky ? 'shadow-sm' : ''
        } ${className}`}
        style={{ top: headerHeight }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8">
          <nav
            ref={navRef}
            className="flex gap-1 overflow-x-auto py-2 -mx-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label="Page sections"
          >
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  ref={isActive ? activeRef : undefined}
                  onClick={() => handleClick(item.id)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 shrink-0 ${
                    isActive
                      ? 'bg-charcoal text-white'
                      : 'text-steel hover:text-charcoal hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
