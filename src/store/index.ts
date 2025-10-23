import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import itemsSlice from "../features/items/itemsSlice";
import cartSlice from "../features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsSlice,
        cart: cartSlice,
    },
    devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
