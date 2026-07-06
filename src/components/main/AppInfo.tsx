import { Box, Button, Typography } from "@mui/material";
import { SiReact, SiSpringboot } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { DemoAccounts } from "./DemoAccounts";

export const AppInfo = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, sm: 2 }, textAlign: 'center', width: '100%' }}>
            <Typography variant="h3" mt={{ xs: 0, md: 5 }} fontSize={{ xs: '1.6rem', sm: '2.5rem', md: '3rem' }}>
                E-commerce
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                <Typography variant="h5" fontSize={{ xs: '0.85rem', sm: '1.5rem' }}>
                    Application created using
                </Typography>
                <SiSpringboot size={22} color="#6DB33F" />
                <SiReact size={22} color="#61DAFB" />
            </Box>
            <Typography
                variant="body1"
                sx={{
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                    display: { xs: '-webkit-box', sm: 'block' },
                    WebkitLineClamp: { xs: 2, sm: 'unset' },
                    WebkitBoxOrient: 'vertical',
                    overflow: { xs: 'hidden', sm: 'visible' },
                }}
            >
                Welcome to this ecommerce, here you'll be able to buy and sell any product!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'row' },
                    gap: { xs: 1, sm: 2 },
                    justifyContent: 'center',
                }}
            >
                <Button variant="contained" size="small" onClick={() => navigate("/login")} fullWidth>
                    Login
                </Button>
                <Button variant="contained" size="small" onClick={() => navigate("/register")} fullWidth>
                    Register
                </Button>
            </Box>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                Or
            </Typography>
            <DemoAccounts />
        </Box>
    );
};