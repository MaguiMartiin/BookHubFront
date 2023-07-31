import './App.css'
import React from 'react'
import { useDispatch } from 'react-redux'
import { refreshCart } from './redux/actions'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Detail from './views/Detail/Detail'
import Form from "./views/Form/FormCreate"
import Login from './views/User/Login'
import EditDetail from './views/Detail/EditDetail'
import SignUp from './views/User/SignUp'
import Carrito from './views/Carrito/Carrito'
import MyBooks from './views/MyBooks/MyBooks'
import Compras from './components/VistasUser/Compras'
import axios from 'axios';
import Ventas from './components/VistasUser/Ventas'

axios.defaults.baseURL = "https://servidor-libreria.onrender.com"

function App() {
   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
    const carrito = localStorage.getItem('cart');
    const carritoRefresh = JSON.parse(carrito);
    if (carritoRefresh ) {
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

  return (
		<div>
			{location.pathname !== "/" &&
				location.pathname !== "/login" &&
				location.pathname !== "/signup" && <NavBar />}
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/home/:id" element={<Detail />} />
				<Route path="/editar/:id" element={<EditDetail />}/>
				<Route path="/form" element={<Form />} />
				<Route path="/login" element={<Login />}/>
				<Route path="/signup" element={<SignUp />}/>
				<Route path="/MyBooks" element={<MyBooks/>}/>
			  <Route path="/carrito" element={<Carrito/>}/>
        <Route path="/compras" element={<Compras/>}/>
        <Route path="/publicaciones" element={<Ventas/>}/>
			</Routes>
		</div>
	);
}

export default App;
