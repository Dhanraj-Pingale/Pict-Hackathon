import React, { useState } from 'react';
import { getResponseGemini } from '../../Routes/Gemini';
import CodeBlock from '../components/CodeBlock';

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
    <div className="h-screen grid grid-cols-2 gap-4 p-8">
      {/* Input Section */}
      <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-lg">
        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Enter your code here..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="15"
        />
        <button
          onClick={handleCodeAnalysis}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-all">
          Check Code
        </button>
      </div>

      {/* Output Section */}
      <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Corrected Code</h2>
        <pre className="flex-1 bg-gray-900 text-white p-4 rounded-md overflow-auto">
          {/* {correctedCode || 'Corrected code will appear here...'} */}
          <CodeBlock code={correctedCode}/>
        </pre>
      </div>
    </div>
  );
}
