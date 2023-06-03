export interface TableCellProps {
  children: JSX.Element[] | string | null;
}

export default function TableCell({ children }: TableCellProps) {
  return (
    <td className="whitespace-nowrap px-2 py-2 pl-6 text-sm font-medium text-gray-900">
      {children}
    </td>
  );
}
