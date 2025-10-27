import apiInstance from "../../api/axiosInstance";
import type { Item, NewItem } from "./types";

export const fetchItems = async (page: number, size: number) => {
    const response = await apiInstance.get<Item[]>(
        `/items?page=${page}&size=${size}`
    );
    return response.data;
};

export const searchItems = async (query: string) => {
    const response = await apiInstance.get<Item[]>(`/items/search?q=${query}`);
    return response.data;
};

export const searchItemsByCategoryIds = async (categoryIds: number[]) => {
    if (categoryIds.length === 0) return [];

    const params = categoryIds.map((id) => `categories=${id}`).join("&");
    const response = await apiInstance.get<Item[]>(`/items/filter?${params}`);
    return response.data;
};

export const searchItemsByUserId = async (id: number) => {
    const response = await apiInstance.get<Item[]>(`/items/user/${id}`);
    return response.data;
};

export const addItem = async (item: NewItem) => {
    const response = await apiInstance.post<Item>(`/items/add`, item);
    return response.data;
};
