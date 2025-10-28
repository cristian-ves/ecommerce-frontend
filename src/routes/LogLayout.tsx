import HomeIcon from "@mui/icons-material/Home";
import { RoleLayout } from "./RoleLayout";

export const LogLayout = () => {
    const navItems = [
        { label: "Purchases", path: "/log", icon: <HomeIcon /> },
    ];

    return <RoleLayout navItems={navItems} roleLabel="Logistics" />;
};
