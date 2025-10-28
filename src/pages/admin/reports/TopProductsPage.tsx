import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTopProductsThunk } from "../../../features/admin/reportsSlice";
import { Typography, CircularProgress, Box, Button, TextField, Stack } from "@mui/material";
import ReportTable from "../../../components/admin/ReportTable";

export const TopProductsPage = () => {
    const dispatch = useAppDispatch();
    const { topProducts, loading, error } = useAppSelector((state) => state.reports);

    const [startDate, setStartDate] = useState("2025-10-01");
    const [endDate, setEndDate] = useState("2025-10-28");

    useEffect(() => {
        dispatch(fetchTopProductsThunk({ startDate, endDate }));
    }, [dispatch, startDate, endDate]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    const tableData = topProducts.map((p) => ({
        id: p.itemId,
        name: p.itemName,
        value: p.quantitySold,
    }));

    return (
        <Box>
            <Stack direction="row" spacing={2} mb={2}>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <Button
                    variant="contained"
                    onClick={() => dispatch(fetchTopProductsThunk({ startDate, endDate }))}
                >
                    Fetch
                </Button>
            </Stack>

            <ReportTable
                data={tableData}
                nameHeader="Product"
                valueHeader="Units Sold"
            />
        </Box>
    );
};
