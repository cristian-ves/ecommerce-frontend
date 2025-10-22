import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#BFA36A",
            contrastText: "#FFFFFF",
        },
        secondary: {
            main: "#8C8675",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#F9F7F3",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#2C2A28",
            secondary: "#6B6559",
        },
        divider: "rgba(44,42,40,0.15)",
    },
    typography: {
        fontFamily: `"Lora", "Roboto", "Helvetica", "Arial", sans-serif`,
        h1: {
            fontFamily: `"Lora", serif`,
            fontWeight: 700,
            letterSpacing: "0.03em",
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: `"Lora", serif`,
            fontWeight: 600,
            letterSpacing: "0.02em",
            lineHeight: 1.25,
        },
        h3: {
            fontFamily: `"Lora", serif`,
            fontWeight: 500,
            letterSpacing: "0.01em",
            lineHeight: 1.3,
        },
        body1: {
            fontFamily: `"Roboto", sans-serif`,
            color: "#2C2A28",
            lineHeight: 1.7,
        },
        body2: {
            fontFamily: `"Roboto", sans-serif`,
            color: "#6B6559",
            lineHeight: 1.6,
        },
        button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                    padding: "8px 20px",
                },
                containedPrimary: {
                    background:
                        "linear-gradient(135deg, #D4BA7A 0%, #BFA36A 100%)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                    boxShadow: "0 8px 8px rgba(0,0,0,0.15)",
                    backgroundColor: "#FFFFFF",
                },
            },
        },
    },
});

export default theme;
