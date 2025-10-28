import apiInstance from "../../api/axiosInstance";
import type { PurchaseDTO } from "../purchase/type";

export const getPurchases = async () => {
    const response = await apiInstance.get<PurchaseDTO[]>(`/purchases/all`);
    return response.data;
};

export const deliverPurchase = async (purchaseId: number) => {
    const response = await apiInstance.put(`/purchases/${purchaseId}/deliver`);
    return response.data;
};

export const updateDeliveryDate = async (
    purchaseId: number,
    newDate: string
) => {
    const response = await apiInstance.put<PurchaseDTO>(
        `/purchases/${purchaseId}/delivery-date`,
        { newDate }
    );
    return response.data;
};
