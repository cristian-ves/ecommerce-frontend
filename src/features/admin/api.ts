import apiInstance from "../../api/axiosInstance";
import type { User } from "../auth";
import type {
    AddEmployeeDTO,
    TopClientOrders,
    TopClientProducts,
    TopClientRevenue,
    TopItem,
    TopSellerItems,
} from "./";

export const fetchEmployees = async (): Promise<User[]> => {
    const { data } = await apiInstance.get<User[]>("/api/auth/employees");
    return data;
};

export const updateEmployee = async (user: User): Promise<User> => {
    const { data } = await apiInstance.put<User>(
        `/api/auth/employees/${user.id}`,
        user
    );
    return data;
};

export const addEmployee = async (employee: AddEmployeeDTO): Promise<User> => {
    const { data } = await apiInstance.post<User>(
        "/api/auth/employees",
        employee
    );
    return data;
};

export const fetchTopProducts = async (
    startDate: string,
    endDate: string
): Promise<TopItem[]> => {
    const { data } = await apiInstance.get<TopItem[]>(
        `/purchases/reports/top-products`,
        {
            params: { startDate, endDate },
        }
    );
    return data;
};

export const fetchTopClientsRevenue = async (
    startDate: string,
    endDate: string
): Promise<TopClientRevenue[]> => {
    const { data } = await apiInstance.get<TopClientRevenue[]>(
        `/purchases/reports/top-users-earnings`,
        {
            params: { startDate, endDate },
        }
    );
    return data;
};

export const fetchTopSellersItems = async (
    startDate: string,
    endDate: string
): Promise<TopSellerItems[]> => {
    const { data } = await apiInstance.get<TopSellerItems[]>(
        `/purchases/reports/top-sellers-items`,
        {
            params: { startDate, endDate },
        }
    );
    return data;
};

export const fetchTopClientsOrders = async (
    startDate: string,
    endDate: string
): Promise<TopClientOrders[]> => {
    const { data } = await apiInstance.get<TopClientOrders[]>(
        `/purchases/reports/top-clients-orders`,
        {
            params: { startDate, endDate },
        }
    );
    return data;
};

export const fetchTopClientsProducts = async (): Promise<
    TopClientProducts[]
> => {
    const { data } = await apiInstance.get<TopClientProducts[]>(
        "/items/top-users-items"
    );
    return data;
};
