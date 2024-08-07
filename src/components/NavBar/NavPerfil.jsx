import React, { useEffect, useState } from "react";
import profile from "../../assets/profile/usuario.png";
import { getPerfil } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {BiSolidDownArrow} from 'react-icons/bi'

const NavPerfil = ({ handleModal }) => {
	const dispatch = useDispatch();
	const perfil = useSelector((state) => state.perfil);
	useEffect(() => {
		dispatch(getPerfil());
	}, []);


	return (
		<div className="realtive m-0">
			<div className="flex flex-col justify-center items-center rounded-lg p-2 px-8">
				<div className="flex gap-3 justify-center  items-center rounded-full w-10 h-10 ">
					<img
						src={perfil.image === null ? profile : perfil.image}
						alt="perfil"
						className="rounded-full w-10 h-10 object-cover cursor-pointer"
						onClick={handleModal}
					/>
					<div className="mb-6">
						<BiSolidDownArrow size={12}  />
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavPerfil;
