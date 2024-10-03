// src/components/authentications/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HomePage from "../../pages/Homepage";
import LandingPage from "../../pages/LandingPage";

export const ProtectedRoute = ({ child }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return child;
};

export const ProtectedRootRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage/>;
  }

  return <HomePage />;
};

