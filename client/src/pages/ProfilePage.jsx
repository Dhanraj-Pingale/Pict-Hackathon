import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
   const navigate = useNavigate();
    const {setLogout} = useAuth();
    const logoutFn = () => {
      setLogout();
      navigate("/");
    }
  return (
    <>
    <div>
        Profile page... @dhanraj
    </div>
    <div>
        <button type="button" onClick={logoutFn}> Logout </button>
    </div>
    </>
  );
}
