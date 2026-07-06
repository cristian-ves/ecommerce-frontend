import { Box, Skeleton, CardMedia, Typography } from "@mui/material";
import { useState } from "react";

type ImageState = "loading" | "loaded" | "error";

interface ItemImageProps {
    src: string;
    alt: string;
}

export const ItemImage = ({ src, alt }: ItemImageProps) => {
    const [state, setState] = useState<ImageState>("loading");

    return (
        <Box sx={{ position: "relative", height: 180, width: "100%" }}>
            {state === "loading" && (
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{ position: "absolute", inset: 0, height: "100%", width: "100%" }}
                />
            )}
            {state === "error" ? (
                <Box
                    sx={{
                        height: 180,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.100",
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        Image not available
                    </Typography>
                </Box>
            ) : (
                <CardMedia
                    component="img"
                    image={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setState("loaded")}
                    onError={() => setState("error")}
                    sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        opacity: state === "loaded" ? 1 : 0,
                        transition: "opacity 0.2s ease",
                    }}
                />
            )}
        </Box>
    );
};