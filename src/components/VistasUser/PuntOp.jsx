import React from "react"
import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOpinion } from "../../redux/actions"
import StarRating from "../../views/Detail/Starts"
import FormPuntOp from "./FromPunt"

const Opiniones = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOpinion())
    }, [dispatch])
    
    const misOpiniones = useSelector(state => state.opinion)
    const [mostrarOpiniones, setMostrarOpiniones] = useState(false)
    const [selectedButton, setSelectedButton] = useState("pendientes")
    console.log(misOpiniones);

    return (
        <div className="flex flex-col items-center pt-24">
            <div className="bg-gris w-full p-6 min-h-screen">
                <div className="flex justify-center items-center ">
                    <h1 className="text-blanco text-4xl font-primary">Opiniones</h1>
                </div>
                <div className="flex justify-start space-x-20 mt-2 w-full bg-gris border-b border-negro">
                    <button className="bg-gris text-negro text-2xl px-20 py-4 font-primary">Pendientes</button>
                    <button onClick={() => setMostrarOpiniones(!mostrarOpiniones)} className="bg-gris text-negro text-2xl px-6 py-4 font-primary">Realizadas</button>
                </div>
                <div>
                    <FormPuntOp BookId={misOpiniones.id}/>
                </div>
                {mostrarOpiniones &&misOpiniones?.length > 0 ? (
                    <div className="flex flex-col justify-center mt-2 w-full space-y-4 p-2">
                        <h1 className="ml-5 text-2xl font-secondary">Gracias por contribuir con la comunidad</h1>
                    {misOpiniones?.map((e) => {
                        return(
                            <div >
                                <div key={e.id} className="border-b border-negro text-negro grid grid-cols-4 bg-blanco p-4">
                                    <div className="p-4">
                                        <img src={e.image}  className="w-35 h-36 "/>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <h1 className="font-primary text-2xl ">{e.title}</h1>
                                    </div>
                                    <div>
                                        <h1 className="font-primary text-4xl text-gris">Puntuación</h1>
                                        {e.punctuation? <h1 className="mt-2 font-secondary text-negro text-2xl mt-4"><StarRating rating={e.punctuation} size="1.5rem"/></h1> : null}
                                    </div>
                                    <div>
                                        <h1 className="font-primary text-4xl text-gris">Comentario</h1>
                                        <h1 className="mt-2 font-secondary text-negro text-2xl mt-4">{e.comment}</h1>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                </div>
                ) : null}
            </div>
        </div>
    )
}

export default Opiniones