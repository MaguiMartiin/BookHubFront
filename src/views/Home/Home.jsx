import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import React from "react";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, addToCart, refreshCart } from "../../redux/actions";
import axios from "axios";
import Image from "./Image";
import { useLocation } from "react-router-dom";
import { filter } from "../../redux/actions";

const Home = () => {
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

	const copyState = useSelector((state) => state.copyState);

	// agregando:

	const cart = useSelector((state) => state.cart);

	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(6);

	useEffect(() => {
		const compra_id = localStorage.getItem("compra_id");

		const getAllcompras = async () => {
			const { send } = (await axios.get(`/compras/${compra_id}`)).data;
			//console.log(send);
			if (send === true) {
				localStorage.removeItem("compra_id");
				localStorage.removeItem("cart");
				dispatch(addToCart());
				dispatch(refreshCart());
			}
		};

		getAllcompras();
		dispatch(getAllBooks());
		setPage(1);
	}, [dispatch]);

	const idxLast = page * perPage;
	const idxFirst = idxLast - perPage;
	const currentData = copyState?.slice(idxFirst, idxLast);
	const max = Math.ceil(copyState?.length / perPage);

	return (
		<div className="flex flex-col ">
			<div>
				<Image/>
			</div>
			
			<header className="">
				<SearchBar setPage={setPage} />
			</header>

			<div className="max-w-screen-2xl h-[670px] px-40 mt-4 xl:h-[690]">
				<div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4 uppercase  ">
					{currentData?.slice(0, 3).map((book, idx) => (
						<div key={idx} className={style.card}>
							<Card book={book} />
						</div>
					))}
				</div>
				<div className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{currentData?.slice(3, 6).map((book, idx) => (
						<div key={idx} className={style.card}>
							<Card book={book} />
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-center">
				<Pagination page={page} setPage={setPage} perPage={perPage} max={max} />
			</div>
		</div>
	);
};

export default Home;
