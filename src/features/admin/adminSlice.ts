import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { AddEmployeeDTO, AdminState } from "./";
import { addEmployee, fetchEmployees, updateEmployee } from "./";
import type { User } from "../auth";

const initialState: AdminState = {
    employees: [],
    error: null,
    loading: false,
};

export const fetchEmployeesThunk = createAsyncThunk<
    User[],
    void,
    { rejectValue: string }
>("admin/fetchEmployees", async (_, { rejectWithValue }) => {
    try {
        return await fetchEmployees();
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data || "Failed to fetch employees"
        );
    }
});

export const updateEmployeeThunk = createAsyncThunk<
    User,
    User,
    { rejectValue: string }
>("admin/updateEmployee", async (user, { rejectWithValue }) => {
    try {
        return await updateEmployee(user);
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data || "Failed to update employee"
        );
    }
});

export const addEmployeeThunk = createAsyncThunk<
    User,
    AddEmployeeDTO,
    { rejectValue: string }
>("admin/addEmployee", async (employee, { rejectWithValue }) => {
    try {
        return await addEmployee(employee);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to add employee");
    }
});

const adminSlice = createSlice({
    name: "amdin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchEmployeesThunk.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.employees = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchEmployeesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(
                updateEmployeeThunk.fulfilled,
                (state, action: PayloadAction<User>) => {
                    const index = state.employees.findIndex(
                        (e) => e.id === action.payload.id
                    );
                    if (index !== -1) state.employees[index] = action.payload;
                }
            )
            .addCase(
                addEmployeeThunk.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.employees.push(action.payload);
                }
            );
    },
});

export default adminSlice.reducer;
