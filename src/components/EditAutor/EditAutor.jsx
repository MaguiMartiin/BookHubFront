import React, { useState, useEffect } from "react";
import style from './EditAutor.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuthor, updateAuthor } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { EDIT_AUTHOR } from "../../redux/action-types";


const EditAutor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAuthor());
    }, [dispatch]);

    const autores = useSelector((state) => state.authors)
    console.log(autores);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedAutor, setEditedAutor] = useState("");

    const handleEditGender = (index) => {
        setEditedAutor(autores[index]);
        setEditingIndex(index);
    };


    const submitEditedGender = async (index) => {
        if (editedAutor) {
            try {
                await dispatch(updateAuthor(index, { newName: editedAutor }));
                setEditingIndex(null);
                setEditedAutor("")

                Swal.fire({
                    title: "Autor actualizado",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // navigate("/editAutor");

                    dispatch(getAuthor());
                });
            } catch (error) {
                console.error("Error al actualizar el Autor:", error);
            }
        }
    };


    // const deleteGender = async (index) => {
    //     try {
    //         const response = await axios.delete(`/author/${index}`);
    //         if (response.status === 200) {
    //             const updatedAutores = autores.filter((_, idx) => idx !== index);
    //             dispatch({ type: EDIT_AUTHOR, payload: updatedAutores });
    //         }
    //     } catch (error) {
    //         console.error("Error al eliminar el autor:", error);
    //     }
    // };


    return (
        <div className={style.editGenderContainer}>
            <div className={style.sidebar}>
            <Link to="/" className={style.titulo1}>
          BookHub
        </Link>
        <Link to="/dashboard">
          <button className={style.titulo2}>Volver</button>
        </Link>
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
            <div className={style.tableContainer}>
                <table className={style.genderTable}>
                    <thead>
                        <tr>
                            <th className={style.tableHeader}> GÉNEROS </th>
                            <th className={style.tableHeader}>EDITAR GÉNEROS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autores?.map((auth, idx) => (
                            <tr key={idx} className={style.tableRow}>
                                <td className={style.tableData}>{auth}</td>
                                <td className={`${style.tableData}`}>
                                    {editingIndex === idx ? (
                                        <div className={style.inputContainer}>
                                            <input
                                                className={style.input}
                                                type="text"
                                                value={editedAutor}
                                                onChange={(e) => setEditedAutor(e.target.value)}
                                            />
                                            <button className={style.inputButton} onClick={() => submitEditedGender(auth)}>Guardar</button>
                                        </div>
                                    ) : (
                                        <div className={style.editButtonContainer}>
                                        <button className={style.editBu} onClick={() => handleEditGender(idx)}>
                                            <FaEdit />
                                        </button>
                                        {/* <button className={style.deleteBu} onClick={() => deleteGender(auth)}>
                                            Eliminar
                                        </button> */}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={style.create}>
                    <p>Deseas crear un nuevo Autor?</p>
                    <Link to="/createAutor">   
          <button className={style.createBut}>Crear Autor</button>
                    </Link>
              
            </div>
            </div>
        </div>
    )
}

export default EditAutor