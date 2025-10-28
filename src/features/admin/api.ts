import apiInstance from "../../api/axiosInstance";
import type { User } from "../auth";
import type { AddEmployeeDTO } from "./";

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
