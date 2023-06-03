import Page from "../components/page/page";
import SidebarLayout from "../layouts/sidebar-layout";
import { useState } from "react";

import Pagination from "../components/pagination/pagination";

export default function DevicesPage() {
  const [page, setPage] = useState<number>(0);
  const totalPages = 10;
  return (
    <Page title="Home">
      <SidebarLayout>
        <>
          <h1 className="text-2xl font-semibold px-8 md:mt-12">Devices:</h1>
          {totalPages > 1 && (
            <div className="mt-11 mx-auto lg:w-1/2">
              <Pagination
                page={page}
                paginationTabs={totalPages}
                setPage={setPage}
              />
            </div>
          )}
        </>
      </SidebarLayout>
    </Page>
  );
}
