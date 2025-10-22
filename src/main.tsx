import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import 'normalize.css';

import AppRoutes from './routes/AppRoutes';
import { store } from './store';
import theme from './utils/theme';

// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: { main: '#7734e3' },
//     secondary: { main: '#9d88b2' },
//     background: { default: '#1f1926', paper: '#1f1926' },
//     text: { primary: '#fdf7ff', secondary: '#9d88b2' },
//   },
// });


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
