import { createSlice } from "@reduxjs/toolkit";
import type { ItemsState } from "./types";
import { ITEMS_TO_LOAD } from "../../hooks/useItemsLoader";
import {
    addNewItem,
    loadItems,
    loadMyItems,
    reviewExistingItem,
    searchAndFilterItems,
    updateExistingItem,
} from "./thunks";
import { addSimpleAsyncCase } from "./reducerHelpers";
import {
    clearFiltersReducer,
    setQueryReducer,
    toggleCategoryIdReducer,
} from "./filtersReducer";

const initialState: ItemsState = {
    items: [],
    myItems: [],
    loading: false,
    error: null,
    page: 0,
    hasMore: true,
    filters: {
        query: "",
        categoryIds: [],
    },
};

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
        setQuery: setQueryReducer,
        toggleCategoryId: toggleCategoryIdReducer,
        clearFilters: clearFiltersReducer,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadItems.pending, (state) => {
                if (state.page === 0) state.items = [];
                state.hasMore = true;
                state.loading = true;
                state.error = null;
            })
            .addCase(loadItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = [...state.items, ...action.payload];
                state.page += 1;
                if (action.payload.length < ITEMS_TO_LOAD)
                    state.hasMore = false;
            })
            .addCase(loadItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(searchAndFilterItems.pending, (state) => {
                state.loading = true;
                state.items = [];
                state.error = null;
                state.hasMore = false;
                state.page = 0;
            })
            .addCase(searchAndFilterItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(searchAndFilterItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        addSimpleAsyncCase(builder, loadMyItems, (state, payload) => {
            state.myItems = payload;
        });
        addSimpleAsyncCase(builder, addNewItem, () => {});
        addSimpleAsyncCase(builder, updateExistingItem, () => {});
        addSimpleAsyncCase(builder, reviewExistingItem, () => {});
    },
});

export const { resetItems, setQuery, toggleCategoryId, clearFilters } =
    itemsSlice.actions;
export default itemsSlice.reducer;

export {
    loadItems,
    searchAndFilterItems,
    loadMyItems,
    addNewItem,
    updateExistingItem,
    reviewExistingItem,
} from "./thunks";
