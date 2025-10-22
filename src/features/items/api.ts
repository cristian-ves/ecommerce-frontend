import apiInstance from "../../api/axiosInstance";
import type { Item } from "./types";

export const fetchItems = async (page: number, size: number) => {
    const response = await apiInstance.get<Item[]>(
        `/items?page=${page}&size=${size}`
    );
    return response.data;
};
