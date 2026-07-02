import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchTopClientsOrdersThunk } from "../../../features/admin/reportsSlice";
import {
    Typography,
    CircularProgress,
    Box,
    Button,
    TextField,
} from "@mui/material";
import ReportTable from "../../../components/admin/ReportTable";
import { getDefaultDates } from "../../../helper/reportsDate";

export const TopClientsOrdersPage = () => {
    const dispatch = useAppDispatch();
    const { topClientsOrders, loading, error } = useAppSelector(
        (state) => state.reports
    );

    const { start, end } = getDefaultDates();
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);

    const handleFetch = () => {
        dispatch(fetchTopClientsOrdersThunk({ startDate, endDate }));
    };

    const tableData = topClientsOrders.map((c) => ({
        id: c.userId,
        name: c.userName,
        value: c.totalOrder,
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

            {!loading && !error && topClientsOrders.length > 0 && (
                <ReportTable
                    data={tableData}
                    nameHeader="Client"
                    valueHeader="Orders"
                />
            )}
        </Box>
    );
};
