import { Box, Typography, Button, Stack } from "@mui/material";
import { Outlet, NavLink } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";

export const ReportsLayout = () => {
    const reports = [
        { label: "Top 10 Best-Selling Products (Time Range)", path: "/admin/reports/top-products" },
        { label: "Top 5 Clients by Revenue (Time Range)", path: "/admin/reports/top-clients-revenue" },
        { label: "Top 5 Clients by Sales Volume (Time Range)", path: "/admin/reports/top-clients-sales" },
        { label: "Top 10 Clients with Most Orders (Time Range)", path: "/admin/reports/top-clients-orders" },
        { label: "Top 10 Clients with Most Products for Sale", path: "/admin/reports/top-clients-inventory" },
    ];

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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

                <Stack spacing={2} width="100%">
                    {reports.map((report) => (
                        <NavLink
                            key={report.path}
                            to={report.path}
                            style={{ textDecoration: "none" }}
                        >
                            {({ isActive }) => (
                                <Button
                                    startIcon={<BarChartIcon />}
                                    fullWidth
                                    variant={isActive ? "contained" : "outlined"}
                                    sx={{ justifyContent: "flex-start", textTransform: "none" }}
                                >
                                    {report.label}
                                </Button>
                            )}
                        </NavLink>
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    ml: "300px",
                    p: 3,
                    overflowY: "auto",
                    height: "calc(100vh - 64px)",
                    width: '100%',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
