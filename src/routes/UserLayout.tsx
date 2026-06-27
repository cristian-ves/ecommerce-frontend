import { Home as HomeIcon, ShoppingBag } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FaShoppingBag, FaDollarSign } from "react-icons/fa";
import { useAppSelector } from "../store/hooks";
import { RoleLayout } from "./RoleLayout";

export const UserRoutes = () => {
    const { items } = useAppSelector((state) => state.cart);

    const navItems = [
        { label: "Home", path: "/user", icon: <HomeIcon />, end: true },
        { label: "Buy", path: "/user/buy", icon: <FaShoppingBag /> },
        { label: "Sell", path: "/user/sell", icon: <FaDollarSign /> },
        { label: `Cart (${items.length})`, path: "/user/cart", icon: <ShoppingCartIcon /> },
        { label: "Purchases", path: "/user/purchases", icon: <ShoppingBag /> },
    ];

    return <RoleLayout navItems={navItems} />;
};