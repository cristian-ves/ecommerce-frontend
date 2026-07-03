import { Card, CardContent, Typography, Box } from "@mui/material";
import { ItemPreview } from "./ItemPreview";
import type { PurchaseDTO } from "../../features/purchase/type";

interface PurchaseCardProps {
    purchase: PurchaseDTO;
}

export const PurchaseCard = ({ purchase }: PurchaseCardProps) => {


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
                    <strong>Total:</strong> ${purchase.total.toFixed(2)}
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
                    {purchase.items.map(({ itemId, name, image, price, quantity }) => {
                        return (
                            <ItemPreview
                                key={itemId}
                                name={name}
                                image={image}
                                price={price}
                                quantity={quantity}
                            />
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};
