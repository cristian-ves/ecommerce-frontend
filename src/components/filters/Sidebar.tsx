import { Box } from "@mui/material";
import { CategoryFilter, SearchBar } from "./";

export const Sidebar = () => {
    return (
        <Box sx={{ width: 250, p: 2, borderRight: '1px solid #ccc', height: '100%' }}>
            <SearchBar />
            <CategoryFilter />
        </Box>
    );
};
