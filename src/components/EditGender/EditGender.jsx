import React, { useState, useEffect } from "react";
import style from './EditGender.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGenders, updateGender } from "../../redux/actions"
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { EDIT_GENDERS } from "../../redux/action-types";
import Swal from "sweetalert2";

const EditGender = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenders());
    }, [dispatch]);

    const genders = useSelector((state) => state.genders);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedGender, setEditedGender] = useState("");


    const handleEditGender = (index) => {
        setEditedGender(genders[index]);
        setEditingIndex(index);
    };




    const submitEditedGender = async (index) => {
        if (editedGender) {
            try {
                await dispatch(updateGender(index, { newName: editedGender }));
                setEditingIndex(null);
                setEditedGender("")

                Swal.fire({
                    title: "Género actualizado",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate("/editGender");
                    dispatch(getGenders());
                });
            } catch (error) {
                console.error("Error al actualizar el género:", error);
            }
        }
    };





    // const deleteGender = async (index) => {
    //     try {
    //         const response = await axios.delete(`/gender/${index}`);
    //         if (response.status === 200) {
    //             const updatedGenders = genders.filter((_, idx) => idx !== index);
    //             dispatch({ type: EDIT_GENDERS, payload: updatedGenders });
    //         }
    //     } catch (error) {
    //         console.error("Error al eliminar el género:", error);
    //     }
    // };

    return (
        <div className={style.editGenderContainer}>
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
                <button className={location.pathname !== "/" ? style.boton : style.sidebutton} onClick={() => { navigate("/editGender") }}>
                    Editar Género
                </button>
                <button className={style.sidebutton} onClick={() => { navigate("/editAutor") }}>
                    Editar Autor
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
                        {genders?.map((gender, idx) => (
                            <tr key={idx} className={style.tableRow}>
                                <td className={style.tableData}>{gender}</td>
                                <td className={`${style.tableData}`}>
                                    {editingIndex === idx ? (
                                        <div className={style.inputContainer}>
                                            <input
                                                className={style.input}
                                                type="text"
                                                value={editedGender}
                                                onChange={(e) => setEditedGender(e.target.value)}
                                            />
                                            <button className={style.inputButton} onClick={() => submitEditedGender(gender)}>Guardar</button>
                                        </div>
                                    ) : (
                                        <div className={style.editButtonContainer}>
                                            <button className={style.editBu} onClick={() => handleEditGender(idx)}>
                                                <FaEdit />
                                            </button>
                                            {/* <button className={style.deleteBu} onClick={() => deleteGender(gender)}>
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
                    <p>Deseas crear un nuevo Género?</p>
                    <Link to="/createGender">
                        <button className={style.createBut}>Crear Género</button>
                    </Link>

                </div>
            </div>

        </div>
    );
}

export default EditGender;
