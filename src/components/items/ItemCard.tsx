import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Item } from "../../features/items";
import { ItemInfo } from ".";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../features/cart";
import { useSnackbar } from "notistack";

interface CartProps {
    item: Item;
}

export const ItemCard = ({ item }: CartProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.cart)

    const { enqueueSnackbar } = useSnackbar();

    const handleAddToCart = () => {
        if (!user) return;

        if (user.id == item.user.id) {
            enqueueSnackbar(`${item.name} not added, it belongs to you`, { variant: "error" })
            return;
        }

        const alreadyInCart = items.some((cartItem) => cartItem.item.id == item.id);
        if (alreadyInCart) {
            enqueueSnackbar(`${item.name} is already in your cart!`, { variant: "warning" })
            return;
        }

        dispatch(addToCart({ userId: user.id, itemId: item.id }));
        enqueueSnackbar(`${item.name} added to cart!`, { variant: "success" })

    }

    return (
        <Card
            sx={{
                width: 280,
                height: 525,
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
                    onClick={() => handleAddToCart()}
                    disabled={item.stock <= 0}
                >
                    Add to Cart
                </Button>
            </Box>
        </Card>
    );
};
