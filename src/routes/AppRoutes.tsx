import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";

import App from "../App";
import { Login, Register } from "../pages/auth";
import { Main, Buy, Sell, Cart, Cards } from "../pages/user";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth } from "../features/auth";
import { UserRoutes } from "./UserLayout";
import { loadCart } from "../features/cart";
import { Purchases } from "../pages/purchase/Purchases";
import { AddItems } from "../pages/user/AddItems";
import { SellLayout } from "./SellLayout";

export default function AppRoutes() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !user) {
            (async () => {
                const resultAction = await dispatch(checkAuth());

                if (checkAuth.fulfilled.match(resultAction)) {
                    const user = resultAction.payload;
                    await dispatch(loadCart(user.id));
                }

            })();
        }
    }, [user]);

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Routes>
                {!user ? (
                    <>
                        <Route path="/" element={<App />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/*" element={<Navigate to="/" replace />} />
                    </>
                ) : user.role.id === 4 ? (
                    <>
                        <Route path="/user" element={<UserRoutes />}>
                            <Route index element={<Main />} />
                            <Route path="buy" element={<Buy />} />
                            <Route path="sell" element={<SellLayout />}>
                                <Route index element={<Sell />} />
                                <Route path="add" element={<AddItems />} />
                            </Route>
                            <Route path="cart" element={<Cart />} />
                            <Route path="cards" element={<Cards />} />
                            <Route path="purchases" element={<Purchases />} />
                        </Route>
                        <Route path="/*" element={<Navigate to="/user" replace />} />
                    </>
                ) : (
                    <Route path="/process" element={<h1>Working on it...</h1>} />
                )}
            </Routes>
        </Box>
    );
}
