import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import VistaPerfil from './perfil/VistaPerfil';
// import Profile from './Perfil';

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
			<div
				className="origin-top-right mr-8   absolute right-0 mt-[5rem]  w-48 rounded-md shadow-lg bg-negro ring-1 ring-black ring-opacity-5 "
				style={{ zIndex: 3 }}>
				<div className="py-1">
					<div>
						<VistaPerfil />
					</div>
					<a
						href="/compras"
						className="block px-4 py-2 text-sm text-blanco hover:bg-gray-100 hover:text-negro">
						Compras
					</a>
					<a
						href="/opiniones"
						className="block px-4 py-2 text-sm text-blanco hover:bg-gray-100 hover:text-negro">
						Opiniones
					</a>
					<a
						href="/Perfil"
						className="block px-4 py-2 text-sm text-blanco hover:bg-gray-100 hover:text-negro">
						Perfil
					</a>
					<button
						className=" flex items-center  w-full px-4 py-2 text-sm text-blaco hover:bg-gray-100 hover:text-negro"
						onClick={handleLogoutClick}>
						Cerrar sesión
					</button>
				</div>
			</div>
		</div>
	);
};

export default VistaUser;
