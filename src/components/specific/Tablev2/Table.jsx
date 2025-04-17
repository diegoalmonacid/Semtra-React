import { TableRow } from "./TableRow";
export const Table = ({ data, columns, children, className }) => {
  return (
    <div className={`bg-white border border-gray-300 rounded-md ${className}`}>
      <div className="overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 border-b border-gray-300 font-semibold text-gray-600 text-center"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} row={row} columns={columns} />
            ))}
          </tbody>
        </table>
      </div>
      {children && <div className="p-4">{children}</div>} {/* Elementos extra, como filtros */}
    </div>
  );
};
