import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editBook, bookId, getGenders, getAuthor } from "../../redux/actions";
import style from "./EditDetail.module.css"
import Swal from "sweetalert2"

    const EditDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const bookDetail = useSelector((state) => state.bookId)
    const genders = useSelector((state) => state.genders)
    const authors = useSelector((state) => state.authors)

    const [form, setForm] = useState({
        name: bookDetail.name || "",
        description: bookDetail.description || "",
        Gender: bookDetail.Gender?.name || "",
        Author: bookDetail.Author?.name || "",
        price: bookDetail.price || "",
    });

    useEffect(() => {
        dispatch(bookId(id))
        dispatch(getGenders())
        dispatch(getAuthor())
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

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
          await dispatch(editBook(id, form));
          await Swal.fire({
            icon: "success",
            title: "Libro actualizado!",
            text: "El libro ha sido actualizado exitosamente.",
            confirmButtonText: "Aceptar",
          });
          navigate("/publicaciones");
        } catch (error) {console.error("Error al actualizar el libro:", error)}
      }

    const handlerChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        console.log("name", property)
        console.log("value", value)
        setForm({...form, [property]: value})
    };

    return (
        <div>
            <form onSubmit={handleEdit} className={style.divContainer}>
                <div>
                <div className={style.name}>
                    <label htmlFor="name" className={style.label}>Nombre del libro: </label>
                    <input type="text" value={form.name} onChange={handlerChange}
                    name="name" className={style.inputName}/>
                </div>

                <div className={style.segundoDiv}>
                    <label htmlFor="Gender" className={style.label}>Género: </label>
                    <select onChange={handlerChange} name="Gender" className={style.select}>
                    <option  htmlFor="Gender">{form.Gender}</option>
                    {genders?.map((e, index) => {
                        return (<option key={index} type="text" value={e} placeholder={form.Gender} name="Gender" >{e}</option>)
                    })}
                    </select>
                    <label htmlFor="Author" className={style.label}>Autor: </label>
                    <select onChange={handlerChange} name="Author" className={style.select}>
                    <option htmlFor="Author">{form.Author}</option>
                    {authors?.map((e, index) =>{
                        return (<option key={index}type="text" value={e} placeholder={form.Author} name="Author">{e}</option>)
                    })}
                   </select>
                </div>

                <div className={style.tercerDiv}>
                    <label htmlFor="description" className={style.label}>Descripción: </label> 
                    <input type="text" value={form.description} onChange={handlerChange} name="description" className={style.inputDesc}/>
                </div>

                <div className={style.tercerDiv}>
                    <label htmlFor="price" className={style.label}>Precio: </label> 
                    <input type="text" min="1" value={form.price} onChange={handlerChange} name="price" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"/>
                </div>

                <button className={style.boton} type="submit" class="bg-primary w-full hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar cambios</button>
                </div>
            </form>
        </div>
  );
};

export default EditDetail;
