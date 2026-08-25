import React from 'react';

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, any>>({ 
  columns, 
  data, 
  onRowClick,
  emptyMessage = "No data available."
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border-default bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-text-body">
          <thead className="border-b border-border-default bg-bg-page/50 text-xs uppercase tracking-wider text-text-muted">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 font-semibold whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr 
                  key={item.id || i} 
                  onClick={() => onRowClick?.(item)}
                  className={`transition-colors hover:bg-neutral-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
