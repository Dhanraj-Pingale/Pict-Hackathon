import React, { useState } from 'react';
import { FaTimes, FaGithub } from 'react-icons/fa'; // Import FaGithub for the logo
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Dark theme

const CodeSnippet = ({ initialContent, onDelete }) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  // Handle editing and updating content
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Handle finishing editing
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative group mt-4" style={{ width: '80%', paddingLeft: '2rem' }}> {/* Added paddingLeft to separate GitHub icon */}
      {/* GitHub icon in the top-left corner */}
      <FaGithub
        size={20}
        className="absolute top-2 left-0 text-gray-400 cursor-pointer hover:text-gray-300"
      />

      {/* Delete icon in the top-right corner */}
      <FaTimes
        size={12}
        className="absolute top-2 right-2 text-red-400 cursor-pointer hover:text-red-600 opacity-0 group-hover:opacity-100"
        onClick={onDelete}
      />

      {/* Render the code snippet */}
      {isEditing ? (
        <textarea
          value={content}
          onChange={handleContentChange}
          onBlur={handleBlur}
          rows={6}
          className="w-full p-2 bg-gray-900 text-green-400 rounded-lg"
          autoFocus
        />
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <SyntaxHighlighter language="javascript" style={dracula}>
            {content || '// Click to add code snippet'}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default CodeSnippet;
