interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No records found',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-line py-10 text-center text-sm text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line bg-surface">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line bg-card">
          {data.map((row, i) => (
            <tr key={(row._id as string) || (row.id as string) || i} className="hover:bg-surface/60">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-ink">
                  {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
