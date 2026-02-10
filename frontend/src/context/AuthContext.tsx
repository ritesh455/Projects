import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  isPro: boolean;              // 🔥 NEW
  proExpiresAt: string | null; // 🔥 NEW
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // 🔥 NEW
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  //  NEW: Refresh user data (e.g. after payment)
  const refreshUser = async () => {
  try {
    const res = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    console.error("Failed to refresh user");
  }
};


  // ✅ keep user logged in on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginUser({ email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setUser(res.data.user);
     alert("Login successful");
  };

  const register = async (name: string, email: string, password: string) => {
    await registerUser({ name, email, password });
    alert("Registration successful. Please login.");
  };

  const navigate = useNavigate();

  const logout = async () => {
    try {
      // call backend to blacklist token
      await logoutUser();
    } catch (err) {
      // ignore network errors but still clear local state
      console.warn("Logout API failed", err);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert("Logged out successfully");
    navigate("/home");
  };

  return (
    <AuthContext.Provider value={{ user,setUser,refreshUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
