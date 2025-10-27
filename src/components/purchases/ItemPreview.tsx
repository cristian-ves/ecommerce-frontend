import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface ItemPreviewProps {
    name: string;
    image?: string;
    price?: number;
    quantity: number;
}

export const ItemPreview = ({ name, image, price, quantity }: ItemPreviewProps) => (
    <Card
        sx={{
            flex: "1 1 120px",
            maxWidth: 160,
            minWidth: 120,
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
    >
        {image && (
            <CardMedia
                component="img"
                image={image}
                alt={name}
                sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                }}
            />
        )}
        <CardContent sx={{ p: 1 }}>
            <Typography variant="body2" noWrap fontWeight={500}>
                {name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
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
