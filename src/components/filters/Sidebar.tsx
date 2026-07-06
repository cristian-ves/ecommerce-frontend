import { Box, Button } from "@mui/material";
import { CategoryFilter, SearchBar } from "./";

interface SidebarProps {
    onApply?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onApply }) => {
    return (
        <Box
            sx={{
                width: { xs: '100%', md: 250 },
                p: 2,
                borderRight: { xs: 'none', md: '1px solid #ccc' },
                height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <SearchBar onSearch={onApply} />
            <CategoryFilter />
            {onApply && (
                <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={onApply}>
                    Show results
                </Button>
            )}
        </Box>
    );
};