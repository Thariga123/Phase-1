import axios from 'axios';
import { loadingService } from '../context/LoadingContext';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});


api.interceptors.request.use(
  config => {
    loadingService.setLoading(true); 
    config.headers['Authorization'] = 'Bearer dummy_token'; 
    console.log('[Request]', config);
    return config;
  },
  error => {
    loadingService.setLoading(false);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  response => {
    loadingService.setLoading(false);
    console.log('[Response]', response);
    return response;
  },
  error => {
    loadingService.setLoading(false);
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          console.error('Unauthorized - Redirect to login');
          break;
        case 404:
          console.error('Not Found');
          break;
        case 500:
          console.error('Server Error');
          break;
        default:
          console.error('Unhandled Error:', status);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
