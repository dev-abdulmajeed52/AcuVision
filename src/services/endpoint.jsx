import axios from 'axios';

const API_BASE_URL = 'https://d2fg664z-8000.inc1.devtunnels.ms/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle Unauthorized error (401)
      if (error.response.status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        // Perform logout actions if needed
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      // Handle other errors
      console.error('API Error:', error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
