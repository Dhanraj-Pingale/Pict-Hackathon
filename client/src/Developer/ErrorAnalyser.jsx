import React, { useState } from 'react';

export default function ErrorAnalyser() {
  const [codeInput, setCodeInput] = useState('');
  const [correctedCode, setCorrectedCode] = useState('');

  const handleCodeAnalysis = async () => {
    try {
      // Replace this with your Gemini API logic
      const response = await fetch('https://your-gemini-api.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: codeInput }),
      });

      const data = await response.json();
      setCorrectedCode(data.correctedCode);
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
          {correctedCode || 'Corrected code will appear here...'}
        </pre>
      </div>
    </div>
  );
}
