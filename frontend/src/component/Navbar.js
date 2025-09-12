import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Jangan tampilkan Navbar di landing page
  if (location.pathname === "/") return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-900/80 to-black/80 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/beranda" className="text-2xl font-extrabold text-purple-400 tracking-wide">
         Seminar 
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          <li>
            <Link to="/beranda" className="relative group">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link to="/certificate" className="relative group">
              Sertifikat
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
            </Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="ml-6 p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors text-white shadow-md"
          title="Logout"
        >
          <FiLogOut className="text-xl" />
        </button>
      </div>
    </nav>
  );
}
