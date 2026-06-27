import { Box, Typography } from "@mui/material";
import type { Item } from "../../features/items";
import { RatingStars } from "./";
import { useAppDispatch } from "../../store/hooks";
import { showReviewModal } from "../../helper/showReviewModal";
import { enqueueSnackbar } from "notistack";

interface ItemInfoProps {
    item: Item;
    userId?: number;
}

export const ItemInfo = ({ item, userId }: ItemInfoProps) => {
    const dispatch = useAppDispatch();

    const handleReview = () => {
        if (userId == item.user.id) {
            enqueueSnackbar(`${item.name} can't be rated, it belongs to you`, { variant: "error" })
            return;
        }
        showReviewModal(item.id, dispatch);
    };

    return (
        <Box>
            <Typography variant="caption">{item.new ? "Brand new" : "Gently used"}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{item.description}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 1, fontStyle: "italic", color: "text.secondary" }}>
                Category: {item.category.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
                ${item.price.toFixed(2)}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: item.stock > 0 ? 'success.main' : 'error.main' }}>
                {item.stock > 0 ? `In stock: ${item.stock}` : 'Out of stock'}
            </Typography>
            {!item.accepted && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    Not accepted
                </Typography>
            )}

            <RatingStars rating={item.rating} rates={item.rates} />

            <Typography
                component="span"
                onClick={handleReview}
                sx={{
                    mt: 1,
                    ml: 1,
                    textDecoration: "underline",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                    color: "primary.main",
                }}
            >
                Review
            </Typography>
        </Box>
    );
};
