import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you're using some auth context
import axios from 'axios'; // Use axios to make backend requests
import { useNavigate } from 'react-router-dom';

export default function MyCodeLabs() {
  const navigate = useNavigate();
  const { user, setCodelab } = useAuth(); // Context with user info and method to update codelab

  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [title, setTitle] = useState(''); // Title input
  const [category, setCategory] = useState('general'); // Category input, default "general"
  const [error, setError] = useState(''); // Error state for validation

  // Open popup to create a new codelab
  const handleCreateClick = () => {
    setShowPopup(true);
  };

  // Submit the form and create the codelab
  const handleSubmit = async () => {
    if (!title) {
      setError('Title is required');
      return;
    }

    // Check if user is defined before accessing email
    if (!user || !user.email) {
      setError('User information is missing. Please log in.');
      return;
    }

    try {
      // Prepare payload to send to backend
      const payload = {
        email: user.email, // User's email from context
        title,
        category,
        createdon: new Date(), // Current date
        stages: [
          {
            components: [
              { type: 'img', content: 'cover photo' },
              { type: 'text', content: 'This is a description of the stage' },
            ],
          },
        ],
      };

      // Make a POST request to the backend route
      const response = await axios.post('/codelabs/create', payload); // Replace with actual API endpoint

      if (response.data.status) {
        // Update codelab context or state with the new codelab details
        setCodelab((prevValue) => ({
          ...prevValue,
          id: response.data.id,
        }));

        // Navigate to the edit page for the newly created codelab
        navigate('/developer/documentation/edit');
      } else {
        setError(response.data.message);
        setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
      }

      setShowPopup(false); // Close popup after submission
    } catch (error) {
      console.error('Error creating CodeLab:', error);
      setError('An error occurred while creating the CodeLab.');
    }
  };

  return (
    <div className="relative min-h-screen bg-customDark text-white">
      {/* Button to trigger popup */}
      <button
        type="button"
        onClick={handleCreateClick}
        className="bg-customGreen text-black py-2 px-4 rounded m-6 hover:bg-opacity-90"
      >
        Create CodeLab
      </button>

      {/* Glass Effect Popup */}
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl mb-4 text-white">Create CodeLab</h3>

            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter CodeLab title"
              className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-500 rounded"
            />

            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-500 rounded"
            >
              <option value="general">General</option>
              <option value="React">React</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Cloud">Cloud</option>
            </select>

            {/* Error Message */}
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSubmit}
                className="bg-customGreen text-black py-2 px-4 rounded hover:bg-opacity-90"
              >
                Create
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
