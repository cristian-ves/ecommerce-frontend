import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import 'normalize.css';
import { SnackbarProvider } from 'notistack'

import AppRoutes from './routes/AppRoutes';
import { store } from './store';
import theme from './utils/theme';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          autoHideDuration={3000}
        >
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
