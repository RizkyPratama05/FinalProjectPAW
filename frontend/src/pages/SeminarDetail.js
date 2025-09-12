import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  HiCalendar,
  HiClock,
  HiLocationMarker,
  HiCurrencyDollar,
} from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";

export default function SeminarDetail() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState("");

  // Contoh data (nantinya ambil dari API)
  const seminars = [
    {
      id: 1,
      title: "Seminar Teknologi 2025",
      desc: "Bahas perkembangan AI & IoT bersama pembicara internasional.",
      date: "20 September 2025",
      time: "09:00 WIB",
      location: "UMY Convention Hall, Yogyakarta",
      price: "Rp 100.000",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      social: {
        instagram: "https://instagram.com/umy_official",
      },
    },
  ];

  const seminar = seminars.find((s) => s.id === parseInt(id));

  if (!seminar) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white">
        <h1 className="text-2xl font-bold text-red-400 mb-4">
          Seminar tidak ditemukan
        </h1>
        <Link
          to="/beranda"
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pendaftaran berhasil!\nNama: ${nama}\nSeminar: ${seminar.title}`);
    setShowModal(false);
    setNama("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-purple-950 pt-24 px-6 md:px-20 text-white">
      {/* Grid Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="lg:col-span-2">
          <img
            src={seminar.image}
            alt={seminar.title}
            className="w-full h-80 md:h-[450px] object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* Info Event */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-md shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">{seminar.title}</h1>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <HiCalendar className="text-blue-400 text-xl" />
                <span>
                  <strong>Tanggal:</strong> {seminar.date}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <HiClock className="text-blue-400 text-xl" />
                <span>
                  <strong>Waktu:</strong> {seminar.time}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <HiLocationMarker className="text-blue-400 text-xl" />
                <span>
                  <strong>Lokasi:</strong> {seminar.location}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <HiCurrencyDollar className="text-blue-400 text-xl" />
                <span>
                  <strong>Harga:</strong> {seminar.price}
                </span>
              </li>
            </ul>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Pesan Tiket
            </button>
          </div>

          {/* Media Sosial */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Media Sosial</p>
            <a
              href={seminar.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="mt-10 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Deskripsi</h2>
        <p className="leading-relaxed">{seminar.desc}</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white text-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Pendaftaran Tiket</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-3">
                <span className="text-sm font-semibold">Nama Pendaftar</span>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Masukkan nama Anda"
                />
              </label>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Daftar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
