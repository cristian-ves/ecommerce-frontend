import { Button, CircularProgress, Box } from "@mui/material";
import { ArrowDownward } from "@mui/icons-material";

interface LoadMoreButtonProps {
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
}

export const LoadMoreButton = ({ loading, hasMore, onLoadMore }: LoadMoreButtonProps) => (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
        {loading ? (
            <CircularProgress />
        ) : hasMore ? (
            <Button
                variant="contained"
                color="primary"
                onClick={onLoadMore}
                endIcon={<ArrowDownward />}
            >
                Load More
            </Button>
        ) : (
            <Button variant="outlined" disabled>
                No more items
            </Button>
        )}
    </Box>
);
