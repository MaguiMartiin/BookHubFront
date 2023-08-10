import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import VistaAdmin from "../VistasUser/VistaAdmin";
import { AiOutlineHome, AiOutlineDashboard } from "react-icons/ai";

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
				className={`p-2 grid grid-cols-3  flex-wrap fixed  z-10 lg:w-full text-white transition-all duration-300 ${
					bg ? "bg-rojo" : "bg-rojo/10 backdrop-blur"
				} `}>
				{/* <div className=""> */}
				<Link
					to="/"
					class="text-6xl text-white   font-primary  hover:text-gray-400">
					BookHub
				</Link>

				{/* </div> */}
				<div className="flex gap-12 justify-center items-center">

					<Link
						to="/home"
						className={` hover:text-gray-400 font-bold flex flex-col justify-center items-center`}>
						<AiOutlineHome size={32} />
						<span>Inicio</span>
					</Link>
					{isLoggedIn && (
						<div>
							<Link
								to="/dashboard"
								className={` hover:text-gray-400 font-bold flex flex-col justify-center items-center`}>
								<AiOutlineDashboard size={32} />
								<span>Dashboard</span>
							</Link>
						</div>
					)}
					<Link
						to="/carrito"
						className={` hover:text-gray-400 font-bold flex flex-col justify-center items-center`}>
						{cart.length > 0 ? (
							<div className={style.cartIndicator}>
								<FaCartArrowDown size={32} />
								<span>Carrito</span>
								<div className={style.badge}>{cart.length}</div>
							</div>
						) : (
							<div>
								<FaCartArrowDown size={32} />

								<span>Carrito</span>
							</div>
						)}
					</Link>
				</div>

				{isLoggedIn && (
					<div className="flex justify-end">
						<button
							onClick={handleUserButtonClick}
							className={` hover:text-gray-400`}>
							<FaUser size={32} />
						</button>
						{showVistaUser && <VistaAdmin  onLogout={handleLogout} />}
					</div>
				)}
			</div>
		</div>
	);
}

