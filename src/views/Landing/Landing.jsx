import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenders } from "../../redux/actions";
import { landing, landing2 } from "../SobreNosotros/Nostros";
import Carousel from "./Carrusel";
import NavBar from "../../components/NavBar/NavBar";
import { FaBook, FaStar, FaShoppingCart } from "react-icons/fa";
import Footer from "../../components/Footer/Footer";

const Landing = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const toInicio = () => {
		window.location.href = "/login";
	};
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const userIsLoggedIn = !!token;
		setIsLoggedIn(userIsLoggedIn);
	}, []);

	const toHome = () => {
		window.location.href = "/home";
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGenders());
	}, [dispatch]);
	const genders = useSelector((state) => state.genders);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		const userIsLoggedIn = !!token;
		setIsLoggedIn(userIsLoggedIn);
	}, []);

	const redirectToHomeWithGenre = (genre) => {
		const url = `/home?genre=${encodeURIComponent(genre)}`;
		window.location.href = url;
	};

	return (
		<div className="max-w-screen min-h-[100vh] bg-negro">
			<div className="flex mb-[4rem]">
				<NavBar/>
			</div>

			<div className="flex items-center justify-between pt-8">
				<img src={landing} alt="image landing" className="w-1/6" />
				<div className="flex flex-col justify-center p-8 w-full items-center text-center space-y-7 text-white">
					<h1 className="font-tertiary text-5xl">
						Descubre un universo de conocimiento y aventuras literarias.
					</h1>
					<h2 className="font-secondary text-3xl ">
						Explora nuevos títulos y autores, y comparte tus reseñas con nuestra comunidad de lectores apasionados. ¡Únete a BookHub!
					</h2>
					<button
						onClick={toHome}
						className="bg-gris text-white text-2xl px-6 py-4 rounded-lg font-primary">
						¡A explorar!
					</button>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex flex-col justify-center p-6 w-full items-center">
					<h1 className="font-primary text-white text-6xl">
						Con nosotros tendrás
					</h1>
					<div className="mt-6 flex flex-col space-y-4">
						<div className="flex items-center">
							<FaBook className="text-white mr-2" />
							<span className="text-white text-lg">Acceso a una amplia biblioteca de libros</span>
						</div>
						<div className="flex items-center">
							<FaStar className="text-white mr-2" />
							<span className="text-white text-lg">Reseñas y recomendaciones personalizadas</span>
						</div>
						<div className="flex items-center">
							<FaShoppingCart className="text-white mr-2" />
							<span className="text-white text-lg">Compra y venta de libros</span>
						</div>
					</div>

				</div>
				<img src={landing2} alt="image landing" className="w-1/6" />
			</div>

			<div className="flex flex-col justify-center p-6 w-full items-center mt-24">
				<h1 className="font-primary text-white text-5xl">Los mejores libros por categorias</h1>
				<div className="space-x-4 p-6 text-center">
					{genders.map((cat, index) => {
						return (
							<button
								onClick={() => redirectToHomeWithGenre(cat)}
								key={index}
								className=" mt-4 bg-violeta text-white text-4xl px-6 py-4 rounded-lg font-tertiary mb-2 ">
								{cat}
							</button>
						);
					})}
				</div>
			</div>

			<div>
				<Carousel />
			</div>
			<div>
				<Footer/>
			</div>
		</div>
	);
};

export default Landing;
