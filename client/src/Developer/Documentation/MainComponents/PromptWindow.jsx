import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';  // Import the close (X) icon

const PromptWindow = ({ closeWindow, onGenerate }) => {
  const [prompt, setPrompt] = useState('');

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerate = () => {
    console.log('Inside handleGenerate function');
    console.log('onGenerate:', onGenerate); // This logs `undefined`, meaning `onGenerate` is not passed
  
    if (typeof onGenerate === 'function') {
      onGenerate(prompt);
      closeWindow(); // Close the prompt window after generating
    } else {
      console.error('Error: onGenerate is not a function. Received:', onGenerate);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> {/* Overlay effect */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg max-w-lg w-full text-white relative">
        {/* Red cross icon in the top-right corner */}
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          onClick={closeWindow}
        >
          <FaTimes size={20} />
        </button>

        {/* Content inside the modal */}
        <h2 className="text-lg font-semibold mb-4">Generate by AI</h2>
        <textarea
          id="prompt"
          name="prompt"
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt here"
          rows="4"
          className="border p-2 mt-2 w-full bg-transparent border-gray-400 rounded text-white"
        />

        {/* Buttons section */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleGenerate}
            className="bg-customGreen text-white px-6 py-2 rounded-full hover:bg-green-700"
          >
            Generate Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptWindow;
