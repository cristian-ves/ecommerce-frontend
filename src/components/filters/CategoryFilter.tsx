import { Box, FormControlLabel, Checkbox, Typography, Button } from "@mui/material";
import { applyFilters } from "../../features/items";
import { useCategoryFilter } from "../../hooks/useCategoryFilter";
import { useAppDispatch } from "../../store/hooks";

const categories = ['Technology', 'Home', 'Academic', 'Personal', 'Decoration', 'Other'];

const categoryNameToId: Record<string, number> = {
    Technology: 1,
    Home: 2,
    Academic: 3,
    Personal: 4,
    Decoration: 5,
    Other: 6,
};

export const CategoryFilter = () => {
    const dispatch = useAppDispatch();
    const { selectedCategories, toggleCategory } = useCategoryFilter();

    const handleApplyFilter = () => {
        const categoryIds = selectedCategories.map(name => categoryNameToId[name]);
        dispatch(applyFilters({ categoryIds }));
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Categories</Typography>
            {categories.map(category => (
                <FormControlLabel
                    key={category}
                    control={
                        <Checkbox
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                        />
                    }
                    label={category}
                />
            ))}
            <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                disabled={selectedCategories.length === 0}
                onClick={handleApplyFilter}
            >
                Apply filters
            </Button>
        </Box>
    );
};
