import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadMyItems, type Item } from "../../features/items";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
} from "@mui/material";
import { ItemInfo } from "../../components/items";
import EditIcon from "@mui/icons-material/Edit";
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
        navigate(`/user/sell/item/${item.id}`, { state: { item } })
    }

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
                <Card
                    key={item.id}
                    sx={{
                        width: 280,
                        height: 500,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        position: "relative",
                    }}
                >
                    <IconButton
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "background.paper",
                            boxShadow: 1,
                            "&:hover": { bgcolor: "grey.100" },
                        }}
                        onClick={() => { handleEdit(item) }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>

                    <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{
                            height: 180,
                            aspectRatio: "1 / 1",
                            objectFit: "cover",
                        }}
                    />

                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{item.name}</Typography>
                        <ItemInfo item={item} />
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};
