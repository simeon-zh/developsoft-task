import LoadingSpinner from "../loading-spinner/loading-spinner";
import TableHeader from "./table-header/table-header";

export interface TableProps {
  children: JSX.Element[] | null;
  headers: string[];
  hasContent: boolean;
}

const Table = ({ children, headers, hasContent }: TableProps) => {
  return (
    <div className="2xl:px-8">
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {hasContent ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {headers.map((header) => {
                        return <TableHeader key={header} header={header} />;
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">{children}</tbody>
                </table>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
