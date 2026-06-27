import { Box, Typography } from "@mui/material";
import { ItemCard, LoadMoreButton } from '../../components/items/';
import { useItemsLoader } from '../../hooks/useItemsLoader';
import { Sidebar } from "../../components/filters";

export const Buy = () => {
    const { items, loading, hasMore, loadMore, error } = useItemsLoader();

    return (
        <Box sx={{ display: 'flex', flex: 1, height: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: '80px',
                    height: 'calc(100vh - 80px)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Sidebar />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", p: 2 }}>
                {error ? (
                    <Typography variant="h5" color="error">{error}</Typography>
                ) : (
                    <>
                        {items.map((item) => (
                            <ItemCard key={item.id} item={item} />
                        ))}
                        <LoadMoreButton loading={loading} hasMore={hasMore} onLoadMore={loadMore} />
                    </>
                )}
            </Box>
        </Box>
    );
};