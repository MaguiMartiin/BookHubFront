import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Card from "../../components/Card/Card";
import Pagination from "../../components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, addToCart, refreshCart } from "../../redux/actions";
import axios from "axios";
import style from "./DashboardAdmin.module.css"

const DashboardAdmin = () => {

    const dispatch = useDispatch();

    const copyState = useSelector((state) => state.copyState);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(6);

    useEffect(() => {
        const compra_id = localStorage.getItem("compra_id");

        const getAllcompras = async () => {
            const { send } = (await axios.get(`/compras/${compra_id}`)).data;
            console.log(send);
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
        <div>

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
            </div>
            <div className="flex justify-center">
                <Pagination page={page} setPage={setPage} perPage={perPage} max={max} />
            </div>
        </div>
    );
};


export default DashboardAdmin;