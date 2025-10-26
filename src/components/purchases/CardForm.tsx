import { Box, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";

interface CardFormProps {
    cardData: { name: string; number: string; expiration: string; cvv: string };
    saveCard: boolean;
    onChange: (field: string, value: string) => void;
    onToggleSave: (value: boolean) => void;
    onHide: () => void;
}

export const CardForm = ({ cardData, saveCard, onChange, onToggleSave, onHide }: CardFormProps) => {
    return (
        <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <TextField
                label="Cardholder Name"
                variant="outlined"
                fullWidth
                value={cardData.name}
                onChange={(e) => onChange("name", e.target.value)}
            />
            <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                value={cardData.number}
                onChange={(e) => onChange("number", e.target.value)}
            />
            <Box display="flex" gap={2}>
                <TextField
                    label="Expiration (MM/YY)"
                    variant="outlined"
                    fullWidth
                    value={cardData.expiration}
                    onChange={(e) => onChange("expiration", e.target.value)}
                />
                <TextField
                    label="CVV"
                    variant="outlined"
                    fullWidth
                    value={cardData.cvv}
                    onChange={(e) => onChange("cvv", e.target.value)}
                />
            </Box>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={saveCard}
                        onChange={(e) => onToggleSave(e.target.checked)}
                        color="primary"
                    />
                }
                label="Save this card for future purchases"
            />

            <Button
                variant="text"
                color="secondary"
                onClick={onHide}
                sx={{ alignSelf: "flex-end" }}
            >
                Hide Card Form
            </Button>
        </Box>
    );
};
