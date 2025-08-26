import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Slide } from '@mui/material';
import { createPerfil } from '../api/api';
import CustomAlert from './CustomAlert';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const AddPerfilForm = ({ onPerfilAdded }) => {
  const [nome, setNome] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return;
    try {
      const response = await createPerfil(nome);
      onPerfilAdded(response.data); // Informa o componente pai que um novo perfil foi adicionado
      setNome('');
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Criar Novo Perfil</Typography>
      <TextField
        label="Nome do Perfil"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button onClick={() => setOpen(true)} type="submit" variant="contained">Criar</Button>
      <CustomAlert
        open={open}
        onClose={() => setOpen(false)}
        message="Sucesso ao criar este perfil!"
        TransitionComponent={SlideTransition}
      />
    </Box>
  );
};

export default AddPerfilForm;
