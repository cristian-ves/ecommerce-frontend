import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import itemsSlice from "../features/items/itemsSlice";
import cartSlice from "../features/cart/cartSlice";
import purchasesSlice from "../features/purchase/purchaseSlice";
import modSlice from "../features/mod/modSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsSlice,
        cart: cartSlice,
        purchases: purchasesSlice,
        mod: modSlice,
    },
    devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
