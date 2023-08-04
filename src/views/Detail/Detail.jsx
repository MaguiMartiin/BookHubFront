import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { bookId, addToCart, getPuntuationId, getOpinionId } from "../../redux/actions"
import Swal from "sweetalert2"
import { useState } from "react"

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
        <div  className="max-w-screen min-h-[100vh] bg-negro ">
            <div className="flex">
                <div className="flex items-center justify-between ">
                    <img src={bookDetail.image} alt={bookDetail.name} class="w-full p-10"/>
                </div>
                <div className="flex flex-col justify-center mt-10 w-full items-center">
                    <div >
                        <h1 class="text-6xl text-white font-primary">{bookDetail.name}</h1>
                    </div>
                    <h2 class="text-4xl text-white font-primary mt-2">Autor: {bookDetail.Author?.name}</h2>
                    <h2 class="text-4xl text-white font-primary">Genero: {bookDetail.Gender?.name}</h2>
                    <div className="grid grid-cols-2 gap-6 mt-6">  
                        <div>
                            <button>Descripción</button>
                            <h3>{bookDetail.description}</h3>
                        </div>
                        <div>
                            <button>Detalle del producto</button>
                            <ul>
                                <li>Tapa blanda: 672 páginas</li>
                                <li>Idioma: Español</li>
                                <li>Dimensiones: 15.1 x 4.1 x 23 cm</li>
                                <li>Fecha de publicación: 1 de marzo de 2009</li>
                                <li>Disponible en formato físico.</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4>Precio {bookDetail.price}</h4>
                        <button onClick={addCart}>Agregar al carrito</button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <h1>Opiniones del producto</h1>
                        <div>
                            <h1>{puntuationId}</h1>
                        </div>
                        <div>
                            {opinionId?.map((e) => {
                                return(
                                    <h1>{e.comment}</h1>
                                    )
                                })}
                            <h1>{opinionId.name}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Detail