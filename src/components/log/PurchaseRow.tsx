import {
    Box,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import type { PurchaseDTO } from "../../features/purchase/type";

interface Props {
    purchase: PurchaseDTO;
    expanded: number | null;
    onToggleExpand: (id: number) => void;
    onEdit: (id: number, date: Date) => void;
    onDeliver: (id: number) => void;
}

export const PurchaseRow = ({
    purchase,
    expanded,
    onToggleExpand,
    onEdit,
    onDeliver,
}: Props) => {
    return (
        <>
            <TableRow key={purchase.purchaseId}>
                <TableCell>
                    <IconButton onClick={() => onToggleExpand(purchase.purchaseId)}>
                        {expanded === purchase.purchaseId ? (
                            <ExpandLessIcon />
                        ) : (
                            <ExpandMoreIcon />
                        )}
                    </IconButton>
                </TableCell>

                <TableCell>{purchase.purchaseId}</TableCell>
                <TableCell>{purchase.userId}</TableCell>
                <TableCell>${purchase.total.toFixed(2)}</TableCell>
                <TableCell>{new Date(purchase.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(purchase.deliveryDate).toLocaleDateString()}</TableCell>
                <TableCell>{purchase.delivered ? "Yes" : "No"}</TableCell>

                <TableCell align="center">
                    {!purchase.delivered && (
                        <>
                            <IconButton
                                color="primary"
                                onClick={() => onEdit(purchase.purchaseId, purchase.deliveryDate)}
                            >
                                <EditIcon />
                            </IconButton>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => onDeliver(purchase.purchaseId)}
                                sx={{ ml: 1 }}
                            >
                                Deliver
                            </Button>
                        </>
                    )}
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell colSpan={8} sx={{ p: 0 }}>
                    <Collapse in={expanded === purchase.purchaseId} timeout="auto" unmountOnExit>
                        <Box sx={{ m: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                Items
                            </Typography>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item ID</TableCell>
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Purchase ID</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {purchase.items.map((i) => (
                                        <TableRow key={`${i.itemId}-${i.purchaseId}`}>
                                            <TableCell>{i.itemId}</TableCell>
                                            <TableCell>{i.userId}</TableCell>
                                            <TableCell>{i.purchaseId}</TableCell>
                                            <TableCell>{i.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};
