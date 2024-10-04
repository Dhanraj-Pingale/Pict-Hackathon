import React, { useState } from 'react';
import { getResponseGemini } from '../../Routes/Gemini';
import CodeBlock from '../components/CodeBlock';

export default function ErrorAnalyser() {
  const [codeInput, setCodeInput] = useState('');
  const [correctedCode, setCorrectedCode] = useState('');
  const [language, setLanguage] = useState('JavaScript'); // Default language

  const handleCodeAnalysis = async () => {
    try {
      // Replace this with your Gemini API logic
      const response = await getResponseGemini({
        prompt: `The following code is in ${language}. Analyse the errors in the code and provide the corrected code with comments, without any other description:\n\n${codeInput}`,
      });

      console.log('res: ', response);

      setCorrectedCode(response);
    } catch (error) {
      console.error('Error analyzing code:', error);
      setCorrectedCode('Error in analyzing code');
    }
  };

  return (
    <div className="h-screen grid grid-cols-2 gap-4 p-8 bg-gray-900 text-white">
      {/* Input Section */}
      <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg">
        {/* Language Dropdown */}
        <label htmlFor="languageSelect" className="mb-2 font-semibold">
          Select Language:
        </label>
        <select
          id="languageSelect"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mb-4 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="Ruby">Ruby</option>
        </select>

        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Enter your code here..."
          className="flex-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="15"
        />

        <button
          onClick={handleCodeAnalysis}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all">
          Check Code
        </button>
      </div>

      {/* Output Section */}
      <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Corrected Code</h2>
        <pre className="flex-1 bg-gray-900 text-white p-4 rounded-md overflow-auto">
          <CodeBlock code={correctedCode || 'Corrected code will appear here...'} />
        </pre>
      </div>
    </div>
  );
}