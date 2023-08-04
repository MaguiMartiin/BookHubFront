import React, { useEffect, useState } from 'react';
import style from './Record.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";

export default function RecordSale() {
    const navigate = useNavigate();
    const [mes, setMes ] = useState([])
    const data = [
    { name: mes[1]?.mes ?mes[0]?.mes: "enero", ventas: mes[1]?.total?750 :mes[6]?.total},
    { name: mes[7]?.mes ?mes[7]?.mes:'febrero', ventas: mes[1]?.total?380: mes[7]?.total },
    { name: mes[8]?.mes ?mes[8]?.mes:'marzo', ventas: mes[1]?.total?310:mes[8]?.total },
    { name: mes[9]?.mes ?mes[9]?.mes:'abril', ventas: mes[1]?.total?230:mes[9]?.total },
    { name: mes[10]?.mes ?mes[10]?.mes:'mayo', ventas: mes[1]?.total?440:mes[10]?.total },
    { name: mes[11]?.mes ?mes[11]?.mes:'junio', ventas: mes[1]?.total?360:mes[11]?.total },
    { name: mes[0]?.mes ?mes[0]?.mes: "julio", ventas: mes[0]?.total },
    { name: mes[1]?.mes ?mes[1]?.mes: "agosto", ventas: mes[1]?.total },
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
        <button className={style.sidebutton} onClick={() => { navigate("/form") }}>
            Realizar una publicación
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
        <LineChart width={1200} height={600} data={data}>
                    <CartesianGrid strokeDasharray="6 6" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ventas" stroke="#14a832" activeDot={{ r: 10 }} />
                </LineChart>
      </div>
   
    </div>
  );
}
