import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiKey } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dropdownRef = useRef();

  // Ambil data user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(storedUser);
      }
    }

    // Tutup dropdown jika klik di luar
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (location.pathname === "/") return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      // contoh fetch ke backend
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/user/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal update password");

      alert("Password berhasil diperbarui!");
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.message);
    }
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

        {/* Dropdown User */}
<div className="relative" ref={dropdownRef}>
  <button
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="flex items-center gap-2 p-2 rounded-full bg-purple-700 hover:bg-purple-800 transition-colors text-white shadow-md"
  >
    <FaUserCircle className="text-xl" />
    <span className="hidden md:inline">{user?.name || "User"}</span>
  </button>

  {dropdownOpen && (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 text-sm text-gray-200 border border-gray-700">
      <button
        onClick={() => {
          setShowPasswordModal(true);
          setDropdownOpen(false);
        }}
        className="flex items-center w-full px-4 py-2 hover:bg-gray-700 transition-colors"
      >
        <FiKey className="mr-2" /> Update Password
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2 hover:bg-gray-700 transition-colors"
      >
        <FiLogOut className="mr-2" />
        Logout
      </button>
    </div>
  )}
</div>
</div>

      {/* Modal Update Password */}
{showPasswordModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 min-h-screen">
    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-md mx-4 text-white">
      <h2 className="text-xl font-semibold mb-4">Update Password</h2>
      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Password Lama
          </label>
          <input
            type="password"
            placeholder="Masukkan password lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-700 rounded-lg 
                       bg-gray-800 text-white 
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Password Baru
          </label>
          <input
            type="password"
            placeholder="Masukkan password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-700 rounded-lg 
                       bg-gray-800 text-white 
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowPasswordModal(false)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
)}

</nav>
);
}
