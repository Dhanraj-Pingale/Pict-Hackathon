import React from "react";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <iframe
          src="https://lottie.host/embed/5a46be40-1d8b-485f-92b3-c7bb8c7bfb16/eYfNuNOkpL.json"
          style={{ width: "300px", height: "300px", border: "none" }}
          title="Loading Animation"
        ></iframe>
      </div>
    </>
  );
}
