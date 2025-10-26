import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type {
    CardResponse,
    PurchaseDTO,
    PurchaseRequest,
    PurchasesState,
} from "./type";
import { fetchCards, addCard, makePurchase, fetchPurchases } from "./api";

const initialState: PurchasesState = {
    cards: [],
    purchases: [],
    loading: false,
    error: null,
};

export const loadPurchases = createAsyncThunk<PurchaseDTO[], number>(
    "purchases/loadPurchases",
    async (userId, { rejectWithValue }) => {
        try {
            return await fetchPurchases(userId);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch purchases"
            );
        }
    }
);

export const loadCards = createAsyncThunk<CardResponse[], number>(
    "purchases/loadCards",
    async (userId, { rejectWithValue }) => {
        try {
            return await fetchCards(userId);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch cards"
            );
        }
    }
);

export const saveCard = createAsyncThunk(
    "purchases/saveCard",
    async (
        card: {
            name: string;
            number: string;
            expiration: string;
            cvv: string;
            userId: number;
        },
        { rejectWithValue }
    ) => {
        try {
            return await addCard(card);
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to save card");
        }
    }
);

export const purchaseThunk = createAsyncThunk(
    "pruchases/purchase",
    async (purchase: PurchaseRequest, { rejectWithValue }) => {
        try {
            return await makePurchase(purchase);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to make a purchase"
            );
        }
    }
);

const purchasesSlice = createSlice({
    name: "purchases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                loadCards.fulfilled,
                (state, action: PayloadAction<CardResponse[]>) => {
                    state.loading = false;
                    state.cards = action.payload;
                    state.error = null;
                }
            )
            .addCase(loadCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(saveCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveCard.fulfilled, (state, action) => {
                state.loading = false;

                const newCardWithLast4 = {
                    ...action.payload,
                    last4: action.payload.number.slice(-4),
                };

                state.cards.push(newCardWithLast4);
                state.error = null;
            })
            .addCase(saveCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(purchaseThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                purchaseThunk.fulfilled,
                (state, action: PayloadAction<PurchaseDTO>) => {
                    state.loading = false;
                    state.purchases.push(action.payload);
                    state.error = null;
                }
            )
            .addCase(purchaseThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(loadPurchases.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                loadPurchases.fulfilled,
                (state, action: PayloadAction<PurchaseDTO[]>) => {
                    state.loading = false;
                    state.purchases = action.payload;
                    state.error = null;
                }
            )
            .addCase(loadPurchases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default purchasesSlice.reducer;
