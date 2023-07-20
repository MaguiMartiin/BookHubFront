import React from 'react'
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <div className='h-[80px]'>
            <Link to="/home">Inicio</Link>
            <Link to="/carrito">Carrito</Link>
        </div>
    )
}

export default NavBar