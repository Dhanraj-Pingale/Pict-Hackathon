import React from 'react';
import HomePageCard from '../components/HomePage/HomePageCard';
import SpericalDesigns from '../components/HomePage/SpericalDesigns';
import Navbar from '../components/HomePage/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen h-screen bg-gray-900 text-white px-8 py-0 pb-12 relative flex flex-col items-center justify-center overflow-hidden">
        
        {/* Spherical Designs */}
        <SpericalDesigns />

        {/* Header Section */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 z-10">
          Welcome to Your Developer Hub
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 text-center z-10 max-w-2xl">
          Tools to simplify your development process, from generating documentation to analyzing code errors and more.
        </p>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 w-full max-w-4xl">
          {/* Documentation Generator */}
          <HomePageCard 
            title='Documentation Generator' 
            emoji='📄' 
            path="/developer/documentation" 
          />
          <HomePageCard 
            title='Code Visualizer' 
            emoji='🧑‍💻' 
            path="/developer/codeVisualizer" 
          />
          <HomePageCard 
            title='Error Analyser' 
            emoji='❌' 
            path="/developer/errorAnalyser" 
          />
          <HomePageCard 
            title='Code Summarizer' 
            emoji='🧊' 
            path="/developer/codeSummarizer" 
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;