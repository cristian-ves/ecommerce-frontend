import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { loginUser } from '../../features/auth';
import { useNavigate } from 'react-router-dom';
import { loadCart } from '../../features/cart/cartSlice';

export const Login = () => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const resultAction = await dispatch(loginUser({ email, password }))

        if (loginUser.fulfilled.match(resultAction)) {
            const user = resultAction.payload.user;
            dispatch(loadCart(user.id));
            navigate("/user");
        } else {
            console.error("Login failed");
        }
    }

    useEffect(() => {
        if (user) navigate('/user');
    }, [user]);


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
                <form onSubmit={handleSubmit}>
                    <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                    <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <Typography color='error'>{error}</Typography>}
                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button color='secondary' sx={{ mt: 1, boxShadow: 'none' }} onClick={() => { navigate('/') }}>
                        Back to main page
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
