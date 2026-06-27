import { Group, PersonAdd, BarChart } from "@mui/icons-material";
import { RoleLayout } from "./RoleLayout";

export const AdminLayout = () => {
    const navItems = [
        { label: "Employees", path: "/admin", icon: <Group />, end: true },
        { label: "Add Employee", path: "/admin/add-employee", icon: <PersonAdd /> },
        { label: "Reports", path: "/admin/reports", icon: <BarChart /> },
    ];

    return <RoleLayout navItems={navItems} roleLabel="Admin" />;
};