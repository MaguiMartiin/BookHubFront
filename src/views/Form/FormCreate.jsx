import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import cloudinary from "./Cloudinary";
import { useDispatch, useSelector } from "react-redux";
import { getGenders, getAuthor } from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineCalendar } from "react-icons/ai";
import {BsFillFileEarmarkPersonFill} from "react-icons/bs";
import {BiSolidBook} from "react-icons/bi";
import { FaDollarSign, FaHashtag } from "react-icons/fa";

const FormRegistro = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = localStorage.getItem("accessToken");
	const genders = useSelector((state) => state.genders);
	const authors = useSelector((state) => state.authors);
    console.log("token", token)
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if(!token){
			Swal.fire({
				title: 'Necesitas inciar sesión para vender un libro',
          		icon: 'warning',
			})
			.then(() =>{
				navigate('/home');
			})
		}
	}, [navigate])

	useEffect(() => {
		dispatch(getGenders());
		dispatch(getAuthor());
	}, [dispatch]);

	console.log(authors, "gender_stado_global");

	const [formGo, setFormGo] = useState(false);

	useEffect(() => {
		if (formGo) {
			// Mostrar la alerta si el formulario se envió con éxito
			Swal.fire({
				icon: "success",
				title: "Libro creado correctamente",
				confirmButtonText: "Accept",
				timer: 2000,
			}).then(() => {
				// Redirigir a la ruta '/home' después de mostrar la alerta
				navigate("/home");
			});
		}
	}, [formGo, navigate]);

	const validationSchema = Yup.object().shape({
		image: Yup.mixed().required("Requiere imagen"),
		releaseDate: Yup.date().required("Requiere fecha"),
		name: Yup.string().required("Require nombre"),
		description: Yup.string().required("Require description"),
		price: Yup.number().required("Require price"),
		available: Yup.number().required("Requiere catidad"),
		GenderId: Yup.number().required("Requiere genéro"),
		AuthorId: Yup.number().required("Requiere autor"),
	});

	const handleSubmit = async (values, { resetForm, setSubmitting }) => {
		console.log(values);
	  
		try {
		  console.log(values);
		  const modifiedValues = {
			...values,
			GenderId: Number(values.GenderId),
			AuthorId: Number(values.AuthorId),
		  };
		  await axios.post("/book", modifiedValues,{
			headers: {
				Authorization: `Bearer ${token}`, // Agrega el token en el encabezado Authorization
			  },
		  });
		  Swal.fire({
			icon: "success",
			title: "Libro creado correctamente",
			confirmButtonText: "Accept",
			timer: 2000,
		  }).then(() => {
			navigate("/home");
		  });
		  setFormGo(true);
		} catch (error) {
		  console.error("Error en la solicitud:", error);
		} finally {
		  setSubmitting(false);
		}
	  };

	return (
		<div className="w-screen min-h-[100vh] p-10">
			<div>
				<h2 className="font-black text-3xl text-center text-black/75">
					Registro de libros
				</h2>
				<Formik
					validationSchema={validationSchema}
					initialValues={{
						name: "",
						description: "",
						price: "",
						available: "",
						image: null,
						AuthorId: "",
						GenderId: "",
						releaseDate: "",
					}}
					onSubmit={handleSubmit}>
					{({ errors, setFieldValue, isSubmitting, values }) => (
						<div className="flex flex-col lg:grid lg:grid-cols-2 h-fit">
							<div className="flex flex-col place-content-center  mr-4 h-full">
								<Form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
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
												name="GenderId" // Change "gender" to "GenderId"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline">
												<option value="" disabled>
													Selecciona un género
												</option>
												{genders &&
													genders.map((gender, index) => (
														<option key={index} value={index + 1}>
															{gender}
														</option>
													))}
											</Field>
											<ErrorMessage
												name="GenderId" // Change "gender" to "GenderId"
												component={() => (
													<p className="text-red-500 text-xs italic">
														{errors.GenderId}{" "}
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
												name="AuthorId" // Change "author" to "AuthorId"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline">
												<option value="" disabled>
													Selecciona un autor
												</option>
												{authors &&
													authors.map((author, index) => (
														<option key={index} value={index + 1}>
															{author}
														</option>
													))}
											</Field>
											<ErrorMessage
												name="AuthorId" // Change "author" to "AuthorId"
												component={() => (
													<p className="text-red-500 text-xs italic">
														{errors.AuthorId}{" "}
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
														setFieldValue("image", response);
													}}
												/>
												<label
													htmlFor="image"
													className="inline-block w-full p-2 bg-red-300 text-white font-semibold rounded-lg shadow-md hover:cursor-pointer">
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
											className="bg-primary w-full  hover:bg-secondary text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
							<div className="flex flex-col ml-4  justify-center items-center bg-white shadow-md rounded-lg py-10 px-5 mb-10">
								{/* <div> */}
								<div className="my-4 flex w-[200px]  items-center relative">
									<div className="absolute left-0 w-[200px]  right-0 top-1/2 h-0.5 bg-pink-300"></div>
									<p className="mx-4 mb-0 text-center w-[200px] text-2xl  font-semibold relative z-10">
										(Preview)
									</p>
									<div className="absolute left-0 right-0 w-[200px] top-1/2 h-0.5 bg-pink-500"></div>
								</div>
								<h2 className="text-4xl text-center font-semibold mb-4">
									{values.name ? values.name : "Nombre de tu evento"}
								</h2>

								<div className="flex flex-col items-center mt-4">
									<div className="h-60 w-60 lg:h-96 lg:w-96 bg-gradient-to-r from-red-300 to-pink-500 rounded-xl border border-secondaryBorder">
										{values.image ? (
											<img
												src={
													values.image.secure_url
														? values.image.secure_url
														: values.image
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
												{values.GenderId
													? genders.find(
															(_, index) =>
																index + 1 === Number(values.GenderId)
													  )
													: "Género del libro"}
											</span>{" "}
										</span>
									</div>
									<div className="w-4 font-semibold"></div>
									<div className="flex flex-row gap-2">
										<BsFillFileEarmarkPersonFill size="1.3rem" />
										<span>
											<span className="font-semibold">
												{values.AuthorId
													? authors.find(
															(gender, index) =>
																index + 1 === Number(values.AuthorId)
													  )
													: "Autor del libro"}
											</span>{" "}
										</span>
									</div>
								</div>

								<div className="w-4 font-semibold"></div>
								<div className="flex flex-row gap-2 mt-2">
									<AiOutlineCalendar size="1.3rem" />
									<span className="">
										{values.releaseDate ? values.releaseDate : "24/10/2023"}
									</span>
								</div>

								{/* available and price */}
								<div className="flex flex-col lg:flex-row justify-center items-center gap-2 mt-2">
									<div className="flex flex-row gap-2">
										<FaDollarSign size="1.3rem" />
										<span>
											<span className="font-semibold">
												{values.price ? values.price : "Precio"}
											</span>{" "}
										</span>
									</div>
									<div className="w-4 font-semibold"></div>
									<div className="flex flex-row gap-2">
										<FaHashtag size="1.3rem" />
										<span>
											<span className="font-semibold">
												{values.available ? values.available : "Disponible"}
											</span>{" "}
										</span>
									</div>
								</div>

								<div className="flex flex-row justify-center items-center gap-2 w-full min-h-fit overflow-y-scroll mt-2">
									{values.description
										? values.description
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

export default FormRegistro;
