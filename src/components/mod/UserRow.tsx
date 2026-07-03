import { TableRow, TableCell, Button } from "@mui/material";
import { toggleBanThunk, type UserManager } from "../../features/mod";
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

interface Props {
    user: UserManager;
    actionLabel: string;
    actionColor?: "primary" | "error" | "success" | "warning" | "info" | "secondary";
}

export const UserRow = ({ user, actionLabel, actionColor = "primary" }: Props) => {

    const dispatch = useAppDispatch();
    const { banningId } = useAppSelector(state => state.mod);

    const { enqueueSnackbar } = useSnackbar();

    const handleBanToggle = () => {
        dispatch(toggleBanThunk(user.id))
        if (user.suspended) {
            enqueueSnackbar(`${user.name} has been unbanned`, { variant: "success" });
        } else {
            enqueueSnackbar(`${user.name} has been banned`, { variant: "warning" });
        }
    };
    return (
        <TableRow key={user.id} hover>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell align="right">
                <Button
                    variant="outlined"
                    color={actionColor}
                    size="small"
                    onClick={handleBanToggle}
                    disabled={banningId === user.id}
                >
                    {banningId === user.id ? actionLabel + 'ning...' : actionLabel}
                </Button>
            </TableCell>
        </TableRow>
    );
};
