import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
    return;
  }
    async function refreshUser() {
      try {
        // 🔥 STEP 7: Refresh Pro status from backend
        const res = await API.get("/auth/me");

        // ✅ Update context
        setUser(res.data);

        // ✅ Persist for refresh safety
        localStorage.setItem("user", JSON.stringify(res.data));
      } catch (err) {
        console.error("Failed to refresh user after payment", err);
      } finally {
        setLoading(false);
      }
    }

    refreshUser();
  }, [setUser, navigate]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Finalizing payment...
      </p>
    );
  }

   if (user && !user.isPro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-yellow-500 text-6xl mb-4">⚠️</div>

        <h1 className="text-2xl font-bold mb-2">
          Upgrade to Pro
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Please buy our Pro model to access premium features like
          PDF download and advanced templates.
        </p>

        <button
          onClick={() => navigate("/resume-builder")}
          className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Go to Resume Builder
        </button>
      </div>
    );
  }

  /* ✅ LOGGED IN + PRO USER */
  if (user && user.isPro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-green-600 text-6xl mb-4">✔</div>

        <h1 className="text-2xl font-bold mb-2">
          You are using Pro Model!
        </h1>

        <p className="text-gray-600 mb-6">
          You are now a Pro user 🎉  
          Enjoy more premium features!
        </p>

        <button
          onClick={() => navigate("/resume-builder")}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go to Resume Builder
        </button>
      </div>
    );
  }

  return null;
}