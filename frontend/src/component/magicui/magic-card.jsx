"use client";

import { motion } from "framer-motion";
import React from "react";

export const MagicCard = ({
  children,
  className = "",
  gradientFrom = "#7C3AED",
  gradientTo = "#D946EF",
  gradientSize = 200,
  gradientColor = "rgba(255, 255, 255, 0.1)",
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl border ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}) border-box`,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-2xl p-[1px]"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        }}
      />
      <div className="relative rounded-2xl bg-neutral-950/80 p-6">
        {children}
      </div>
    </motion.div>
  );
};
