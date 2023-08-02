import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"

const VistaUser = ({ onLogout }) => {

  const navigate = useNavigate()
  const handleLogoutClick = () => {
    Swal.fire({
      title: "¿Estás seguro que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
        navigate("/home");
      }
    });
  };

  return (
    <div className="relative">
        <div className="origin-top-right   absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 " style={{ zIndex: 3 }}>
          <div className="py-1">
            <a href="/compras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Compras
            </a>
            <a href="/opiniones" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Opiniones
            </a>
            <a href="MiPerfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Mi perfil
            </a>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogoutClick}>
              Cerrar sesión
            </button>
          </div>
        </div>
    </div>
  );
};

export default VistaUser;
