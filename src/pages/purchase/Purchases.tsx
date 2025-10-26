import { Box, Typography, Card, CardContent, CardMedia, Divider, CircularProgress } from "@mui/material";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadPurchases } from "../../features/purchase/purchaseSlice";
import { searchItemsByQuery } from "../../features/items/itemsSlice";

export const Purchases = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { purchases, loading: purchasesLoading, error } = useAppSelector(
        (state) => state.purchases
    );
    const { items } = useAppSelector((state) => state.items);

    useEffect(() => {
        dispatch(searchItemsByQuery({ query: "" }));
    }, [dispatch]);

    useEffect(() => {
        if (user) dispatch(loadPurchases(user.id));
    }, [dispatch, user]);

    const getItemDetails = (itemId: number) =>
        items.find((i) => i.id === itemId);

    if (purchasesLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (purchases.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography>No purchases found.</Typography>
            </Box>
        );
    }

    return (
        <Box p={4} display="flex" flexDirection="column" gap={3}>
            <Typography variant="h4">Your Purchases</Typography>
            <Divider />

            {purchases.map((purchase) => {
                const totalAmount = purchase.items.reduce((sum, item) => {
                    const details = getItemDetails(item.itemId);
                    return sum + (details?.price || 0) * item.quantity;
                }, 0);

                return (
                    <Card key={purchase.purchaseId} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">
                                Purchase #{purchase.purchaseId} - Total: ${totalAmount.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Delivered: {purchase.delivered ? "Yes" : "No"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Delivery Date: {new Date(purchase.deliveryDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Created At: {new Date(purchase.createdAt).toLocaleDateString()}
                            </Typography>

                            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
                                {purchase.items.map((item) => {
                                    const itemDetails = getItemDetails(item.itemId);
                                    return (
                                        <Card key={item.itemId} sx={{ width: 120 }}>
                                            {itemDetails?.image && (
                                                <CardMedia
                                                    component="img"
                                                    image={itemDetails.image}
                                                    alt={itemDetails.name}
                                                    sx={{ width: "100%", height: 120, objectFit: "cover" }}
                                                />
                                            )}
                                            <CardContent sx={{ p: 1 }}>
                                                <Typography variant="body2" noWrap>
                                                    {itemDetails?.name || "Unknown Item"}
                                                </Typography>
                                                <Typography variant="caption">
                                                    Quantity: {item.quantity}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </Box>
                        </CardContent>
                    </Card>
                );
            })}
        </Box>
    );
};
