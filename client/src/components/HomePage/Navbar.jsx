import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className={`flex justify-between items-center py-3 px-9 bg-customDark text-gray-300 sticky top-0 z-50 pt-4 pb-4`}
    >
      {/* Logo Section */}
      <div className="text-xl font-bold text-white"> {`{ CodeLabX }`}</div>

      {/* Menu Items */}
      <ul className="hidden md:flex space-x-16">
        <li>
          <NavLink to="/" className="hover:text-white cursor-pointer">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            className="hover:text-white cursor-pointer"
          >
            All CodeLabs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/developer/mycodelabs"
            className="hover:text-white cursor-pointer"
          >
            My CodeLabs
          </NavLink>
        </li>
        <li>
          <NavLink to="/developer/codeEditor" className="hover:text-white cursor-pointer">
            CodeEditor
          </NavLink>
        </li>
      </ul>

      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        {/* Profile Icon */}
        <NavLink to="/profile">
          <button className="w-8 h-8 text-lg rounded-full bg-transparent border border-white text-white flex items-center justify-center transition duration-300 ease-in-out hover:bg-white hover:text-black">
            ⚙️
          </button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;