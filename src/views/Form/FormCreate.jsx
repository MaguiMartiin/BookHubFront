import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import cloudinary from "./Cloudinary";
import { useDispatch, useSelector } from "react-redux";
import { getGenders, getAuthor } from "../../redux/actions";

const FormRegistro = () => {
	const dispatch = useDispatch();

	const genders = useSelector((state) => state.genders);
	const authors = useSelector((state) => state.authors);

	useEffect(() => {
		dispatch(getGenders());
		dispatch(getAuthor());
	}, [dispatch]);

	console.log(authors, "gender_stado_global");

	const [formGo, setFormGo] = useState(false);

	const validationSchema = Yup.object().shape({
		image: Yup.mixed().required("Image is required"),
		releaseDate: Yup.date().required("Date is required"),
		// Add more validation rules for other form fields if needed
	});

	const handleSubmit = async (values, { resetForm, setSubmitting }) => {
		try {
			console.log(values);
			const modifiedValues = {
				...values,
				GenderId:Number(values.GenderId), 
				AuthorId:Number(values.AuthorId), 
			};
			const response = await axios.post(
				"http://localhost:3001/book",
				modifiedValues
			);
			resetForm();

			console.log(response);

			if (response.status === 200) {
				console.log("Formulario enviado:", values);
				setFormGo(true);

				setTimeout(() => {
					setFormGo(false);
				}, 5000);

				resetForm();
			} else {
				console.error("Error en la solicitud:", response.data);
			}
		} catch (error) {
			console.error("Error en la solicitud:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="mt-12 md:flex flex justify-center items-center ">
			<div className="md:w-1/2 mr-2 mb-4">
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
					validate={({ name, description, price, available, image, author, gender }) => {
						let errors = {};
						if (!name) {
							errors.name = "Required name";
						}
						if (!description) {
							errors.description = "Required description";
						}
						if (!price) {
							errors.price = "Required price";
						}
						if (!available) {
							errors.available = "Required available";
						}
						if (!image) {
							errors.image = "Required image";
						}
						if (!author) {
							errors.author = "Required author";
						}
						if (!gender) {
							errors.gender = "Required gender";
						}


						return errors; // Add this line to return the errors object
					}}
					onSubmit={handleSubmit}>
					{({ errors, setFieldValue, isSubmitting }) => (
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
									placeholder="Nombre de la libro"
								/>
								<ErrorMessage
									name="name"
									component={() => (
										<p className="text-red-500 text-xs italic">{errors.name}</p>
									)}
								/>
							</div>

							<div className="mb-5">
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
							<div className="mb-5">
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
									placeholder="Ingresa el disponible"
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
							{/* gender */}
							<div className="mb-5">
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
											{errors.GenderId} {/* Change "gender" to "GenderId" */}
										</p>
									)}
								/>
							</div>

							{/* author */}
							<div className="mb-5">
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
											{errors.AuthorId} {/* Change "author" to "AuthorId" */}
										</p>
									)}
								/>
							</div>
							{/* fecha */}
							<div className="mb-5">
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
							<div className="mb-5">
								<label
									htmlFor="image"
									className="block text-gray-700 text-sm uppercase font-bold mb-2">
									Imagen
								</label>
								{/* Field es utilizado para conectar el input de imagen con Formik */}
								<Field name="image">
									{({ field }) => (
										<>
											{/* Este input está oculto, y usaremos el onChange para actualizar el valor */}
											<input
												type="file"
												accept="image/*"
												onChange={async (event) => {
													const file = event.currentTarget.files[0];
													const response = await cloudinary(file);
													setFieldValue("image", response);
												}}
											/>
											{field.value && field.value.name && (
												<img
													src={URL.createObjectURL(field.value)}
													alt="Preview"
													style={{ maxWidth: "200px" }} // Establece el tamaño de la imagen a mostrar
												/>
											)}
										</>
									)}
								</Field>
								<ErrorMessage
									name="image"
									component="p"
									className="text-red-500 text-xs italic"
								/>
							</div>
							<div>
								<button
									className="bg-primary hover:bg-secondary text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="submit"
									disabled={isSubmitting}>
									{isSubmitting ? "Submitting..." : "Guardar"}
								</button>
								{formGo && (
									<p className="exito">Formulario enviado con éxito!</p>
								)}
							</div>
						</Form>
					)}
				</Formik>
			</div>
			'
		</div>
	);
};

export default FormRegistro;
