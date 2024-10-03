import { useState } from "react";
import { FaStar, FaHome, FaUndoAlt, FaPlus } from "react-icons/fa"; // FontAwesome icons
// import PromptWindow from "./MainComponents/PromptWindow"; // Assuming PromptWindow is a component to handle prompts
import { NavLink, useNavigate } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";

const Sidebar = () => {
    const navigate = useNavigate();
    const [showPrompt, setShowPrompt] = useState(false); // State to toggle prompt window

    return (
        <div className="w-64 bg-customDarker text-gray-300 p-6 m-3 rounded-lg shadow-lg flex flex-col justify-between min-h-screen">
            {/* Top section */}
            <ul className="space-y-6">

                <SidebarLinks title="Add a stage" icon={<FaPlus className="mr-3" size={18} />} />
                <SidebarLinks title="Generate by AI" icon={<FaStar className="text-yellow-400 mr-3" size={18} />} onClick={() => setShowPrompt(true)} />

                <SidebarLinks title="Add Categories" icon={<FaPlus className="mr-3" size={18} />} />
                <SidebarLinks title="Version Controls" icon={<FaUndoAlt className="mr-3" size={18} />} />

            </ul>

            {/* Bottom section: Back to Home */}
            <div className="mt-6">
                <SidebarLinks title="Back to Home" icon={<FaHome className="mr-3" size={18} />} onClick={() => navigate("/developer")} />
            </div>

            {/* Prompt Window */}
            {showPrompt && <PromptWindow closeWindow={() => setShowPrompt(false)} />}
        </div>
    );
};

export default Sidebar;