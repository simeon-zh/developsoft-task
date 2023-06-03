import { useNavigate } from "react-router-dom";
import Table from "../../../components/table/table";
import TableCell from "../../../components/table/table-cell/table-cell";
import { Hub } from "../../../models/models";
export interface HubsTableProps {
  hubs: Hub[];
}
export default function HubsTable({ hubs }: HubsTableProps) {
  const headers = [
    "Product ID",
    "Vendor ID",
    "Description",
    "Connected Devices",
    "",
  ];

  const navigate = useNavigate();

  const goToSingleHubPage = (hubId: number) => {
    navigate(`/hubs/${hubId}`);
  };

  return (
    <Table hasContent={Boolean(hubs.length)} headers={headers}>
      {hubs.map((h) => (
        <tr key={h.id}>
          <TableCell>{h.productId}</TableCell>
          <TableCell>{h.vendorId}</TableCell>
          <TableCell>{h.descriptor}</TableCell>
          <TableCell>{h.devices.length}</TableCell>

          <TableCell>
            <button type="button" onClick={() => goToSingleHubPage(h.id)}>
              View Device Tree
            </button>
          </TableCell>
        </tr>
      ))}
    </Table>
  );
}
