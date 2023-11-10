import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import store from "@/store";
import router from "@/router";

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`
  return config;
});

axiosClient.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    store.commit('setToken', null);
    router.push({ name: 'login' });
  }
  throw error;
});

export default axiosClient;
