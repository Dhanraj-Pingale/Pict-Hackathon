import React from 'react';
import HomePageCard from '../components/HomePage/HomePageCard';
import Footer from '../components/HomePage/Footer';
import SpericalDesigns from '../components/HomePage/SpericalDesigns';
import Navbar from '../components/HomePage/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-customDarker text-white p-8 relative flex items-center justify-center overflow-hidden">
        
        {/* Spherical Designs */}
        <SpericalDesigns />

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Documentation Generator */}
          
          <HomePageCard title='Documentation Generator' emoji='📄' path="/developer/documentation" />
          <HomePageCard title='Code Visualizer' emoji='🧑‍💻' path="/developer/codeVisualizer" />
          <HomePageCard title='Error Analyser' emoji='❌' path="/developer/errorAnalyser" />
          <HomePageCard title='Code Summarizer' emoji='🧊' path="/developer/codeSummarizer" />
          <HomePageCard title='Code Editor' emoji='🧊' path="/developer/codeEditor" />

        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;