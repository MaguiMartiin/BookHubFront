import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getPerfil,
	getPerfilMyBooks,
	getPerfilMyBuys,
	getAllPurchases,
} from "../../redux/actions";
import MyBooks from "./perfil/MyBooks";
import MyBuys from "./perfil/MyBuys";

import profile from "../../assets/profile/usuario.png";
import fondo from "../../assets/books.jpg";
const Perfil = () => {
	const dispatch = useDispatch();
	const perfil = useSelector((state) => state.perfil);
	const books = useSelector((state) => state.perfilMyBooks);
	const buys = useSelector((state) => state.perfilMyBuys);
  console.log(buys);

	useEffect(() => {
		dispatch(getPerfil());
    dispatch(getPerfilMyBooks());
		// dispatch(getAllPurchases());
		dispatch(getPerfilMyBuys());
	}, []);

	return (
		<div className="text-white w-full h-full border border-red-400 pt-24">
			<div className="">
				<div className="flex flex-col justify-center  items-center rounded-full w-48 h-48 bg-white">
          {
            perfil.image === null ? (
              <img src={profile} alt="perfil" className="rounded-full w-40 h-40 object-cover" />
            ): (
              <img src={perfil.image} alt="perfil" className="rounded-full w-48 h-48 object-cover" />
            )
          }
				
				</div>
				<h1 className="text-xl mt-4">{perfil.name}</h1>

				<div>
					<MyBooks books={books} />
				</div>
				<div>
					<MyBuys buys={buys} />
				</div>
			</div>
		</div>
	);
};

export default Perfil;
