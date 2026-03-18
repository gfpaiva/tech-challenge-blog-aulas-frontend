import axios, { AxiosInstance } from 'axios';
import { IHttpPort } from '@/common/ports/http.port';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

export const httpAdapter: IHttpPort = {
  get: async (url, config) => {
    const response = await axiosInstance.get(url, { ...config });
    return response.data;
  },
  post: async (url, data, config) => {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  },
  put: async (url, data, config) => {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  },
  delete: async (url, config) => {
    const response = await axiosInstance.delete(url, config);
    return response.data;
  },
};