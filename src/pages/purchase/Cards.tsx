import { Box, Button, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCardForm } from "../../hooks/useCardForm";
import { loadCards, purchaseThunk, saveCard as saveCardThunk } from "../../features/purchase/purchaseSlice";
import { CardSelector } from "../../components/purchases/CardSelector";
import { CardForm } from "../../components/purchases/CardForm";
import { loadItems, resetItems } from "../../features/items";
import { ITEMS_TO_LOAD } from "../../hooks/useItemsLoader";
import { loadCart } from "../../features/cart";
import { useNavigate } from "react-router-dom";


const MySwal = withReactContent(Swal);

export const Cards = () => {
    const [selectedCard, setSelectedCard] = useState("");
    const [showForm, setShowForm] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { cards } = useAppSelector((state) => state.purchases);
    const { items } = useAppSelector((state) => state.cart);
    const navigate = useNavigate();

    const { cardData, saveCard, setSaveCard, handleChange, validateCardForm } =
        useCardForm();

    useEffect(() => {
        if (user) dispatch(loadCards(user.id));
    }, [dispatch, user]);

    const total = items.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0
    );

    const handleConfirmPurchase = async () => {
        if (showForm) {
            if (!validateCardForm()) return;

            if (user) {
                const resultAction = await dispatch(
                    saveCardThunk({ ...cardData, userId: user.id })
                );

                if (saveCardThunk.fulfilled.match(resultAction)) {
                    const id = resultAction.payload.id;

                    await dispatch(
                        purchaseThunk({
                            userId: user.id,
                            cardId: id,
                            items: items.map((cartItem) => ({ quantity: cartItem.quantity, userId: user.id, itemId: cartItem.item.id })),
                        })
                    );

                    dispatch(resetItems())
                    dispatch(loadItems({ page: 0, size: ITEMS_TO_LOAD }));
                    dispatch(loadCart(user.id));

                    navigate("/user/purchases")

                    MySwal.fire({
                        icon: "success",
                        title: "Purchase Completed",
                        text: "Your card was saved and the purchase completed successfully!",
                    });
                } else {
                    MySwal.fire({
                        icon: "error",
                        title: "Failed to save card",
                        text: resultAction.payload as string,
                    });
                }
            }
        } else if (selectedCard === "") {
            MySwal.fire({
                icon: "error",
                title: "No card selected",
                text: "Please select a saved card or add a new one.",
            });
        } else {

            if (user) {

                await dispatch(
                    purchaseThunk({
                        userId: user.id,
                        cardId: Number(selectedCard),
                        items: items.map((cartItem) => ({ quantity: cartItem.quantity, userId: user.id, itemId: cartItem.item.id })),
                    })
                );

                dispatch(resetItems())
                dispatch(loadItems({ page: 0, size: ITEMS_TO_LOAD }));
                dispatch(loadCart(user.id));

                navigate("/user/purchases");

                MySwal.fire({
                    icon: "success",
                    title: "Purchase Confirmed",
                    text: "Your purchase was confirmed successfully!",
                });
            }
        }
    };


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            gap={3}
            p={4}
        >
            <Typography variant="h4" gutterBottom>
                Select Payment Method
            </Typography>

            <CardSelector
                cards={cards}
                selectedCard={selectedCard}
                showForm={showForm}
                onSelectCard={setSelectedCard}
                onToggleForm={() => setShowForm((prev) => !prev)}
            />

            {showForm && (
                <CardForm
                    cardData={cardData}
                    saveCard={saveCard}
                    onChange={handleChange}
                    onToggleSave={setSaveCard}
                    onHide={() => setShowForm(false)}
                />
            )}

            <Divider sx={{ width: "100%", maxWidth: 500 }} />

            <Typography variant="h6">
                Total Amount: ${total.toFixed(2)}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                sx={{ width: "100%", maxWidth: 300, mt: 1 }}
                onClick={handleConfirmPurchase}
                disabled={!selectedCard && !showForm}
            >
                Confirm Purchase
            </Button>
        </Box>
    );
};
