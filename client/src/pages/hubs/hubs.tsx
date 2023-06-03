import Page from "../../components/page/page";
import SidebarLayout from "../../layouts/sidebar-layout";
import { useState, useEffect } from "react";

import Pagination from "../../components/pagination/pagination";
import HubsTable from "./components/hubs-table";
import { Hub } from "../../models/models";
import hubsService from "../../service/hubs.service";

export default function HubsPage() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const getDevices = async () => {
    const res: { hubs: Hub[]; totalItems: number } =
      await hubsService.getAllHubs(page, 10);
    setHubs(res.hubs);
    setTotalPages(Math.ceil(res.totalItems / 10));
  };
  useEffect(() => {
    getDevices();
  }, [page]);

  return (
    <Page title="Hubs">
      <SidebarLayout>
        <>
          <h1 className="text-2xl font-semibold px-8 md:mt-12">
            Connected Hubs:
          </h1>
          {totalPages > 1 && (
            <div className="mt-11 mx-auto lg:w-1/2">
              <Pagination
                page={page}
                paginationTabs={totalPages}
                setPage={setPage}
              />
            </div>
          )}
          <HubsTable hubs={hubs} />
        </>
      </SidebarLayout>
    </Page>
  );
}
