import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import { postAuthor, getAuthor } from "../../redux/actions";
import style from './CreateAutor.module.css'

const CreateAutor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createGender, setCreateGender] = useState("");

    const submitNewGender = async () => {
        if (createGender) {
            try {
                // const newGender = { name: createGender };
                await dispatch(postAuthor(createGender));
                setCreateGender("")


                Swal.fire({
                    title: "Autor creado",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2200
                }).then(() => {
                    dispatch(getAuthor());
                }).then(() => {
                    navigate('/editAutor')
                })
            } catch (error) {
                console.error("Error al crear el autor:", error);
            }
        }
    };


    return (
        <div className={style.editGenderContainer} >
            <div className={style.sidebar}>
                <Link to="/" className={style.titulo1}>
                    BookHub
                </Link>
                <Link to="/home">
                    <button className={style.titulo2}>Home</button>
                </Link>
                <button className={style.sidebutton} onClick={() => { navigate("/publicaciones") }}>
                    Mis publicaciones
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/form") }}>
                    Realizar una publicación
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/editUsers") }}>
                    Editar Usuarios
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/recordSale") }}>
                    Registro de Ventas
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/editGender") }}>
                    Editar o Crear Género
                </button>
                <button className={location.pathname !== "/" ? style.boton : style.sidebutton} onClick={() => { navigate("/editAutor") }} >
                    Editar o Crear Autor
                </button>
            </div>
            <div className={style.formContainer}>
                <p className={style.formTitle}>Crear Autor</p>
                <input
                    className={style.input}
                    type="text"
                    value={createGender}
                    onChange={(e) => setCreateGender(e.target.value)}
                    placeholder="Ingrese el nombre del autor"
                />
                <div className={style.backButton}>
                    <button className={style.inputButton} onClick={submitNewGender}>
                        Crear Autor
                    </button>
                    <Link to="/editAutor">
                        <button className={style.inputButton}>Volver</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default CreateAutor