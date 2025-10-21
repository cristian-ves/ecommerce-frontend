import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const Login = () => {
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box
                sx={{
                    margin: 'auto',
                    width: '100%',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form>
                    <TextField label="Email" type="email" fullWidth margin="normal" />
                    <TextField label="Password" type="password" fullWidth margin="normal" />
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
