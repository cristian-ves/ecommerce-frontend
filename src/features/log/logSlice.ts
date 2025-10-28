import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { LogState } from "./";
import { deliverPurchase, getPurchases, updateDeliveryDate } from "./";
import type { PurchaseDTO } from "../purchase/type";

const initialState: LogState = {
    purchases: [],
    error: null,
};

export const getPurchasesThunk = createAsyncThunk<PurchaseDTO[], void>(
    "log/getPurchases",
    async (_, { rejectWithValue }) => {
        try {
            return await getPurchases();
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch item requests"
            );
        }
    }
);

export const deliverPurchaseThunk = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("log/deliverPurchase", async (purchaseId, { rejectWithValue }) => {
    try {
        await deliverPurchase(purchaseId);
        return purchaseId;
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data || "Failed to deliver purchase"
        );
    }
});

export const updateDeliveryDateThunk = createAsyncThunk<
    PurchaseDTO,
    { purchaseId: number; deliveryDate: string },
    { rejectValue: string }
>(
    "log/updateDeliveryDate",
    async ({ purchaseId, deliveryDate }, { rejectWithValue }) => {
        try {
            const updated = await updateDeliveryDate(purchaseId, deliveryDate);
            return updated;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to update delivery date"
            );
        }
    }
);

const logSlice = createSlice({
    name: "log",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getPurchasesThunk.fulfilled,
                (state, action: PayloadAction<PurchaseDTO[]>) => {
                    state.purchases = action.payload;
                    state.error = null;
                }
            )
            .addCase(getPurchasesThunk.rejected, (state, action) => {
                state.purchases = [];
                state.error = action.payload as string;
            });
        builder
            .addCase(deliverPurchaseThunk.fulfilled, (state, action) => {
                const purchaseId = action.payload;
                const purchase = state.purchases.find(
                    (p) => p.purchaseId === purchaseId
                );
                if (purchase) {
                    purchase.delivered = true;
                    purchase.deliveryDate = new Date();
                }
            })
            .addCase(deliverPurchaseThunk.rejected, (state, action) => {
                state.error = action.payload as string;
            });
        builder
            .addCase(
                updateDeliveryDateThunk.fulfilled,
                (state, action: PayloadAction<PurchaseDTO>) => {
                    const updated = action.payload;
                    const idx = state.purchases.findIndex(
                        (p) => p.purchaseId === updated.purchaseId
                    );
                    if (idx !== -1) state.purchases[idx] = updated;
                    state.error = null;
                }
            )
            .addCase(updateDeliveryDateThunk.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default logSlice.reducer;
