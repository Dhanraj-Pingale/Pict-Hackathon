import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you're using some auth context
import { useNavigate } from 'react-router-dom';
import { createCodelab, fetchCodelabs } from '../../Routes/codeLabRoutes'; // Import fetch and create methods

// Define the available categories and emojis
const categoriesList = [
  { name: 'React', checked: true },
  { name: 'Machine Learning', checked: true },
  { name: 'Cloud', checked: true },
];

export default function MyCodeLabs() {
  const navigate = useNavigate();
  const { user, setCodelab } = useAuth(); // Context with user info and method to update codelab

  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [title, setTitle] = useState(''); // Title input
  const [category, setCategory] = useState('general'); // Category input, default "general"
  const [error, setError] = useState(''); // Error state for validation
  const [selectedCategories, setSelectedCategories] = useState(categoriesList); // Selected categories for filtering
  const [codelabs, setCodelabs] = useState([]); // State to hold fetched codelabs

  // Function to fetch codelabs from backend
  const getCodelabs = async () => {
    try {
      const response = await fetchCodelabs(); // Replace with the correct fetch method
      if (response.status) {
        setCodelabs(response.codelabs);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Error fetching codelabs:', error);
    }
  };

  // Fetch codelabs when the component mounts
  useEffect(() => {
    getCodelabs();
  }, []);

  // Function to toggle selected categories
  const toggleCategory = (index) => {
    const updatedCategories = [...selectedCategories];
    updatedCategories[index].checked = !updatedCategories[index].checked;
    setSelectedCategories(updatedCategories);
  };

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
      const payload = { title: title, email: user.email, category: category };

      console.log("payload: ", payload);
      // Make a POST request to the backend route
      const response = await createCodelab(payload); // Replace with actual API endpoint

      console.log("res in mycodelab: ", response);
      if (response.status) {
        // Update codelab context or state with the new codelab details
        setCodelab((prevValue) => ({
          ...prevValue,
          id: response.id,
          stage: 0,
        }));

        // Navigate to the edit page for the newly created codelab
        navigate('/developer/documentation');
      } else {
        setError(response.message);
        setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
      }

      setShowPopup(false); // Close popup after submission
    } catch (error) {
      console.error('Error creating CodeLab:', error);
      setError('An error occurred while creating the CodeLab.');
    }
  };

  return (
    <div className="flex min-h-screen bg-customDark text-white relative">
      {/* Sidebar */}
      <aside className="w-1/4 bg-customDarker p-8">
        <h2 className="text-2xl mb-6">Categories</h2>
        <ul>
          {selectedCategories.map((category, index) => (
            <li key={category.name} className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={category.checked}
                onChange={() => toggleCategory(index)}
                className="form-checkbox h-5 w-5 text-customGreen border-gray-400 focus:ring-0 cursor-pointer"
              />
              <span className="ml-2 text-lg">{category.name}</span>
            </li>
          ))}
        </ul>
        <button className="mt-8 text-customGreen" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 relative">
        {/* Create Codelab Button */}
        <button
          className="absolute top-0 right-0 bg-customGreen text-black py-2 px-4 rounded m-6 hover:bg-opacity-90"
          onClick={handleCreateClick} // Call the function on click
        >
          Create Codelab
        </button>

        <h1 className="text-5xl mb-10 text-customGreen">CodeLabs</h1>

        {/* Codelabs Grid */}
        <div className="grid grid-cols-3 gap-8">
          {codelabs.length > 0 ? (
            codelabs.map((codelab, index) => (
              <div key={codelab._id} className="bg-customDarker rounded-lg shadow-md p-6">
                <h3 className="text-xl mb-4">{codelab.title}</h3>
                <p className="text-gray-400 mb-4">
                  {codelab.stages[0]?.contentItems[0]?.content || 'No description available'}
                </p>
                <button
                  onClick={() => navigate(`/codelabs/${codelab._id}`)} // Button to open the codelab
                  className="bg-customGreen text-black py-2 px-4 rounded hover:bg-opacity-90"
                >
                  Open Codelab
                </button>
              </div>
            ))
          ) : (
            <p>No codelabs available</p>
          )}
        </div>
      </main>

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