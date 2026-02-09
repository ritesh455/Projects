import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ResumeDataProvider } from "./context/ResumeContext";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResumeBuilder from "./Pages/ResumeBuilder";

import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";

import ProtectedRoute from "./Pages/ProtectedRoute";
import GuestRoute from "./Pages/GuestRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResumeDataProvider>
          <Routes>

            {/* 🔓 PUBLIC ROUTES */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />

              {/* 🚫 Login/Register only for logged-out users */}
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />
            </Route>

            {/* 🔐 PROTECTED ROUTES */}
            <Route
              element={
                <ProtectedRoute>
                  <PrivateLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/resume-builder"
                element={<ResumeBuilder />}
              />
            </Route>

          </Routes>
        </ResumeDataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
