import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { addEmployeeThunk } from "../../features/admin/adminSlice";
import type { AddEmployeeDTO } from "../../features/admin";

const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Moderator" },
    { id: 3, name: "Logistics" },
];

export const AddEmployeePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState<AddEmployeeDTO>({
        name: "",
        email: "",
        password: "",
        roleId: 2,
    });

    const handleChange = (field: keyof AddEmployeeDTO, value: any) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await dispatch(addEmployeeThunk(form)).unwrap();
            navigate("/admin");
        } catch (err) {
            console.error("Failed to add employee:", err);
        }
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: 500, margin: "auto", mt: 4 }}>
            <Typography variant="h5" gutterBottom>Add Employee</Typography>

            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
            />

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
            />

            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
            />

            <TextField
                select
                label="Role"
                fullWidth
                margin="normal"
                value={form.roleId}
                onChange={(e) => handleChange("roleId", Number(e.target.value))}
            >
                {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                        {role.name}
                    </MenuItem>
                ))}
            </TextField>

            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add
                </Button>
                <Button variant="outlined" onClick={() => navigate("/admin")}>
                    Cancel
                </Button>
            </Box>
        </Paper>
    );
};
