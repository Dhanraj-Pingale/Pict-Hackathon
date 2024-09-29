// src/components/authentications/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {  useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ child }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return child;
};

export default ProtectedRoute;
