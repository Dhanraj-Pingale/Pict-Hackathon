import React from 'react';
import HomePageCard from '../components/HomePage/HomePageCard';
import Footer from '../components/HomePage/Footer';
import SpericalDesigns from '../components/HomePage/SpericalDesigns';
import Navbar from '../components/HomePage/Navbar';

// const HomePage = () => {
//   const navigate = useNavigate(); 

//   return (
//     <div className="bg-gray-900 text-white min-h-screen flex flex-col">
//       {/* Header Section */}
//       <header className="bg-gray-800 py-3 shadow-lg">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Developer's Dashboard</h1>
//           <nav>
//             <ul className="flex space-x-4">
//               <li>
//                 <NavLink 
//                   to="/" 
//                   className={({ isActive }) => (isActive ? "text-gray-400" : "hover:text-gray-400")}>
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink 
//                   to="/features" 
//                   className={({ isActive }) => (isActive ? "text-gray-400" : "hover:text-gray-400")}>
//                   Features
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink 
//                   to="/about" 
//                   className={({ isActive }) => (isActive ? "text-gray-400" : "hover:text-gray-400")}>
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink 
//                   to="/contact" 
//                   className={({ isActive }) => (isActive ? "text-gray-400" : "hover:text-gray-400")}>
//                   Contact
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow container mx-auto p-6">
//         <section className="text-center mb-8">
//           <h2 className="text-2xl md:text-4xl font-bold mb-3">AI-Powered Developer Tools</h2>
//           <p className="text-gray-400 text-md md:text-lg">
//             Select any AI tool designed to streamline your development process.
//           </p>
//         </section>


//         <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 pt-12">
//           <ButtonCard title="Create Documentation" description="Generate detailed and structured documentation automatically." path="/developer/documentation" />
//           <ButtonCard title="Generate Summary" description="Summarize your code files and project insights." path="/developer/codeSummarizer" />
//           <ButtonCard title="Code Visualizer" description="Visualize your code architecture and data flow." path="/code-visualizer" />
//           <ButtonCard title="Error Finder / Auto Completer" description="Get real-time suggestions and error fixes." path="/developer/errorAnalyser" />
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 py-4 mt-auto">
//         <div className="container mx-auto text-center text-gray-500">
//           &copy; 2024 Developer's Dashboard. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// const ButtonCard = ({ title, description, path }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(path); 
//   };

//   return (
//     <div className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg shadow-lg transition transform hover:-translate-y-1 duration-300">
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-300 mb-3 text-sm">{description}</p>
//       <button
//         onClick={handleClick}
//         className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
//       >
//         Select
//       </button>
//     </div>
//   );
// };

// export default HomePage;



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

        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;