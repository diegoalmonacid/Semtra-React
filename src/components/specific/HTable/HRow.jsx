import { HCell } from "./HCell";

export const HRow = ({ column, data, className }) => {
  return (
    <tr className={`${className} hover:bg-gray-50 text-center grid auto-rows-auto grid-cols-2`}>
      <td className="px-4 py-2 border-b border-gray-300 font-semibold h-full text-gray-600 bg-gray-200">
        {column.label}
      </td>
      {data.map((row, index) => (
        <HCell
          key={index}
          columnKey={column.key}
          row={row}
          render={column.render}
        />
      ))}
    </tr>
  );
};
