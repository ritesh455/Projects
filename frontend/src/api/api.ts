import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base url
});

// attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// auth apis
export const loginUser = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => API.post("/auth/register", data);

export default API;
