import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { loadMyItems, type Item } from "../../features/items";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ItemCard } from "../../components/items";

export const Sell = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const { myItems, loading } = useAppSelector((state) => state.items);

    useEffect(() => {
        if (user) dispatch(loadMyItems({ id: user.id }));
    }, [dispatch, user]);

    const handleEdit = (item: Item) => {
        navigate(`/user/sell/item/${item.id}`, { state: { item } });
    };

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
        </Box>
    );

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                justifyContent: "center",
                p: 2,
            }}
        >
            {myItems.map((item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    isShowingButton={false}
                />
            ))}
        </Box>
    );
};