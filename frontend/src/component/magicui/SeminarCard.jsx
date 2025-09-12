import React from "react";
import { Link } from "react-router-dom";

const SeminarCard = ({ id, title, desc, date, location, price, image }) => {
  return (
    <Link
      to={`/seminar/${id}`}
      className="bg-gray-900 shadow-lg rounded-xl overflow-hidden w-full max-w-sm border border-gray-700 hover:shadow-xl hover:shadow-blue-500/30 transition"
    >
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover opacity-90 hover:opacity-100 transition"
      />
      <div className="p-5 text-gray-200">
        <h2 className="text-lg font-bold mb-2 text-white">{title}</h2>
        <p className="text-sm text-gray-400 mb-3">{desc}</p>

        <p className="text-sm">
          <span className="font-semibold text-gray-300">Tanggal:</span> {date}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-300">Lokasi:</span> {location}
        </p>
        <p className="text-sm">
          <span className="font-semibold text-gray-300">Harga:</span> {price}
        </p>
      </div>
    </Link>
  );
};

export default SeminarCard;
