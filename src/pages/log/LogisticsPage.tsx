import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import { PurchaseRow } from "../../components/log/PurchaseRow";
import { EditDeliveryDateDialog } from "../../components/log/EditDeliveryDateDialog";
import { useLogistics } from "../../hooks/useLogistics";

export const LogisticsPage = () => {
  const {
    purchases,
    openDialog,
    newDate,
    setNewDate,
    expanded,
    handleOpenEdit,
    handleClose,
    handleSaveDate,
    handleDeliver,
    toggleExpand,
  } = useLogistics();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Purchases Management
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Purchase ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Delivery Date</TableCell>
              <TableCell>Delivered</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((p) => (
              <PurchaseRow
                key={p.purchaseId}
                purchase={p}
                expanded={expanded}
                onToggleExpand={toggleExpand}
                onEdit={handleOpenEdit}
                onDeliver={handleDeliver}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditDeliveryDateDialog
        open={openDialog}
        newDate={newDate}
        onClose={handleClose}
        onSave={handleSaveDate}
        setNewDate={setNewDate}
      />
    </Box>
  );
};
