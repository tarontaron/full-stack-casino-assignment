import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { REST_API_URL } from '../constants/environment';

const client = axios.create({
  baseURL: REST_API_URL,
});

client.interceptors.request.use(config => {
  const token = Cookies.get('access_token');

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  return config;
});

client.interceptors.response.use(
  response => response,
  error => {
    const data = error.response?.data;

    if (data?.message) {
      toast.error(data?.message.toString());
    } else if (data?.error) {
      toast.error(data?.error.toString());
    }

    throw error;
  },
);

export default client;
