import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchItems } from "./api";
import type { Item, ItemsState } from "./";
import { ITEMS_TO_LOAD } from "../../pages/user";

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: true,
};

export const loadItems = createAsyncThunk<
    Item[],
    { page: number; size: number },
    { rejectValue: string }
>("items/loadItems", async ({ page, size }, { rejectWithValue }) => {
    try {
        const data = await fetchItems(page, size);
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to load items");
    }
});

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        resetItems(state) {
            state.items = [];
            state.page = 0;
            state.hasMore = true;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loadItems.fulfilled,
                (state, action: PayloadAction<Item[]>) => {
                    state.loading = false;

                    state.items = [...state.items, ...action.payload];
                    state.page += 1;

                    if (action.payload.length < ITEMS_TO_LOAD)
                        state.hasMore = false;
                }
            )
            .addCase(loadItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetItems } = itemsSlice.actions;
export default itemsSlice.reducer;
