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
import NavBar from "../../components/NavBar/NavBar";
import { FaBook, FaStar, FaShoppingCart } from "react-icons/fa";

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
			{/* <div className="w-full flex items-center justify-between p-6">
				<h1 className="text-6xl text-white font-primary">BookHub</h1>
				{!isLoggedIn && (
					<button
						onClick={toInicio}
						className="bg-gris text-white text-xl px-6 py-4 rounded-lg font-primary">
						Inicia Sesión
					</button>
				)}
			</div> */}
			<div className="flex mb-[4rem]">
				<NavBar/>
			</div>

			<div className="flex items-center justify-between pt-6">
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

			<div className="flex flex-col justify-center w-full items-center">
				<h1 className="text-blanco font-primary text-4xl">Sobre nosotros</h1>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5 p-5">
					<div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
						<div className="h-96 w-80">
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
								<a
									href="https://www.linkedin.com/in/franco-silva-389b69265/"
									target="_blank"
									className="flex flex-col items-center">
									<div className=" flex  items-center flex-col justify-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</div>
								</a>
								<a href="https://github.com/Franco22s" target="_blank">
									<div className="flex items-center flex-col">
										<FiGithub className=" stroke-white" size={32} />
										<span className="text-white">Github</span>
									</div>
								</a>
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
								<a
									href="https://www.linkedin.com/in/ricardo-dionel-diaz-1b6802236"
									target="_blank"
									className="flex flex-col items-center">
									<div className=" flex  items-center flex-col justify-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</div>
								</a>
								<a href="https://github.com/Dionel22" target="_blank">
									<div className="flex items-center flex-col">
										<FiGithub className=" stroke-white" size={32} />
										<span className="text-white">Github</span>
									</div>
								</a>
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
								<a
									href="https://www.linkedin.com/in/gabriel-yopasa-angulo-208665265/"
									target="_blank"
									className="flex flex-col items-center">
									<div className=" flex  items-center flex-col justify-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</div>
								</a>
								<a href="https://github.com/GaboYopasa" target="_blank">
									<div className="flex items-center flex-col">
										<FiGithub className=" stroke-white" size={32} />
										<span className="text-white">Github</span>
									</div>
								</a>
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
								<a
									href="https://www.linkedin.com/in/magali-alejandra-martin/"
									target="_blank"
									className="flex flex-col items-center">
									<div className=" flex  items-center flex-col justify-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</div>
								</a>
								<a href="https://github.com/MaguiMartiin" target="_blank">
									<div className="flex items-center flex-col">
										<FiGithub className=" stroke-white" size={32} />
										<span className="text-white">Github</span>
									</div>
								</a>
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
								<a
									href="https://www.linkedin.com/in/yonatanllanto/"
									target="_blank"
									className="flex flex-col items-center">
									<div className=" flex  items-center flex-col justify-center">
										{/* <div className=" "> */}
										<FiLinkedin
											className="stroke-white transition duration-300 ease-in-out"
											size={32}
										/>
										<span className="text-white  transition duration-300 ease-in-out">
											Linkedin
										</span>
										{/* </div> */}
									</div>
								</a>
								<a href="https://github.com/YonatanLLa" target="_blank">
									<div className="flex items-center flex-col">
										<FiGithub className=" stroke-white" size={32} />
										<span className="text-white">Github</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
