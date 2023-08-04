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
                <div className="flex items-center justify-between">
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
                            <button className="bg-gris p-5 font-primary text-white text-xl">Descripción</button>
                            <h3 class="text-white font-secondary mt-4 text-xl">{bookDetail.description}</h3>
                        </div>
                        <div>
                            <button className="bg-gris p-5 font-primary text-white text-xl">Detalle del producto</button>
                            <ul class="text-white font-secondary mt-4 text-xl">
                                <li>Tapa blanda: 672 páginas</li>
                                <li>Idioma: Español</li>
                                <li>Dimensiones: 15.1 x 4.1 x 23 cm</li>
                                <li>Fecha de publicación: 1 de marzo de 2009</li>
                                <li>Disponible en formato físico.</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h4 className="flex-none bg-rojo p-3 text-white text-2xl mt-6 rounded-lg font-primary">Precio ${bookDetail.price}</h4>
                        <button onClick={addCart} className="flex-none bg-rojo p-5 text-white text-2xl mt-6 rounded-lg font-primary">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            <div className="flex bg-blanco mt-10">
                    <div className="flex justify-between p-10">
                        <h1 class="font-primary text-negro text-9xl ml-20">{puntuationId}</h1>
                    </div>    
                    <div className="flex flex-col justify-center mt-8 w-full items-center space-y-6">
                        <h1 class="font-primary text-negro text-4xl ">Opiniones del producto</h1>
                        {opinionId?.map((e) => {
                            return(
                                <div className="pb-5 border-b border-negro">
                                    <h1>{e.comment}</h1>
                                </div>
                                )
                        })}
                    </div>
            </div>
                
            
        </div>
    )

}


export default Detail