import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Device } from "../../../models/models";
import devicesService from "../../../service/devices-service";
import toast from "react-hot-toast";
import { classNames } from "../../../utils/utils";

export interface UnattachedDevicesListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConnect: (deviceId: number) => void;
}
export default function UnattachedDevicesList({
  open,
  setOpen,
  onConnect,
}: UnattachedDevicesListProps) {
  const [devices, setDevices] = useState<Device[]>([]);

  const getDevicesWithoutHub = async () => {
    try {
      const devices: Device[] = await devicesService.getAllUnattachedDevices();
      setDevices(devices.filter((d) => d.hub === null));
    } catch (e: any) {
      toast.error(
        "Something went wrong while fetching the Devices. Please try again later."
      );
    }
  };
  useEffect(() => {
    getDevicesWithoutHub();
  }, [onConnect]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Devices
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                      {devices.map((d) => (
                        <li key={d.id}>
                          <div className="group relative flex items-center px-5 py-6">
                            <div
                              className="absolute inset-0 group-hover:bg-gray-50"
                              aria-hidden="true"
                            />
                            <div className="relative flex min-w-0 flex-1 items-center">
                              <span className="relative inline-block flex-shrink-0">
                                <span
                                  className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-gray-300"
                                  aria-hidden="true"
                                />
                              </span>
                              <div className="ml-4 truncate">
                                <p className="truncate text-sm font-medium text-gray-900">
                                  Product ID: {d.productId}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  Vendor ID: {d.vendorId}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  Description: {d.descriptor}
                                </p>
                              </div>
                            </div>
                            <Menu
                              as="div"
                              className="relative ml-2 inline-block flex-shrink-0 text-left"
                            >
                              <Menu.Button className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="sr-only">
                                  Open options menu
                                </span>
                                <span className="flex h-full w-full items-center justify-center rounded-full">
                                  <EllipsisVerticalIcon
                                    className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                </span>
                              </Menu.Button>
                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items className="absolute right-9 top-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={classNames(
                                            active
                                              ? "bg-gray-100 text-gray-900 "
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full"
                                          )}
                                          onClick={() => onConnect(d.id)}
                                        >
                                          Connect to Hub
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
