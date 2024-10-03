import React, { useState, useEffect } from 'react';
import { FaImage, FaPlus, FaTimes } from 'react-icons/fa';
import DialogBox from './MainComponents/DialogBox';
import CodeSnippet from './MainComponents/CodeSnippet'; // Import the CodeSnippet component
import PromptWindow from './MainComponents/PromptWindow';
import './customScroll.css';
import {  getResponseGemini } from '../../../Routes/Gemini';


const MainContent = () => {
  const [showDialog, setShowDialog] = useState(false); // Manage if the dialog is open or closed
  const [activeTab, setActiveTab] = useState('Basic'); // State for tab switching
  const [coverPhoto, setCoverPhoto] = useState(null); // State to manage the cover photo
  const [title, setTitle] = useState(''); // State to manage the title
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Whether the title is being edited
  const [showPromptWindow, setShowPromptWindow] = useState(false); // Manage PromptWindow visibility
  const [loading, setLoading] = useState(false); // Loading state for buffer animation
  const [contentItems, setContentItems] = useState([]); // List of content added, including AI-generated content



  // Key press listener for "/"
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '/') {
        setShowDialog(true);
      }
      if (event.key === 'Escape') {
        setShowDialog(false);
      }
    };

    // Add event listener for keypress
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Handle content generation request
  const handleGenerateContent = async (content) => {
    console.log('Received prompt:', content);
    setLoading(true);
    try {
      // Single fetch request
      // console.log("promt: ", prompt);
        // Replace this with your Gemini API logic
      const response = await getResponseGemini({prompt: `${content} give only description for this..`});

      console.log("res: ", response);
  
      // Update contentItems with the new content
      setContentItems((prevItems) => [
        ...prevItems,
        {content: response,
        editable: false ,},
      ]);

    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  // **Define the `handlePhotoClick` function**
  const handlePhotoClick = () => {
    document.getElementById('cover-photo-input').click(); // Trigger the file input click to change the photo
  };

  // Functions to add content to the main page
  const addText = () => {
    setContentItems([...contentItems, { type: 'text', content: '', editable: true }]);
    setShowDialog(false); // Close the dialog after adding
  };

  const addVideo = () => {
    setContentItems([...contentItems, { type: 'video', content: '', editable: true }]);
    setShowDialog(false); // Close the dialog after adding
  };

  const addCodeSnippet = () => {
    setContentItems([...contentItems, { type: 'code', content: '' }]); // Use new CodeSnippet component
    setShowDialog(false); // Close the dialog after adding
  };

  // Handle file input change for the cover photo
  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverPhoto(URL.createObjectURL(file)); // Store image URL to display
    }
  };

  // Handle title input change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Handle pressing Enter to submit title
  const handleTitleSubmit = (event) => {
    if (event.key === 'Enter') {
      setIsEditingTitle(false); // Stop editing when Enter is pressed
    }
  };

  // Handle title click to make it editable again
  const handleTitleClick = () => {
    setIsEditingTitle(true); // Enable editing when the title is clicked
  };

  // Define the `updateContent` function
  const updateContent = (index, newValue) => {
    const updatedContentItems = [...contentItems];
    updatedContentItems[index].content = newValue;
    updatedContentItems[index].editable = false; // Make it non-editable after updating
    setContentItems(updatedContentItems);
  };
 

  // Handle deleting a content block
  const deleteContent = (index) => {
    const newContentItems = contentItems.filter((_, i) => i !== index);
    setContentItems(newContentItems);
  };

  return (
    <div className="flex-1 bg-customDarker p-8 text-gray-300 h-screen overflow-y-auto custom-scroll mt-3 mb-3 mr-3 rounded-lg shadow-md relative">
      {/* Content Section */}
      <div className="mt-10 space-y-6 ml-12">
        {/* Add Cover Photo Section */}
        {!coverPhoto && (
          <div className="flex items-center space-x-3 text-lg cursor-pointer hover:text-gray-100">
            <FaImage size={20} className="text-gray-400 mr-3" />
            <span className="text-white">
              <label htmlFor="cover-photo-input" className="cursor-pointer">
                Add Cover Photo
              </label>
              <input
                id="cover-photo-input"
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                className="hidden"
              />
            </span>
          </div>
        )}

        {/* Display the selected cover photo */}
        {coverPhoto && (
          <div className="mt-4 cursor-pointer" onClick={handlePhotoClick}>
            <img
              src={coverPhoto}
              alt="Cover"
              className="w-1/2 max-h-64 object-cover rounded-md shadow-lg"
            />
          </div>
        )}

        {/* Add Title Section */}
        <div className="flex items-center space-x-3 text-lg cursor-pointer hover:text-gray-100">
          {!title && !isEditingTitle ? (
            <FaPlus size={20} className="text-gray-400 mr-3" />
          ) : null}
          {!isEditingTitle ? (
            <h1 className="text-6xl font-bold text-white cursor-pointer" onClick={handleTitleClick}>
              {title || 'Add Title'}
            </h1>
          ) : (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleTitleSubmit}
              className="bg-transparent text-white border-none outline-none p-0"
              autoFocus
              placeholder="Enter your title"
            />
          )}
        </div>

        {/* Render content added by the user */}
        {contentItems.map((item, index) => (
          <div key={index} className="mt-6 relative group">
            <FaTimes
              size={12}
              className="absolute top-1 right-1 text-red-400 cursor-pointer hover:text-red-600 opacity-0 group-hover:opacity-100"
              onClick={() => deleteContent(index)}
            />
            {item.type === 'text' && (
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateContent(index, e.target.value)} // Use updateContent to change the value
                onBlur={() => updateContent(index, item.content)}
                placeholder="Type text here..."
                className="bg-transparent text-white border-none outline-none p-0 w-full"
                autoFocus
              />
            )}
            {item.type === 'video' && (
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateContent(index, e.target.value)}
                onBlur={() => updateContent(index, item.content)}
                placeholder="Paste video URL..."
                className="bg-transparent text-white border-none outline-none p-0 w-full"
                autoFocus
              />
            )}
            {item.type === 'code' && (
              <CodeSnippet
                initialContent={item.content}
                onDelete={() => deleteContent(index)} // Pass delete function to CodeSnippet component
              />
            )}
          </div>
        ))}

        {/* Command Hint */}
        <div className="mt-8 text-gray-500 text-lg relative">Type "/" for commands</div>
      </div>

       {/* Show Prompt Window when it's triggered */}
       {showPromptWindow && (
        <PromptWindow
          closeWindow={() => setShowPromptWindow(false)}
          onGenerate={handleGenerateContent}  // Pass the function here
        />
      )}




      {/* DialogBox Component */}
      {showDialog && (
        <DialogBox
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addText={addText}
          addVideo={addVideo}
          addCodeSnippet={addCodeSnippet}
        />
      )}
    </div>
  );
};

export default MainContent;
