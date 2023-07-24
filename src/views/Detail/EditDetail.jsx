import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editBook, bookId } from "../../redux/actions";
import style from "./EditDetail.module.css"

    const EditDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const bookDetail = useSelector((state) => state.bookId)
    console.log(bookDetail);

    const [form, setForm] = useState({
        name: bookDetail.name || "",
        description: bookDetail.description || "",
        Gender: bookDetail.Gender?.name || "",
        Author: bookDetail.Author?.name || "",
        price: bookDetail.price || "",
    });

    useEffect(() => {
        dispatch(bookId(id))
    }, [dispatch, id])

    useEffect(() => {
        // Actualiza el estado form cuando bookDetail cambia
        setForm({
        name: bookDetail.name,
        description: bookDetail.description,
        Gender: bookDetail.Gender?.name,
        Author: bookDetail.Author?.name,
        price: bookDetail.price
        })
    }, [bookDetail])

    const handleEdit = (event) => {
        event.preventDefault();
        dispatch(editBook(id, form));
        alert("Libro actualizado!");
        navigate("/home");
    };

    const handlerChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        setForm({...form, [property]: value})
    };

    return (
        <div>
            <form onSubmit={handleEdit} className={style.div}>
                <div className={style.name}>
                    {/*Nombre */}
                    <label htmlFor="name">Nombre del libro: </label>
                    <input type="text" value={form.name} onChange={handlerChange}
                    name="name"/>
                </div>

                <div className={style.des}>
                    {/*Genero y autor */}
                    <label htmlFor="Gender">Género: </label>
                    <input type="text" value={form.Gender} onChange={handlerChange} name="Gender"/>
                    <label htmlFor="Author">Autor: </label>
                    <input type="text" value={form.Author} onChange={handlerChange} name="Author"/>
                </div>

                <div>
                    {/*Descripcion */}
                    <label htmlFor="description">Descripción: </label> 
                    <input type="text" value={form.description} onChange={handlerChange} name="description"/>
                </div>

                <div>
                    {/*Precio */}
                    <label htmlFor="price">Precio: </label> 
                    <input type="text" min="1" value={form.price} onChange={handlerChange} name="price"/>
                </div>

                <button className={style.boton} type="submit">Guardar cambios</button>
            </form>
        </div>
  );
};

export default EditDetail;
