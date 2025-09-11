import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Beranda from "./pages/Beranda";
import CertificatePage from "./pages/CertificatePage"; // ⬅️ pastikan import ini benar


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/certificate" element={<CertificatePage />} /> {/* ⬅️ gunakan CertificatePage */}
      </Routes>
    </Router>
  );
}

export default App;
