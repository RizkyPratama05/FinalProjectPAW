import React, { useEffect, useState } from "react";

export default function Certificate() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Ambil data pendaftar dari localStorage
    const data = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(data);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white pt-32 px-6">
      <h1 className="text-3xl font-bold mb-8">Halaman Sertifikat</h1>

      {registrations.length === 0 ? (
        <p>Belum ada pendaftar.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {registrations.map((r, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 flex flex-col items-center text-center"
            >
              {/* Foto seminar */}
              {r.image && (
                <img
                  src={r.image}
                  alt={r.seminar}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              {/* Nama pendaftar */}
              <p className="font-bold text-lg mb-2">{r.nama}</p>

              {/* Judul seminar */}
              <p className="text-sm">{r.seminar}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
