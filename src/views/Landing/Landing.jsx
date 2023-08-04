import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getGenders } from '../../redux/actions'
import img from './Landing.png'
import img2 from './Landing2.png'
import testimonio from './Testimonio.png'
import reseña from './Reseña.png'
import Carousel from './Carrusel'

const Landing = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toInicio = () => {
      window.location.href = "/login";
    };
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      const userIsLoggedIn = !!token;
      setIsLoggedIn(userIsLoggedIn);
    }, []);

    const toHome = () => {
        window.location.href = '/home';
    }

    const dispatch = useDispatch()
    useEffect (() => {
        dispatch(getGenders())
    }, [dispatch])
    const genders = useSelector((state) => state.genders)

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const userIsLoggedIn = !!token;
        setIsLoggedIn(userIsLoggedIn);
      }, []);


      const redirectToHomeWithGenre = (genre) => {
        const url = `/home?genre=${encodeURIComponent(genre)}`;
        window.location.href = url; 
    };
    

    return (
        <div className="max-w-screen min-h-[100vh] bg-negro">
            <div class="w-full flex items-center justify-between p-6">
                <h1 class="text-6xl text-white font-primary">BookHub</h1>
                {!isLoggedIn && <button onClick={toInicio} class="bg-gris text-white text-xl px-6 py-4 rounded-lg font-primary">Inicia Sesión</button>}
            </div>

            <div className="flex items-center justify-between">
                <img src={img} alt="image landing" class="w-1/6"/>
                <div className="flex flex-col justify-center p-6 w-full items-center">
                    <h1 class="font-secondary text-white text-7xl">Descubre un universo de conocimiento y aventuras literarias en BookHub</h1>
                    <h2 class="font-tertiary text-white text-4xl mt-6">BookHub es la plataforma definitiva para los amantes de la lectura. Nuestra extensa colección de libros de diversos géneros te permitirá descubrir nuevos títulos y autores que se adapten a tus intereses y preferencias. Únete a nuestra comunidad de lectores apasionados para compartir tus reseñas y descubrimientos literarios. ¡Embárcate en un emocionante viaje de conocimiento y entretenimiento con BookHub!</h2>
                    <button onClick={toHome} class="bg-gris text-white text-2xl px-6 py-4 rounded-lg font-primary">¡Explorá!</button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex flex-col justify-center p-6 w-full items-center">
                <h1 class="font-primary text-white text-7xl">En BookHub tendrás </h1>
                <h2 class="font-tertiary text-white text-4xl mt-6">Acceso a una amplia biblioteca de libros</h2>
                <h2 class="font-tertiary text-white text-4xl mt-6">Reseñas y recomendaciones personalizadas</h2>
                <h2 class="font-tertiary text-white text-4xl mt-6">Compra y venta de libros</h2>
                </div>
                <img src={img2} alt="image landing"  class="w-1/6"/>
            </div>

            <div className="flex flex-col justify-center p-6 w-full items-center">
                <h1 class="font-primary text-white text-7xl">Categorías</h1>
                <div className="space-x-4">
                    {genders.map((cat, index) => {
                        return (
                            <button onClick={() => redirectToHomeWithGenre(cat)} key={index} class=" mt-4 bg-celsete text-white text-4xl px-6 py-4 rounded-lg font-tertiary mb-2 ">{cat}</button>
                        )
                    })}
                </div>
            </div>
            
            <div>
                <Carousel/>
                <h3>Testimonios y reseñas</h3>
                <div>
                    <img src={testimonio} alt="testimonio Ana G"/>
                    <div>   
                        <h1>Testimonio de Ana G.</h1>
                        <h2>
                            "BookHub es mi refugio literario. Con su amplia selección de géneros y temáticas, siempre encuentro algo que se ajusta a mi estado de ánimo. Además, vender mis libros usados y recomendar lecturas es muy gratificante. Esta app ha reavivado mi pasión por la lectura y me ha conectado con una comunidad increíble."
                        </h2>
                    </div>
                </div>
                <div>
                    <div>   
                        <h1>"La Última Noche en París" de Sarah Morgan</h1>
                        <h2>                    
                            Una emotiva historia de amor y segundas oportunidades ambientada en la hermosa ciudad de París. Sarah Morgan nos deleita con personajes entrañables y una narrativa que te atrapará desde el principio. Una lectura perfecta para los amantes del romance y los viajes. ¡No podrás dejar de leer hasta el último suspiro!
                        </h2>
                    </div>
                    <img src={reseña} alt="testimonio Ana G"/>
                </div>
            </div>

            <div>
                <div>
                    <h1>Para acceder a funciones personalizadas, no olvides...</h1>
                    <button onClick={toInicio}>Iniciar Sesión</button>
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