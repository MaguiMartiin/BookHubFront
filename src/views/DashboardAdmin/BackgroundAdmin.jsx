import React from 'react';
import styles from './Back.module.css';
import { Link, useNavigate } from 'react-router-dom';


export default function BackgroundAdmin() {
  const navigate = useNavigate();
  return (
    <div className={styles.dashContain}>
      <div className={styles.sidebar}>
        <Link to="/" className={styles.titulo1}>BookHub</Link>
        <Link to="/home">
          <button className={styles.titulo2}>Home</button>
        </Link>
        <button className={styles.sidebutton} onClick={() => { navigate("/publicaciones") }}>
          Mis publicaciones
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/form") }}>
          Realizar una nueva publicación
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/editUsers") }}>
          Editar Usuarios
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/recordSale") }}>
          Registro de Ventas
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/editGender") }}>
          Editar Género
        </button>
        <button className={styles.sidebutton} onClick={() => { navigate("/editAutor") }}>
          Editar Autor
        </button>
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

