import axios, { AxiosError } from 'axios';
import { CustomError } from './CustomError';
import { API_BASE_URL } from './apiRoutes';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const errorHandler = <T>(error: AxiosError<T>): Promise<never> =>
  Promise.reject(new CustomError(error));

axiosInstance.interceptors.request.use(request => request, errorHandler);

export { axiosInstance };
