import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import { acceptItemThunk, getItemRequestsThunk, rejectItemThunk } from "../../features/mod";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ItemRequestCard } from "../../components/mod/ItemRequestCard";

export const ItemRequests = () => {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.mod);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        dispatch(getItemRequestsThunk());
    }, []);

    const handleAccept = async (id: number) => {
        const result = await dispatch(acceptItemThunk(id));
        if (acceptItemThunk.fulfilled.match(result)) {
            enqueueSnackbar("Item accepted successfully!", { variant: "success" });
        } else {
            enqueueSnackbar("Failed to accept item", { variant: "error" });
        }
    };

    const handleReject = async (id: number) => {
        const result = await dispatch(rejectItemThunk(id));
        if (rejectItemThunk.fulfilled.match(result)) {
            enqueueSnackbar("Item rejected successfully!", { variant: "success" });
        } else {
            enqueueSnackbar("Failed to reject item", { variant: "error" });
        }
    };

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 2 }}>
                {items.length === 0 ? (

                    <div>
                        <Typography variant="h6" fontWeight="medium" gutterBottom>
                            No Active Item Requests
                        </Typography>
                        <Typography variant="body2">
                            There are no active item requests at this moment.
                        </Typography>
                    </div>
                ) : (
                    items.map(item => (
                        <ItemRequestCard
                            key={item.id}
                            item={item}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))
                )}
            </Box>
        </Box>
    );

};
