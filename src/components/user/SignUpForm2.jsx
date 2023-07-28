import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setSignUpStep } from "../../redux/userAction";
import { connect } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Este campo es requerido."),
	lastName: Yup.string().required("Este campo es requerido."),
});

const SingUpForm2 = ({ userData, setSignUpStep }) => {
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{
				name: "",
				lastName: "",
			}}
			onSubmit={async (values, { setSubmitting, resetForm }) => {
				const user = {
					...userData,
					name: values.name,
					lastName: values.lastName,
				};
				console.log(user);

				try {
					await axios.post("/user/", user);
					navigate("/login");
				} catch (error) {
					console.log(error);
				}
				setSignUpStep(1);
				setSubmitting(false);
				resetForm();
			}}
			validationSchema={validationSchema}>
			{({ errors, touched, isSubmitting }) => (
				<Form>
					<h2 className="text-xl text-center my-2">Últimos datos &#128513;</h2>
					<div className="flex flex-col justify-between  relative w-full my-2">
						<label htmlFor="name">Nombre</label>
						<Field
							type="text"
							name="name"
							className={
								touched.passwordConfirm && errors.passwordConfirm
									? "inputError"
									: touched.passwordConfirm && !errors.passwordConfirm
									? "inputSuccess"
									: "input"
							}
						/>
						<ErrorMessage
							name="name"
							component={() => (
								<p className="text-red-500 text-xm italic">{errors.name}</p>
							)}
						/>
					</div>
					<div className="flex flex-col justify-between  relative w-full my-2">
						<label htmlFor="lastName">Apellido</label>
						<Field
							type="text"
							name="lastName"
							className={
								touched.passwordConfirm && errors.passwordConfirm
									? "inputError"
									: touched.passwordConfirm && !errors.passwordConfirm
									? "inputSuccess"
									: "input"
							}
						/>
						<ErrorMessage
							name="lastName"
							component={() => (
								<p className="text-red-500 text-xm italic">{errors.lastName}</p>
							)}
						/>
					</div>
					<button
						className="bg-primary w-full  hover:bg-secondary text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
						type="submit"
						disabled={isSubmitting}>
						{isSubmitting ? "Enviando..." : "Guardar"}
					</button>
				</Form>
			)}
		</Formik>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		setSignUpStep: (step) => dispatch(setSignUpStep(step)),
	};
};

export default connect(null, mapDispatchToProps)(SingUpForm2);
