import { Box, Chip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setQuery, toggleCategoryId, clearFilters } from "../../features/items";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";
import { useProductSearch } from "../../hooks/useProductSearch";
import { CATEGORY_NAME_TO_ID } from "../../features/items/categories";

export const ActiveFilters = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.items.filters.query);
    const { selectedCategories } = useCategoryFilter();
    const { runSearch } = useProductSearch();

    const hasActiveFilters = query.trim() !== "" || selectedCategories.length > 0;
    if (!hasActiveFilters) return null;

    const removeQuery = () => {
        dispatch(setQuery(""));
        runSearch();
    };

    const removeCategory = (name: string) => {
        dispatch(toggleCategoryId(CATEGORY_NAME_TO_ID[name]));
        runSearch();
    };

    const handleClearAll = () => {
        dispatch(clearFilters());
        runSearch();
    };

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center", mb: 2 }}>
            {query.trim() && (
                <Chip label={`"${query}"`} onDelete={removeQuery} size="small" />
            )}
            {selectedCategories.map((name) => (
                <Chip key={name} label={name} onDelete={() => removeCategory(name)} size="small" />
            ))}
            <Chip label="Clear all" onClick={handleClearAll} size="small" variant="outlined" />
        </Box>
    );
};