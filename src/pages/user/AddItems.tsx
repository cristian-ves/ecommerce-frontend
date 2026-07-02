import { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    type SelectChangeEvent,
    CircularProgress,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useAddItemForm } from "../../hooks/useAddItemForm";
import Swal from "sweetalert2";

import { addNewItem, type Category } from "../../features/items";
import { useNavigate } from "react-router-dom";

const CATEGORIES: Category[] = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Home" },
    { id: 3, name: "Academic" },
    { id: 4, name: "Personal" },
    { id: 5, name: "Decoration" },
    { id: 6, name: "Other" },
];

export const AddItems = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const { formData, errors, handleChange, validateForm } = useAddItemForm(CATEGORIES);

    const [submitting, setSubmitting] = useState(false);

    const handleAddItem = async () => {
        if (!validateForm()) return;
        if (!user) return;

        setSubmitting(true);
        try {
            await dispatch(addNewItem({
                ...formData,
                user,
                price: Number(formData.price),
                stock: Number(formData.stock),
                category: formData.category!,
            })).unwrap();

            Swal.fire({
                icon: "success",
                title: "Item added!",
                text: `${formData.name} has been added successfully.`,
            }).then(() => navigate("/user/sell"));
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Failed to add item",
            });
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h4">Add New Item</Typography>

            <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
            />
            <TextField
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
            />
            <TextField
                label="Image URL"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                error={!!errors.image}
                helperText={errors.image}
            />
            <TextField
                label="Price"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                error={!!errors.price}
                helperText={errors.price}
            />
            <TextField
                label="Stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange("stock", parseInt(e.target.value))}
                error={!!errors.stock}
                helperText={errors.stock}
            />

            <FormControl>
                <InputLabel>Condition</InputLabel>
                <Select
                    value={formData.new ? "new" : "used"}
                    onChange={(e: SelectChangeEvent) =>
                        handleChange("new", e.target.value === "new")
                    }
                >
                    <MenuItem value="new">Brand New</MenuItem>
                    <MenuItem value="used">Gently Used</MenuItem>
                </Select>
            </FormControl>

            <FormControl error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={formData.category?.id.toString() || ""}
                    onChange={(e: SelectChangeEvent) => {
                        const selected = CATEGORIES.find((c) => c.id.toString() === e.target.value);
                        handleChange("category", selected || null);
                    }}
                >
                    {CATEGORIES.map((c) => (
                        <MenuItem key={c.id} value={c.id.toString()}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleAddItem}
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : null}
            >
                {submitting ? "Adding..." : "Add Item"} // CHANGED
            </Button>
        </Box>
    );
};
