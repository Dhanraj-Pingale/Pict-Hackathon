import React, { useState } from "react";
import { FaStar, FaHome, FaCode, FaChartBar, FaClipboardList, FaUndoAlt, FaPlus, FaCube } from "react-icons/fa"; // FontAwesome icons
import PromptWindow from "./MainComponents/PromptWindow"; // Assuming PromptWindow is a component to handle prompts
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const {codelab,  setCodelab} = useAuth();
  const navigate = useNavigate();

  const [showPrompt, setShowPrompt] = useState(false); // State to toggle prompt window

  const addNewStage = () => {
    setCodelab((prevValue) => ({
      ...prevValue,
      stage: prevValue.stage + 1, 
    }));
  };

  return (
    <div className="w-64 bg-customDarker text-gray-300 p-6 m-3 rounded-lg shadow-lg flex flex-col justify-between min-h-screen">
      {/* Top section */}
      <ul className="space-y-6">
        <li className="text-lg font-semibold flex items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          <FaCube className="mr-3 text-sm" size={18} /> Current Stage: {codelab.stage}
        </li>

        <li className="text-lg font-semibold flex items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        onClick={addNewStage}
        >
          <FaPlus className="mr-3" size={18} /> Add a stage
        </li>
        <li
          className="text-lg flex items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
          onClick={() => setShowPrompt(true)} // Show prompt window on click
        >
          <FaStar className="text-yellow-400 mr-3" size={18} /> Generate by AI
        </li>
        {/* <li className="text-lg flex items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
          <FaPlus className="mr-3" size={18} /> Add Categories
        </li> */}
        <li className="text-lg flex items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
          <FaUndoAlt className="mr-3" size={18} /> Version Controls
        </li>
        
      </ul>

      {/* Bottom section: Back to Home */}
      <div className="mt-6">
        <li className="text-lg flex items-center transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
          <NavLink to="/developer" >
            <div>

              <FaHome className="mr-3" size={18} />
              <p>
                Back to Home
              </p>
            </div>
          </NavLink>

        </li>
      </div>

      {/* Prompt Window */}
      {showPrompt && <PromptWindow closeWindow={() => setShowPrompt(false)} />}
    </div>
  );
};

export default Sidebar;