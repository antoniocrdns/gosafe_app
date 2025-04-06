import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-gosafe.onrender.com/api',
});

export default api;