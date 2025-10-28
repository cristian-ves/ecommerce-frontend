import { Outlet, NavLink } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../features/auth";

interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
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

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.secondary", display: "flex", flexDirection: "column" }}>
            <AppBar position="sticky" sx={{ bgcolor: "background.paper", boxShadow: '0 8px 16px rgba(0,0,0,0.07)' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end
                                style={{ textDecoration: "none" }}
                            >
                                {({ isActive }) => (
                                    <Button
                                        startIcon={item.icon}
                                        variant={isActive ? "contained" : "text"}
                                        sx={{ textTransform: "none", boxShadow: "none" }}
                                    >
                                        {item.label}
                                    </Button>
                                )}
                            </NavLink>
                        ))}
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={3}>
                        {user && (
                            <Typography variant="subtitle1" color="secondary">
                                Hello, {user.name} {roleLabel ? `(${roleLabel})` : ""}
                            </Typography>
                        )}
                        <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            onClick={() => dispatch(logout())}
                        >
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
