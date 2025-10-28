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
