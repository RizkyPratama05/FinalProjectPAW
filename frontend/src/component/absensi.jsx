import React, { useState } from "react";

export default function Absensi() {
  const [registrationId, setRegistrationId] = useState("");
  const [status, setStatus] = useState(null);

  const fetchAttendance = () => {
    fetch(`http://localhost:3001/api/attendance/${registrationId}`)
      .then((res) => res.json())
      .then((data) => setStatus(data?.status || null))
      .catch((err) => console.error(err));
  };

  const updateAttendance = (newStatus) => {
    fetch("http://localhost:3001/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registration_id: registrationId, status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => setStatus(newStatus))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Absensi Peserta</h2>

      {/* Input ID Registrasi */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Masukkan ID Registrasi"
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchAttendance}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Cari
        </button>
      </div>

      {/* Status Absensi */}
      {status !== null && (
        <div className="space-y-4 text-center">
          <p>
            Status saat ini:{" "}
            <span
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                status === "hadir"
                  ? "bg-green-600/30 text-green-400 border border-green-500"
                  : "bg-red-600/30 text-red-400 border border-red-500"
              }`}
            >
              {status}
            </span>
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => updateAttendance("hadir")}
              className="px-5 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-green-500/40 transform hover:scale-105"
            >
              Tandai Hadir
            </button>
            <button
              onClick={() => updateAttendance("tidak hadir")}
              className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-red-500/40 transform hover:scale-105"
            >
              Tandai Tidak Hadir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
