import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { CartState, CartItem } from "./types";
import {
    fetchCartItems,
    addItemToCart,
    decrementItemFromCart,
    deleteItemFromCart,
    clearCart,
} from "./";

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
};

export const loadCart = createAsyncThunk<CartItem[], number>(
    "cart/loadCart",
    async (userId, { rejectWithValue }) => {
        try {
            return await fetchCartItems(userId);
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to fetch cart"
            );
        }
    }
);

export const addToCart = createAsyncThunk<
    void,
    { userId: number; itemId: number }
>(
    "cart/addToCart",
    async ({ userId, itemId }, { rejectWithValue, dispatch }) => {
        try {
            await addItemToCart(userId, itemId);
            dispatch(loadCart(userId));
        } catch (err: any) {
            return rejectWithValue(err.response?.data || "Failed to add item");
        }
    }
);

export const decrementFromCart = createAsyncThunk<
    void,
    { userId: number; itemId: number }
>(
    "cart/decrementFromCart",
    async ({ userId, itemId }, { rejectWithValue, dispatch }) => {
        try {
            await decrementItemFromCart(userId, itemId);
            dispatch(loadCart(userId));
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to decrement item"
            );
        }
    }
);

export const removeFromCart = createAsyncThunk<
    void,
    { userId: number; itemId: number }
>(
    "cart/removeFromCart",
    async ({ userId, itemId }, { rejectWithValue, dispatch }) => {
        try {
            await deleteItemFromCart(userId, itemId);
            dispatch(loadCart(userId));
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to delete item"
            );
        }
    }
);

export const clearUserCart = createAsyncThunk<void, number>(
    "cart/clearUserCart",
    async (userId, { rejectWithValue, dispatch }) => {
        try {
            await clearCart(userId);
            dispatch(loadCart(userId));
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data || "Failed to clear cart"
            );
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                loadCart.fulfilled,
                (state, action: PayloadAction<CartItem[]>) => {
                    state.loading = false;
                    state.items = action.payload;
                    state.error = null;
                }
            )
            .addCase(loadCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default cartSlice.reducer;
