import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base url
});

// attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (req.headers) {
    req.headers["Content-Type"] = "application/json";
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }

  return req;
});

// ---------------- AUTH APIS ----------------
export const loginUser = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => API.post("/auth/register", data);

export const logoutUser = () => API.post("/auth/logout");

// ---------------- RESUME APIS ----------------

/* FETCH USER RESUME */
export const fetchUserResume = async () => {
  try {
    const res = await API.get("/ai-resume/me");
    return res.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch resume"
    );
  }
};

/* IMPROVE & SAVE RESUME */
export const improveAndSaveResume = async (resumeData: any) => {
  try {
    const res = await API.post(
      "/ai-resume/improve-and-save",
      resumeData
    );
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

export default API;
