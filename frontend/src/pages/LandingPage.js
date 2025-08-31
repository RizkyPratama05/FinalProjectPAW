import React from "react";
import { InteractiveHoverButton } from "../component/InteractiveHoverButton";
import { VideoTextDemo } from "../component/VideoTextDemo";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-8">
      {/* Video Text */}
      <VideoTextDemo />

      {/* Judul */}
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to the Seminar Registration System
      </h1>

      {/* Tombol Login */}
      <InteractiveHoverButton>
        Login
      </InteractiveHoverButton>
    </div>
  );
};

export default LandingPage;
