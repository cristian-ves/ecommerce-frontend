import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTopSellersItemsThunk } from "../../../features/admin/reportsSlice";
import { Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import ReportTable from "../../../components/admin/ReportTable";
import { getDefaultDates } from "../../../helper/reportsDate";

export const TopClientsSalesPage = () => {
    const dispatch = useAppDispatch();
    const { topSellersItems, loading, error } = useAppSelector(
        (state) => state.reports
    );

    const { start, end } = getDefaultDates();
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);

    const handleFetch = () => {
        dispatch(fetchTopSellersItemsThunk({ startDate, endDate }));
    };

    const tableData = topSellersItems.map((c) => ({
        id: c.sellerId,
        name: c.sellerName,
        value: c.totalItemsSold,
    }));

    return (
        <Box>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
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
                <Button variant="contained" onClick={handleFetch}>
                    Generate Report
                </Button>
            </Box>

            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}

            {!loading && !error && topSellersItems.length > 0 && (
                <ReportTable
                    data={tableData}
                    nameHeader="Seller"
                    valueHeader="Items Sold"
                />
            )}
        </Box>
    );
};
