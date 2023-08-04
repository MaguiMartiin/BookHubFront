import './App.css';
import Nav from './components/NavBar/Nav';
import React from 'react';
import { useDispatch } from 'react-redux';
import { refreshCart } from './redux/actions';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './views/Landing/Landing';
import Home from './views/Home/Home';
import Detail from './views/Detail/Detail';
import Form from "./views/Form/FormCreate";
import Login from './views/User/Login';
import EditDetail from './views/Detail/EditDetail';
import SignUp from './views/User/SignUp';
import Carrito from './views/Carrito/Carrito';
import MyBooks from './views/MyBooks/MyBooks';
import Compras from './components/VistasUser/Compras';
import Ventas from './components/VistasUser/Ventas';
import Opiniones from './components/VistasUser/PuntOp';
import DashboardAdmin from './views/DashboardAdmin/DashboardAdmin';
import CrudBooks from './components/DashBoard Components/CrudBooks';
import EditUsers from './components/DashBoard Components/EditUsers';
import axios from 'axios';

axios.defaults.baseURL = "https://servidor-libreria.onrender.com/"; //"http://localhost:3001"


function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const carrito = localStorage.getItem("cart");
    const carritoRefresh = JSON.parse(carrito);
    if (carritoRefresh) {
      dispatch(refreshCart(carritoRefresh));
    }
  }, [dispatch]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.token) {
      const objString = decodeURIComponent(params.token);
      const obj = JSON.parse(objString);
      // Guardar el token y el valor de admin en el localStorage
      localStorage.setItem("accessToken", obj.token);
      localStorage.setItem("isAdmin", obj.admin);

      window.location.href = "/home";
    }
  }, []);

  // Comprobar si el usuario es administrador
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div className="">
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/crudBooks/:id" &&
        location.pathname !== "/editUsers" &&
        location.pathname !== "/signup" && <Nav />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/editar/:id" element={<EditDetail />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/MyBooks" element={<MyBooks />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/publicaciones" element={<Ventas />} />
        <Route path="/opiniones" element={<Opiniones />} />
        {/* Agregar una ruta protegida para el componente DashboardAdmin */}
        {isAdmin ? (
          <Route path="/dashboard" element={<DashboardAdmin />} />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
        )}
        {/* Resto de tus rutas */}
        <Route path="/crudBooks/:id" element={<CrudBooks />} />
        <Route path="/editUsers" element={<EditUsers />} />
      </Routes>
    </div>
  );
}

export default App;