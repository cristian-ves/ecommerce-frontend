import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useAddItemForm } from "../../hooks/useAddItemForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateExistingItem, type Category } from "../../features/items";
import Swal from "sweetalert2";

const CATEGORIES: Category[] = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Home" },
    { id: 3, name: "Academic" },
    { id: 4, name: "Personal" },
    { id: 5, name: "Decoration" },
    { id: 6, name: "Other" },
];

export const EditItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { item } = location.state || {};
    const { user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch();

    const { formData, handleChange, validateForm, errors, setFormData } =
        useAddItemForm(CATEGORIES);

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || "",
                description: item.description || "",
                image: item.image || "",
                price: item.price || "",
                stock: item.stock || 1,
                new: item.new ?? true,
                category: item.category || null,
            });
        }
    }, [item, setFormData]);

    const handleSubmit = async () => {

        if (!validateForm()) return;

        if (!user) return;

        try {
            await dispatch(
                updateExistingItem({
                    ...formData,
                    id: item.id,
                    user,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    category: formData.category!,
                })
            ).unwrap();

            Swal.fire({
                icon: "success",
                title: "Item updated!",
                text: `${formData.name} has been updated successfully.`,
            }).then(() => {
                navigate("/user/sell")
            });
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Failed to add item",
            });
        }
    };

    if (!item)
        return <Typography sx={{ mt: 4 }}>No item found to edit.</Typography>;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 400,
                mx: "auto",
                mt: 4,
            }}
        >
            <Typography variant="h5">Edit Item</Typography>

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
                rows={3}
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
                onChange={(e) =>
                    handleChange("price", parseFloat(e.target.value))
                }
                error={!!errors.price}
                helperText={errors.price}
            />
            <TextField
                label="Stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                    handleChange("stock", parseInt(e.target.value, 10))
                }
                error={!!errors.stock}
                helperText={errors.stock}
            />

            <TextField
                select
                label="Condition"
                value={formData.new ? "new" : "used"}
                onChange={(e) =>
                    handleChange("new", e.target.value === "new")
                }
            >
                <MenuItem value="new">Brand new</MenuItem>
                <MenuItem value="used">Gently used</MenuItem>
            </TextField>

            <TextField
                select
                label="Category"
                value={formData.category?.id || ""}
                onChange={(e) => {
                    const selected = CATEGORIES.find(
                        (cat) => cat.id === Number(e.target.value)
                    );
                    handleChange("category", selected || null);
                }}
                error={!!errors.category}
                helperText={errors.category}
            >
                {CATEGORIES.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </MenuItem>
                ))}
            </TextField>

            <Button variant="contained" onClick={handleSubmit}>
                Save Changes
            </Button>
        </Box>
    );
};
