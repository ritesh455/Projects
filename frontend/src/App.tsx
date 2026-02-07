import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import ResumeBuilder from "./Pages/ResumeBuilder";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
