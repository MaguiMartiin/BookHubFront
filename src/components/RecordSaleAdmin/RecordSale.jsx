import React, { useEffect, useState } from 'react';
import style from './Record.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";
import { useSelector } from 'react-redux';
import Swal from "sweetalert2"

export default function RecordSale() {
    const navigate = useNavigate();
    const [mes, setMes ] = useState([])
    const data = [
    { name: mes[6]?.mes ?mes[6]?.mes: "enero", ventas: mes[1]?.total?1350 :mes[6]?.total, usuarios: 440},
    { name: mes[7]?.mes ?mes[7]?.mes:'febrero', ventas: mes[1]?.total?780: mes[7]?.total, usuarios: 40 },
    { name: mes[8]?.mes ?mes[8]?.mes:'marzo', ventas: mes[1]?.total?1110:mes[8]?.total, usuarios: 140 },
    { name: mes[9]?.mes ?mes[9]?.mes:'abril', ventas: mes[1]?.total?230:mes[9]?.total, usuarios: 340 },
    { name: mes[10]?.mes ?mes[10]?.mes:'mayo', ventas: mes[1]?.total?940:mes[10]?.total, usuarios: 110  },
    { name: mes[11]?.mes ?mes[11]?.mes:'junio', ventas: mes[1]?.total?760:mes[11]?.total, usuarios: 540  },
    { name: mes[0]?.mes ?"julio":mes[0]?.mes, ventas: mes[0]?.total, usuarios: 540  },
    { name: mes[1]?.mes ?"agosto":mes[1]?.mes, ventas: mes[1]?.total,usuarios: 740  },
    { name: mes[2]?.mes ?mes[2]?.mes:'septiembre', ventas: mes[2]?.total?mes[2]?.total: 0,usuarios: 0  },
    { name: mes[3]?.mes ?mes[3]?.mes:'octubre', ventas: mes[3]?.total?mes[3]?.total: 0, usuarios: 0  },
    { name: mes[4]?.mes ?mes[4]?.mes:'noviembre', ventas: mes[4]?.total?mes[4]?.total: 0, usuarios: 0  },
    { name: mes[5]?.mes ?mes[5]?.mes:'diciembre', ventas: mes[5]?.total?mes[5]?.total: 0, usuarios: 0  },
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
        const res = (await axios.get("/compras/all")).data
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
                    <Line type="monotone" dataKey="ventas" stroke="#249102" activeDot={{ r: 10 }} />
                    <Line type="monotone" dataKey="usuarios" stroke="#ca0000" activeDot={{ r: 10 }} />
                </LineChart>
      </div>
   
    </div>
  );
}
