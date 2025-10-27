import { Box, Card, CardContent, CardMedia, Button, Typography } from "@mui/material";
import type { ItemRequest } from "../../features/mod";

interface ItemRequestCardProps {
    item: ItemRequest;
    onAccept?: (id: number) => void;
    onReject?: (id: number) => void;
}

export const ItemRequestCard = ({ item, onAccept, onReject }: ItemRequestCardProps) => {
    return (
        <Card
            sx={{
                width: 280,
                height: 525,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                m: 1
            }}
        >
            <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{
                    height: 180,
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="caption">
                    {item.isNew ? "Brand new" : "Gently used"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
                    ${item.price.toFixed(2)}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mt: 0.5, color: item.stock > 0 ? 'success.main' : 'error.main' }}
                >
                    {item.stock > 0 ? `In stock: ${item.stock}` : 'Out of stock'}
                </Typography>

                <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">
                        Submitted by: {item.user.name} ({item.user.email})
                    </Typography>
                    {item.user.suspended && (
                        <Typography variant="caption" color="error">
                            User suspended
                        </Typography>
                    )}
                </Box>
            </CardContent>

            <Box sx={{ display: "flex", gap: 1, p: 1 }}>
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => onAccept?.(item.id)}
                    disabled={item.accepted}
                >
                    Accept
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={() => onReject?.(item.id)}
                    disabled={item.rejected}
                >
                    Reject
                </Button>
            </Box>
        </Card>
    );
};
