import { memo, useState } from "react";
import { Box, Button, Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "notistack";

import type { Item } from "../../features/items";
import { addToCart } from "../../features/cart";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ItemImage, ItemInfo } from ".";

interface ItemCardProps {
    item: Item;
    onEdit?: (item: Item) => void;
    isShowingButton?: boolean;
}

export const ItemCard = memo(({ item, onEdit, isShowingButton = true }: ItemCardProps) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const alreadyInCart = useAppSelector((state) =>
        state.cart.items.some((cartItem) => cartItem.item.id === item.id)
    );
    const { enqueueSnackbar } = useSnackbar();

    const [optimisticAdded, setOptimisticAdded] = useState(false);

    const isMine = user?.id === item.user.id;

    const handleAddToCart = () => {
        if (!user) return;
        setOptimisticAdded(true);
        dispatch(addToCart({ userId: user.id, itemId: item.id, item }));
        enqueueSnackbar(`${item.name} added to cart!`, { variant: "success" });
    };

    return (
        <Card
            sx={{
                width: 280,
                height: 525,
                contentVisibility: "auto",
                containIntrinsicSize: "280px 525px",
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
            {isShowingButton && (
                <Box sx={{ padding: 1 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAddToCart}
                        disabled={item.stock <= 0 || isMine || alreadyInCart || optimisticAdded}
                    >
                        {isMine
                            ? "Your Product"
                            : alreadyInCart || optimisticAdded
                                ? "Already in Cart"
                                : "Add to Cart"}
                    </Button>
                </Box>
            )}
        </Card>
    );
});

ItemCard.displayName = "ItemCard";