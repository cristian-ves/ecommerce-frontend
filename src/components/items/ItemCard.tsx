import { Box, Button, Card, CardContent, Typography, IconButton } from "@mui/material";
import type { Item } from "../../features/items";
import { ItemImage, ItemInfo } from ".";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../features/cart";
import { useSnackbar } from "notistack";
import EditIcon from "@mui/icons-material/Edit";

interface ItemCardProps {
    item: Item;
    onEdit?: (item: Item) => void;
    isShowingButton?: boolean;
}

export const ItemCard = ({ item, onEdit, isShowingButton = true }: ItemCardProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.cart);
    const { enqueueSnackbar } = useSnackbar();

    const isMine = user?.id === item.user.id;

    const alreadyInCart = items.some((cartItem) => cartItem.item.id === item.id);

    const handleAddToCart = () => {
        if (!user) return;

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

            <ItemImage src={item.image} alt={item.name} />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <ItemInfo item={item} isMine={isMine} />
            </CardContent>

            {
                isShowingButton && (

                    <Box sx={{ padding: 1 }}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleAddToCart}
                            disabled={item.stock <= 0 || user?.id === item.user.id || alreadyInCart}
                        >
                            {user?.id === item.user.id
                                ? "Your Product"
                                : alreadyInCart
                                    ? "Already in Cart"
                                    : "Add to Cart"}
                        </Button>
                    </Box>
                )
            }
        </Card>
    );
};