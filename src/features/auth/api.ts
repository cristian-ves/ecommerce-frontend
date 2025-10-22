import apiInstance from "../../api/axiosInstance";
import type { User } from "./types";

export const login = async (email: string, password: string) => {
    const response = await apiInstance.post<{ user: User; token: string }>(
        "/api/auth/login",
        { email, password }
    );
    return response.data;
};

export const register = async (
    name: string,
    email: string,
    password: string,
    roleId: number
) => {
    const response = await apiInstance.post<{ user: User; token: string }>(
        "/api/auth/register",
        { name, email, password, roleId }
    );
    return response.data;
};

export const validateToken = async () => {
    const response = await apiInstance.get<{ user: User }>(
        "/api/auth/validate"
    );
    return response.data;
};
