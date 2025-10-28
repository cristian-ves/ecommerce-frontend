import { Home as HomeIcon, Block } from "@mui/icons-material";
import { RoleLayout } from "./RoleLayout";

export const ModLayout = () => {
    const navItems = [
        { label: "Items Request", path: "/mod", icon: <HomeIcon /> },
        { label: "Bans", path: "/mod/bans", icon: <Block /> },
    ];

    return <RoleLayout navItems={navItems} roleLabel="Moderator" />;
};
