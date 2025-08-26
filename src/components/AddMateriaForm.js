import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Slide } from '@mui/material';
import { createMateria } from '../api/api';
import CustomAlert from './CustomAlert';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const AddMateriaForm = ({ idPerfil, onMateriaAdded }) => {
  const [nome, setNome] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !idPerfil) return;
    try {
      const response = await createMateria(nome, idPerfil);
      onMateriaAdded(response.data);
      setNome('');
    } catch (error) {
      console.error("Erro ao criar matéria:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography variant="subtitle1" gutterBottom>Adicionar Matéria</Typography>
      <TextField
        label="Nome da Matéria"
        variant="outlined"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 1 }}
      />
      <Button onClick={() => setOpen(true)} type="submit" variant="contained" size="small">Adicionar</Button>
      <CustomAlert
        open={open}
        onClose={() => setOpen(false)}
        message="Sucesso ao criar esta Matéria!"
        TransitionComponent={SlideTransition}
      />
    </Box>
  );
};

export default AddMateriaForm;
