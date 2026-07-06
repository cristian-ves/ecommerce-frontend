import { Box, Container } from "@mui/material";
import mainImage from './assets/main.png';
import { AppInfo } from './components/main/AppInfo';

export default function App() {

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 1.5, sm: 3, md: 8 },
          textAlign: { xs: "center", md: "left" },
          py: { xs: 2, md: 0 },
        }}
      >
        <Box
          component="img"
          alt="ecommerce"
          src={mainImage}
          sx={{
            width: "100%",
            maxWidth: { xs: 200, sm: 350, md: 500 },
            height: "auto",
            display: "block",
            mx: "auto",
            flexShrink: 0,
          }}
        />
        <AppInfo />
      </Container>
    </Box>
  );
}