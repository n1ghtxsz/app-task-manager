import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createTarefa } from '../api/api';

const AddTaskForm = ({ idMateria, onTaskAdded }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim() || !idMateria) return;
    try {
      const response = await createTarefa(nome, descricao, idMateria);
      onTaskAdded(response.data);
      setNome('');
      setDescricao('');
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        label="Nova Tarefa"
        variant="standard"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        size="small"
      />
       <TextField
        label="Descrição (opcional)"
        variant="standard"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        fullWidth
        size="small"
        sx={{mt: 1, mb: 1}}
      />
      <Button type="submit" variant="outlined" size="small" sx={{ mt: 1 }}>+</Button>
    </Box>
  );
};

export default AddTaskForm;
