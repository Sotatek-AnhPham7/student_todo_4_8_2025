// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://6895796f039a1a2b288f43fd.mockapi.io/api/students", // Chỉ tới cấp /api
  timeout: 10000, // 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Ví dụ: Thêm token nếu có
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
