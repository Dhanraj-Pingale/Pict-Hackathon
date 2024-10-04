import React, { useState } from 'react';
import { getResponseGemini } from '../../Routes/Gemini';
import CodeBlock from '../components/CodeBlock';

export default function CodeSummarizer() {
  const [codeInput, setCodeInput] = useState('');
  const [correctedCode, setCorrectedCode] = useState('');

  const handleCodeAnalysis = async () => {
    try {
      const response = await getResponseGemini({
        prompt: `${codeInput} Analyse the above code and give me summary of that code in one paragraph, don't think about syntax.. just give summary of the logic`
      });
      console.log("res: ", response);
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
          Summarize Code
        </button>
      </div>

      {/* Output Section */}
      <div className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Summary of the given code</h2>
        <pre className="flex-1 bg-gray-900 text-white p-4 rounded-md overflow-auto">
          <CodeBlock code={correctedCode || 'Summary will appear here...'} />
        </pre>
      </div>
    </div>
  );
}
