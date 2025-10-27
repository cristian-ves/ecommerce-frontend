import { Card, CardContent, Typography, Box } from "@mui/material";
import { ItemPreview } from "./ItemPreview";
import type { PurchaseDTO } from "../../features/purchase/type";

interface PurchaseCardProps {
    purchase: PurchaseDTO;
    getItemDetails: (id: number) => any;
}

export const PurchaseCard = ({ purchase, getItemDetails }: PurchaseCardProps) => {
    const total = purchase.items.reduce((sum, item) => {
        const details = getItemDetails(item.itemId);
        return sum + (details?.price || 0) * item.quantity;
    }, 0);

    return (
        <Card
            sx={{
                mb: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                borderRadius: 2,
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Purchase #{purchase.purchaseId}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    <strong>Total:</strong> ${total.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Delivered:</strong> {purchase.delivered ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Expected Delivery:</strong>{" "}
                    {new Date(purchase.deliveryDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Created:</strong>{" "}
                    {new Date(purchase.createdAt).toLocaleDateString()}
                </Typography>

                <Box
                    mt={2}
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="flex-start"
                    gap={2}
                >
                    {purchase.items.map((item) => {
                        const itemDetails = getItemDetails(item.itemId);
                        return (
                            <ItemPreview
                                key={item.itemId}
                                name={itemDetails?.name || "Unknown"}
                                image={itemDetails?.image}
                                price={itemDetails?.price}
                                quantity={item.quantity}
                            />
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};
