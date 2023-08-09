import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating, size }) => {
  const roundedRating = Math.round(rating * 2) / 2; // Redondear a la mitad más cercana
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating - fullStars;
  const emptyStars = 5 - fullStars - (halfStar > 0 ? 1 : 0);

  return (
    <div className="flex items-start mt-2 mb-5">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} color="#ffc107" size={size}/>
      ))}
      {halfStar > 0 && <FaStarHalfAlt color="#ffc107" size={size}/>}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} color="#ffc107" size={size}/>
      ))}
    </div>
  );
};

export default StarRating;
