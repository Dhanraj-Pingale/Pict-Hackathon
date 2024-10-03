import React from 'react';
import Navbar from '../../components/HomePage/Navbar'; // Assuming you have Navbar in the components folder
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-customDark">
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Sidebar and Main Content */}
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default DocumentationPage;
