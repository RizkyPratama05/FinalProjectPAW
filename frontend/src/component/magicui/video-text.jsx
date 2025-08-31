import React from "react";

export function VideoText({ src, children }) {
  return (
    <div className="relative w-full h-full">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center text-6xl font-bold text-white">
        {children}
      </div>
    </div>
  );
}
