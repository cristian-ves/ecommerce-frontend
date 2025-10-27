import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { acceptItemThunk, getItemRequestsThunk, rejectItemThunk } from "../../features/mod";
import { Box } from "@mui/material";
import { ItemRequestCard } from "../../components/mod/ItemRequestCard";
import { useSnackbar } from "notistack";

export const ItemRequests = () => {

    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.mod);

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


    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}>
            {items.map(item => (
                <ItemRequestCard
                    key={item.id}
                    item={item}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            ))}
        </Box>
    );
};
