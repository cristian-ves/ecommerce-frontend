import { Home as HomeIcon, Block } from "@mui/icons-material";
import { RoleLayout } from "./RoleLayout";

export const ModLayout = () => {
    const navItems = [
        { label: "Item Request", path: "/mod", icon: <HomeIcon />, end: true },
        { label: "Bans", path: "/mod/bans", icon: <Block /> },
    ];

    return <RoleLayout navItems={navItems} roleLabel="Moderator" />;
};