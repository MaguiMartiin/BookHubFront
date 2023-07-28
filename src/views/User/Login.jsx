import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useToggle } from "../../components/user/UseToggle";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";

const Login = () => {
  const [isPasswordShow, toggleShowPassword] = useToggle();
  const navigate = useNavigate();

	const handelGo = async () => {
		try {
		  const res = await axios.get("https://servidor-libreria.onrender.com/auth/google");
		  // Redireccionar al usuario a la URL de autenticación de Google
		  window.location.href = res.data.authUrl;
		} catch (error) {
		  console.error("Error al obtener la URL de autenticación de Google:", error);
		}
	  };
	
	
	return (
		<div className="container flex flex-col h-screen justify-center items-center">
			<div  className="flex flex-col w-96 py-8 px-4 bg-secondaryLight dark:bg-secondary rounded-xl border border-secondaryBorderLight dark:border-secondaryBorder">
				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					onSubmit={async (values) => {
						console.log(values);
						try {
							const response = await axios.post("https://servidor-libreria.onrender.com/login", {
								email: values.email,
								password: values.password,
							});
							navigate("/home")
							console.log(response.data);
						} catch (error) {
							console.log({
								error: error.message,
							});
						}
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
							errors.password =
								"La contraseña debe tener al menos 8 caracteres.";
						}
						// else if (
						// !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]/.test(
						// values.password
						// )
						// )
						// {
						// 	errors.password =
						// 		"Debe contener letra mayúscula, minúscula, número y un carácter especial.";
						// }

						return errors;
					}}>
					{({ errors, touched }) => (
						<Form>
							<div className="flex flex-col my-2">
								<div className="mb-5 text-center">
									<h1 className="text-3xl text-customColor4 font-bold">
										Bienvenido!
									</h1>
								</div>
								<div className=" flex flex-col justify-between">
									<label htmlFor="email" className="block my-1 font-semibold">
										Email
									</label>
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
							{/* Password */}
							<div className="flex flex-col my-2">
								<label htmlFor="password" className="block my-1 font-semibold">
									Contraseña
								</label>
								<div className="flex flex-col justify-between  relative w-full">
									<Field
										placeholder="Tu contraseña"
										type={isPasswordShow ? `text` : `password`}
										name="password"
										className={
											touched.password && errors.password
												? "inputError"
												: touched.password && !errors.password
												? "inputSuccess"
												: "input"
										}
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
										name="password"
										component={() => (
											<p className="text-red-500 text-xm italic">
												{errors.password}
											</p>
										)}
									/>
								</div>
							</div>
							<div className="text-center my-4">
								<Link
									className="text-center text-sm mb-2 link text-customColor4"
									to="/changepassword">
									¿Olvidaste tu contraseña?
								</Link>
							</div>

							<button
								type="submit"
								className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400 w-full">
								Iniciar sesión
							</button>
						</Form>
					)}
				</Formik>
				<div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p class="mx-4 mb-0 text-center font-semibold dark:text-text">OR</p>
				</div>
				<div className="flex justify-center">
					<button onClick={handelGo} className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400 w-full">Acceder con Google</button>
				</div>
				<div className="flex flex-col mt-8">
					<div className="text-center flex-row my-1">
						¿No tenes cuenta?{" "}
						<Link to="/signup" className="text-customColor1 font-semibold">
							Registrate.
						</Link>
					</div>
					<div class="text-center flex-row my-">
						Volver al{" "}
						<Link to="/home" className="text-customColor1 font-semibold">
							home.
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
// const mapStateToProps = (state) => {
// 	return {
// 		userSignError: state.userSignError,
// 		isLogin: state.isLogin,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		signIn: (userData) => dispatch(signIn(userData)),
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;	
