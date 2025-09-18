import axios from 'axios'; // importa a biblioteca axios -> axios é uma biblioteca para fazer requisições HTTP

// cria uma instância do axios com a configuração baseURL

const api = axios.create({
  baseURL: 'http://10.136.38.151:3000/baladas' // Android emulador usa 10.0.2.2 para localhost
  // Se for device físico: use seu IP da rede ex: http://localhost:${port}/baladas
});

export default api;