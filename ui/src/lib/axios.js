import axios from "axios";

// const baseURL =
//   import.meta.env.VITE_ENV === "development"
//     ? import.meta.env.VITE_API_URL
//     : "/api/v1";

console.log(import.meta.env.VITE_ENV);

export const axiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});
