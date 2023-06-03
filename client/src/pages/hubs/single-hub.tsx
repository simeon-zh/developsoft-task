import { useParams } from "react-router-dom";
import Page from "../../components/page/page";
import SidebarLayout from "../../layouts/sidebar-layout";
import { Hub } from "../../models/models";
import DevicesForHub from "./components/devices-for-hub";
import { useEffect, useState } from "react";
import hubsService from "../../service/hubs.service";
import NoDevicePlaceholder from "./components/no-devices-placeholder";
import ConfirmDisconnectDeviceModal from "./components/confirm-disconnect-device-modal";
import toast from "react-hot-toast";
import UnattachedDevicesList from "../devices/components/unattached-devices-list";

export default function SingleHubPage() {
  const { id } = useParams();
  const [hub, setHub] = useState<Hub | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [showDevicesList, setShowDevicesList] = useState<boolean>(false);

  const getSingleHub = async () => {
    if (id) {
      try {
        const hub = await hubsService.getSingleHub(parseInt(id));
        setHub(hub);
      } catch (e) {
        toast.error(
          "Something went wrong while fetching the Hub. Please try again later."
        );
      }
    }
  };

  const openConfirmModal = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const openDevicesList = () => {
    setShowDevicesList(true);
  };

  const removeDeviceFromHub = async () => {
    if (id && selectedDeviceId) {
      try {
        const hub = await hubsService.disconnectDeviceFromHub(
          parseInt(id),
          selectedDeviceId
        );
        setHub(hub);
        toast.success("Device disconnected successfully.");
      } catch (e: any) {
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setShowConfirmModal(false);
      }
    }
  };

  const connectDeviceToHub = async (deviceId: number) => {
    if (id) {
      try {
        const hub = await hubsService.connectDeviceToHub(
          parseInt(id),
          deviceId
        );
        setHub(hub);
        toast.success("Device connected successfully.");
      } catch (e: any) {
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setShowDevicesList(false);
      }
    }
  };

  useEffect(() => {
    getSingleHub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title={"Hub"}>
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          <ConfirmDisconnectDeviceModal
            open={showConfirmModal}
            onCancel={closeConfirmModal}
            setOpen={setShowConfirmModal}
            onConfirm={removeDeviceFromHub}
          />
          <UnattachedDevicesList
            open={showDevicesList}
            setOpen={setShowDevicesList}
            onConnect={connectDeviceToHub}
          />
          <h1 className="text-2xl font-bold">
            Devices currently connected to Hub #{hub?.id}:
          </h1>
          <div className="max-w-4xl mx-auto py-32">
            {hub?.devices && hub?.devices.length > 0 ? (
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={openDevicesList}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 mb-8 ml-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Connect More Devices
                </button>
                <DevicesForHub
                  devices={hub.devices}
                  onSelectDeviceToRemove={openConfirmModal}
                />
              </div>
            ) : (
              <NoDevicePlaceholder onClick={openDevicesList} />
            )}
          </div>
        </div>
      </SidebarLayout>
    </Page>
  );
}
