import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
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

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (myItems.length === 0) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="60vh"
                gap={1}
                px={2}
                textAlign="center"
            >
                <Typography variant="h6" color="text.secondary">
                    You haven't listed any items yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Items you list for sale will show up here.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 2, sm: 3, md: 5 },
                justifyContent: "center",
                p: { xs: 1.5, sm: 2 },
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