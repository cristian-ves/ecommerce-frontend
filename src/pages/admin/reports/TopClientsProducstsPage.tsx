import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTopClientsProductsThunk } from "../../../features/admin/reportsSlice";
import { Box } from "@mui/material";
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
            <ReportTable
                data={tableData}
                nameHeader="Client"
                valueHeader="Products for Sale"
                error={error}
                loading={loading}
            />
        </Box>
    );
};
