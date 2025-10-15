import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import HomePage from './HomePage';

// Cria um tema básico para o Material-UI (opcional, mas recomendado)
const theme = createTheme({
  palette: {
    mode: 'light', // Pode ser 'dark'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline serve para normalizar o CSS entre navegadores */}
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
