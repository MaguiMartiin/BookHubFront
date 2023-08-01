import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { bookId, addToCart, getPuntuationId, getOpinionId } from "../../redux/actions"
import style from './Detail.module.css'
import Swal from "sweetalert2"
import { useState } from "react"
import axios from 'axios'

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
    console.log(opinionId);

    const addPuntuation = async() => {
        try {
            await axios.post("/punctuation/")
        } catch (error) {
            
        }
    }

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
        <div className={style.contain}>
            <img src={bookDetail.image} alt={bookDetail.name} className={style.img}/>
            <div className={style.info}>
                <div className={style.titleContainer}>
                    <h1 className={style.h1}>{bookDetail.name}</h1>
                </div>
                <h2>Autor: {bookDetail.Author?.name}</h2>
                <h2>Genero: {bookDetail.Gender?.name}</h2>
                <div className={style.info2}>  
                    <div className={style.description}>
                        <button>Descripción</button>
                        <h3>{bookDetail.description}</h3>
                    </div>
                    <div className={style.detail}>
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
                <div className={style.info3}>
                    <h4>Precio {bookDetail.price}</h4>
                    <button onClick={addCart}>Agregar al carrito</button>
                </div>

                <div>
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
    )

}


export default Detail