import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

interface ReportRow {
    id: number;
    name: string;
    value: number;
}

interface ReportTableProps {
    data: ReportRow[];
    nameHeader: string;
    valueHeader: string;
}

const ReportTable: React.FC<ReportTableProps> = ({ data, nameHeader, valueHeader }) => {
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
