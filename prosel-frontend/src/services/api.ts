import axios from "axios";

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || "https://api.homologation.cliqdrive.com.br";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Accept: "application/json;version=v1_web",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("access_token");
      try { window.location.replace("/login"); } catch {}
    }
    return Promise.reject(err);
  }
);

export default api;
