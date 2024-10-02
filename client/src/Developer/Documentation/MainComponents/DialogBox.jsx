import React from 'react';
import { FaTimes, FaTextHeight, FaVideo, FaCodeBranch, FaClipboardList, FaCode, FaStar, FaChartBar } from 'react-icons/fa';

const DialogBox = ({ showDialog, setShowDialog, activeTab, setActiveTab, addText, addVideo, addCodeSnippet }) => {
  if (!showDialog) return null; // Return null if the dialog should not be displayed

  return (
    <div className="absolute top-[15rem] left-[8rem] w-80 p-4 bg-[#14191F] text-white rounded-lg shadow-md z-50">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
        onClick={() => setShowDialog(false)}
      >
        <FaTimes size={12} />
      </button>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-4 py-1 rounded-full ${activeTab === 'Basic' ? 'bg-gray-400 text-black' : 'bg-transparent text-gray-300'}`}
          onClick={() => setActiveTab('Basic')}
        >
          Basic
        </button>
        <button
          className={`px-4 py-1 rounded-full ${activeTab === 'AI' ? 'bg-white text-black' : 'bg-transparent text-gray-300'}`}
          onClick={() => setActiveTab('AI')}
        >
          AI
        </button>
      </div>

      {/* Command List */}
      <ul className="space-y-3">
        {/* Basic Tab */}
        {activeTab === 'Basic' && (
          <>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={addText}>
              <FaTextHeight className="text-gray-400" />
              <span>Add Text</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={addVideo}>
              <FaVideo className="text-gray-400" />
              <span>Add Video</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={addCodeSnippet}>
              <FaCodeBranch className="text-gray-400" />
              <span>Insert Code Snippet</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={addCodeSnippet}>
            <FaCode className="text-gray-400" />
              <span>Live Code Editor</span>
            </li>
          </>
        )}

        {/* AI Tab */}
        {activeTab === 'AI' && (
          <>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
              <FaClipboardList className="text-gray-400" />
              <span>Generate Documentation Outline</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
              <FaStar className="text-gray-400" />
              <span>Summarize Documentation</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
              <FaCode className="text-gray-400" />
              <span>Generate Code</span>
            </li>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
              <FaChartBar className="text-gray-400" />
              <span>Generate Personalized Quiz</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DialogBox;
