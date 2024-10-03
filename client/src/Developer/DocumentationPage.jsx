import React from 'react';
import Navbar from '../components/HomePage/Navbar';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Documentation/Sidebar';

export default function DocumentationPage() {
  return (
    <div className='min-h-screen bg-customDark'>
    <Navbar />

    <div className='flex'>
        <Sidebar />
        
        <Outlet />

    </div>
    </div>
  );
}
