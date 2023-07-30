import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import VistaUser from '../VistasUser/VistaUser'
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  const cart = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toInicio = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userIsLoggedIn = !!token;
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  const [showVistaUser, setShowVistaUser] = useState(false);
  const handleUserButtonClick = () => {
    setShowVistaUser(!showVistaUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    setIsLoggedIn(false)
  }

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
        {isLoggedIn &&
        <Link to="/form" className={style.link}>
          Vender Libro
        </Link>
        }
      </div>
        {!isLoggedIn&& <button className={style.botonInicio} onClick={toInicio}>
        Inicia sesión
        </button>}
      
      {isLoggedIn&& 
      <div>
        <button onClick={handleUserButtonClick} className={style.userButton}>
          <FaUser size={32}/> 
        </button>
        {showVistaUser && <VistaUser onLogout={handleLogout}/>}
      </div>
      }

    </div>
  );
};

export default NavBar;
