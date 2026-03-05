'use client';

import { useState } from 'react';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterDropdown {
  id: string;
  label: string;
  options: FilterOption[];
  value?: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterDropdown[];
  onFilterChange?: (filterId: string, value: string) => void;
  resultCount?: number;
  className?: string;
}

export function FilterBar({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  filters = [],
  onFilterChange,
  resultCount,
  className,
}: FilterBarProps) {
  const [internalSearch, setInternalSearch] = useState('');
  const search = searchValue ?? internalSearch;

  const handleSearchChange = (value: string) => {
    if (onSearchChange) onSearchChange(value);
    else setInternalSearch(value);
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-3 ${className ?? ''}`}>
      {/* Search input */}
      <div className="relative flex-1 min-w-0">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md bg-white
                     text-charcoal placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                     transition-colors"
        />
        {search && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-charcoal"
            aria-label="Clear search"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      {filters.map((filter) => (
        <select
          key={filter.id}
          value={filter.value ?? ''}
          onChange={(e) => onFilterChange?.(filter.id, e.target.value)}
          className="px-3 py-2 text-sm border border-border rounded-md bg-white text-charcoal
                     focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy
                     transition-colors cursor-pointer"
          aria-label={filter.label}
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}{opt.count != null ? ` (${opt.count})` : ''}
            </option>
          ))}
        </select>
      ))}

      {/* Result count */}
      {resultCount != null && (
        <div className="flex items-center text-sm text-slate-500 whitespace-nowrap">
          {resultCount} result{resultCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
