import apiInstance from "../../api/axiosInstance";
import type { CartItem } from "./";

export const fetchCartItems = async (userId: number): Promise<CartItem[]> => {
    const response = await apiInstance.get<CartItem[]>(`/cart/user/${userId}`);
    return response.data;
};

export const addItemToCart = async (
    userId: number,
    itemId: number
): Promise<void> => {
    await apiInstance.post(`/cart/add`, { userId, itemId, quantity: 1 });
};

export const decrementItemFromCart = async (
    userId: number,
    itemId: number
): Promise<void> => {
    await apiInstance.delete(`/cart/decrement`, { params: { userId, itemId } });
};

export const deleteItemFromCart = async (
    userId: number,
    itemId: number
): Promise<void> => {
    await apiInstance.delete(`/cart/delete`, { params: { userId, itemId } });
};

export const clearCart = async (userId: number): Promise<void> => {
    await apiInstance.delete(`/cart/clear`, { params: { userId } });
};
