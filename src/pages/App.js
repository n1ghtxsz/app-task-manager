import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './Dashboard';

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
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
