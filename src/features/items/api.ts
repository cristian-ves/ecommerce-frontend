import apiInstance from "../../api/axiosInstance";
import type { Item, NewItem, ReviewItemPayload, UpdatedItem } from "./types";

export const fetchItems = async (page: number, size: number) => {
    const response = await apiInstance.get<Item[]>(
        `/items?page=${page}&size=${size}`
    );
    return response.data;
};

export const searchAndFilter = async (query: string, categoryIds: number[]) => {
    const params = new URLSearchParams();
    if (query.trim()) params.append("q", query.trim());
    categoryIds.forEach((id) => params.append("categories", String(id)));

    const response = await apiInstance.get<Item[]>(
        `/items/search?${params.toString()}`
    );
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

export const updateItem = async (item: UpdatedItem) => {
    await apiInstance.put<void>("/items/update", item);
};

export const reviewItem = async ({ id, rate }: ReviewItemPayload) => {
    await apiInstance.put<void>(`/items/review?rate=${rate}`, { id });
};
