import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicId } from "../../redux/actions";

const Ventas = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(publicId())
    }, [dispatch])

    const publicciones = useSelector(state => state.bookPublic)
    console.log(publicciones);
    return(
        <div className="flex flex-col my-10">
            <div className="mb-5 text-center">
                <h1 className="text-3xl text-customColor4 font-bold">Mis publicaciones</h1>
            </div>
        </div>
    )

}

export default Ventas