import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editBook, bookId, getGenders, getAuthor } from "../../redux/actions";
import style from "./EditDetail.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cloudinary from "../Form/Cloudinary";
import Swal from "sweetalert2"
import {  Link } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";
import {BsFillFileEarmarkPersonFill} from "react-icons/bs";
import {BiSolidBook} from "react-icons/bi";
import { FaDollarSign, FaHashtag } from "react-icons/fa";

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
        available: bookDetail.available || "",
        releaseDate: bookDetail.releaseDate || "",
        image: bookDetail.image || "",
        description: bookDetail.description || "",
    });

    const [formGo, setFormGo] = useState(false);

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
        price: bookDetail.price,
        available: bookDetail.available,
        releaseDate: bookDetail.releaseDate,
        image: bookDetail.image,
        description: bookDetail.description,
        })
    }, [bookDetail])

    const handleEdit = async (event, { resetForm, setSubmitting }) => {
        console.log("ve",setSubmitting);
        try {
          await dispatch(editBook(id, form));
          await Swal.fire({
            icon: "success",
            title: "Libro actualizado!",
            text: "El libro ha sido actualizado exitosamente.",
            confirmButtonText: "Aceptar",
          });
          setFormGo(true);
          navigate("/home");
        } catch (error) {console.error("Error al actualizar el libro:", error)}
        finally {
            setSubmitting(false);
          }
      }
      const validationSchema = Yup.object().shape({
		image: form.image? "" :Yup.mixed().required("Requiere imagen"),
		releaseDate: form.releaseDate? "" :Yup.date().required("Requiere fecha"),
		name: form.name? "": Yup.string().required("Require nombre"),
		description: form.description? "":Yup.string().required("Require descripcion"),
		price: form.price? "":Yup.number().required("Require precio"),
		available:form.available? "": Yup.number().required("Requiere cantidad"),
		Gender: form.Gender? "": Yup.number().required("Requiere genéro"),
		Author: form.Author? "": Yup.number().required("Requiere autor"),
	});

