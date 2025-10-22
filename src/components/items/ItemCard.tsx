import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Item } from "../../features/items";
import { ItemInfo } from ".";

interface CartProps {
    item: Item;
    handleAddToCart: (id: number) => void;
}

export const ItemCard = ({ item, handleAddToCart }: CartProps) => {
    return (
        <Card
            sx={{
                width: 280,
                height: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
                <ItemInfo item={item} />
            </CardContent>
            <Box sx={{ padding: 1 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(item.id)}
                    disabled={item.stock <= 0}
                >
                    Add to Cart
                </Button>
            </Box>
        </Card>
    );
};
