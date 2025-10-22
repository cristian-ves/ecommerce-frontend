import { Box, Typography } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface RatingStarsProps {
    rating: number;
    rates: number;
}

export const RatingStars = ({ rating, rates }: RatingStarsProps) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            {Array(fullStars).fill(0).map((_, i) => (
                <AiFillStar key={`full-${i}`} color="#BFA36A" />
            ))}

            {hasHalfStar && (
                <Box sx={{ position: 'relative', width: 20, height: 20 }}>
                    <AiOutlineStar color="#BFA36A" size={20} />
                    <Box
                        sx={{
                            position: 'absolute',
                            overflow: 'hidden',
                            width: '50%',
                            top: 0,
                            left: 0,
                        }}
                    >
                        <AiFillStar color="#BFA36A" size={20} />
                    </Box>
                </Box>
            )}

            {Array(emptyStars).fill(0).map((_, i) => (
                <AiOutlineStar key={`empty-${i}`} color="#BFA36A" />
            ))}

            <Typography variant="caption" sx={{ ml: 0.5, color: "text.secondary" }}>
                ({rates})
            </Typography>
        </Box>
    );
};
