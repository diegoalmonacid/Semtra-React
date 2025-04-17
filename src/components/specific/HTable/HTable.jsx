import { HRow } from "./HRow";
export const HTable = ({ data, columns, children, className }) => {
  return (
    <div className={`bg-white  ${className}`}>
      <div className={`h-full`}>
        <table className="w-full text-left border-collapse flex flex-col h-full">
          <thead className="bg-gray-100 sticky top-0">
            {/* Removed the first row */}
          </thead>
          <tbody className="flex-1 grow flex flex-col">
            {columns.map((column, columnIndex) => (
              <HRow key={columnIndex} column={column} data={data} className={'grow '}/>
            ))}
          </tbody>
        </table>
      </div>
      {children && <div className="p-4">{children}</div>} {/* Elementos extra, como filtros */}
    </div>
  );
};
