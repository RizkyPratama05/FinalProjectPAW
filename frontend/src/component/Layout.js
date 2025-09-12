import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="pt-20">{children}</main> {/* kasih padding biar ga ketutup navbar */}
    </div>
  );
}
