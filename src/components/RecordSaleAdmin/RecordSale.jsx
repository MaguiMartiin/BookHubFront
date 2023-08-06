import React, { useEffect, useState } from 'react';
import style from './Record.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";

export default function RecordSale() {
    const navigate = useNavigate();
    const [mes, setMes ] = useState([])
    const data = [
    { name: mes[6]?.mes ?mes[6]?.mes: "enero", ventas: mes[1]?.total?1350 :mes[6]?.total},
    { name: mes[7]?.mes ?mes[7]?.mes:'febrero', ventas: mes[1]?.total?780: mes[7]?.total },
    { name: mes[8]?.mes ?mes[8]?.mes:'marzo', ventas: mes[1]?.total?1110:mes[8]?.total },
    { name: mes[9]?.mes ?mes[9]?.mes:'abril', ventas: mes[1]?.total?230:mes[9]?.total },
    { name: mes[10]?.mes ?mes[10]?.mes:'mayo', ventas: mes[1]?.total?940:mes[10]?.total },
    { name: mes[11]?.mes ?mes[11]?.mes:'junio', ventas: mes[1]?.total?760:mes[11]?.total },
    { name: mes[0]?.mes ?"julio":mes[0]?.mes, ventas: mes[0]?.total },
    { name: mes[1]?.mes ?"agosto":mes[1]?.mes, ventas: mes[1]?.total },
    { name: mes[2]?.mes ?mes[2]?.mes:'septiembre', ventas: mes[2]?.total?mes[2]?.total: 0 },
    { name: mes[3]?.mes ?mes[3]?.mes:'octubre', ventas: mes[3]?.total?mes[3]?.total: 0 },
    { name: mes[4]?.mes ?mes[4]?.mes:'noviembre', ventas: mes[4]?.total?mes[4]?.total: 0 },
    { name: mes[5]?.mes ?mes[5]?.mes:'diciembre', ventas: mes[5]?.total?mes[5]?.total: 0 },
]
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
        <button className={style.titulo2}>Volver</button>
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
      </div>
      <div className={style.contenido}>
        {/* Contenido principal */}
        <AreaChart width={1150} height={500} data={data}>
                    <CartesianGrid strokeDasharray="6 6" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Utilizar el componente Area en lugar de Line */}
                    <Area type="monotone" dataKey="ventas" stroke="#178731" fill="#178731" />
                </AreaChart>
      </div>
   
    </div>
  );
}
