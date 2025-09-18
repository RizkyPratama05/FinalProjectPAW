import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

const KelolaUser = () => {
	const [users, setUsers] = useState([]);
	const [form, setForm] = useState({ user_id: null, nama: "", email: "", password: "" });
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Ambil data user
	const fetchUsers = async () => {
		try {
			const res = await axios.get(API_URL);
			setUsers(res.data);
		} catch (err) {
			console.error("Fetch users error:", err);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// Tambah atau edit user
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (form.user_id) {
				// Edit user
				await axios.put(`${API_URL}/${form.user_id}`, { nama: form.nama, email: form.email });
			} else {
				// Tambah user
			await axios.post(API_URL, { name: form.nama, email: form.email, password: form.password });
			}
			setIsModalOpen(false);
			setForm({ user_id: null, nama: "", email: "", password: "" });
			fetchUsers();
		} catch (err) {
			alert("Gagal simpan user");
		}
	};

	// Hapus user
	const handleDelete = async (id) => {
		if (!window.confirm("Yakin ingin hapus user ini?")) return;
		try {
			await axios.delete(`${API_URL}/${id}`);
			fetchUsers();
		} catch (err) {
			alert("Gagal hapus user");
		}
	};

	// Edit user (show modal)
	const handleEdit = (u) => {
		setForm({ user_id: u.user_id, nama: u.nama, email: u.email, password: "" });
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white pt-24 px-6 md:px-20">
			<h1 className="text-2xl font-bold mb-6">Kelola User</h1>

			<button onClick={() => setIsModalOpen(true)} className="mb-6 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">+ Tambah User</button>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
					<div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-md p-6">
						<h2 className="text-xl font-bold mb-4">{form.user_id ? "Edit User" : "Tambah User"}</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<input name="nama" value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Nama" className="w-full px-3 py-2 rounded bg-gray-800" required />
							<input name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-3 py-2 rounded bg-gray-800" required />
							{!form.user_id && (
								<input name="password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full px-3 py-2 rounded bg-gray-800" required />
							)}
							<div className="flex justify-end gap-3 pt-4">
								<button type="button" onClick={() => { setIsModalOpen(false); setForm({ user_id: null, nama: "", email: "", password: "" }); }} className="px-4 py-2 rounded-lg bg-gray-600">Batal</button>
								<button type="submit" className="px-4 py-2 rounded-lg bg-blue-600">{form.user_id ? "Update" : "Simpan"}</button>
							</div>
						</form>
					</div>
				</div>
			)}

			<div className="overflow-x-auto">
				<table className="w-full border border-gray-700 rounded-lg overflow-hidden">
					<thead className="bg-white/10 text-left">
						<tr>
							<th className="px-4 py-2">ID</th>
							<th className="px-4 py-2">Nama</th>
							<th className="px-4 py-2">Email</th>
							<th className="px-4 py-2">Aksi</th>
						</tr>
					</thead>
					<tbody>
						{users.map((u) => (
							<tr key={u.user_id} className="border-t border-gray-700 hover:bg-white/5 transition">
								<td className="px-4 py-2">{u.user_id}</td>
								<td className="px-4 py-2">{u.nama}</td>
								<td className="px-4 py-2">{u.email}</td>
								<td className="px-4 py-2 space-x-2">
									<button onClick={() => handleEdit(u)} className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 transition">Edit</button>
									<button onClick={() => handleDelete(u.user_id)} className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 transition">Hapus</button>
								</td>
							</tr>
						))}
						{users.length === 0 && (
							<tr>
								<td colSpan="4" className="text-center py-6 text-gray-400 italic">Belum ada user terdaftar</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default KelolaUser;