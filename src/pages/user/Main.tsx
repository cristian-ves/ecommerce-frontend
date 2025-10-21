import { Box, Typography } from "@mui/material";

export const Main = () => {
    return (
        <Box>
            <Typography variant="h4">Welcome to the Marketplace</Typography>
            <Typography sx={{ mt: 2 }} color="text.secondary">
                Choose an action from the navigation above.
            </Typography>
        </Box>
    );
};
