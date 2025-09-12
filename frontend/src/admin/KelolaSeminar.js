import React, { useState, useEffect } from "react";
import axios from "axios";

export default function KelolaSeminar() {
  const [seminars, setSeminars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    title: "",
    date: "",
    location: "",
    price: "",
    image: "",
  });

  // Ambil data seminar dari backend
  const fetchSeminars = () => {
    axios.get("http://localhost:5000/api/seminars")
      .then(res => setSeminars(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      // update
      axios.put(`http://localhost:5000/api/seminars/${form.id}`, form)
        .then(() => {
          fetchSeminars();
          setIsModalOpen(false);
          setForm({ id: null, title: "", date: "", location: "", price: "", image: "" });
        });
    } else {
      // tambah
      axios.post("http://localhost:5000/api/seminars", form)
        .then(() => {
          fetchSeminars();
          setIsModalOpen(false);
          setForm({ id: null, title: "", date: "", location: "", price: "", image: "" });
        });
    }
  };

  const handleEdit = (s) => {
    setForm(s);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/seminars/${id}`)
      .then(() => fetchSeminars());
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white pt-24 px-6 md:px-20">
      <h1 className="text-2xl font-bold mb-6">Kelola Seminar</h1>
      <button onClick={() => setIsModalOpen(true)}
        className="mb-6 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
      >
        + Tambah Seminar
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">{form.id ? "Edit Seminar" : "Tambah Seminar"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" value={form.title} onChange={handleChange} placeholder="Judul Seminar" className="w-full px-3 py-2 rounded bg-gray-800" required />
              <input name="date" value={form.date} onChange={handleChange} placeholder="Tanggal" className="w-full px-3 py-2 rounded bg-gray-800" required />
              <input name="location" value={form.location} onChange={handleChange} placeholder="Lokasi" className="w-full px-3 py-2 rounded bg-gray-800" required />
              <input name="price" value={form.price} onChange={handleChange} placeholder="Harga" className="w-full px-3 py-2 rounded bg-gray-800" required />
              <input name="image" value={form.image} onChange={handleChange} placeholder="URL Gambar" className="w-full px-3 py-2 rounded bg-gray-800" />
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-600">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600">{form.id ? "Update" : "Simpan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            {seminars.map(s => (
              <tr key={s.id} className="border-t border-gray-700 hover:bg-white/5">
                <td className="px-4 py-2">{s.title}</td>
                <td className="px-4 py-2">{s.date}</td>
                <td className="px-4 py-2">{s.location}</td>
                <td className="px-4 py-2">{s.price}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(s)} className="px-3 py-1 rounded bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="px-3 py-1 rounded bg-red-500">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
