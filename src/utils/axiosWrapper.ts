import axios from 'axios';
import { useAuthStore } from '../store/authStore';

useAuthStore.subscribe((state) => {
  const token = state.token;
  if (token?.accessToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
});

const initialToken = useAuthStore.getState().token;
if (initialToken?.accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${initialToken.accessToken}`;
} else {
  delete axios.defaults.headers.common['Authorization'];
}
