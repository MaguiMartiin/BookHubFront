import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { bookId, bookDelete, addToCart } from "../../redux/actions"
import style from './Detail.module.css'
import Swal from "sweetalert2"
import { useState } from "react"

const Detail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    
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
    }, [dispatch, id]) 

    const addCart = () => {

        if (!isLoggedIn) {
          Swal.fire({
            title: "Debes iniciar sesión para agregar productos al carrito",
            icon: "warning",
          });
        } else {
          const isBookInCart = cart.find((item) => item.id === bookDetail.id);
          if (isBookInCart) {
            Swal.fire({
              title: "The product is already in the cart",
              icon: "warning",
            });
          } else {
            dispatch(addToCart(bookDetail));
            Swal.fire({
              title: "Item added",
              icon: "success",
            });
    
            const updatedCart = [...cart, bookDetail];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
          }
        }
      };

    return (
        <div className={style.contain}>
            <img src={bookDetail.image} alt={bookDetail.name} className={style.img}/>
            <div className={style.info}>
                <div className={style.titleContainer}>
                    <h1 className={style.h1}>{bookDetail.name}</h1>
                    {/* <Link to={`/editar/${bookDetail.id}`} className={style.iconoEditar}>
                        <FaEdit />
                    </Link>
                    <button className={style.iconoEditar} onClick={handleDelete}>
                    <FaTrash />
                    </button> */}
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
            </div>
        </div>
    )

}


export default Detail