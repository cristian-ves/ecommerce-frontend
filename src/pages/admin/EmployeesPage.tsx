import { useEffect } from "react";
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import { fetchEmployeesThunk } from "../../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { User } from "../../features/auth";

export const EmployeesPage = () => {
    const dispatch = useAppDispatch();
    const { employees, loading } = useAppSelector((state) => state.admin);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchEmployeesThunk());
    }, [dispatch]);

    const handleEdit = (user: User) => {
        navigate(`/admin/employee/${user.id}`, { state: { user } });
    };

    const sortedEmployees = [...employees].sort((a, b) => a.id - b.id);

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
        </Box>
    );

    return (
        <TableContainer component={Paper} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>Employees</Typography>
            {sortedEmployees.length === 0 ? (
                <Typography>No employees found.</Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedEmployees.map((user: User) => (
                            <TableRow key={user.id} hover>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role.name}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEdit(user)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};