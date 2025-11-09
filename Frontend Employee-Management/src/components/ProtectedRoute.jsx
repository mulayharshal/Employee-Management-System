import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const login = localStorage.getItem("isLogin");
 
  // If not logged in, redirect to login
  if (!login) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the requested route
  return children;
};

export default ProtectedRoute;
