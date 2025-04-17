export const TableCell = ({ value, render }) => {
    return (
      <td className="px-4 py-2 border-b border-gray-300">
        {render ? render(value) : value}
      </td>
    );
  };
  