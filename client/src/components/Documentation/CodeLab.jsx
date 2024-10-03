import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function CodeLab() {
  const { codelab, setCodelab } = useAuth();
  const [showDialog, setShowDialog] = useState(false); // Manage if the dialog is open or closed

  // Key press listener for "/"
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === '/') {
        setShowDialog(true);
      }
      if (event.key === 'Escape') {
        setShowDialog(false);
      }
    };

    // Add event listener for keypress
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <div className="flex-1 bg-customDarker p-8 text-gray-300 h-screen overflow-y-auto custom-scroll mt-3 mb-3 mr-3 rounded-lg shadow-md relative">
        {/* Content Section */}
        <div className="mt-10 space-y-6 ml-12">

        </div>

        {/* DialogBox Component */}
        {showDialog && (
          <DialogBox
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            addText={addText}
            addVideo={addVideo}
            addCodeSnippet={addCodeSnippet}
            addHeading={addHeading}
            addImage={addImage}
            addYouTube={addYouTube}
            addLink={addLink}
          />
        )}
      </div>
    </>
  );
}
