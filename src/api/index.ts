import axios, { AxiosError, AxiosResponse } from "axios";
import { CustomError } from "./CustomError";
import apiRoutes, { API_BASE_URL } from "./apiRoutes";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const errorHandler = <T>(error: AxiosError<T>): Promise<never> => Promise.reject(new CustomError(error));

axiosInstance.interceptors.request.use((request) => request, errorHandler);

export { axiosInstance };

export const postImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  const response: AxiosResponse<string> = await axios<File, AxiosResponse<string>>({
    method: "post",
    url: apiRoutes.STORAGE_URL,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
