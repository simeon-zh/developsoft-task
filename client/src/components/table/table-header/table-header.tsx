export interface TableHeaderProps {
  header: string;
}
export default function TableHeader({ header }: TableHeaderProps) {
  return (
    <th
      scope="col"
      className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6 text-left"
    >
      {header}
    </th>
  );
}
