import React, { useEffect, useState } from "react";
import axios from "axios";
import SeminarCard from "../component/magicui/SeminarCard";

export default function Beranda() {
  const [seminars, setSeminars] = useState([]);

  useEffect(() => {
    // Ambil data seminar dari backend
    axios
      .get("http://localhost:5000/api/seminar")
      .then((res) => setSeminars(res.data))
      .catch((err) => console.error("Error fetching seminars:", err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-purple-950 pt-24 px-20">
      {/* Daftar Seminar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {seminars.length === 0 ? (
          <p className="text-white col-span-full text-center mt-10">
            Tidak ada seminar tersedia.
          </p>
        ) : (
          seminars.map((item) => (
            <SeminarCard
              key={item.seminar_id}
              id={item.seminar_id}
              title={item.judul}
              desc={item.deskripsi}
              date={item.tanggal}
              location={item.lokasi}
              price={item.harga}
              image={item.gambar}
            />
          ))
        )}
      </div>
    </div>
  );
}
