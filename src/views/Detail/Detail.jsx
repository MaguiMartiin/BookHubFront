import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { bookId } from "../../redux/actions"
import style from './Detail.module.css'
import { Link } from "react-router-dom"
import { FaEdit } from 'react-icons/fa';

const Detail = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        dispatch(bookId(id))
    }, [dispatch, id]) 

    const bookDetail = useSelector(state => state.bookId)

    return (
        <div className={style.contain}>
            <img src={bookDetail.image} alt={bookDetail.name} className={style.img}/>
            <div className={style.info}>
                <div className={style.titleContainer}>
                    <h1 className={style.h1}>{bookDetail.name}</h1>
                    <Link to={`/editar/${bookDetail.id}`} className={style.iconoEditar}>
                        <FaEdit />
                    </Link>
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
                    <button>Agregar al carrito</button>
                </div>
            </div>
        </div>
    )

}


export default Detail