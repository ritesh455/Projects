import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoverLetter from "./Pages/CoverLetter";
import { AuthProvider } from "./context/AuthContext";
import { ResumeDataProvider } from "./context/ResumeContext";

import PaymentSuccess from "./Pages/PaymentSuccess";
import { TemplateProvider } from "./context/TemplateContext";
import Templates from "./Pages/Templates";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResumeBuilder from "./Pages/ResumeBuilder";

import PublicLayout from "./layouts/PublicLayout";

import ProtectedRoute from "./Pages/ProtectedRoute";
import GuestRoute from "./Pages/GuestRoute";


import SavedResumes from "./Pages/SavedResumes";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TemplateProvider>  
        <ResumeDataProvider>
          <Routes>

            <Route
  element={
    <ProtectedRoute>
      <PublicLayout />
    </ProtectedRoute>
  }
>
  {/* <Route path="/resume-builder" element={<ResumeBuilder />} /> */}
  <Route path="/saved-resumes" element={<SavedResumes />} />
</Route>
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

             <Route path="/payment-success" element={<PaymentSuccess />} />

            </Route>



  <Route
  path="/templates"
  element={
    <ProtectedRoute>
      <Templates />
    </ProtectedRoute>
  }
/>



            {/* 🔐 PROTECTED ROUTES */}
            <Route
              element={
                <ProtectedRoute>
                  <PublicLayout />
                </ProtectedRoute>
              }
            >
              <Route
                path="/resume-builder"
                element={<ResumeBuilder />}
              />
              <Route path="/cover-letter" element={<CoverLetter />} />
            </Route>

          </Routes>
        </ResumeDataProvider>
        </TemplateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
