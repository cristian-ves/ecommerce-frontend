import { Box, Typography, Button, Stack, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SELLER_ROUTES = [
    { label: "My Items", path: "/user/sell", icon: <Inventory2Icon fontSize="small" /> },
    { label: "Add Item", path: "/user/sell/add", icon: <AddCircleOutlineIcon fontSize="small" /> },
];

export const SellLayout = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = SELLER_ROUTES.findIndex((route) =>
        route.path === "/user/sell"
            ? location.pathname === route.path
            : location.pathname.startsWith(route.path)
    );

    return (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, height: "100vh", overflow: "hidden" }}>
            {isDesktop ? (
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
                        {SELLER_ROUTES.map((route) => (
                            <NavLink key={route.path} to={route.path} end={route.path === "/user/sell"} style={{ textDecoration: "none" }}>
                                {({ isActive }) => (
                                    <Button
                                        startIcon={route.icon}
                                        fullWidth
                                        variant={isActive ? "contained" : "outlined"}
                                        sx={{ justifyContent: "flex-start", textTransform: "none" }}
                                    >
                                        {route.label}
                                    </Button>
                                )}
                            </NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : (
                <Tabs
                    value={activeTab === -1 ? 0 : activeTab}
                    onChange={(_, newValue) => navigate(SELLER_ROUTES[newValue].path)}
                    variant="fullWidth"
                    sx={{
                        borderBottom: "1px solid #ccc",
                        bgcolor: "background.paper",
                        flexShrink: 0,
                    }}
                >
                    {SELLER_ROUTES.map((route) => (
                        <Tab
                            key={route.path}
                            icon={route.icon}
                            iconPosition="start"
                            label={route.label}
                            sx={{ textTransform: "none", minHeight: 48 }}
                        />
                    ))}
                </Tabs>
            )}

            <Box
                sx={{
                    flex: 1,
                    ml: { xs: 0, md: "250px" },
                    p: { xs: 2, sm: 3 },
                    overflowY: "auto",
                    height: { xs: "auto", md: "calc(100vh - 64px)" },
                    width: "100%",
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};