import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Beranda from "./pages/Beranda";
import CertificatePage from "./pages/CertificatePage";
import SeminarDetail from "./pages/SeminarDetail";

import KelolaSeminar from "./admin/KelolaSeminar";
import Attendance from "./admin/attendance";
import KelolaUser from "./admin/KelolaUser";

import Layout from "./component/Layout";            // Layout user
import AdminLayout from "./component/navbaradmin/AdminLayout"; // Layout admin

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page tanpa navbar */}
        <Route path="/" element={<LandingPage />} />

        {/* Routes user */}
        <Route element={<Layout />}>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/seminar/:id" element={<SeminarDetail />} />
        </Route>

        {/* Routes admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<KelolaSeminar />} /> {/* atau komponen dashboard admin */}
          <Route path="/admin/seminar" element={<KelolaSeminar />} />
          <Route path="/admin/users" element={<KelolaUser />} />
          <Route path="/admin/attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
