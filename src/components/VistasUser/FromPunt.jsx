import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const FormPuntOp = ({id}) => {

	const token = localStorage.getItem("accessToken");
  console.log(token);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate(); 

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/punctuation",
        {
          punctuation: rating,
          BookId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Puntuación creada con éxito:", response.data);
      navigate("/formOp");
    } catch (error) {
      console.error("Error al crear la puntuación:", error);
    }
  }

  return (
    <div>
      <div>
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={index}
              onMouseEnter={() => handleRatingChange(ratingValue)} // Usamos onMouseEnter en lugar de onClick
              onClick={handleSubmit}
              className={ratingValue <= rating ? "text-yellow-500" : "text-gray-400"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FormPuntOp;
