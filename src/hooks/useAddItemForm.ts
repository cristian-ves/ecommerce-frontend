import { useState } from "react";
import type { Category } from "../features/items";

export interface AddItemFormData {
    name: string;
    description: string;
    image: string;
    price: number | "";
    stock: number | "";
    isNew: boolean;
    category: Category | null;
}

export const useAddItemForm = (categories: Category[]) => {
    const [formData, setFormData] = useState<AddItemFormData>({
        name: "",
        description: "",
        image: "",
        price: "",
        stock: 1,
        isNew: true,
        category: categories[0] || null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: keyof AddItemFormData, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.description.trim())
            newErrors.description = "Description is required";
        if (!formData.image.trim()) newErrors.image = "Image URL is required";
        if (!formData.price || formData.price <= 0)
            newErrors.price = "Price must be greater than 0";
        if (!formData.stock || formData.stock < 1)
            newErrors.stock = "Stock must be at least 1";
        if (!formData.category) newErrors.category = "Category is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        formData,
        errors,
        handleChange,
        validateForm,
        setFormData,
    };
};
