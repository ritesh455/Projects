import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // If user is logged in, redirect away
  if (user) {
    return <Navigate to="/resume-builder" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
