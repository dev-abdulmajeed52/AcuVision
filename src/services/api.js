import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lpm26cx1-8000.inc1.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`Error: ${error.response?.status}`, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
