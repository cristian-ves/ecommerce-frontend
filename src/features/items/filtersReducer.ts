import type { PayloadAction } from "@reduxjs/toolkit";
import type { ItemsState } from "./types";

export function setQueryReducer(
    state: ItemsState,
    action: PayloadAction<string>
) {
    state.filters.query = action.payload;
}

export function toggleCategoryIdReducer(
    state: ItemsState,
    action: PayloadAction<number>
) {
    const id = action.payload;
    state.filters.categoryIds = state.filters.categoryIds.includes(id)
        ? state.filters.categoryIds.filter((c) => c !== id)
        : [...state.filters.categoryIds, id];
}

export function clearFiltersReducer(state: ItemsState) {
    state.filters.query = "";
    state.filters.categoryIds = [];
}
