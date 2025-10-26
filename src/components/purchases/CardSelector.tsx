import { Box, FormControl, InputLabel, MenuItem, Select, Button } from "@mui/material";
import type { CardResponse } from "../../features/purchase/type";

interface Props {
    cards: CardResponse[];
    selectedCard: string;
    showForm: boolean;
    onSelectCard: (id: string) => void;
    onToggleForm: () => void;
}

export const CardSelector = ({ cards, selectedCard, showForm, onSelectCard, onToggleForm }: Props) => {
    return (
        <Box>
            <FormControl fullWidth sx={{ mb: 3 }} disabled={showForm}>
                <InputLabel>Select a saved card</InputLabel>
                <Select
                    value={selectedCard}
                    label="Select a saved card"
                    onChange={(e) => onSelectCard(e.target.value)}
                >
                    {cards.map((card) => (
                        <MenuItem key={card.id} value={card.id}>
                            Card ending in {card.last4}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={onToggleForm}
            >
                {showForm ? "Cancel Adding Card" : "Add a New Card"}
            </Button>
        </Box>
    );
};
