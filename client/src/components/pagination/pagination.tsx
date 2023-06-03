import ReactPaginate from "react-paginate";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  page: number;
  paginationTabs: number;
  setPage: any;
}
export default function Pagination({
  page,
  paginationTabs,
  setPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={paginationTabs}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={(page) => setPage(page.selected)}
      forcePage={page}
      containerClassName="flex items-end justify-center border-t border-gray-200 text-gray-500 text-sm font-medium"
      previousLabel={
        <>
          <ArrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <p className="md:inline-flex">Previous</p>
        </>
      }
      previousClassName="md:flex flex-1 flex pr-5 hidden md:pr-0"
      previousLinkClassName="inline-flex border-t-2 border-transparent pt-4 pr-1 hover:text-gray-700 hover:border-gray-300"
      disabledLinkClassName="cursor-not-allowed text-gray-300 hover:text-gray-300 hover:border-transparent"
      nextLabel={
        <>
          <p className="md:inline-flex">Next</p>
          <ArrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </>
      }
      nextClassName="md:flex flex-1 justify-end pl-5 md: pl-0 hidden"
      nextLinkClassName="inline-flex border-t-2 border-transparent pt-4 pl-1 hover:text-gray-700 hover:border-gray-300"
      pageClassName="px-4 pt-4 hover:text-gray-700 hover:border-t-2 hover:border-gray-300"
      activeClassName="border-t-2 border-indigo-500 hover:border-indigo-500"
      activeLinkClassName="text-indigo-600"
      breakLabel="..."
      breakClassName="px-4 pt-4"
    />
  );
}
