import { TableCell } from "./TableCell";

export const TableRow = ({ row, columns, className }) => {
    return (
      <tr className={`${className} hover:bg-gray-50 text-center`}>
        {columns.map((column, index) => (
          <TableCell
            key={index}
            columnKey={column.key}
            row={row}
            render={column.render}
          />
        ))}
      </tr>
    );
  };
  