import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../../store/hooks";

export const ConnectionOverlay = () => {
    const status = useAppSelector((state) => state.connection.status);

    if (status === "connected") return null;

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(4px)",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                textAlign="center"
                px={4}
            >
                <CircularProgress sx={{ color: "primary.main" }} />
                <Typography variant="subtitle1" fontWeight={600} color="white">
                    {status === "connecting"
                        ? "Connecting to backend..."
                        : "Connection lost — retrying..."}
                </Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)" maxWidth={300}>
                    This demo runs on a free-tier server that sleeps when inactive.
                    First connection may take up to 50 seconds, please be patient.
                </Typography>
            </Box>
        </Box>
    );
};