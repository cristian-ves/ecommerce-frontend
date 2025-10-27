import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadMyItems } from "../../features/items";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ItemInfo } from "../../components/items";

export const Sell = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const { myItems } = useAppSelector((state) => state.items);

    useEffect(() => {
        if (user) {
            dispatch(loadMyItems({ id: user.id }));
        }
    }, [dispatch, user]);


    return (
        <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", p: 2 }}>
            {
                myItems.map(item =>
                (
                    <Card
                        key={item.id}
                        sx={{
                            width: 280,
                            height: 500,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
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
                )
                )

            }
        </Box>
    );
};
