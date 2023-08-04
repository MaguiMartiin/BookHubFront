import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {IoIosAddCircle} from "react-icons/io";
import cloudinary from "../../../views/Form/Cloudinary"
import { LuDelete } from "react-icons/lu";
const token = localStorage.getItem("accessToken");

const Login = ({ handleModal, setIsModalOpen }) => {
	// console.log(isModalOpen, setIsModalOpen);
	const navigate = useNavigate();

	// const deleteClick = () => {
		// if (isModalOpen) {
			// isModalOpen = false;
		// }
	// };

	return (
		<div className="container flex flex-col h-screen justify-center items-center ">
			<div className="flex flex-col w-96 py-8 px-4 bg-secondaryLight dark:bg-secondary backdrop-blur  rounded-xl bg-white/60  border border-secondaryBorderLight dark:border-secondaryBorder">
				<Formik
					initialValues={{
						name: "",
						image: null,
						lastName: "",
					}}
					onSubmit={async (values, {  resetForm }) => {
						console.log(values, "values");
						try {
							const res = await axios.put("/perfil/editar", values, {
								headers: {
									Authorization: `Bearer ${token}`,
								},
								// console.log(res);
							});
							resetForm();
						} catch (error) {
							console.error("Error en la solicitud:", error);
						}
					}}>
					{({ errors, touched, setFieldValue, values}) => (
						<Form>
							<div className="flex flex-col my-2">
								<div className="mb-5 text-center">
									<h1 className="text-3xl font-bold font-primary text-violeta">
										Editar perfil
									</h1>
								</div>
								<div className=" flex flex-col justify-between">
									<label
										htmlFor="name"
										className="block my-1 font-tertiary font-semibold text-negro">
										Nombre
									</label>
									<Field type="name" name="name" className={"inputSuccess"} />
								</div>

								<div className=" flex flex-col justify-between">
									<label
										htmlFor="lastName"
										className="block my-1 font-tertiary font-semibold text-negro">
										Apellidos
									</label>
									<Field
										type="lastName"
										name="lastName"
										className={"inputSuccess"}
									/>
								</div>

								<div className="mb-5 w-full">
									<label
										htmlFor="image"
										className="block text-negro font-tertiary text-[1rem] font-semibold mb-2">
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
										<div className={`${typeof values.image === "string" ? "w-32 h-32" : "w-0 h-0"}`} >
											
											<img src={values.image} alt="" />
										</div>
										<label
											htmlFor="image"
											className="inline-block w-full p-2 bg-violeta text-white font-semibold rounded-lg shadow-md hover:cursor-pointer">
											<IoIosAddCircle
												style={{ fontSize: "24px" }}
												className="inline mr-2 cursor-pointer"
											/>{" "}
											Enviar
										</label>
									</div>
								</div>
							</div>

							<button
								type="submit"
								className="bg-violeta text-white px-4 py-2 rounded hover:bg-red-400 w-full"> Enviar </button>
						</Form>
					)}
				</Formik>
				<div className="absolute top-0 right-0">
					<button onClick={handleModal} className=" ">
						<LuDelete className=" fill-violeta text-4xl" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
