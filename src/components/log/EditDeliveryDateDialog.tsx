import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

interface Props {
    open: boolean;
    newDate: string;
    onClose: () => void;
    onSave: () => void;
    setNewDate: (val: string) => void;
}

export const EditDeliveryDateDialog = ({
    open,
    newDate,
    onClose,
    onSave,
    setNewDate,
}: Props) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Delivery Date</DialogTitle>
        <DialogContent>
            <TextField
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={onSave}>
                Save
            </Button>
        </DialogActions>
    </Dialog>
);
