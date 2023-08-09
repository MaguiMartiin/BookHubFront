import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import style from './CreateGender.module.css'
import { useState } from "react";
import { postGender, getGenders } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const CreateGender = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createGender, setCreateGender] = useState("");

    const submitNewGender = async () => {
        if (createGender) {
            try {
                // const newGender = { name: createGender };
                await dispatch(postGender(createGender));
                setCreateGender("")


                Swal.fire({
                    title: "Género creado",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2200
                }).then(() => {
                    dispatch(getGenders());
                }).then(() => {
                    navigate('/editGender')
                })
            } catch (error) {
                console.error("Error al crear el género:", error);
            }
        }
    };


    return (
        <div className={style.editGenderContainer} >
            <div className={style.sidebar}>
                <Link to="/" className={style.titulo1}>
                    BookHub
                </Link>
                <Link to="/home" className={style.sidebutton}>
                   <button className={style.titulo3}>Inicio</button>
                </Link>
                <button className={style.sidebutton} onClick={() => { navigate("/publicaciones") }}>
                    Mis publicaciones
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/form") }}>
                    Realizar una publicación
                </button>
                
                <button className={location.pathname !== "/" ? style.boton : style.sidebutton} onClick={() => { navigate("/editGender") }}>
                    Editar o Crear Género
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/editAutor") }}>
                    Editar o Crear Autor
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/editUsers") }}>
                    Editar Usuarios
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/recordSale") }}>
                    Registro de Ventas
                </button>
            </div>
            <div className={style.formContainer}>
                <p className={style.formTitle}>Crear Género</p>
                <input
                    className={style.input}
                    type="text"
                    value={createGender}
                    onChange={(e) => setCreateGender(e.target.value)}
                    placeholder="Ingrese el nombre del género"
                />
                <div className={style.backButton}>
                    <button className={style.inputButton} onClick={submitNewGender}>
                        Crear Género
                    </button>
                    <Link to="/editGender">
                        <button className={style.inputButton}>Volver</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default CreateGender;






