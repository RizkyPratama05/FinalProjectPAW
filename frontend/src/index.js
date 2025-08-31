import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandingPage from './pages/LandingPage'; // ⬅️ ganti import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />   {/* ⬅️ render LandingPage, bukan App */}
  </React.StrictMode>
);
