import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTopClientsProductsThunk } from "../../../features/admin/reportsSlice";
import { Typography, CircularProgress, Box } from "@mui/material";
import ReportTable from "../../../components/admin/ReportTable";

export const TopClientsProductsPage = () => {
    const dispatch = useAppDispatch();
    const { topClientsProducts, loading, error } = useAppSelector(
        (state) => state.reports
    );

    useEffect(() => {
        dispatch(fetchTopClientsProductsThunk());
    }, [dispatch]);

    const tableData = topClientsProducts.map((c) => ({
        id: c.userId,
        name: c.userName,
        value: c.totalProducts,
    }));

    return (
        <Box>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            {!loading && !error && topClientsProducts.length > 0 && (
                <ReportTable
                    data={tableData}
                    nameHeader="Client"
                    valueHeader="Products for Sale"
                />
            )}
        </Box>
    );
};
