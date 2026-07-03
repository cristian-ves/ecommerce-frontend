import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from "@mui/material";

interface ReportRow {
    id: number;
    name: string;
    value: number;
}

interface ReportTableProps {
    data: ReportRow[];
    nameHeader: string;
    valueHeader: string;
    loading?: boolean;
    error?: string | null;
}

const ReportTable = ({ data, nameHeader, valueHeader, loading = false, error }: ReportTableProps) => {

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (data.length === 0) return <></>;

    if (!!error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 4 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>{nameHeader}</TableCell>
                        <TableCell>{valueHeader}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                backgroundColor: index === 0 ? 'rgba(255, 223, 186, 0.3)' : 'inherit',
                                fontWeight: index === 0 ? 'bold' : 'normal'
                            }}
                        >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReportTable;