import React from 'react';
import styles from './Back.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Publicaciones from './Publicaciones';
import { useSelector } from "react-redux";
import Swal from "sweetalert2"


export default function BackgroundAdmin() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart); 

    const handleLogout = () => {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("isAdmin")
      localStorage.removeItem("cart")
      cart.splice(0, cart.length);
    }

    const handleLogoutClick = () => {
      console.log("login")
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
          handleLogout();
          navigate("/home");
        }
      });
    };
    
  return (
    <div className={styles.dashContain}>
      <div className={styles.sidebar}>
        <Link to="/" className={styles.titulo1}>BookHub</Link>
        <Link to="/home" className={styles.sidebutton}>
          <button className={styles.titulo3} >Inicio</button>
        </Link>
        <button className={styles.sidebutton} onClick={() => { navigate("/form") }}>
          Realizar una nueva publicación
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/editGender") }}>
          Editar o Crear Género
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/editAutor") }}>
          Editar o crear Autor 
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/editUsers") }}>
          Editar Usuarios
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/recordSale") }}>
          Registro de Ventas
        </button>
      </div>
      <div className={styles.contenido}>
        <header>
          <Publicaciones/>
        </header>
      </div>

    </div>
  );
}

