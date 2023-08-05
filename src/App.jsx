import './App.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { refreshCart } from './redux/actions'
import { Route, Routes, useLocation } from 'react-router-dom'
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
import Ventas from './components/VistasUser/Ventas'
import Opiniones from './components/VistasUser/PuntOp'
import Nav from './components/NavBar/Nav'
import axios from 'axios';
import BackgroundAdmin from './views/DashboardAdmin/BackgroundAdmin';
import RecordSale from './components/RecordSaleAdmin/RecordSale';
import Perfil from './components/VistasUser/Perfil'
import CrudBooks from "./components/DashBoard Components/CrudBooks"
import EditUsers from "./components/EditUsers/EditUsers"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


axios.defaults.baseURL = "https://servidor-libreria.onrender.com/";


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
			localStorage.setItem("accessToken", params.token);
			window.location.href = "/home";
		}
	}, []);

  // Comprobar si el usuario es administrador
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div className="">
      {location.pathname !== "/" &&
        location.pathname !== "/login"&&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/recordSale" &&
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
		<Route path="/perfil" element={<Perfil />} />
        {/* Agregar una ruta protegida para el componente DashboardAdmin */}
        {isAdmin ? (
          <Route path="/dashboard" element={<BackgroundAdmin />} />
        ) : (
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
        )}
        {/* Resto de tus rutas */}
        <Route path="/crudBooks/:id" element={<CrudBooks />} />
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
      </Routes>
    </div>
  );
}

export default App;
