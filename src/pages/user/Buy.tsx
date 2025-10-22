
import { Box, Typography } from "@mui/material";

import { ItemCard, LoadMoreButton } from '../../components/items/';
import { useItemsLoader } from '../../hooks/useItemsLoader';
import { Sidebar } from "../../components/filters";

export const Buy = () => {
    const { items, loading, hasMore, loadMore, error } = useItemsLoader();

    const handleAddToCart = (id: number) => {
        console.log('Add item to cart:', id);
    };

    return (
        <Box sx={{ display: 'flex', flex: 1, height: '100%' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", p: 2 }}>
                {error ? (
                    <Typography variant="h5" color="error">{error}</Typography>
                ) : (
                    <>
                        {items.map((item) => (
                            <ItemCard key={item.id} handleAddToCart={handleAddToCart} item={item} />
                        ))}
                        <LoadMoreButton loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
                    </>
                )}
            </Box>
        </Box>
    );
};
