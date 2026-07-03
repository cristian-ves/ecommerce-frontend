import { Box, Typography, Divider, CircularProgress } from "@mui/material";
import { usePurchasesData } from "../../hooks/usePurchasesData";
import { PurchaseCard } from "../../components/purchases/PurchaseCard";

export const Purchases = () => {
    const { purchases, loading, error } = usePurchasesData();

    if (loading)
        return (
            <CenteredBox>
                <CircularProgress />
            </CenteredBox>
        );

    if (error)
        return (
            <CenteredBox>
                <Typography color="error">{error}</Typography>
            </CenteredBox>
        );

    if (!purchases.length)
        return (
            <CenteredBox>
                <Typography>No purchases found.</Typography>
            </CenteredBox>
        );

    return (
        <Box p={{ xs: 2, md: 4 }} display="flex" flexDirection="column" gap={3}>
            <Typography variant="h4" fontWeight={600}>
                Your Purchases
            </Typography>
            <Divider />

            {purchases.map((p) => (
                <PurchaseCard
                    key={p.purchaseId}
                    purchase={p}
                />
            ))}
        </Box>
    );
};

const CenteredBox = ({ children }: { children: React.ReactNode }) => (
    <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        textAlign="center"
    >
        {children}
    </Box>
);
