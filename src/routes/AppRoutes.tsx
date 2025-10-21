import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import { Login, Register } from '../pages';
import { Box } from '@mui/material';

export default function AppRoutes() {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Box>
    );
}
