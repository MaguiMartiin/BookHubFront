import React from 'react';
import styles from './Back.module.css';
import { Link, useNavigate } from 'react-router-dom';


export default function BackgroundAdmin() {
    const navigate = useNavigate();
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin')); // Convertir a booleano
  return (
    <div className={styles.dashContain}>
    <div className={styles.sidebar}>
        <Link to="/" className={styles.titulo1}>BookHub</Link>
        <Link to="/home">
        <button className={styles.titulo2}>Volver</button>
          </Link>
        <button className={styles.sidebutton} onClick={() => { navigate("/publicaciones") }}>
            Mis publicaciones
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/form") }}>
            Realizar una nueva publicación
        </button>
       {isAdmin && <button className={styles.sidebutton} onClick={() => { navigate("/editUsers") }}>
            Editar Usuarios
        </button>}
       {isAdmin && <button className={styles.sidebutton} onClick={() => { navigate("/recordSale") }}>
            Registro de Ventas
        </button>}
      </div>
      <div className={styles.contenido}>
        {/* Contenido principal */}
        <header>
          <h1 className={styles.titulo}>DashBoard Principal</h1>
        </header>
      </div>
   
    </div>
  );
}

