import axios from "axios";
import type { User } from "./types";

export const login = async (email: string, password: string) => {
    const response = await axios.post<{ user: User; token: string }>(
        "http://localhost:8080/api/auth/login",
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
    const response = await axios.post<{ user: User; token: string }>(
        "http://localhost:8080/api/auth/register",
        { name, email, password, roleId }
    );
    return response.data;
};

export const validateToken = async (token: string) => {
    const response = await axios.get<{ user: User }>(
        "http://localhost:8080/api/auth/validate",
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data;
};
