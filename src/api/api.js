import axios from 'axios';

// Cria uma instância do Axios com a URL base da sua API Node.js
const api = axios.create({
  baseURL: 'http://localhost:3000', // A porta da sua API
});

// Funções para interagir com a API

// -- Perfis --
export const getPerfis = () => api.get('/perfis');
export const createPerfil = (nome) => api.post('/perfis', { nome });

// -- Matérias --
export const getMateriasByPerfil = (idPerfil) => api.get(`/perfis/${idPerfil}/materias`);
export const createMateria = (nome, idPerfil) => api.post('/materias', { nome, idPerfil });

// -- Tarefas --
export const getTarefasByMateria = (idMateria) => api.get(`/materias/${idMateria}/tarefas`);
export const createTarefa = (nome, descricao, idMateria) => api.post('/tarefas', { nome, descricao, idMateria });

export default api;
