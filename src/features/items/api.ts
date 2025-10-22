import apiInstance from "../../api/axiosInstance";
import type { Item } from "./types";

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
