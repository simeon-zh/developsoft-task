import Table from "../../../components/table/table";
import TableCell from "../../../components/table/table-cell/table-cell";
import { Device } from "../../../models/models";
export interface DevicesTableProps {
  devices: Device[];
}
export default function DevicesTable({ devices }: DevicesTableProps) {
  const headers = [
    "Product ID",
    "Vendor ID",
    "Description",
    "Connection Status",
    "",
  ];
  const isDeviceConnected = (device: Device) => {
    return device.hub !== null;
  };

  return (
    <Table hasContent={Boolean(devices.length)} headers={headers}>
      {devices.map((d) => (
        <tr key={d.id}>
          <TableCell>{d.productId}</TableCell>
          <TableCell>{d.vendorId}</TableCell>
          <TableCell>{d.descriptor}</TableCell>
          <TableCell>
            <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-lg text-gray-900 ring-1 ring-inset ring-gray-200">
              {isDeviceConnected(d) ? (
                <>
                  <svg
                    className="h-1.5 w-1.5 fill-green-500 animate-pulse"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  {`Connected to Hub#${d.hub.id}`}
                </>
              ) : (
                <>
                  <svg
                    className="h-1.5 w-1.5 fill-gray-500"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  Not Connected
                </>
              )}
            </span>
          </TableCell>

          {isDeviceConnected(d) ? (
            <TableCell>
              <button>Disconnect</button>
            </TableCell>
          ) : (
            <TableCell>
              <button>Connect</button>
            </TableCell>
          )}
        </tr>
      ))}
    </Table>
  );
}
