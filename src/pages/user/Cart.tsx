import { useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Divider,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    loadCart,
    addToCart,
    decrementFromCart,
    removeFromCart,
    clearUserCart,
    type CartItem,
} from "../../features/cart";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { CartItemCard } from "../../components/cart";
import { useNavigate } from "react-router-dom";


const MySwal = withReactContent(Swal);

export const Cart = () => {
    const dispatch = useAppDispatch();
    const { items, error } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(loadCart(user.id));
        }
    }, [dispatch, user]);

    const handleIncrement = (cartItem: CartItem) => {
        if (!user) return;
        dispatch(addToCart({ userId: user.id, itemId: cartItem.item.id }));
    };

    const handleDecrement = (cartItem: CartItem) => {
        if (!user) return;
        if (cartItem.quantity == 1) {
            MySwal.fire({
                title: <Typography variant="h6">This item will be removed from your cart</Typography>,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Remove",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#d32f2f",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(decrementFromCart({ userId: user.id, itemId: cartItem.item.id }));
                }
            })
        } else {
            dispatch(decrementFromCart({ userId: user.id, itemId: cartItem.item.id }));
        }
    };

    const handleRemove = (itemId: number) => {
        if (!user) return;

        dispatch(removeFromCart({ userId: user.id, itemId }));
    };

    const handleClearCart = () => {
        if (!user) return;
        dispatch(clearUserCart(user.id));
    };

    const total = items.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0
    );

    if (error) return <Typography color="error">{error}</Typography>;
    if (items.length === 0) return <Typography>Your cart is empty</Typography>;

    return (
        <Box p={4}>
            <Typography variant="h4" mb={2}>
                Shopping Cart
            </Typography>

            <Box display="flex" flexWrap="wrap" gap={2}>
                {items
                    .slice()
                    .sort((a, b) => a.item.name.localeCompare(b.item.name))
                    .map((cartItem) => (
                        <CartItemCard
                            key={cartItem.item.id}
                            cartItem={cartItem}
                            onIncrement={() => handleIncrement(cartItem)}
                            onDecrement={() => handleDecrement(cartItem)}
                            onRemove={() => handleRemove(cartItem.item.id)}
                            isMaxStock={cartItem.item.stock - cartItem.quantity <= 0}
                        />
                    ))}
            </Box>

            <Divider sx={{ my: 3 }} />
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

            <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClearCart}
                    sx={{ width: 300 }}
                >
                    Clear Cart
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { navigate("/user/cards") }}
                    sx={{ width: 300 }}
                >
                    Complete Payment
                </Button>
            </Box>
        </Box>
    );
};