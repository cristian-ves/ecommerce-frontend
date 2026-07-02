import { Box, Paper, Typography, IconButton } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import type { CartItem } from "../../features/cart";
import { CircleIconButton } from "./CircleIconButton";

interface Props {
    cartItem: CartItem;
    onIncrement: (cartItem: CartItem) => void;
    onDecrement: (cartItem: CartItem) => void;
    onRemove: (itemId: number) => void;
    isMaxStock: boolean;
}

export const CartItemCard = ({ cartItem, onIncrement, onDecrement, onRemove, isMaxStock }: Props) => (
    <Paper
        sx={{
            display: "flex",
            position: "relative",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: 4,
            boxShadow: "0 4px 4px rgba(0,0,0,0.05)",
            flex: "1 1 100%",
            maxWidth: { xs: "100%", sm: "48%", lg: "32%" },
        }}
    >
        <IconButton
            onClick={() => onRemove(cartItem.item.id)}
            sx={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 32,
                height: 32,
                borderRadius: "50%",
                p: 0,
            }}
        >
            <Delete fontSize="small" />
        </IconButton>

        <img
            src={cartItem.item.image}
            alt={cartItem.item.name}
            style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 8 }}
        />

        <Box flexGrow={1}>
            <Typography variant="h6">{cartItem.item.name}</Typography>
            <Typography variant="body2" color="text.secondary">
                {cartItem.item.new ? "Brand New" : "Gently Used"}
            </Typography>
            <Typography>${cartItem.item.price.toFixed(2)}</Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
                <CircleIconButton onClick={() => onDecrement(cartItem)}>
                    <Remove fontSize="small" />
                </CircleIconButton>

                <Typography>{cartItem.quantity}</Typography>

                <CircleIconButton onClick={() => onIncrement(cartItem)} disabled={isMaxStock} >
                    <Add fontSize="small" />
                </CircleIconButton>
            </Box>
            {isMaxStock && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    Max stock reached
                </Typography>
            )}
        </Box>

    </Paper>
);
