import React from "react";
import SeminarCard from "../component/magicui/SeminarCard";

export default function Beranda() {
  const seminars = [
    {
      id: 1,
      title: "Seminar Teknologi 2025",
      desc: "Bahas perkembangan AI & IoT bersama pembicara internasional.",
      date: "20 September 2025",
      location: "UMY Convention Hall",
      price: "Rp 100.000",
      image:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-950 pt-24 px-6">
      <h1 className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-md py-2">
        <span className="text-5xl md:text-6xl animate-bounce">🎟️</span>
        <span>Daftar Seminar 2025</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
        {seminars.map((item) => (
          <SeminarCard
            key={item.id}
            title={item.title}
            desc={item.desc}
            date={item.date}
            location={item.location}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}
