// src/components/authentications/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HomePage from "../../pages/Homepage";
import LandingPage from "../../pages/LandingPage";
import Loading from "./Loading";

const loadingFunction = (loading) => {
  if (loading) {
    // Show a loader or blank screen until the auth check is complete
    return <Loading />;
  }
}
export const ProtectedRoute = ({ child }) => {
  const { isAuthenticated, loading } = useAuth();

  loadingFunction(loading);
 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return child;
};

export const ProtectedRootRoute = () => {
  const { isAuthenticated , loading } = useAuth();

  if (loading) {
    // Show a loader or blank screen until the auth check is complete
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <LandingPage/>;
  }

  return <HomePage />;
};

