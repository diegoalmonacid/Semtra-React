import { TableCell } from "./TableCell";

export const TableRow = ({ row, columns }) => {
    return (
      <tr className="hover:bg-gray-50 text-center">
        {columns.map((column) => (
          <TableCell
            key={column.key}
            value={row[column.key]}
            render={column.render}
          />
        ))}
      </tr>
    );
  };
  