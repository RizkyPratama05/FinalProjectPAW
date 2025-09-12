import React, { useEffect, useState } from "react";

export default function Certificate() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(data);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white">
      <h1 className="text-3xl font-bold mb-4">Halaman Sertifikat</h1>
      {registrations.length === 0 ? (
        <p>Belum ada pendaftar.</p>
      ) : (
        <ul className="space-y-2">
          {registrations.map((r, i) => (
            <li key={i} className="bg-white/10 p-4 rounded-lg w-80 text-center">
              <p className="font-semibold">{r.nama}</p>
              <p>{r.seminar}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
