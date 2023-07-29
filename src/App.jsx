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
//import Landing from './views/Landing'
import Form from "./views/Form/FormCreate"
// user
import Login from './views/User/Login'
import EditDetail from './views/Detail/EditDetail'
import SignUp from './views/User/SignUp'
import Carrito from './views/Carrito/Carrito'
import axios from 'axios';

axios.defaults.baseURL = "https://servidor-libreria.onrender.com"

import MyBooks from './views/MyBooks/MyBooks'


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
    // Obtener el token de la URL si está presente
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.token) {
      // Guardar el token en el localStorage
      localStorage.setItem("accessToken", params.token);
      
      // Redireccionar a la página principal o a donde desees después del inicio de sesión exitoso
      // Aquí redirecciono al componente Home, pero puedes ajustarlo según tu estructura de enrutamiento
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
				<Route path="/editar/:id" element={<EditDetail />}></Route>
				<Route path="/form" element={<Form />} />
				<Route path="/login" element={<Login />}></Route>
				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/MyBooks" element={<MyBooks/>}/>
			   <Route path="/carrito" element={<Carrito/>}/>
			</Routes>
		</div>
	);
}

export default App;
