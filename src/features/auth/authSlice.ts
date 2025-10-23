import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import type { AuthState, User, AuthResponse } from "./";
import * as api from "./";
import { loadCart } from "../cart";

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk<
    AuthResponse,
    { email: string; password: string },
    { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
    try {
        return await api.login(credentials.email, credentials.password);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Login failed");
    }
});

export const registerUser = createAsyncThunk<
    AuthResponse,
    { name: string; email: string; password: string; roleId: number },
    { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
    try {
        return await api.register(
            data.name,
            data.email,
            data.password,
            data.roleId
        );
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Registration failed");
    }
});

export const checkAuth = createAsyncThunk<User, void, { rejectValue: string }>(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const data = await api.validateToken();
            return data.user;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Token validation failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loginUser.fulfilled,
                (
                    state,
                    action: PayloadAction<{ user: User; token: string }>
                ) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    localStorage.setItem("token", action.payload.token);
                }
            )
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                registerUser.fulfilled,
                (
                    state,
                    action: PayloadAction<{ user: User; token: string }>
                ) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    localStorage.setItem("token", action.payload.token);
                }
            )
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                checkAuth.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    state.user = action.payload;
                    state.error = null;
                }
            )
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                localStorage.removeItem("token");
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
