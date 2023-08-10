import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPerfil, getAllPurchases } from "../../redux/actions";
import MyBuys from "./perfil/MyBuys";
import ImageParallax from "./perfil/ImageParallax";
import profile from "../../assets/profile/usuario.png";
import { Link } from "react-router-dom";
import UpProfile from "./perfil/UpProfile";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

const Perfil = () => {
	const dispatch = useDispatch();
	const perfil = useSelector((state) => state.perfil);
	const purchases = useSelector((state) => state.myShopping);

	const [isModalOpen, setIsModalOpen] = useState(false);

	
	useEffect(() => {
		dispatch(getPerfil());
		dispatch(getAllPurchases());
	}, []);


	const handleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	
	return (
		<div className="text-white w-full h-screen border border-red-400">
			<div>
				<ImageParallax />
			</div>
			<div className="absolute m-0  left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
				<div className="flex flex-col justify-center items-center bg-rojo rounded-lg p-4 px-8">
					<div className="flex flex-col justify-center  items-center rounded-full w-48 h-48 ">
						<img
							src={perfil.image === null ? profile : perfil.image}
							alt="perfil"
							className="rounded-full w-48 h-48 object-cover cursor-pointer"
							onClick={handleModal}
						/>
					</div>
					<h1 className="text-[2rem] font-secondary uppercase font-bold">
						{perfil.name}
					</h1>
					<hr />
					<h3 className="text-[1rem] font-secondary uppercase font-bold">
						{perfil.lastName}
					</h3>
				</div>
			</div>
			<div className="flex justify-between items-center h-[18rem] mx-[10rem]">
				
				<div>
					<MyBuys buys={purchases} />
					<Link to="/compras" className="text-lg font-bold">
						<motion.div
							className="flex justify-center  items-center gap-2 text-center hover:text-rojo"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}>
							<motion.div className="w-16 h-16" whileHover={{ scale: 1.1 }}>
								<HiOutlineArrowNarrowRight className="w-full h-full" />
							</motion.div>
							<h2>mas informacion</h2>
						</motion.div>
					</Link>
				</div>
			</div>
			<div className="absolute m-0 left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] z-[100]">
				{/* <button>Eliminar</button> */}
				{isModalOpen && (
					<UpProfile
						handleModal={handleModal}
						// setIsModalOpen={setIsModalOpen}
					/>
				)}
			</div>
		</div>
	);
};

export default Perfil;
