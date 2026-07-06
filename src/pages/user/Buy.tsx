import { useState } from "react";
import { Box, Typography, Button, Drawer, useMediaQuery, useTheme } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ItemCard, LoadMoreButton } from '../../components/items/';
import { useItemsLoader } from '../../hooks/useItemsLoader';
import { ActiveFilters, Sidebar } from "../../components/filters";

export const Buy = () => {
    const { items, loading, hasMore, loadMore, error } = useItemsLoader();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex', flex: 1, height: '100%' }}>
            {isDesktop ? (
                <Box
                    sx={{
                        position: 'sticky',
                        top: '80px',
                        height: 'calc(100vh - 80px)',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Sidebar />
                </Box>
            ) : (
                <Drawer
                    anchor="left"
                    open={filtersOpen}
                    onClose={() => setFiltersOpen(false)}
                    ModalProps={{ keepMounted: true }}
                >
                    <Box sx={{ width: 280, height: '100%' }}>
                        <Sidebar onApply={() => setFiltersOpen(false)} />
                    </Box>
                </Drawer>
            )}

            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: { xs: 1.5, sm: 2 } }}>
                {!isDesktop && (
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={() => setFiltersOpen(true)}
                        sx={{ mb: 2, alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
                    >
                        Search & filter
                    </Button>
                )}

                <ActiveFilters />

                <Box sx={{ flex: 1, display: "flex", flexWrap: "wrap", gap: { xs: 2, sm: 3, md: 5 }, justifyContent: "center" }}>
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
        </Box>
    );
};