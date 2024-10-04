import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <style>{`
        .loader {
          border: 8px solid rgba(255, 255, 255, 0.2); /* Light transparent border */
          border-top: 8px solid white; /* Solid white top border */
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader"></div>
    </div>
  );
}