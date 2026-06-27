import HomeIcon from "@mui/icons-material/Home";
import { RoleLayout } from "./RoleLayout";

export const LogLayout = () => {
    const navItems = [
        { label: "Purchases", path: "/log", icon: <HomeIcon />, end: true },
    ];

    return <RoleLayout navItems={navItems} roleLabel="Logistics" />;
};