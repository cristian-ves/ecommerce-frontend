import type { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import type { ItemsState } from "./types";

export function addSimpleAsyncCase<Returned, ThunkArg>(
    builder: ActionReducerMapBuilder<ItemsState>,
    thunk: AsyncThunk<Returned, ThunkArg, { rejectValue: string }>,
    applyFulfilled: (state: ItemsState, payload: Returned) => void
) {
    builder
        .addCase(thunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
            state.loading = false;
            applyFulfilled(state, action.payload);
        })
        .addCase(thunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
}
