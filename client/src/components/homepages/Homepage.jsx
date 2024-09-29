import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  const navigate = useNavigate(); 

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-800 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">Developer's Dashboard</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">Features</a></li>
              <li><a href="#" className="hover:text-gray-400">About</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8">
        <section className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">AI-Powered Developer Tools</h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Select any AI tool designed to streamline your development process.
          </p>
        </section>

        {/* Update the grid layout to 2 cards per row */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ButtonCard title="Create Documentation" description="Generate detailed and structured documentation automatically." path="/create-documentation" />
          <ButtonCard title="Generate Summary" description="Summarize your code files and project insights." path="/generate-summary" />
          <ButtonCard title="Code Visualizer" description="Visualize your code architecture and data flow." path="/code-visualizer" />
          <ButtonCard title="Error Finder / Auto Completer" description="Get real-time suggestions and error fixes." path="/error-finder" />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 mt-auto">
        <div className="container mx-auto text-center text-gray-500">
          &copy; 2024 Developer's Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const ButtonCard = ({ title, description, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path); // Navigate to the provided path
  };

  return (
    <div className="bg-gray-700 hover:bg-gray-600 text-white p-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 duration-300">
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Select
      </button>
    </div>
  );
};

export default MainPage;
