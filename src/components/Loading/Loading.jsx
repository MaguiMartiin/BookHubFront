import React from "react";
import {FaBookOpen } from 'react-icons/fa'


const Loading = () => {
    return (   
        <div className="flex flex-col justify-center items-center h-[20rem]">
            <div className="mb-4">
                <FaBookOpen className="text-6xl text-blanco animate-spin" />
            </div>
            <h1 className="text-4xl text-blanco font-bold">Cargando...</h1>
            <p className="text-lg text-gray-600">Preparando los tesoros literarios</p>
        </div>
      );
}

export default Loading
