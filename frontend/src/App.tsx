import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";

import ResumeBuilder from "./Pages/ResumeBuilder";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import About from "./Pages/About";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./Pages/ProtectedRoute";
import PrivateLayout from "./layouts/PrivateLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeProvider>
          <Routes>

            {/* 🔓 Public pages – accessible always */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* 🔐 ONLY protected page */}
            <Route
              element={
                <ProtectedRoute>
                  <PrivateLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/resume-builder" element={<ResumeBuilder />} />
            </Route>

          </Routes>
        </ResumeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
