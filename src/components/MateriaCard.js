import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getTarefasByMateria } from '../api/api';
import AddTaskForm from './AddTaskForm';

const MateriaCard = ({ materia }) => {
  const [tarefas, setTarefas] = useState([]);

  const fetchTarefas = async () => {
    try {
      const response = await getTarefasByMateria(materia.id);
      setTarefas(response.data);
    } catch (error) {
      console.error(`Erro ao buscar tarefas da matéria ${materia.nome}:`, error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, [materia.id]);

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {materia.nome}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tarefas Pendentes
        </Typography>
        <List dense>
          {tarefas.length > 0 ? (
            tarefas.map((tarefa) => (
              <ListItem key={tarefa.id}>
                <ListItemText primary={tarefa.nome} secondary={tarefa.descricao || 'Sem descrição'} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">Nenhuma tarefa encontrada.</Typography>
          )}
        </List>
        <AddTaskForm idMateria={materia.id} onTaskAdded={() => fetchTarefas()} />
      </CardContent>
    </Card>
  );
};

export default MateriaCard;
