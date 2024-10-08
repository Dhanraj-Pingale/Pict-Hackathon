import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import * as Babel from '@babel/standalone';
import Split from 'react-split';
import Prism from 'prismjs'; // For syntax highlighting
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for syntax highlighting
import 'tailwindcss/tailwind.css'; // Tailwind CSS import

const CodeVisualizer = () => {
  const fixedCodeStart = `
  function MyComponent() {
  return ( <div>
  
  `;
  const fixedCodeEnd = `
  
  </div> );
  }
  const root = ReactDOM.createRoot(document.getElementById('preview'));
  root.render(<MyComponent />);
  `;

  const [userCode, setUserCode] = useState(`<h1>Hello World</h1>`);
  const [darkMode, setDarkMode] = useState(true); // State to manage dark/light mode

  useEffect(() => {
    Prism.highlightAll(); // Apply syntax highlighting on code change
  }, [userCode]);

  const transpileCode = (inputCode) => {
    try {
      const transpiled = Babel.transform(
        fixedCodeStart + inputCode + fixedCodeEnd,
        { presets: ['react', 'es2015'] }
      ).code;
      return transpiled;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  };

  const renderCode = () => {
    const transpiledCode = transpileCode(userCode);
    try {
      const renderFn = new Function('React', 'ReactDOM', transpiledCode);
      const rootElement = document.getElementById('preview');
      rootElement.innerHTML = ''; // Clear previous content
      renderFn(React, ReactDOM); // Pass React and ReactDOM
    } catch (err) {
      console.error('Error rendering component:', err);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode); // Toggle dark/light mode
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className={`${darkMode ? 'bg-customDark text-white' : 'bg-gray-100 text-customDark'} min-h-screen max-h-screen`}>
        <div className="flex justify-between items-center p-4">
          {/* <button
            onClick={toggleTheme}
            className="bg-customGreen hover:bg-customGreenHover text-white py-2 px-4 rounded flex items-center"
          >
            {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button> */}
        </div>

        <Split className="split flex max-h-screen" minSize={200} gutterSize={10}>
          {/* Editor Panel */}
          <div className={`w-1/2 p-4 max-h-screen rounded-xl ml-3 ${darkMode ? 'bg-customDarker' : 'bg-gray-200'}`}>
            <h2 className="text-md mb-2 font-bold flex justify-between items-center">
              <span>Editor - Enter your React code here</span>
              <button
                onClick={renderCode}
                className="bg-customGreen hover:bg-customGreenHover text-white py-2 px-4 rounded-xl"
              >
                Render
              </button>
            </h2>

            <pre className={`language-js text-xs p-2 rounded-lg mr-7 mt-2 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <code>{fixedCodeStart}</code>
              <textarea
                className={`w-full min-h-96 ${darkMode ? 'text-white bg-transparent' : 'text-black bg-transparent'} border-none focus:outline-none resize-none`}
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
              />
              <code>{fixedCodeEnd}</code>
            </pre>
          </div>

          {/* Preview Panel */}
          <div className={`w-1/2 p-4 rounded-xl mr-3 ${darkMode ? 'bg-customDarker text-white' : 'bg-white text-customDarker'}`} id="preview">
            <h2 className="text-lg mb-2 font-bold">Preview</h2>
            {/* Rendered component will appear here */}
          </div>
        </Split>
      </div>
    </>
  );
};

export default CodeVisualizer;



{/* <h1 className="text-3xl font-bold">Welcome to React!</h1>
<p>This is a simple paragraph styled using Tailwind CSS.</p>
<button
  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  onClick={() => alert('Hello from the button!')}
>
  Click Me
</button> */}
