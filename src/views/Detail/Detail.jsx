import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { bookId, addToCart, getPuntuationId, getOpinionId, bookDelete } from "../../redux/actions"
import Swal from "sweetalert2"
import { useState } from "react"
import StarRating from "./Starts"
import {MdAddShoppingCart} from "react-icons/md"
import { Link } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"
import Footer from "../../components/Footer/Footer"
import Loading from '../../components/Loading/Loading'

const Detail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    
    const bookDetail = useSelector(state => state.bookId);
    const cart = useSelector((state) => state.cart);
	const isAdmins = localStorage.getItem("isAdmin") === "true";

    const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
	const navigate = useNavigate()
	const handleDelete = (id) => {
		dispatch(bookDelete(id))
		.then(() => {
			Swal.fire({
			  icon: "success",
			  title: "Libro eliminado!",
			  text: "El libro ha sido eliminado exitosamente.",
			  confirmButtonText: "Aceptar",
			}).then(() => {
			  navigate("/home")
			})
		  })
		.catch((error) => {console.error("Error al eliminar el libro:", error)})
	};

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userIsLoggedIn = !!token;
        setIsLoggedIn(userIsLoggedIn);
      }, []);
    
    useEffect(() => {
        setLoading(true);
        dispatch(bookId(id))
            .then(() => dispatch(getPuntuationId(id)))
            .then(() => dispatch(getOpinionId(id)))
            .finally(() => setLoading(false));
			 window.scrollTo(0, 0);
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

	if(loading){
		return (
			<div className="flex items-center justify-center h-[50rem]">
				<Loading />
			</div>
		)
	}

    return (
			<div className="max-w-screen min-h-[100vh] bg-negro pt-20 ">
				<div className="flex w-full xl:w-100vw p-10 h-[40rem]">
					<div className="w-1/2 p-10">
						<div className="flex items-center justify-between">
							{isAdmins && <Link to={`/editar/${bookDetail.id}`}>
								<button className="flex items-center mt-4 text-blanco text-xl"> Editar <FaEdit className="ml-1" />
								</button>
							</Link>}
							{isAdmins &&<button className="flex items-center text-blanco mt-4 text-xl" onClick={() => handleDelete(bookDetail.id)}> Eliminar <FaTrash className="ml-1 text-blanco" />
							</button>}
						</div>
						<div className="flex justify-center">
							<img src={bookDetail.image} alt={bookDetail.name} className=" w-[15rem] h-[23rem] object-cover" />
						</div>
						<div className="flex flex-col pt-5  ">
							<div className="flex flex-col items-center">

								<h2 className="text-2xl text-white font-secondary">
									Autor: {bookDetail.Author?.name}
								</h2>
								<h2 className="text-2xl text-white font-secondary">
									Genero: {bookDetail.Gender?.name}
								</h2>
							</div>
						</div>
					</div>
					<div className="col-span-2 m-8 w-1/2">
						<div className="mb-5">
							<h1 className="text-5xl text-white font-primary">
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
							<h4 className="flex items-center bg-rojo p-[1rem] text-white text-xl mt-6 rounded-lg font-primary">
								Precio ${bookDetail.price}
							</h4>
							<button
								onClick={addCart}
								className="flex items-center bg-rojo p-[1rem] text-white text-xl mt-6 rounded-lg font-primary">
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
				<div>
					<Footer/>
				</div>
			</div>
		);

}


export default Detail