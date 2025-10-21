import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@mui/material';

import App from '../App';
import { Login, Register } from '../pages/auth';
import { Main } from '../pages/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { checkAuth } from '../features/auth';

export default function AppRoutes() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !user) {
            dispatch(checkAuth(token));
        }
    }, [user]);

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Routes>
                {
                    (!user)
                        ? (
                            <>
                                <Route path="/" element={<App />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />

                                <Route path="/*" element={<Navigate to="/" replace />} />
                            </>

                        )
                        : (user.role.id == 4) ? (
                            <>
                                <Route path="/user" element={<Main />} />

                                <Route path="/*" element={<Navigate to="/user" replace />} />

                            </>
                        ) :
                            (<Route path="/process" element={<h1>Working on it...</h1>} />)
                }

                <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </Box>
    );
}
