import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import VistaAdmin from "../VistasUser/VistaAdmin";
import { AiOutlineHome, AiOutlineDashboard } from "react-icons/ai";
import NavPerfil from "./NavPerfil";

export default function NavAdmin() {
	const [bg, setBg] = useState(false);
	const cart = useSelector((state) => state.cart);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
		localStorage.removeItem("accessToken");
		localStorage.removeItem("isAdmin");
		localStorage.removeItem("cart");
		cart.splice(0, cart.length);
		setIsLoggedIn(false);
	};
	useEffect(() => {
		window.addEventListener("scroll", () => {
			return window.scrollY > 50 ? setBg(true) : setBg(false);
		});
	});

	return (
		<div className="">
			<div
				className={` grid grid-cols-3  flex-wrap fixed  z-10 lg:w-full text-white transition-all duration-300 p-2 w-full h-24 ${
					bg ? "bg-rojo" : "bg-rojo/10 backdrop-blur"
				} `}>
				<div  className="flex items-center">
					<Link
						to="/"
						className="text-5xl text-white font-primary hover:text-gray-400 flex items-center">
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
					{isLoggedIn && (
						<div>
							<Link
								to="/dashboard"
								className={` hover:text-gray-400 font-bold flex flex-col justify-center items-center  w-16`}>
								<AiOutlineDashboard size={25} />
								<span>Dashboard</span>
							</Link>
						</div>
					)}
				</div>

				{isLoggedIn && (
					<div className="flex justify-end">
						<button
							onClick={handleUserButtonClick}
							className={` hover:text-gray-400`}>
								<div className="flex flex-col m-0 p-0">
									<NavPerfil size={25} />
								</div>
						</button>
						{showVistaUser && <VistaAdmin  onLogout={handleLogout} />}
					</div>
				)}
			</div>
		</div>
	);
}

