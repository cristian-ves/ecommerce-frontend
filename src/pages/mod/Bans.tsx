import { useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCommonUsersThunk} from "../../features/mod";
import { UserTable } from "../../components/mod/UserTable";

export const Bans = () => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.mod);

    useEffect(() => {
        dispatch(fetchCommonUsersThunk());
    }, [dispatch]);

    const unbannedUsers = users.filter((u) => !u.suspended);
    const bannedUsers = users.filter((u) => u.suspended);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Banned Users
            </Typography>

            <Paper sx={{ p: 2 }}>
                <UserTable
                    users={bannedUsers}
                    actionLabel="Unban"
                    actionColor="error"
                />
            </Paper>

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, mt: 4 }}>
                Active Users
            </Typography>
            <Paper sx={{ p: 2, mt: 2 }}>
                <UserTable
                    users={unbannedUsers}
                    actionLabel="Ban"
                    actionColor="error"
                />
            </Paper>
        </Box>
    );
};
