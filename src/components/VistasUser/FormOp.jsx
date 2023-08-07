import React from "react";
import { useLocation } from "react-router-dom";

const FormOp = () => {
  const location = useLocation();
  const rating = new URLSearchParams(location.search).get("rating");

  return (
    <div>
      <h1>Tu puntuación seleccionada: {rating}</h1>
    </div>
  );
};

export default FormOp;
