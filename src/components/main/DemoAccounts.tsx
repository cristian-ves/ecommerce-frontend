import { Box, Button, Typography, CircularProgress, Paper } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { loginUser } from "../../features/auth";
import { loadCart } from "../../features/cart";

const DEMO_ACCOUNTS = [
    { label: "Buyer", email: "buyer@demo.com", password: "demo1234" },
    { label: "Moderator", email: "mod@demo.com", password: "demo1234" },
    { label: "Logistics", email: "logistics@demo.com", password: "demo1234" },
    { label: "Admin", email: "admin@demo.com", password: "demo1234" },
];

export const DemoAccounts = () => {
    const dispatch = useAppDispatch();
    const [loadingRole, setLoadingRole] = useState<string | null>(null);

    const handleDemoLogin = async (email: string, password: string, label: string) => {
        setLoadingRole(label);
        const result = await dispatch(loginUser({ email, password }));
        if (loginUser.fulfilled.match(result)) {
            await dispatch(loadCart(result.payload.user.id));
        }
        setLoadingRole(null);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                mt: { xs: 1, sm: 2 },
                p: { xs: 1.5, sm: 3 },
                borderRadius: 4,
                border: "1.5px solid",
                borderColor: "primary.main",
                background: "linear-gradient(135deg, #FFFDF7 0%, #F5E6C0 50%, #FFFDF7 100%)",
                backgroundSize: "200% 200%",
                animation: "shine 3s ease infinite",
                textAlign: "center",
                "@keyframes shine": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
            }}
        >
            <Typography
                variant="subtitle1"
                fontWeight={600}
                color="primary.main"
                gutterBottom
                sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, mb: { xs: 0.5, sm: 1 } }}
            >
                Try a demo account
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
            >
                Explore the app as different roles — no sign up needed
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: { xs: 0.75, sm: 1.5 },
                    justifyContent: "center",
                }}
            >
                {DEMO_ACCOUNTS.map(({ label, email, password }) => (
                    <Button
                        key={label}
                        variant="contained"
                        size="small"
                        disabled={loadingRole !== null}
                        onClick={() => handleDemoLogin(email, password, label)}
                        startIcon={loadingRole === label ? <CircularProgress size={12} color="inherit" /> : null}
                        sx={{
                            minWidth: 0,
                            px: { xs: 0.5, sm: 2 },
                            fontSize: { xs: '0.65rem', sm: '0.875rem' },
                        }}
                    >
                        {label}
                    </Button>
                ))}
            </Box>
            <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mt: { xs: 1, sm: 2 }, fontSize: { xs: '0.6rem', sm: '0.75rem' }, display: { xs: 'none', sm: 'block' } }}
            >
                Demo only — enter any values where forms require it (for example payment details)
            </Typography>
        </Paper>
    );
};