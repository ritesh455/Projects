import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import ResumeBuilder from "./Pages/ResumeBuilder";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<ResumeBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
