import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CertificatePage() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/registration/mine", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => setRegistrations(Array.isArray(res.data) ? res.data : []))
      .catch(() => setRegistrations([]));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white pt-32 px-6">
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
              {r.gambar && (
                <img
                  src={r.gambar.startsWith('http') ? r.gambar : `http://localhost:5000${r.gambar}`}
                  alt={r.judul}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}
              {/* Nama pendaftar */}
              <p className="font-bold text-lg mb-2">{r.nama}</p>
              {/* Judul seminar */}
              <p className="text-sm mb-2">{r.judul}</p>
              {/* Status kelulusan */}
              <p className={`text-sm font-semibold mb-2 ${r.status === 'approved' ? 'text-green-400' : r.status === 'rejected' ? 'text-red-400' : 'text-yellow-300'}`}>
                Status: {r.status === 'approved' ? 'Lulus' : r.status === 'rejected' ? 'Tidak Lulus' : 'Menunggu Validasi'}
              </p>
              {/* Tombol unduh sertifikat jika lulus dan sertifikat tersedia */}
              {r.status === 'approved' && r.sertifikat_url && (
                <a
                  href={`http://localhost:5000${r.sertifikat_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 mb-2"
                >
                  Unduh Sertifikat
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
