import axios from 'axios';
import { useAuthStore } from '../store/authStore';

useAuthStore.subscribe((state) => {
  const token = state.token;
  if (token?.access_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
});

const initialToken = useAuthStore.getState().token;
if (initialToken?.access_token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${initialToken.access_token}`;
} else {
  delete axios.defaults.headers.common['Authorization'];
}
