import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true });
        useAuthStore.getState().setTokens(data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch { useAuthStore.getState().logout(); }
    }
    return Promise.reject(err);
  }
);

export default api;
