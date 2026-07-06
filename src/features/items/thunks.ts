import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addItem,
    fetchItems,
    reviewItem,
    searchAndFilter,
    searchItemsByUserId,
    updateItem,
} from "./api";
import type {
    Item,
    ItemsState,
    NewItem,
    ReviewItemPayload,
    UpdatedItem,
} from "./types";
import { ITEMS_TO_LOAD } from "../../hooks/useItemsLoader";

type ThunkConfig = { state: { items: ItemsState }; rejectValue: string };

export const loadItems = createAsyncThunk<
    Item[],
    { page: number; size: number },
    ThunkConfig
>("items/loadItems", async ({ page, size }, { rejectWithValue }) => {
    try {
        return await fetchItems(page, size);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to load items");
    }
});

export const searchAndFilterItems = createAsyncThunk<Item[], void, ThunkConfig>(
    "items/searchAndFilter",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { query, categoryIds } = getState().items.filters;
            return await searchAndFilter(query, categoryIds);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to search items"
            );
        }
    }
);

export const loadMyItems = createAsyncThunk<
    Item[],
    { id: number },
    ThunkConfig
>("items/loadMyItems", async ({ id }, { rejectWithValue }) => {
    try {
        return await searchItemsByUserId(id);
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data || "Failed to load your items"
        );
    }
});

export const addNewItem = createAsyncThunk<Item, NewItem, ThunkConfig>(
    "items/add",
    async (item, { rejectWithValue }) => {
        try {
            return await addItem(item);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to add item");
        }
    }
);

export const updateExistingItem = createAsyncThunk<
    void,
    UpdatedItem,
    ThunkConfig
>("items/update", async (item, { rejectWithValue }) => {
    try {
        await updateItem(item);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to update item");
    }
});

export const reviewExistingItem = createAsyncThunk<
    void,
    ReviewItemPayload,
    ThunkConfig
>("items/review", async (payload, { rejectWithValue }) => {
    try {
        await reviewItem(payload);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to review item");
    }
});
