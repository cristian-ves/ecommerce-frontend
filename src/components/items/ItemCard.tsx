import { Box, Button, Card, CardContent, CardMedia, Typography, IconButton } from "@mui/material";
import type { Item } from "../../features/items";
import { ItemInfo } from ".";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../features/cart";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";

interface ItemCardProps {
    item: Item;
    isMine?: boolean;
    onEdit?: (item: Item) => void;
}

export const ItemCard = ({ item, isMine = false, onEdit }: ItemCardProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.cart);
    const { enqueueSnackbar } = useSnackbar();

    const handleAddToCart = () => {
        if (!user) return;

        if (user.id === item.user.id || isMine) {
            enqueueSnackbar(`${item.name} belongs to you! You cannot buy your own item.`, { variant: "error" });
            return;
        }

        const alreadyInCart = items.some((cartItem) => cartItem.item.id === item.id);
        if (alreadyInCart) {
            enqueueSnackbar(`${item.name} is already in your cart!`, { variant: "warning" });
            return;
        }

        dispatch(addToCart({ userId: user.id, itemId: item.id }));
        enqueueSnackbar(`${item.name} added to cart!`, { variant: "success" });
    };

    return (
        <Card
            sx={{
                width: 280,
                height: 525,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
            }}
        >
            {isMine && onEdit && (
                <IconButton
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        bgcolor: "background.paper",
                        boxShadow: 1,
                        "&:hover": { bgcolor: "grey.100" },
                    }}
                    onClick={() => onEdit(item)}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
            )}

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
                <ItemInfo item={item} userId={user?.id} />
            </CardContent>

            {!isMine && (
                <Box sx={{ padding: 1 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAddToCart}
                        disabled={item.stock <= 0 || user?.id === item.user.id}
                    >
                        {user?.id === item.user.id ? "Your Product" : "Add to Cart"}
                    </Button>
                </Box>
            )}
        </Card>
    );
};