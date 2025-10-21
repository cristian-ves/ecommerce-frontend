import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { loginUser } from '../../features/auth';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then(() => {
                navigate('/user')
            })
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
                    <Button color='secondary' onClick={() => { navigate('/') }}>
                        Back to main page
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
