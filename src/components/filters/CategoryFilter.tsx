import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";
import { useProductSearch } from "../../hooks/useProductSearch";
import { useDebouncedCallback } from "../../hooks/useDebouncedCallback";
import { CATEGORY_NAMES } from "../../features/items/categories";

export const CategoryFilter = () => {
    const { selectedCategories, toggleCategory } = useCategoryFilter();
    const { runSearch } = useProductSearch();
    const debouncedSearch = useDebouncedCallback(runSearch, 400);

    const handleToggle = (category: string) => {
        toggleCategory(category);
        debouncedSearch();
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Categories</Typography>
            {CATEGORY_NAMES.map(category => (
                <FormControlLabel
                    key={category}
                    control={
                        <Checkbox
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleToggle(category)}
                        />
                    }
                    label={category}
                />
            ))}
        </Box>
    );
};