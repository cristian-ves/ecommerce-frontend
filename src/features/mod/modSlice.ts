import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { type UserManager, type ItemRequest, type ModState } from "./types";
import {
    acceptItem,
    fetchCommonUsers,
    getItems,
    rejectItem,
    toggleBan,
} from "./api";

const initialState: ModState = {
    items: [],
    users: [],
    loading: false,
    error: null,
    banningId: 0,
};

export const getItemRequestsThunk = createAsyncThunk<ItemRequest[], void>(
    "mod/getItems",
    async (_, { rejectWithValue }) => {
        try {
            return await getItems();
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch item requests"
            );
        }
    }
);

export const acceptItemThunk = createAsyncThunk<number, number>(
    "mod/acceptItem",
    async (id: number, { rejectWithValue }) => {
        try {
            await acceptItem(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to accept item"
            );
        }
    }
);

export const rejectItemThunk = createAsyncThunk<number, number>(
    "mod/rejectItem",
    async (id: number, { rejectWithValue }) => {
        try {
            await rejectItem(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to reject item"
            );
        }
    }
);

export const fetchCommonUsersThunk = createAsyncThunk<UserManager[], void>(
    "mod/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const users = await fetchCommonUsers();
            return users;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch common users"
            );
        }
    }
);

export const toggleBanThunk = createAsyncThunk<number, number>(
    "mod/toggleBan",
    async (id, { rejectWithValue }) => {
        try {
            await toggleBan(id);
            return id;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to toggle ban"
            );
        }
    }
);

const modSlice = createSlice({
    name: "mod",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getItemRequestsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getItemRequestsThunk.fulfilled,
                (state, action: PayloadAction<ItemRequest[]>) => {
                    state.items = action.payload;
                    state.loading = false;
                }
            )
            .addCase(getItemRequestsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(acceptItemThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                acceptItemThunk.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload
                    );
                    state.loading = false;
                }
            )
            .addCase(acceptItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(rejectItemThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                rejectItemThunk.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.items = state.items.filter(
                        (item) => item.id !== action.payload
                    );
                    state.loading = false;
                }
            )
            .addCase(rejectItemThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(fetchCommonUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCommonUsersThunk.fulfilled,
                (state, action: PayloadAction<UserManager[]>) => {
                    state.users = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchCommonUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(toggleBanThunk.fulfilled, (state, action) => {
                const user = state.users.find((u) => u.id === action.payload);
                if (user) {
                    user.suspended = !user.suspended;
                }
                state.banningId = 0;
            })
            .addCase(toggleBanThunk.pending, (state, action) => {
                state.banningId = action.meta.arg;
                state.error = null;
            });
    },
});

export default modSlice.reducer;
