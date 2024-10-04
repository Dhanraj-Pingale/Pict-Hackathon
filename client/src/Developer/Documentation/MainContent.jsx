import React, { useState, useEffect } from 'react';
import { FaImage, FaPlus, FaTimes, FaHeading, FaLink, FaYoutube, FaRobot } from 'react-icons/fa';
import DialogBox from './MainComponents/DialogBox';
import CodeSnippet from './MainComponents/CodeSnippet'; // Import the CodeSnippet component
import PromptWindow from './MainComponents/PromptWindow';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { saveStageFn } from '../../../Routes/codeLabRoutes';
import { getResponseGemini } from '../../../Routes/Gemini.js';
// const getYouTubeID = (url) => {
//   const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
//   return match ? match[1] : null;
// };


const MainContent = () => {
  const { codelab, setCodelab } = useAuth();
  const [showDialog, setShowDialog] = useState(false); // Manage if the dialog is open or closed
  const [activeTab, setActiveTab] = useState('Basic'); // State for tab switching
  const [coverPhoto, setCoverPhoto] = useState(null); // State to manage the cover photo
  const [title, setTitle] = useState(''); // State to manage the title
  const [isEditingTitle, setIsEditingTitle] = useState(false); // Whether the title is being edited
  const [showPromptWindow, setShowPromptWindow] = useState(false); // Manage PromptWindow visibility
  const [loading, setLoading] = useState(false); // Loading state for buffer animation
  const [contentItems, setContentItems] = useState([])
  const [imageItems, setImageItems] = useState([]);;// List of content added, including AI-generated content
  const [showAIDialog, setShowAIDialog] = useState(null);

  useEffect(() => {
    setContentItems([]);
    setImageItems([]);
    setTitle('');
    setCoverPhoto(null);

    return () => {

    };
  }, [codelab.stage]);

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

  // const handleGenerateContent = async (content, action) => {

  //   console.log('Received prompt:', content);
  //   setLoading(true);
  //   try {
  //     const prompt = action === 'summarize' ? `Summarize the following content: ${content} ` : `Generate code based on: ${content} `;
  //     const response = await getResponseGemini({ prompt });

  //     setContentItems((prevItems) => prevItems.map((item, index) => (
  //       index === showAIDialog ? { ...item, content: response } : item
  //     )));
  //   } catch (error) {
  //     console.error('Error fetching content:', error);
  //   } finally {
  //     setLoading(false);
  //     setShowAIDialog(null); // Close AI dialog
  //   }
  // };

  const handleGenerateContent = async (content, action) => {
    // Check if content is valid
    if (!content || content.trim() === "") {
      console.error("Content is empty or undefined.");
      toast.error("Cannot generate AI response with empty content.");
      return;
    }

    console.log('Received prompt:', content);
    setLoading(true);

    try {
      const prompt = action === 'summarize'
        ? `Summarize the following content: ${content} ` : `Generate code based on following and give me only the code:  ${content} `;

      const response = await getResponseGemini({ prompt });

      // Check which action was selected and add the appropriate block
      if (action === 'summarize') {
        setContentItems((prevItems) => [
          ...prevItems,
          { type: 'text', content: response, editable: false }, // Add new text block
        ]);
      } else if (action === 'generate_code') {
        setContentItems((prevItems) => [
          ...prevItems,
          { type: 'code', content: response }, // Add new code snippet block
        ]);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('AI failed to generate a response. Please try again.');
    } finally {
      setLoading(false);
      setShowAIDialog(null); // Close AI dialog
    }
  };

  const handleAIClick = (index) => {
    setShowAIDialog(index); // Open AI dialog for the clicked item
  };

  // Handle content generation request
  // const handleGenerateContent = async (content) => {
  //   console.log('Received prompt:', content);
  //   setLoading(true);
  //   try {
  //     // Single fetch request
  //     // console.log("promt: ", prompt);
  //     // Replace this with your Gemini API logic
  //     const response = await getResponseGemini({ prompt: `${content} give only description for this..` });

  //     console.log("res: ", response);

  //     // Update contentItems with the new content
  //     setContentItems((prevItems) => [
  //       ...prevItems,
  //       {
  //         content: response,
  //         editable: false,
  //       },
  //     ]);

  //   } catch (error) {
  //     console.error('Error fetching content:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSingleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file (single file upload)
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      // Add the single image to contentItems
      setContentItems((prevItems) => [
        ...prevItems,
        { type: 'image', content: imageUrl, editable: false },
      ]);
    }
  };

  // **Define the `handlePhotoClick` function**
  const handlePhotoClick = () => {
    document.getElementById('cover-photo-input').click(); // Trigger the file input click to change the photo
  };

  // Functions to add content to the main page
  const addTitle = () => {
    setContentItems([...contentItems, { type: 'title', content: title, editable: true }]);
    setShowDialog(false); // Close the dialog after adding
  };

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
  const addHeading1 = () => {
    setContentItems([...contentItems, { type: 'heading1', content: '', editable: true }]);
    setShowDialog(false);
  };

  const addHeading2 = () => {
    setContentItems([...contentItems, { type: 'heading2', content: '', editable: true }]);
    setShowDialog(false);
  };

  const addImage = () => {
    setContentItems([...contentItems, { type: 'image', content: '', editable: true }]);
    setShowDialog(false);
  };

  const addYouTube = () => {
    setContentItems([...contentItems, { type: 'youtube', content: '', editable: true }]);
    setShowDialog(false);
  };

  const addLink = () => {
    setContentItems([...contentItems, { type: 'link', content: '', editable: true }]);
    setShowDialog(false);
  };

  // Handle file input change for the cover photo
  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      console.log("url ", fileURL);

      setCoverPhoto(fileURL);
      setContentItems((prevItems) => [...prevItems, { type: 'coverImage', content: fileURL, editable: false }]);
    }
  };

  // Handle title input change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Handle pressing Enter to submit title
  const handleTitleSubmit = (event) => {
    if (event.key === 'Enter') {
      addTitle();
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

  const saveStage = async () => {
    console.log("stage: ", contentItems);
    const res = await saveStageFn({ contentItems, codelab });

    if (res.status) {
      toast.success(res.message);
    }
    else {
      toast.error(res.message);
    }
  }

  return (
    <div className="flex-1 bg-customDarker p-8 text-gray-300 h-screen overflow-y-auto custom-scroll mt-3 mb-3 mr-3 rounded-lg shadow-md relative">
      {/* Content Section */}
      <div className='flex'>
        <button type="button" className='bg-green-800 p-3' onClick={saveStage}>Save</button>
        <ToastContainer />
      </div>

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
              <div className="relative">
                <textarea
                  value={item.content}
                  onChange={(e) => updateContent(index, e.target.value)}
                  onBlur={() => updateContent(index, item.content)}
                  placeholder="Type text here..."
                  className="bg-transparent text-white border-none outline-none p-0 w-full resize-none h-32 overflow-hidden"
                  rows={1} // Initial row height
                  autoFocus
                  onInput={(e) => {
                    e.target.style.height = 'auto'; // Reset the height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height based on content
                  }}
                  style={{ wordWrap: 'break-word' }} // Ensure word wrap
                />
                {/* AI Button */}
                <button className="absolute right-0 top-0" onClick={() => handleAIClick(index)}>
                  <FaRobot size={20} className="text-gray-400 hover:text-green-400" />
                </button>
              </div>
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
              <div className="relative">
                <CodeSnippet initialContent={item.content}
                  onDelete={() => deleteContent(index)}
                  value={item.content}
                  onChange={(e) => updateContent(index, e.target.value)}
                  onBlur={() => updateContent(index, item.content)}
                />
                {/* AI Button */}
                <button className="absolute right-0 top-0" onClick={() => handleAIClick(index)}>
                  <FaRobot size={20} className="text-gray-400 hover:text-green-400" />
                </button>
              </div>
            )}

            {item.type === 'heading1' && (
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateContent(index, e.target.value)}
                onBlur={() => updateContent(index, item.content)}
                placeholder="Enter heading..."
                className="bg-transparent text-white text-4xl font-bold border-none outline-none p-0 w-full"
                autoFocus
              />
            )}
            {item.type === 'heading2' && (
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateContent(index, e.target.value)}
                onBlur={() => updateContent(index, item.content)}
                placeholder="Enter heading..."
                className="bg-transparent text-white text-2xl font-bold border-none outline-none p-0 w-full"
                autoFocus
              />
            )}
            {/* {item.type === 'image' && (
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateContent(index, e.target.value)}
                onBlur={() => updateContent(index, item.content)}
                placeholder="Paste image URL..."
                className="bg-transparent text-white border-none outline-none p-0 w-full"
                autoFocus
              />
            )} */}
            {item.type === 'image' && (
              <div className="mt-8">
                <label htmlFor="single-image-input" className="cursor-pointer bg-green-600 px-4 py-2 rounded-lg text-white">
                  Add Image
                </label>
                <input id="single-image-input" type="file" accept="image/*" onChange={handleSingleImageUpload} className="hidden" />
              </div>
            )}


            {item.type === 'youtube' && (
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateContent(index, e.target.value)}
                onBlur={() => updateContent(index, item.content)}
                placeholder="Paste YouTube video URL..."
                className="bg-transparent text-white border-none outline-none p-0 w-full"
                autoFocus
              />
            )}
            {item.type === 'link' && (
              <input
                type="text"
                value={item.content}
                onChange={(e) => updateContent(index, e.target.value)}
                onBlur={() => updateContent(index, item.content)}
                placeholder="Paste link URL..."
                className="bg-transparent text-blue-400 underline border-none outline-none p-0 w-full"
                autoFocus
              />
            )}
          </div>
        ))}

        {/* Command Hint */}
        <div className="mt-8 text-gray-500 text-lg relative">Type "/" for commands</div>

        {showAIDialog !== null && (
          <div className="absolute top-[15rem] left-[8rem] w-80 p-4 bg-[#14191F] text-white rounded-lg shadow-md z-50">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
              onClick={() => setShowAIDialog(null)}
            >
              <FaTimes size={12} />
            </button>
            <h3 className="text-lg mb-4">AI Actions</h3>
            <ul>
              <li className="cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => handleGenerateContent(contentItems[showAIDialog].content, 'summarize')}>
                Summarize Text
              </li>
              <li className="cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={() => handleGenerateContent(contentItems[showAIDialog].content, 'generate_code')}>
                Generate Code
              </li>
            </ul>
          </div>
        )}

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
            addTitle={addTitle}
            setActiveTab={setActiveTab}
            addText={addText}
            addVideo={addVideo}
            addCodeSnippet={addCodeSnippet}
            addHeading1={addHeading1}
            addHeading2={addHeading2}
            addImage={addImage}
            addYouTube={addYouTube}
            addLink={addLink}
          />
        )}
      </div>
    </div>
  );
}

export default MainContent;