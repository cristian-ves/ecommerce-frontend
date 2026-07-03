import { Box, Card, CardContent, CardMedia, Typography, Skeleton } from "@mui/material";
import { useState } from "react";

type ImageState = "loading" | "loaded" | "error";

interface ItemPreviewProps {
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export const ItemPreview = ({ name, image, price, quantity }: ItemPreviewProps) => {
    const [imageState, setImageState] = useState<ImageState>("loading");

    return (
        <Card
            sx={{
                flex: "1 1 120px",
                maxWidth: 160,
                minWidth: 120,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {image && (
                <Box sx={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>

                    {imageState === "loading" && (
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            sx={{ position: "absolute", inset: 0, height: "100%", width: "100%" }}
                        />
                    )}

                    {imageState === "error" && (
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: "grey.100",
                                p: 1,
                                textAlign: "center"
                            }}
                        >
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                                Image not available
                            </Typography>
                        </Box>
                    )}

                    <CardMedia
                        component="img"
                        image={image}
                        alt={name}
                        onLoad={() => setImageState("loaded")}
                        onError={() => setImageState("error")}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: imageState === "loaded" ? 1 : 0,
                            transition: "opacity 0.2s ease-in-out",
                        }}
                    />
                </Box>
            )}

            <CardContent sx={{ p: 1 }}>
                <Typography variant="body2" noWrap fontWeight={500}>
                    {name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    Quantity: {quantity}
                </Typography>
                {price && (
                    <Typography variant="body2" color="text.secondary">
                        Price: ${price}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};