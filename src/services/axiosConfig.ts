import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error('Requisição inválida:', error.response.data);
          break;
        case 401:
          alert('Sessão expirada. Por favor, faça login novamente.');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Acesso negado:', error.response.data);
          break;
        case 404:
          console.error('Recurso não encontrado:', error.response.data);
          break;
        case 500:
          console.error('Erro interno do servidor:', error.response.data);
          break;
        default:
          console.error('Erro desconhecido:', error.response.data);
      }
    } else if (error.request) {
      console.error('Erro na requisição:', error.request);
    } else {
      console.error('Erro ao configurar a requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
