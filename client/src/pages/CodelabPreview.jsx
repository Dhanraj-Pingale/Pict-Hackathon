import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaImage, FaHeading, FaLink, FaYoutube } from 'react-icons/fa'; 
import axios from 'axios'; 
import CodeSnippet from '../Developer/Documentation/MainComponents/CodeSnippet';
import { fetchCodelabFn } from '../../Routes/codeLabRoutes';

const CodelabPreview = () => {
    const { id } = useParams();
    const codelabId = id;

    const [codelabData, setCodelabData] = useState(null);

    useEffect(() => {
        const fetchCodelab = async () => {
            try {
                const response = await fetchCodelabFn(codelabId); 
                console.log("res:", response);
                setCodelabData(response); 
                console.log("res: codelabpreview: ", codelabData[0]);
            } catch (error) {
                console.error('Error fetching codelab:', error);
            }
        };

        fetchCodelab();
    }, [codelabId]);

    if (codelabData == null) {
        return <div className="text-white text-center">Loading Codelab...</div>;
    }

    const renderComponent = (component) => {
        switch (component.type) {
            case 'heading1':
                return <h1 className="text-4xl font-bold text-white mb-4">{component.content}</h1>;
            case 'heading2':
                return <h2 className="text-2xl font-semibold text-white mb-4">{component.content}</h2>;
            case 'text':
                return <p className="text-gray-300 mb-4">{component.content}</p>;
            case 'code':
                return <CodeSnippet initialContent={component.content} isReadOnly={true} />;
            case 'image':
                return <img src={component.content} alt="Codelab Visual" className="rounded-lg mb-4" />;
            case 'youtube':
                const youtubeId = getYouTubeID(component.content);
                return youtubeId ? (
                    <iframe
                        className="w-full rounded-lg"
                        height="315"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video"
                        allowFullScreen
                    ></iframe>
                ) : null;
            case 'link':
                return (
                    <a href={component.content} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                        {component.content}
                    </a>
                );
            default:
                return null;
        }
    };

    const getYouTubeID = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
        return match ? match[1] : null;
    };

    return (
        <div className="flex-1 bg-customDarker p-8 text-gray-300 h-screen overflow-y-auto custom-scroll mt-3 mb-3 mr-3 rounded-lg shadow-md relative">
            <div className="flex items-center space-x-3 text-lg mb-8">
                {codelabData.coverPhoto && (
                    <img src={codelabData.coverPhoto} alt="Cover" className="w-1/4 h-32 object-cover rounded-md shadow-lg" />
                )}
                <h1 className="text-5xl font-bold text-white">{codelabData.title}</h1>
            </div>

            {codelabData.stages.map((stage, stageIndex) => (
                <div key={stageIndex} className="mb-12">
                    <h2 className="text-3xl font-bold text-green-400 mb-6">Stage {stageIndex + 1}</h2>

                    {/* Changed from 'components' to 'contentItems' */}
                    {stage.contentItems.map((component, index) => (
                        <div key={index} className="mb-6">
                            {renderComponent(component)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CodelabPreview;
