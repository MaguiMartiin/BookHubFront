import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import VistaUser from "../VistasUser/VistaUser";
import { FiUsers } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import NavPerfil from "./NavPerfil";

const NavBar = () => {
	const [bg, setBg] = useState(false);
	const cart = useSelector((state) => state.cart);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const toInicio = () => {
		window.location.href = "/login";
	};

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const userIsLoggedIn = !!token;
		setIsLoggedIn(userIsLoggedIn);
	}, []);

	const [showVistaUser, setShowVistaUser] = useState(false);
	const handleUserButtonClick = () => {
		setShowVistaUser(!showVistaUser);
	};


  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("isVendedor")
    localStorage.removeItem("cart")
    cart.splice(0, cart.length);
    setIsLoggedIn(false)
  }
  useEffect(() => {

		window.addEventListener("scroll", () => {
			return window.scrollY > 50 ? setBg(true) : setBg(false);
		});
	});

	return (
		<div className="">
			<div
				className={` grid grid-cols-3  flex-wrap fixed  z-10 lg:w-full text-white transition-all duration-300 p-2 w-full ${
					bg ? "bg-rojo" : "bg-rojo/10 backdrop-blur h-24	"
				} `}>
					<div className="flex items-center">
						<Link to="/" className="flex items-center text-5xl text-white font-primary">
							BookHub
						</Link>
					</div>
					<div className="flex gap-10 justify-center items-center">
						<Link
							to="/home"
							className={` hover:text-gray-400 font-bold flex flex-col justify-center items-center w-16`}>
							<AiOutlineHome size={25} />
							<span>Inicio</span>
						</Link>
						<Link
							to="/carrito"
							className={` hover:text-gray-400 font-bold flex flex-col justify-center items-center w-16`}>
							{cart.length > 0 ? (
								<div className={style.cartIndicator}>
									<FaCartArrowDown size={25} />
									<span>Carrito</span>
									<div className={style.badge}>{cart.length}</div>
								</div>
							) : (
								<div className="flex flex-col justify-center items-center"> 
									<FaCartArrowDown size={25} />
									<span>Carrito</span>
								</div>
							)}
						</Link>
						<Link to='/sobreNosotros' className={` hover:text-gray-400 font-bold flex flex-col justify-center items-center w-16`}>							
								<FiUsers size={25} />
								<span>Nosotros</span>
							
						</Link>
					</div>
					<div className="flex justify-end">
						{!isLoggedIn && (
							<button
								className="bg-gris text-white m-2 text-xl px-6 py-4 rounded-lg font-primary"
								onClick={toInicio}>
								Inicia sesión
							</button>
						)}
						{isLoggedIn && (
							<div className="flex justify-end">
								<button onClick={handleUserButtonClick} className="">
									<NavPerfil size={25} />
								</button>
								{showVistaUser && <VistaUser onLogout={handleLogout} />}
							</div>
						)}
					</div>
			</div>
		</div>
	);
};

export default NavBar;