console.log("form", form);
    const handlerChange = (event) => {
        const property = event.target.name
        const value = event.target.value
     
        setForm({...form, [property]: value})
    };


    return (
		<div className="w-full min-h-[100vh] pt-24  px-16 ">
			<div>
			<Link to="/dashboard">
                    <button className={style.titulo2}>Volver</button>
                </Link>
				<h2 className="font-black text-[2.5rem] font-primary  text-center text-gris">
					Registra tus libros
				</h2>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
                        name: form.name,
                        description: form.description,
                        Gender: form.Gender?.name,
                        Author: form.Author?.name,
                        price: form.price,
                        available: form.available,
                        releaseDate: form.releaseDate,
                        image: form.image,
                        description: form.description ,
					}}
					onSubmit={handleEdit}>
					{({ errors, setFieldValue, isSubmitting, values }) => (
						<div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4 lg:gap-y-8 mt-10">
							<div className="flex flex-col place-content-center  h-full">
								<Form className="bg-white shadow-md rounded-lg py-10 p-4  mb-10">
									<div className="mb-5">
										<label
											htmlFor="name"
											className="block text-gray-700 text-sm uppercase font-bold mb-2">
											Nombre
										</label>
										<Field
											id="name"
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
											type="text"
											name="name"
											placeholder="Nombre del libro"
                                            value={form.name}
                                            onChange={handlerChange}
										/>
										<ErrorMessage
											name="name"
											component={() => (
												<p className="text-red-500 text-xs italic">
													{errors.name}
												</p>
											)}
										/>
									</div>
									<div className="mb-5 flex">
										<div className="mb-5 w-full mr-2">
											<label
												htmlFor="price"
												className="block text-gray-700 text-sm uppercase font-bold mb-2">
												Precio
											</label>
											<Field
												id="price"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
												type="number"
												name="price"
												placeholder="Ingresa el precio"
                                                value={form?.price}
                                            onChange={handlerChange}
											/>
											<ErrorMessage
												name="price"
												component={() => (
													<p className="text-red-500 text-xs italic">
														{errors.price}
													</p>
												)}
											/>
										</div>
										<div className="mb-5 w-full">
											<label
												htmlFor="available"
												className="block text-gray-700 text-sm uppercase font-bold mb-2">
												Disponible
											</label>
											<Field
												id="available"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
												type="number"
												name="available"
												placeholder="Libros disponibles "
                                                value={form?.available}
                                            onChange={handlerChange}
											/>
											<ErrorMessage
												name="available"
												component={() => (
													<p className="text-red-500 text-xs italic">
														{errors.available}
													</p>
												)}
											/>
										</div>
									</div>

									{/* gender */}
									<div className=" flex justify-between  w-full">
										<div className="mb-5 mr-2  w-full">
											<label
												htmlFor="gender"
												className="block text-gray-700 text-sm uppercase font-bold mb-2">
												Género
											</label>
											<Field
												as="select"
												id="gender"
												name="Gender"
                                                value={form.Gender}
                                                onChange={handlerChange} // Change "gender" to "GenderId"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline">
												<option value="" disabled>
													Selecciona un género
												</option>
												{genders &&
													genders.map((gender, index) => (
														<option key={index} value={gender}>
															{gender}
														</option>
													))}
											</Field>
											<ErrorMessage
												name="GenderId" // Change "gender" to "GenderId"
												component={() => (
													<p className="text-red-500 text-xs italic">
														{errors.Gender}{" "}
														{/* Change "gender" to "GenderId" */}
													</p>
												)}
											/>
										</div>

										{/* author */}
										<div className="mb-5  w-full">
											<label
												htmlFor="author"
												className="block text-gray-700 text-sm uppercase font-bold mb-2">
												Autor
											</label>
											<Field
												as="select"
												id="author"
												name="Author"
                                                value={form.Author}
                                                onChange={handlerChange} // Change "author" to "AuthorId"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline">
												<option value="" disabled>
													Selecciona un autor
												</option>
												{authors &&
													authors.map((author, index) => (
														<option key={index} value={author}>
															{author}
														</option>
													))}
											</Field>
											<ErrorMessage
												name="AuthorId" // Change "author" to "AuthorId"
												component={() => (
													<p className="text-red-500 text-xs italic">
														{errors.Author}{" "}
														{/* Change "author" to "AuthorId" */}
													</p>
												)}
											/>
										</div>
									</div>
									{/* fecha and image */}
									<div className=" flex">
										{/* fecha */}
										<div className="mb-5 w-full mr-2">
											<label
												htmlFor="releaseDate"
												className="block text-gray-700 text-sm uppercase font-bold mb-2">
												Fecha
											</label>
											<Field name="releaseDate">
												{({ field }) => (
													<>
														{/* Use the input type="date" to enable the native date picker */}
														<input
															type="date"
															min="1950-01-01"
															max="2023-12-31"
															{...field}
                                                            value={form.releaseDate}
                                                            onChange={handlerChange}
															className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
														/>
													</>
												)}
											</Field>
											<ErrorMessage
												name="releaseDate"
												component={() => (
													<p className="text-red-500 text-xs italic">
														{errors.releaseDate}
													</p>
												)}
												className="text-red-500 text-xs italic"
											/>
										</div>
										{/* image */}
										<div className="mb-5 w-full">
											<label
												htmlFor="image"
												className="block text-gray-700 text-sm uppercase font-bold mb-2">
												Imagen
											</label>
											<div className="relative">
												<input
													type="file"
													accept="image/*"
													className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
													onChange={async (event) => {
														const file = event.currentTarget.files[0];
														const response = await cloudinary(file);
														setForm({
                                                            ...form,
                                                            image: response});
													}}
												/>
												<label
													htmlFor="image"
													className="inline-block w-full p-2 bg-rojo text-white font-semibold rounded-lg shadow-md hover:cursor-pointer">
													<IoIosAddCircle
														style={{ fontSize: "24px" }}
														className="inline mr-2 cursor-pointer"
													/>{" "}
													Agregar imagen
												</label>
											</div>
											<ErrorMessage
												name="image"
												component="p"
												className="text-red-500 text-xs italic"
											/>
										</div>
									</div>
									<div className="mb-5">
										<label
											htmlFor="description"
											className="block text-gray-700 text-sm uppercase font-bold mb-2">
											Descripción
										</label>
										<Field
											id="description"
											as="textarea"
											type="text"
											name="description"
                                            value={form.description}
                                            onChange={handlerChange}
											className="shadow appearance-none border placeholder-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline h-40"
											placeholder="Descripción..."
										/>
										<ErrorMessage
											name="description"
											component={() => (
												<p className="text-red-500 text-xs italic">
													{errors.description}
												</p>
											)}
										/>
									</div>
									<div>
										<button
											className="bg-rojo w-full  hover:bg-secondary text-blanco font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="submit"
											disabled={isSubmitting}>
											{isSubmitting ? "Enviando..." : "Guardar"}
										</button>
										{formGo && (
											<p className="exito">Formulario enviado con éxito!</p>
										)}
									</div>
								</Form>
							</div>
							{/* ----------------------------------------------------------- */}
							{/* className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" */}
							<div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg py-10  mb-10">
								{/* <div> */}
								<div className=" flex w-[200px]  items-center relative">
									<div className="absolute left-0 w-[200px]  right-0 top-1/2 h-0.5 bg-rojo"></div>
									<p className="mx-4 mb-0 text-center w-[200px] text-2xl  font-semibold relative z-10">
										(Preview)
									</p>
									<div className="absolute left-0 right-0 w-[200px] top-1/2 h-0.5 bg-rojo"></div>
								</div>
								<h2 className="text-4xl text-center font-semibold mb-4">
									{form.name ? form.name : "Nombre de tu evento"}
								</h2>

								<div className="flex flex-col items-center mt-4">
									<div className="h-60 w-60 lg:h-96 lg:w-96 bg-gradient-to-r from-rojo to-violeta rounded-xl border border-secondaryBorder">
										{form.image ? (
											<img
												src={
													form.image.secure_url
														? form.image.secure_url
														: form.image
                                                }
												alt="Preview"
												className="h-full w-full bg-cover bg-bottom bg-no-repeat place-content-center rounded-xl "
											/>
										) : (
											<div className="h-full w-full flex justify-center items-center">
												<span className=" text-lg">No image selected</span>
											</div>
										)}
									</div>
								</div>
								<div className="w-4 font-semibold"></div>
								{/*gender and author  */}
								<div className="flex flex-col lg:flex-row justify-center items-center gap-2 mt-4">
									<div className="flex flex-row gap-2">
										<BiSolidBook size="1.3rem" />
										<span>
											<span className="font-semibold">
												{form.Gender
													? form.Gender
													  
													: "Género del libro"}
											</span>{" "}
										</span>
									</div>
									<div className="w-4 font-semibold"></div>
									<div className="flex flex-row gap-2">
										<BsFillFileEarmarkPersonFill size="1.3rem" />
										<span>
											<span className="font-semibold">
												{form.Author
													? form.Author
													: "Autor del libro"}
											</span>{" "}
										</span>
									</div>
								</div>

								<div className="w-4 font-semibold"></div>
								<div className="flex flex-row gap-2 mt-2">
									<AiOutlineCalendar size="1.3rem" />
									<span className="">
										{form.releaseDate ? form?.releaseDate : "24/10/2023"}
									</span>
								</div>

								{/* available and price */}
								<div className="flex flex-col lg:flex-row justify-center items-center gap-2 mt-2">
									<div className="flex flex-row gap-2">
										<FaDollarSign size="1.3rem" />
										<span>
											<span className="font-semibold">
												{form.price ? form?.price : "Precio"}
											</span>{" "}
										</span>
									</div>
									<div className="w-4 font-semibold"></div>
									<div className="flex flex-row gap-2">
										<FaHashtag size="1.3rem" />
										<span>
											<span className="font-semibold">
												{form.available ? form?.available : "Disponible"}
											</span>{" "}
										</span>
									</div>
								</div>

								<div className="flex flex-row justify-center items-center gap-2 w-full min-h-fit overflow-y-scroll mt-2">
									{form.description
										? form?.description
										: "Descripción de tu evento."}
								</div>
							</div>
						</div>
						// </div>
					)}
				</Formik>
			</div>
		</div>
	);
};


export default EditDetail;
