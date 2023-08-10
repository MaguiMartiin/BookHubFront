import React, { useEffect, useState } from "react";
import profile from "../../../assets/profile/usuario.png";
import { getPerfil } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const VistaPerfil = () => {
    const dispatch = useDispatch();
	const perfil = useSelector((state) => state.perfil);
    useEffect(() => {
			dispatch(getPerfil());
		}, []);
    
	const handleModal = () => {
		setIsModalOpen(!isModalOpen);
	};
	return (
		<div className="realtive m-0">
			<div className="flex flex-col justify-center items-center rounded-lg p-4 px-8">
				<div className="flex flex-col justify-center  items-center rounded-full w-10 h-10 ">
					<img
						src={perfil.image === null ? profile : perfil.image}
						alt="perfil"
						className="rounded-full w-48 h-48 object-cover cursor-pointer"
						onClick={handleModal}
					/>
				</div>
				<h1 className="text-md text-blanco font-secondary uppercase font-bold">
					{perfil.name}
				</h1>
			</div>
		</div>
	);
};

export default VistaPerfil;
