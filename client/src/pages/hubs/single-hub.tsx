import { useParams } from "react-router-dom";
import Page from "../../components/page/page";
import SidebarLayout from "../../layouts/sidebar-layout";
import { Device, Hub } from "../../models/models";
import DevicesGrid from "./components/single-hub-devices";
import { useEffect, useState } from "react";
import hubsService from "../../service/hubs.service";
import NoDevicePlaceholder from "./components/no-devices-placeholder";
import ConfirmDisconnectDeviceModal from "./components/confirm-disconnect-device-modal";
import toast from "react-hot-toast";

export default function SingleHubPage() {
  let { id } = useParams();
  const [hub, setHub] = useState<Hub | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
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

  const openModal = (deviceId: number) => {
    setSelectedDeviceId(deviceId);
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    setShowConfirmModal(false);
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

  useEffect(() => {
    getSingleHub();
  }, []);

  return (
    <Page title={"Hub"}>
      <SidebarLayout>
        <div className="max-w-7xl mx-auto">
          <ConfirmDisconnectDeviceModal
            open={showConfirmModal}
            onCancel={closeModal}
            setOpen={setShowConfirmModal}
            onConfirm={removeDeviceFromHub}
          />
          <h1 className="text-2xl font-bold">
            Devices currently connected to Hub #{hub?.id}:
          </h1>
          <div className="max-w-4xl mx-auto py-32">
            {hub?.devices && hub?.devices.length > 0 ? (
              <DevicesGrid
                devices={hub.devices}
                onSelectDeviceToRemove={openModal}
              />
            ) : (
              <NoDevicePlaceholder />
            )}
          </div>
        </div>
      </SidebarLayout>
    </Page>
  );
}
