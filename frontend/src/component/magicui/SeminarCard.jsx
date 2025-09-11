import React from "react";

const SeminarCard = ({ title, desc, date, location, price, image }) => {
  return (
    <div className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 w-96 rounded-xl border border-gray-200 overflow-hidden">
      {/* Gambar */}
      <figure className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-56 hover:scale-105 transition-transform duration-500"
        />
      </figure>

      {/* Konten */}
      <div className="card-body p-5">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          {title}
          <span className="badge badge-primary text-white">NEW</span>
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>

        <div className="mt-4 space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Tanggal:</span> {date}
          </p>
          <p>
            <span className="font-semibold">Lokasi:</span> {location}
          </p>
          <p>
            <span className="font-semibold">Harga:</span>{" "}
            <span className="text-green-600 font-bold">{price}</span>
          </p>
        </div>

        <div className="card-actions justify-end mt-5">
          <button className="btn btn-primary rounded-lg px-6">
            Pesan Tiket
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
