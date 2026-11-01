import axios from "axios";

export const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL
});

api.defaults.headers.post["Content-Type"] = "application/json";

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
