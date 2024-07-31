import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, addToCart, refreshCart, filter, getPerfil } from "../../redux/actions";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "../../components/Footer/Footer";
import Image from "./Image";
import style from "./Home.module.css";
import Loading from "../../components/Loading/Loading"; 
import { FaBookDead } from "react-icons/fa";

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const genreParam = queryParams.get("genre");

    const [loading, setLoading] = useState(true); 
    const [page, setPage] = useState(1);
    const [perPage] = useState(12);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            dispatch(getPerfil());
            if (genreParam) {
                await dispatch(filter({ gender: "gender", dataGender: genreParam }));
            } else {
                await dispatch(getAllBooks());
            }
            setLoading(false);
            setPage(1);
        };
        fetchData();
    }, [dispatch, genreParam]);

    const copyState = useSelector((state) => state.copyState);

    useEffect(() => {
        const fetchCompras = async () => {
            const compra_id = localStorage.getItem("compra_id");
            const { send } = (await axios.get(`/compras/${compra_id}`)).data;
            if (send === true) {
                localStorage.removeItem("compra_id");
                localStorage.removeItem("cart");
                dispatch(addToCart());
                dispatch(refreshCart());
            }
        };

        fetchCompras();
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
                <Image />
            </div>

            <header className="">
                <SearchBar setPage={setPage} setLoading={setLoading} />
            </header>

            <div className="max-w-screen-2xl px-40 mt-4">
                {loading ? (
                    <Loading /> 
                ) : currentData?.length > 0 ? (
                    <div className="grid grid-flow-row gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-4 uppercase">
                        {currentData.map((book, idx) => (
                            <div key={idx} className={style.card}>
                                <Card book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
					<div className="flex flex-col justify-center items-center text-2xl font-bold text-white p-[2rem] space-y-5 h-[20rem]">
                        <div className="text-6xl space-x-4 flex text-center">
							<FaBookDead />
							<h1> ¡Lo sentimos! </h1>
						</div>
                        <h2>
                            No pudimos encontrar ningún libro que coincida con tu búsqueda.
                        </h2>
                    </div>
                )}
            </div>
            <div className="flex justify-center mb-8">
				{!loading && currentData?.length > 0 && (
					<div className="flex justify-center mb-8">
						<Pagination page={page} setPage={setPage} perPage={perPage} max={max} />
					</div>
				)}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
