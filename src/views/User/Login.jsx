import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="container flex flex-col h-screen justify-center items-center">
			<Formik
				initialValues={{
					email: "",
					password: "",
				}}
				onSubmit={(values) => {
					console.log(values);
				}}
				validate={(values) => {
					const errors = {};
					if (!values.email) {
						errors.email = "Se requiere un email";
					} else if (
						!/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
							values.email
						)
					) {
						errors.email = "Invalid email format";
					}
					if (!values.password) {
						errors.password = "Se requiere una contraseña";
					} else if (values.password.length < 8) {
						errors.password = "La contraseña debe tener al menos 8 caracteres.";
					} else if (
						!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/.test(
							values.password
						)
					) {
						errors.password =
							"Debe contener letra mayúscula, minúscula, número y un carácter especial.";
					}

					return errors;
				}}>
				{({ errors, touched }) => (
					<Form className="shadow rounded-lg bg-white p-6 flex flex-col w-96 ">
						<div className="mb-5">
							<div className="mb-5 text-center">
								<h1 className="text-3xl text-customColor4 font-bold">
									Bienvenido!
								</h1>
							</div>
							<div className=" flex flex-col justify-between">
								<label htmlFor="email">Email</label>
								<Field
									type="email"
									name="email"
									className={
										touched.email && errors.email
											? "inputError"
											: touched.email && !errors.email
											? "inputSuccess"
											: "input"
									}
								/>
							</div>
							<div>
								<ErrorMessage
									name="email"
									component={() => (
										<p className="text-red-500 text-xm italic">
											{errors.email}
										</p>
									)}
								/>
							</div>
						</div>
						<div className="mb-8">
							<div>
								<label htmlFor="password">Password</label>
							</div>
							<div className="flex flex-col justify-center">
								<Field
									type="password"
									name="password"
									className={
										touched.email && errors.email
											? "inputError"
											: touched.email && !errors.email
											? "inputSuccess"
											: "input"
									}
								/>
							</div>
							<div>
								<ErrorMessage
									name="password"
									component={() => (
										<p className="text-red-500 text-xm italic">
											{errors.password}
										</p>
									)}
								/>
							</div>
						</div>
						<Link
							className="text-center text-sm mb-2 link text-customColor4"
							to="/changepassword">
							¿Olvidaste tu contraseña?
						</Link>
						<button
							type="submit"
							className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400 w-full">
							Iniciar sesión
						</button>

						<div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
							<p class="mx-4 mb-0 text-center font-semibold dark:text-text">
								OR
							</p>
						</div>
						<div className="flex justify-center">Registrarte con google</div>
						<div className="flex flex-col mt-8">
							<div className="text-center flex-row my-1">
								¿No tenes cuenta?{" "}
								<Link to="/signup" className="text-customColor1 font-semibold">
									Registrate.
								</Link>
							</div>
							<div class="text-center flex-row my-">
								Volver al{" "}
								<Link to="/" className="text-customColor1 font-semibold">
									home.
								</Link>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
export default Login;
