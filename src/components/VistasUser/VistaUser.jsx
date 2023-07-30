import React, { useState } from 'react';

const VistaUser = () => {
  return (
    <div className="relative">
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a href="/compras" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Compras
            </a>
            <a href="/opiniones_reseñas" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Opiniones y reseñas
            </a>
            <a href="/publicaciones" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Publicaciones
            </a>
            <a href="MiPerfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Mi perfil
            </a>
            <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Cerrar sesión
            </a>
          </div>
        </div>
    </div>
  );
};

export default VistaUser;
