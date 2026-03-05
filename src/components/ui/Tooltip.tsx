'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible || !triggerRef.current || !tooltipRef.current) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const tooltip = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = trigger.top - tooltip.height - gap;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2;
        break;
      case 'bottom':
        top = trigger.bottom + gap;
        left = trigger.left + trigger.width / 2 - tooltip.width / 2;
        break;
      case 'left':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2;
        left = trigger.left - tooltip.width - gap;
        break;
      case 'right':
        top = trigger.top + trigger.height / 2 - tooltip.height / 2;
        left = trigger.right + gap;
        break;
    }

    // Clamp to viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltip.width - 8));
    top = Math.max(8, Math.min(top, window.innerHeight - tooltip.height - 8));

    setCoords({ top, left });
  }, [visible, position]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className={`inline-flex ${className ?? ''}`}
        tabIndex={0}
      >
        {children}
      </span>
      {visible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className="fixed z-50 px-3 py-2 text-xs leading-relaxed text-white bg-charcoal
                     rounded-md shadow-lg max-w-xs pointer-events-none
                     animate-fade-in-up"
          style={{
            top: coords.top,
            left: coords.left,
            animationDuration: '0.15s',
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}
