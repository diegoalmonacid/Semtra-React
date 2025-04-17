export const HCell = ({ columnKey, row, render }) => {
  return (
    <td className="px-4 py-2 border-b border-gray-300">
      {render ? render(row) : row[columnKey]}
    </td>
  );
};
