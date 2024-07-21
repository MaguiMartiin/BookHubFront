import React from "react"

const Footer = () => {
    return (
        <footer>
            <div className="text-white bg-gris p-5 text-center text-base">
                <div class="flex flex-col justify-center">
                    <h4 className="text-xl font-primary">BookHub</h4>
                    <p>Tu sitio favorito para encontrar y comprar libros.</p>
                </div>
                <div className="flex space-x-48 justify-center p-4">
                    <div className="flex-col text-left">
                        <h4>Contacto</h4>
                        <p>Email: contacto@bookhub.com</p>
                        <p>Teléfono: +123 456 7890</p>
                    </div>
                    <div className="flex-col text-right ">
                        <ul>
                            <li><a href="/home">Inicio</a></li>
                            <li><a href="/carrito">Carrito</a></li>
                            <li><a href="/nosotros">Sobre Nosotros</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-5">
                    <p>&copy; 2024 BookHub. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer