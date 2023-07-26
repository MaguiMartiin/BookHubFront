import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getGenders } from '../../redux/actions'
import style from './Landing.module.css'
import img from './Landing.png'
import img2 from './Landing2.png'
import testimonio from './Testimonio.png'
import reseña from './Reseña.png'

const Landing = () => {

    const toInicio = () => {
        window.location.href = '/login';
    }

    const toHome = () => {
        window.location.href = '/home';
    }

    const dispatch = useDispatch()
    useEffect (() => {
        dispatch(getGenders())
    }, [dispatch])
    const genders = useSelector((state) => state.genders)
    console.log(genders);

    return (
        <div className={style.container}>
            <div className={style.div1}>
                <h1>BookHub</h1>
                <button className={style.botonInicio} onClick={toInicio}>Inicia Sesión</button>
            </div>

            <div className={style.div2}>
                <img src={img} alt="image landing" className={style.img1}/>
                <div className={style.h}>
                    <h1 className={style.h1}>Descubre un universo de conocimiento y aventuras literarias en BookHub</h1>
                    <h2 className={style.h2}>BookHub es la plataforma definitiva para los amantes de la lectura. Nuestra extensa colección de libros de diversos géneros te permitirá descubrir nuevos títulos y autores que se adapten a tus intereses y preferencias. Únete a nuestra comunidad de lectores apasionados para compartir tus reseñas y descubrimientos literarios. ¡Embárcate en un emocionante viaje de conocimiento y entretenimiento con BookHub!</h2>
                    <button  className={style.botonHome} onClick={toHome}>¡Explorá!</button>

                </div>
            </div>

            <div className={style.div3}>
                <div className={style.hCont}>
                <h2>En BookHub tendrás </h2>
                <h1>Acceso a una amplia biblioteca de libros</h1>
                <h1>Reseñas y recomendaciones personalizadas</h1>
                <h1>Compra y venta de libros</h1>
                </div>
                <img src={img2} alt="image landing" className={style.img2}/>
            </div>

            <div className={style.div4}>
                <h1>Categorías</h1>
                <div className={style.cat}>
                    {genders.map((cat, index) => {
                        return (
                            <button key={index} className={style.botonCat}>{cat}</button>
                        )
                    })}
                </div>
            </div>
            
            <div className={style.div5}>
                <h3>Testimonios y reseñas</h3>
                {/* ver lo de carru */}
                <div className={style.testimonio}>
                    <img src={testimonio} alt="testimonio Ana G" className={style.imgTestimonio}/>
                    <div className={style.testimonioContent}>   
                        <h1>Testimonio de Ana G.</h1>
                        <h2>
                            "BookHub es mi refugio literario. Con su amplia selección de géneros y temáticas, siempre encuentro algo que se ajusta a mi estado de ánimo. Además, vender mis libros usados y recomendar lecturas es muy gratificante. Esta app ha reavivado mi pasión por la lectura y me ha conectado con una comunidad increíble."
                        </h2>
                    </div>
                </div>
                <div className={style.testimonio}>
                    <div className={style.testimonioContent}>   
                        <h1>"La Última Noche en París" de Sarah Morgan</h1>
                        <h2>                    
                            Una emotiva historia de amor y segundas oportunidades ambientada en la hermosa ciudad de París. Sarah Morgan nos deleita con personajes entrañables y una narrativa que te atrapará desde el principio. Una lectura perfecta para los amantes del romance y los viajes. ¡No podrás dejar de leer hasta el último suspiro!
                        </h2>
                    </div>
                    <img src={reseña} alt="testimonio Ana G" className={style.imgReseña}/>
                </div>
            </div>

            <div className={style.div6}>
                <div>
                    <h1>Para acceder a funciones personalizadas, no olvides...</h1>
                    <button className={style.botonInicio2} onClick={toInicio}>Iniciar Sesión</button>
                </div>
                <div>
                    <h1>Soporte</h1>
                    <ul>
                        <li>Via mail: soporte@bookhub.com</li>
                        <li>WhatsApp: +54123456789</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Landing