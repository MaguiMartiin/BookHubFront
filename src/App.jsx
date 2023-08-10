import './App.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { refreshCart } from './redux/actions'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
//import NavBar from './components/NavBar/NavBar'
import Detail from './views/Detail/Detail'
import Form from "./views/Form/FormCreate"
import Login from './views/User/Login'
import EditDetail from './views/Detail/EditDetail'
import SignUp from './views/User/SignUp'
import Carrito from './views/Carrito/Carrito'
import MyBooks from './views/MyBooks/MyBooks'
import Compras from './components/VistasUser/Compras'
import Publicaciones from './views/DashboardAdmin/Publicaciones'
import Opiniones from './components/VistasUser/PuntOp'
import Nav from './components/NavBar/Nav'
import axios from 'axios';
import BackgroundAdmin from './views/DashboardAdmin/BackgroundAdmin';
import RecordSale from './components/RecordSaleAdmin/RecordSale';
import Perfil from './components/VistasUser/Perfil'
import CrudBooks from "./components/DashBoard Components/CrudBooks"
import EditUsers from "./components/EditUsers/EditUsers"
import EditGender from './components/EditGender/EditGender'
import EditAutor from './components/EditAutor/EditAutor'
import CreateGender from './components/EditGender/CreateGender'
import CreateAutor from './components/EditAutor/CreateAutor'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FormOp from './components/VistasUser/FormOp'


axios.defaults.baseURL = "http://localhost:3001";


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
        location.pathname !== "/recordSale" &&
        location.pathname !== "/crudBooks/:id" &&
        location.pathname !== "/editUsers" &&
        location.pathname !== "/editGender" &&
        location.pathname !== "/editAutor" &&
        location.pathname !== "/createGender" &&
        location.pathname !== "/createAutor" &&
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
        <Route path="/opiniones" element={<Opiniones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/formOp" element={<FormOp />} />
        {/* Agregar una ruta protegida para el componente DashboardAdmin */}
        {isAdmin ? (
          <Route path="/dashboard" element={<BackgroundAdmin />} />
          ) : (
            <Route path="/dashboard" element={<Navigate to="/home" replace />} />
            )}
        <Route path="/crudBooks/:id" element={<CrudBooks />} />
        {/* Resto de tus rutas */}
        {isAdmin ? (
          <Route path="/publicaciones" element={<Publicaciones />} />
        ) : (
          <Route path="/publicaciones" element={<Navigate to="/home" replace />} />
        )} 
        {isAdmin ? (
          <Route path="/editUsers" element={<EditUsers />} />
        ) : (
          <Route path="/editUsers" element={<Navigate to="/home" replace />} />
        )}
        {isAdmin ? (
          <Route path="/recordSale" element={<RecordSale />} />
        ) : (
          <Route path="/recordSale" element={<Navigate to="/home" replace />} />
        )}
        {isAdmin ? (
          <Route path="/editGender" element={<EditGender />} />
        ) : (
          <Route path="/editGender" element={<Navigate to="/home" replace />} />
        )}
        {isAdmin ? (
          <Route path="/editAutor" element={<EditAutor />} />
        ) : (
          <Route path="/editAutor" element={<Navigate to="/home" replace />} />
        )}
        {isAdmin ? (
           <Route path="/createGender" element={<CreateGender/>} />
        ) : (
          <Route path="/createGender" element={<Navigate to="/home" replace />} />
        )}    
        {isAdmin ? (
           <Route path="/createAutor" element={<CreateAutor/>} />
        ) : (
          <Route path="/createAutor" element={<Navigate to="/home" replace />} />
        )}        
      </Routes>
    </div>
  );
}

export default App;