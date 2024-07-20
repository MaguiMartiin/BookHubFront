import style from "./SearchBar.module.css";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	filter,
	getAllBooks,
	getAuthor,
	getGenders,
	getPerfil
} from "../../redux/actions";

import { useLocation } from "react-router-dom";

import {BiReset} from "react-icons/bi";

const SearchBar = ({ setPage }) => {
	const dispatch = useDispatch();

	const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const genreParam = queryParams.get("genre");

	useEffect(() => {
        if (genreParam) {
            dispatch(filter({ gender: "gender", dataGender: genreParam }));
        } else {
            dispatch(getAllBooks());
        }
        setPage(1);
    }, [dispatch, genreParam]);




	const [filtro, setFiltro] = useState({
		gender: "",
		dataGender: "",
		author: "",
		dataAuthor: "",
		price: "",
		dataPrice: [{ minimo: "", maximo: "" }],
		releaseDate: "",
		dataReleateDate: [],
		search: "",
		dataSearch: "",
		fecha: "",
	});
	const genders = useSelector((state) => state.genders);
	const authors = useSelector((state) => state.authors);
	const handleName = (e) => {
		const { value } = e.target;
		setFiltro({
			...filtro,
			search: "search",
			dataSearch: value,
		});
		setPage(1);
	};
	useEffect(() => {
		dispatch(filter(filtro));
	}, [filtro]);

	useEffect(() => {
		dispatch(getGenders());
		dispatch(getAuthor());
		dispatch(getPerfil());
	}, [dispatch]);

	const decades = [];
	for (let startYear = 1950; startYear <= 2019; startYear += 10) {
		const endYear = startYear + 9;
		const decade = `${startYear}-${endYear}`;
		decades.push(decade);
	}

	const handleChange1 = (event) => {
		const { value } = event.target;
		const startYear = parseInt(value);
		const endYear = startYear + 9;
		const startDate = `${startYear}-01-01`;
		const endDate = `${endYear}-12-31`;
		setFiltro({
			...filtro,
			releaseDate: "releaseDate",
			dataReleateDate: [startDate, endDate],
			fecha: `${startYear}`,
		});
		setPage(1);
	};

	//genero
	const selectGender = (event) => {
		const { value } = event.target;
		setFiltro({
			...filtro,
			gender: "gender",
			dataGender: value,
		});
		setPage(1);
	};

	//autor
	const selectAuthor = (event) => {
		const { value } = event.target;
		setFiltro({
			...filtro,
			author: "author",
			dataAuthor: value,
		});
		setPage(1);
	};

	//precio minimo
	const handleMinimo = (event) => {
		const { value } = event.target;
		setFiltro({
			...filtro,
			price: "price",
			dataPrice: [
				{
					...filtro.dataPrice[0],
					minimo: value,
					maximo: filtro.dataPrice[0].maximo,
				},
			],
		});
		setPage(1);
	};

	//precio maximo
	const handleMaximo = (event) => {
		const { value } = event.target;
		setFiltro({
			...filtro,
			price: "price",
			dataPrice: [
				{
					...filtro.dataPrice[0],
					minimo: filtro.dataPrice[0].minimo,
					maximo: value,
				},
			],
		});
		setPage(1);
	};

	useEffect(() => {
		dispatch(filter(filtro));
	}, [filtro, dispatch]);

	const reset = () => {
		dispatch(getAllBooks());
		setFiltro({
			gender: "",
			dataGender: "",
			author: "",
			dataAuthor: "",
			price: "",
			dataPrice: [{ minimo: "", maximo: "" }],
			releaseDate: "",
			dataReleateDate: [],
			search: "",
			dataSearch: "",
			fecha: "",
		});
		setPage(1);
	};



	return (
		<div className="flex justify-between w-full p-4 ">
			<div className=" flex w-1/2 space-x-3 mt-4">
				<select
					onChange={handleChange1}
					value={filtro.fecha}
					className="block w-full text-xl bg-gris text-blanco border-b border-gris font-secondary font-bold rounded-md shadow-sm cursor-pointer h-12 overflow-auto">
					{" "}
					<option value="all">Año</option>
					{decades.map((decade, i) => (
						<option key={i} value={decade.split("-")[0]}>
							{decade}
						</option>
					))}
				</select>
				<select
					value={filtro.dataAuthor}
					onChange={selectAuthor}
					className="block w-full text-xl bg-gris text-blanco border-b border-gris font-secondary font-bold rounded-md shadow-sm cursor-pointer h-12 overflow-auto">
					<option value="all">Autor</option>
					{authors?.map((e, i) => (
						<option key={i} value={e}>
							{e}
						</option>
					))}
				</select>
				<select
					value={filtro.dataGender}
					onChange={selectGender}
					className="block w-full text-xl bg-gris text-blanco border-b border-gris font-secondary font-bold rounded-md shadow-sm cursor-pointer h-12 overflow-auto">
					<option value="all">Género</option>
					{genders?.map((gender, idx) => (
						<option key={idx} value={gender}>
							{gender}
						</option>
					))}
				</select>
				<input
					type="number"
					min="1"
					value={filtro.dataPrice[0].minimo}
					placeholder="Mínimo"
					className="block w-full text-xl bg-gris text-blanco border-b border-gris font-secondary font-bold rounded-md shadow-sm cursor-pointer h-12 overflow-auto"
					onChange={handleMinimo}
				/>
				<input
					type="number"
					min="1"
					className="block w-full text-xl bg-gris text-blanco border-b border-gris font-secondary font-bold rounded-md shadow-sm cursor-pointer h-12 overflow-auto"
					value={filtro.dataPrice[0].maximo}
					placeholder="Máximo"
					onChange={handleMaximo}
				/>
			</div>

			<form className="flex w-1/3">
				<input
					value={filtro.dataSearch}
					onChange={handleName}
					className="block w-full mx-4 py-2 border-b pl-2 bg-gris text-blanco  border-gris focus:border-rojo hover:border-rojo font-secondary font-bold text-[1.3rem]  rounded-md shadow-sm focus:outline-none  mt-4 cursor-pointer h-12" // Modifica el valor "h-12" según el tamaño deseado
					// className={style.searchBarInput}
					placeholder="Buscar libros..."
				/>

				<button
					onClick={reset}
					className="block w-52 bg-rojo text-lg text-blanco  px-4 py-2 border border-gray-400 font-secondary font-bold rounded-md shadow-sm focus:outline-non  focus:border-red-500 mt-4 h-12">
					{/* <BiReset>Reset</BiReset> */}
					Reset
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
