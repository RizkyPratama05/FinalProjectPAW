"use client";

// 1. Impor useState untuk mengelola state form
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {MagicCard} from "../component/magicui/MagicCard";
import { InteractiveHoverButton } from "../component/magicui/InteractiveHoverButton";
import { MorphingText } from "../component/magicui/MorphingText";

const LandingPage = () => {
  // 2. Buat state untuk menyimpan nilai input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 3. Buat fungsi untuk menangani submit form
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
      const data = await response.json();
      if (response.ok) {
        // Simpan token, redirect, dll
        alert('Login berhasil!');
        navigate('/beranda');
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 space-y-8 p-4 text-center">
      <MorphingText
        texts={["Welcome", "To The", "Seminar", "Registration", "System"]}
        className="text-5xl md:text-7xl font-bold text-white"
      />

      <MagicCard
        className="w-full max-w-md p-8 rounded-2xl border border-gray-700 shadow-lg"
        gradientSize={250}
        gradientFrom="#6366F1"
        gradientTo="#EC4899"
        gradientOpacity={0.2}
        gradientColor="#1f1f1f"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

        {/* 4. Tambahkan onSubmit ke form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            {/* 5. Hubungkan label ke input menggunakan htmlFor dan id */}
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-800/70 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password} // Hubungkan nilai input ke state
              onChange={(e) => setPassword(e.target.value)} // Perbarui state saat diketik
              className="w-full rounded-md border border-gray-600 bg-gray-800/70 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-center pt-2">
            {/* Tombol ini sekarang akan memicu onSubmit form saat diklik */}
            <InteractiveHoverButton type="submit" className="px-6 py-2 rounded-full bg-gray-800/70 border border-gray-700 text-white hover:bg-gray-700/90">
              Login
            </InteractiveHoverButton>
          </div>
        </form>
      </MagicCard>
    </div>
  );
};

export default LandingPage;
