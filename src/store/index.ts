import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import itemsSlice from "../features/items/slice";
import cartSlice from "../features/cart/cartSlice";
import purchasesSlice from "../features/purchase/purchaseSlice";
import modSlice from "../features/mod/modSlice";
import logSlice from "../features/log/logSlice";
import adminSlice from "../features/admin/adminSlice";
import reportsSlice from "../features/admin/reportsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsSlice,
        cart: cartSlice,
        purchases: purchasesSlice,
        mod: modSlice,
        log: logSlice,
        admin: adminSlice,
        reports: reportsSlice,
    },
    devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
