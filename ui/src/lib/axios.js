import axios from "axios";

const baseURL =
  import.meta.env.VITE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "/";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
