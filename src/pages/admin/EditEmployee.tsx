import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchEmployeesThunk, updateEmployeeThunk } from "../../features/admin/adminSlice";
import type { User } from "../../features/auth";

const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Moderator" },
    { id: 3, name: "Logistics" },
];

export const EditEmployee = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { employees } = useAppSelector((state) => state.admin);
    const location = useLocation();

    const stateUser = location.state?.user as User | undefined;
    const [employee, setEmployee] = useState<User | null>(stateUser || null);

    useEffect(() => {
        if (!employee && employees.length > 0) {
            const emp = employees.find((e) => e.id === Number(id));
            setEmployee(emp || null);
        }

        if (!employee && employees.length === 0) {
            dispatch(fetchEmployeesThunk());
        }
    }, [employee, employees, id, dispatch]);

    const handleChange = (field: keyof User, value: any) => {
        if (!employee) return;
        setEmployee({ ...employee, [field]: value });
    };

    const handleSubmit = async () => {
        if (!employee) return;
        await dispatch(updateEmployeeThunk(employee));
        navigate("/admin");
    };

    if (!employee) return <Typography>Loading employee...</Typography>;

    return (
        <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", mt: 4 }}>
            <Typography variant="h5" gutterBottom>Edit Employee</Typography>

            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={employee.name}
                onChange={(e) => handleChange("name", e.target.value)}
            />

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={employee.email}
                onChange={(e) => handleChange("email", e.target.value)}
            />

            <TextField
                select
                label="Role"
                fullWidth
                margin="normal"
                value={employee.role.id}
                onChange={(e) => {
                    const newRole = roles.find(r => r.id === Number(e.target.value));
                    if (newRole) handleChange("role", newRole);
                }}
            >
                {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                        {role.name}
                    </MenuItem>
                ))}
            </TextField>

            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </Button>
                <Button variant="outlined" onClick={() => navigate("/admin")}>
                    Cancel
                </Button>
            </Box>
        </Paper>
    );
};
