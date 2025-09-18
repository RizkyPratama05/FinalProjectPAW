import Navbar from "../component/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AttendanceAdmin() {
	const [attendances, setAttendances] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Ambil data pendaftaran dan kehadiran peserta dari backend
			axios.get("http://localhost:5000/api/attendance/all", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
			})
				.then(res => {
					setAttendances(Array.isArray(res.data) ? res.data : []);
					setLoading(false);
				})
				.catch(() => {
					setAttendances([]);
					setLoading(false);
				});
	}, []);

	const handleStatusChange = (registration_id, status) => {
		axios.post(`http://localhost:5000/api/attendance/${registration_id}`, { status }, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
		})
			.then(() => {
				setAttendances(attendances.map(a => a.registration_id === registration_id ? { ...a, status } : a));
			});
	};

		return (
			<>
				<div className="min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-purple-950 text-white pt-24 px-6 md:px-20">
					<h1 className="text-2xl font-bold mb-6">Validasi Kehadiran Peserta Seminar</h1>
					{loading ? (
						<p>Loading...</p>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full border border-gray-700 rounded-lg overflow-hidden">
								<thead className="bg-white/10 text-left">
									<tr>
										<th className="px-4 py-2">Nama Peserta</th>
										<th className="px-4 py-2">Seminar</th>
										<th className="px-4 py-2">Status Kehadiran</th>
										<th className="px-4 py-2">Aksi</th>
									</tr>
								</thead>
								<tbody>
									{attendances.map(a => (
										<tr key={a.registration_id} className="border-t border-gray-700 hover:bg-white/5">
											<td className="px-4 py-2">{a.nama}</td>
											<td className="px-4 py-2">{a.judul}</td>
											<td className="px-4 py-2 font-semibold">
												{a.status === "hadir" ? <span className="text-green-400">Hadir</span> : <span className="text-red-400">Tidak Hadir</span>}
											</td>
											<td className="px-4 py-2 space-x-2">
												<button
													onClick={() => handleStatusChange(a.registration_id, "hadir")}
													className="px-3 py-1 rounded bg-green-600 hover:bg-green-700"
													disabled={a.status === "hadir"}
												>Hadir</button>
												<button
													onClick={() => handleStatusChange(a.registration_id, "tidak hadir")}
													className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
													disabled={a.status === "tidak hadir"}
												>Tidak Hadir</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</>
		);
	}

