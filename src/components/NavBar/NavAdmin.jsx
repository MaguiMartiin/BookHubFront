import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUser } from 'react-icons/fa';
import VistaAdmin from '../VistasUser/VistaAdmin';

export default function NavAdmin() {
    const [bg, setBg] = useState(false);
    const cart = useSelector((state) => state.cart);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      localStorage.removeItem("isAdmin")
      localStorage.removeItem("cart")
      cart.splice(0, cart.length);
      setIsLoggedIn(false)
    }
    useEffect(() => {
          window.addEventListener("scroll", () => {
              return window.scrollY > 50 ? setBg(true) : setBg(false);
          });
      });
  
    return (
          <div className="">
              <div
                className={`p-6 flex fixed items-center justify-between flex-wrap  z-10 lg:w-full text-white transition-all duration-300 ${ bg ? "bg-rojo" : "bg-transparent"} `}>
                <Link to="/" class="text-6xl text-white font-primary">
                    BookHub
                </Link>
                 
                <Link to="/home" className={style.link}>
                    Inicio
                </Link>
                    {isLoggedIn && (
                    <div>
                    <Link to="/dashboard" className={style.link}>
                        Dashboard
                    </Link>
                    </div>
                    )}
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
                  
                  {isLoggedIn && (
                    
                      <div >
                          <button
                              onClick={handleUserButtonClick}
                              className="">
                              <FaUser size={32} />
                          </button>
                          {showVistaUser && <VistaAdmin onLogout={handleLogout} />}
                      </div>
                  )}
              </div>
          </div>
      );
  };
