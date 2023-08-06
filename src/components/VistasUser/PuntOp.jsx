import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOpinion, getPuntuation } from "../../redux/actions"

const Opiniones = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPuntuation())
        dispatch(getOpinion())
    }, [dispatch])
    const misPuntuaciones = useSelector(state => state.puntuations)
    const misOpiniones = useSelector(state => state.opinion)
    console.log(misPuntuaciones);
    console.log(misOpiniones);

    return (
        <div className="flex flex-col items-center pt-24">
            <div>
                <h1 className="text-blanco">Opiniones</h1>
            </div>

            <div>   
                {misPuntuaciones.length > 0 ? misPuntuaciones.map((e) => {
                    return(
                        <h1>{e.comment}</h1>
                    )
                }) : null}
            </div>
        </div>
    )
}

export default Opiniones