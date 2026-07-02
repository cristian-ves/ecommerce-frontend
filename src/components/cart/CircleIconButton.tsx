import { IconButton } from "@mui/material";

interface Props {
    onClick: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export const CircleIconButton = ({ onClick, children, disabled = false }: Props) => (
    <IconButton
        onClick={onClick}
        size="small"
        sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: "grey.200",
            p: 0,
        }}
        disabled={disabled}
    >
        {children}
    </IconButton>
);
