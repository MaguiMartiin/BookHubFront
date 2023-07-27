import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const NavBar = () => {
  const cart = useSelector((state) => state.cart);

  const toInicio = () => {
    window.location.href = "/inicioSesion";
  };

  return (
    <div className={style.contain}>
      <Link to="/" className={style.h1}>
        BookHub
      </Link>
      <div className={style.div}>
        <Link to="/home" className={style.link}>
          Inicio
        </Link>
        <Link to="/carrito" className={style.link}>
          {cart.length > 0 ? (
            <div className={style.cartIndicator}>
              <FaCartArrowDown />
              <div className={style.badge}>{cart.length}</div>
            </div>
          ) : (
            <FaCartArrowDown />
          )}
        </Link>
        <Link to="/form" className={style.link}>
          Vender Libro
        </Link>
      </div>
      <button className={style.botonInicio} onClick={toInicio}>
        Inicia sesión
      </button>
    </div>
  );
};

export default NavBar;
