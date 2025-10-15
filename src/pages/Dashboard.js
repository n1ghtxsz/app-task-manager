import React, { useState, useEffect } from 'react';
import { Container, Select, MenuItem, FormControl, InputLabel, Typography, Grid, Snackbar } from '@mui/material';
import { getPerfis, getMateriasByPerfil } from '../api/api';
import MateriaCard from '../components/MateriaCard';
import AddPerfilForm from '../components/AddPerfilForm';
import AddMateriaForm from '../components/AddMateriaForm';
import CustomAlert from '../components/CustomAlert';


const Dashboard = () => {
  const [perfis, setPerfis] = useState([]);
  const [selectedPerfilId, setSelectedPerfilId] = useState('');
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  // controla o alerta
  const [alertOpen, setAlertOpen] = useState(false);

  const fetchPerfis = async () => {
    try {
      const response = await getPerfis();
      setPerfis(response.data);
    } catch (error) {
      console.error('Erro ao buscar perfis:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPerfis(); }, []);

  useEffect(() => {
    if (!selectedPerfilId) { setMaterias([]); return; }
    (async () => {
      try {
        const response = await getMateriasByPerfil(selectedPerfilId);
        setMaterias(response.data);
      } catch (error) {
        console.error('Erro ao buscar matérias:', error);
        setMaterias([]);
      }
    })();
  }, [selectedPerfilId]);

  const handlePerfilChange = (event) => setSelectedPerfilId(event.target.value);

  const refreshMaterias = async () => {
    if (!selectedPerfilId) return;
    const response = await getMateriasByPerfil(selectedPerfilId);
    setMaterias(response.data);
  };

  // será chamado pelo AddPerfilForm quando o POST der certo
  const handlePerfilAdded = (novoPerfil) => {
    fetchPerfis();
    if (novoPerfil?.id) setSelectedPerfilId(novoPerfil.id); // opcional: já selecionar o novo
    setAlertOpen(true); // abre o alerta de sucesso
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom component="h1">
        Dashboard de Estudos
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <AddPerfilForm onPerfilAdded={handlePerfilAdded} />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="perfil-select-label">Selecione um Perfil</InputLabel>
            <Select
              labelId="perfil-select-label"
              value={selectedPerfilId}
              label="Selecione um Perfil"
              onChange={handlePerfilChange}
              disabled={loading}
            >
              <MenuItem value=""><em>Nenhum</em></MenuItem>
              {perfis.map((perfil) => (
                <MenuItem key={perfil.id} value={perfil.id}>{perfil.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedPerfilId && (
            <AddMateriaForm idPerfil={selectedPerfilId} onMateriaAdded={refreshMaterias} />
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>Matérias</Typography>
          {selectedPerfilId ? (
            materias.length > 0
              ? materias.map((m) => <MateriaCard key={m.id} materia={m} />)
              : <Typography>Nenhuma matéria encontrada para este perfil.</Typography>
          ) : (
            <Typography>Por favor, selecione um perfil para ver as matérias.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
