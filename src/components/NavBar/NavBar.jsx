import React from 'react'
import { Link } from "react-router-dom"
import style from './NavBar.module.css'

const NavBar = () => {
    const toInicio = () => {
        window.location.href = '/inicioSesion'
    }

    return (
        <div className={style.contain}>    
            <Link to="/" className={style.h1}> BookHub  </Link>
            <div className={style.div}>
                <Link to="/home" className={style.link}>Inicio</Link>
                <Link to="/carrito" className={style.link}>Carrito</Link>
                <Link to="/Form" className={style.link}>Vender Libro</Link>
            </div>
            <button className={style.botonInicio} onClick={toInicio}>Inicia sesión</button>
        </div>
    )
}

export default NavBar