import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setQuery } from "../../features/items";
import { useProductSearch } from "../../hooks/useProductSearch";

interface SearchBarProps {
    onSearch?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.items.filters.query);
    const { runSearch } = useProductSearch();

    const handleSearch = () => {
        runSearch();
        onSearch?.();
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <Box>
            <TextField
                fullWidth
                size="small"
                placeholder="Search items..."
                value={query}
                onChange={(e) => dispatch(setQuery(e.target.value))}
                onKeyDown={handleKeyPress}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearch} edge="end">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};