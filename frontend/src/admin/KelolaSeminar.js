
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function KelolaSeminar() {
  const [seminars, setSeminars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    seminar_id: null,
    judul: "",
    deskripsi: "",
    tanggal: "",
    lokasi: "",
    harga: "",
    gambar: "",
    created_by: "", // opsional, bisa diisi user_id admin
  });

  // Ambil token dari localStorage
  const token = localStorage.getItem("token");

  // Ambil data seminar dari backend
  const fetchSeminars = () => {
    axios.get("http://localhost:5000/api/seminar", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setSeminars(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSeminars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "gambar") {
      setForm({ ...form, gambar: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("deskripsi", form.deskripsi);
    formData.append("tanggal", form.tanggal);
    formData.append("lokasi", form.lokasi);
    formData.append("harga", form.harga);
    if (form.gambar) formData.append("gambar", form.gambar);
    formData.append("created_by", form.created_by);

    if (form.seminar_id) {
      // update
      axios.put(`http://localhost:5000/api/seminar/${form.seminar_id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      })
        .then(() => {
          fetchSeminars();
          setIsModalOpen(false);
          setForm({ seminar_id: null, judul: "", deskripsi: "", tanggal: "", lokasi: "", harga: "", gambar: "", created_by: "" });
        });
    } else {
      // tambah
      axios.post("http://localhost:5000/api/seminar", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      })
        .then(() => {
          fetchSeminars();
          setIsModalOpen(false);
          setForm({ seminar_id: null, judul: "", deskripsi: "", tanggal: "", lokasi: "", harga: "", gambar: "", created_by: "" });
        });
    }
  };

  const handleEdit = (s) => {
    setForm({
      seminar_id: s.seminar_id,
      judul: s.judul,
      deskripsi: s.deskripsi,
      tanggal: s.tanggal,
      lokasi: s.lokasi,
      harga: s.harga || "",
      gambar: s.gambar || "",
      created_by: s.created_by || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (seminar_id) => {
    axios.delete(`http://localhost:5000/api/seminar/${seminar_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
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
            <h2 className="text-xl font-bold mb-4">{form.seminar_id ? "Edit Seminar" : "Tambah Seminar"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="judul" value={form.judul} onChange={handleChange} placeholder="Judul Seminar" className="w-full px-3 py-2 rounded bg-gray-800" required />
              <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} placeholder="Deskripsi Seminar" className="w-full px-3 py-2 rounded bg-gray-800" />
              <input name="tanggal" type="date" value={form.tanggal} onChange={handleChange} placeholder="Tanggal" className="w-full px-3 py-2 rounded bg-gray-800" required />
              <input name="lokasi" value={form.lokasi} onChange={handleChange} placeholder="Lokasi" className="w-full px-3 py-2 rounded bg-gray-800" required />
              <input name="harga" value={form.harga} onChange={handleChange} placeholder="Harga" className="w-full px-3 py-2 rounded bg-gray-800" />
              <input name="gambar" type="file" accept="image/*" onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-800" />
              {/* <input name="created_by" value={form.created_by} onChange={handleChange} placeholder="User ID Admin" className="w-full px-3 py-2 rounded bg-gray-800" /> */}
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-600">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600">{form.seminar_id ? "Update" : "Simpan"}</button>
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
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Lokasi</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {seminars.map(s => (
              <tr key={s.seminar_id} className="border-t border-gray-700 hover:bg-white/5">
                <td className="px-4 py-2">{s.judul}</td>
                <td className="px-4 py-2">{s.deskripsi}</td>
                <td className="px-4 py-2">{s.tanggal}</td>
                <td className="px-4 py-2">{s.lokasi}</td>
                <td className="px-4 py-2">{s.harga}</td>
                <td className="px-4 py-2">{s.gambar ? <img src={s.gambar.startsWith('http') ? s.gambar : `http://localhost:5000${s.gambar}`} alt="Gambar Seminar" className="h-12 w-12 object-cover rounded" /> : '-'}</td>
                <td className="px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(s)} className="px-3 py-1 rounded bg-yellow-500">Edit</button>
                  <button onClick={() => handleDelete(s.seminar_id)} className="px-3 py-1 rounded bg-red-500">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
