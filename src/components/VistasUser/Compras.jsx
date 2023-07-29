import React from "react"
import axios from "axios"

const Compras = () => {

    const compra = async () => {

        try {
            const compras = await axios.get("/perfil/myBooks")
        } catch (error) {
            
        }
    }

    return ( 
        <div className="flex flex-col my-10">
            <div className="mb-5 text-center">
                <h1 className="text-3xl text-customColor4 font-bold">
                    Compras realizadas
                </h1>
            </div>
        </div>
    )
}

export default Compras