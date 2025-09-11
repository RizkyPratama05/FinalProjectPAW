import React from "react";

const SeminarCard = ({ title, desc, date, location, price, image }) => {
  return (
    <div className="bg-white text-black rounded-lg p-4 shadow w-80">
      <img src={image} alt={title} className="rounded mb-2" />
      <h2 className="font-bold text-lg">{title}</h2>
      <p>{desc}</p>
      <div className="text-sm mt-2">
        <div>{date}</div>
        <div>{location}</div>
        <div>{price}</div>
      </div>
    </div>
  );
};

export default SeminarCard;
