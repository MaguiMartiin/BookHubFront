import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// import { useDispatch, useSelector } from "react-redux";

import { setSignUpStep } from "../../redux/userAction";
import { connect } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Este campo es requerido."),
	lastname: Yup.string().required("Este campo es requerido."),
});

const SingUpForm2 = ({ userData, setSignUpStep }) => {
	return (
		<Formik
			initialValues={{
				name: "",
				lastname: "",
			}}
			onSubmit={async (values) => {
				const user = {
					...userData,
					name: values.name,
					lastname: values.lastname,
				};

				try {
					await axios.post("http://localhost:3001/user", user);
				} catch (error) {
					console.log(error);
				}
				setSignUpStep(1);
				setSubmitting(false);
				resetForm();
			}}
			validationSchema={validationSchema}>
			{({ errors, touched }) => (
				<Form>
					<h2 className="text-xl text-center my-2">Últimos datos &#128513;</h2>
					<div className="flex flex-col my-2">
                        <label htmlFor="name">Nombre</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="lastname">Apellido</label>
                        <Field type="text" name="lastname" />
                        <ErrorMessage name="lastname" />
                    </div>
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
