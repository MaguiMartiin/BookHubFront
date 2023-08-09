import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { bookId, addToCart, getPuntuationId, getOpinionId } from "../../redux/actions"
import Swal from "sweetalert2"
import { useState } from "react"
import StarRating from "./Starts"
import {MdAddShoppingCart} from "react-icons/md"
const Detail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    
    const bookDetail = useSelector(state => state.bookId);
    const cart = useSelector((state) => state.cart);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userIsLoggedIn = !!token;
        setIsLoggedIn(userIsLoggedIn);
      }, []);
    
    useEffect(() => {
        dispatch(bookId(id))
        dispatch(getPuntuationId(id))
        dispatch(getOpinionId(id))
    }, [dispatch, id]) 

    const puntuationId = useSelector(state => state.puntuationId)
    const opinionId = useSelector(state => state.opinionId)

    const addCart = () => {
          const isBookInCart = cart.find((item) => item.id === bookDetail.id);
          if (isBookInCart) {
            Swal.fire({
              title: "El producto ya está en el carrito",
              icon: "warning",
            });
          } else {
            dispatch(addToCart(bookDetail));
            Swal.fire({
              title: "Producto agregado",
              icon: "success",
            });
    
            const updatedCart = [...cart, bookDetail];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          }
        }

    return (
			<div className="max-w-screen min-h-[100vh] bg-negro pt-24">
				<div className="grid grid-cols-3  gap-4 xl:w-100vw">
					<div className="w-full p-10">
						<img src={bookDetail.image} alt={bookDetail.name} className="" />
						<div className="flex items-center gap-2 justify-between mt-2">
							<h2 className="text-2xl text-white font-secondary">
								Autor: {bookDetail.Author?.name}
							</h2>
							<h2 className="text-2xl text-white font-secondary">
								Genero: {bookDetail.Gender?.name}
							</h2>
						</div>
					</div>
					<div className="col-span-2 m-8">
						<div className="mb-5">
							<h1 className="text-6xl text-white font-primary">
								{bookDetail.name}
							</h1>
						</div>

						<div className=" ">
							<div className="mb-5">
								<button className="bg-gris p-3 font-primary text-white text-xl">
									Descripción
								</button>
								<h3 className="text-white font-secondary mt-4 text-xl">
									{bookDetail.description}
								</h3>
							</div>
							<div>
								<button className="bg-gris p-3 font-primary text-white text-xl">
									Detalle del producto
								</button>
								<ul className="text-white font-secondary mt-4 text-xl">
									<li>Tapa blanda: {Number(bookDetail.pages)} páginas</li>
									<li>Idioma: {bookDetail.language}</li>
									{/* <li>Dimensiones: 15.1 x 4.1 x 23 cm</li> */}
									<li>Fecha de publicación: {bookDetail.releaseDate}</li>
									{/* <li>Disponible en formato físico.</li> */}
								</ul>
							</div>
						</div>
						<div className="flex justify-between">
							<h4 className="flex items-center bg-rojo p-3 text-white text-2xl mt-6 rounded-lg font-primary">
								Precio ${bookDetail.price}
							</h4>
							<button
								onClick={addCart}
								className="flex items-center bg-rojo p-5 text-white text-2xl mt-6 rounded-lg font-primary">
								<MdAddShoppingCart   />
								<span className="pl-2">Agregar al carrito</span>
							</button>
						</div>
					</div>
				</div>

				{opinionId?.length > 0 ? (
					<div className="flex bg-blanco mt-10">
						<div className="flex justify-between p-10">
							<h1 class="font-primary text-negro text-9xl ml-5 mr-2">
								{puntuationId}
							</h1>
							<StarRating rating={puntuationId} size="3rem" />
						</div>
						<div className="flex flex-col justify-center mt-10 w-full space-y-4">
							<h1 className="font-primary text-negro text-4xl text-center">
								Opiniones del producto
							</h1>
							{opinionId?.map((e) => {
								return (
									<div className="pb-5 border-b border-negro p-2">
										<h1>{e.name}</h1>
										<StarRating rating={e.punctuation} />
										<h1 className="mt-2">{e.comment}</h1>
									</div>
								);
							})}
						</div>
					</div>
				) : null}
			</div>
		);

}


export default Detail