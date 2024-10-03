// src/components/ProfilePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-6">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src={user?.pic || "images/default-profile-pic.jpg"} // Display user's profile picture
            alt="Profile"
          />
        </div>
        <h2 className="text-3xl font-semibold text-center">{user?.username || "Anonymous"}</h2>
        <p className="text-center text-gray-400">{user?.email}</p>

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
  );
}
