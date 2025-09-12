import React, { useState } from "react";

export default function KelolaSeminar() {
  const [seminars, setSeminars] = useState([
    {
      id: 1,
      title: "Seminar Teknologi 2025",
      date: "20 September 2025",
      location: "UMY Convention Hall",
      price: "Rp 100.000",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSeminar = {
      id: seminars.length + 1,
      ...form,
    };

    setSeminars([...seminars, newSeminar]);
    setForm({ title: "", date: "", location: "", price: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setSeminars(seminars.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white pt-24 px-6 md:px-20">
      <h1 className="text-2xl font-bold mb-6">Kelola Seminar</h1>

      {/* Tombol Tambah Seminar */}
      <button
        className="mb-6 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        + Tambah Seminar
      </button>

      {/* Modal Input */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Tambah Seminar</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Judul Seminar"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="date"
                placeholder="Tanggal (mis. 20 September 2025)"
                value={form.date}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Lokasi"
                value={form.location}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="price"
                placeholder="Harga"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabel Daftar Seminar */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-white/10 text-left">
            <tr>
              <th className="px-4 py-2">Judul</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Lokasi</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {seminars.map((seminar) => (
              <tr
                key={seminar.id}
                className="border-t border-gray-700 hover:bg-white/5"
              >
                <td className="px-4 py-2">{seminar.title}</td>
                <td className="px-4 py-2">{seminar.date}</td>
                <td className="px-4 py-2">{seminar.location}</td>
                <td className="px-4 py-2">{seminar.price}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-sm"
                    onClick={() => alert("Edit seminar ID " + seminar.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                    onClick={() => handleDelete(seminar.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {seminars.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-400 italic"
                >
                  Belum ada seminar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
