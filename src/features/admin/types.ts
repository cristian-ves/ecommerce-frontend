import type { User } from "../auth";

export interface AdminState {
    employees: User[];
    error: string | null;
}

export interface AddEmployeeDTO {
    name: string;
    email: string;
    password: string;
    roleId: number;
}

export interface TopItem {
    itemId: number;
    itemName: string;
    quantitySold: number;
}

export interface ReportsState {
    topProducts: TopItem[];
    topSellers: TopClientRevenue[];
    topSellersItems: TopSellerItems[];
    topClientsOrders: TopClientOrders[];
    topClientsProducts: TopClientProducts[];
    loading: boolean;
    error: string | null;
}

export interface TopClientRevenue {
    sellerId: number;
    sellerName: string;
    totalEarnings: number;
}

export interface TopSellerItems {
    sellerId: number;
    sellerName: string;
    totalItemsSold: number;
}

export interface TopClientOrders {
    userId: number;
    userName: string;
    totalOrder: number;
}

export interface TopClientProducts {
    userId: number;
    userName: string;
    totalProducts: number;
}
