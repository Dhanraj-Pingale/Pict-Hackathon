// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { checkAuth, logout } from "../../Routes/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [user, setUser] = useState(null); // State to store user info
  const [codelab, setCodelab] = useState({
    id: 0,
    stage: 0,
    stages: [
      [
      { type: "", content: "" },
    ]
    ],
  });

  const defaultPic = "images/default-profile-pic.jpg"; // Default pic URL

  useEffect(() => {
    const verifyAuth = async () => {

      setLoading(true);
      try {
        const res = await checkAuth();

        // Save user data if authenticated
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser({
            username: res.data.username,
            email: res.data.email,
            pic: res.data.pic || defaultPic // Use default if pic is not provided
          });
        } else {
          setUser(null); // Clear user data if not authenticated
        }
      } catch (error) {
        console.error("Failed to verify authentication:", error);
        setIsAuthenticated(false);
        setUser(null); // Clear user data on failure
      } finally {
        setLoading(false); // Mark loading as complete after check
      }
    };

    verifyAuth(); // Call the async function
  }, []);

  const setLogin = (userData) => {
    console.log("setlogin: ", userData);
    const modifiedData = {
      username: userData.username,
      email: userData.email,
      //add pic here ... 
    }
    console.log("modified data: ", modifiedData);
    setIsAuthenticated(true);
    setUser({
      ...modifiedData,
      pic: modifiedData.pic || defaultPic // Use default pic on login if not provided
    });
  };

  const setLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, codelab, setCodelab, user, setLogin, setLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthProvider;
