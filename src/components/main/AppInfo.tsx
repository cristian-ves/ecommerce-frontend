import { Box, Button, Typography } from "@mui/material";
import { SiReact, SiSpringboot } from "react-icons/si";
import { useNavigate } from "react-router-dom";

export const AppInfo = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center' }}>
            <Typography variant="h3" mt={5}>
                E-commerce
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center' }, gap: 1 }}>
                <Typography variant="h5">Application created using</Typography>
                <SiSpringboot size={30} color="#6DB33F" />
                <SiReact size={30} color="#61DAFB" />
            </Box>

            <Typography variant="body1">
                Welcome to this ecommerce, here you'll be able to buy and sell any product!
            </Typography>

            <Box sx={{
                display: 'flex',
                gap: 2,
                justifyContent: { xs: 'center' }
            }}>
                <Button variant="contained" onClick={() => { navigate("/login") }} fullWidth>
                    Login
                </Button>
                <Button variant="contained" onClick={() => { navigate("/register") }} fullWidth>
                    Register
                </Button>
            </Box>
        </Box>
    );
};
