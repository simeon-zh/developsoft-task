import { Device } from "../../../models/models";
import { CheckIcon } from "@heroicons/react/20/solid";
export interface DevicesForHubProps {
  devices: Device[];
  onSelectDeviceToRemove: (deviceId: number) => void;
}

export default function DevicesForHub({
  devices,
  onSelectDeviceToRemove,
}: DevicesForHubProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {devices?.map((d, i) => (
          <li key={d.id}>
            <div className="relative pb-8">
              {i !== devices.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-green-500 ">
                    <CheckIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">{d.descriptor} </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <p className="text-sm text-gray-500">{d.productId} </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <p className="text-sm text-gray-500">{d.vendorId} </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => onSelectDeviceToRemove(d.id)}
                      className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Disconnect Device
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
