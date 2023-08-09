import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicId, bookDelete } from "../../redux/actions";
import { FaDollarSign } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaBookOpen } from 'react-icons/fa'
import Swal from "sweetalert2"
import axios from 'axios'

const Publicaciones = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(publicId()).then(() => {
      setLoading(false);
    });
  }, [dispatch, id]);

  const publicaciones = useSelector((state) => state.bookPublic);
  console.log(publicaciones);

  const suspendBook = async (id) => {
    try {
      const suspend = await axios.put(`/book/${id}/suspend`)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  const quitSuspendBook = async (id) => {
    try {
      const suspend = await axios.put(`/book/${id}/unsuspend`)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (id) => {
    dispatch(bookDelete(id))
    .then(() => {
        Swal.fire({
          icon: "success",
          title: "Libro eliminado!",
          text: "El libro ha sido eliminado exitosamente.",
          confirmButtonText: "Aceptar",
        }).then(() => {
          dispatch(publicId());
        })
      })
    .catch((error) => {console.error("Error al eliminar el libro:", error)})
};

if (loading) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="mb-4">
      <FaBookOpen className="text-6xl text-blanco animate-spin" />
    </div>
    <h1 className="text-4xl text-blanco font-bold">Cargando...</h1>
    <p className="text-lg text-gray-600">Preparando tus tesoros literarios</p>
  </div>
  );
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 pt-28 ">
      {publicaciones?.length > 0 ? (
        publicaciones.map((libro) => (
          <div >
            <div key={libro.id} className="bg-gradient-to-r from-violeta to-rojo p-6 shadow-xl rounded-lg">
              <div className="flex justify-end">
                <Link to={`/editar/${libro.id}`}>
                    <button className="flex items-center text-blanco text-xl">
                      Editar <FaEdit className="ml-1" />
                    </button>
                </Link>
              </div>  
              <p className="text-blanco"> Estado del libro: {libro.isActive ? '🟢 Activo': '🔴 Inactivo'}</p>
              <div className="relative w-full h-80 mb-4 rounded-lg overflow-hidden mt-2">
                <img src={libro.image} alt="libro" className="object-cover w-full h-full"/>
              </div>
              <h1 className="text-2xl font-bold text-blanco mb-2">{libro.name}</h1>
              <h2 className="text-lg text-blanco mb-2">{libro.Author?.name}</h2>
              <h2 className="text-lg text-blanco mb-2">{libro.Gender?.name}</h2>
              <div className="flex items-center">
                <FaDollarSign size="1.3rem" className="text-blanco" />
                <h1 className="ml-1 text-blanco">{libro.price}</h1>
              </div>

              <div className="flex items-center justify-center space-x-2 mt-3">
                <button className="text-blanco bg-gris p-2 mx-6 font-primary rounded-lg" onClick={() => suspendBook(libro.id)}>
                  Suspender
                </button>
                <button className="text-blanco bg-gris p-2 font-primary rounded-lg" onClick={() => quitSuspendBook(libro.id)}>
                  Quitar suspención
                </button>
              </div>

              <div>
                <button className="flex items-center text-blanco mt-4 text-xl" onClick={() => handleDelete(libro.id)}>
                  Eliminar <FaTrash className="ml-1 text-blanco" />
                </button>
              </div>
            </div>
          </div>
          ))
        ) : (
          <div className="flex flex-col justify-center mt-10 w-full items-center">
            <h1 className="text-3xl font-primary text-blanco mb-4">
              ¡Aún no has compartido tus tesoros literarios!
            </h1>
            <button class="bg-gris text-white text-2xl px-6 py-4 rounded-lg font-primary" onClick={() => {navigate("/home")}}>
              Volver a Home
            </button>
            <button class="bg-gris text-white text-2xl px-6 py-4 rounded-lg font-primary mt-8" onClick={() => {navigate("/form")}}>
              Realizar una publicacion
            </button>
          </div>
        ) }
      </div>
  );
};

export default Publicaciones;
