// src/components/ProfilePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/HomePage/Navbar";

export default function ProfilePage() {
  const { user, isAuthenticated, loading, setLogout } = useAuth(); // Fetch user data from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogout(); // Call the logout function from context
    navigate("/"); // Redirect to home page after logout
  };

  // If still loading authentication status, show a loading state
  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    navigate("/login");
    return null; // Don't render anything until redirect happens
  }

  return (
    <div><Navbar>
      </Navbar>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center pb-24 justify-center text-white p-6">
      
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-2">
          {user?.username || "Anonymous User"}
        </h2>
        <p className="text-center text-gray-400 mb-6">
          {user?.email || "No email available"}
        </p>

        <div className="border-t border-gray-700 mt-6 pt-6">
          <h3 className="text-xl font-semibold text-center mb-2">About Our Website</h3>
          <p className="text-center text-gray-400">
            Welcome to our platform! We aim to provide the best user experience
            for managing your Documentation, interacting with various features, and exploring
            insightful content. Stay tuned for more updates!
          </p>
        </div>

        <div className="mt-6">
          <button
            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}