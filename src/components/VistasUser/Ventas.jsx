import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicId } from "../../redux/actions";
import { FaDollarSign } from "react-icons/fa";

const Ventas = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(publicId());
  }, [dispatch]);

  const publicaciones = useSelector((state) => state.bookPublic);
  console.log(publicaciones);
  return (
    <div className="flex flex-col my-10">
      <div className="mb-5 text-center">
        <h1 className="text-4xl font-bold text-red-400 mb-4">Mis publicaciones</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {publicaciones?.length > 0 ? (
          publicaciones.map((libro) => (
            <div key={libro.id} className="bg-pink-100 p-6 shadow-xl rounded-lg">
              <div className="relative w-full h-52 mb-4 rounded-lg overflow-hidden">
                <img
                  src={libro.image}
                  alt="libro"
                  className="object-cover w-full h-full"
                />
              </div>
              <h1 className="text-2xl font-bold text-red-400 mb-2">{libro.name}</h1>
              <h2 className="text-lg text-customColor7 mb-2">{libro.Author?.name}</h2>
              <h2 className="text-lg text-customColor7 mb-4">{libro.Gender?.name}</h2>
              <div className="flex items-center">
                <FaDollarSign size="1.3rem" className="text-customColor7" />
                <h1 className="ml-1 text-customColor7">{libro.price}</h1>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold text-pink-500 mb-4">¡Aún no has compartido tus tesoros literarios!</h1>
            <button className="py-3 px-6 bg-pink-500 text-white rounded-md shadow-md hover:bg-pink-600 mb-4" onClick={() => {}}>
              Volver a Home
            </button>
            <button className="py-3 px-6 bg-pink-500 text-white rounded-md shadow-md hover:bg-pink-600" onClick={() => {}}>
              Publicar algún libro
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ventas;
