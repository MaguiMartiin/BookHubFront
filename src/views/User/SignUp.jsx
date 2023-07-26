import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useToggle } from "./UseToggle";

const SignUp = () => {
	const [isPasswordShow, toggleShowPassword] = useToggle();

	return (
		<div className="container flex flex-col h-screen justify-center items-center">
			<Formik
				initialValues={{
					name: "",
					lastname: "",
					email: "",
					passwordKey: "",
					passwordConfirm: "",
				}}
				onSubmit={ async (values) => {
                    try {
                        const respose = await  axios.post("http://localhost:3001/sign", {
                            email: values.email,
                        });
                    } catch (error) {
                        console.log(error);
                    }

				}}
				validate={(values) => {
					const errors = {};
					if (!values.name) {
						errors.name = "Se requiere un nombre";
					}
					if (!values.lastname) {
						errors.lastname = "Se requiere un apellido";
					}
					if (!values.email) {
						errors.email = "Se requiere un email";
					} else if (
						!/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(
							values.email
						)
					) {
						errors.email = "Invalid email format";
					}
					if (!values.passwordKey) {
						errors.passwordKey = "Se requiere una contraseña";
					} else if (values.passwordKey.length < 8) {
						errors.passwordKey =
							"La contraseña debe tener al menos 8 caracteres.";
					}

					return errors; // Agregar este retorno para devolver los errores.
				}}>
				{({ errors }) => (
					<Form className="shadow rounded-lg bg-white p-6 flex flex-col w-96">
						<div className="mb-5">
							<div className="mb-5 text-center">
								<h1 className="text-3xl">Crear cuenta</h1>
							</div>
							{/* name
							<div className="mb-5">
								<div className="flex flex-col justify-between">
									<label htmlFor="name">Nombre</label>
									<Field type="name" name="name" className="border p-1" />
								</div>
								<div>
									<ErrorMessage
										name="name"
										component={() => (
											<p className="text-red-500 text-xm italic">
												{errors.name}
											</p>
										)}
									/>
								</div>
							</div>

							{/* lastname */}
							{/* <div className="mb-5">
								<div className="flex flex-col justify-between">
									<label htmlFor="lastname">Apellido</label>
									<Field
										type="lastname"
										name="lastname"
										className="border p-1"
									/>
								</div>
								<div>
									<ErrorMessage
										name="lastname"
										component={() => (
											<p className="text-red-500 text-xm italic">
												{errors.lastname}
											</p>
										)}
									/>
								</div>
							</div>  */}
							<div className="mb-5">
								<div className="flex flex-col justify-between">
									<label htmlFor="email">Email</label>
									<Field type="email" name="email" className="border p-1" />
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
							<div className="mb-5 ">
								<label htmlFor="password">Password</label>
								<div className="flex flex-col justify-between  relative w-full">
									<Field
										type={isPasswordShow ? `text` : `password`}
										name="passwordKey"
										className="border p-1"
									/>
									<div className="absolute inset-y-0 right-0 flex items-end pr-2 pb-1 ">
										<button onClick={toggleShowPassword} type="button">
											{isPasswordShow ? (
												<AiFillEye size="1.5rem" color="#ff988b" />
											) : (
												<AiFillEyeInvisible size="1.5rem" color="#ff988b" />
											)}
										</button>
									</div>
								</div>
								<div>
									<ErrorMessage
										name="passwordKey"
										component={() => (
											<p className="text-red-500 text-xm italic">
												{errors.passwordKey}
											</p>
										)}
									/>
								</div>
							</div>
							<div className="mb-5">
								<div className="flex flex-col justify-between">
									<label htmlFor="password">Confirmar Password</label>
									<Field
										type="password"
										name="passwordConfirm"
										className="border p-1"
									/>
								</div>
								<div>
									<ErrorMessage
										name="passwordConfirm"
										component={() => (
											<p className="text-red-500 text-xm italic">
												{errors.passwordConfirm}
											</p>
										)}
									/>
								</div>
							</div>
							<button
								type="submit"
								className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400 w-full">
								siguiente
							</button>
							<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
								<p className="mx-4 mb-0 text-center font-semibold dark:text-text">
									OR
								</p>
							</div>
							<div className="flex justify-center">Registrarte con google</div>
							<div className="flex flex-col mt-8">
								<div className="text-center flex-row my-1">
									¿Ya tienes cuenta? {""}
									<Link to="/login" className="text-primary">
										Iniciar sesión
									</Link>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SignUp;
