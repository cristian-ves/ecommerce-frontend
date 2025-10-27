import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { UserRow } from "./UserRow";
import type { UserManager } from "../../features/mod";

interface Props {
    users: UserManager[];
    actionLabel: string;
    actionColor?: "primary" | "error" | "success" | "warning" | "info" | "secondary";
}

export const UserTable = ({ users, actionLabel, actionColor = "primary" }: Props) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <UserRow
                                key={user.id}
                                user={user}
                                actionLabel={actionLabel}
                                actionColor={actionColor}
                            />
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography variant="body2" color="text.secondary">
                                    No users found
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
