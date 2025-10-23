import { Outlet, NavLink } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaShoppingBag, FaDollarSign } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../features/auth";

export const UserRoutes = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const navItems = [
        { label: "Home", path: "/user", icon: <HomeIcon /> },
        { label: "Buy", path: "/user/buy", icon: <FaShoppingBag /> },
        { label: "Sell", path: "/user/sell", icon: <FaDollarSign /> },
        { label: `Cart (${items.length || 0})`, path: "/user/cart", icon: <ShoppingCartIcon /> },
    ];

    //TODO: make this responsive
    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <AppBar position="sticky" sx={{ bgcolor: "background.paper", boxShadow: '0 8px 16px rgba(0,0,0,0.07)' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === "/user"}
                                style={{ textDecoration: "none" }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        startIcon={item.icon}
                                        variant={isActive ? "contained" : "text"}
                                        sx={{ textTransform: "none", boxShadow: 'none' }}
                                    >
                                        {item.label}
                                    </Button>
                                )}
                            </NavLink>
                        ))}
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={3}>

                        {user && (
                            <Typography variant="subtitle1" color="text.primary">
                                Hello, {user.name}
                            </Typography>
                        )}
                        <Button color="secondary" variant="outlined" sx={{ textTransform: "none" }} onClick={() => { dispatch(logout()) }}>
                            Log out
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 4, flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
};
