import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const api = axios.create();

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token?.accessToken) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});
