import { Box, Container } from "@mui/material";
import mainImage from './assets/main.jpg';
import { AppInfo } from './components/main/AppInfo';

export default function App() {

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minHeight: '100vh',
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <img
        alt="ecommerce"
        src={mainImage}
        style={{
          width: '100%',
          maxWidth: 500,
          height: 'auto',
          display: 'block',
          margin: '0 auto'
        }}
      />

      <AppInfo />

    </Container>
  );
}
