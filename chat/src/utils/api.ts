import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "api/v1",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
