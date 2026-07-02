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
import type { Item } from "../items";

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
    { userId: number; itemId: number; item?: Item }
>("cart/addToCart", async ({ userId, itemId }, { rejectWithValue }) => {
    try {
        await addItemToCart(userId, itemId);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to add item");
    }
});

export const decrementFromCart = createAsyncThunk<
    void,
    { userId: number; itemId: number }
>("cart/decrementFromCart", async ({ userId, itemId }, { rejectWithValue }) => {
    try {
        await decrementItemFromCart(userId, itemId);
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data || "Failed to decrement item"
        );
    }
});

export const removeFromCart = createAsyncThunk<
    void,
    { userId: number; itemId: number }
>("cart/removeFromCart", async ({ userId, itemId }, { rejectWithValue }) => {
    try {
        await deleteItemFromCart(userId, itemId);
    } catch (err: any) {
        return rejectWithValue(err.response?.data || "Failed to delete item");
    }
});

export const clearUserCart = createAsyncThunk<void, number>(
    "cart/clearUserCart",
    async (userId, { rejectWithValue }) => {
        try {
            await clearCart(userId);
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
        // loadCart
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

        // addToCart — optimistic
        builder
            .addCase(addToCart.pending, (state, action) => {
                const { itemId, item } = action.meta.arg;
                const existing = state.items.find((i) => i.item.id === itemId);
                if (existing) {
                    existing.quantity += 1;
                } else if (item) {
                    state.items.push({ item, quantity: 1 });
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // decrementFromCart
        builder
            .addCase(decrementFromCart.pending, (state, action) => {
                const { itemId } = action.meta.arg;
                const existing = state.items.find((i) => i.item.id === itemId);
                if (existing) {
                    if (existing.quantity <= 1) {
                        state.items = state.items.filter(
                            (i) => i.item.id !== itemId
                        );
                    } else {
                        existing.quantity -= 1;
                    }
                }
            })
            .addCase(decrementFromCart.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // removeFromCart
        builder
            .addCase(removeFromCart.pending, (state, action) => {
                const { itemId } = action.meta.arg;
                state.items = state.items.filter((i) => i.item.id !== itemId);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // clearUserCart
        builder
            .addCase(clearUserCart.pending, (state) => {
                state.items = [];
            })
            .addCase(clearUserCart.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default cartSlice.reducer;
