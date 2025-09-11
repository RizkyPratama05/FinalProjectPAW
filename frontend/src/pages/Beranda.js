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
    {
      id: 2,
      title: "Seminar Startup & Inovasi",
      desc: "Strategi membangun startup di era digital.",
      date: "25 September 2025",
      location: "Online (Zoom)",
      price: "Rp 50.000",
      image:
        "https://img.daisyui.com/images/stock/photo-1505740420928-5e560c06d30e.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        🎟️ Daftar Seminar 2025
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
