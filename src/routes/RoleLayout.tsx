import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../features/auth";

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    end?: boolean;
    bump?: boolean;
}

interface RoleLayoutProps {
    navItems: NavItem[];
    roleLabel?: string;
}

export const RoleLayout: React.FC<RoleLayoutProps> = ({
    navItems,
    roleLabel,
}) => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isItemActive = (item: NavItem) =>
        item.end
            ? location.pathname === item.path
            : location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);

    const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
    const handleDrawerClose = () => setDrawerOpen(false);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "background.default",
                color: "text.secondary",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "background.paper",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.07)",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Left side: hamburger on mobile/tablet, inline nav on desktop */}
                    {isDesktop ? (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            {navItems.map((item) => {
                                const isActive = isItemActive(item);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            startIcon={item.icon}
                                            variant={isActive ? "contained" : "text"}
                                            sx={{
                                                textTransform: "none",
                                                boxShadow: "none",
                                                transform: item.bump ? "scale(1.15)" : "scale(1)",
                                                transition: "transform 0.15s ease",
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </Box>
                    ) : (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open navigation menu"
                            onClick={handleDrawerToggle}
                            sx={{ color: "text.secondary" }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Right side: user greeting + logout */}
                    <Box display="flex" alignItems="center" gap={{ xs: 1.5, md: 3 }}>
                        {user && (
                            <Typography
                                variant="subtitle1"
                                color="secondary"
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Hello, {user.name} {roleLabel ? `(${roleLabel})` : ""}
                            </Typography>
                        )}

                        {isDesktop ? (
                            <Button
                                color="secondary"
                                variant="outlined"
                                sx={{ textTransform: "none" }}
                                onClick={() => dispatch(logout())}
                            >
                                Log out
                            </Button>
                        ) : (
                            <IconButton
                                color="secondary"
                                aria-label="log out"
                                onClick={() => dispatch(logout())}
                            >
                                <LogoutIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile/tablet nav drawer */}
            <Drawer
                anchor="left"
                open={!isDesktop && drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{ keepMounted: true }}
            >
                <Box sx={{ width: 260 }} role="presentation">
                    {user && (
                        <>
                            <Box sx={{ px: 2, py: 2 }}>
                                <Typography variant="subtitle1" color="secondary">
                                    Hello, {user.name} {roleLabel ? `(${roleLabel})` : ""}
                                </Typography>
                            </Box>
                            <Divider />
                        </>
                    )}
                    <List>
                        {navItems.map((item) => {
                            const isActive = isItemActive(item);
                            return (
                                <ListItemButton
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    selected={isActive}
                                    onClick={handleDrawerClose}
                                    sx={{
                                        transform: item.bump ? "scale(1.05)" : "scale(1)",
                                        transition: "transform 0.15s ease",
                                    }}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, flexGrow: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
};