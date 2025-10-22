import { useEffect, useRef, useState } from 'react';
import { Box, Button, CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadItems } from "../../features/items/";
import { ItemCard } from '../../components/items/ItemCard';

export const ITEMS_TO_LOAD = 30;

export const Buy = () => {

    const firstLoadRef = useRef(true);
    const dispatch = useAppDispatch();
    const { items, loading, page, hasMore } = useAppSelector(
        (state) => state.items
    );

    useEffect(() => {
        if (firstLoadRef.current) {
            dispatch(loadItems({ page: 0, size: ITEMS_TO_LOAD }));
            firstLoadRef.current = false;
        }
    }, [dispatch]);


    const handleLoadMore = () => {
        if (!loading && hasMore) {
            dispatch(loadItems({ page: page, size: ITEMS_TO_LOAD }));
        }
    };

    const handleAddToCart = () => {
        console.log('hello')
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                justifyContent: "center",
                padding: 2,
            }}
        >
            {items.map((item) => (
                <ItemCard key={item.id} handleAddToCart={handleAddToCart} item={item} />
            ))}

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: 4,
                }}
            >
                {loading ? (
                    <CircularProgress />
                ) : hasMore ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoadMore}
                    >
                        Load More
                    </Button>
                ) : (
                    <Button variant="outlined" disabled>
                        No more items
                    </Button>
                )}
            </Box>

        </Box>
    );
};
