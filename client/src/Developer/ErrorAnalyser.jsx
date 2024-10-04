
import React, { useState } from 'react';
import { getResponseGemini } from '../../Routes/Gemini';
import CodeBlock from '../components/CodeBlock';
import Navbar from '../components/HomePage/Navbar';

export default function ErrorAnalyser() {
  const [codeInput, setCodeInput] = useState('');
  const [correctedCode, setCorrectedCode] = useState('');

  const handleCodeAnalysis = async () => {
    try {
      // Replace this with your Gemini API logic
      const response = await getResponseGemini({prompt: `${codeInput} Analyse the errors in above code, and only give me the corrected code with comments, without any other description`});

      console.log("res: ", response);

      setCorrectedCode(response);

    } catch (error) {
      console.error('Error analyzing code:', error);
      setCorrectedCode('Error in analyzing code');
    }
  };

  return (
    <>
      
      <div className="h-screen grid grid-cols-2 gap-4 p-8 bg-customDark">
        {/* Input Section */}
        <div className="flex flex-col bg-customDarker p-4 rounded-lg shadow-lg">
          <textarea
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Enter your code here..."
            className="flex-1 p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-customDark text-white resize-none"
            rows="15"
          />
          <button
            onClick={handleCodeAnalysis}
            className="mt-4 bg-customGreen hover:bg-customGreenHover text-white py-2 px-4 rounded-xl transition-all">
            Check Code
          </button>
        </div>

        {/* Output Section */}
        <div className="flex flex-col bg-customDarker p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Corrected Code</h2>
          <pre className="flex-1 bg-customDark text-white p-4 rounded-md overflow-auto">
            <CodeBlock code={correctedCode} />
          </pre>
        </div>
      </div>
    </>
  );
}
