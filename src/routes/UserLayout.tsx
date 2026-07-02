import { Home as HomeIcon, ShoppingBag } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaShoppingBag, FaDollarSign } from "react-icons/fa";
import { useState, useEffect } from "react";

import { useAppSelector } from "../store/hooks";
import { RoleLayout } from "./RoleLayout";

export const UserRoutes = () => {
    const { items } = useAppSelector((state) => state.cart);
    const [bump, setBump] = useState(false);

    useEffect(() => {
        if (items.length === 0) return;
        setBump(true);
        const timer = setTimeout(() => setBump(false), 300);
        return () => clearTimeout(timer);
    }, [items.length]);

    const navItems = [
        { label: "Home", path: "/user", icon: <HomeIcon />, end: true },
        { label: "Buy", path: "/user/buy", icon: <FaShoppingBag /> },
        { label: "Sell", path: "/user/sell", icon: <FaDollarSign /> },
        {
            label: `Cart (${items.length})`,
            path: "/user/cart",
            icon: <ShoppingCartIcon />,
            bump,
        },
        { label: "Purchases", path: "/user/purchases", icon: <ShoppingBag /> },
    ];

    return <RoleLayout navItems={navItems} />;
};