'use client';

import { useState, useMemo, type ReactNode } from 'react';

export interface Column<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
  headerClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  defaultSortColumn?: string;
  defaultSortDesc?: boolean;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = 'No results found.',
  defaultSortColumn,
  defaultSortDesc = false,
  className,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState(defaultSortColumn ?? '');
  const [sortDesc, setSortDesc] = useState(defaultSortDesc);

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    const col = columns.find((c) => c.id === sortColumn);
    if (!col?.sortValue) return data;
    const sorted = [...data].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    });
    return sortDesc ? sorted.reverse() : sorted;
  }, [data, sortColumn, sortDesc, columns]);

  const handleSort = (colId: string) => {
    const col = columns.find((c) => c.id === colId);
    if (!col?.sortValue) return;
    if (sortColumn === colId) {
      setSortDesc(!sortDesc);
    } else {
      setSortColumn(colId);
      setSortDesc(false);
    }
  };

  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className ?? ''}`}>
      <table className="w-full text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.id}
                onClick={() => handleSort(col.id)}
                className={`text-left font-semibold px-4 py-3 border-b-2 border-border-dark
                  text-charcoal whitespace-nowrap
                  ${col.sortValue ? 'cursor-pointer select-none hover:bg-slate-50' : ''}
                  ${col.headerClassName ?? ''}`}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortValue && sortColumn === col.id && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${sortDesc ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={keyExtractor(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-border transition-colors
                ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}
            >
              {columns.map((col) => (
                <td key={col.id} className={`px-4 py-3 ${col.className ?? ''}`}>
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
