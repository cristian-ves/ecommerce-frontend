import { Box, Typography } from "@mui/material";
import type { Item } from "../../features/items";
import { RatingStars } from "./RatingStars";

interface ItemInfoProps {
    item: Item;
}

export const ItemInfo = ({ item }: ItemInfoProps) => (
    <Box>
        <Typography variant="caption">{item.new ? "Brand new" : "Gently used"}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
            {item.description}
        </Typography>
        <Typography variant="subtitle2" sx={{ mt: 1, fontStyle: "italic", color: "text.secondary" }}>
            Category: {item.category.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
            ${item.price.toFixed(2)}
        </Typography>
        <RatingStars rating={item.rating} rates={item.rates} />
    </Box>
);
