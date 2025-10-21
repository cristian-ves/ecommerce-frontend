import { Box, Container } from "@mui/material";
import mainImage from './assets/main.png';
import { AppInfo } from './components/main/AppInfo';

export default function App() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        minHeight: '100vh',
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <img
        alt="ecommerce"
        src={mainImage}
        style={{
          width: '100%',
          maxWidth: 600,
          height: 'auto',
          display: 'block',
          margin: '0 auto'
        }}
      />

      <AppInfo />

    </Container>
  );
}
