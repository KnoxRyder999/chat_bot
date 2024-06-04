import { createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';

// .env variables must be prefixed by VITE_ to be exposed to your Vite-processed code
// https://vitejs.dev/guide/env-and-mode
axios.defaults.baseURL = import.meta.env.VITE_API_HOST;
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, serif',
    allVariants: { color: 'white' },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster />
          <App />
        </ThemeProvider>
        ç{' '}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
