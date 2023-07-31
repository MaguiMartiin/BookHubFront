import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import React from "react";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks,addToCart,refreshCart } from "../../redux/actions";
import axios from "axios";


const Home = () => {


	const dispatch = useDispatch();

	const copyState = useSelector((state) => state.copyState);

  // agregando:

		const cart = useSelector((state) => state.cart);

	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(6);

useEffect(() => {

	const compra_id = localStorage.getItem("compra_id");

  
	const getAllcompras = async () => {
		const { send } = (await axios.get(`/compras/${compra_id}`)).data;
		console.log(send);
		if (send === true) {
			console.log(send, "send");
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
		<div className={style.booksContainer}>
			<header className={style.searchContainer}>
				<SearchBar setPage={setPage} />
			</header>

			<div className={style.cardContainer}>
				<div className={style.row}>
					{currentData?.slice(0, 3).map((book, idx) => (
						<div key={idx} className={style.card}>
							<Card book={book} />
						</div>
					))}
				</div>
				<div className={style.row}>
					{currentData?.slice(3, 6).map((book, idx) => (
						<div key={idx} className={style.card}>
							<Card book={book} />
						</div>
					))}
				</div>
			</div>
			<Pagination page={page} setPage={setPage} perPage={perPage} max={max} />
		</div>
	);
};

export default Home;
