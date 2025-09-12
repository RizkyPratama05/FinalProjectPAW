import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Beranda from "./pages/Beranda";
import CertificatePage from "./pages/CertificatePage";
import SeminarDetail from "./pages/SeminarDetail";
import KelolaSeminar from "./admin/KelolaSeminar"; // <-- import ditambahkan
import Layout from "./component/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page tanpa Navbar */}
        <Route path="/" element={<LandingPage />} />

        {/* Halaman lain dengan Layout (Navbar, Footer, dll) */}
        <Route element={<Layout />}>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/seminar/:id" element={<SeminarDetail />} />
          <Route path="/kelola-seminar" element={<KelolaSeminar />} />  {/* <-- route baru */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
