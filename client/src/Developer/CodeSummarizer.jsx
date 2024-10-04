import React, { useState } from 'react';
import { getResponseGemini } from '../../Routes/Gemini';
import CodeBlock from '../components/CodeBlock';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CodeSummarizer() {
  const [codeInput, setCodeInput] = useState('');
  const [summary, setSummary] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [complexityGraphData, setComplexityGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCodeAnalysis = async () => {
    setLoading(true);
    try {
      // Step 1: Generate the code summary
      const summaryResponse = await getResponseGemini({
        prompt: `${codeInput} Analyse the above code and give me a summary of the logic in one paragraph. Do not think about syntax, just summarize the logic.`,
      });

      setSummary(summaryResponse);

      // Step 2: Generate the time complexity analysis
      const timeComplexityResponse = await getResponseGemini({
        prompt: `${codeInput} Now, analyze the time complexity of the above code and provide an accurate explanation in Big O notation.`,
      });

      setTimeComplexity(timeComplexityResponse);

      // Step 3: Generate graph based on AI's response
      generateGraphData(timeComplexityResponse);
    } catch (error) {
      console.error('Error analyzing code:', error);
      setSummary('Error in analyzing the code summary.');
      setTimeComplexity('Error in analyzing the time complexity.');
      setComplexityGraphData(null); // Clear graph if an error occurs
    } finally {
      setLoading(false);
    }
  };

  const generateGraphData = (complexity) => {
    let labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; // Example input sizes
    let data = [];

    // Parse AI response and generate appropriate graph
    if (complexity.includes('O(1)')) {
      data = labels.map(() => 1); // Constant time complexity
    } else if (complexity.includes('O(n)')) {
      data = labels.map((n) => n); // Linear time complexity
    } else if (complexity.includes('O(n^2)')) {
      data = labels.map((n) => n * n); // Quadratic time complexity
    } else if (complexity.includes('O(log n)')) {
      data = labels.map((n) => Math.log(n)); // Logarithmic time complexity
    } else if (complexity.includes('O(n log n)')) {
      data = labels.map((n) => n * Math.log(n)); // Linearithmic time complexity
    } else {
      data = labels.map(() => null); // If complexity is unclear or unsupported
    }

    setComplexityGraphData({
      labels: labels,
      datasets: [
        {
          label: `Time Complexity: ${complexity}`,
          data: data,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              return null;
            }
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
            gradient.addColorStop(1, 'rgba(75, 192, 192, 0.6)');
            return gradient;
          },
          borderWidth: 3,
          tension: 0.4, // Smooth line
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointRadius: 5,
          pointHoverRadius: 7,
          animation: {
            duration: 2000, // Animation duration
            easing: 'easeInOutQuad', // Easing function for smooth animation
          },
        },
      ],
    });
  };

  return (
    <div className="h-screen grid grid-cols-2 gap-8 p-8 bg-gray-900 text-white">
      {/* Input Section */}
      <div className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">Input Code</h2>
        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Enter your code here..."
          className="flex-1 p-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="15"
        />
        <button
          onClick={handleCodeAnalysis}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-all shadow-md">
          {loading ? 'Processing...' : 'Summarize Code & Analyze Complexity'}
        </button>
      </div>

      {/* Output Section */}
      <div className="flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Code Summary</h2>
          <pre className="flex-1 bg-gray-900 text-green-400 p-6 rounded-lg overflow-auto shadow-md">
            <CodeBlock code={summary || 'Summary will appear here...'} />
          </pre>
        </div>


        {complexityGraphData && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-red-400">Time Complexity Graph</h2>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <Line
                data={complexityGraphData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Input Size (n)',
                        color: 'white',
                      },
                      ticks: {
                        color: 'white',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Time Taken',
                        color: 'white',
                      },
                      ticks: {
                        color: 'white',
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.2)',
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: true,
                      labels: {
                        color: 'white',
                      },
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      titleColor: 'white',
                      bodyColor: 'white',
                    },
                  },
                }}
                height={400}
              />
            </div>
          </div>
        )}

<div>
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Time Complexity Analysis</h2>
          <pre className="flex-1 bg-gray-900 text-yellow-400 p-6 rounded-lg overflow-auto shadow-md">
            <CodeBlock code={timeComplexity || 'Time complexity analysis will appear here...'} />
          </pre>
        </div>

      </div>
    </div>
  );
}
