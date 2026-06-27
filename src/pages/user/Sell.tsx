import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadMyItems, type Item } from "../../features/items";
import { Box } from "@mui/material";
import { ItemCard } from "../../components/items";
import { useNavigate } from "react-router-dom";

export const Sell = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.auth);
    const { myItems } = useAppSelector((state) => state.items);

    useEffect(() => {
        if (user) {
            dispatch(loadMyItems({ id: user.id }));
        }
    }, [dispatch, user]);

    const handleEdit = (item: Item) => {
        navigate(`/user/sell/item/${item.id}`, { state: { item } });
    };

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
                    isMine={true}
                    onEdit={handleEdit}
                />
            ))}
        </Box>
    );
};