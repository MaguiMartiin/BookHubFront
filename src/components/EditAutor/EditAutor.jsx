import React, { useState, useEffect } from "react";
import style from './EditAutor.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAuthor, updateAuthor } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

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
                    navigate("/editAutor");
                });
            } catch (error) {
                console.error("Error al actualizar el Autor:", error);
            }
        }
    };


    return (
        <div className={style.editGenderContainer}>
            <div className={style.sidebar}>
                <Link to="/" className={style.titulo1}>BookHub</Link>
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
                    Editar Género
                </button>
                <button className={location.pathname !== "/" ? style.boton : style.sidebutton} onClick={() => { navigate("/editAutor") }} >
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
            </div>
        </div>
    )
}

export default EditAutor