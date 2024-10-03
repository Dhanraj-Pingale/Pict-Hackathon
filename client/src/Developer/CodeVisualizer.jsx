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
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} h-screen`}>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-bold">React Code Visualizer</h2>
        <button
          onClick={toggleTheme}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <Split className="split flex" minSize={200} gutterSize={10}>
        {/* Editor Panel */}
        <div className={`w-1/2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <h2 className="text-lg mb-2 font-bold flex justify-between items-center">
            <span>Editor - Enter your react code here</span>
            <button
              onClick={renderCode}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Render
            </button>
          </h2>

          <pre className={`language-js text-xs p-2 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            <code>{fixedCodeStart}</code>
            <textarea
              className={`w-full h-72 ${darkMode ? 'text-white bg-transparent' : 'text-black bg-transparent'} border-none focus:outline-none resize-none`}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />
            <code>{fixedCodeEnd}</code>
          </pre>
        </div>

        {/* Preview Panel */}
        <div className={`w-1/2 p-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} id="preview">
          <h2 className="text-lg mb-2 font-bold">Preview</h2>
          {/* Rendered component will appear here */}
        </div>
      </Split>
    </div>
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
