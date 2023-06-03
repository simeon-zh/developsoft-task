import Page from "../../components/page/page";
import SidebarLayout from "../../layouts/sidebar-layout";
import { useEffect, useState } from "react";

import Pagination from "../../components/pagination/pagination";
import DevicesTable from "./components/devices-table";
import { Device } from "../../models/models";
import devicesService from "../../service/devices-service";
import toast from "react-hot-toast";
export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const getDevices = async () => {
    try {
      const res: { devices: Device[]; totalItems: number } =
        await devicesService.getPaginatedDevices(page, 10);
      setDevices(res.devices);
      setTotalPages(Math.ceil(res.totalItems / 10));
    } catch (e: any) {
      toast.error(
        "Something went wrong while fetching the Devices. Please try again later."
      );
    }
  };
  useEffect(() => {
    getDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <Page title="Devices">
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
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
          <DevicesTable devices={devices} />
        </div>
      </SidebarLayout>
    </Page>
  );
}
