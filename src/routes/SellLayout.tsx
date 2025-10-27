import { Box, Typography, Button, Stack } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const SellLayout = () => {
    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Box
                sx={{
                    width: 250,
                    p: 3,
                    borderRight: "1px solid #ccc",
                    position: "fixed",
                    top: 64,
                    left: 0,
                    bottom: 0,
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    zIndex: 10,
                }}
            >
                <Typography variant="h6" mb={2}>
                    Seller Menu
                </Typography>

                <Stack spacing={2} width="100%">
                    <NavLink
                        to="/user/sell"
                        end
                        style={{ textDecoration: "none" }}
                    >
                        {({ isActive }) => (
                            <Button
                                startIcon={<Inventory2Icon />}
                                fullWidth
                                variant={isActive ? "contained" : "outlined"}
                                sx={{
                                    justifyContent: "flex-start",
                                    textTransform: "none",
                                }}
                            >
                                My Items
                            </Button>
                        )}
                    </NavLink>

                    <NavLink
                        to="/user/sell/add"
                        style={{ textDecoration: "none" }}
                    >
                        {({ isActive }) => (
                            <Button
                                startIcon={<AddCircleOutlineIcon />}
                                fullWidth
                                variant={isActive ? "contained" : "outlined"}
                                sx={{
                                    justifyContent: "flex-start",
                                    textTransform: "none",
                                }}
                            >
                                Add Item
                            </Button>
                        )}
                    </NavLink>
                </Stack>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    ml: "250px",
                    p: 3,
                    overflowY: "auto",
                    height: "calc(100vh - 64px)",
                    width: '100%'
                }}
            >

                <Outlet />
            </Box>
        </Box>
    );
};
