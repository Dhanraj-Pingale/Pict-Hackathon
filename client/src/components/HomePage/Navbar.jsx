import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`flex justify-between items-center py-3 px-9 bg-customDark text-gray-300 sticky top-0 z-50 pt-4 pb-4`}>
      {/* Logo Section */}
      <div className="text-xl font-bold text-white">
        {`{ CodeLabX }`}
      </div>

      {/* Menu Items */}
      <ul className="hidden md:flex space-x-16">
        <li className="hover:text-white cursor-pointer">Home</li>
        <li className="hover:text-white cursor-pointer">All CodeLabs</li>
        <li className="hover:text-white cursor-pointer">
          <Link to="/developer/mycodelabs" className="hover:text-white">My CodeLabs</Link>
        </li>
        <li className="hover:text-white cursor-pointer">Community</li>
      </ul>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle Button */}
        <button 
          onClick={toggleDarkMode} 
          className="focus:outline-none hover:text-white">
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        {/* Profile Icon */}
        <button className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
          A
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
