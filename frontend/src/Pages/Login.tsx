import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ hooks MUST be inside component
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          text="Login"
          onClick={() => {
            login();        // mark logged in
            navigate("/"); // redirect to ResumeBuilder
          }}
        />

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
