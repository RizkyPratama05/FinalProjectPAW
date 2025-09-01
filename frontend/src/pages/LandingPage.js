import React from "react";
import { InteractiveHoverButton } from "../component/magicui/InteractiveHoverButton";
import { MorphingText } from "../component/magicui/MorphingText"; // 1. Impor komponen MorphingText

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 space-y-8 p-4 text-center">
      
      {/* 2. Tambahkan komponen MorphingText di sini */}
      <MorphingText
        texts={["Welcome", "To The", "Seminar", "Registration", "System"]}
        className="text-4xl md:text-6xl font-bold text-blue-600"
      />

      <InteractiveHoverButton onClick={() => console.log("Login clicked!")}>
        Login
      </InteractiveHoverButton>
    </div>
  );
};

export default LandingPage;