import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Beranda from "./pages/LandingPage";   // ⬅️ ganti import ke Beranda

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Beranda />   {/* ⬅️ render Beranda langsung */}
  </React.StrictMode>
);
