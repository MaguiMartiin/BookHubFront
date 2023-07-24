import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios  from "axios";

const FormRegistro = () => {
	const [formGo, setFormGo] = useState(false);
	const validationSchema = Yup.object().shape({
		image: Yup.mixed().nullable(),
		// image: Yup.mixed().required("Image is required"),
	});

	const handleSubmit = async (values, { resetForm }) => {
		try {
			console.log(values);
			// const valor = values.image.name
			const response = await axios.post("http://localhost:3001/book", {
				body: values,
				
			});
			// Si la solicitud fue exitosa (código 2xx), mostrar el mensaje de éxito y limpiar el formulario
			if (response.ok) {
				console.log("Formulario enviado:", values);
				resetForm();
				setFormGo(true);

				setTimeout(() => {
					setFormGo(false);
				}, 5000);
			} else {
				// En caso de error en la solicitud, mostrar el mensaje de error (opcional)
				console.error("Error en la solicitud:", response.statusText);
			}
		} catch (error) {
			console.error("Error en la solicitud:", error);
		}
	};

	return (
		<div className="mt-12 md:flex flex justify-center items-center ">
			<div className=" md:w-1/2 mr-2 mb-4   ">
				<h2 className=" font-black text-3xl text-center text-black/75 ">
					Registro de libros
				</h2>
				<Formik
					// initialValues={{ image: null }}
					validationSchema={validationSchema}
					initialValues={{
						name: "",
						description: "",
						price: "",
						available: "",
						image: null,
						author: "",
						gender: ""
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
					onSubmit = {handleSubmit}
					>
					{({ errors, setFieldValue }) => (
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
									htmlFor="author"
									className="block text-gray-700 text-sm uppercase font-bold mb-2">
									Autor
								</label>
								<Field
									id="author"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
									type="text"
									name="author"
									placeholder="Descripción"
								/>
								<ErrorMessage
									name="author"
									component={() => (
										<p className="text-red-500 text-xs italic">{errors.author}</p>
									)}
								/>
							</div>
							<div className="mb-5">
								<label
									htmlFor="gender"
									className="block text-gray-700 text-sm uppercase font-bold mb-2">
									Género
								</label>
								<Field
									id="gender"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-400 focus:shadow-outline"
									type="text"
									name="gender"
									placeholder="Descripción"
								/>
								<ErrorMessage
									name="gender"
									component={() => (
										<p className="text-red-500 text-xs italic">{errors.gender}</p>
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
												onChange={(event) => {
													const file = event.currentTarget.files[0];
													setFieldValue("image", file);
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
									type="submit">
									Guardar
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
