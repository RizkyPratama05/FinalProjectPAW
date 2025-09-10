"use client";

import { motion } from "framer-motion";
import React from "react";

export const ShinyButton = React.forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={`relative cursor-pointer rounded-lg px-6 py-2 font-medium 
        backdrop-blur-xl border transition-shadow duration-300 ease-in-out 
        bg-neutral-900 text-white hover:shadow-lg ${className}`}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

ShinyButton.displayName = "ShinyButton";
