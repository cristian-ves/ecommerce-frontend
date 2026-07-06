import { useState } from "react";
import { Box, Typography, Button, Stack, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";

const REPORTS = [
    { label: "Top 10 Best-Selling Products (Time Range)", path: "/admin/reports/top-products" },
    { label: "Top 5 Clients by Revenue (Time Range)", path: "/admin/reports/top-clients-revenue" },
    { label: "Top 5 Clients by Sales Volume (Time Range)", path: "/admin/reports/top-clients-sales" },
    { label: "Top 10 Clients with Most Orders (Time Range)", path: "/admin/reports/top-clients-orders" },
    { label: "Top 10 Clients with Most Products for Sale", path: "/admin/reports/top-clients-inventory" },
];

const ReportsMenuLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <Stack spacing={2} width="100%">
        {REPORTS.map((report) => (
            <NavLink key={report.path} to={report.path} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                    <Button
                        startIcon={<BarChartIcon />}
                        fullWidth
                        variant={isActive ? "contained" : "outlined"}
                        onClick={onNavigate}
                        sx={{ justifyContent: "flex-start", textTransform: "none", textAlign: "left" }}
                    >
                        {report.label}
                    </Button>
                )}
            </NavLink>
        ))}
    </Stack>
);

export const ReportsLayout = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const activeReport = REPORTS.find((report) => location.pathname === report.path);

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {isDesktop ? (
                <Box
                    sx={{
                        width: 300,
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
                        Reports Menu
                    </Typography>
                    <ReportsMenuLinks />
                </Box>
            ) : (
                <Drawer
                    anchor="left"
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    ModalProps={{ keepMounted: true }}
                >
                    <Box sx={{ width: 300, maxWidth: "85vw", p: 3, height: "100%" }}>
                        <Typography variant="h6" mb={2}>
                            Reports Menu
                        </Typography>
                        <ReportsMenuLinks onNavigate={() => setMenuOpen(false)} />
                    </Box>
                </Drawer>
            )}

            <Box
                sx={{
                    flex: 1,
                    ml: { xs: 0, md: "300px" },
                    p: { xs: 2, sm: 3 },
                    overflowY: "auto",
                    height: "calc(100vh - 64px)",
                    width: "100%",
                }}
            >
                {!isDesktop && (
                    <Button
                        variant="outlined"
                        startIcon={<BarChartIcon />}
                        onClick={() => setMenuOpen(true)}
                        fullWidth
                        sx={{ mb: 2, textTransform: "none", justifyContent: "flex-start" }}
                    >
                        {activeReport ? activeReport.label : "Select a report"}
                    </Button>
                )}
                <Outlet />
            </Box>
        </Box>
    );
};