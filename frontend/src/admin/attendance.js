import React, { useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [status, setStatus] = useState("present");
  const [attendanceData, setAttendanceData] = useState(null);
  const [message, setMessage] = useState("");

  const handleMarkAttendance = async () => {
    try {
      await axios.post("http://localhost:5000/attendance", {
        registration_id: registrationId,
        status,
      });
      setMessage("Absensi berhasil dicatat!");
      fetchAttendance(); // otomatis ambil data terbaru
    } catch (error) {
      console.error(error);
      setMessage("Gagal mencatat absensi.");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/attendance/${registrationId}`
      );
      setAttendanceData(res.data);
    } catch (error) {
      console.error(error);
      setMessage("Gagal mengambil data absensi.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Absensi Seminar</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Registration ID:</label>
        <input
          type="text"
          value={registrationId}
          onChange={(e) => setRegistrationId(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        >
          <option value="present">Hadir</option>
          <option value="absent">Tidak Hadir</option>
        </select>
      </div>

      <button onClick={handleMarkAttendance} style={{ padding: "10px", width: "100%" }}>
        Catat Absensi
      </button>

      {message && <p>{message}</p>}

      {attendanceData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Data Absensi</h3>
          <p>Registration ID: {attendanceData.registration_id}</p>
          <p>Status: {attendanceData.status}</p>
        </div>
      )}
    </div>
  );
};

export default Attendance;
