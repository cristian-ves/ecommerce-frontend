import apiInstance from "../../api/axiosInstance";
import type { CardResponse, PurchaseDTO, PurchaseRequest } from "./type";

export const fetchCards = async (userId: number): Promise<CardResponse[]> => {
    const response = await apiInstance.get<CardResponse[]>(`/cards/${userId}`);
    return response.data;
};

export const addCard = async (card: {
    name: string;
    number: string;
    expiration: string;
    cvv: string;
    userId: number;
}): Promise<{
    id: number;
    name: string;
    number: string;
    expiration: string;
    cvv: string;
    userId: number;
}> => {
    const response = await apiInstance.post("/cards", card);
    return response.data;
};

export const makePurchase = async (
    purchase: PurchaseRequest
): Promise<PurchaseDTO> => {
    const response = await apiInstance.post("purchases", purchase);
    return response.data;
};

export const fetchPurchases = async (
    userId: number
): Promise<PurchaseDTO[]> => {
    const response = await apiInstance.get<PurchaseDTO[]>(
        `/purchases/user/${userId}`
    );
    return response.data;
};
