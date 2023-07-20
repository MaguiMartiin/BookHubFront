import React from 'react'
import style from './Landing.module.css'
import img from './Landing.png'
import img2 from './Landing2.png'

const Landing = () => {

    const toInicio = () => {
        window.location.href = '/inicioSesion';
    }

    return (
        <div className={style.container}>
            <div className={style.div1}>
                <h1>BookHub</h1>
                <button className={style.botonInicio} onClick={toInicio}>Inicia Sesión</button>
            </div>

            <div className={style.div2}>
                {/* <img src={img} alt="image landing" className={style.image}/> */}
                <h1 className={style.h1}>Descubre un universo de conocimiento y aventuras literarias en BookHub</h1>
                <h2 className={style.h2}>BookHub es la plataforma definitiva para los amantes de la lectura. Nuestra extensa colección de libros de diversos géneros te permitirá descubrir nuevos títulos y autores que se adapten a tus intereses y preferencias. Únete a nuestra comunidad de lectores apasionados para compartir tus reseñas y descubrimientos literarios. ¡Embárcate en un emocionante viaje de conocimiento y entretenimiento con BookHub!</h2>
                <button  className={style.botonInicio}>¡Explorá!</button>
            </div>

            <div>
                <div>
                <h1>Acceso a una amplia biblioteca de libros</h1>
                <h1>Reseñas y recomendaciones personalizadas</h1>
                <h1>Compra y venta de libros</h1>
                </div>
                <img src={img2} alt="image landing" />
            </div>

            <div>
                <h1>Testimonios y reseñas</h1>
                {/* ver lo de carru */}
            </div>

            <div>
                <div>
                    <h1>Para acceder a funciones personalizadas, no olvides...</h1>
                    <button>Iniciar Sesión</button>
                </div>
                <div>
                    <h1>Soporte</h1>
                    <li>
                        <ul>Via mail: soporte@bookhub.com</ul>
                        <ul>WhatsApp: +54123456789</ul>
                    </li>
                </div>
            </div>

        </div>
    )
}

export default Landing