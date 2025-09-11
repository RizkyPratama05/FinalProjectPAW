import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md shadow-md z-50">
<div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-950 pt-24 px-6">
        {/* Logo */}
        <h1 className="text-xl font-bold text-purple-400">🎓 Seminar UMY</h1>

        {/* Menu */}
        <ul className="flex gap-6 text-white font-medium">
          <li>
            <Link to="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/certificate"
              className="hover:text-purple-400 transition-colors"
            >
              Sertifikat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
