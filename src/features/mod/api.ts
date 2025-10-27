import apiInstance from "../../api/axiosInstance";
import type { ItemRequest, UserManager } from "./types";

export const getItems = async () => {
    const response = await apiInstance.get<ItemRequest[]>(`/items/requests`);
    return response.data;
};

export const acceptItem = async (id: number) => {
    await apiInstance.post<void>(`items/accept/${id}`);
};

export const rejectItem = async (id: number) => {
    await apiInstance.post<void>(`items/reject/${id}`);
};

export const fetchCommonUsers = async (): Promise<UserManager[]> => {
    const { data } = await apiInstance.get<UserManager[]>("/api/auth/common");
    return data;
};

export const toggleBan = async (id: number) => {
    await apiInstance.post(`/api/auth/toggleBan/${id}`);
};
