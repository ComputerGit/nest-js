import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AxiosRequestConfig } from "axios";
import type { AxiosResponse } from "axios";

// 1. Base Configuration
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
};

// 2. Create Instance
const apiClient: AxiosInstance = axios.create(config);

// 3. Interceptors (Middleware for your frontend)

// Request Interceptor: Attaches Token
apiClient.interceptors.request.use(
  (config) => {
    // We will assume the token is stored in localStorage for now
    // Later we can move this to a secure cookie or memory
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Handles Global Errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data, // Return data directly
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Token expired or invalid - Redirect to login
      console.warn("Unauthorized access - redirecting to login");
      // window.location.href = '/auth/login'; // Uncomment when routes are ready
    }

    // Extract the specific error message from your NestJS Exception Filter
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
