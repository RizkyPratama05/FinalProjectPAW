import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Beranda from "./pages/Beranda";
import CertificatePage from "./pages/CertificatePage";
import SeminarDetail from "./pages/SeminarDetail";
import Layout from "./component/Layout"; // tambahkan ini

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/certificate" element={<CertificatePage />} />
          <Route path="/seminar/:id" element={<SeminarDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
