import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useToggle } from "./UseToggle";
import axios from "axios";
import * as Yup from "yup";

const SignUpFrorm1 = ({ callBack }) => {
		const [isPasswordShow, toggleShowPassword] = useToggle();

	const validationSchema = Yup.object().shape({
		// Falta validación email ya existe
		email: Yup.string()
			.email("El mail no es valido.")
			.required("Este campo es requerido."),
		passwordKey: Yup.string()
			.min(8, "Debe tener al menos 8 caracteres")
			.matches(
				/^(?=.*[0-9])[a-zA-Z0-9]{8,}$/,
				"Debe tener al menos un número y no debe contener caracteres especiales."
			)
			.required("Este campo es requerido."),
		passwordConfirm: Yup.string()
			.required("Este campo es requerido.")
			.test("password-match", "Las contraseñas no coinciden", function (value) {
				return this.parent.passwordKey === value;
			}),
	});



	return (
		// <div className="container flex flex-col h-screen justify-center items-center">
		<Formik
			initialValues={{
				email: "",
				passwordKey: "",
				passwordConfirm: "",
			}}
			onSubmit={async (values, { resetForm, setSubmitting }) => {
				try {
					const formData = {
						email: values.email.trim(),
						passwordKey: values.passwordKey,
					}
					callBack(formData);
				} catch (error) {
					console.log(error);
				}
				setSubmitting(false);
				resetForm();
			}}
			validationSchema={validationSchema}>
			{({ errors, touched }) => (
				<Form>
					{/* <div className="mb-5"> */}
					<h2 className="text-3xl text-center text-customColor4 font-bold ">
						Crear cuenta
					</h2>

					<div className="flex flex-col my-2">
						<label htmlFor="email" className="block my-1 font-semibold">
							Email
						</label>
						<Field
							className={
								touched.email && errors.email
									? "inputError"
									: touched.email && !errors.email
									? "inputSuccess"
									: "input"
							}
							type="email"
							name="email"
							placeholder="Tu email"
							autoComplete="false"
						/>

						<ErrorMessage
							name="email"
							component={() => (
								<p className="text-red-500 text-xm italic">{errors.email}</p>
							)}
						/>
					</div>
					<div className="flex flex-col my-2">
						<label htmlFor="password" className="block my-1 font-semibold">
							Password
						</label>
						<div className="flex flex-col justify-between  relative w-full">
							<Field
								placeholder="Tu contraseña"
								type={isPasswordShow ? `text` : `password`}
								name="passwordKey"
								className={
									touched.passwordKey && errors.passwordKey
										? "inputError"
										: touched.passwordKey && !errors.passwordKey
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
								name="passwordKey"
								component={() => (
									<p className="text-red-500 text-xm italic">
										{errors.passwordKey}
									</p>
								)}
							/>
						</div>
					</div>
					<div className="flex flex-col my-2">
						<label
							htmlFor="passwordConfirm"
							className="block my-1 font-semibold">
							Confirmar contraseña:
						</label>

						<Field
							className={
								touched.passwordConfirm && errors.passwordConfirm
									? "inputError"
									: touched.passwordConfirm && !errors.passwordConfirm
									? "inputSuccess"
									: "input"
							}
							type={isPasswordShow ? `text` : `password`}
							name="passwordConfirm"
							placeholder="Repetí tu contraseña"
						/>
						<ErrorMessage
							name="passwordConfirm"
							component={() => (
								<p className="text-red-500 text-xm italic">
									{errors.passwordConfirm}
								</p>
							)}
							className="errorMessage"
						/>
					</div>
					<button
						type="submit"
						className="bg-primary text-white px-4 py-2 rounded hover:bg-red-400 w-full mt-4">
						siguiente
					</button>
				</Form>
			)}
		</Formik>
		// </div>
	);
};

export default SignUpFrorm1;
