import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenders } from "../../redux/actions";
import {
	landing,
	landing2,
	Magui,
	Yonatan,
	Ricardo,
	Franco,
	Gabriel,
} from "./Nostros";
import Carousel from "./Carrusel";
import { FiGithub, FiLinkedin } from "react-icons/fi";

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
			<div className="w-full flex items-center justify-between p-6">
				<h1 className="text-6xl text-white font-primary">BookHub</h1>
				{!isLoggedIn && (
					<button
						onClick={toInicio}
						className="bg-gris text-white text-xl px-6 py-4 rounded-lg font-primary">
						Inicia Sesión
					</button>
				)}
			</div>

			<div className="flex items-center justify-between">
				<img src={landing} alt="image landing" className="w-1/6" />
				<div className="flex flex-col justify-center p-6 w-full items-center">
					<h1 className="font-secondary text-white text-7xl">
						Descubre un universo de conocimiento y aventuras literarias en
						BookHub
					</h1>
					<h2 className="font-tertiary text-white text-4xl mt-6">
						BookHub es la plataforma definitiva para los amantes de la lectura.
						Nuestra extensa colección de libros de diversos géneros te permitirá
						descubrir nuevos títulos y autores que se adapten a tus intereses y
						preferencias. Únete a nuestra comunidad de lectores apasionados para
						compartir tus reseñas y descubrimientos literarios. ¡Embárcate en un
						emocionante viaje de conocimiento y entretenimiento con BookHub!
					</h2>
					<button
						onClick={toHome}
						className="bg-gris text-white text-2xl px-6 py-4 rounded-lg font-primary">
						¡Explorá!
					</button>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex flex-col justify-center p-6 w-full items-center">
					<h1 className="font-primary text-white text-7xl">
						En BookHub tendrás{" "}
					</h1>
					<h2 className="font-tertiary text-white text-4xl mt-6">
						Acceso a una amplia biblioteca de libros
					</h2>
					<h2 className="font-tertiary text-white text-4xl mt-6">
						Reseñas y recomendaciones personalizadas
					</h2>
					<h2 className="font-tertiary text-white text-4xl mt-6">
						Compra y venta de libros
					</h2>
				</div>
				<img src={landing2} alt="image landing" className="w-1/6" />
			</div>

			<div className="flex flex-col justify-center p-6 w-full items-center mt-24">
				<h1 className="font-primary text-white text-7xl">Categorías</h1>
				<div className="space-x-4">
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

			<div className="flex flex-col justify-center w-full items-center">
				<h1 className="text-blanco font-primary text-4xl">Sobre nosotros</h1>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 p-5">
					<div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
						<div className="h-96 w-72">
							<img
								className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
								src={Franco}
								alt="Franco"
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
						<div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
							<h1 className="font-dmserif text-3xl font-bold text-white">
								Franco Farid Silva Flores
							</h1>
							<div className="flex gap-4 py-8">
								<div className=" flex  items-center flex-col justify-center">
									<a
										href="https://www.linkedin.com/feed/"
										target="_blank"
										className="flex flex-col items-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</a>
								</div>
								<div className="flex items-center flex-col">
									<FiGithub className=" stroke-white" size={32} />
									<span className="text-white">Github</span>
								</div>
							</div>
						</div>
					</div>
					<div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
						<div className="h-96 w-72">
							<img
								className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
								src={Ricardo}
								alt="Ricardo"
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
						<div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
							<h1 className="font-dmserif text-3xl font-bold text-white">
								Ricardo Dionel Díaz
							</h1>
							<div className="flex gap-4 py-8">
								<div className=" flex  items-center flex-col justify-center">
									<a
										href="https://www.linkedin.com/feed/"
										target="_blank"
										className="flex flex-col items-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</a>
								</div>
								<div className="flex items-center flex-col">
									<FiGithub className=" stroke-white" size={32} />
									<span className="text-white">Github</span>
								</div>
							</div>
						</div>
					</div>
					<div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
						<div className="h-96 w-72">
							<img
								className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
								src={Gabriel}
								alt="Gabriel"
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
						<div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
							<h1 className="font-dmserif text-3xl font-bold text-white">
								Gabriel Yopasa Angulo
							</h1>
							<div className="flex gap-4 py-8">
								<div className=" flex  items-center flex-col justify-center">
									<a
										href="https://www.linkedin.com/feed/"
										target="_blank"
										className="flex flex-col items-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</a>
								</div>
								<div className="flex items-center flex-col">
									<FiGithub className=" stroke-white" size={32} />
									<span className="text-white">Github</span>
								</div>
							</div>
						</div>
					</div>
					<div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
						<div className="h-96 w-72">
							<img
								className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
								src={Magui}
								alt="Magui"
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
						<div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
							<h1 className="font-dmserif text-3xl font-bold text-white">
								Magali Alejandra Martin
							</h1>
							<div className="flex gap-4 py-8">
								<div className=" flex  items-center flex-col justify-center">
									<a
										href="https://www.linkedin.com/feed/"
										target="_blank"
										className="flex flex-col items-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</a>
								</div>
								<div className="flex items-center flex-col">
									<FiGithub className=" stroke-white" size={32} />
									<span className="text-white">Github</span>
								</div>
							</div>
						</div>
					</div>
					<div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
						<div className="h-96 w-72">
							<img
								className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
								src={Yonatan}
								alt="Yonatan"
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
						<div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
							<h1 className="font-dmserif text-3xl font-bold text-white">
								Yonatan Llanto Aquino
							</h1>
							<div className="flex gap-4 py-8">
								<div className=" flex  items-center flex-col justify-center">
									<a
										href="https://www.linkedin.com/feed/"
										target="_blank"
										className="flex flex-col items-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</a>
								</div>
								<div className="flex items-center flex-col">
									<FiGithub className=" stroke-white" size={32} />
									<span className="text-white">Github</span>
								</div>
							</div>
							{/* <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
								<a href=""></a>
							</button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
