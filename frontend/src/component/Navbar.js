import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Ambil data user dari localStorage ketika component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // pastikan data user disimpan dalam bentuk JSON saat login
      } catch {
        setUser(storedUser); // fallback kalau cuma string
      }
    }
  }, []);

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
        <Link
          to="/beranda"
          className="text-2xl font-extrabold text-purple-400 tracking-wide"
        >
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

        {/* Bagian User */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-2 rounded-full bg-purple-700 hover:bg-purple-800 transition-colors text-white shadow-md"
          >
            <FaUserCircle className="text-xl" />
            <span className="hidden md:inline">{user?.name || "User"}</span>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 text-sm text-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
