import Page from "../../components/page/page";
import SidebarLayout from "../../layouts/sidebar-layout";
import { useState, useEffect } from "react";

import Pagination from "../../components/pagination/pagination";
import HubsTable from "./components/hubs-table";
import { Hub } from "../../models/models";
import hubsService from "../../service/hubs.service";
import toast from "react-hot-toast";
export default function HubsPage() {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const getHubs = async () => {
    try {
      const res: { hubs: Hub[]; totalItems: number } =
        await hubsService.getAllHubs(page, 10);
      setHubs(res.hubs);
      setTotalPages(Math.ceil(res.totalItems / 10));
    } catch (e: any) {
      toast.error(
        "Something went wrong while fetching the Hubs. Please try again later."
      );
    }
  };
  useEffect(() => {
    getHubs();
  }, [page]);

  return (
    <Page title="Hubs">
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
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
        </div>
      </SidebarLayout>
    </Page>
  );
}
