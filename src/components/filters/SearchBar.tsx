import { useState } from "react";

import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

import { useAppDispatch } from "../../store/hooks";
import { searchItemsByQuery } from "../../features/items";


export const SearchBar = () => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        dispatch(searchItemsByQuery({ query: query }));
    }

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
                onChange={(e) => setQuery(e.target.value)}
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
