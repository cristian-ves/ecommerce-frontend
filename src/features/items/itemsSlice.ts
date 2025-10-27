import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import {
    addItem,
    fetchItems,
    searchItems,
    searchItemsByCategoryIds,
    searchItemsByUserId,
    updateItem,
} from "./api";
import type { Item, ItemsState, NewItem, UpdatedItem } from "./";
import { ITEMS_TO_LOAD } from "../../hooks/useItemsLoader";

const initialState: ItemsState = {
    items: [],
    myItems: [],
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

export const searchItemsByQuery = createAsyncThunk<
    Item[],
    { query: string },
    { rejectValue: string }
>("items/searchItems", async ({ query }, { rejectWithValue }) => {
    try {
        const data = await searchItems(query);
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to search items");
    }
});

export const applyFilters = createAsyncThunk<
    Item[],
    { categoryIds: number[] },
    { rejectValue: string }
>("items/applyFilters", async ({ categoryIds }, { rejectWithValue }) => {
    try {
        const data = await searchItemsByCategoryIds(categoryIds);
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to apply filters");
    }
});

export const loadMyItems = createAsyncThunk<
    Item[],
    { id: number },
    { rejectValue: string }
>("items/loadMyItems", async ({ id }, { rejectWithValue }) => {
    try {
        const data = await searchItemsByUserId(id);
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to apply filters");
    }
});

export const addNewItem = createAsyncThunk<
    Item,
    NewItem,
    { rejectValue: string }
>("items/add", async (item: NewItem, { rejectWithValue }) => {
    try {
        const data = await addItem(item);
        return data;
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to add item");
    }
});

export const updateExistingItem = createAsyncThunk<
    void,
    UpdatedItem,
    { rejectValue: string }
>("items/update", async (item: UpdatedItem, { rejectWithValue }) => {
    try {
        await updateItem(item);
    } catch (err: any) {
        rejectWithValue(err.response?.data || "Failed to update item");
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
                if (state.page == 0) state.items = [];
                state.hasMore = true;
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

        builder
            .addCase(searchItemsByQuery.pending, (state) => {
                state.loading = true;
                state.items = [];
                state.error = null;
                state.hasMore = false;
                state.page = 0;
            })
            .addCase(
                searchItemsByQuery.fulfilled,
                (state, action: PayloadAction<Item[]>) => {
                    state.loading = false;

                    state.items = [...action.payload];
                }
            )
            .addCase(searchItemsByQuery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(applyFilters.pending, (state) => {
                state.loading = true;
                state.items = [];
                state.error = null;
                state.hasMore = false;
                state.page = 0;
            })
            .addCase(
                applyFilters.fulfilled,
                (state, action: PayloadAction<Item[]>) => {
                    state.loading = false;
                    state.items = [...action.payload];
                }
            )
            .addCase(applyFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(loadMyItems.pending, (state) => {
                state.loading = true;
                state.myItems = [];
                state.error = null;
            })
            .addCase(
                loadMyItems.fulfilled,
                (state, action: PayloadAction<Item[]>) => {
                    state.loading = false;
                    state.myItems = [...action.payload];
                }
            )
            .addCase(loadMyItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(addNewItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewItem.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(addNewItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(updateExistingItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExistingItem.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(updateExistingItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetItems } = itemsSlice.actions;
export default itemsSlice.reducer;
