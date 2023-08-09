import React, { useEffect, useState } from 'react';
import style from './Record.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
import { useSelector } from 'react-redux';
import Swal from "sweetalert2"

export default function RecordSale() {
  const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const [mes, setMes ] = useState([])
    const data = [
    { name: mes[0]?.dia ? mes[0]?.dia: "Domingo", VENTAS: mes[0]?.ventas?mes[0]?.ventas : 0},
    { name: mes[1]?.dia ? mes[1]?.dia: "Lunes",   VENTAS: mes[1]?.ventas?mes[1]?.ventas : 0},
    { name: mes[2]?.dia ? mes[2]?.dia: "Martes",  VENTAS: mes[2]?.ventas?mes[2]?.ventas : 0},
    { name: mes[3]?.dia ? mes[3]?.dia: "Miercoles", VENTAS: mes[3]?.ventas?mes[3]?.ventas : 0},
    { name: mes[4]?.dia ? mes[4]?.dia: "Jueves",  VENTAS: mes[4]?.ventas?mes[4]?.ventas : 0 },
    { name: mes[5]?.dia ? mes[5]?.dia: "Viernes", VENTAS: mes[5]?.ventas?mes[5]?.ventas : 0 },
    { name: mes[6]?.dia ? mes[6]?.dia: "Sabado",  VENTAS: mes[6]?.ventas?mes[6]?.ventas : 0},
]

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
useEffect(()=>{
    const ress = async () => {
        const res = (await axios.get("/compras/all",{headers: {
          Authorization: `Bearer ${token}`,
          }})).data
        console.log("precio", res);
        setMes([
            ...res
        ])
    }
    ress()
},[])
  return (
    <div className={style.dashContain}>
    <div className={style.sidebar}>
        <Link to="/" className={style.titulo1}>BookHub</Link>
        <Link to="/dashboard">
        <button className={style.titulo3}>Volver</button>
          </Link>
          <button className={style.sidebutton} onClick={() => { navigate("/publicaciones") }}>
            Mis publicaciones
        </button>
        <button className={style.sidebutton} onClick={() => { navigate("/form") }}>
            Realizar una nueva publicación
        </button>
        <button className={style.sidebutton} onClick={() => { navigate("/editUsers") }}>
            Editar Usuarios
        </button>
        <button className={location.pathname !== "/" ? style.boton : style.sidebutton} onClick={() => { navigate("/recordSale") }}>
            Registro de Ventas
        </button>
        <button className={style.sidebutton} onClick={() => { navigate("/editGender") }}>
            Editar Género 
        </button>
        <button className={style.sidebutton} onClick={() => { navigate("/editAutor") }}>
            Editar Autor 
        </button>
        <button className={style.titulo2} onClick={handleLogoutClick}>Cerrar Sesión</button>
      </div>
      <div className={style.contenido}>
        {/* Contenido principal */}
        <LineChart width={1100} height={500} data={data}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="VENTAS" stroke="#249102" activeDot={{ r: 10 }} />
                </LineChart>
      </div>
   
    </div>
  );
}
