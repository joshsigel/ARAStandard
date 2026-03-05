'use client';

import { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabGroupProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export function TabGroup({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}: TabGroupProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id);
  const current = activeTab ?? internalActive;

  const handleChange = (id: string) => {
    if (onChange) onChange(id);
    else setInternalActive(id);
  };

  if (variant === 'pills') {
    return (
      <div role="tablist" className={`flex flex-wrap gap-2 ${className ?? ''}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={current === tab.id}
            onClick={() => handleChange(tab.id)}
            className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
              current === tab.id
                ? 'bg-charcoal text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-charcoal'
            }`}
          >
            {tab.label}
            {tab.count != null && (
              <span className={`ml-1.5 text-xs ${
                current === tab.id ? 'text-slate-300' : 'text-slate-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div role="tablist" className={`flex gap-0 border-b border-border ${className ?? ''}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={current === tab.id}
          onClick={() => handleChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            current === tab.id
              ? 'border-charcoal text-charcoal'
              : 'border-transparent text-slate-500 hover:text-charcoal hover:border-slate-300'
          }`}
        >
          {tab.label}
          {tab.count != null && (
            <span className={`ml-1.5 text-xs ${
              current === tab.id ? 'text-slate-400' : 'text-slate-400'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
