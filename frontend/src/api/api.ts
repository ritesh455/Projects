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


/* DOWNLOAD RESUME PDF (PRO ONLY) */
export const downloadResumePdf = async (html: string) => {
  const res = await API.post(
    "/pdf/download",
    { html },
    {
      responseType: "blob", // 👈 IMPORTANT for file download
    }
  );
  return res.data;
};

/* CREATE STRIPE CHECKOUT SESSION */
export const createCheckoutSession = async () => {
  const res = await API.post("/payments/create-checkout");
  return res.data;
};

export const saveResumeOnly = async (resumeData: any) => {
  const res = await API.post("/ai-resume/save", resumeData);
  return res.data;
};



export default API;
